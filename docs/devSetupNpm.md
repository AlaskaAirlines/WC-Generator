# NPM best practices

The Auro Web Components project is a Node.js based Javascript project designed to address front-end development issues. Its primary deliverable format is npm, the default package manager for the JavaScript runtime environment Node.js.

## Dependency management

Auro is an ecosystem of individual elements and support systems that allow developers to quickly stand up UIs without needing to know extremely low-level ideas like colors, spacing, interaction models and accessibility specifications. To best manage this environemnt Auro has implimented two types of design patterns.

### Primitive component(s)

_Primitive components_ (or "primitives") are the low-level custom elements used in a design system. Examples include buttons, inputs, and hyperlinks. A crucial property of a primitive component is that it cannot complete an action alone. For example, a button by itself is unable to complete an action within an experience.

Primitives have peer-dependnecies on tokens and icons.

### (complex) web omponent(s)

_Complex web components_ (as used in this context), like primitives, are custom elements, but are more complex. These more complex web components can be made up of multiple primitives and (in some cases) other complex web components. A crucial property of a complex web component is when two or more primitives or other components are working in concert to complete an interaction.

Components may have direct dependencies on primitives, but they may also have peer-dependencies on tokens, icons and/or other components as well. Examples of elemets like this are date pickers and combobox interfaces.

In some rare cases an Auro element may extend the use of a primative to create a new element within the scope of a web componet. A great example of this is with the Auro Nav element that creates the concept of AuroBreadcrumb by [extending](https://github.com/AlaskaAirlines/auro-nav/blob/main/src/auro-breadcrumb.js) the primitive Auro Hyperlink elemeent.

### Support nested dependencies

By default npm will automaticaly install peer dependencies and nested dependencies. While your `./package.json` does install and manage dependencies in alphabetical order, this is not a guarantee of load order. And when considering web components, nested dependencies also do not guarantee that the version specified will be loaded into the DOM at point of render. Libraries have a 'first come, first serve' model. Meaning, if an element with a nested dependency loads first and contains a version that is other than the directly loaded version, that nested version is what registers with the browser.

Conversly, if the directly requested version loads first, the nested version will be ignored.

The Auro team works hard to ensure that once a component is updated, any component that has a dependency on that update is also updated and released.

### Override npm

Timing is everything and there may be times where a nested dependency is not updated with the current release and there is a desire to have that be predictable. A way to solve this is to use the ["overrides"](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#overrides) feature of npm. Please see the examples listed in this link as the feature is very flexible.

```js
{
  "dependencies": {
    "foo": "^1.0.0"
  },
  "overrides": {
    // BAD, will throw an EOVERRIDE error
    // "foo": "^2.0.0"
    // GOOD, specs match so override is allowed
    // "foo": "^1.0.0"
    // BEST, the override is defined as a reference to the dependency
    "foo": "$foo",
    // the referenced package does not need to match the overridden one
    "bar": "$foo"
  }
}
```

A real example used with Auro is to address an issue where `wc-sass-render` has a depednency on a specific version of Sass. While this is not ideal and especially since `wc-sass-render` does not relelase with every Sass update, Auro uses overrides to make this easier to manage.

The following example shows how `wc-sass-render` (dependency on Sass `1.42.1`) and `sass` is loaded. The override specifcally notes the intention of overriding the nested version of `sass` in `wc-sass-render` with the version loaded. Prefixing the name of the dependency with a `$` makes this easier to manage.

```js
{
  {
    "sass": "^1.70.0",
    "wc-sass-render": "",
  },
  "overrides": {
    "wc-sass-render": {
      "sass": "$sass"
    }
  },
}
```
