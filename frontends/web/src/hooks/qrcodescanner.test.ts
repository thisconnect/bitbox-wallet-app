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

import { describe, expect, it, vi } from 'vitest';
import { MutableRefObject } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { BrowserQRCodeReader } from '@zxing/library';
import { useQRCodeScanner } from './qrcodescanner';

const mockedQRCodeReaderInstance = () => ({
  getVideoInputDevices: vi.fn().mockResolvedValue(['camera1']),
  decodeFromInputVideoDevice: vi.fn().mockResolvedValue({
    getText: vi.fn().mockReturnValue('mockedQRValue')
  }),
  reset: vi.fn()
});

vi.mock('../components/alert/Alert', () => ({
  alertUser: vi.fn()
}));

describe('useQRCodeScanner', () => {
  it('should determine if a camera is available', async () => {
    const qrCodeReaderRef = { current: mockedQRCodeReaderInstance() } as unknown as MutableRefObject<BrowserQRCodeReader | undefined>;
    const props = {
      qrCodeReaderRef,
      activeScanQR: false,
      onChangeActiveScanQR: vi.fn(),
      parseQRResult: vi.fn()
    };

    const { result } = renderHook(() => useQRCodeScanner(props));

    await waitFor(() => expect(result.current).toBe(true));

  });

  it('should process QR code scanning', async () => {
    const qrCodeReaderRef = {
      current: mockedQRCodeReaderInstance()
    } as unknown as MutableRefObject<BrowserQRCodeReader | undefined>;

    const onChangeActiveScanQR = vi.fn();
    const parseQRResult = vi.fn();

    const props = {
      qrCodeReaderRef,
      activeScanQR: true,
      onChangeActiveScanQR,
      parseQRResult
    };

    renderHook(() => useQRCodeScanner(props));

    await waitFor(() => expect(qrCodeReaderRef.current).not.toBeNull());

    expect(onChangeActiveScanQR).toHaveBeenCalledWith(false);
    expect(parseQRResult).toHaveBeenCalledWith('mockedQRValue');
  });
});
