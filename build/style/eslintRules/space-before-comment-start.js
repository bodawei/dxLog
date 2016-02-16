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
/* global module */

'use strict';

/* eslint-disable validate-multiline-block-comments */
//
// Validates that there is at least one space between code and inline comments (block or line).
//
// Valid:
// var foo = 'bar'; // I'm a comment
// var /* Weird, but okay */ foo = 'bar';
//
// Invalid:
// var foo = 'bar';// I'm a comment
/* JSSTYLED */
// var/* Weird, but okay */ foo = 'bar';
//
/* eslint-enable validate-multiline-block-comments */
module.exports = function(context) {

    var sourceLines;

    function validateSpaceBeforeComment(node, failureMsg) {
        var startLineIdx = node.loc.start.line - 1,
            startCol = node.loc.start.column,
            startLine = sourceLines[startLineIdx];

        if (startCol === 0) {
            return;
        }

        var charBefore = startLine[startCol - 1];
        if (charBefore !== ' ') {
            context.report(node, failureMsg);
        }
    }

    return {
        Program: function() {
            sourceLines = context.getSourceLines();
        },
        BlockComment: function(node) {
            validateSpaceBeforeComment(node, 'Must have a space before the start of a block comment.');
        },
        LineComment: function(node) {
            validateSpaceBeforeComment(node, 'Must have a space before the start of a line comment.');
        }
    };

};
