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

import { h, JSX, RenderableProps } from 'preact';
import * as styles from './input.css';

export interface Props {
    align?: 'left' | 'right';
    autoFocus?: boolean;
    className?: string;
    disabled?: boolean;
    error?: string;
    getRef?: (node: HTMLInputElement | null) => void;
    id?: string;
    label?: string;
    min?: string;
    name?: string;
    onInput?: (e: Event) => void;
    onPaste?: (e: Event) => void;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    step?: string;
    style?: string;
    title?: string;
    transparent?: boolean;
    type?: 'text' | 'password' | 'number';
    value?: string | number;
    maxLength?: number;
    labelSection?: JSX.Element | undefined;
}

export default function Input({
    id,
    label = '',
    error,
    align = 'left',
    className = '',
    style = '',
    children,
    getRef,
    transparent = false,
    type = 'text',
    labelSection,
    ...props
}: RenderableProps<Props>): JSX.Element {
    return (
        <div className={[
            styles.input,
            styles[`align-${align}`],
            className,
            transparent ? styles.isTransparent : '',
        ].join(' ')} style={style}>
            {
                label && (
                    <div className="flex flex-row flex-between">
                        <label for={id} className={error ? styles.errorText : ''}>
                            {label}
                            {
                                error && (
                                    <span>:<span>{error}</span></span>
                                )
                            }
                        </label>
                        {labelSection && labelSection}
                    </div>
                )
            }
            <input
                autoComplete="off"
                autoCorrect="off"
                spellcheck={false}
                type={type}
                id={id}
                ref={getRef}
                {...props}
            />
            {children}
        </div>
    );
}
