# WC-Generator

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/badges.md) -->
<!-- The below content is automatically added from ./docs/topics/badges.md -->
[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/WC-Generator/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@aurodesignsystem/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@aurodesignsystem/wc-generator)
[![License](https://img.shields.io/npm/l/@aurodesignsystem/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/WC-Generator?style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/issues)
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (TOC) -->
- [Description](#description)
  - [What's in the box?](#whats-in-the-box)
  - [Build pipeline](#build-pipeline)
- [Dependencies](#dependencies)
- [Install](#install)
- [Usage](#usage)
  - [Custom namespace support](#custom-namespace-support)
  - [Custom npm namespace support](#custom-npm-namespace-support)
  - [Development API](#development-api)
  - [Pre-bundled components](#pre-bundled-components)
  - [Help and version management](#help-and-version-management)
  - [UI development and browser support](#ui-development-and-browser-support)
- [Developing against WC-Generator](#developing-against-wc-generator)
  - [Testing changes](#testing-changes)
<!-- AURO-GENERATED-CONTENT:END -->

<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/design-tokens@latest/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/webcorestylesheets@latest/dist/bundled/essentials.css" />

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/alerts.md) -->
<!-- The below content is automatically added from ./docs/topics/alerts.md -->
> **NOTICE**: Auro's WC Generator does not currently support Node 16 due to dependencies with unsupported features. The Auro team is currently working on [a plan to address this issue](https://github.com/AlaskaAirlines/WC-Generator/issues/226).
<!-- AURO-GENERATED-CONTENT:END -->

## Description

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/description.md) -->
<!-- The below content is automatically added from ./docs/topics/description.md -->
Auro's WC-Generator helps you to quickly kickstart new custom element projects, loaded with best practices and tools to help you become instantly productive.

Making it this easy is done by supporting the Auro ecosystem. Quickly generate a new repo with the `wc-generate` command. Please review the generator's [api page](https://auro.alaskaair.com/getting-started/developers/generator/generator/api) for all information.

Packed inside this generator are all the tools and libraries needed to quickly and easily build an HTML custom element that can be published with the Auro Design System. Auro takes care of providing everything you need to get started without the headaches associated with all the manual setup.

### What's in the box?

The Auro WC-Generator is chock full of the best practices the Auro team has built over the years. From libraries to code style guides, the Auro team continues to promote these best practices and lessons learned by endlessly updating the generator. We do this so that you don't have to worry.

### Build pipeline

WC-Generator provides a complete build pipeline for combining all your development resources into a single package for distribution.

* Process Sass to a CSS file that can be injected into the scope of the custom element
* Compile all CSS, JavaScript, and dependency resources into a single bundle
* Run all automated linters and tests
* Github workflow and issue templates all customized for your new project
<!-- AURO-GENERATED-CONTENT:END -->

## Dependencies

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/dependencies.md) -->
<!-- The below content is automatically added from ./docs/topics/dependencies.md -->
The WC-Generator requires a minimum install of Node.js `14.17.0`.
<!-- AURO-GENERATED-CONTENT:END -->

## Install

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/install.md) -->
<!-- The below content is automatically added from ./docs/topics/install.md -->
It is recommended that the package be installed globally as to ensure quick and easy access to initializing new projects.

```shell
$ npm i @aurodesignsystem/wc-generator -g
```

The Auro custom element generator is configured to ensure that you have the latest version of the generator and all it's dependencies prior to starting a new build project.
<!-- AURO-GENERATED-CONTENT:END -->

## Usage

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/usage/basic.md) -->
<!-- The below content is automatically added from ./docs/topics/usage/basic.md -->
WC-Generator example use:

```
wc-generate --name [wc-name]
```
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/usage/namespaceSupport.md) -->
<!-- The below content is automatically added from ./docs/topics/usage/namespaceSupport.md -->
### Custom namespace support

When generating a new custom element using the Auro WC-Generator, you are not restricted to using the Auro namespace for your new element. The following example will crate the project, `@aurodesignsystem/auro-ticker`

```shell
$ wc-generate --name Auro-Ticker
```

### Custom npm namespace support

By default, the WC-Generator will output a project that the custom element is for the `@aurodesignsystem` npm namespace. The following example illustrates how you can customize this to `@mynamespace/auro-ticker` for example.

```shell
$ wc-generate --name Auro-Ticker --npm @mynamespace
```
<!-- AURO-GENERATED-CONTENT:END -->

### Development API

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/usage/developmentApi.md) -->
<!-- The below content is automatically added from ./docs/topics/usage/developmentApi.md -->
| Command | Description |
| --- | --- |
| `build:test` | Will test the generate pipeline w/o the install process at `./auro-test`
| `build:complete` | Will build a new custom element with complete install process at `../auro-test`
| `sweep` | Will delete auro-test directory
| `test` | Runs `build:test`
<!-- AURO-GENERATED-CONTENT:END -->

### Pre-bundled components

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/usage/bundles.md) -->
<!-- The below content is automatically added from ./docs/topics/usage/bundles.md -->
The WC-Generator contains automated functionality for each build to generate pre-bundled versions of the new component so that users can consume without needing to bundle the JavaScript assets themselves. Both a modern and legacy bundle are produced.
<!-- AURO-GENERATED-CONTENT:END -->

### Help and version management

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/help.md) -->
<!-- The below content is automatically added from ./docs/topics/help.md -->
Be sure to check out our [getting started](https://auro.alaskaair.com/aurolabs/minors) page for helpful tips when starting a new project.

For help with the WC-Generator API and to see what version you have installed, run `$ wc-generate --help`.

With each new repo created, the version of the generator will be added to the bottom of the `./README.md` file. As versions of the WC-Generator progress this will help authors to understand where the feature gap is.

```html
<small>Built from WC-Generator v[genVersion]</small>
```

To migrate a repo from one version of the generator to another, please reference [Auro migrate shell script](https://auro.alaskaair.com/getting-started/developers/generator/upgrade).
<!-- AURO-GENERATED-CONTENT:END -->

### UI development and browser support

For the most up to date information on UI development browser support, see [Auro Web Component Browser Support](https://auro.alaskaair.com/support/browsersSupport)

## Developing against WC-Generator

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/testGenerator.md) -->
<!-- The below content is automatically added from ./docs/topics/testGenerator.md -->
### Testing changes

To test changes to the generator, run `npm test` to generate an `auro-test` component.
<!-- AURO-GENERATED-CONTENT:END -->
