# Web Component Generator

The Design System Web Component Generator is a project tool intended to assist developers with an easy to configure and execute Web Component development environment for the purpose of building custom elements.

## Install

[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/WC-Generator/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/wc-generator)
[![License](https://img.shields.io/npm/l/@alaskaairux/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/WC-Generator?style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/issues)

It is suggested that this package be installed globally as to ensure quick and easy access to initializing new web components.

```shell
$ npm i @alaskaairux/wc-generator -g
```

The Auro Web Component Generator is configured to ensure that you have the latest version of the generator prior to starting a new build project.

## Execute

Simple API of the npm generator:

```
wc-generate --name [wc name]
```

### Minimum Node version

The WC-Generator requires a minimum install of Node.js `11.0.0`. Recommended install version of `14.0.0`.

###### Example

```shell
$ wc-generate --name button
```

See the [Auro doc site](http://auro.alaskaair.com/getting-started/developers/generator/generator/api) for a full API description and info for [getting started](auro.alaskaair.com/getting-started/developers/generator/getting-started).

## General documentation

Please see [Auro docs](https://auro.alaskaair.com/getting-started/developers/overview) for all information in regard to using and developing HTML custom elements with the Design System.

## UI development and browser support

For the most up to date information on UI development browser support, see [Auro Web Component Browser Support](https://auro.alaskaair.com/support/browsersSupport)

## Building a Custom element

Once the new development environment has been created, there are some conventions to follow to ensure the success of your new custom element. Please see the following documentation:

1. [CSS Development Conventions](https://auro.alaskaair.com/support/css-conventions)
1. [Web Component Automated Testing](https://auro.alaskaair.com/support/tests)
1. [The slot element, performance and SEO](https://auro.alaskaair.com/support/slots)
1. [Web Component Polyfill Support](https://auro.alaskaair.com/support/polyfills/focusvisible)

## Custom namespace support

When generating a new WC using the Auro Web Component Generator, you are not restricted to using the Auro namespace for the component.

```shell
$ wc-generate -t -N Han -n Solo
```

## Pre-bundled components

The WC-Generator contains automated functionality with each build to generate pre-bundled versions of the new component so that users can consume these assets without needing to bundle the JavaScript assets themselves. Both a modern and legacy bundle are produced.

Since the legacy bundle includes many polyfills that are not needed by modern browsers, we recommend you load these bundles using [differential serving](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) so that the browser only loads the bundle it needs. To accomplish this, the script tag for the modern bundle should have `type="module"` and the script tag for the legacy bundle should have the `nomodule` attribute. See the example below.

```html
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/design-tokens@:version/dist/tokens/CSSTokenProperties.css" />
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/webcorestylesheets@:version/dist/bundled/baseline.css" />

<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@:version/dist/[namespace]-[name]__bundled.js" type="module"></script>
<script src="https://unpkg.com/@alaskaairux/[namespace]-[name]@:version/dist/[namespace]-[name]__bundled.es5.js" nomodule></script>
```

## Static Styles

The generator takes the opinion of using [static styles](https://lit-element.polymer-project.org/guide/styles#expressions) as a matter of performance.

> Static styles apply to all instances of a component. Any expressions in CSS are evaluated once, then reused for all instances.

If there is a requirement for the CSS to be reevaluated, this can either be done by moving the CSS to the `render()` method or addressed in a lifecycle method.

Moving the CSS to the `render()` method requires an update to the `sassRender` script and removing the reference to `staticStyles-template.js`.

## Developing locally
To test changes to the generator, run `npm test` to generate an `auro-test` component.
