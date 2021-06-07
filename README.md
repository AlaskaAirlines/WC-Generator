# WC-Generator

Auro's Design System web component generator is a project tool intended to assist developers with an easy to configure and execute HTML custom element development environment.

## Install

[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/WC-Generator/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@aurodesignsystem/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@aurodesignsystem/wc-generator)
[![License](https://img.shields.io/npm/l/@aurodesignsystem/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/WC-Generator?style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/issues)

It is recommended that the package be installed globally as to ensure quick and easy access to initializing new projects.

```shell
$ npm i @aurodesignsystem/wc-generator -g
```

The Auro custom element generator is configured to ensure that you have the latest version of the generator and all it's dependencies prior to starting a new build project.

## Execute

WC-Generator example use:

```
wc-generate --name [wc-name]
```

### Minimum Node version

The WC-Generator requires a minimum install of Node.js `12.0.0`. Recommended install version of `14.0.0`.

Be sure to check out our [getting started](https://auro.alaskaair.com/aurolabs/minors) page for helpful tips when starting a new project.

## UI development and browser support

For the most up to date information on UI development browser support, see [Auro Web Component Browser Support](https://auro.alaskaair.com/support/browsersSupport)

## Custom namespace support

When generating a new custom element using the Auro WC-Generator, you are not restricted to using the Auro namespace for your new element. The following example will crate the project, `@aurodesignsystem/auro-ticker`

```shell
$ wc-generate --name Auro-Ticker
```

## Custom npm namespace support

By default, the WC-Generator will output a project that the custom element is for the `@aurodesignsystem` npm namespace. The following example illustrates how you can customize this to `@mynamespace/auro-ticker` for example.

```shell
$ wc-generate --name Auro-Ticker --npm @mynamespace
```

## WC-Generator development API

| Command | Description |
| --- | --- |
| `build:test` | Will test the generate pipeline w/o the install process at `./auro-test`
| `build:complete` | Will build a new custom element with complete install process at `../auro-test`
| `sweep` | Will delete auro-test directory
| `test` | Runs `build:test`

## Help and version management

For help with the WC-Generator API and to see what version you have installed, run `$ wc-generate --help`.

With each new repo created, the version of the generator will be added to the bottom of the `./README.md` file. As versions of the WC-Generator progress this will help authors to understand where the feature gap is.

```html
<small>Built from WC-Generator v[genVersion]</small>
```

To migrate a repo from one version of the generator to another, please reference [Auro migrate shell script](https://auro.alaskaair.com/getting-started/developers/generator/upgrade).

## Pre-bundled components

The WC-Generator contains automated functionality for each build to generate pre-bundled versions of the new component so that users can consume without needing to bundle the JavaScript assets themselves. Both a modern and legacy bundle are produced.

## Developing locally
To test changes to the generator, run `npm test` to generate an `auro-test` component.
