(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dxLog = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 * If the dxLog.level value is set to FAIL, WARN, INFO or DEBUG, then log messages will only be written out at
 * the specified level or higher (thus, if set to INFO, the default, DEBUG messages will not be logged)
 */

/*
 * Define constants for the logging level
 */

var LEVEL = {
    FAIL: 80,
    WARN: 60,
    INFO: 40,
    DEBUG: 20
};

/*
 * Report a failing message. Writes the info to the console and throws an error
 */
function fail() {
    throw new Error(arguments[0]);
}

/*
 * Report a warning message. Writes the info to the console
 */
function warn() {
    if (module.exports.level <= LEVEL.WARN) {
        console.warn.apply(console, arguments);
    }
}

/*
 * Report an info message. Writes the info to the console
 */
function info() {
    if (module.exports.level <= LEVEL.INFO) {
        console.info.apply(console, arguments);
    }
}

/*
 * Report an debug message. Writes the info to the console
 */
function debug() {
    if (module.exports.level <= LEVEL.DEBUG) {
        console.log.apply(console, arguments);
    }
}

module.exports = {
    LEVEL: LEVEL,
    level: LEVEL.INFO,
    fail: fail,
    warn: warn,
    info: info,
    debug: debug
};

},{}]},{},[1])(1)
});
//# sourceMappingURL=dxLog.map
