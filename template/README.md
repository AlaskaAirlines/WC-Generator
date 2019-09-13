<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-[name].svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionStatelessComponents__ods-[name])
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/ods-[name].svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/ods-[name].svg?color=blue)

# \<ods-[name]>

\<ods-[name]> is a [HTML custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) for the purpose of ...

## Docs

All information regarding Project Setup, Technical Details, Tests and information regarding ODS Stateless Components can be found in the [docs](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/tree/master/docs) project repository.

## UI development browser support

For the most up to date information on UI development browser support, see [docs/BROWSER_SUPPORT.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/BROWSER_SUPPORT.md)

## Install

```shell
$ npm i @alaskaairux/ods-[name]
```

Installing as a direct, dev or peer dependency is up to the user installing the package. If you are unsure as to what type of dependency you should use, consider reading this [stack overflow](https://stackoverflow.com/questions/18875674/whats-the-difference-between-dependencies-devdependencies-and-peerdependencies) answer.

### Design Token CSS Custom Property dependency

The use of any ODS custom element has a dependency on the [ODS Design Tokens](https://github.com/AlaskaAirlines/OrionDesignTokens).

For additional details in regards to using Orion Design Tokens with components, please see [docs/TECH_DETAILS.md](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md)

### CSS Custom Property fallbacks

[CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) are [not supported](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/CUSTOM_PROPERTIES.md) in older browsers. For this, fallback properties are pre-generated and included with the npm.

Any update to the Orion Design Tokens will be immediately reflected with browsers that support CSS custom properties, legacy browsers will require updated components with pre-generated fallback properties.

### Define dependency in project component

Defining the component dependency within each component that is using the \<ods-[name]> component.

```javascript
import "@alaskaairux/ods-[name]/dist/ods-[name]";
```

**Reference component in HTML**

```html
<ods-[name]>Hello World</ods-[name]>
```

## Styling (experimental)

Option(s) for component customization.

[Place relative content here if ::part() is to be considered for support]

| Selector | Type | State | Description |
|----|----|----|---|
| ::part() | pseudo-element | experimental | Update shadowDOM CSS from outside the component |

See [caniuse.com](https://caniuse.com/#search=%3A%3Apart) for more information.

## [name] use cases

The \<ods-[name]> element should be used in situations where users may:

* ...
* ...
* ...

## Properties:

| Attribute | Value type | Description |
|----|----|----|
| attr | string, boolean, function | Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. |

## API Code Examples

Default [name]

```html
<ods-[name]>Hello World</ods-[name]>
```

### [React] Custom callbacks

[The following is suggested content. If there is any special consideration for callback support with React or other development environments, please upate.]

[name](React support) with `ref` for passing in an event, [see notes](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/CALLBACK.md).

```html
<ods-[name] ref={this.event}>hello world</ods-[name]>
```

## Alternate build solutions

Why would you need this? With all Orion custom elements the CSS for the element is embedded within the shadow DOM of the custom element. If your development environment is not allowing for the use of shadow DOM elements, the CSS for each element is distributed via additional resources within the npm package.

[Read more about how to use alternate CSS build resources](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/ALT_BUILD.md)


## Development

In order to develop against this project, if you are not part of the core team, you will be required to fork the project prior to submitting a pull request.

Please be sure to review the [contribution guidelines](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/CONTRIBUTING.md) for this project. Please make sure to **pay special attention** to the [conventional commits](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/CONTRIBUTING.md#conventional-commits) section of the document.

### Start development environment

Once the project has been cloned to your local resource and you have installed all the dependencies you will need to open three different shell sessions. One is for the **Gulp tasks**, the second is for a series of **npm tasks** and the last is to run the **Polymer server**.

**Peer depdency:** Please make sure Polymer is installed globally in order to run the Polymer server. See [ODS Stateless Component Development Details](https://github.com/AlaskaAirlines/OrionStatelessComponents__docs/blob/master/docs/TECH_DETAILS.md) for more information. 

```bash
$ npm i polymer-cli
```

```shell
// shell terminal one
$ gulp dev

// shell terminal two
$ npm run dev

// shell terminal three
polymer serve
```

##
<footer>
Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
</footer>
