# Auro Design System Contributing Guidelines

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

## Feature Requests

Feature requests stem from a business need. It is important to understand whether your idea fits with the scope and aims of the project of if this serves to address a personal/local scenario. It is up to you to make a strong case about the merits of this feature. Please provide as much detail and context as possible.

## Reporting Bugs

A bug is defined by: "A demonstrable problem that is caused by a file in the repository." Good bug reports are extremely helpful - thank you!

To submit an issue, please go to [Auro's project status board](https://auro.alaskaair.com/component-status) and click on the ISSUES badge associated to project you wish to submit an issue for.

Guidelines for bug reports:

1. Check if the issue has already been reported. Go to Auro's [project board](https://github.com/orgs/AlaskaAirlines/projects/1) and click on labels like `type: bug` or `type: feature` to filter through the many issues between all of Auro's projects.
  * For bugs - [https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22)
  * For features - [https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22)
1. Check if the issue has been fixed — try to reproduce it using the latest main or feature branch in the repository
1. Isolate the problem — ideally create a reduced test case and a live example

A good bug report shouldn't leave others needing to follow up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Poor bug reports will be reassigned back to the creator for revision prior to any additional investigation.

For more information about the issue submission process, please see the [Issues: work status label maintenance](https://auro.alaskaair.com/contributing/issues-prs-labels) section of the Auro contributing guidelines

## Submitting pull requests

No one other than repository managers have direct access to any repository. For non-team members, pull requests must originate from a [forked repo](https://auro.alaskaair.com/contributing/upstream) in your own Github account.

All new work that is to be considered for merging with the `main` branch must start from a new feature branch of work. This feature branch should be in response to either a [reported bug](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22) or a [new business requirement](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22).

Unsolicited pull requests will take longer to respond to. We ask for your patience. To help expedite any pull request, we ask that you submit an issue first. This will help the team understand the problem you are trying to solve before submitting the solution.

For more information about the pull request submission process, please see the [Pull Requests](https://auro.alaskaair.com/contributing/issues-prs-labels) section of the Auro contributing guidelines

### Feature branch naming

The name of the feature branch should be descriptive as to the nature of the work and please include any references to the story or bug work item ID. Examples are:

```
feature--clean-up-npm-api-#80

bug--button-not-focusable-IE11-#77
```

### Rebase on main

To maintain repository history health, it is best practice to [rebase branches off of an updated main versus merging down](https://www.atlassian.com/git/tutorials/merging-vs-rebasing).

If you have push access to the repo

```
$ git checkout main
$ git pull
$ git checkout [feature branch]
$ git rebase main
$ git push origin [feature branch] --force
```

If you are working off a forked branch, please see [Maintaining your fork's upstream relationship](https://auro.alaskaair.com/contributing/upstream) to sync your main branch and then follow the outlined steps.

## Conventional Commits

This project utilizes [Conventional Commits](https://www.conventionalcommits.org/) to auto-generate release versions, based on the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).

**NOTE:** Before working in your project, be sure to run `$ npm i` to ensure that all packages are installed. Submitting pull requests that do not conform to this standard will assume that development dependencies were not installed and no tests were validated prior to submission. **This will result in immediate disqualification of the pull request**.


```
<type>[optional scope]: <description>
```

**All commit messages** must be prefixed with a specific type so that the semver release configuration can analyze the commit and apply the correct version release. Please see the following types with their respective meanings.

#### MAJOR

For a MAJOR release, you MUST follow this template. The use `BREAKING CHANGE:` in conjunction with any other commit type is required in order to push a major release.

```
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.
```

#### MINOR
```
feat(pencil): add 'graphiteWidth' option
```

#### PATCH
```
fix(pencil): stop graphite breaking when too much pressure applied
```

#### Other commit types

| type | description |
|---|---|
| build | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) |
| ci | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| docs | Documentation only changes |
| feat | A new feature (this correlates with `MINOR` in semantic versioning) |
| fix | A bug fix (this correlates with `PATCH` in semantic versioning) |
| perf | A code change that improves performance |
| BREAKING CHANGE | A code change that is not backwards compatible (correlating with `MAJOR` in semantic versioning) |
| refactor | A code change that neither fixes a bug nor adds a feature |
| style | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| test | Adding missing tests or correcting existing tests  |

It is considered best practice to group multiple commits into a release. For a versioned update, be sure that your series of commits include either `feat` or `fix`. For a `MAJOR` release, any commit can be accompanied by a `BREAKING CHANGE` comment.

## Git commit messages

Once you have completed your feature update, please commit all changes to the branch. All commit messages should use an **imperative mood**.

Imperative mood simply means _“spoken or written as if giving a command or instruction”_. A few examples are:

* Clean your room
* Close the door
* Take out the trash

A properly formed Git commit subject line should always be able to complete the following sentence:

_"If applied, this commit will (your subject line here)."_

For example:

* If applied, this commit will `refactor component X for accessibility`
* If applied, this commit will `add feature Y to component X`

Example messages when using Conventional Commits:

```
$ build: update the build step to include postCSS

$ docs: address issue #14, typo in install instructions

$ perf: restructure API to comply with new feature spec

$ feat: add ability to consume large data as an array versus string

$ fix: address issue #57 in regards to color output
```
