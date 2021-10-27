# CSS styles and custom elements

CSS with custom elements opens a new bucket of opportunity. A few benefits that Auro takes direct advantage of are encapsulation, `:host`, and constructable stylesheets. Let's dive into these technologies and understand how best to use them.

## Encapsulation

> One of the key features of the Web Components standard is the ability to create custom elements that encapsulate your functionality on an HTML page, rather than having to make do with a long, nested batch of elements that together provide a custom page feature.

-- [Using custom elements - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements)

So what does that mean? One definition is, _" the succinct expression or depiction of the essential features of something."_ In essence, that is also the definition of a custom element. It is the encapsulation with the [shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) that allows web developers the unique opportunity to create a component that will not pollute anything outside the scope of the element and is mostly isolated from the outside. The key properties that affect a custom element from the outside (or "pierce the shadow DOM") are global font and color styles, and [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

The true benefit with encapsulation of CSS and custom elements is that you do not need to be concerned about global styles having side effects on your element when used in any context of any website. While naming conventions and using parent selectors have become a staple of web development over the years, these techniques are not necessary for UI stability in custom elements. However, they do come in handy for maintaining the sanity of your CSS. To that end, Auro has a series of [CSS development conventions](https://auro.alaskaair.com/webcorestylesheets/conventions) that we highly recommend.

## :host selector

With encapsulation comes the `:host` CSS pseudo-class. This special selector in the CSS world is... _" the most powerful selector in the universe... "_ You could draw a parallel between `:host` and `{this}` in JavaScript.

> The `:host` CSS pseudo-class selects the shadow host of the shadow DOM containing the CSS it is used inside — in other words, this allows you to select a custom element from inside its shadow DOM.

In practical terms, what does that mean? In other front-end frameworks, it is commonplace to wrap the scope of the component's HTML in a `div` and add a class. You could look at that outer `div` as the _host_ of the component.

```js
// React w/JSX
render() {
  return (
    <div className="my-element">
      ...
    </div>
  )
}
```

With custom elements, there is no need to wrap all the HTML inside an outer element to create that host wrapper. The custom element itself is that wrapper and any styles using the `:host` selector will be applied to the whole element. The following example is a HTML template from LitElement using a [tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates). This is NOT JSX.

```js
// LitElement w/tagged template literal
render() {
  return html`
    <div>
      ...
    </div>
  `;
}
```

### Parental awareness

Aside from not needing to wrap all the HTML in yet another `div`, another thing that we get that is a super-power IMHO is parental awareness. What does that mean? Well, a custom element's CSS is fully aware of any changes to the parent custom element. E.g. `<my-element>`.

Where this comes in VERY handy is with applying stylistic changes to your custom element without having to create properties and manage the application and removal of CSS within the scope of the element. The idea is to allow a user to add an attribute to the custom element tag and the element will just respond.

<!-- Note: add content related to issues with Svelte and Preact regarding this technique. -->

For example, let's imagine that you have `<my-element>` and you need an alert state. With no additional functionality inside the custom element, the API will simply be to add an `alert` attribute to the tag. Like so.

```html
<my-element alert></my-element>
```

The CSS for this attribute support could be something like this.

```css
:host([alert]) {
  color: var(--auro-color-alert-error-on-light);
}
```

For a great example of how this can be used, check out the [auro-accordion](https://auro.alaskaair.com/components/auro/accordion) [CSS styles](https://github.com/AlaskaAirlines/auro-accordion/blob/master/src/style.scss).

### Reflection

When a corresponding property for the attribute is not needed, no additional support is required. However, if you bind the attribute to a property, you need to make sure to set the reflected value. Some frameworks, e.g. Svelte and Preact, have the opinion to set properties instead of attributes.

To set the reflected value in the custom element, add [reflect: true](https://lit-element.polymer-project.org/guide/properties#reflected-attributes) to the `properties()` method. This will ensure that setting the property will also set the attribute.

```js
myProp: {
  type: Boolean,
  reflect: true
}
```

## Constructable stylesheets

One of the core complaints around using HTML custom elements is the fact that the CSS per that element is repeatedly loaded into the DOM. While in most cases this is not an issue, but in some, it may be. It is not uncommon to have more than one button on a page.

To address this Google has been working to have a new spec called [constructable stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) become a web standard. Reading this document may be more than most want to consume and the work seems daunting to address. Luckily that is not the case. LitElement supports constructable stylesheets and this implementation is directly supported by Auro's WC-Generator.

```js
static get styles() {
  return [
    styleCss
  ]
}
```

That's it. That is all that is needed for you to support this new CSS specification that will allow for all uses of the same element to share one set of CSS in the browser. For browsers that do not support this spec, the CSS is loaded inline in a `<style>` element within the scope of the shadow DOM.

## CSS, shadow DOM, and slots

This is an important distinction to be aware of. Earlier stated, CSS in the shadow DOM is encapsulated to the shadow DOM. That being said, slots can be a confusing part of this.

> The slot global attribute assigns a slot in a shadow DOM shadow tree to an element: An element with a slot attribute is assigned to the slot created by the <slot> element whose name attribute's value matches that slot attribute's value.

-- [slot - MDN web docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/slot)

So what does that mean? Let's look at [auro-icon](https://auro.alaskaair.com/components/auro/icon) for example. Looking at the [source code](https://github.com/AlaskaAirlines/auro-icon/blob/master/src/auro-icon.js) for the element, you will see the following. Notice the use of the `<slot>` element. What this will do is take the content from between the `<auro-icon>` element and place that into the space of the `<slot>` inside the shadow DOM.

The issue here is that the string between the `<auro-icon>` tags in the light DOM and will be represented in the shadow DOM where the `<slot>` element is. And when I say string, I mean all the HTML content.

```js
return html`
  <div class="${classMap(classes)}">
    ${this.svg}
    <div class="${classMap(a11y)}">
      <slot></slot>
    </div>
  </div>
`;
```

For example, when using this custom element in your app you could have this style.

```css
.isOrange {
  color: orange;
}
```

<style>
  .isOrange {
    color: orange;
  }
</style>

Then within the `<slot>` of the `<auro-icon>` element, you could do this:

```html
<auro-icon label category="in-flight" name="wifi">
  <span class="isOrange">Wi-Fi</span>
</auro-icon>
```

The result of this HTML would be this:

<auro-icon label category="in-flight" name="wifi"><span class="isOrange">Wi-Fi</span></auro-icon>

There are emerging technologies such as [::slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted) that may or may not help this situation, but this is something that every custom element developer and user need to be aware of.

## :slotted

So what is the [::slotted](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted) CSS pseudo-element?

> The ::slotted() CSS pseudo-element represents any element that has been placed into a slot inside an HTML template (see Using templates and slots for more information).

-- [::slotted - MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted)

Simply put, the `::slotted` selector allows the developer of a custom element some control over the presentation over slotted content. This is especially helpful when allowing users to add their own HTML into the `<slot>` parts of your element. A pretty standard example can be seen in the [auro-alerts]() custom element. In the stylesheet you will see the following code:

```css
.content ::slotted(p) {
  margin-top: var(--auro-size-none);
}

.content ::slotted(p:last-child) {
  margin-bottom: var(--auro-size-none);
}
```

The styles inside the scope of the custom element do not influence the `<p>` element that may be inheriting styles from a global stylesheet. To counter this, using the `::slotted` selector the author of the element can exert control over the slotted `<p>` element.

This is pretty powerful, but there are limitations. The `::slotted` selector [does not influence nested elements](https://stackoverflow.com/questions/61626493/slotted-css-selector-for-nested-children-in-shadowdom-slot).

## Shadow parts

This is an exciting new development with CSS and the growing support for custom element customization.

> The ::part CSS pseudo-element represents any element within a shadow tree that has a matching part attribute.

-- [::part](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)

What do shadow parts give us? Simply put, this allows the author of the element to define specific parts of the HTML template that will allow users to target those parts and apply CSS that will affect the UI inside the shadow DOM.

If you have read through everything up to this point, you may see where this is yet another super-power. What we know so far is that CSS in the shadow DOM stays in the shadow DOM. We also know that CSS outside the scope of the shadow DOM has little effect on any custom element. While influence on slotted content or using the `::slotted` selector gives users some opportunity, `::part` is the most powerful of all.

While shadow parts are [not new](https://caniuse.com/mdn-css_selectors_part), having to support IE has slowed its adoption. Looking ahead, I foresee the use of this selector more and more and we leave IE11 in the dust for good!
