<!--
The index.md file is a compiled document. No edits should be made directly to this file.
README.md is created by running `npm run build:docs`.
This file is generated based on a template fetched from `./docs/partials/index.md`
-->

# [Name]

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./description.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## [namespace]-[name] use cases

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./useCases.md) -->
<!-- AURO-GENERATED-CONTENT:END -->

## Additional Information

> Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam fermentum libero ipsum, ac tempor sapien blandit in. Nam tincidunt non felis molestie varius.

|convallis|tristique|nisl dignissim|eleifend|
|---|---|---|---|
|√|√|||
|||√|√|

Aenean at blandit lorem. Fusce imperdiet mi nec gravida maximus. Quisque nisl libero, condimentum in nisi a, imperdiet lacinia arcu.

## Example(s)

<div class="exampleWrapper">
  <!-- AURO-GENERATED-CONTENT:START (FILE:src=./../../apiExamples/basic.html) -->
  <!-- AURO-GENERATED-CONTENT:END -->
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

<!-- AURO-GENERATED-CONTENT:START (CODE:src=./../../apiExamples/basic.html) -->
<!-- AURO-GENERATED-CONTENT:END -->

</auro-accordion>

Having a closing statement about your example helps to really complete the thought with your reader.

## Recommended Use and Version Control

There are two important parts of every Auro component. The <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes">class</a> and the custom clement. The class is exported and then used as part of defining the Web Component. When importing this component as described in the <a href="#install">install</a> section, the class is imported and the `[namespace]-[name]` custom element is defined automatically.

To protect from versioning conflicts with other instances of the component being loaded, it is recommended to use our `registerComponent(name)` method and pass in a unique name.

```js
import './node_modules/@aurodesignsystem/[namespace]-[name]';
registerComponent('custom-[name]');
```

This will create a new custom element that you can use in your HTML that will function identically to the `[namespace]-[name]` element.

<div class="exampleWrapper">
  <custom-[name] display="display">Salutations World!</custom-[name]>
</div>

<auro-accordion alignRight>
  <span slot="trigger">See code</span>

  ```html
  <custom-[name] display="display">Salutations World!</custom-[name]>
  ```

</auro-accordion>
