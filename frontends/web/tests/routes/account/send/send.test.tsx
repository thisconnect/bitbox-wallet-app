/**
 * Copyright 2020 Shift Crypto AG
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

import 'jest';
import { h } from 'preact';
import '../../../matchmediastub';
jest.mock('../../../../src/i18n/i18n');

import { mount as deep } from 'enzyme';

jest.mock('../../../../src/utils/websocket')
jest.mock('../../../../src/utils/request');
import { apiGet } from '../../../../src/utils/request';

jest.mock('../../../../src/decorators/translate', () => ({
    // this mock makes sure any components using the translate HoC receive the t function as a prop
    translate: () => Component => {
        Component.defaultProps = { ...Component.defaultProps, t: k => k };
        return Component;
    },
}));

jest.mock('@zxing/library');
jest.mock('preact-router');

// import { Send } from '../../../../src/routes/account/send/send';

// const mock = 
(apiGet as jest.Mock).mockImplementation(endpoint => {
    console.log(12, endpoint)
    switch (endpoint) {
        case 'rates': { return Promise.resolve({BTC: { AUD: 16111.14, CAD: 15310.95, CHF: 10504.8, EUR: 9729.86, USD: 11482.74 }}); }
        case 'config': { return Promise.resolve({ frontend: { fiatCode: 'CHF', fiatList: ['USD', 'EUR', 'CHF'] } }); }
        case 'account/btc/balance': {
            return Promise.resolve({
                available: { amount: '0.23862468', unit: 'BTC', conversions: { AUD: "3'826.05", CAD: "3'633.11", CHF: "2'505.56", CNY: "18'673.89", EUR: "2'305.71", GBP: "2'085.88", JPY: "291'360.40", KRW: "3'221'292.41", RUB: "200'098.58", USD: "2'721.25" }},
                hasIncoming: false, incoming: { amount: '0', unit: 'TBTC', conversions: { AUD: '0.00', CAD: '0.00', CHF: '0.00', CNY: '0.00', EUR: '0.00', GBP: '0.00', JPY: '0.00', KRW: '0.00', RUB: '0.00', USD: '0.00' }}});
        }
        case 'account/btc/fee-targets': { return Promise.resolve({ defaultFeeTarget: 'economy', feeTargets: [{ code: 'low' }, { code: 'economy' }, { code: 'normal' }, { code: 'high' }] }); }
        case 'account/btc/receive-addresses': { return Promise.resolve(); }
        case 'xyz': { return Promise.resolve(); }
    }
    return Promise.resolve();
});

describe('routes/account/send/send', () => {

    it('should just pass', done => {

        // rates.tsx has a custom store and tries to imediatelly
        // fetch fiatCode, fiatList from the config and rates endpoint
        // so we cannot use (or have to mock apiGet before):
        // import { Send } from '../../../../src/routes/account/send/send';
        import('../../../../src/routes/account/send/send')
            .then(({ Send }) => {
                const send = deep(
                    <Send
                        accounts={[
                            {
                                coinCode: 'btc',
                                coinUnit: 'BTC',
                                code: 'btc',
                                name: 'Bitcoin',
                                blockExplorerTxPrefix: 'https://blockstream.info/testnet/tx/',
                            }
                        ]}
                        code="btc"
                        devices={{}}
                        deviceIDs={[]}
                    />,
                );

                expect(send.find('div')).toBeTruthy();
                // expect(send).toMatchSnapshot();
                // mock.mockReset();
                setTimeout(done, 8000);

            })
            .catch(error => done(error));
    });

});
