<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-wc-generator.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-wc-generator.svg?color=blue)

# ODS Web Component Generator

The Orion Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component generator for the purpose of build custom elements for the Orion Design System.

## Install

It is suggested that this package be installed globally as to ensure quick and easy access to initializing new web components at will.

```shell
$ npm i @alaskaairux/ods-wc-generator -g
```

If you have already installed the ODS-WC-Generator, please make sure that you are building your project from the latest version of this generator. To see what version you have installed, please run the following command:

```shell
$ npm list -g @alaskaairux/ods-wc-generator
```

## Execute

The API of the npm generator is as follows:

```
ods-wc-generate --name [wc name] --dir [your dir]
```

#### Example

```shell
$ ods-wc-generate --name button --dir ../ods-button
```

#### API


| variable | required | description |
|----|----|----|
| --name | Yes | Name of the web component you wish to build. `ods` is assumed, so only the proper name, e.g. `button` or `checkbox` |
| -- dir | No | Directory where the new custom element files will be created. If a directory is not provided, one using the `--name` variable will be created |


## Documentation

Please see [OrionStatelessComponents__docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs) for all information in regards to using and developing HTML custom elements with the Orion Design System.

## npm structure

The elements of the repo's `./template` directory are used to generate the new custom element.

```
/ODS-WC-Generator/template
├── LICENSE
├── NOTICE
├── README.md
├── demo
|  ├── alert.js
|  ├── index.html
|  └── sass
|     └── style.scss
├── docs
├── gulpfile.js
├── index.html
├── package.temp
├── polymer.json
├── scripts
|  ├── componentConfig.json
|  ├── componentConfigDist.json
|  ├── tokenConfig.json
|  ├── tokenScript.js
|  └── tokenScriptCustom.js
├── src
|  ├── ods-[name].js
|  ├── shape.json
|  └── style.scss
└── test
   ├── index.html
   └── ods-[name]_test.html
```

## Trouble-shoot

With the current configurations, when committing code to a new repo, Githooks should be working. To validate, when committing code a series of pre-commit tests should be running.

If the hooks are not working, you may want to delete `package-lock.json`, delete the `node_modules` directory and re-install app packages.

##

Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
