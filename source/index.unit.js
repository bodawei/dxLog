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

describe('dxLog', function() {

    describe('fail()', function() {

        it('throws an Error', function() {
            spyOn(console, 'error');

            expect(function() {
                dxLog.fail('foo');
            }).toThrowError('foo');
        });

        it('does not log a message', function() {
            spyOn(console, 'error');

            expect(function() {
                dxLog.fail('foo');
            }).toThrowError('foo');

            expect(console.error).not.toHaveBeenCalled();
        });

    });

    describe('warn()', function() {

        it('logs a warning message', function() {
            spyOn(console, 'warn');

            dxLog.warn('foo');

            expect(console.warn).toHaveBeenCalled();
        });

        it('will not log a message if the log level is above WARN', function() {
            var oldMode = dxLog.level;
            dxLog.level = dxLog.LEVEL.FAIL;
            spyOn(console, 'warn');

            dxLog.warn('foo');

            expect(console.warn).not.toHaveBeenCalled();
            dxLog.level = oldMode;
        });

    });

    describe('info()', function() {

        it('logs a message', function() {
            spyOn(console, 'info');

            dxLog.info('foo');

            expect(console.info).toHaveBeenCalled();
        });

        it('will not log a message if the log level is above INFO', function() {
            var oldMode = dxLog.level;
            dxLog.level = dxLog.LEVEL.WARN;
            spyOn(console, 'info');

            dxLog.info('foo');

            expect(console.info).not.toHaveBeenCalled();
            dxLog.level = oldMode;
        });

    });

    describe('debug()', function() {

        it('logs a message (if log level is at least debug)', function() {
            var oldMode = dxLog.level;
            dxLog.level = dxLog.LEVEL.DEBUG;
            spyOn(console, 'log');

            dxLog.debug('foo');

            expect(console.log).toHaveBeenCalled();

            dxLog.level = oldMode;
        });

        it('will not log a message if the log level is above DEBUG', function() {
            var oldMode = dxLog.level;
            dxLog.level = dxLog.LEVEL.WARN;
            spyOn(console, 'log');

            dxLog.debug('foo');

            expect(console.log).not.toHaveBeenCalled();
            dxLog.level = oldMode;
        });

    });

    describe('level', function() {

        it('is set to INFO by default', function() {
            expect(dxLog.level).toEqual(dxLog.LEVEL.INFO);
        });

    });

    describe('LEVEL', function() {

        it('has the expected keys', function() {
            expect(Object.keys(dxLog.LEVEL).sort()).toEqual([ 'DEBUG', 'FAIL', 'INFO', 'WARN']);
        });

    });
});
