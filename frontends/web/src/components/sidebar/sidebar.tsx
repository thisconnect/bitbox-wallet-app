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

import { Component, FunctionComponent } from 'react';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { IAccount } from '../../api/account';
import coins from '../../assets/icons/coins.svg';
import ejectIcon from '../../assets/icons/eject.svg';
import info from '../../assets/icons/info.svg';
import settings from '../../assets/icons/settings-alt.svg';
import settingsGrey from '../../assets/icons/settings-alt_disabled.svg';
import deviceSettings from '../../assets/icons/wallet-light.svg';
import { SharedProps as SharedPanelProps, store as panelStore } from '../../components/guide/guide';
import { share } from '../../decorators/share';
import { subscribe } from '../../decorators/subscribe';
import { debug } from '../../utils/env';
import { apiPost } from '../../utils/request';
import Logo, { AppLogoInverted } from '../icon/logo';

interface SidebarProps {
    deviceIDs: string[];
    accounts: IAccount[];
}

interface SubscribedProps {
    keystores: Array<{ type: 'hardware' | 'software' }>;
}

type Props = SubscribedProps & SharedPanelProps & SidebarProps & WithTranslation;

interface SwipeAttributes {
    x: number;
    y: number;
    active?: boolean;
}

const BackLink : FunctionComponent<{coinCode: string, code: string, name: string}> = ({coinCode, code, name}) => {
    const {pathname} = useLocation();
    const active = pathname.startsWith(`/account/${code}/`);
    const handleSidebarItemClick = (e: any) => {
        const el = (e.target as Element).closest('a');
        if (el!.classList.contains('sidebar-active') && window.innerWidth <= 901) {
            toggleSidebar();
        }
    }
    return (
        <Link
            // activeClassName="sidebar-active"
            className={active ? 'sidebar-active' : ''}
            to={`/account/${code}`}
            onClick={handleSidebarItemClick}
            title={name}>
            <Logo stacked coinCode={coinCode} className="sidebar_icon" alt={name} />
            <span className="sidebar_label">{name}</span>
        </Link>
    );
}

export function toggleSidebar() {
    const toggled = !panelStore.state.activeSidebar;
    panelStore.setState({ activeSidebar: toggled });
}

export function setSidebarStatus(status: string) {
    panelStore.setState({ sidebarStatus: status });
}

class Sidebar extends Component<Props> {
    private swipe!: SwipeAttributes;

    public componentDidMount() {
        this.registerTouchEvents();
    }

    public componentWillUnmount() {
        this.removeTouchEvents();
    }

    private registerTouchEvents = () => {
        document.addEventListener('touchstart', this.handleTouchStart);
        document.addEventListener('touchmove', this.handleTouchMove);
        document.addEventListener('touchend', this.handleTouchEnd);
    }

    private removeTouchEvents = () => {
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }

    private handleTouchStart = (e: TouchEvent) => {
        const touch = e.touches[0];
        this.swipe = {
            x: touch.clientX,
            y: touch.clientY,
        };
    }

    private handleTouchMove = (e: TouchEvent) => {
        if (this.props.sidebarStatus !== 'forceHidden') {
            if (e.changedTouches && e.changedTouches.length) {
                this.swipe.active = true;
            }
        }
    }

    private handleTouchEnd = (e: TouchEvent) => {
        if (this.props.sidebarStatus !== 'forceHidden') {
            const touch = e.changedTouches[0];
            const travelX = Math.abs(touch.clientX - this.swipe.x);
            const travelY = Math.abs(touch.clientY - this.swipe.y);
            const validSwipe = window.innerWidth <= 901 && this.swipe.active && travelY < 100 && travelX > 70;
            if ((!panelStore.state.activeSidebar && validSwipe && this.swipe.x < 60) ||
                (panelStore.state.activeSidebar && validSwipe && this.swipe.x > 230)) {
                toggleSidebar();
            }
            this.swipe = {
                x: 0,
                y: 0,
                active: false,
            };
        }
    }

    private handleSidebarItemClick = (e: any) => {
        const el = (e.target as Element).closest('a');
        if (el!.classList.contains('sidebar-active') && window.innerWidth <= 901) {
            toggleSidebar();
        }
    }

    private getAccountLink = (account: IAccount): JSX.Element => {
        return (
            <BackLink {...account}/>
        );
    }

    public render() {
        const {
            t,
            deviceIDs,
            accounts,
            keystores,
            shown,
            activeSidebar,
            sidebarStatus,
        } = this.props;
        const hidden = ['forceHidden', 'forceCollapsed'].includes(sidebarStatus);
        return (
            <div className={['sidebarContainer', hidden ? 'forceHide' : ''].join(' ')}>
                <div className={['sidebarOverlay', activeSidebar ? 'active' : ''].join(' ')} onClick={toggleSidebar}></div>
                <nav className={['sidebar', activeSidebar ? 'forceShow' : '', shown ? 'withGuide' : ''].join(' ')}>
                    <Link
                        // activeClassName=""
                        to={accounts.length ? '/account-summary' : '/'}
                        onClick={this.handleSidebarItemClick}>
                        <div className="sidebarLogoContainer">
                            <AppLogoInverted className="sidebarLogo" />
                        </div>
                    </Link>
                    <div className="sidebarHeaderContainer">
                        <span className="sidebarHeader" hidden={!keystores.length}>
                            {t('sidebar.accounts')}
                        </span>
                    </div>
                    {/* <div className="activeGroup">
                        <div className="sidebarItem">
                            <a href="#" className="sidebar-active">
                                <div className="single">
                                    <img draggable={false} className="sidebar_settings" src={info} alt={t('sidebar.addAccount')} />
                                </div>
                                <span className="sidebar_label">Hello</span>
                                <svg className="sidebarArrow" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="18" height="18" viewBox="0, 0, 18, 18">
                                    <path d="M0,4.5 L9,13.5 L18,4.5" fill="#FFFFFF"/>
                                </svg>
                            </a>
                            <div className="sidebarSubmenu">
                                <a href="#">
                                    <div className="single">
                                        <img draggable={false} className="sidebar_settings" src={info} alt={t('sidebar.addAccount')} />
                                    </div>
                                    <span className="sidebar_label">One</span>
                                </a>
                                <a href="#">
                                    <div className="single">
                                        <img draggable={false} className="sidebar_settings" src={info} alt={t('sidebar.addAccount')} />
                                    </div>
                                    <span className="sidebar_label">Two</span>
                                </a>
                            </div>
                        </div>
                    </div> */}
                    { accounts.length ? (
                        <div className="sidebarItem">
                            <Link
                                // activeClassName="sidebar-active"
                                to={`/account-summary`}
                                title={t('accountSummary.title')}
                                onClick={this.handleSidebarItemClick}>
                                <div className="single">
                                    <img draggable={false} className="sidebar_settings" src={info} alt={t('sidebar.addAccount')} />
                                </div>
                                <span className="sidebar_label">{t('accountSummary.title')}</span>
                            </Link>
                        </div>
                    ) : null }
                    { accounts && accounts.map(this.getAccountLink) }
                    <div className="sidebarHeaderContainer end"></div>
                    { accounts.length ? (
                    <div key="buy" className="sidebarItem">
                        <Link
                            // activeClassName="sidebar-active"
                            to="/buy/info"
                        >
                            <div className="single">
                                <img draggable={false} className="sidebar_settings" src={coins} alt={t('sidebar.exchanges')} />
                            </div>
                            <span className="sidebar_label">
                                {t('sidebar.buy')}
                            </span>
                        </Link>
                    </div>
                    ) : null }
                    { deviceIDs.map(deviceID => (
                        <div key={deviceID} className="sidebarItem">
                            <Link
                                to={`/device/${deviceID}`}
                                // activeClassName="sidebar-active"
                                title={t('sidebar.device')}
                                onClick={this.handleSidebarItemClick}>
                                <div className="single">
                                    <img draggable={false} className="sidebar_settings" src={deviceSettings} alt={t('sidebar.device')} />
                                </div>
                                <span className="sidebar_label">{t('sidebar.device')}</span>
                            </Link>
                        </div>
                    )) }
                    <div key="settings" className="sidebarItem">
                        <Link
                            // activeClassName="sidebar-active"
                            to={`/settings`}
                            title={t('sidebar.settings')}
                            onClick={this.handleSidebarItemClick}>
                            <div className="stacked">
                                <img draggable={false} className="sidebar_settings" src={settingsGrey} alt={t('sidebar.settings')} />
                                <img draggable={false} className="sidebar_settings" src={settings} alt={t('sidebar.settings')} />
                            </div>
                            <span className="sidebar_label">{t('sidebar.settings')}</span>
                        </Link>
                    </div>
                    {(debug && keystores.some(({ type }) => type === 'software') && deviceIDs.length === 0) && (
                        <div key="eject" className="sidebarItem">
                            <a href="#" onClick={eject}>
                                <div className="single">
                                    <img
                                        draggable={false}
                                        className="sidebar_settings"
                                        src={ejectIcon}
                                        alt={t('sidebar.leave')} />
                                </div>
                            </a>
                        </div>
                    )}
                </nav>
            </div>
        );
    }
}

function eject(e: Event): void {
    apiPost('test/deregister');
    e.preventDefault();
}

const subscribeHOC = subscribe<SubscribedProps, SharedPanelProps & SidebarProps & WithTranslation>(
    { keystores: 'keystores' },
    true,
    false,
)(Sidebar);

const guideShareHOC = share<SharedPanelProps, SidebarProps & WithTranslation>(panelStore)(subscribeHOC);
const translateHOC = withTranslation()(guideShareHOC as any);
export { translateHOC as Sidebar };
