# dxLog
## What is it
This is the source repository for the dxLog module.

dxLog is a nearly trivial logging system used by dxData.  It has a couple advantages over directly writing to console.log:

1. It provides a "level" value which can be used to limit which kinds of messages actually get written
2. It provides an easy place to add future richer behaviors in one place, rather than needing to modify all clients.


## Layout of the directory
* Gruntfile.js : The build file for the contents of this directory
* LICENSE      : The usual license for this software
* README.md    : This file
* source       : The source code for the module
* package.json : The usual information needed to establish the dependencies for building this project

## How to get started
Prerequisites

1. You must have [Node.js and npm](https://nodejs.org/en/download/) installed
2. You must also have [grunt-cli](http://gruntjs.com/getting-started) installed

To build the distribution from the root directory

1. npm install
2. grunt

This will run unit tests on all the browsers you have on your system, and then rebuild the contents of the "distribute" directory

To contribute:

1. grunt dev
2. Modify source code
3. Run grunt to run tests on multiple browsers and code coverage.
4. Make a pull request!

Note: grunt dev will run the unit tests on just PhantomJS in a "multi-run" mode, meaning they will be re-run each time you make a source change.

Other interesting tasks you can run can be found with: grunt --help


## Legalness
```
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
```

Copyright (c) 2015, 2016 by Delphix. All rights reserved.


