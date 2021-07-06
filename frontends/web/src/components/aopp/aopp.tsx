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

import { Component, h, RenderableProps } from 'preact';
import { AccountCode } from '../../api/account';
import * as aoppAPI from '../../api/aopp';
import { subscribe } from '../../decorators/subscribe';
import { translate, TranslateProps } from '../../decorators/translate';
import { Fullscreen, FullscreenButtons } from '../fullscreen/fullscreen';
import { Dialog, DialogButtons } from '../dialog/dialog';
import { Message } from '../message/message';
import { Button, Field, Input, Label, Select } from '../forms';
import { CopyableInput } from '../copy/Copy';
import { AppLogo, ArrowDown, BitBox02Stylized, Cancel, Checked } from '../icon';
import * as styles from './aopp.css';

interface State {
    accountCode: AccountCode;
    showDefaultUnlockView: boolean;
}

interface AoppProps {
}

interface SubscribedProps {
    aopp?: aoppAPI.Aopp;
}

type Props = SubscribedProps & AoppProps & TranslateProps;

class Aopp extends Component<Props, State> {
    public readonly state: State = {
        accountCode: '',
        showDefaultUnlockView: false,
    };

    public componentDidMount() {
        this.setAccountCodeDefault();
    }

    public componentDidUpdate(prevProps) {
        if (this.props.aopp?.accounts !== prevProps.aopp?.accounts) {
            this.setAccountCodeDefault();
        }
    }

    private setAccountCodeDefault() {
        const { aopp } = this.props;
        if (aopp?.accounts && aopp?.accounts?.length) {
            this.setState({ accountCode: aopp.accounts[0].code });
        }
    }

    private chooseAccount = (e: Event) => {
        if (this.state.accountCode) {
            aoppAPI.chooseAccount(this.state.accountCode);
        }
        e.preventDefault();
    }

    private Banner = ({ children }) => (<div className={styles.banner}>{children}</div>);
    private Content = ({ children }) => (<div className={styles.content}>{children}</div>);
    private Header = (props) => (
        <header className={styles.header}>
            <h1 className={styles.title}>{props.title}</h1>
            {props.children}
        </header>
    );

    public render(
        { t, aopp }: RenderableProps<Props>,
        { accountCode, showDefaultUnlockView }: State,
    ) {
        if (!aopp) {
            return null;
        }
        const { Banner, Content, Header } = this;
        switch (aopp.state) {
            case 'error':
                return (
                    <Fullscreen>
                        <Header title={t('aopp.errorTitle')}>
                            <p>{aopp.callbackHost}</p>
                        </Header>
                        <Content>
                            <Message type="error">
                                <Cancel className={styles.smallIcon} /><br />
                                {t(`error.${aopp.errorCode}`, { host: aopp.callbackHost })}
                            </Message>
                        </Content>
                        <FullscreenButtons>
                            <Button danger onClick={aoppAPI.cancel}>Dismiss</Button>
                        </FullscreenButtons>
                    </Fullscreen>
                );
            case 'inactive':
                // Inactive, waiting for action.
                return null;
            case 'user-approval':
                return (
                    <Dialog title={t('aopp.title')}>
                        {/* TODO: remove subdomain try to capitalize the Domain.com */}
                        <p>{t('aopp.addressRequest', { host: aopp.callbackHost })}</p>
                        <DialogButtons>
                            <Button primary onClick={aoppAPI.approve}>{t('button.continue')}</Button>
                            <Button secondary onClick={aoppAPI.cancel}>{t('dialog.cancel')}</Button>
                        </DialogButtons>
                    </Dialog>
                );
            case 'awaiting-keystore':
                // TODO: use 'awaiting-device' and move the banner to 'awaiting-keystore'
                if (showDefaultUnlockView) {
                    // TODO: make it cancelable
                    return (
                        <Banner>{t('aopp.banner')}</Banner>
                    );
                }
                return (
                    <Fullscreen>
                        <AppLogo />
                        <Header title={t('aopp.title')} />
                        <Content>
                            {/* TODO: remove subdomain try to capitalize the Domain.com */}
                            <p>{t('aopp.addressRequest', { host: aopp.callbackHost })}</p>
                        </Content>
                        <FullscreenButtons>
                            <Button primary onClick={() => this.setState({ showDefaultUnlockView: true })}>
                                {t('button.continue')}
                            </Button>
                            <Button secondary onClick={aoppAPI.cancel}>{t('dialog.cancel')}</Button>
                        </FullscreenButtons>
                    </Fullscreen>
                );
            case 'choosing-account':
                if (aopp.accounts) {
                    const options = aopp.accounts.map(account => {
                        return {
                            text: account.name,
                            value: account.code,
                        };
                    });
                    return (
                        <Fullscreen>
                            <Header title={t('aopp.title')}>
                                {/* TODO: remove subdomain try to capitalize the Domain.com */}
                                <p>{aopp.callbackHost}</p>
                            </Header>
                            <form onSubmit={this.chooseAccount}>
                                <Content>
                                    {/* select the first and move placholder to label */}
                                    <Select
                                        label={t('buy.info.selectLabel')}
                                        options={options}
                                        defaultValue={options[0].value}
                                        value={accountCode}
                                        onChange={e => this.setState({ accountCode: e.target.value })}
                                        id="account" />
                                </Content>
                                <FullscreenButtons>
                                    <Button primary type="submit">
                                        {t('button.next')}
                                    </Button>
                                    <Button secondary onClick={aoppAPI.cancel}>
                                        {t('dialog.cancel')}
                                    </Button>
                                </FullscreenButtons>
                            </form>
                        </Fullscreen>
                    );
                }
                // show syncing message when no aopp.accounts are found
                // technically we don't need this return and could let it fall to case 'syncing'
                return (
                    <Fullscreen>
                        <Header title={t('aopp.title')}>
                            <p>{aopp.callbackHost}</p>
                        </Header>
                        <Content>{t('aopp.syncing')}</Content>
                    </Fullscreen>
                );
            case 'syncing':
                return (
                    <Fullscreen>
                        <Header title={t('aopp.title')}>
                            <p>{aopp.callbackHost}</p>
                        </Header>
                        <Content>{t('aopp.syncing')}</Content>
                    </Fullscreen>
                );
            case 'signing':
                return (
                    <Fullscreen>
                        <Header title={t('aopp.title')}>
                            <p className={styles.domainName}>{aopp.callbackHost}</p>
                        </Header>
                        <Content>
                            <p>{t('aopp.signing')}</p>
                            <ArrowDown />
                            <BitBox02Stylized className={styles.device} />
                        </Content>
                        <FullscreenButtons>
                            <Button secondary onClick={aoppAPI.cancel}>{t('dialog.cancel')}</Button>
                        </FullscreenButtons>
                    </Fullscreen>
                );
            case 'success':
                return (
                    <Fullscreen>
                        <Header title={t('aopp.title')}>
                            <p className={styles.domainName}>{aopp.callbackHost}</p>
                        </Header>
                        <Content>
                            <Checked className={styles.largeIcon} />
                            <h2 className={styles.title}>{t('aopp.success.title')}</h2>
                            <p>{t('aopp.success.message', { host: aopp.callbackHost })}</p>
                            <Field>
                                <Label>{t('aopp.labelAddress')}</Label>
                                <CopyableInput alignLeft value={aopp.address} />
                            </Field>
                            <Field>
                                <Label>{t('aopp.labelMessage')}</Label>
                                {/* TODO: render actual message */}
                                {/* @ts-ignore */}
                                <Input readOnly value={aopp.message} />
                            </Field>
                        </Content>
                        <FullscreenButtons>
                            <Button primary onClick={aoppAPI.cancel}>{t('button.complete')}</Button>
                            <div className={styles.buttonWithInfo}>
                                {/* TODO: show address again on the device */}
                                <Button secondary onClick={() => console.warn('TODO: show address on device again')}>
                                    {t('aopp.reverify')}
                                </Button>
                                <div className={styles.buttonInfoText}>
                                    {t('aopp.reverifyInfoText')}
                                </div>
                            </div>
                        </FullscreenButtons>
                    </Fullscreen>
                );
        }
    }
}

const subscribeHOC = subscribe<SubscribedProps, AoppProps & TranslateProps>(
    { aopp: 'aopp' },
    false,
    false,
)(Aopp);

const translateHOC = translate<AoppProps>()(subscribeHOC);
export { translateHOC as Aopp };
