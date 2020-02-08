# Web Component Generator

The Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component development environment for the purpose of building custom elements for the Design System.

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

Please see [OrionStatelessComponents__docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs) for all information in regards to using and developing HTML custom elements with the Design System.

## UI development browser support

For the most up to date information on UI development browser support, see [./docs/BROWSER_SUPPORT.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/src/BROWSER_SUPPORT.md)

## Building a Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new Custom Element. Please see the development documentation [ODS Stateless Component Development Details](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/src/TECH_DETAILS.md)


------

#### Status badges

[![Build Status](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/ODS-WC-Generator)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-wc-generator.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-wc-generator.svg?color=blue)
