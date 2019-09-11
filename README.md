<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-wc-generator.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-wc-generator.svg?color=blue)

# ODS Web Component Generator

The Orion Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component development environment for the purpose of building custom elements for the Orion Design System.

## Install

It is suggested that this package be installed globally as to ensure quick and easy access to initializing new web components at will.

```shell
$ npm i @alaskaairux/ods-wc-generator -g
```

The ODS Web Component Generator is configured to ensure that you have the latest version of the generator prior to starting a new build project. You can also verify your installed version manually by running the following command.

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
$ ods-wc-generate --name button --dir ./ods-button
```

#### API

| variable | required | description |
|----|----|----|
| --name | Yes | Name of the web component you wish to build. `ods` is assumed, so only the proper name, e.g. `button` or `checkbox` |
| -- dir | No | Directory where the new custom element files will be created. If a directory is not provided, one using the `--name` variable will be created |


## General documentation

Please see [OrionStatelessComponents__docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs) for all information in regards to using and developing HTML custom elements with the Orion Design System.

## UI development browser support

For the most up to date information on UI development browser support, see [./docs/BROWSER_SUPPORT.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/BROWSER_SUPPORT.md)

## Building an Orion Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new Orion Custom Element

### The npm structure

The elements of the repo's `./template` directory will be used to generate the new custom element environment.

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

### What goes where?

**./demo**: The purpose of this directory is to produce a demo page for development and review. Updates would include editing the `./demo/index.html` and `./demo/sass/style.scss` documents.

**./docs**: If there are additional documents per your new custom element, please place all Markdown files in the `./docs` directory.

**./scripts**: This directory is not to be used for any component specific code. This directory is specifically for the Polymer Development environment only.

**./src**: Your new Orion Custom Element will be developed inside a Polymer Development Environment, so all the code that pertains specifically to your new web component will live in the `./src` directory. Javascript, JSON and Sass will all need to be placed ONLY in the `./src` directory. If placed anywhere else, this will cause issues with the packing process.


### Your 1st commit

With the current configurations, when committing code to a new repo, Githooks should be working. To validate, when committing code a series of pre-commit tests should run. To validate, run the following commands:

```bash
$ git add .
$ git commit -m "chore: initial commit from generator"
```

In your Git logs you should see the following line output:

```bash
husky > commit-msg (node v10.16.3)
```

If you do not, then the pre-commit hooks are **not working**. To fix, delete `package-lock.json`, and the `node_modules` directory, then re-install all packages.

##

<footer>
Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
</footer>
