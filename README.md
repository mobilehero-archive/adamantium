# Adamantium

> Appcelerator Alloy + some extra goodies

## Introduction

[Appcelerator Platform](http://www.appcelerator.com/mobile-app-development-products/) contains awesome products for creating cross-platform native mobile apps.  Appcelerator Titanium and Alloy are two of those products. Adamantium is an opinionated fork of Appcelerator Alloy that contains some bug fixes and enhancements to Appcelerator Alloy that may not be released yet and some that will probably never make it into Alloy.

Take look at [open & closed issues](https://github.com/mobilehero/adamantium/issues) here for more information about completed and upcoming features for Adamantium.

See [original Alloy README File associated with this build](ALLOY_README.md) for more info about Appcelerator Alloy


## Installation

Installation depends on whether you are using Titanium (`ti build`) or Appcelerator Platform (`appc ti build`) to build your project. 

#### Titanium

```bash
# install the latest stable version of adamantium
[sudo] npm install -g mobilehero/adamantium

# install latest stable version of adamantium for a specific version of Alloy
[sudo] npm install -g mobilehero/adamantium#latest/1.7.33

# install cutting edge version of adamantium for a specific version of Alloy
[sudo] npm install -g mobilehero/adamantium#next/1.7.33

# install cutting edge version of adamantium for latest version of Alloy
[sudo] npm install -g mobilehero/adamantium#develop
```

#### Appcelerator Platform

>You will need to change the path below based on what version of Appcelerator Platform you have installed.  
>Solution for this issue to be developed soon.  See [issue #4](https://github.com/mobilehero/adamantium/issues/4) for more details.

```bash
# install the latest stable version of adamantium
[sudo] npm install --prefix ~/.appcelerator/install/5.2.0 mobilehero/adamantium

# install latest stable version of adamantium for a specific version of Alloy
[sudo] npm install --prefix ~/.appcelerator/install/5.2.0 mobilehero/adamantium#latest/1.7.33

# install cutting edge version of adamantium for a specific version of Alloy
[sudo] npm install --prefix ~/.appcelerator/install/5.2.0 mobilehero/adamantium#next/1.7.33

# install cutting edge version of adamantium for latest version of Alloy
[sudo] npm install --prefix ~/.appcelerator/install/5.2.0 mobilehero/adamantium#develop
```

## Development Guidelines

- Adamantium development is done using [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/) (or a variation thereof).  
- Pull Requests should be made against the develop branch and should have a [related issue](https://github.com/mobilehero/adamantium/issues).
- All new features are coded on a feature branch and then merged into the develop branch.  
- The master branch contains the latest stable code.  Pull Requests should be made against the develop branch.
- All code that will be integrated into Appcelerator Alloy needs to follow their coding standards and requirements.

## Legal

Alloy is developed by Appcelerator and the community and is Copyright (c) 2012 by Appcelerator, Inc. All Rights Reserved.   
Alloy is made available under the Apache Public License, version 2. See the LICENSE file for more information.  

