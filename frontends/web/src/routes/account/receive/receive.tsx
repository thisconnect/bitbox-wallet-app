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

import React, { FunctionComponent, useEffect, useRef, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useLoad } from '../../../hooks/api';
import { useEsc } from '../../../hooks/keyboard';
import * as accountApi from '../../../api/account';
import { TDevices } from '../../../api/devices';
import { route } from '../../../utils/route';
import { getScriptName, isEthereumBased } from '../utils';
import { alertUser } from '../../../components/alert/Alert';
import { CopyableInput } from '../../../components/copy/Copy';
// import { Dialog, DialogButtons } from '../../../components/dialog/dialog';
import { Button, ButtonLink, Radio } from '../../../components/forms';
import { Message } from '../../../components/message/message';
import { Entry } from '../../../components/guide/entry';
import { Guide } from '../../../components/guide/guide';
import { Header, Main } from '../../../components/layout';
import { View, ViewButtons, ViewContent, ViewHeader } from '../../../components/view/view';
import { QRCode } from '../../../components/qrcode/qrcode';
import { AngleDown, ArrowCirlceLeft, ArrowCirlceLeftActive, ArrowCirlceRight, ArrowCirlceRightActive, Copy, PointToBitBox02, Warning, QRCode as QRCodeIcon } from '../../../components/icon';
import { PairedWarning } from './components/bb01paired';
// import { useVerfiyLabel, VerifyButton } from './components/verfiybutton';
import style from './receive.module.css';
import { Step, Steps } from '../../../components/steps/steps';

interface Props {
    code: string;
    devices: TDevices;
    accounts: accountApi.IAccount[];
    deviceIDs: string[];
}

// For BTC/LTC: all possible address types we want to offer to the user, ordered by priority (first one is default).
// Types that are not available in the addresses delivered by the backend should be ignored.
const scriptTypes: accountApi.ScriptType[] = ['p2wpkh', 'p2tr', 'p2wpkh-p2sh'];

// Find index in list of receive addresses that matches the given script type, or -1 if not found.
const getIndexOfMatchingScriptType = (
    receiveAddresses: accountApi.ReceiveAddressList[],
    scriptType: accountApi.ScriptType
): number => {
    if (!receiveAddresses) {
        return -1;
    }
    return receiveAddresses.findIndex(addrs => addrs.scriptType !== null && scriptType === addrs.scriptType);
};

export const Receive: FunctionComponent<Props> = ({
    accounts,
    code,
    devices,
    deviceIDs,
}) => {
    const { t } = useTranslation();
    const [verifying, setVerifying] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    // index into `availableScriptTypes`, or 0 if none are available.
    const [addressType, setAddressType] = useState<number>(0);
    const [currentAddresses, setCurrentAddresses] = useState<accountApi.IReceiveAddress[]>();
    const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(0);

    const device = deviceIDs.length ? devices[deviceIDs[0]] : undefined;
    const account = accounts.find(({ code: accountCode }) => accountCode === code);
    // const verifyLabel = useVerfiyLabel(device);

    // first array index: address types. second array index: unused addresses of that address type.
    const receiveAddresses = useLoad(accountApi.getReceiveAddressList(code));
    const secureOutput = useLoad(accountApi.hasSecureOutput(code));

    useEsc(() => !verifying && route(`/account/${code}`));

    const availableScriptTypes = useRef<accountApi.ScriptType[]>();

    useEffect(() => {
        if (receiveAddresses) {
            // All script types that are present in the addresses delivered by the backend. Will be empty for if there are no such addresses, e.g. in Ethereum.
            availableScriptTypes.current = scriptTypes.filter(sc => getIndexOfMatchingScriptType(receiveAddresses, sc) >= 0);
        }
    }, [receiveAddresses]);

    useEffect(() => {
        if (receiveAddresses && availableScriptTypes.current) {
            let addressIndex = availableScriptTypes.current.length > 0 ? getIndexOfMatchingScriptType(receiveAddresses, availableScriptTypes.current[addressType]) : 0;
            if (addressIndex === -1) {
                addressIndex = 0;
            }
            setCurrentAddressIndex(addressIndex);
            setCurrentAddresses(receiveAddresses[addressIndex].addresses);
        }
    }, [addressType, availableScriptTypes, receiveAddresses]);

    const verifyAddress = (addressesIndex: number) => {
        if (receiveAddresses && secureOutput) {
            if (code === undefined) {
                return;
            }
            if (!secureOutput.hasSecureOutput) {
                alertUser(t('receive.warning.secureOutput'));
                return;
            }
            setVerifying(true);
            accountApi.verifyAddress(code, receiveAddresses[addressesIndex].addresses[activeIndex].addressID)
                .then(() => setVerifying(false));
        }
    };

    const previous = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (verifying && activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const next = (e: React.SyntheticEvent, numAddresses: number) => {
        e.preventDefault();
        if (!verifying && activeIndex < numAddresses - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    // enable copying only after verification has been invoked if verification is possible and not optional.
    const forceVerification = secureOutput === undefined ? true : (secureOutput.hasSecureOutput && !secureOutput.optional);
    const enableCopy = !forceVerification;

    let uriPrefix = '';
    if (account) {
        if (account.coinCode === 'btc' || account.coinCode === 'tbtc') {
            uriPrefix = 'bitcoin:';
        } else if (account.coinCode === 'ltc' || account.coinCode === 'tltc') {
            uriPrefix = 'litecoin:';
        }
    }

    let address = '';
    if (currentAddresses) {
        address = currentAddresses[activeIndex].address;
        if (!enableCopy && !verifying) {
            address = address.substring(0, 8) + '...';
        }
    }

    const hasManyScriptTypes = availableScriptTypes.current && availableScriptTypes.current.length > 1;

    return (
        <Main>
            <Header />
            <View
                onClose={() => console.log('close')}
                textCenter>
                <ViewHeader small title={t('receive.title', { accountName: account?.coinName })}>
                    <p>{account?.name}</p>
                    {device === 'bitbox' && (<PairedWarning deviceID={deviceIDs[0]} />)}
            
                    { account && isEthereumBased(account.coinCode) && (
                        <p>
                            <strong>
                                {t('receive.onlyThisCoin.warning', {
                                    coinName: account.coinName,
                                })}
                            </strong><br />
                            {t('receive.onlyThisCoin.description')}
                        </p>
                    )}
                </ViewHeader>
                <ViewContent>
                    <Steps current={1}>
                        <Step key="verify-address">
                            Verify address
                        </Step>
                        <Step key="done">
                            Done
                        </Step>
                    </Steps>
                    <h2 className="subTitle">Verify address</h2>
                    <p>Copy and paste the address to where you want to receive from.</p>
                    <PointToBitBox02 />
                    <Button secondary onClick={() => console.log('copy')}>
                        <Copy />
                        Copy adress
                    </Button>
                    <Button secondary onClick={() => console.log('qr')}>
                        <QRCodeIcon />
                        Show QR code
                    </Button>
                    <div hidden>
                        { address && (
                            <QRCode data={uriPrefix + address} />
                        )}
                    </div>
                    <Message type="info">
                        <Warning />
                        <h2>Verify address on BitBox02 before sending</h2>
                        Please verify the address on the BitBox02 matches where you are sending from.
                        Learn more on how to receive safely
                    </Message>
                    <Button>
                        More options
                        <AngleDown />
                    </Button>
                    <div>
                        { currentAddresses && (
                            <>
                                <div className={style.labels}>
                                { currentAddresses.length > 1 && (
                                    <button
                                        className={style.previous}
                                        onClick={previous}>
                                        {(verifying || activeIndex === 0) ? (
                                            <ArrowCirlceLeft height="24" width="24" />
                                        ) : (
                                            <ArrowCirlceLeftActive height="24" width="24" title={t('button.previous')} />
                                        )}
                                    </button>
                                )}
                                <p className={style.label}>
                                    {t('receive.label')} {currentAddresses.length > 1 ? `(${activeIndex + 1}/${currentAddresses.length})` : ''}
                                </p>
                                { currentAddresses.length > 1 && (
                                    <button
                                        className={style.next}
                                        onClick={e => next(e, currentAddresses.length)}>
                                        {(verifying || activeIndex >= currentAddresses.length - 1) ? (
                                            <ArrowCirlceRight height="24" width="24" />
                                        ) : (
                                            <ArrowCirlceRightActive height="24" width="24" title={t('button.next')} />
                                        )}
                                    </button>
                                )}
                                </div>
                            { hasManyScriptTypes && (
                                <>
                                    <h3>{t('receive.changeScriptType')}</h3>
                                    {availableScriptTypes.current && availableScriptTypes.current.map((scriptType, i) => (
                                        <div key={scriptType}>
                                            <Radio
                                                checked={addressType === i}
                                                id={scriptType}
                                                name="scriptType"
                                                onChange={() => {
                                                    setActiveIndex(0);
                                                    setAddressType(i);
                                                }}
                                                title={getScriptName(scriptType)}>
                                                {t(`receive.scriptType.${scriptType}`)}
                                            </Radio>
                                            {scriptType === 'p2tr' && addressType === i && (
                                                <Message type="warning">
                                                    {t('receive.taprootWarning')}
                                                </Message>
                                            )}
                                        </div>
                                    ))}
                                    <CopyableInput disabled={!enableCopy} value={address} flexibleHeight />
                                </>
                            )}
                            </>
                        )}
                    </div>
                </ViewContent>
                <ViewButtons>
                    <Button
                        onClick={() => verifyAddress(currentAddressIndex)}
                        primary>
                        {t('button.next')}
                    </Button>
                    <ButtonLink
                        transparent
                        to={`/account/${code}`}>
                        {t('button.back')}
                    </ButtonLink>
                </ViewButtons>
            </View>
            <Guide>
                <Entry key="guide.receive.address" entry={t('guide.receive.address')} />
                <Entry key="guide.receive.whyVerify" entry={t('guide.receive.whyVerify')} />
                <Entry key="guide.receive.howVerify" entry={t('guide.receive.howVerify')} />
                <Entry key="guide.receive.plugout" entry={t('guide.receive.plugout')} />
                {currentAddresses && (
                    <>
                        {currentAddresses.length > 1 && <Entry key="guide.receive.whyMany" entry={t('guide.receive.whyMany')} />}
                        {currentAddresses.length > 1 && <Entry key="guide.receive.why20" entry={t('guide.receive.why20')} />}
                        {currentAddresses.length > 1 && <Entry key="guide.receive.addressChange" entry={t('guide.receive.addressChange')} />}
                        {receiveAddresses && receiveAddresses.length > 1 && currentAddresses.length > 1 && <Entry key="guide.receive.addressFormats" entry={t('guide.receive.addressFormats')} />}
                    </>
                )}
            </Guide>
        </Main>
    );
    // return (
    //     <div className="contentWithGuide">
    //         <div className="container">
    //             {device === 'bitbox' && (<PairedWarning deviceID={deviceIDs[0]} />)}
    //             <Header title={<h2>{t('receive.title', { accountName: account?.coinName })}</h2>} />
    //             <div className="innerContainer scrollableContainer">
    //                 <div className="content narrow isVerticallyCentered">
    //                     <div className="box large text-center">
    //                     { currentAddresses && (
    //                         <div style={{position: 'relative'}}>
    //                             <div className={style.qrCodeContainer}>
    //                                 <QRCode data={enableCopy ? uriPrefix + address : undefined} />
    //                             </div>
    //                             
    //                             { hasManyScriptTypes && (
    //                                 <button
    //                                     className={style.changeType}
    //                                     onClick={() => setAddressDialog(!addressDialog ? { addressType } : undefined)}>
    //                                     {t('receive.changeScriptType')}
    //                                 </button>
    //                             )}
                                
    //                             <div className="buttons">
    //                                 <VerifyButton
    //                                     device={device}
    //                                     disabled={verifying || secureOutput === undefined}
    //                                     forceVerification={forceVerification}
    //                                     onClick={() => verifyAddress(currentAddressIndex)}/>
                                    
    //                             </div>
    //                             { forceVerification && verifying && (
    //                                 <div className={style.hide}></div>
    //                             )}
    //                             { account && forceVerification && verifying && (
    //                                 <Dialog
    //                                     title={verifyLabel}
    //                                     disableEscape={true}
    //                                     medium centered>
    //                                     <div className="text-center">
    //                                         <QRCode data={uriPrefix + address} />
    //                                         <p>{t('receive.verifyInstruction')}</p>
    //                                     </div>
    //                                     <div className="m-bottom-half">
    //                                         <CopyableInput value={address} flexibleHeight />
    //                                     </div>
    //                                 </Dialog>
    //                             )}
    //                         </div>
    //                     )}
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // );
};
