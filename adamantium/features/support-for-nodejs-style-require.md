

## Support for Node.js style require module resolution

Adamantium now supports using the Node.js method for resolving module ids. 
What this means is that you can now add npm packages to your app and (for some packages), 
use it without making any changes.  It also allows developers to be consistent when using
`require()` while going back and forth between Titanium/Alloy and Node.js.

### Enabling Feature

This feature is enabled by using the new `nodejs_require` property in `config.json`

```js
{
    "global": {},
    "env:development": {},
    "env:test": {},
    "env:production": {},
    "os:android": {},
    "os:blackberry": {},
    "os:ios": {},
    "os:mobileweb": {},
    "os:windows": {},
    "dependencies": {},
    "nodejs_require": {
        "enabled": true
    }
}

```

### Examples

```javascript

require("lodash");
require("lo" + "dash");

var module_id = "lodash";
require(module_id);

require("my-npm-module/aaa");

require('my-npm-module/aaa/' + ucfirst(module_id));


```

### Module Categories

There are five basic categories of modules in Adamantium.

#### 1. Global Objects

Global modules are modules that can be referenced from the Global namespace. 
To use a global module, you do not need to use `require` to load it, as it has already been done on app initialization. 
Appcelerator puts some items into the Global namespace such as `Titanium` (`Ti`), console, require, etc. 
Adamantium adds a few more for NodeJS compatibility. 
*The Global namespace should be used only when absolutely necessary.* 
The ability to add/replace core modules from config is coming soon. 

| module  | description  | status |
|---|---|---|
|  process  | shim for npm packages that require access to [Node.js process](https://nodejs.org/api/process.html) | Partially implemented |
|  Promise  | shim for npm packages that require access to [ES2015 Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) | Not Implemented Yet
|  console  | simple debugging console that is similar to the JavaScript console mechanism provided by web browsers.  (Alloy version is not fully compatible w/ Node.js version)| Partially implmemented

#### 2. Core Modules

Core Modules in Node.js are modules that compiled into the binary. 
It is a similar concept implemented in Adamantium/Alloy.
Core modules are always preferentially loaded if their identifier is passed to require(). 
For instance, require('alloy') will always return the built in Alloy module, even if there is a file by that name.
This is a new concept for Alloy so we have started by defining a few and will add more later. 
The ability to add/replace core modules from config is coming soon.

| module  | description  | status |
|---|---|---|
|  alloy  | Alloy core module built by Appcelerator | fully implemented |
|  os  | shim for npm packages that require access to [Node.js core module: os](https://nodejs.org/api/os.html) | Not implemented yet |
|  http  | shim for npm packages that require access to [Node.js core module: http](https://nodejs.org/api/http.html) | Not implemented yet |
|  https  | shim for npm packages that require access to [Node.js core module: https](https://nodejs.org/api/https.html) | Not implemented yet |
|  fs  | shim for npm packages that require access to [Node.js core module: fs](https://nodejs.org/api/fs.html) | Not implemented yet |
|  events  | shim for npm packages that require access to [Node.js core module: events](https://nodejs.org/api/events.html) | Not implemented yet |
|  util  | shim for npm packages that require access to [Node.js core module: util](https://nodejs.org/api/util.html) | Not implemented yet |
|  url  | shim for npm packages that require access to [Node.js core module: url](https://nodejs.org/api/url.html) | Not implemented yet |


#### 3. File Modules

File modules are modules that are referenced by an identifier beginning  with './' or '/' or '../' 
The module resolver will attempt to locate the module using the relative or absolute path passed into `require()`. 
*Support for `.json` files as objects is not currently implemented but will be coming soon.*
Take a look at LOAD_AS_FILE() below for paths that are searched while resolving a file module.

For example: 

```js
    require('/mymodule');  // resolves to "/mymodule.js, if that file exists."
    require('/test/mymodule');  // resolves to "/test/mymodule.js, if that file exists"

```

#### 4. Directory Modules

Directory modules are modules that are referenced by an identifier beginning  with './' or '/' or '../' 
The module resolver will attempt to locate the module using the relative or absolute path passed into `require()`. 
The resolver will first look for a `main` property in a `package.json` and if that is not found, an `index.js` file.
Take a look at LOAD_AS_DIRECTORY() below for paths that are searched while resolving a directory module.

For example: 

```js
    require('/mymodule');  // resolves to "/mymodule/lib/myfile.js, if that file was defined in package.json."
    require('/test/mymodule');  // resolves to "/test/mymodule/index.js, if no main in package.json and index.js exists."

```

#### 5. Node Modules

Node modules are non-core modules that are referenced *without* beginning  with './' or '/' or '../' 
(i.e. `require('lodash')` ).  The resolver with search through parent paths looking for the specified 
module in `node_modules` folders.
Take a look at LOAD_NODE_MODULES() below for paths that are searched while resolving a file module.

### Backwards compatibility

Adamantium will continue to provide support for older version of Alloy and their associated way of resolving modules.

```js

require("alloy/underscore");  // resolves to "/alloy/underscore.js"
require("alloy/controllers/test"); // resolves to "/alloy/controllers/test.js"


```

### Module Resolution 

Adamantium uses the current nodejs method for resolving a module name

```js
require(X) from module at path Y
1. If X is a core module,
   a. return the core module
   b. STOP
2. If X begins with './' or '/' or '../'
   a. LOAD_AS_FILE(Y + X)
   b. LOAD_AS_DIRECTORY(Y + X)
3. LOAD_NODE_MODULES(X, dirname(Y))
4. THROW "not found"

LOAD_AS_FILE(X)
1. If X is a file, load X as JavaScript text.  STOP
2. If X.js is a file, load X.js as JavaScript text.  STOP
3. If X.json is a file, parse X.json to a JavaScript Object.  STOP
4. If X.node is a file, load X.node as binary addon.  STOP   (NOTE:  This is not applicable to Alloy)

LOAD_AS_DIRECTORY(X)
1. If X/package.json is a file,
   a. Parse X/package.json, and look for "main" field.
   b. let M = X + (json main field)
   c. LOAD_AS_FILE(M)
2. If X/index.js is a file, load X/index.js as JavaScript text.  STOP
3. If X/index.json is a file, parse X/index.json to a JavaScript object. STOP
4. If X/index.node is a file, load X/index.node as binary addon.  STOP   (NOTE:  This is not applicable to Alloy)

LOAD_NODE_MODULES(X, START)
1. let DIRS=NODE_MODULES_PATHS(START)
2. for each DIR in DIRS:
   a. LOAD_AS_FILE(DIR/X)
   b. LOAD_AS_DIRECTORY(DIR/X)

NODE_MODULES_PATHS(START)
1. let PARTS = path split(START)
2. let I = count of PARTS - 1
3. let DIRS = []
4. while I >= 0,
   a. if PARTS[I] = "node_modules" CONTINUE
   c. DIR = path join(PARTS[0 .. I] + "node_modules")
   b. DIRS = DIRS + DIR
   c. let I = I - 1
5. return DIRS

```