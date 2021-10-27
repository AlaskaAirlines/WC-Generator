You can trigger a build by running `$ npm run build` which executes the following actions:

1. Compile all style code
1. Copies all `./src/` JS files to the `./dist` directory
1. Generates `docs/api.md`.
1. Runs all automated tests
1. Bundles all assets

Bundled assets are not merged into the repo. To create the bundles locally without executing a full build run `$ npm run bundler`.

The `API.md` file is generated in the build and committed back to the repo with a version change. If the API doc has changed without a version change, author's are required to run `$ npm run build:api` (which will update `API.md`) and commit to version control.
