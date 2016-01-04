# dxLog

dxLog is a nearly trivial logging system used by dxData.  It has a couple advantages over directly writing to console.log:

1. It provides a "level" value which can be used to limit which kinds of messages actually get written
2. It allows richer behaviors (e.g. dxLog.fail() will both write to the console and throw an Error)
3. It provides an easy place to add future richer behaviors in one place, rather than needing to modify all clients.


## How to use it
1. npm install dxLog
2. in your files
   dxLog = require('dxLog');
   ...
   dxLog.fail('This did not work');


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


