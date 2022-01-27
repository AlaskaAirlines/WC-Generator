# Custom Element Best Practices

When writing custom elements, follow these best practices to ensure your element is as robust and intuitive as possible.

## Reflect properties to attributes

Authors should never assume that consumers of the component will always pass data as attributes. Some frameworks (e.g. Svelte and Preact) prefer to pass data as properties. Because of that, if we are using the presence of an attribute as a styling hook (e.g. `:host[disabled]`), we should reflect the corresponding property to an attribute to ensure consistent behavior.

If there is no corresponding property, no additional configuration is required.

> You never know how a user will interact with your element. They might set a property in JavaScript, and then expect to read that value using an API like `getAttribute()`. If every attribute has a corresponding property, and both of them reflect, it will make it easier for users to work with your element. In other words, calling `setAttribute('foo', value)` should also set a corresponding foo property and vice versa. There are, of course, exceptions to this rule. You shouldn't reflect high-frequency properties, e.g. currentTime in a video player. Use your best judgment. If it seems like a user will interact with a property or attribute, and it's not burdensome to reflect it, then do so.

&mdash; [Google](https://developers.google.com/web/fundamentals/web-components/best-practices#aim-to-keep-primitive-data-attributes-and-properties-in-sync,-reflecting-from-property-to-attribute,-and-vice-versa.)

> We recommend reflecting from an attribute to a property, but to avoid reflecting from properties to attributes. This is because with custom elements properties can update often and triggering a DOM change for each update can impact performance.

&mdash; [Open-WC](https://open-wc.org/guides/knowledge/attributes-and-properties/#attribute-and-property-reflection)

### Additional reference

- [Attribute and property reflection](https://open-wc.org/guides/knowledge/attributes-and-properties/#attribute-and-property-reflection)
- [Using Custom Elements in Svelte](https://css-tricks.com/using-custom-elements-in-svelte/#attributes-used-as-styling-hooks)

### Example

The [auro-loader](https://auro.alaskaair.com/components/auro/loader/install) custom element uses both API types. There are attributes used only as CSS hooks and functional properties for features. The properties of `orbit`, `ringworm`, and `laser` are used within the scope of the component to address template logic. All other loader types are simply CSS hooks that change the display.

Updating these [properties to reflect](https://github.com/AlaskaAirlines/auro-loader/blob/main/src/auro-loader.js#L64-L79) meets the criteria previously explained.

## React to slot change events

In some custom elements (e.g. auro-accordion-group) we need to keep track of the children in that element's slot. When doing so, make sure you react to [slot changes](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/slotchange_event) instead of only initializing once. This allows children to be dynamically added after the first time the element renders. Additionally, not doing this has [caused issues](https://github.com/AlaskaAirlines/auro-accordion/issues/18) in frameworks like Svelte that insert the parent into the DOM before the children.

### Additional reference
- Reference auro-accordion [pull request](https://github.com/AlaskaAirlines/auro-accordion/pull/21)
- Accessing slotted children [lit docs](https://lit-element.polymer-project.org/guide/templates#accessing-slotted-children)

## Boolean properties should have default values

When adding boolean properties to an element, it is recommended give them a default value. Otherwise, the property will be initialized to `undefined`. This will usually work as expected since `undefined` is falsy. However, it's also correct to set the property to `false`.

This has two main benefits:

1. If the property is retrieved from outside the element, it will return either `true` or `false` instead of `undefined`. Native DOM elements behave the same way, e.g. `document.querySelector('button').disabled` returns `false` instead of `undefined` if `disabled` is not set.
1. Svelte will understand that the property is a boolean and allow the consumer to write `<auro-button disabled>`. Otherwise, the consumer has to write `<auro-button disabled={true}>`.

### Additional reference

- css-tricks.com [Svelte and boolean attributes](https://css-tricks.com/using-custom-elements-in-svelte/#boolean-attributes)
- Reference auro-badge [pull request](https://github.com/AlaskaAirlines/auro-badge/pull/11)

## Perform tasks AFTER an update

When implementing a feature that performs a task that uses element DOM after an update, consider using the `updated()` lifecycle method.

A great example is [this auro-input PR](https://github.com/AlaskaAirlines/auro-input/pull/54/files) that leveraged the use of the `updated()` method to remove the complexity of using custom getters and setters.

In this example, the author removed the complexity of the procedural code for a functional approach that is easier to follow and simpler to comprehend.

### References

- Polymer lit [lifecycle updated](https://lit-element.polymer-project.org/guide/lifecycle#updated)
- lit 2.0 [lifecycle updated]((https://lit.dev/docs/components/lifecycle/#updated))

### Another example

- auro-radio [pull request](https://github.com/AlaskaAirlines/auro-radio/pull/51/files#diff-65bd360e0611c1b11aa2e53b6fac584252067859c8ff33f0b1fc7cecaee98070R54-R79)

## Minding the API and versioning

The minute you create and release a new thing and someone uses that thing, you have a versioning issue. Releasing patches and features are typically very easy as this is update is still backwards compatible and should not include any breaking changes.

In regard to the shape and API of a custom element, this gets especially dangerous and costly because that one element may be used in countless places and releasing a breaking change on the API will result in hunting down every use within the app and making a change.

Here are some tips and suggestions to reduce issues.

### Project intent

When preparing for a MAJOR release that will include breaking changes, be sure to communicate clearly your intent. Nothing is worse than a breaking release that no one knew was coming. Easy options are:

1. Add an alerting paragraph to your README document
1. Create an issue or series of issues that state the intent of the next release
1. Add a postinstall message stating the intent and linking to additional info

### Deprecation

When is it a good time to deprecate? Given the scope of the update, you may consider the following flow.

1. For v1.1, consider introducing the new features, but retain the previous feature in a deprecated state
1. Be clear in the documentation that 'feature X' is fully deprecated and is NOT to be used and point the user to documentation that references the current API.
1. Consider a pre-release candidate of the thing for users to experiment with prior to the final release

The best strategy is the overly communicated strategy. The more you can project the intent of upcoming releases, the more users will not be caught off guard and have an opportunity to control the eventual rollout of the updated thing.

## Direct or peer dependency elements 

Much of the confusion lies within how `CustomElementRegistry.define()` works. When defining a custom element to the browser, load order matters. Using the `customElements.get` method, at the point of registration to see if the element has already been registered. If not, register it.

```js
// define the name of the custom component
if (!customElements.get("auro-[name]")) {
  customElements.define("auro-[name]", Auro[Name]);
}
```

At this time, the `customElements.get()` method only returns constructor of the element and there currently is no way to natively determine what version of the element had been registered or what versions have requested to be registered. 

Regardless, what is true is that no matter how many times the same custom element requests to be registered, the request that runs first wins because of the `customElements.get()` method. NOTE: not running the `customElements.get()` method will create an error where the element is already defined and the custom element requests to define again. 

### Peer dependencies 

One way to address this is to maintain all custom elements at the same level, e.g. peer dependencies. By not making a custom element a direct dependency of another custom element, you give your users the ability to manage these dependencies themselves. While this make make installing a larger element with many decencies a little more cumbersome, in the long run managing custom elements in your app become easier. 

Another advantage of using peer dependencies is a reduction of release maintenance. For example, let's say that `<elm-wrapper>` has a direct dependency on `<elm-button>` and `<elm-button>` had a version release. In order for `<elm-wrapper>` to be up to date is to update its dependencies and re-release. Now for many projects, this works and it makes sense. But with web components, it doesn't, for a number of reasons. 

### Load order matters 

As previously explained, load order of element definitions matters. What is interesting to note is that even if you have a nested direct dependency of an element inside another element, if that element, at a different version is defined first, the nested direct dependency is ignored. So a concept of version encapsulation within a package doesn't exist. 

Given the example above with `<elm-wrapper>` and `<elm-button>`, if you are loading `<elm-wrapper>` and `<elm-button>` individually, if  `<elm-button>` were to load first, its version will dominate it's definition regardless of the version defined inside `<elm-wrapper>`. 

Given the complexity of this issue at scale of a large web app, you can quickly see how this can get very confusing. 

### Recommendation 

With these scenarios defined, it is Auro's official recommendation as a best practice for developing custom elements to never define a nested element as a direct dependency. Whenever possible, define a nested element as a peer dependency. See [auro-input](https://auro.alaskaair.com/components/auro/input/install) as an example. 

## Additional resources

- Google's  [Custom Element Best Practices](https://developers.google.com/web/fundamentals/web-components/best-practices)
