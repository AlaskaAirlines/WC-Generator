# Auro Design System Contributing Guidelines

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved. Also be sure to review the [Issues, pull requests and labels](https://auro.alaskaair.com/contributing/issues-prs-labels) process document.

## Feature Requests

Feature requests stem from a business need. It is important to understand whether your idea fits with the scope and aims of the project of if this serves to address a personal/local scenario. It is up to you to make a strong case about the merits of this feature. Please provide as much detail and context as possible.

## Submitting issues

A bug is defined by: _"A demonstrable problem that is caused by a file in the repository."_ Good bug reports are extremely helpful - thank you!

To submit an issue, please go to [Auro's project status board](https://auro.alaskaair.com/component-status) and click on the ISSUES badge associated to project you wish to submit an issue for.

Guidelines for bug reports:

1. Check if the issue has already been reported. Go to Auro's [project board](https://github.com/orgs/AlaskaAirlines/projects/1) and click on labels like `type: bug` or `type: feature` to filter through the many issues between all of Auro's projects.
  * For bugs - [https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22)
  * For features - [https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22)
1. Check if the issue has been fixed — try to reproduce it using the latest main or feature branch in the repository
1. Isolate the problem — ideally create a reduced test case and a live example

A good bug report shouldn't leave others needing to follow up for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Poor bug reports will be closed as the team is unable to reproduce the issue.

For more information about the issue submission process, please see the [Issues: work status label maintenance](https://auro.alaskaair.com/contributing/issues-prs-labels) section of the Auro contributing guidelines

## Submitting pull requests

No one other than repository managers have direct access to any repository. For non-team members, pull requests must originate from a [forked repo](https://auro.alaskaair.com/contributing/upstream) in your own Github account.

All new work that is to be considered for merging with the `main` branch must start from a new feature branch of work. This feature branch should be in response to either a [reported bug](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22) or a [new business requirement](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+feature%22).

Unsolicited pull requests **will take longer** to respond to. We ask for your patience. To help expedite any pull request, we ask that you **submit an issue first**. This will help the team understand the problem you are trying to solve before submitting the solution.

For more information about the pull request submission process, please see the [Pull Requests](https://auro.alaskaair.com/contributing/issues-prs-labels) section of the Auro contributing guidelines

### Feature branch naming

The name of the feature branch should be descriptive as to the nature of the work, reference the author, and please include any references to the story or bug work item ID. For example, if John Doe created a branch for issue #80 about cleaning up the npm API.

```shell
jdoe/cleanUpNpmApi/#80
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

**NOTE:** Before working in your project, be sure to run `$ npm i` to ensure that all packages are installed.

Submitting pull requests that do not conform to the Conventional Commits standard, the team will assume that development dependencies were not installed and no tests were validated prior to submission. **This may result in immediate disqualification of the pull request**.

```html
<type>[optional scope]: <description>
```

**All commit messages** must be prefixed with a specific type so that the semver release configuration can analyze the commit and apply the correct version release. Please see the following types with their respective meanings.

#### MAJOR

For a MAJOR release, you MUST follow this template. The use `BREAKING CHANGE:` in conjunction with any other commit type is required in order to push a major release.

```
perf(pencil): remove graphiteWidth option #80

BREAKING CHANGE: The graphiteWidth option has been removed.
The default graphite width of 10mm is always used for performance reasons.
```

#### MINOR
```
feat(pencil): add 'graphiteWidth' option #80
```

#### PATCH
```
fix(pencil): stop graphite breaking when too much pressure applied #80
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
$ build(postCss): update the build step to include postCSS #67

$ docs(install): address typo in install instructions #14

$ perf(api): restructure API to comply with new feature spec #12

$ feat(data api): add ability to consume large data as an array versus string #71

$ fix(color api): address color output issue #105
```

## Pull request service level agreement

Once a pull request has been created, the assigned reviewer will receive a notification.

Pull request response time depends on the scope of the pull request.

* If the work is solicited and there is an issue assigned to the work, the author of the pull request should expect to receive feedback within 24 hours.
* If the work is unsolicited, and/or is a new feature or refactor of a current feature, the author may expect to wait up to 72 hours for feedback as this will take additional resources to understand the scope of the update.

The reviewer has the option to leave comments, ask questions and reject the pull request if warranted.

Once a reviewer has approved the work, the pull request can then be merged into the main branch.
