/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Copyright (c) 2015, 2016 by Delphix. All rights reserved.
 */

/* eslint-disable no-console */
/* eslint-env jasmine */

'use strict';

const dxLog = require('./index.js');

describe('dxLog', () => {
    let startingLevel;

    beforeEach(() => {
        startingLevel = dxLog.getLogLevel();
    });

    afterEach(() => {
        dxLog.setLogLevel(startingLevel);
    });

    describe('fail()', () => {

        it('throws an Error', () => {
            spyOn(console, 'error');

            expect(function() {
                dxLog.fail('foo');
            }).toThrowError('foo');
        });

        it('does not log a message', () => {
            spyOn(console, 'error');

            expect(function() {
                dxLog.fail('foo');
            }).toThrowError('foo');

            expect(console.error).not.toHaveBeenCalled();
        });

    });

    describe('warn()', () => {

        it('logs a warning message', () => {
            spyOn(console, 'warn');

            dxLog.warn('foo');

            expect(console.warn).toHaveBeenCalled();
        });

        it('will not log a message if the log level is above WARN', () => {
            dxLog.setLogLevel(dxLog.LEVEL.FAIL);
            spyOn(console, 'warn');

            dxLog.warn('foo');

            expect(console.warn).not.toHaveBeenCalled();
        });

    });

    describe('info()', () => {

        it('logs a message', () => {
            spyOn(console, 'info');

            dxLog.info('foo');

            expect(console.info).toHaveBeenCalled();
        });

        it('will not log a message if the log level is above INFO', () => {
            dxLog.setLogLevel(dxLog.LEVEL.WARN);
            spyOn(console, 'info');

            dxLog.info('foo');

            expect(console.info).not.toHaveBeenCalled();
        });

    });

    describe('debug()', () => {

        it('logs a message (if log level is at least debug)', () => {
            dxLog.setLogLevel(dxLog.LEVEL.DEBUG);
            spyOn(console, 'log');

            dxLog.debug('foo');

            expect(console.log).toHaveBeenCalled();
        });

        it('will not log a message if the log level is above DEBUG', () => {
            dxLog.setLogLevel(dxLog.LEVEL.FAIL);
            spyOn(console, 'log');

            dxLog.debug('foo');

            expect(console.log).not.toHaveBeenCalled();
        });

    });

    describe('getLogLevel()', () => {

        it('returns the INFO level by default', () => {
            expect(dxLog.getLogLevel()).toEqual(dxLog.LEVEL.INFO);
        });

        it('returns the level set with setLogLevel', () => {
            dxLog.setLogLevel(dxLog.LEVEL.DEBUG);

            expect(dxLog.getLogLevel()).toEqual(dxLog.LEVEL.DEBUG);
        });

    });

    describe('setLogLevel()', () => {

        it('can be used to change the log level', () => {
            dxLog.setLogLevel(dxLog.LEVEL.DEBUG);

            expect(dxLog.getLogLevel()).toEqual(dxLog.LEVEL.DEBUG);
        });

        it('throws an error if called with a non-number', () => {
            expect(() => {
                dxLog.setLogLevel('hi');
            }).toThrowError('New log level must be between 0 and 100. Got "hi". See dxLog.LEVEL for constants.');
        });

        it('throws an error if called with a number below range', () => {
            expect(() => {
                dxLog.setLogLevel(-1);
            }).toThrowError('New log level must be between 0 and 100. Got "-1". See dxLog.LEVEL for constants.');
        });

        it('throws an error if called with a number above range', () => {
            expect(() => {
                dxLog.setLogLevel(1000);
            }).toThrowError('New log level must be between 0 and 100. Got "1000". See dxLog.LEVEL for constants.');
        });

    });

    describe('LEVEL', () => {

        it('has the expected keys', () => {
            expect(Object.keys(dxLog.LEVEL).sort()).toEqual([ 'DEBUG', 'FAIL', 'INFO', 'WARN']);
        });

    });
});
