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

import { FunctionComponent } from 'react';
import { useTranslation, withTranslation, WithTranslation } from 'react-i18next';
import { subscribe } from '../decorators/subscribe';
import Status from './status/status';

interface LoadedProps {
    usingMobileData: boolean;
}

type Props = LoadedProps & WithTranslation;

const MobileDataWarning : FunctionComponent<Props> = ({ usingMobileData}) =>{
    const {t} = useTranslation();
    return (
        <Status dismissable="mobile-data-warning" type="warning" hidden={!usingMobileData}>
            {t('mobile.usingMobileDataWarning')}
        </Status>
    );
}

const HOC = withTranslation()(
    subscribe<LoadedProps, WithTranslation>({ usingMobileData: 'using-mobile-data' })(MobileDataWarning) as any
);

export { HOC as MobileDataWarning };
