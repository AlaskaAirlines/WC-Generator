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

Please see [Auro docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs) for all information in regard to using and developing HTML custom elements with the Design System.

## UI development browser support

For the most up to date information on UI development browser support, see [./docs/BROWSER_SUPPORT.md](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/BROWSER_SUPPORT.md)

## Building a Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new Custom Element. Please see the development documentation [Auro Web Component Development Details](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/TECH_DETAILS.md)

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


[![Build Status](https://travis-ci.org/AlaskaAirlines/WC-Generator.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/WC-Generator)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/wc-generator.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/wc-generator.svg?color=blue)
