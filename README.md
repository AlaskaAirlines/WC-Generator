# Web Component Generator

The Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component development environment for the purpose of building custom elements for the Design System.

## Install

It is suggested that this package be installed globally as to ensure quick and easy access to initializing new web components at will.

```shell
$ npm i @alaskaairux/wc-generator -g
```

The Auro Web Component Generator is configured to ensure that you have the latest version of the generator prior to starting a new build project. You can also verify your installed version manually by running the following command.

```shell
$ npm list -g @alaskaairux/wc-generator
```

## Execute

The API of the npm generator is as follows:

```
wc-generate --name [wc name] --dir [your dir]
```

#### Example

```shell
$ wc-generate --name button --dir ./auro-button
```

#### API

| variable | required | description |
|----|----|----|
| -h, --help | no | Get help info about WC generator |
| -t, --test | no | Test repo generation without installing dependencies |
| -n, --name [name] | yes | Name of the web component you wish to build. `auro` is assumed, so only the proper name, e.g. `button` or `checkbox` |
| -d, --dir [directory] | no | Directory where the new custom element files will be created. If a directory is not provided, one using the `--name` variable will be created |
| -v, --version | no | Ouput the version number |
| --verbose | no | Verbose command line feedback |


## General documentation

Please see [Auro docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs) for all information in regards to using and developing HTML custom elements with the Design System.

## UI development browser support

For the most up to date information on UI development browser support, see [./docs/BROWSER_SUPPORT.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/src/BROWSER_SUPPORT.md)

## Building a Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new Custom Element. Please see the development documentation [Auro Web Component Development Details](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/src/TECH_DETAILS.md)


[![Build Status](https://travis-ci.org/AlaskaAirlines/WC-Generator.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/WC-Generator)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/wc-generator.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/wc-generator.svg?color=blue)
