# Auro Web Component Generator

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/badges.md) -->
<!-- The below content is automatically added from ./topics/badges.md -->
[![Build Status](https://img.shields.io/github/workflow/status/AlaskaAirlines/WC-Generator/Test%20and%20publish?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/actions?query=workflow%3A%22test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@aurodesignsystem/wc-generator.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@aurodesignsystem/wc-generator)
[![License](https://img.shields.io/npm/l/@aurodesignsystem/wc-generator.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
[![issues](https://img.shields.io/github/issues-raw/AlaskaAirlines/WC-Generator?style=for-the-badge)](https://github.com/AlaskaAirlines/WC-Generator/issues)
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (TOC) -->
- [Description](#description)
  - [What's in the box?](#whats-in-the-box)
  - [Build pipeline](#build-pipeline)
  - [Github settings](#github-settings)
  - [CSS performance](#css-performance)
  - [Unit testing](#unit-testing)
  - [Accessibility](#accessibility)
- [Conventions for building custom elements](#conventions-for-building-custom-elements)
- [Upgrade your repo with the latest generator](#upgrade-your-repo-with-the-latest-generator)
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/alerts.md) -->
<!-- The below content is automatically added from ./topics/alerts.md -->
> **NOTICE**: Auro's WC Generator does not currently support Node 16 due to dependencies with unsupported features. The Auro team is currently working on [a plan to address this issue](https://github.com/AlaskaAirlines/WC-Generator/issues/226).
<!-- AURO-GENERATED-CONTENT:END -->

## Description

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/description.md) -->
<!-- The below content is automatically added from ./topics/description.md -->
Auro's WC-Generator helps you to quickly kickstart new custom element projects, loaded with best practices and tools to help you become instantly productive.

Making it this easy is done by supporting the Auro ecosystem. Quickly generate a new repo with the `wc-generate` command. Please review the generator's [api page](https://auro.alaskaair.com/getting-started/developers/generator/generator/api) for all information.

Packed inside this generator are all the tools and libraries needed to quickly and easily build an HTML custom element that can be published with the Auro Design System. Auro takes care of providing everything you need to get started without the headaches associated with all the manual setup.

### What's in the box?

The Auro WC-Generator is chock full of the best practices the Auro team has built over the years. From libraries to code style guides, the Auro team continues to promote these best practices and lessons learned by endlessly updating the generator. We do this so that you don't have to worry.

### Build pipeline

WC-Generator provides a complete build pipeline for combining all your development resources into a single package for distribution.

* Process Sass to a CSS file that can be injected into the scope of the custom element
* Compile all CSS, JavaScript, and dependency resources into a single bundle
* Run all automated linters and tests
* Github workflow and issue templates all customized for your new project
<!-- AURO-GENERATED-CONTENT:END -->

### Github settings

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/componentDevelopment/github.md) -->
<!-- The below content is automatically added from ./topics/componentDevelopment/github.md -->
Auro's WC-Generator comes with an opinionated `settings.yml` for the repository. These settings are regularly reviewed and approved by the Auro team. It is asked that you do not change these settings. These settings pre-config the repository itself, setting up `main` as a protected branch, and updates all the issue labels.

For more information on the use of labels, please be sure to take a look at [Issues, pull requests, and labels](https://auro.alaskaair.com/contributing/issues-prs-labels) in the Auro doc site.

Each new repository is pre-configured to seamlessly publish your new custom element with npm and host all your code with Github.
<!-- AURO-GENERATED-CONTENT:END -->

### CSS performance

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/componentDevelopment/css.md) -->
<!-- The below content is automatically added from ./topics/componentDevelopment/css.md -->
As a best practice recommendation, the WC-Generator's templates come pre-configures to use [constructable stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) using LitElement's [static styles](https://lit-element.polymer-project.org/guide/styles#expressions) for performance.

> Static styles apply to all instances of a component. Any expressions in CSS are evaluated once, then reused for all instances.

If there is a requirement for the CSS to be reevaluated, this can either be done by moving the CSS to the `render()` method or addressed in a lifecycle method.

Moving the CSS to the `render()` method requires an update to the `sassRender` script and removing the reference to `staticStyles-template.js`.
<!-- AURO-GENERATED-CONTENT:END -->

### Unit testing

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/componentDevelopment/unitTesting.md) -->
<!-- The below content is automatically added from ./topics/componentDevelopment/unitTesting.md -->
Unit testing made easy using [@open-wc/testing](https://open-wc.org/docs/testing/helpers/) and [@web/test-runner](https://modern-web.dev/docs/test-runner/overview/).

> An opinionated package that combines and configures testing libraries to minimize the amount of ceremony required when writing tests.
<!-- AURO-GENERATED-CONTENT:END -->

### Accessibility

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/componentDevelopment/a11y.md) -->
<!-- The below content is automatically added from ./topics/componentDevelopment/a11y.md -->
Auro takes accessibility very seriously. For one, our testing tools come pre-configured with a first-pass test.

```js
it('[namespace]-[name] is accessible', async () => {
  const el = await fixture(html`
    <[namespace]-[name] cssclass="testClass"></[namespace]-[name]>
  `);

  await expect(el).to.be.accessible();
});
```

From there we only go up! Each Auro element comes pre-configured to use Auro's design tokens. Atomic elements of the UI are vetted regularly for accessibility issues.
<!-- AURO-GENERATED-CONTENT:END -->

## Conventions for building custom elements

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/componentDevelopment/conventions.md) -->
<!-- The below content is automatically added from ./topics/componentDevelopment/conventions.md -->
Once the new development environment has been created, there are some conventions to follow to ensure the success of your new custom element. Please see the following documents:

1. [CSS Development Conventions](https://auro.alaskaair.com/support/css-conventions)
1. [Web Component Automated Testing](https://auro.alaskaair.com/support/tests)
1. [The slot element, performance and SEO](https://auro.alaskaair.com/support/slots)
1. [Web Component Polyfill Support](https://auro.alaskaair.com/support/polyfills/focusvisible)
1. [Accessibility focus visible](https://auro.alaskaair.com/support/polyfills/focusvisible)
<!-- AURO-GENERATED-CONTENT:END -->

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./topics/repoUpgrade.md) -->
<!-- The below content is automatically added from ./topics/repoUpgrade.md -->
## Upgrade your repo with the latest generator

Time marches on and the generator marches forward. We are always looking for ways to make our custom elements and our developer experience better. And because of that, it's easy to get behind. The Auro team makes this easy to keep up with. First, you can always tell what version of the generator your project was built from as a version is listed at the bottom of the `./README.md` file.

```html
<small>Built from WC-Generator v2.10.8</small>
```

To upgrade your project to the latest generator build, simply follow the steps as outlined in the Generator section of the Auro site, specifically, [Auro migrate shell script](https://auro.alaskaair.com/getting-started/developers/generator/upgrade).

> Install this BASH shell script to easily migrate an existing Auro custom element to a new repository based on a current build. This process does not upgrade an existing repository but migrates the necessary files from a legacy repo to a newly created repo.
<!-- AURO-GENERATED-CONTENT:END -->
