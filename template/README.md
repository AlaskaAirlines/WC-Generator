# [namespace]-[name]

`<[namespace]-[name]>` is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of quickly creating page and content headers.

## Docs

All information regarding Project Setup, Technical Details, Tests and information regarding Auro Stateless Components can be found in the [docs](https://auro.alaskaair.com/components/[namespace]/[name]) project documentation site.

## UI development browser support

For the most up to date information on UI development [browser support](https://auro.alaskaair.com/support/browsersSupport)

## Install
[![Build Status](https://img.shields.io/github/actions/workflow/status/AlaskaAirlines/[namespace]-[name]/testPublish.yml?style=for-the-badge)](https://github.com/AlaskaAirlines/[namespace]-[name]/actions/workflows/testPublish.yml)
[![See it on NPM!](https://img.shields.io/npm/v/@aurodesignsystem/[namespace]-[name]?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@aurodesignsystem/[namespace]-[name])
[![License](https://img.shields.io/npm/l/@aurodesignsystem/[namespace]-[name]?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)

```shell
$ npm i @aurodesignsystem/[namespace]-[name]
```

Installing as a direct, dev or peer dependency is up to the user installing the package. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer.

### Design Token CSS Custom Property dependency

The use of any Auro custom element has a dependency on the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens/install).

### Heading styles

All Auro heading styles are packaged with this component. There is no need to reference WCSS header styles in your project.

### Define dependency in project component

Defining the component dependency within each component that is using the `<[namespace]-[name]>` component.

```javascript
import "@aurodesignsystem/[namespace]-[name]";
```

**Reference component in HTML**

```html
<[namespace]-[name]>Hello World</[namespace]-[name]>
```

## SEO / a11y

The [namespace]-[name] component follows all best practices for SEO and accessibility standards. This component places all content within the scope of the [slot element](https://auro.alaskaair.com/support/slots) to ensure discoverability of content regardless of JavaScript support.

## CDN Use

In cases where the project is not able to process JS assets, there are pre-processed assets available for use.

### Install

Include the following example HTML code in the `<head>` element of your page.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/design-tokens@latest/dist/tokens/CSSCustomProperties.css" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@aurodesignsystem/webcorestylesheets@latest/dist/bundled/essentials.css" />

<script src="https://cdn.jsdelivr.net/npm/@aurodesignsystem/[namespace]-[name]@latest/dist/[namespace]-[name]__bundled.js" type="module"></script>
```

**NOTE:** Be sure to replace `@latest` in the URL with the version of the asset you want. @latest is NOT aware of any MAJOR releases, use at your own risk.

### CDN options

Both [Unpkg](https://www.unpkg.com/) and [JSDelivr](https://www.jsdelivr.com/) are free open source options that you can use. These are 3rd party resources and Auro is not responsible for their uptime. **Use at your own risk.** These bundle resources are included with the npm package, you are free to use any CDN resource that fits your needs.

## [namespace]-[name] use cases

The `<[namespace]-[name]>` element should be used in situations where users may:

* page header
* content / paragraph header

## API Code Examples

Default [namespace]-[name]

```html
<[namespace]-[name] level="1" display="display">Hello World</[namespace]-[name]>
```

## Development

In order to develop against this project, if you are not part of the core team, you will be required to fork the project prior to submitting a pull request.

Please be sure to review the [contribution guidelines](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/CONTRIBUTING.md) for this project. Please make sure to **pay special attention** to the [conventional commits](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/CONTRIBUTING.md#conventional-commits) section of the document.

### Start development environment

Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open a shell session to run the **dev server**.

```bash
$ npm i polymer-cli -g
```

```shell
// shell terminal one
$ npm run dev
```

Open [localhost:8000](http://localhost:8000/)

If running separate sessions is preferred, please run the following commands in individual terminal shells.

```shell
$ npm run build:watch
$ npm run serve
```

### Testing
Automated tests are required for every Auro component. See `.\test\[namespace]-[name].test.js` for the tests for this component. Run `npm test` to run the tests and check code coverage. Tests must pass and meet a certain coverage threshold to commit. See [the testing documentation](https://github.com/AlaskaAirlines/auro_docs/blob/master/src/TESTS.md) for more details.
