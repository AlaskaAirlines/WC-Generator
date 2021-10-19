# [Name]

<!-- AURO-GENERATED-CONTENT:START (TOC:maxDepth=3&collapse=true) -->
<details>
<summary>Table of Contents</summary>

- [&#91;Name&#93;](#name)
  - [Description & Use Cases](#description--use-cases)
  - [Using &#91;namespace&#93;-[name]](#using-namespace-name)
    - [NPM Install](#npm-install)
    - [Using bundled assets](#using-bundled-assets)
    - [Dependencies](#dependencies)
    - [Code Examples](#code-examples)
  - [Development](#development)
    - [Building](#building)
    - [Testing](#testing)
    - [Running a localhost](#running-a-localhost)
    - [Demo deployment](#demo-deployment)

</details>
<!-- AURO-GENERATED-CONTENT:END -->

## Description & Use Cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/description.md) -->
<!-- The below content is automatically added from ./docs/description.md -->
`<[namespace]-[name]>` is an [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of ...

The `<[namespace]-[name]>` element should be used in situations where users may:

* ...
* ...
* ...
<!-- AURO-GENERATED-CONTENT:END -->

## Using [namespace]-[name]

[namespace]-[name] may be installed as an [NPM package](#npm-install) or as a [bundled asset](#using-bundled-assets).

### NPM Install

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/install.md) -->
<!-- The below content is automatically added from ./docs/topics/install.md -->
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

### Using bundled assets

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/useBundles.md) -->
<!-- The below content is automatically added from ./docs/topics/useBundles.md -->
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

### Dependencies

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/dependencies.md) -->
<!-- The below content is automatically added from ./docs/topics/dependencies.md -->
The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens).
<!-- AURO-GENERATED-CONTENT:END -->
### Code Examples
#### Default [namespace]-[name]

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./demo/examples/default.html) -->
<!-- The below code snippet is automatically added from ./demo/examples/default.html -->
```html
<[namespace]-[name]>Hello World</[namespace]-[name]>
```
<!-- AURO-GENERATED-CONTENT:END -->

## Development

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/developmentDescription.md) -->
<!-- The below content is automatically added from ./docs/topics/developmentDescription.md -->
Review the [contribution guidelines](https://auro.alaskaair.com/contributing) for the Auro Design System. Make sure to **pay special attention** to the **conventional commits** section of the document.

For information on browser compatibility consult our [support matrix](https://auro.alaskaair.com/support/browsersSupport).

If you are not part of the Auro core team you will be required to [fork the project](https://docs.github.com/en/get-started/quickstart/fork-a-repo) prior to submitting a pull request.
<!-- AURO-GENERATED-CONTENT:END -->

### Building

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/building.md) -->
<!-- The below content is automatically added from ./docs/topics/building.md -->
You can trigger a build by running `$ npm run build` which executes the following actions:
1. Compile all style code
1. Copies all `./src/` JS files to the `./dist` directory
1. Generates `docs/api.md`.
1. Runs all automated tests
1. Bundles all assets

Bundled assets are not merged into the repo. To create the bundles locally without executing a full build run `$ npm run bundler`.

The `API.md` file is generated in the build and committed back to the repo with a version change. If the API doc has changed without a version change, author's are required to run `$ npm run build:api` (which will update `API.md`) and commit to version control.
<!-- AURO-GENERATED-CONTENT:END -->

### Testing

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/testing.md) -->
<!-- The below content is automatically added from ./docs/topics/testing.md -->
Automated tests are required for every Auro component.

Run `$ npm test` to execute the tests and check code coverage. Tests must pass and meet a certain coverage threshold to commit.

Tests are located at `.\test\`.

See the [testing documentation](https://auro.alaskaair.com/support/tests) for more details.
<!-- AURO-GENERATED-CONTENT:END -->

### Running a localhost

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/localHost.md) -->
<!-- The below content is automatically added from ./docs/topics/localHost.md -->
You will need to open two different shell sessions. One is for the **npm tasks**, the second is to run the **server**.

```shell
// shell terminal one
$ npm run dev

// shell terminal two
$ npm run serve
```

Open [localhost:8000](http://localhost:8000/).

_Note that your `serve` instance may define a different port to use if 8000 is already in use._
<!-- AURO-GENERATED-CONTENT:END -->

### Demo deployment

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./docs/topics/demoDeployment.md) -->
<!-- The below content is automatically added from ./docs/topics/demoDeployment.md -->
To deploy a demo version of the component for review, run `npm run build:demo` to create a `./build` directory that can be pushed to any static server.

<small>Built from WC-Generator v[genVersion]</small>
<!-- AURO-GENERATED-CONTENT:END -->
