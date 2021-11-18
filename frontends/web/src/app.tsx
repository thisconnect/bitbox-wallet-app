/**
 * Copyright 2018 Shift Devices AG
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

import { Component } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Route } from 'react-router';
// import { getCurrentUrl, route } from 'preact-router';
import { getAccounts, IAccount } from './api/account';
import { syncAccountsList } from './api/accountsync';
import { getDeviceList, TDevices } from './api/devices';
import { syncDeviceList } from './api/devicessync';
import { unsubscribe, UnsubscribeList } from './utils/subscriptions';
import { ConnectedApp } from './connected';
import { Alert } from './components/alert/Alert';
import { Aopp } from './components/aopp/aopp';
import { Banner } from './components/banner/banner';
import { Confirm } from './components/confirm/Confirm';
import { Container } from './components/container/container';
import { MobileDataWarning } from './components/mobiledatawarning';
import { Sidebar } from './components/sidebar/sidebar';
import { Update } from './components/update/update';
import { DeviceSwitch } from './routes/device/deviceswitch';
import { apiPost } from './utils/request';
import { apiWebsocket } from './utils/websocket';
import { Routes } from 'react-router-dom';


interface State {
    accounts: IAccount[];
    devices: TDevices;
}

class App extends Component<WithTranslation, State> {
    public state: State = {
        accounts: [],
        devices: {},
    };

    componentDidCatch(error: any, errorInfo: any) {
        console.error(error);
        console.error(errorInfo)
    }

    private unsubscribe!: () => void;
    private unsubscribeList: UnsubscribeList = [];

    /**
     * Gets fired when the route changes.
     */
    private handleRoute = () => {
        // if (panelStore.state.activeSidebar) {
        //     toggleSidebar();
        // }
    }

    public componentDidMount() {
        this.unsubscribe = apiWebsocket(({ type, data, meta }:  any) => {
            switch (type) {
            case 'backend':
                switch (data) {
                case 'newTxs':
                    apiPost('notify-user', {
                        text: this.props.t('notification.newTxs', {
                            count: meta.count,
                            accountName: meta.accountName,
                        }),
                    });
                    break;
                }
                break;
            }
        });

        const setDevices = (devices: TDevices) => {
            const oldDeviceIDList = Object.keys(this.state.devices);
            this.setState({ devices }, () => {
                const newDeviceIDList: string[] = Object.keys(this.state.devices);
                if (
                    newDeviceIDList.length > 0
                    && (oldDeviceIDList.length === 0 || newDeviceIDList[0] !== oldDeviceIDList[0])
                ) {
                    // route to the first device for unlock, create, restore etc.
                    // route(`/device/${newDeviceIDList[0]}`, true);
                }
            });
        };

        Promise.all([getDeviceList(), getAccounts()])
            .then(([devices, accounts]) => {
                this.setState({ accounts }, this.maybeRoute);
                setDevices(devices);
            })
            .catch(console.error);

        this.unsubscribeList.push(
            syncAccountsList(accounts => {
                this.setState({ accounts }, this.maybeRoute);
            }),
            syncDeviceList(setDevices),
            // TODO: add syncBackendNewTX
        );
    }

    public componentWillUnmount() {
        this.unsubscribe();
        unsubscribe(this.unsubscribeList);
    }

    private maybeRoute = () => {
        // const currentURL = getCurrentUrl();
        // const isIndex = currentURL === '/' || currentURL === '/index.html' || currentURL === '/android_asset/web/index.html';
        // const inAccounts = currentURL.startsWith('/account/');
        // const accounts = this.state.accounts;

        // // if no accounts are registered on specified views route to /
        // if ( accounts.length === 0 && (
        //     currentURL.startsWith('/account-summary')
        //     || currentURL.startsWith('/add-account')
        //     || currentURL.startsWith('/settings/manage-accounts')
        // )) {
        //     route('/', true);
        //     return;
        // }
        // // if on an account that isnt registered route to /
        // if (inAccounts && !accounts.some(account => currentURL.startsWith('/account/' + account.code))) {
        //     route('/', true);
        //     return;
        // }
        // // if on index page and there is at least 1 account route to /account-summary
        // if (isIndex && accounts && accounts.length) {
        //     route('/account-summary', true);
        //     return;
        // }
        // // if on the /buy/ view and there are no accounts view route to /
        // if (accounts.length === 0 && currentURL.startsWith('/buy/')) {
        //     route('/', true);
        //     return;
        // }
    }

    // Returns a string representation of the current devices, so it can be used in the `key` property of subcomponents.
    // The prefix is used so different subcomponents can have unique keys to not confuse the renderer.
    private devicesKey = (prefix: string): string => {
        return prefix + ':' + JSON.stringify(this.state.devices, Object.keys(this.state.devices).sort());
    }

    private toggleSidebar = () => {
        // panelStore.setState({ activeSidebar: !panelStore.state.activeSidebar });
    }

    private activeAccounts = (): IAccount[] => {
        return this.state.accounts.filter(acct => acct.active);
    }

    public render() {
        const { t } = this.props;
        const { accounts, devices } = this.state;
        const deviceIDs: string[] = Object.keys(devices);
        const activeAccounts = this.activeAccounts();
        return (
            // <div>
            //     <h1>
            //         {t('app.upgrade')}
            //     </h1>
            //     <LanguageSwitch />
            // </div>
            <ConnectedApp>
                <div className="app">
                    <Sidebar
                        accounts={activeAccounts}
                        deviceIDs={deviceIDs} />
                    <div className="appContent flex flex-column flex-1" style={{minWidth: 0}}>
                        <Update />
                        <Banner msgKey="bitbox01" />
                        <MobileDataWarning />
                        <Aopp />
                        <Routes>
                            <Route
                             path="/device/:deviceID" element={<DeviceSwitch
                                    key={this.devicesKey('device-switch')}
                                    devices={devices} />} />
                            <Route path="/" element={ <DeviceSwitch
                                    key={this.devicesKey('device-switch-default')}
                                    devices={devices} />
                            } />
                        </Routes>
                    </div>
                    <Alert />
                    <Confirm />
                </div>
            </ConnectedApp>
        );
    }
}

const AppWithTranslation = withTranslation()(App);
export { AppWithTranslation as App };
