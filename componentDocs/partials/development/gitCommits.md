This project utilizes [Conventional Commits](https://www.conventionalcommits.org/) to auto-generate release versions, based on the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

**NOTE:** Before working in your project, be sure to run `$ npm i` to ensure that all packages are installed.

Submitting pull requests that do not conform to the Conventional Commits standard, the team will assume that development dependencies were not installed and no tests were validated prior to submission. **This may result in immediate disqualification of the pull request**.

```html
<type>[optional scope]: <description>
```

**All commit messages** must be prefixed with a specific type so that the semver release configuration can analyze the commit and apply the correct version release. Please see the following types with their respective meanings.
