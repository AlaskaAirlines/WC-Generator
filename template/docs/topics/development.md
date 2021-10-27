# Development

<!-- AURO-GENERATED-CONTENT:START (TOC:collapse=true) -->
<details>
<summary>Table of Contents</summary>

- [Introduction](#introduction)
- [Building](#building)
- [Testing](#testing)
- [Running a localhost](#running-a-localhost)
- [Demo deployment](#demo-deployment)

</details>
<!-- AURO-GENERATED-CONTENT:END -->
<br/>

## Introduction

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./developmentDescription.md) -->
<!-- The below content is automatically added from ./developmentDescription.md -->

Review the [contribution guidelines](https://auro.alaskaair.com/contributing) for the Auro Design System. Make sure to **pay special attention** to the **conventional commits** section of the document.

For information on browser compatibility consult our [support matrix](https://auro.alaskaair.com/support/browsersSupport).

If you are not part of the Auro core team you will be required to [fork the project](https://docs.github.com/en/get-started/quickstart/fork-a-repo) prior to submitting a pull request.

<!-- AURO-GENERATED-CONTENT:END -->

## Building

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./building.md) -->
<!-- The below content is automatically added from ./building.md -->

You can trigger a build by running `$ npm run build` which executes the following actions:

1. Compile all style code
1. Copies all `./src/` JS files to the `./dist` directory
1. Generates `docs/api.md`.
1. Runs all automated tests
1. Bundles all assets

Bundled assets are not merged into the repo. To create the bundles locally without executing a full build run `$ npm run bundler`.

The `API.md` file is generated in the build and committed back to the repo with a version change. If the API doc has changed without a version change, author's are required to run `$ npm run build:api` (which will update `API.md`) and commit to version control.

<!-- AURO-GENERATED-CONTENT:END -->

## Testing

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./testing.md) -->
<!-- The below content is automatically added from ./testing.md -->

Automated tests are required for every Auro component.

Run `$ npm test` to execute the tests and check code coverage. Tests must pass and meet a certain coverage threshold to commit.

Tests are located at `.\test\`.

See the [testing documentation](https://auro.alaskaair.com/support/tests) for more details.

<!-- AURO-GENERATED-CONTENT:END -->

## Running a localhost

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./localHost.md) -->
<!-- The below content is automatically added from ./localHost.md -->

You will need to open two different shell sessions. One is for the **npm tasks**, the second is to run the **server**.

```shell
// shell terminal one
$ npm run dev

// shell terminal two
$ npm run serve
```

Open [localhost:8000](http://localhost:8000/).

_Note that your `serve` instance may define a different port to use if 8000 is already in use._

<!-- AURO-GENERATED-CONTENT:END -->

## Demo deployment

<!-- AURO-GENERATED-CONTENT:START (FILE:src=./demoDeployment.md) -->
<!-- The below content is automatically added from ./demoDeployment.md -->

To deploy a demo version of the component for review, run `npm run build:demo` to create a `./build` directory that can be pushed to any static server.

<small>Built from WC-Generator v[genVersion]</small>

<!-- AURO-GENERATED-CONTENT:END -->
