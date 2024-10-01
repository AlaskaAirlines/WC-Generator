# Auro build systems
The goal of this document is to roughly outline every step of the build + release process in any given Auro component.

## Local development
When developing and/or working on an existing Auro component, a developer will initially -

1. git clone a repository
1. Run `nvm use 20` && `npm install` (nvm step optional)
    1. As a post-install hook, git-hook tool husky installs scripts to the .git directory. More on this in the commit section!
1. Checkout a new feature branch off main (some branches still use master)
1. Run `npm run build` - this is a macro to build sass files and generate TypeScript declarations
    1. This is inconsistent? Some have `build:version` and some do not
1. Run `npm run build:docs` to bootstrap markdown files from their static HTML
1. Run `npm run dev` to start their server and watch their files for changes

**When done working on a feature, or otherwise running git commit:**

1. A commit message linter will run (commit lint)
    1. A precommit hook runs preCommit test linters postinstall
1. On GitHub

**Once code is pushed**

1. Developer opens a PR to main
1. CodeQL workflow is started
1. Test and publish workflow is started with the following steps -
    1. `npm ci`
    1. `npm run build`
    1. `npm run build:test`
        1. linters
        1. unit tests

**Once code is merged into main**

1. CodeQL workflow is started again
1. Test and publish workflow is started with the following steps -
    1. `npm ci`
    1. `npm run build`
    1. `npm run build:test`
        1. linters
        1. unit tests
    1. Semantic release conditional job runs with the following steps -
        1. `npm ci`
        1. `npm run build:release`
        1. `build:release` script runs the following: 
            1. `build`
            1. `build:test`
            1. `build:api` 
            1. `build:docs` 
            1. `bundler` 
            1. `postinstall`
1. After a new version of the package is released
1. End users and dependent repositories can be updated to use these new changes