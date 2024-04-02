/**
 * Copyright 2024 Shift Crypto AG
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

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import { Amount } from './amount';
import { ConversionUnit } from '../../api/account';
import { i18n } from '../../i18n/i18n';

vi.mock('react', async () => ({
  ...(await vi.importActual('react')),
}));

describe('Fiat amount formatting', () => {
  beforeEach(() => {
    vi.resetModules(); // Ensure module state is reset before each test
  });

  describe('fiat amounts de-CH formatted', () => {
    beforeEach(() => {
      vi.mocked(i18n).language = 'de-CH';
    });
    const fiatCoins: ConversionUnit[] = ['USD', 'EUR', 'CHF'];
    fiatCoins.forEach(coin => {
      it(`1'340.25 ${coin} should be formatted as 1’340.25`, () => {
        const { container } = render(<Amount amount="1340.25" unit={coin} />);
        expect(container).toHaveTextContent('1’340.25');
      });
      it(`218.00 ${coin} should be formatted as 218.00`, () => {
        const { container } = render(<Amount amount="218.00" unit={coin} />);
        expect(container).toHaveTextContent('218.00');
      });
    });
  });

  describe('fiat amounts en-US formatted', () => {
    beforeEach(() => {
      vi.mocked(i18n).language = 'en-US';
    });
    const fiatCoins: ConversionUnit[] = ['USD', 'EUR', 'CHF'];
    fiatCoins.forEach(coin => {
      it(`en-US 1'340.25 ${coin} should be formatted as 1,340.25`, () => {
        const { container } = render(<Amount amount="1340.25" unit={coin} />);
        expect(container).toHaveTextContent('1,340.25');
      });
      it(`en-US 218.00 ${coin} should be formatted as 218.00`, () => {
        const { container } = render(<Amount amount="218.00" unit={coin} />);
        expect(container).toHaveTextContent('218.00');
      });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks(); // Restore mocks to original state
  });
});
