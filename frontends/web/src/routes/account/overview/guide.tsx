/**
 * Copyright 2021 Shift Crypto AG
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

import { h } from 'preact';
import * as accountApi from '../../../api/account';
import { Entry } from '../../../components/guide/entry';
import { Guide } from '../../../components/guide/guide';
import { Translate } from '../../../decorators/translate';
import { isBitcoinBased } from '../utils';

function isBTCScriptType(
    scriptType: accountApi.ScriptType,
    account: accountApi.IAccount,
    accountInfo?: accountApi.ISigningConfigurationList,
): boolean {
    if (!accountInfo || accountInfo.signingConfigurations.length !== 1) {
        return false;
    }
    return (account.coinCode === 'btc' || account.coinCode === 'tbtc') &&
        accountInfo.signingConfigurations[0].scriptType === scriptType;
}

interface AccountOverviewGuideProps {
    account: accountApi.IAccount;
    accountInfo?: accountApi.ISigningConfigurationList;
    balance?: accountApi.IBalance;
    transactions?: accountApi.ITransaction[];
    t: Translate;
}

export function BuyGuide({
    t,
    account,
    accountInfo,
    balance,
    transactions,
}: AccountOverviewGuideProps) {
    return (
        <Guide>
            <Entry key="accountDescription" entry={t('guide.accountDescription')} />
            {isBTCScriptType('p2pkh', account, accountInfo) && (
                <Entry key="guide.settings.btc-p2pkh" entry={t('guide.settings.btc-p2pkh')} />
            )}
            {isBTCScriptType('p2wpkh-p2sh', account, accountInfo) && (
                <Entry key="guide.settings.btc-p2sh" entry={t('guide.settings.btc-p2sh')} />
            )}
            {isBTCScriptType('p2wpkh', account, accountInfo) && (
            <Entry key="guide.settings.btc-p2wpkh" entry={t('guide.settings.btc-p2wpkh')} />
            )}
            {balance && balance.available.amount === '0' && (
                <Entry key="accountSendDisabled" entry={t('guide.accountSendDisabled', { unit: balance.available.unit })} />
            )}
            <Entry key="accountReload" entry={t('guide.accountReload')} />
            {transactions !== undefined && transactions.length > 0 && (
                <Entry key="accountTransactionLabel" entry={t('guide.accountTransactionLabel')} />
            )}
            {transactions !== undefined && transactions.length > 0 && (
                <Entry key="accountTransactionTime" entry={t('guide.accountTransactionTime')} />
            )}
            {isBTCScriptType('p2pkh', account, accountInfo) && (
                <Entry key="accountLegacyConvert" entry={t('guide.accountLegacyConvert')} />
            )}
            {transactions !== undefined &&  transactions.length > 0 && (
                <Entry key="accountTransactionAttributesGeneric" entry={t('guide.accountTransactionAttributesGeneric')} />
            )}
            {transactions !== undefined && transactions.length > 0 && isBitcoinBased(account.coinCode) && (
                <Entry key="accountTransactionAttributesBTC" entry={t('guide.accountTransactionAttributesBTC')} />
            )}
            {balance && balance.hasIncoming && (
                <Entry key="accountIncomingBalance" entry={t('guide.accountIncomingBalance')} />
            )}
            <Entry key="accountTransactionConfirmation" entry={t('guide.accountTransactionConfirmation')} />
            <Entry key="accountFiat" entry={t('guide.accountFiat')} />
            { /* careful, also used in Settings */ }
            <Entry key="accountRates" entry={t('guide.accountRates')} />
        </Guide>
    );
}
