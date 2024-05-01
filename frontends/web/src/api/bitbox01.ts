/**
 * Copyright 2022-2024 Shift Crypto AG
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

import { apiGet, apiPost } from '../utils/request';
import { SuccessResponse } from './response';

export type DeviceInfo = {
  bootlock: boolean;
  id: string;
  lock: boolean;
  name: string;
  new_hidden_wallet: boolean;
  pairing: boolean;
  seeded: boolean;
  serial: string;
  sdcard: boolean;
  TFA: string;
  U2F: boolean;
  U2F_hijack: boolean;
  version: string;
};

export const getDeviceInfo = (
  deviceID: string,
): Promise<DeviceInfo> => {
  return apiGet(`devices/${deviceID}/info`);
};

// backend/devices/bitbox/status.go
type TDeviceStatus = 'bootloader'
  | 'uninitialized'
  | 'initialized'
  | 'logged_in'
  | 'seeded'
  | 'require_firmware_upgrade'
  | 'require_app_upgrade';

export const getStatus = (deviceID: string): Promise<TDeviceStatus> => {
  return apiGet(`devices/${deviceID}/status`);
};

type TLoginResponse = SuccessResponse | {
  code: number;
  errorMessage: string;
  remainingAttempts: number;
  needsLongTouch: boolean;
  // success: false;
};

export const login = (
  deviceID: string,
  password: string,
): Promise<TLoginResponse> => {
  return apiPost(`devices/${deviceID}/login`, { password });
};

export const unlockBootloader = (deviceID: string): Promise<boolean> => {
  return apiPost(`devices/${deviceID}/unlock-bootloader`);
};

export const getBundledFirmwareVersion = (deviceID: string): Promise<string> => {
  return apiGet(`devices/${deviceID}/bundled-firmware-version`);
};
