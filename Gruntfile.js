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

/* eslint-env node */

'use strict';

var jitGrunt = require('jit-grunt');

var BUILD_DIR = './build/';
var SOURCE_DIR = './source/';
var OUT_DIR = './temp/';
var DIST_DIR = './dist/';
var NODE_MODULES_DIR = './node_modules';
var DIST_NPM_DIR = DIST_DIR + '/npm/dxLog/';
var DIST_FLAT_DIR = DIST_DIR + '/es5file/';

var JS_SOURCE_FILE_GLOB = [ SOURCE_DIR + '/*.js', '!' + SOURCE_DIR + '/*.unit.js'];
var JS_FILE_GLOB = [
    BUILD_DIR + '**/*.js',
    SOURCE_DIR + '**/*.js',
    './Gruntfile.js'
];
var OTHER_FILE_GLOB = [ SOURCE_DIR + '/*', '!' + SOURCE_DIR + '/*.js'];

module.exports = function(grunt) {
    var browsers;

    jitGrunt(grunt);

    // Figure out what browsers we should be able to run on the current platform.
    if (/darwin/.test(process.platform)) {
        browsers = ['Chrome', 'Firefox', 'Safari', 'PhantomJS2'];
    } else if (/^win/.test(process.platform)) {
        browsers = ['Chrome', 'Firefox', 'Internet Explorer', 'PhantomJS2'];
    } else {
        grunt.fail.fatal('Unknown or unsupported platform. Please add support for it with a pull request.');
    }

    grunt.initConfig({
        eslint: {
            target: JS_FILE_GLOB,
            options: {
                configFile: BUILD_DIR + 'style/eslint',
                rulePaths: [BUILD_DIR + 'style/eslintRules'],
                cache: true,
                cacheLocation: OUT_DIR + 'eslintCache.json'
            }
        },
        jscs: {
            src: JS_FILE_GLOB,
            options: {
                config: BUILD_DIR + 'style/jscs'
            }
        },
        karma: {
            dist: {
                configFile: BUILD_DIR + 'karmaConfig.js',
                browsers: browsers
            },
            dev: {
                configFile: BUILD_DIR + 'karmaConfig.js',
                autoWatch: true,
                singleRun: false,
                browserify: {
                    debug: true,
                    transform: [
                        ['babelify', { presets: ['es2015'] }]
                    ]
                },
                reporters: ['progress', 'junit'],
                coverageReporter: {}
            }
        },
        copy: {
            distNpm: {
                files: [{
                    src: OTHER_FILE_GLOB,
                    dest: DIST_NPM_DIR,
                    expand: true,
                    flatten: true
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['es2015']
            },
            distNpm: {
                files: [{
                    src: JS_SOURCE_FILE_GLOB,
                    dest: DIST_NPM_DIR + '/lib/',
                    expand: true,
                    flatten: true
                }]
            }
        },
        browserify: {
            distFlatfile: {
                src: JS_SOURCE_FILE_GLOB,
                dest: DIST_FLAT_DIR + '/dxLog.js',
                options: {
                    browserifyOptions: {
                        debug: true, // source maps!
                        standalone: 'dxLog',
                        transform: [
                            [ 'babelify', { presets: ['es2015'] } ]
                        ]
                    }
                }
            }
        },
        exorcise: {
            distFlatfile: {
                options: {},
                src: DIST_FLAT_DIR + '/dxLog.js',
                dest: DIST_FLAT_DIR + '/dxLog.map'
            }
        },
        cat: {
            testReport: {
                file: OUT_DIR + '/testCoverage/text.txt'
            }
        }
    });

    grunt.registerTask('default', [
        'eslint',
        'jscs',
        'test',
        '_dist'
    ]);

    grunt.registerTask('dev', [ 'karma:dev' ]);

    grunt.registerTask('test', [ 'karma:dist', '_testreport']);

    grunt.registerTask('_testreport', 'Report on tests', function() {
        grunt.log.writeln('Style Checks passed');
        grunt.log.writeln('Full coverage details in: : file://' + process.cwd() +
            '/temp/testCoverage/report-html/index.html');
        grunt.log.writeln('Coverge summary:');
        grunt.task.run('cat:testReport');
    });

    grunt.registerTask('_dist', 'Build final distribution', function() {
        grunt.file.delete(DIST_DIR, {force: true});
        grunt.file.mkdir(DIST_DIR);
        grunt.task.run('copy:distNpm');
        grunt.task.run('babel:distNpm');
        grunt.task.run('browserify:distFlatfile');
        grunt.task.run('exorcise:distFlatfile');
    });

    grunt.registerTask('clean', 'Delete non-essential files.', function() {
        grunt.file.delete(OUT_DIR, {force: true});
        grunt.file.delete(DIST_DIR, {force: true});
    });

    grunt.registerTask('deepclean', 'Deep clean (clean, remove node modules).', function() {
        grunt.task.run('clean');
        grunt.file.delete(NODE_MODULES_DIR);
    });

};
