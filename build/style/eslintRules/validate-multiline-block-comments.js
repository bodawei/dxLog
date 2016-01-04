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
// Validate multiline block comments
// 1. The start "/*" must be alone on the line
//     - Note: "/**" is also okay when working with jsdocs
// 2. The end "*/" must be alone on the line and properly indented
// 3. Each line of the body must be properly indented and must be in the form "* [content]"
//
// Valid:
/* JSSTYLED */
// /*
//  * I'm a good comment
//  *
//  *   - More content
//  */
//
// Invalid:
/* JSSTYLED */
// /* Bad
//  * content */
//
/* JSSTYLED */
// /*
// * Bad indentation
// */
//
/* eslint-enable validate-multiline-block-comments */
module.exports = function(context) {

    var sourceLines;

    return {
        Program: function() {
            sourceLines = context.getSourceLines();
        },
        BlockComment: function(node) {

            if (!node.value.match(/\n/)) {
                // Comment is not multiline
                return;
            }

            // Note: "line" and "column" fields are 1 indexed
            var startIdx = node.loc.start.line - 1,
                endIdx   = node.loc.end.line - 1;

            var startLine = sourceLines[startIdx],
                startLineTrimmed = startLine.trim();

            // Start must be "/*" alone on the line. "/**" is also okay when working with jsdocs.
            if (startLineTrimmed !== '/*' && startLineTrimmed !== '/**') {
                context.report(node, 'Improper start of multiline block comment');
            }
            // End must be "*/" alone on the line
            if (sourceLines[endIdx].trim() !== '*/') {
                context.report(node, 'Improper end of multiline block comment');
            }

            var startIndentation = startLine.indexOf('/*');
            var currLine;
            var isExample = false;

            // Now check that each line in the comment starts with a '*' and the stars are in alignment
            for (var idx = startIdx + 1; idx <= endIdx; idx++) {
                currLine = sourceLines[idx];

                // Ignore lines that compose examples in jsdoc comments
                if (currLine.indexOf('<example') !== -1) {
                    isExample = true;
                } else if (currLine.indexOf('</example>') !== -1) {
                    isExample = false;
                    continue;
                }
                if (isExample) {
                    continue;
                }

                if (currLine.trim()[0] !== '*') {
                    context.report(node, 'Lines in block comment should start with a "*"');
                    continue;
                }
                if (currLine.indexOf('*') !== startIndentation + 1) {
                    context.report(node, 'Lines in block comment are not indented correctly');
                }

                if (idx === endIdx) {
                    continue;
                }

                if (currLine.indexOf('*') === currLine.length - 1) {
                    // No content after the star on this line
                    continue;
                }

                if (!sourceLines[idx].trim().match(/^\*\s/)) {
                    context.report(node, 'Lines in block comment must have at least one space following the star ' +
                    '(line ' + (idx + 1) + ')');
                }
            }

        }
    };

};
