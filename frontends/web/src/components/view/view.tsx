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

import { AppLogo } from '../icon';
import { Footer } from '../layout';
import { SwissMadeOpenSource } from '../icon/logo';
import { Close } from '../icon/icon';
import * as style from './view.css';
import { FunctionComponent } from 'react';

type Props = {
    center?: boolean;
    onClose?: () => void;
    position?: 'fill' | 'fullscreen';
    width?: string;
    withBottomBar?: boolean;
}

export const View:FunctionComponent<Props> = ({
    center = false,
    children,
    onClose,
    position = 'fill',
    width,
    withBottomBar,
}) => {
    const styles = width ? { width: width} : {};
    return (
        <div className={position === 'fullscreen' ? style.fullscreen : style.fill}>
            <div
                className={center ? `${style.inner} ${style.center}` : style.inner}
                style={styles}>
                {children}
            </div>
            {onClose && (
                <button className={style.closeButton} onClick={onClose}>
                    <Close />
                </button>
            )}
            {withBottomBar && (
                <div style={{marginTop: 'auto'}}>
                    <Footer>
                        <SwissMadeOpenSource />
                    </Footer>
                </div>
            )}
        </div>
    );
}

type ViewContentProps = {
    fullWidth?: boolean;
}

export const ViewContent:FunctionComponent<ViewContentProps> = ({
    children,
    fullWidth,
}) => {
    const classes = `${style.content} ${fullWidth ? style.fullWidth : ''}`;
    return (
        <div className={classes}>{children}</div>
    );
}

type HeaderProps = {
    small?: boolean;
    title: string;
    withAppLogo?: boolean;
}

export const ViewHeader:FunctionComponent<HeaderProps> = ({
    children,
    small,
    title,
    withAppLogo
}) => {
    const headerStyles = small ? `${style.header} ${style.smallHeader}` : style.header;
    return (
        <header className={headerStyles}>
            {withAppLogo && <AppLogo />}
            <h1 className={style.title}>{title}</h1>
            {children}
        </header>
    );
}

export const ViewButtons:FunctionComponent = ({ children }) => {
    return (
        <div className={style.buttons}>
            {children}
        </div>
    );
}
