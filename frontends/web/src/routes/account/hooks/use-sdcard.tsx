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

import { useState, useEffect } from 'preact/hooks';
import { apiGet } from '../../../utils/request';

export function useSDCard(devices, code) {
    const [sdcard, setSdcard] = useState(false);

    useEffect(() => {
        if (!devices) {
            return;
        }
        const ids = Object.keys(devices);
        Promise.all(ids.map(id => {
            switch (devices[id]) {
                case 'bitbox':
                    return apiGet(`devices/${id}/info`)
                        .then(info => {
                            if (!info) {
                                return false;
                            }
                            return info.sdcard;
                        });
                case 'bitbox02':
                    return apiGet(`devices/bitbox02/${id}/check-sdcard`)
                        .then(sdcard => sdcard);
                default:
                    return;
            }
        }))
            .then(sdcards => sdcards.some(sdcard => sdcard))
            .then(hasCard => setSdcard(hasCard))
            .then(() => console.log('what'))
            .catch(console.error);

    }, [devices, code]);

    return { hasCard: sdcard };
}
