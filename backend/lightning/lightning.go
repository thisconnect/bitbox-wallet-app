// Copyright 2018 Shift Devices AG
// Copyright 2023 Shift Crypto AG
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

package lightning

import (
	"os"
	"path"

	"github.com/breez/breez-sdk-go/breez_sdk"
	"github.com/digitalbitbox/bitbox-wallet-app/backend/config"
	"github.com/digitalbitbox/bitbox-wallet-app/util/errp"
	"github.com/digitalbitbox/bitbox-wallet-app/util/logging"
	"github.com/digitalbitbox/bitbox-wallet-app/util/observable"
	"github.com/sirupsen/logrus"
	"github.com/tyler-smith/go-bip39"
)

// Lightning manages the Breez SDK lightning node.
type Lightning struct {
	observable.Implementation

	config             *config.Config
	cacheDirectoryPath string
	synced             bool

	log        *logrus.Entry
	sdkService *breez_sdk.BlockingBreezServices
}

func NewLightning(config *config.Config, cacheDirectoryPath string) *Lightning {
	return &Lightning{
		config:             config,
		cacheDirectoryPath: cacheDirectoryPath,
		log:                logging.Get().WithGroup("lightning"),
		synced:             false,
	}
}

// Connect needs to be called before any requests are made.
func (lightning *Lightning) Connect() {
	go lightning.connect()
}

// GenerateAndConnect first generates a mnemonic from the entropy then connects to instance.
func (lightning *Lightning) GenerateAndConnect(entropy []byte) error {
	lightningConfig := lightning.config.LightningConfig()

	if !lightningConfig.Inactive {
		return errp.New("Lightning node already active")
	}

	entropyMnemonic, err := bip39.NewMnemonic(entropy)
	if err != nil {
		lightning.log.WithError(err).Warn("rror generating mnemonic")
		return errp.New("Error generating mnemonic")
	}

	lightningConfig.Inactive = false
	lightningConfig.Mnemonic = entropyMnemonic

	if err = lightning.config.SetLightningConfig(lightningConfig); err != nil {
		lightning.log.WithError(err).Warn("Error updating lightning config")
		return errp.New("Error updating lightning config")
	}

	go lightning.connect()

	return nil
}

// Disconnect closes an active Breez SDK instance. After this, no requests should be made.
func (lightning *Lightning) Disconnect() {
	if lightning.sdkService != nil {
		if err := lightning.sdkService.Disconnect(); err != nil {
			lightning.log.WithError(err).Warn("BreezSDK: Error disconnecting SDK")
		}

		lightning.sdkService.Destroy()
		lightning.sdkService = nil
		lightning.synced = false
	}
}

// connect initializes the connection configuration and calls connect to create a Breez SDK instance.
func (lightning *Lightning) connect() {
	lightningConfig := lightning.config.LightningConfig()

	if !lightningConfig.Inactive && len(lightningConfig.Mnemonic) > 0 && lightning.sdkService == nil {
		initializeLogging(lightning.log)

		// TODO: this seed should be determined from the account/device.
		seed, err := breez_sdk.MnemonicToSeed(lightningConfig.Mnemonic)

		if err != nil {
			lightning.log.WithError(err).Warn("BreezSDK: MnemonicToSeed failed")
			return
		}

		nodeConfig := breez_sdk.NodeConfigGreenlight{
			Config: breez_sdk.GreenlightNodeConfig{
				PartnerCredentials: nil,
				InviteCode:         nil,
			},
		}

		workingDir := path.Join(lightning.cacheDirectoryPath, "breez-sdk")

		if err := os.MkdirAll(workingDir, 0700); err != nil {
			lightning.log.WithError(err).Warn("Error creating working directory")
			return
		}

		config := breez_sdk.DefaultConfig(breez_sdk.EnvironmentTypeProduction, "", nodeConfig)
		config.WorkingDir = workingDir
		sdkService, err := breez_sdk.Connect(config, seed, lightning)

		if err != nil {
			lightning.log.WithError(err).Warn("BreezSDK: Error connecting SDK")
			return
		}

		lightning.sdkService = sdkService
	}
}