As a best practice recommendation, the WC-Generator's templates come pre-configures to use [constructable stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) using LitElement's [static styles](https://lit-element.polymer-project.org/guide/styles#expressions) for performance.

> Static styles apply to all instances of a component. Any expressions in CSS are evaluated once, then reused for all instances.

If there is a requirement for the CSS to be reevaluated, this can either be done by moving the CSS to the `render()` method or addressed in a lifecycle method.

Moving the CSS to the `render()` method requires an update to the `sassRender` script and removing the reference to `staticStyles-template.js`.
