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
