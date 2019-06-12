<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" style="padding-left: 10px" />

# ODS Stateless Component Development Details

Building the JavaScript and CSS for the components requires a handful of processing events in order to produce the desired code needed per component that meets the needs of the current state of browser support.

## Polymer Development

Developing and rendering components require Polymer resources. In order to easily support this in a development environment it is suggested that developers install the Polymer-CLI for local use.

| Dependency | info |
|----|----|
| Polymer-CLI | [npm install](https://www.npmjs.com/package/polymer-cli)

To start a local component server:

```
$ polymer serve
```

## Iron icons

`iron-icons` is a Polymer utility that includes the definition for the `iron-iconset-svg` element, as well as an import for the default icon set.

Icon icons are **not used** for Orion purposes. This is a utility only used for the purposes of the **demo** within each component directory.

See [demo](https://www.webcomponents.org/element/@polymer/iron-icons/demo/demo/index.html)

## Custom fonts

Building components requires local access to custom web fonts. After installing the [Orion Web Core Stylesheet(OWCSS)](https://github.com/AlaskaAirlines/OrionWebCoreStyleSheets) project, the following script is needed to copy fonts from the [npm](https://www.npmjs.com/package/@alaskaairux/orion-web-core-style-sheets) package and onto the scope of the element / component in development.

```
$ npm run copyfiles
```

| Dependency | Info | Project |
|---|---|---|
| Orion Web Core Stylesheets | `npm i @alaskaairux/orion-web-core-style-sheets` | [npm](https://www.npmjs.com/package/@alaskaairux/orion-web-core-style-sheets) |
| copyfiles | `npm i copyfiles` | [npm](https://www.npmjs.com/package/copyfiles) |

Copyfiles is included as part of the `gulp build` and `gulp watch` processes per component.

## Building resources from Orion Design Tokens

The use of ODS components requires the use of **Token CSS Custom Properties** and **Token Sass Variables** from the [ODS Design Tokens](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens) project.

This is necessary as each component references these global Custom Properties directly and many of the features of OWCSS require information from the Sass variables. When the Orion Design Tokens are updated, these values will influence the nested Web Components within the scope of the project as well as any project scoped Sass.

This process is represented in the `demo/` section of this project.

### Style Dictionary scripts and config settings

Building out Sass Variables and CSS Custom Properties from Design Token JSON files is a key dependency for any CSS development. The following command has a dependency on `./scripts/tokenScript.js` all related `./scripts/*Config.json` files.

| Command | Description |
|----|----|
| `$ npm run buildTokens` | References JSON files within project and transpiles into CSS/Sass resources per the config file*† |

\* Each JSON file must have an individual config for individual resource building.

† Function is included as part of the `gulp build` and `gulp watch` processes.

| Dependency | Info | Project |
|---|---|---|
| Orion Design Tokens | `npm i @alaskaairux/orion-design-tokens` | [npm](https://www.npmjs.com/package/@alaskaairux/orion-design-tokens) |
| Style Dictionary | `npm i style-dictionary` | [npm](https://www.npmjs.com/package/style-dictionary) |

## Component CSS

lit-element components are JavaScript modules that produce HTML Web Components. A feature of Web Components is encapsulated CSS through the use of the [shadowDOM](https://developers.google.com/web/fundamentals/web-components/shadowdom). Meaning, CSS needs to be written directly into the module itself.

Using Sass and other techniques makes this undesirable to edit directly within the scope of the component JS file. To assist with this, the following script will process CSS resources into a JavaScript module that can be imported into the component.

| Dependency | Info | Project |
|---|---|---|
| WC Sass Render | `npm i wc-sass-render` | [npm](https://www.npmjs.com/package/wc-sass-render) |

| Command | Description |
|----|----|
| `$ npm run sassRender` | Converts CSS or Sass to JavaScript module |

## Accessibility and testing

Development of components requires a fine attention to details in regards to conforming to accessibility regulations. For more information on how to best use Aria rules, please be sure to review this document by the [Google Chrome team](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

### Google Chrome Inspector

Built within Google's Chrome inspector is an **audit** tab that will run the Lighthouse performance tool. Uncheck all the audits except for **Accessbility**, choose either Desktop or Mobile and run the audit. Lighthouse will return a detailed report about the accessibility performance of the component.

Also within Google's Chrome inspector is the **Accessibility** tab. This view will give individual results on the accessibility of the element you have selected.

## Component Demo

For the purpose of demonstrating an element or component the demo requires all the same dependencies that other projects do. This includes Design Tokens, OWCSS breakpoints; fonts; normalize; baseline and utility classes.

Having these resources as dependencies allows for independent development and release cycles between dependencies and individual components.

The best way to address this within demos per element or component is to have a `style.scss` file in the `demo/` directory that will process all the necessary dependencies into usable CSS at the page level.

OWCSS resources have a dependency on Sass variables while components use Custom CSS Properties. It is important to have both these files generated and used in a project.

In the demo `index.html` simply `<link>` the stylesheet as with any project.

```html
<link rel="stylesheet" type="text/css" href="css/style.css">
```

## Gulp Script API

The following is a list of Gulp tasks as defined in `[ods-component]/gulpfile.js`

| Task | Description |
|----|----|
| copyFonts | Copy files from npm to local resources |
| buildTokens | Builds out CSS resources necessary for local development |
| distTokens | Builds Design Tokens to meet dist spec |
| processDemo | Build CSS from Sass for component demo |
| processSrc | Build all CSS resources needed for production deployment and browser testing |
| processImportsCanonical | Process Sass to create canonical resource |
| processImportsVariable | Process Sass to create variable resource |
| processDev | Build minimal CSS resources needed for local development |
| reprocessClean | Re-processes style_clean.scss file to replace `:host` with `&` for static output |
| sassWatch | Watcher for building CSS resources from Sass files |
| build | Main task to run all build tasks |
| dev | Main task to run all development tasks |

## package.json API

The following is a list of npm scripts as defined in `[ods-component]/package.json`

| Task | Description |
|----|----|
| build | Main task to run all build tasks |
| buildTokens | Builds out CSS resources necessary for local development |
| copyFonts | Copy files from npm to local resources |
| copyResources | Dist build step to copy ./README.md to ./dist |
| cssLint | CSS linter |
| dev | Runs development environment |
| dist | Prepares files for packaging distribution |
| distJS | Copies JS files from `./src` directory to `./dist` |
| distTokens | Builds out CSS resources based on custom Style Dictionary rules |
| jsonLint | JSON linter |
| sassRender | Builds `*-css.js` files from Sass/CSS dev files |
| sassRender-w | Watches Sass/CSS files to re-render `*-css-js` files in dev mode |
| stylefluxCanonical | Processes alternate processed CSS import file with canonical CSS properties |
| stylefluxVariable | Processes alternate processes CSS import file with CSS Custom Properties |
| sweep | Removes all dynamic build resources from local repo |



##

Alaska Airlines Orion Design System<br>
Copyright 2019 Alaska Airlines, Inc. or its affiliates. All Rights Reserved.
