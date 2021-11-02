---
name: Release candidate
about: Organize all issues for a release candidate
title: '[namespace]-[name]: [vX.X-rc]'
labels: release
assignees: braven112
---

The following items are to be included with the next feature release of the `[namespace]-[name]`, all PRs are to be from the feature branch to `vX.X-rc` branch.

### Groups

>- [ ] #ticketnumber

>- [ ] #ticketnumber

>- [ ] #ticketnumber

## Prepare for the RC work

I. On the `main` branch, be sure to update the `pull_request:` reference that will get checked when PRs are created.

`./.github/workflows/testPublish.yml`

```json
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main, v3.10-rc ]
```

II. Add branch rules for new RC branch.

**Important!** Add all new branch references BEFORE the `main` branch reference.

```json
branches:
  - name: v3.10-rc
    # https://developer.github.com/v3/repos/branches/#update-branch-protection
    # Branch Protection settings. Set to null to disable
    protection:
      # Required. Require at least one approving review on a pull request, before merging. Set to null to disable.
      required_pull_request_reviews:
        # The number of approvals required. (1-6)
        required_approving_review_count: 1
        # Dismiss approved reviews automatically when a new commit is pushed.
        dismiss_stale_reviews: true
        # Blocks merge until code owners have reviewed.
        require_code_owner_reviews: true
        # Specify which users and teams can dismiss pull request reviews. Pass an empty dismissal_restrictions object to disable. User and team dismissal_restrictions are only available for organization-owned repositories. Omit this parameter for personal repositories.
        dismissal_restrictions:
          users: ["blackfalcon"]
      # Required. Require status checks to pass before merging. Set to null to disable
      required_status_checks:
        # Required. Require branches to be up to date before merging.
        strict: true
        # Required. The list of status checks to require in order to merge into this branch.
        contexts: ["test (14.x)", "test (15.x)", "license/cla"]
      # Required. Enforce all configured restrictions for administrators. Set to true to enforce required status checks for repository administrators. Set to null to disable.
      enforce_admins: false
      # Required. Restrict who can push to this branch. Team and user restrictions are only available for organization-owned repositories. Set to null to disable.
      restrictions: null
      # Prevent merge commits from being pushed to matching branches.
      required_linear_history: true
      # Permits force pushes to the protected branch by anyone with write access to the repository.
      allow_force_pushes: true
  - name: main
    # https://developer.github.com/v3/repos/branches/#update-branch-protection
    # Branch Protection settings. Set to null to disable
    protection:
    ...
```

III. When all work is complete with the release candidate branch, as a last commit to the release candidate branch, remove the references to the RC.

See [this commit](https://github.com/AlaskaAirlines/auro-input/commit/7e0e1ced11ba4caebf9b32c1fb95240ba661139a) from the v2.0 RC of auro-input.
