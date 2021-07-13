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

import { equal } from '../../src/utils/equal';

describe('equal', () => {
    it('is false for null and 0', () => {
        expect(equal(null, 0)).toBeFalsy();
        expect(equal(0, null)).toBeFalsy();
    });

    it('is true for null and null', () => {
        expect(equal(null, null)).toBeTruthy();
    });

    it('compares ints', () => {
        expect(equal(13, 13)).toBeTruthy();
        expect(equal(1, 13)).toBeFalsy();
    });

    it('compares strings', () => {
        expect(equal('foo', 'foo')).toBeTruthy();
        expect(equal('foo', 'bar')).toBeFalsy();
    });

    it('is always false for different types', () => {
        const a = { one: 'two' };
        const b = ['two'];
        expect(equal(a, b)).toBeFalsy();
    });

    describe('arrays', () => {
        it('is false for [] and null', () => {
            expect(equal([], null)).toBeFalsy();
            expect(equal(null, [])).toBeFalsy();
        });

        it('is true for same elements, same order', () => {
            const a = [1, 2, 3];
            const b = [1, 2, 3];
            expect(equal(a, b)).toBeTruthy();
        });

        it('is false for same elements, diff order', () => {
            const a = [1, 2, 3];
            const b = [1, 3, 2];
            expect(equal(a, b)).toBeFalsy();
            expect(equal(b, a)).toBeFalsy();
        });

        it('is false with an extra element', () => {
            const a = [1, 2, 3];
            const b = [1, 2];
            expect(equal(a, b)).toBeFalsy();
            expect(equal(b, a)).toBeFalsy();
        });

        it('is false for different elements', () => {
            const a = [1, 13];
            const b = [11, 42];
            expect(equal(a, b)).toBeFalsy();
            expect(equal(b, a)).toBeFalsy();
        });

        it('is true for array with same objects', () => {
            const a = [{a: 1}, {a: 2}, {a: 3}];
            const b = [{a: 1}, {a: 2}, {a: 3}];
            expect(equal(a, b)).toBeTruthy();
        });

        it('is true for array with different objects', () => {
            const a = [{a: 1}, {a: 2}, {a: 3, b: 4}];
            const b = [{a: 1}, {a: 2}, {a: 3}];
            expect(equal(a, b)).toBeFalsy();
        });
    });

    describe('objects', () => {
        it('is false for {} and null', () => {
            expect(equal({}, null)).toBeFalsy();
            expect(equal(null, {})).toBeFalsy();
        });

        it('is true for same key/value pairs', () => {
            const a = { one: 'two', three: 'four' };
            const b = { one: 'two', three: 'four' };
            expect(equal(a, b)).toBeTruthy();
        });

        it('is false with an extra key', () => {
            const a = { one: 'two' };
            const b = { one: 'two', three: 'four' };
            expect(equal(a, b)).toBeFalsy();
            expect(equal(b, a)).toBeFalsy();
        });

        it('is false with different keys', () => {
            const a = { one: 'two', foo: 'bar' };
            const b = { one: 'two', three: 'four' };
            expect(equal(a, b)).toBeFalsy();
            expect(equal(b, a)).toBeFalsy();
        });

        it('ignores keys order', () => {
            const a = { one: 'two', three: 'four' };
            const b = { three: 'four', one: 'two' };
            expect(equal(a, b)).toBeTruthy();
            expect(equal(b, a)).toBeTruthy();
        });

        it('compares values', () => {
            const a = { one: 'two', three: 'four' };
            const b = { one: 'two', three: 'bar' };
            expect(equal(a, b)).toBeFalsy();
        });

        it('compares with null', () => {
            const a = { one: 'two', three: 'four' };
            expect(equal(a, null)).toBeFalsy();
            expect(equal(null, a)).toBeFalsy();
        });
    });
});
