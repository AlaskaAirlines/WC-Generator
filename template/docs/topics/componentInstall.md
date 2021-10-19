# Install [namespace]-[name]

<!-- AURO-GENERATED-CONTENT:START (TOC:collapse=true) -->
<details>
<summary>Table of Contents</summary>

- [Install &#91;namespace&#93;-[name]](#install-namespace-name)
  - [NPM Install](#npm-install)
  - [Using bundled assets](#using-bundled-assets)
  - [Dependencies](#dependencies)
  - [Code Example](#code-example)

</details>
<!-- AURO-GENERATED-CONTENT:END -->
<br/>

[namespace]-[name] may be installed as an [NPM package](#npm-install) or as a [bundled asset](#using-bundled-assets).

## NPM Install

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./install.md) -->
<!-- The below content is automatically added from ./install.md -->
[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/[namespace]-[name]/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/[namespace]-[name]/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/[npm]/[namespace]-[name]?style=for-the-badge&color=orange)](https://www.npmjs.com/package/[npm]/[namespace]-[name])
[![License](https://img.shields.io/npm/l/[npm]/[namespace]-[name]?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)

1. Install the NPM package
   ```shell
   $ npm i [npm]/[namespace]-[name]
   ```
   _Installing as a direct, dev or peer dependency is up to the user. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer._

1. Define the dependency within each component that is using `<[namespace]-[name]>`.
   ```javascript
   import "[npm]/[namespace]-[name]";
   ```

1. Reference `[namespace]-[name]` in HTML.
   ```html
   <[namespace]-[name]></[namespace]-[name]>
   ```
<!-- AURO-GENERATED-CONTENT:END -->

## Using bundled assets

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./useBundles.md) -->
<!-- The below content is automatically added from ./useBundles.md -->
In cases where the project is not able to process JS assets, there are pre-processed assets available for use.
* `[namespace]-[name]__bundled.js` for modern browsers
* `[namespace]-[name]__bundled.es5.js` for legacy browsers (including IE11).

```html
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/design-tokens@latest/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://unpkg.com/@alaskaairux/webcorestylesheets@latest/dist/bundled/essentials.css" />

<script src="https://unpkg.com/[npm]/[namespace]-[name]@latest/dist/[namespace]-[name]__bundled.js" type="module"></script>
<script src="https://unpkg.com/[npm]/[namespace]-[name]@latest/dist/[namespace]-[name]__bundled.es5.js" nomodule></script>
```

_**NOTE:** Be sure to replace `@latest` in the URL with the version of the asset you want. @latest is NOT aware of any MAJOR releases, use at your own risk._

Since the legacy bundle includes many polyfills that are not needed by modern browsers, we recommend you load these bundles using [differential serving](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/) so that the browser only loads the bundle it needs. To accomplish this, the script tag for the modern bundle should have `type="module"` and the script tag for the legacy bundle should have the `nomodule` attribute. See the example below.
<!-- AURO-GENERATED-CONTENT:END -->

## Dependencies

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./dependencies.md) -->
<!-- The below content is automatically added from ./dependencies.md -->
The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).
<!-- AURO-GENERATED-CONTENT:END -->

## Code Example

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../demo/examples/default.html) -->
<!-- The below code snippet is automatically added from ./../../demo/examples/default.html -->
```html
<[namespace]-[name]>Hello World</[namespace]-[name]>
```
<!-- AURO-GENERATED-CONTENT:END -->
