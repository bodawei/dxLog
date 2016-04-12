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

'use strict';

/*
 * This module defines a simple logging interface. By default, this will log messages to the console.
 * The logging functions are:
 *    dxLog.fail();
 *    dxLog.warn();
 *    dxLog.info();
 *    dxLog.debug();
 * If the dxLog.setLogLevel() is set to FAIL, WARN, INFO or DEBUG, then log messages will only be written out at
 * the specified level or higher (thus, if set to INFO, the default, DEBUG messages will not be logged)
 */

/*
 * Define constants for the logging level
 */
const LEVEL = {
    FAIL: 80,
    WARN: 60,
    INFO: 40,
    DEBUG: 20
};

let level = LEVEL.INFO;

/*
 * Report a failing message by way of throwing an error
 */
function fail() {
    throw new Error(arguments[0]);
}

/*
 * Report a warning message. Writes the info to the console
 */
function warn(...args) {
    if (getLogLevel() <= LEVEL.WARN) {
        console.warn(...args);
    }
}

/*
 * Report an info message. Writes the info to the console
 */
function info(...args) {
    if (getLogLevel() <= LEVEL.INFO) {
        console.info(...args);
    }
}

/*
 * Report an debug message. Writes the info to the console
 */
function debug(...args) {
    if (getLogLevel() <= LEVEL.DEBUG) {
        console.log(...args);
    }
}

/*
 * Set the log level. Any log messages below (less significant than) the specified level
 * will not be reported.
 */
function setLogLevel(newLevel) {
    if (typeof newLevel !== 'number' || newLevel < 0 || newLevel > 100) {
        fail(`New log level must be between 0 and 100. Got "${newLevel}". See dxLog.LEVEL for constants.`);
    }
    level = newLevel;
}

/*
 * Retrieve the current log level.
 */
function getLogLevel() {
    return level;
}

module.exports = {
    LEVEL: LEVEL,
    setLogLevel: setLogLevel,
    getLogLevel: getLogLevel,
    fail: fail,
    warn: warn,
    info: info,
    debug: debug
};
