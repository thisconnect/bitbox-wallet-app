// Copyright 2021 Shift Crypto AG
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package backend

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/url"
	"strings"

	"github.com/digitalbitbox/bitbox-wallet-app/backend/accounts"
	coinpkg "github.com/digitalbitbox/bitbox-wallet-app/backend/coins/coin"
	"github.com/digitalbitbox/bitbox-wallet-app/util/observable"
	"github.com/digitalbitbox/bitbox-wallet-app/util/observable/action"
	"github.com/digitalbitbox/bitbox02-api-go/api/firmware"
)

// aoppCoinMap maps from the asset codes specified by AOPP to our own coin codes.
var aoppCoinMap = map[string]coinpkg.Code{
	"btc": coinpkg.CodeBTC,
	// TODO: add support for ETH
	// "eth": coinpkg.CodeETH,
}

type account struct {
	Name string        `json:"name"`
	Code accounts.Code `json:"code"`
}

// aoppState is the current state of an AOPP request. See The values below.
type aoppState string

const (
	// The states progress linearly from top to bottom starting at aoppStateInactive. In case of
	// error, the state goes to aoppStateError.

	// Something went wrong. The frontend is to display an error message based on the `ErrorCode`.
	aoppStateError aoppState = "error"

	// Nothing is happening, we are waiting for an AOPP request.
	aoppStateInactive aoppState = "inactive"
	// No keystore is connected, so we are waiting for the user to insert and unlock their device.
	aoppStateAwaitingKeystore aoppState = "awaiting-keystore"
	// Keystore is registered - the user chooses an account from which to get a receive address
	// from.
	aoppStateChoosingAccount aoppState = "choosing-account"
	// The account is still syncing - need to wait for that to finish before we can get a fresh
	// address.
	aoppStateSyncing aoppState = "syncing"
	// The user is prompted to confirm and sign the address on the device.
	aoppStateSigning aoppState = "signing"
	// Everything went well, the address and signature was delievered to the AOPP callback.
	aoppStateSuccess aoppState = "success"
)

// AOPP holds all the state needed to process an AOPP (Address Ownership Proof Protocol) request.
type AOPP struct {
	// State is the current state the request is in. See `aoppState*` for the possible values.
	State aoppState `json:"state"`
	// ErrorCode is an "aopp*" error code, see errors.go. Only applies if State == aoppStateError.
	ErrorCode ErrorCode `json:"errorCode"`
	// Accounts is the list of accounts the user can choose from. Only applies if State == aoppStateChoosingAccount.
	Accounts []account `json:"accounts"`
	// Address that will be delivered to the requesting party via the callback. Only applies if State == aoppStateSigning.
	Address string `json:"address"`
	// CallbackHost contains the host of the AOPP callback URL. Available for all states except
	// aoppStateInactive.
	CallbackHost string `json:"callbackHost"`
	// coinCode is the requested asset. Available for all states except aoppStateInactive.
	coinCode coinpkg.Code
	// message is the requested message to be signed. Available for all states except
	// aoppStateInactive.
	message string
	// callback is the AOPP callback param. Available for all states except aoppStateInactive.
	callback string
}

// AOPP returns the current AOPP state.
func (backend *Backend) AOPP() AOPP {
	defer backend.accountsAndKeystoreLock.RLock()()
	return backend.aopp
}

// notifyAOPP sends the aopp state to the frontend. `accountsAndKeystoreLock` must be held when
// calling this function.
func (backend *Backend) notifyAOPP() {
	backend.Notify(observable.Event{
		Subject: "aopp",
		Action:  action.Replace,
		Object:  backend.aopp,
	})
}

// AOPPCancel resets the aopp state.
func (backend *Backend) AOPPCancel() {
	defer backend.accountsAndKeystoreLock.Lock()()
	backend.aopp = AOPP{State: aoppStateInactive}
	backend.notifyAOPP()
}

// aoppSetError pushes an error to the frontend to display. `accountsAndKeystoreLock` must be held
// when calling this function.
func (backend *Backend) aoppSetError(err ErrorCode) {
	backend.aopp.State = aoppStateError
	backend.aopp.ErrorCode = err
	backend.notifyAOPP()
}

// aoppKeystoreRegistered must be called after a keystore is available, to display a list of
// accounts to choose from. It is called when a keystore is registered, or right away in
// `handleAOPP()` if a keystore is already registered. `accountsAndKeystoreLock` must be held when
// calling this function.
func (backend *Backend) aoppKeystoreRegistered() {
	if backend.aopp.State != aoppStateAwaitingKeystore {
		return
	}
	if !backend.keystore.CanSignMessage(backend.aopp.coinCode) {
		backend.aoppSetError(errAOPPUnsupportedKeystore)
		return
	}
	var accounts []account
	for _, acct := range backend.accounts {
		if !acct.Config().Active {
			continue
		}
		if acct.Coin().Code() != backend.aopp.coinCode {
			continue
		}
		accounts = append(accounts, account{
			Name: acct.Config().Name,
			Code: acct.Config().Code,
		})
	}

	if len(accounts) == 0 {
		backend.aoppSetError(errAOPPNoAccounts)
		return
	}

	backend.aopp.Accounts = accounts
	backend.aopp.State = aoppStateChoosingAccount
	backend.notifyAOPP()
}

// handleAOPP handles an AOPP (Address Ownership Proof Protocol) request. See https://aopp.group/.
func (backend *Backend) handleAOPP(uri url.URL) {
	defer backend.accountsAndKeystoreLock.Lock()()
	log := backend.log.WithField("aopp-uri", uri.String())
	q := uri.Query()
	backend.aopp.CallbackHost = "<unknown>"

	if q.Get("v") != "0" {
		log.Error("Can only handle version 0 aopp URIs")
		backend.aoppSetError(errAOPPVersion)
		return
	}

	callback := q.Get("callback")
	if callback == "" {
		log.Error("callback param missing")
		backend.aoppSetError(errAOPPInvalidRequest)
		return
	}
	callbackURL, err := url.Parse(callback)
	if err != nil {
		log.WithError(err).Error("Invalid callback")
		backend.aoppSetError(errAOPPInvalidRequest)
		return
	}
	backend.aopp.CallbackHost = callbackURL.Host
	backend.aopp.callback = callback

	coinCode, ok := aoppCoinMap[strings.ToLower(q.Get("asset"))]
	if !ok {
		log.Error("Unrecognized coin")
		backend.aoppSetError(errAOPPUnsupportedAsset)
		return
	}
	backend.aopp.coinCode = coinCode

	msg := q.Get("msg")
	if msg == "" {
		log.Error("msg param missing")
		backend.aoppSetError(errAOPPInvalidRequest)
		return
	}
	backend.aopp.message = msg

	backend.aopp.State = aoppStateAwaitingKeystore
	if backend.keystore == nil {
		backend.notifyAOPP()
		return
	}
	backend.aoppKeystoreRegistered()
}

// AOPPChooseAccount is called when an AOPP request is being processed and the user has chosen an
// account.
func (backend *Backend) AOPPChooseAccount(code accounts.Code) {
	defer backend.accountsAndKeystoreLock.Lock()()
	if backend.aopp.State != aoppStateChoosingAccount {
		return
	}

	backend.aopp.State = aoppStateSyncing
	backend.notifyAOPP()

	log := backend.log.WithField("accountCode", code)
	var account accounts.Interface
	for _, acct := range backend.accounts {
		if acct.Config().Code == code {
			account = acct
			break
		}
	}
	if account == nil {
		backend.log.Error("aopp: could not find account")
		backend.aoppSetError(errAOPPUnknown)
		return
	}
	if err := account.Initialize(); err != nil {
		backend.log.
			WithError(err).
			WithField("code", account.Config().Code).
			Error("could not initialize account")
		backend.aoppSetError(errAOPPUnknown)
		return
	}

	unused := account.GetUnusedReceiveAddresses()

	signingConfigIdx := 0 // TODO: use the aopp format hint to choose the signing config.
	addr := unused[signingConfigIdx][0]

	backend.aopp.Address = addr.EncodeForHumans()
	backend.aopp.State = aoppStateSigning
	backend.notifyAOPP()

	var signature []byte
	switch account.Coin().Code() {
	case coinpkg.CodeBTC:
		sig, err := backend.keystore.SignBTCMessage(
			[]byte(backend.aopp.message),
			addr.AbsoluteKeypath(),
			account.Config().SigningConfigurations[signingConfigIdx].ScriptType(),
		)
		if err != nil {
			if firmware.IsErrorAbort(err) {
				backend.log.WithError(err).Error("user aborted msg signing")
				backend.aoppSetError(errAOPPSigningAborted)
				return
			}
			backend.log.WithError(err).Error("signing error")
			backend.aoppSetError(errAOPPUnknown)
			return
		}
		signature = sig
	default:
		backend.log.Errorf("unsupported coin: %s", account.Coin().Code())
		backend.aoppSetError(errAOPPUnknown)
		return
	}

	jsonBody, err := json.Marshal(struct {
		Version   int    `json:"version"`
		Address   string `json:"address"`
		Signature []byte `json:"signature"` // is base64 encoded
	}{
		Version:   0,
		Address:   addr.EncodeForHumans(),
		Signature: signature,
	})
	if err != nil {
		log.WithError(err).Error("JSON error")
		backend.aoppSetError(errAOPPUnknown)
		return
	}
	resp, err := backend.httpClient.Post(backend.aopp.callback, "application/json", bytes.NewBuffer(jsonBody))
	if err != nil {
		log.WithError(err).Error("Error calling callback")
		backend.aoppSetError(errAOPPCallback)
		return
	}
	defer resp.Body.Close() //nolint:errcheck
	if resp.StatusCode != http.StatusNoContent {
		log.Errorf("AOPP callback response code is %d, expected %d", resp.StatusCode, 204)
		backend.aoppSetError(errAOPPCallback)
		return
	}

	backend.aopp.State = aoppStateSuccess
	backend.notifyAOPP()
}
