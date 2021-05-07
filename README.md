# WC-Generator

Auro's Design System web component generator is a project tool intended to assist developers with an easy to configure and execute HTML custom element development environment.

## Install

[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/WC-Generator/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/wc-generator)
[![License](https://img.shields.io/npm/l/@alaskaairux/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
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

The WC-Generator requires a minimum install of Node.js `11.0.0`. Recommended install version of `14.0.0`.

Be sure to check out our [getting started](https://auro.alaskaair.com/getting-started/developers/generator/getting-started) page for helpful tips when starting a new project.

## UI development and browser support

For the most up to date information on UI development browser support, see [Auro Web Component Browser Support](https://auro.alaskaair.com/support/browsersSupport)

## Custom namespace support

When generating a new WC using the Auro WC-Generator, you are not restricted to using the Auro namespace for your new element. The following example will crate the project, `@aurodesignsystem/han-solo`

```shell
$ wc-generate --name Han-Solo
```

## Custom npm namespace support

By default, the WC-Generator will output a project that the custom element is for the `@aurodesignsystem` npm namespace. The following example illustrates how you can customize this to `@aurolabs/han-solo"` for example.

```shell
$ wc-generate --name Han-Solo --npm @aurolabs
```

## WC-Generator development API

| Command | Description |
| --- | --- |
| `$ npm run build:test` | Will test the generate pipeline w/o the install process at `./auro-test`
| `$ npm run build:complete` | Will build a new custom element with complete install process at `../auro-test`
| `$ npm run sweep` | Will delete auro-test directory
| `$ npm run test` | Runs `build:test`

## Pre-bundled components

The WC-Generator contains automated functionality for each build to generate pre-bundled versions of the new component so that users can consume without needing to bundle the JavaScript assets themselves. Both a modern and legacy bundle are produced.

## Developing locally
To test changes to the generator, run `npm test` to generate an `auro-test` component.
