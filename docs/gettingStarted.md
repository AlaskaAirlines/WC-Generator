# Getting started

The Auro WC-Generator makes it really easy to get started building HTML custom elements using Auro's foundational support.

When using the WC-Generator, you will get the following scaffolding:

1. Dev server and demo page support using markdown
1. LitElement web component scaffolding js file
1. Sass and PostCSS pre-configured support
1. Sass template Auro Design Tokens, breakpoints and core CSS ready
1. JSDoc support
1. Pre-configured Rollup for producing pre-bundled modern and legacy versions of the web component
1. Full code linting support
1. Fully configured [Karma via Open-WC](https://auro.alaskaair.com/support/tests) testing support
1. Support for conventional commits and automated semantic versioning
1. Pre-commit hooks
1. Pre-configured GitHub actions support
1. npm publish ready

## Installing

The Auro WC-Generator is to be installed globally via npm

```bash
$ npm i @alaskaairux/wc-generator -g
```

Once the package is installed, run the following command to init a new local repo.

```bash
$ wc-generate --name [wc name]
```

**Note** By default, the WC-Generator will assume `auro` as the namespace for the WC, `@alaskaairux` as the npm group, and your current directory where to install. Be sure to reference the [api](https://auro.alaskaair.com/getting-started/developers/generator/generator/api) for all information regarding customization.

## Servers

When building the new web component, there are two servers you can use to test your component.

First is a resource build server. Running `npm run dev` will run a watcher that will process all the Sass/CSS resources for your new custom element.

Running `npm run serve` will start the dev server where you can view your web component demo at [http://localhost:8000](http://localhost:8000).

## Editing your demo

While building a web component, being able to see the component in the browser is essential. Located in `/demo/demo.md` is a pre-configured markdown demo file.

This is a static document. If there is a need to use any of Auro's pre-developed custom elements in the demo, this will need to be added to the `./demo/index.html` file.

DO NOT add features to the demo `index.html` file. This file is simply a markdown wrapper to process all the demo content from the `demo.md` file. If there is a peer dependency for other components or other JavaScript outside the scope of the new element, this will be added to the `index.html` file.

```html
<script src="https://unpkg.com/@alaskaairux/auro-button@latest/dist/auro-button__bundled.js" type="module"></script>
```

See the auro-popover [demo](https://github.com/AlaskaAirlines/auro-popover/blob/master/demo/index.html) as example.

Additionally, do not edit the demo's Sass file. Again this is a resource for all the UI outside the scope of the custom element. Any CSS added to the demo Sass fill will NOT follow the component when it is installed in other applications.

## Editing your custom element

Located in the `./src` directory will be your new `.js` component file and a `style.scss` file. These two files are set up to work together from the start.

The custom element's scaffolding is made up of a few parts mentioned here.

1. Import dependencies
1. Class definition
1. [Property declaration](https://lit-element.polymer-project.org/guide/properties#declare)
1. [Static styles](https://lit-element.polymer-project.org/guide/styles#add-styles) tagged template literal
1. The `render()` method
1. Custom element definition

### Dependencies

The new element will be pre-configured for default support. Additional component dependencies will be added here.

### Class definition

Everything related to the construct of the web component will happen here.

### Properties

Using the `properties()` method, add the component [properties](https://lit-element.polymer-project.org/guide/properties) and their type here. Declaring properties here with their types is what creates the difference between an HTML attribute and a component prop.

### Static styles

It is highly recommended that this is not edited. The component is already pre-configured to import `${styleCss}` which is imported from `"./style-css.js";`. It is recommended to update the `style.scss` file for all your styles.

To learn more about styling custom elements, see the [litElement docs](https://lit-element.polymer-project.org/guide/styles) on the subject.

### Render method

All your HTML will go into the `html` [tagged template literal](https://lit-html.polymer-project.org/guide/concepts#tagged-template-literals). This is not JSX, this is real HTML. It is important to remember that your component will be in the shadow DOM of its parent custom element. There is no need for a wrapping `div` like you find in other frameworks.

It is highly recommended that you review the [lit-HTML](https://lit-html.polymer-project.org/guide/writing-templates) docs to get familiar with this library. Specifically, it is recommended to get yourself familiar with the [built in directives](https://lit-html.polymer-project.org/guide/template-reference#built-in-directives) to support many common use cases. A few directives that we make good use of include

1. [classMap](https://lit-html.polymer-project.org/guide/template-reference#classmap)
1. [ifDefined](https://lit-html.polymer-project.org/guide/template-reference#ifdefined)
1. [repeat](https://lit-html.polymer-project.org/guide/template-reference#repeat)

#### The slot

Something special to web components is the `<slot>` element. This small, but powerful element is a key part of inserting content into the scope of the web component from exterior HTML without a special prop. In short, anything can be placed into the `<slot>` of a component. String text, additional HTML elements, additional custom elements. A powerful feature of the `<slot>` is also the ability to pass shadow DOM JavaScript functionality from one component to the next.

It is also important to understand how the `<slot>` element provides [performance and SEO](https://auro.alaskaair.com/support/slots) support.

### this

Remember when referencing variables or functions within the scope of the `render()` method be sure to reference `this` or you will get a runtime error with your component.

### Nesting other custom elements

In the case where your new component has a dependency on another component, see the [litElement docs](https://lit-element.polymer-project.org/guide/use#use) for referencing another component in your code.

### Custom element definition

There should never be a reason to edit this.

## Styling your component

When writing styles for your component, be sure to use the CSS variables from the [Auro Design Tokens](https://auro.alaskaair.com/getting-started/developers/design-tokens). The build pipeline is configured to create fallback properties for the final CSS output.

Again, Auro Design Tokens are already installed in this custom element, you simply need to use them.

#### Non-compliant

```scss
.testClass {
  color:  $auro-color-border-error-on-light;
  border: 1px solid;
  border-color: #df0b37;
  display: inline-block;
  padding: 1rem;
}
```

#### Compliant

```scss
.testClass {
  color:  var(--auro-color-border-error-on-light);
  border: 1px solid;
  border-color: var(--auro-color-border-error-on-light);
  display: inline-block;
  padding: var(--auro-text-body-size-default);
}
```

When writing styles using CSS variables, please be sure to follow the recommendations for [shady CSS](https://auro.alaskaair.com/support/shadycss) in order to avoid any issues with IE11.

### PostCSS support

Configured into the component build system is a PostCSS step that will address any vendor prefixing and create the fallback properties for the CSS variables. If there are any additional Sass files needed or the files are renamed from anything other than `style.scss`, be sure to update the `scripts/postCss.js` file or the PostCSS support will fail.

## Documenting your component's API

Auro WC-Generator fully supports JSDoc and Web Component Analyzer, all you need todo is write code. WCA will automatically go through your code and produce a markdown document containing your API. It is preferred that you provide descriptions, this is where JSDoc comes in. Using a very familiar syntax, it is easy to document your code.

#### Add a general description of your component

```js
/**
 * This component will do amazing things and make life worth living.
 */
```

#### Describe attributes of your component

```js
/**
 * This component will do amazing things and make life worth living.
 *
 * @attr {String} validationMessage - Validation message appears post user input
 * @attr {Boolean} disabled - If set, disables input
 */
```

#### Describe properties and functions

```js
/**
 * Value is SVG for use
 */
this.closeSvg = this.getIconAsHtml(closelg);

/**
 * Ensures that focus can be done programmatically
 */
focus() {
  this.input.focus();
}
```

Running either `npm run apiBuild` or `npm run ciBuild` will generate the API document to be added to the repo's version control.


## Testing your component

Setting up your tests will be in `test/auro-*.test.js`. Please see [Web Component Automated Testing](https://auro.alaskaair.com/support/tests) for all related testing info.


## Running the build pipeline

When running your new component for development you will need to shells. One for running the Sass/CSS processing, and one for running the server.

```bash
$ npm run dev
$ npm run serve
```

If at any time you are in need of a full build, it is recommended to run `$ npm run ciBuild`.
