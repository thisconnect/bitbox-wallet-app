/**
 * Copyright 2023 Shift Crypto AG
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

import { ReactNode } from 'react';
import style from './settingsButton.module.css';

type TProps = {
  optionalText?: string;
  optionalIcon?: JSX.Element;
  children: ReactNode;
}
export const SettingsItem = ({ optionalText, optionalIcon, children }: TProps) => {
  return (
    <div className={[style.container, style.item].join(' ')}>
      {children}
      {optionalText && <span className={style.optionalText}>{optionalText}</span>}
      {optionalIcon}
    </div>
  );

};
