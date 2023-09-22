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

import { useEffect, useState } from 'react';

type TExperimentalDeviceName = 'camera' | 'microphone' | 'speaker';

export const useDevicePermission = (deviceName: TExperimentalDeviceName) => {
  const [permissionState, setPermissionState] = useState<PermissionState>();

  useEffect(() => {
    navigator.permissions
      // TypeScript broke this somehow in 4.4.2
      // https://github.com/microsoft/TypeScript/issues/33923
      // Type '"camera"' is not assignable to type 'PermissionName'.ts(2322)
      .query({ name: deviceName } as unknown as PermissionDescriptor)
      .then((permissionStatus) => {
        setPermissionState(permissionStatus.state);
        console.log(`camera permission status is ${permissionStatus.state}`);
        permissionStatus.onchange = () => {
          setPermissionState(permissionStatus.state);
          console.log(
            `camera permission status has changed to ${permissionStatus.state}`,
          );
        };
      });
  });

  return permissionState; // 'granted', 'denied' or 'prompt'
};
