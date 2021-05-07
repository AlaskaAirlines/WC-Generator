# Idiomatic CSS
Maintenance of large libraries with multiple contributors is difficult to say the least. Along side many of the other [Auro style guide principals](http://auro.alaskaair.com/getting-started/developers/webcorestylesheets) the Auro design system also recommends the [idiomatic CSS](http://auro.alaskaair.com/webcorestylesheets/idiomatic-css) style of writing. Inspired by [idiomatic.js](https://github.com/rwaldron/idiomatic.js), the purpose of this recommendation is to ensure consistency and enable readability of code.

In a nutshell, idiomatic CSS is an expectation of the order of declarations within a selector. Starting with positioning, then display & box model with remaining things rounding things out.

The following example would be considered non-compliant with this standard, but something you will commonly see.

```css
.selector {
  font-family: sans-serif;
  color: #fff;
  text-align: right;
  padding: 10px;
  overflow: hidden;
  position: absolute;
  z-index: 10;
  height: 100px;
  top: 0;
  padding: 10px;
}
```

Idiomatic CSS follows an order of positioning, display and other. You can think of it as an order of importance. The following example is compliant with this standard. The use of white-space is helpful to see the different groups.

```css
.selector {
  position: absolute;
  z-index: 10;
  top: 0;

  overflow: hidden;
  height: 100px;
  padding: 10px;

  color: #fff;
  font-family: sans-serif;
  text-align: right;
}
```

Additional information about [idiomatic CSS](http://auro.alaskaair.com/webcorestylesheets/idiomatic-css) is available on the [Auro Design System doc site](http://auro.alaskaair.com/).
