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

# The farm team

Welcome to Auro Labs! If you have come this far, you must be interested in learning how to build a new custom element in Auro Labs!

When building a new custom element  in Auro Labs it is highly recommended that you start with the [WC-Generator](https://auro.alaskaair.com/getting-started/developers/generator/install) as this comes packed with all of Auro's vetted best practices and baked in dependencies that will make your transition to the majors a breeze.

Once the generator is [installed](https://auro.alaskaair.com/getting-started/developers/generator/install), be sure to use the `--npm` flag to set the npm namespace to `@aurolabs`.

```
$ wc-generate --npm @aurolabs --name myelement
```

## Getting started

From installing the generator all the way to setting up a Github repo. Follow these initial steps to get up and running.

<auro-accordion-group>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">1. Install WC-Generator</span>
    <div class="lightText">
      <p>Install the <auro-hyperlink href="https://auro.alaskaair.com/getting-started/developers/generator/install">WC-Generator</auro-hyperlink>, if not already installed</p>
      <pre class="pre">  $ npm i @alaskaairux/wc-generator -g</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">2. Create your new custom element repository locally</span>
    <div class="lightText">
      <p>Once the generator is installed, run the generator command to create a new custom element repository.</p>
      <pre class="pre">  $ wc-generate --npm @aurolabs --name [element name]</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">3. Change into new directory</span>
    <div class="lightText">
      <p>You need to be inside the newly created directory in order to complete the following steps.</p>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">4. Run tests</span>
    <div class="lightText">
      <p>Run the tests to ensure that all things are working as expected.</p>
      <pre class="pre">  $ npm run test</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">5. Start the server</span>
    <div class="lightText">
      <p>Start the server to make sure that all dependencies are set up correctly.</p>
      <pre class="pre">  $ npm run serve</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">6. Create an internal Github repo</span>
    <div class="lightText">
      <p>For Alaska employees only. Create a new <code>internal</code> repository with <auro-hyperlink target="_blank" href="https://github.com/AlaskaAirlines">github.com/AlaskaAirlines</auro-hyperlink>. Once completed, push your <code>main</code> branch to the remote repository.</p>
      <p>Please be sure to name the repo with <strong>auro</strong> to properly follow our open source repository guidelines. E.g. auro-[your component name].
      <p><strong>Randos will be deleted!</strong></p>
    </div>
  </auro-accordion>
</auro-accordion-group>

## Getting to work

Now that your install is setup and your repo is ready to go, let's get to work!

<auro-accordion-group>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">1. Create your new feature branch</span>
    <div class="lightText">
      <p>In your local repo, create a new working branch called <code>initial-build</code>. This will be the branch you will compare to <code>main</code> for the pull request later.</p>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">2. Edit the custom element file</span>
    <div class="lightText">
      <p>60% of your work will happen in the generated custom element file, found at <code>./src/auro-[name].js</code>. We can't recommend enough that you review the <auro-hyperlink href="https://lit-element.polymer-project.org/guide/templates" target="_blank">LitElement docs</auro-hyperlink>. Many of the recommended best practices listed there will be seen in the generated file.</p>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">3. Injecting CSS into the shadow DOM</span>
    <div class="lightText">
      <p>While 60% of the work will be in the <code>./src/auro-[name].js</code> file, at least 30% of the work will be CSS. Working with CSS is really easy with the pre-configured setup. Adjacent to the Javascript file will be <code>./src/styles.scss</code>.</p>
      <p>When writing CSS, there are some <auro-hyperlink href="https://auro.alaskaair.com/webcorestylesheets/conventions" relative>conventions to follow</auro-hyperlink> and <auro-hyperlink relative href="https://auro.alaskaair.com/webcorestylesheets/custom-element-css">new ideas to learn</auro-hyperlink>. But no worries, the Auro team is there for you 100% along the way!<p>
      <p>To make this process as painless as possible, the <code>$ npm run dev</code> command runs all the magic for you converting the Sass to CSS and then creating a <code>style-css.js</code> file. Just FYI, this is not what you may expect from a CSS in JS style solution. The build process actually takes the rendered CSS from the Sass and wraps it in a CSS tagged template literal that LitElement can easily consume.</p>
      <pre><code>import styleCss from "./style-css.js";</code> </pre>
      <p>That's it. That's the magic.</p>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">4. Conventional commits</span>
    <div class="lightText">
      <p>Prior to making your first commit, please review <auro-hyperlink relative href="/contributing">Auro Design System Contributing Guidelines</auro-hyperlink>, specifically the section on <strong>Conventional Commits</strong>.</p>
      <p>Conventional Commits play a critical role in determining the next version release. The following template will help you construct the proper commit message.</p>
      <pre class="pre">  [type]([optional scope]): [description]</pre>
      <p>For example, let's say that you are working on a new feature supporting accessibility. Commit messages could be like the following. It is important to note that the <code>fix</code> commit is the only commit that will trigger a PATCH version release. The <code>docs</code> and <code>test</code> commits will not.</p>
      <pre class="pre">
  fix(a11y): update acronym to read out full word, e.g. SEA reads Seattle
  docs(a11y): address API changes in readme and automated docs
  test(a11y): add new test for screen reader feature</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">5. Pre-commit hooks</span>
    <div class="lightText">
      <p>When committing code, you should see a series of pre-commit hooks confirming the stability of the code you are creating. If you do not see these hooks, then there is an issue with your install and you should consult with an Auro team member.</p>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">6. Amend commits to maintain a readable history</span>
    <div class="lightText">
      <p>While Git history is helpful, in the early stages of a project not all history is helpful. It is considered best practice to <code>amend</code> previous commits if the work is closely related, especially if it is a refactor of the previous commit. The following will add the updates recently completed and amend them to the previous commit without asking for a change in the commit message. Lastly, this is a change in history, so a force push to the remote is required.</p>
      <pre class="pre">
  $ git add --all
  $ git commit --amend --no-edit
  $ git push origin [feature-branch-name] --force</pre>
    </div>
  </auro-accordion>
  <auro-accordion id="newWork" chromeless noProfile>
    <span slot="trigger" class="trigger">7. Is there a getting started guide? </span>
    <div class="lightText">
      <p>This is just the tip of the iceberg. There are a lot of nooks and crannies when working with Auro's web component generator. It is highly recommended that you review our <auro-hyperlink href="https://auro.alaskaair.com/getting-started/developers/generator/getting-started" relative>Getting Started</auro-hyperlink> guide.</p>
      <p>Along with the guide to getting started, we would also recommend the following:</p>
      <ul>
        <li><auro-hyperlink href="https://lit-element.polymer-project.org/guide/templates" target="_blank">LitElement docs</auro-hyperlink></li>
        <li><auro-hyperlink href="https://auro.alaskaair.com/contributing">Auro's contributing Guidelines</auro-hyperlink></li>
        <li><auro-hyperlink href="https://eslint.org/docs/2.0.0/rules/" target="_blank">esLint rules</auro-hyperlink></li>
        <li><auro-hyperlink href="https://auro.alaskaair.com/support/tests">Web Component Automated Testing</auro-hyperlink></li>
        <li><auro-hyperlink href="https://auro.alaskaair.com/webcorestylesheets/conventions">Auro's CSS conventions</auro-hyperlink></li>
        <li><auro-hyperlink href="https://auro.alaskaair.com/webcorestylesheets/custom-element-css">CSS styles and custom elements</auro-hyperlink></li>
        <li><auro-hyperlink href="https://auro.alaskaair.com/webcorestylesheets/linter">CSS Lint rules</auro-hyperlink></li>
      </ul>
    </div>
  </auro-accordion>
</auro-accordion-group>

## Deploy your new custom element

Once the repository is setup and the work for the initial release of the new custom element is complete, all that is left is to contact an Auro admin to add the repo secrets. These are required for semantic-versioning and publishing to npm. Once published, your new element will be accessible from the `@aurolabs` namespace.

## Publish a demo

Contained within the WC-Generator is a demo build process. Run `$ npm run demo:build` to crate a new static build directory that can be deployed to any static server like [surge.sh](https://surge.sh/).

<div style="display: flex; justify-content: space-between; margin-top: 10rem">
  <auro-hyperlink href="https://auro.alaskaair.com/aurolabs" nav>
    <auro-icon category="interface" name="arrow-left" customColor></auro-icon>
    Previous: AuroLabs
  </auro-hyperlink>

  <auro-hyperlink href="https://auro.alaskaair.com/aurolabs/majors" nav>
    Next: the majors
    <auro-icon category="interface" name="arrow-right" customColor></auro-icon>
  </auro-hyperlink>
</div>
