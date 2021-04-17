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
import '../../../i18n/i18n';
import Status from '../../../components/status/status';
import { Overview } from './overview';
import { useSDCard } from '../hooks/use-sdcard';

export function AccountOverview(props) {
    const { hasCard } = useSDCard(props.devices, props.code);
    return (
        <div class="contentWithGuide">
            <div class="container">
                <Status key="warning.sdcard" hidden={!hasCard} type="warning">
                    {('warning.sdcard')}
                </Status>
                <Overview {...props} />
            </div>
        </div>
    );
}