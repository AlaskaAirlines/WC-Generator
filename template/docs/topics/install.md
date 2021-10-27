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
   import '[npm]/[namespace]-[name]';
   ```

1. Reference `[namespace]-[name]` in HTML.
   ```html
   <[namespace]-[name]></[namespace]-[name]>
   ```
