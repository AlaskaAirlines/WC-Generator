# Accessibility focus visible

One of the core pillars for supporting accessibility (a11y) within a modern web application is through maintaining the state of focus as a user tabs through an interface. The current implementation of this a11y state is via the `:focus` state introduced in CSS Level 2 (Revision 1).

For a11y reasons, according to the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus#Accessibility_Concerns), it is advised to NEVER remove the browsers default settings without replacing it with a sufficient substitute.

```css
:focus {
  outline: none;
}
```

> Never just remove the focus outline (visible focus indicator) without replacing it with a focus outline that will pass [WCAG 2.1 SC 1.4.11 Non-Text Contrast](https://www.w3.org/WAI/WCAG21/Understanding/non-text-contrast.html)

## Design concerns

The `:focus` state is applied to an element when it is clicked or tapped creating a halo effect. Many designs will often want to remove the outline on focus, however this is not an option if your project is required to be accessible. This presents an interesting design challenge with many opportunities.

## Selectors Level 4 specification

In the next selector level specification draft is [9.4. The Focus-Indicated Pseudo-class: :focus-visible](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).

> The `:focus-visible` pseudo-class applies while an element matches the `:focus` pseudo-class and the UA (User Agent) determines via heuristics that the focus should be made evident on the element. (Many browsers show a “focus ring” by default in this case.)

-- [:focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible)

The role of this new selector is to allow for developers to build interfaces that allow for differences based on the user’s input modality, e.g. a mouse vs. the keyboard.

## Focus visible browser support

With [increased browser support](https://caniuse.com/?search=focus-visible) the `:focus-visible` selector rarely requires polyfill support. Use of this selector is consistent with any CSS pseudo-class.

```css
:focus-visible {
  background-color: var(--auro-color-border-error-on-light);
  color: var(--auro-color-base-white);
}
```

Note: browser defaults have a similar outline _halo_ with `:focus-visible` as with the `:focus` selector.

## Focus visible polyfill

The Auro WC-Generator supports the `focus-visible` [polyfill](https://www.npmjs.com/package/focus-visible), based on the proposed CSS pseudo-class, and allows for this functionality for remaining non-supporting browsers.

> Based on the proposed CSS :focus-visible pseudo-selector, this prototype adds a focus-visible class to the focused element, in situations in which the :focus-visible pseudo-selector should match.

The polyfill has been tested in a number of situations and has great support from the community and its users.

## Focus visible, Auro custom elements, native and polyfill support

It is important to remember that the focus-visible polyfill does NOT reach into the shadow DOM of a custom element. When tabbing through an interface, the `.focus-visible` selector will be placed on the host tag of a custom element. The CSS within the custom element will need to be aware of the outer host's appearance of the `.focus-visible` selector. The following example is how to write a CSS selector that will be inside the shadow DOM, but aware of updates to the host custom element tag.

```css
:host(.focus-visible) {
  .button {
    background-color: red;
  }
}
```

When the `:focus-visible` pseudo-class is available to the browser, the polyfill does not conflict with the `.focus-visible` selector in the DOM. In order to support both formats, it is necessary to duplicate the styles for this interaction. The pseudo-class will be applied to the actual element in the shadow DOM that was tabbed to, versus the outer tag of the custom element, so there is no need to use the `:host()` selector as a reference.

```css
:focus-visible {
  background-color: red;
}
```

WCSS has support for the [.focus-visible](https://alaskaairlines.github.io/WebCoreStyleSheets/#accessibility-css) selector as well as the [:focus-visible](https://alaskaairlines.github.iodocs/#core-css-#{$scope}%20*) pseudo-class selector for a baseline experience.
