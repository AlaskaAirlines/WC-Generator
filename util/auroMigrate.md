# Auro migrate shell script

Install this BASH shell script to easily migrate an existing Auro custom element to a new repository based on a current build. This process does not upgrade an existing repository, but migrates the necessary files from a legacy repo to a newly created repo.

## Install

To install the script, run the following command

```
curl https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/util/auroMigrate.sh -o ~/.auroMigrate.sh
```

Then add the following line to your `.bash_profile` or `.bashrc` file.

```
source ~/.auroMigrate.sh
```

Once instillation is complete, the following steps are to generate a new repo and migrate the essential codes from one repo to the next.

## Install generator dependency

**Dependency**: This process has a dependency on the [WC-Generator](http://auro.alaskaair.com/generator).

```
$ npm i @alaskaairux/wc-generator@latest -g
```

Having gone through the install steps, it's **important** to either **open a new terminal window** or **re-source the one you are using**. Depending on your configuration, BASH may or may not be aware of the new commands from the WC-Generator or the migration script.


## Generate a new repo

First step to performing the migration is to create a new repository from the Auro WC-Generator. The following command will generate a new repo, ignoring the install and build steps. This will simply create a new repository with all the file assets needed.

**Do NOT** use `auro` in the name. Simply enter the name of the custom element, e.g. `card` or `toggle`. The generator assumes the `auro` namespace. See the [WC-Generator API](/getting-started/developers/generator/generator/api) for more information on how to alter the namespace if needed.

```
$ generaterepo [element-name]
```

Example, if you are creating the new element repo in the same directory as the legacy repo, it is recommended that you rename the legacy repo as not to cause a collision. **The newly generated repo will assume the `auro-` namespace.**

## Migrate the files

Once the newly generated repo is ready, run the `auroMigrate [legacy repo] [new repo]` function. This function takes up to three arguments in this order.

1. Path to the legacy directory `{ String }`
1. Path to the newly created directory `{ String }`
1. `no-demo` flag `{ Boolean }`

For example. If you were planning to migrate from a legacy version of the `auro-flight`, aAssuming that both repos are in the same root directory and the legacy repo is named `flight` and the new repo is named `auro-flight`, the command would be the following:

```
$ auroMigrate flight auro-flight
```

If you **do not** intend to migrate the `./demo` directory, add the `no-demo` flag.

```
$ auroMigrate flight auro-flight no-demo
```

## Review and test the migration

Once the migration is complete, `$ cd` into the **newly created repository** and run `$ npm i`. The install was not addressed with the initial repo creation step. Also, be sure to review the following:

1. `$ git status` be sure to evaluate all the changed files, especially the `./package.json`. This file will be the one created with the new repo, not the legacy one. If there were customizations made in the legacy repo, this will need to be manually migrated.
1. Multiple CDN deliverables. If the legacy repo had multiple CDN deliverables, this will appear as an edit to the `./rollup.config.js` file. Again, if there are alterations, these will need to be manually migrated.
1. Run `$ git log --date=local --abbrev-commit --graph`. This should contain the full history from the legacy repo.

At this point, it is assumed that you will have a bunch of changes to the `main` branch. Creating a new branch will move all these changes to a new feature branch where you can commit and push and create a new PR against the `main` branch in the remote repo. **Do not merge this migration into your local `main` branch**.

```bash
$ git status // see all changes
$ git checkout -b repo-migration // move all changes to new feature branch
$ git push origin repo-migration // push to remote
```

At this point you should be able to create a pull request to the element's Github repo for review.
