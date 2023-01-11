# Common definitions

In a design system there are many words that can be very confusing, such as _component_ and _element_ as they have broad misunderstanding. Here we will define a few core terms that you will see throughout the Auro project.

It needs to be pointed out that we are choosing NOT to use the term _element_ alone as this may be confused with [native HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) already supported by the browser. While HTML custom elements are elements and they are used in HTML as tags, always referring to them as _custom elements_ helps us to better communicate the intent.

## Token

A _token_ is a common reference to a static value. A token is not a variable, but tokens can produce output in the form of variables. A token in this context is a data key associated with its value, for example:

```json
{
  "color": {
    "brand": {
      "midnight": {
        "100": {
          "value": "c1daf0",
```

Token output can be exported as data or variables for various platforms including Sass, CSS, iOS and Android. For example:

```scss
$color-brand-midnight-100: #c1daf0;

// or

--color-brand-midnight-100: #c1daf0;
```

Or even, based on it's meta data, tokens can export a complete object that can be used in complex interfaces.

```js
module.exports = {
  "color": {
    "brand": {
      "midnight": {
        "100": {
          "value": "#c1daf0",
          "comment": "\n  // Please consider descriptive token prior to using brand token",
          "public": true,
          "neutral": true,
          "usage": "Transactional colors to move guests through task-based interactions.",
          "wcag": "n/a",
          "deprecated": false,
          "original": {
            "value": "c1daf0",
            "comment": "{comments.color.brand.value.comment}",
            "public": true,
            "neutral": true,
            "usage": "Transactional colors to move guests through task-based interactions.",
            "wcag": "n/a",
            "deprecated": false
          },
          "name": "auro-color-brand-midnight-100",
          "attributes": {
            "category": "color",
            "type": "brand",
            "item": "midnight",
            "subitem": "100"
          },
          "path": [
            "color",
            "brand",
            "midnight",
            "100"
          ]
        }
      }
    }
  }
}
```

## HTML custom element

The term _web component_ is a broad term referring to a type of technology used in web development. [HTML custom elements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements), commonly referred to as web components, is an HTML specification referring to the use of the shadow DOM, templates and slots.

Web components can be pre-styled, fully functional HTML custom elements for commonly-used UIs. They can be very low-level input types, all the way up to complex interactions and content delivery. You can browse the list of all released [components and related design system resources](/component-status).

As with native HTML elements, a developer can use a `<p>` tag to create a paragraph. This element has no native style associated with it other than what a browser may have pre-configured.

With custom elements, a developer may create `<my-p>` containing specific styling and/or behavior. Custom elements are used the same way native elements are used, for example `<my-p>Hello World!</my-p>`

## Primitive component

_Primitive components_ (or "primitives") are the low-level custom elements used in a design system. Examples include buttons, inputs, and hyperlinks. A crucial property of a primitive component is that it cannot complete an action alone. For example, a button by itself is unable to complete an action within an experience.

Primitives are dependant on tokens.

## Component

_Web Components_ (as used in this context), like primitives, are custom elements, but are more complex. Web components can be made up of multiple primitives and (in some cases) other custom elements if not web components. A crucial property of a web component is when two or more primitives or other components are working in concert to complete an interaction.

Components may have a dependency on primitives, but they may also have dependencies on tokens or other components as well.

## Pattern

Patterns are commonly-used interfaces where the makeup is entirely of primitives, and possibly other components. Due to their complexity the pattern is "suggested use" to allow the engineer to address individual use cases directly, versus having to work with an overly complex API. On the other hand, a pattern may be simply an easily repeatable UI of any part of the ecosystem with some minor HTML and CSS whereas the creation and maintenance of a custom element is unnecessary.
