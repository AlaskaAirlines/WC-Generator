# Auro guide to API development

The purpose and scope of this document is to provide clear and direct language as to assist authors in the process of defining a clear and declarative API for their custom element.

_The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119)._

To clearly understand how to build an API for a HTML custom element, first one must understand the basics of HTML attributes.

1. Attributes are either [enumerated attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#keywords-and-enumerated-attributes) or [boolean attributes](https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#boolean-attributes)
1. Enumerated attributes are based on keywords that must map to a feature of the element, e.g. `type="value"`. The value may be numbers or letters.
1. Boolean attributes may define the state of the element, but the value shall not be `true` or `false`. For the value to be `true` its value must either be an empty string or a value that matches for the attribute's canonical name. E.g. `disabled`, `disabled=""` or `disabled="disabled"`.


To define a custom element's API authors shall consider the following:

1. A custom element's name must be singular. Regardless of variants, every element is a representation of a single instance.
1. Content should not be placed into attributes. Authors should allow users to place content into [slot](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/slot) elements.
1. Authors may use properties for content when in the form of data to be enumerated over within the scope of the custom element.
1. When determining support for a feature, or a design variation of a custom element, consider if the API is to expose a feature, define state or modify feature or state.
	1. If the element's feature should not overlap with or contradict another feature, the author should use an enumerated attribute.
	1. If the element's feature defines the _state_ of the element's content, its ability to perform an action, or _modifies_ another feature, the author should use a boolean attribute.
1. Boolean attributes should not use `true` or `false` as a value. E.g. if an element is to display a checked state, the use of the boolean is required to be `checked` which is equal to `checked="checked"`.
  1. Authors must be aware of opportunities where boolean values can be stacked and defensively code against side effects. E.g. how will the element react if a user has an option to use `disabled` and `checked` at the same time?
  1. Enumerated attributes shall be considered `true` when the attribute is present with a string value. While HTML custom element authors may test against the appearance of the attribute using `true` or `false`, this attribute may not be considered a boolean attribute.

## Compliance

Compliance is difficult to gauge as we can only make decisions with the knowledge we have at the time. And many time an efficient API is only discovered with use. While we do our best to come up with a future proof API, there will be times when a component needs to be refactored and breaking changes will be made.
