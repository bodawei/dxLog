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

'use strict';

var BASE_PATH = process.cwd();
var OUT_DIR = BASE_PATH + '/temp/';
var SOURCE_DIR = BASE_PATH + '/source/';

// http://karma-runner.github.io/0.13/config/configuration-file.html
module.exports = function(config) {
    config.set({

        basePath: './',

        logLevel: config.LOG_ERROR, // also: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG

        reportSlowerThan: 200,

        browsers: ['PhantomJS2'],

        captureTimeout: 20000,      // If browser does not capture in given timeout [ms], kill it

        autoWatch: false,

        singleRun: true,

        files: [
            BASE_PATH + '/build/jasmineSetup.js',
            SOURCE_DIR + '**/*.js'
        ],

        exclude: [],

        preprocessors: {},

        frameworks: ['jasmine', 'browserify'],

        // https://github.com/Nikku/karma-browserify
        browserify: {
            debug: true,
            watch: true,
            transform: [
                ['babelify', {presets: ['es2015']}],
                ['browserify-istanbul', {
                    ignore: '**/*.unit.js'
                }]
            ]
        },

        reporters: ['progress', 'junit', 'coverage'],

        junitReporter: {
            outputDir: OUT_DIR + 'testResults'
        },

        // https://github.com/karma-runner/karma-coverage
        coverageReporter: {
            dir : OUT_DIR + 'testCoverage/',
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'text', subdir: '.', file: 'text.txt' }
            ]
        }
    });

    // Need to configure this "externally" for the dynamic key
    config.preprocessors[SOURCE_DIR + '/**/*.js'] = ['browserify'];

};

