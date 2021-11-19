/**
 * Copyright 2018 Shift Devices AG
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

import { ChangeEvent, Component } from 'react';
import { WithTranslation, withTranslation } from 'react-i18next';
import { load } from '../../../decorators/load';
import { apiPost } from '../../../utils/request';
import { Toggle } from '../../toggle/toggle';

interface ToggleProps {
    deviceID: string;
}

interface LoadedProps {
    enabled: boolean;
}

type Props = ToggleProps & LoadedProps & WithTranslation;

class ToggleFWHash extends Component<Props, {}> {
    private handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
        apiPost(
            'devices/bitbox02-bootloader/' + this.props.deviceID + '/set-firmware-hash-enabled',
            event.target.checked,
        );
    }

    public render() { 
        const{ t,
            enabled,
          } = this.props;
        return (
            <div className="box slim divide">
                <div className="flex flex-row flex-between flex-items-center">
                    <p className="m-none">{t('bb02Bootloader.advanced.toggleShowFirmwareHash')}</p>
                    <Toggle
                        checked={enabled}
                        id="togggle-show-firmware-hash"
                        onChange={this.handleToggle}
                        className="text-medium" />
                </div>
            </div>
        );
    }
}

const loadHOC = load<LoadedProps, ToggleProps & WithTranslation>(({ deviceID }) => ({ enabled: 'devices/bitbox02-bootloader/' + deviceID + '/show-firmware-hash-enabled' }))(ToggleFWHash);
const HOC = withTranslation()(loadHOC);
export { HOC as ToggleShowFirmwareHash };
