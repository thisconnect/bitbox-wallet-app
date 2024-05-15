/**
 * Copyright 2018 Shift Devices AG
 * Copyright 2021-2024 Shift Crypto AG
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AccountCode, CoinCode, CoinOrTokenCode, ScriptType, IAccount, CoinUnit, TKeystore } from '../../api/account';

export function findAccount(accounts: IAccount[], accountCode: AccountCode): IAccount | undefined {
  return accounts.find(({ code }) => accountCode === code);
}

export function getCryptoName(cryptoLabel: string, account?: IAccount): string {
  if (account && isBitcoinOnly(account.coinCode)) {
    return 'Bitcoin';
  }
  return cryptoLabel;
}

export function isBitcoinOnly(coinCode: CoinOrTokenCode): boolean {
  switch (coinCode) {
  case 'btc':
  case 'tbtc':
    return true;
  default:
    return false;
  }
}

export const isBitcoinCoin = (coin: CoinUnit) => (coin === 'BTC') || (coin === 'TBTC') || (coin === 'sat') || (coin === 'tsat');

export function isBitcoinBased(coinCode: CoinOrTokenCode): boolean {
  switch (coinCode) {
  case 'btc':
  case 'tbtc':
  case 'ltc':
  case 'tltc':
    return true;
  default:
    return false;
  }
}

export function isEthereumBased(coinCode: CoinOrTokenCode): boolean {
  return coinCode === 'eth' || coinCode === 'goeth' || coinCode === 'sepeth' || coinCode.startsWith('eth-erc20-');
}

export function getCoinCode(coinCode: CoinOrTokenCode): CoinCode | undefined {
  switch (coinCode) {
  case 'btc':
  case 'tbtc':
    return 'btc';
  case 'ltc':
  case 'tltc':
    return 'ltc';
  case 'eth':
  case 'goeth':
  case 'sepeth':
    return 'eth';
  }
}

export const getCoinOrTokenName = (coinCode: CoinOrTokenCode): string => {
  switch (getCryptoName(coinCode)) {
  case 'btc':
    return 'Bitcoin';
  case 'tbtc':
    return 'Bitcoin Testnet';
  case 'ltc':
    return 'Litecoin';
  case 'tltc':
    return 'Litecoin Testnet';
  case 'eth':
    return 'Ethereum';
  case 'goeth':
    return 'Ethereum Goerli';
  case 'sepeth':
    return 'Ethereum Sepolia';
  case 'eth-erc20-usdt':
    return 'Tether USD';
  case 'eth-erc20-usdc':
    return 'USD Coin';
  case 'eth-erc20-link':
    return 'LINK';
  case 'eth-erc20-bat':
    return 'Basic Attention Token';
  case 'eth-erc20-mkr':
    return 'Maker';
  case 'eth-erc20-zrx':
    return '0x';
  case 'eth-erc20-wbtc':
    return 'Wrapped Bitcoin';
  case 'eth-erc20-paxg':
    return 'Pax Gold';
  case 'eth-erc20-dai0x6b17':
    return 'Dai';
  default:
    console.warn(`unknown coin or token ${coinCode}`);
    return coinCode;
  }
};


export function getScriptName(scriptType: ScriptType): string {
  switch (scriptType) {
  case 'p2pkh':
    return 'Legacy (P2PKH)';
  case 'p2wpkh-p2sh':
    return 'Wrapped Segwit (P2WPKH-P2SH)';
  case 'p2wpkh':
    return 'Native segwit (bech32, P2WPKH)';
  case 'p2tr':
    return 'Taproot (bech32m, P2TR)';
  }
}

export function customFeeUnit(coinCode: CoinOrTokenCode): string {
  if (isBitcoinBased(coinCode)) {
    return 'sat/vB';
  }
  if (isEthereumBased(coinCode)) {
    return 'Gwei';
  }
  return '';
}

export type TAccountsByKeystore = {
  keystore: TKeystore;
  accounts: IAccount[];
};

// Returns the accounts grouped by the keystore fingerprint.
export function getAccountsByKeystore(accounts: IAccount[]): TAccountsByKeystore[] {
  return Object.values(accounts.reduce((acc, account) => {
    const key = account.keystore.rootFingerprint;
    if (!acc[key]) {
      acc[key] = {
        keystore: account.keystore,
        accounts: []
      };
    }
    acc[key].accounts.push(account);
    return acc;
  }, {} as Record<string, TAccountsByKeystore>));
}

// Returns true if more than one keystore has the given name.
export function isAmbiguiousName(name: string, accounts: TAccountsByKeystore[]): boolean {
  return accounts.filter(keystore => keystore.keystore.name === name).length > 1;
}
