<style>
  .lightText {
    color: var(--auro-color-text-secondary-on-light);
    margin-bottom: 2rem;
  }

  .pre {
    color: var(--auro-color-brand-flamingo-500);
    font-size: 0.8rem;
    font-family: monaco;
    padding-top: .5rem;
    margin-bottom: 0;
  }

  .trigger {
    font-size: 1.2rem;
  }
</style>

# From the minors to the majors

Once a new component is released for beta use under the `@aurolabs` namespace, this will trigger a review process with the Auro team. This process will happen as soon as possible, but please be patient.

## Design sponsor

A core part of the review process is to have design sponsorship for your new custom element. In order for the new element to be considered for the Auro design system, the designs need to be reviewed, prepared and documented for use across all design teams.

We suggest starting with your team's designers. If they are unable to support the effort, reach out to the Auro team and we will work with leadership to identify a sponsor.

## Code review

The next stage to be completed is a thorough code review of the new element. To be better prepared for this part of the process, it is recommended to review the following documents for background, library support and best practices.

* [LitElement docs](https://lit-element.polymer-project.org/guide/templates)
* [Auro's contributing Guidelines](https://auro.alaskaair.com/contributing)
* [esLint rules](https://eslint.org/docs/2.0.0/rules/)
* [Web Component Automated Testing](https://auro.alaskaair.com/support/tests)
* [Auro's CSS conventions](https://auro.alaskaair.com/webcorestylesheets/conventions)
* [CSS styles and custom elements](https://auro.alaskaair.com/webcorestylesheets/custom-element-css)
* [CSS Lint rules](https://auro.alaskaair.com/webcorestylesheets/linter)

## Documentation

The strength of Auro, and any design system, is its docs. To help streamline this process, the custom element demo located at `./demo/index.md`, is the same document that will be used in the Auro doc site when the new element is released.

Because of this, it is important that the demo page is fully reviewed by Alaska UX writers and the Auro team.

In addition to demo and technical documentation, design documentation is also required. This will be completed by the design sponsor of the new element and reviewed by design leadership and the Auro team.

Lastly, the API documentation is essential. To make this easy, the WC-Generator fully supports [JSDoc](https://github.com/runem/web-component-analyzer/blob/master/README.md#-how-to-document-your-components-using-jsdoc) via web-component-analyzer, a comment based documentation library specifically created for use with HTML custom elements.

## Welcome to the team!

Once the review process is complete, your new element will be moved from `@auroLabs` to the Auro Design System. Your new element will be added to the Auro doc site and we will release your repo to open source.

Since you are the one who created the repo, being on the Auro team or not, you will retain push access to the repo as an added benefit. Now go earn those GitHub green dots!

<div style="display: flex; justify-content: flex-start; margin-top: 10rem">
  <auro-hyperlink href="https://auro.alaskaair.com/aurolabs/minors" nav>
    <auro-icon category="interface" name="chevron-left" customColor></auro-icon>
    Previous: the minors
  </auro-hyperlink>
</div>
