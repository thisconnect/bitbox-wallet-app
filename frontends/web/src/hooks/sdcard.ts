// SPDX-License-Identifier: Apache-2.0

import { useEffect, useState } from 'react';
import { TDevices } from '@/api/devices';
import { checkSDCard } from '@/api/bitbox02';
import { getDeviceInfo as getBitBox01DeviceInfo } from '@/api/bitbox01';
import { useMountedRef } from './mount';

/**
 * useSDCard hook to check if one of the devices has a SDCard plugged in
 * @param devices which to check
 * @param dependencies array to re-run the check if any of the dependency change, devices is automatically added to the dependencies list
 */
export const useSDCard = (
  devices: TDevices,
  key: string,
) => {
  const [sdcard, setSDCard] = useState<boolean>(false);
  const mounted = useMountedRef();
  const deviceIDs = Object.keys(devices);

  useEffect(() => {
    let cancelled = false;
    Promise.all(deviceIDs.map(deviceID => {
      switch (devices[deviceID]) {
      case 'bitbox':
        return getBitBox01DeviceInfo(deviceID)
          .then(deviceInfo => deviceInfo ? deviceInfo.sdcard : Promise.reject(`Could get device info for ${deviceID}`));
      case 'bitbox02':
        return checkSDCard(deviceID);
      default:
        return false;
      }
    }))
      .then(sdcards => sdcards.some(sdcard => sdcard))
      .then(result => {
        if (mounted.current && !cancelled) {
          setSDCard(result);
        }
      })
      .catch(console.error);
    return () => {
      cancelled = true;
    };
  }, [mounted, deviceIDs, devices, key]);

  return sdcard;
};
