# Web Component Generator

The Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component development environment for the purpose of building custom elements for the Design System.

## Install

[![Build Status](https://img.shields.io/travis/AlaskaAirlines/WC-Generator.svg?branch=master&style=for-the-badge)](https://travis-ci.org/github/AlaskaAirlines/WC-Generator)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/wc-generator)
[![License](https://img.shields.io/npm/l/@alaskaairux/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/WC-Generator?style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/issues)

It is suggested that this package be installed globally as to ensure quick and easy access to initializing new web components at will.

```shell
$ npm i @alaskaairux/wc-generator -g
```

The Auro Web Component Generator is configured to ensure that you have the latest version of the generator prior to starting a new build project. You can also verify your installed version manually by running the following command.

```shell
$ wc-generate --version
```

This will return the currently available version and the version you have locally installed.

## Execute

Simple API of the npm generator:

```
wc-generate --name [wc name]
```

###### Example

```shell
$ wc-generate --name button
```

#### API

| variable | required | description |
|----|----|----|
| -h, --help | no | Get help info about WC generator |
| -t, --test | no | Test repo generation without installing dependencies |
| -n, --name [name] | yes | Name of the web component you wish to build. `auro` is assumed, so only the proper name, e.g. `button` or `checkbox` |
| -N, --namespace [namespace] | no | Choose custom namespace of the web component if other than Auro |
| -P, --npm [npm] | no | Choose npm namespace if other than `@alaskaairux`. Be sure add back-slash, e.g. `@mynpm/` |
| -d, --dir [directory] | no | Directory where the new custom element files will be created. If a directory is not provided, one using the `--name` variable will be created |
| -v, --version | no | Ouput the version number |
| --verbose | no | Verbose command line feedback |


## General documentation

Please see [Auro docs](https://github.com/AlaskaAirlines/auro_docs) for all information in regard to using and developing HTML custom elements with the Design System.

## UI development and browser support

For the most up to date information on UI development browser support, see [Auro Web Component Browser Support](https://auro.alaskaair.com/support/browsersSupport)

## Building a Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new Custom Element. Please see the development documentation:

1. [CSS Development Conventions](http://auro.alaskaair.com/support/css-conventions)
1. [Web Component Automated Testing](http://auro.alaskaair.com/support/tests)
1. [The slot element, performance and SEO](http://auro.alaskaair.com/support/slots)
1. [Web Component Polyfill Support](http://auro.alaskaair.com/support/polyfill)

## Custom namespace support

When generating a new WC using the Auro Web Component generator, you are not restricted to using the Auro namespace for the component.

```shell
$ wc-generate -t -N Han -n Solo
```

## Pre-bundled components

The WC-Generator contains automated functionality with each build to generate a pre-bundled version of the new component so that users can consume these assets without needing to bundle the JavaScript assets themselves.

```html
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/orion-design-tokens@:version/dist/tokens/CSSTokenProperties.css" />
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/orion-web-core-style-sheets@:version/dist/bundled/baseline.css" />

<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@:version/dist/polyfills.js"></script>
<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@:version/dist/[namespace]-[name]__bundled.js"></script>
```
