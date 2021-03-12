# Auro Design System Contributing Guidelines

Please take a moment to review this document in order to make the contribution process easy and effective for everyone involved.

## Feature Requests

Feature requests stem from a business need. Also be sure to find out whether your idea fits with the scope and aims of the project or if this serves to address a personal/local need. It is up to you to make a strong case to convince the project's managers of the merits of this feature. Please provide as much detail and context as possible.

## Reporting Bugs

A bug is defined by: "A demonstrable problem that is caused by a file in the repository." Good bug reports are extremely helpful - thank you!

Guidelines for bug reports:

1. Search the [board](https://github.com/orgs/AlaskaAirlines/projects/1?card_filter_query=label%3A%22type%3A+bug%22) to see if the issue has already been reported
1. Check if the issue has been fixed — try to reproduce it using the latest master or development branch in the repository
1. Isolate the problem — ideally create a specific test case and a live example

A good bug report shouldn't leave others needing to contact you for more information. Please try to be as detailed as possible in your report. What is your environment? What steps will reproduce the issue? What browser(s) and OS experience the problem? What would you expect to be the outcome? All these details will help people to fix any potential bugs.

Poor bug reports will be closed as the team is unable to reproduce the issue.

## Submitting pull requests

Only project team members have direct access to the repository. For all pull requests, please fork the project to your own Github account. See [Maintaining your fork's upstream relationship](https://auro.alaskaair.com/contributing/upstream) for tips on keeping your fork up to date with the upstream repo.

**All** new work to be considered for merging with the `Main` branch should be in response to either a bug or a new business requirement.

Using a pull request to illustrate a new idea or direction is welcome, but there are no guarantees about merging. 

### Feature branch naming

The name of the feature branch should be descriptive as to the nature of the work and please include any references to the story or bug work item ID.

### Rebase on main

It is the preference of Auro to [rebase branches off of an updated main versus merging down](https://www.atlassian.com/git/tutorials/merging-vs-rebasing) to maintain a flat history.

If you have access to the repo

```
$ git checkout main
$ git pull
$ git checkout [feature branch]
$ git rebase main
```

If you are working off a forked branch, please see [Maintaining your fork's upstream relationship](https://auro.alaskaair.com/contributing/upstream) to sync your main branch and then follow the outlined steps.

### Conventional Commits

This project utilizes [Conventional Commits](https://www.conventionalcommits.org/) to auto-generate release versions, based on the [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines).


```
<type>[optional scope]: <description>
```

All commit messages must be prefixed with a specific type so that the semver release configuration can analyze the commit and apply the correct version release. Please see the following types with their respective meanings.

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

#### Git commit messages

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
$ build: update to build step to include postCSS

$ docs: address issue #14, typo in install instructions

$ perf: restructure API to comply with new feature spec

$ feat: add ability to consume large data as an array versus string

$ fix: address issue #57 in regards to color output
```

### Submit pull request

One you have committed your feature branch, be sure to push your updates to the Github repository. Depending on your IDE or CLI configuration this may be a manual or automatic step.

On the pull request page, the new pull request should be `[your-new-branch] into [main]`

Please be sure to follow the **Pull Request template** that appears in the comment window.

You must select a reviewer from the team to review your pull request.

Finally, click the `Create` button.

## Pull request service level agreement 

Once a pull request has been created, the assigned reviewer will receive a notification. 

Pull request response time depends on the scope of the pull request. 

* If the work is solicited and there is an issue assigned to the work, the author of the pull request should expect to receive feedback within 24 hours. 
* If the work is unsolicited, and/or is a new feature or refactor of a current feature, the author may expect to wait up to 72 hours for feedback as this will take additional resources to understand the scope of the update.  

The reviewer has the option to leave comments, ask questions and reject the pull request if warranted.

Once a reviewer has approved the work, the pull request can then be merged into the main branch.
