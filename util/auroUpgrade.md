# Auro upgrade shell script

Install this BASH shell script to easily upgrade an existing Auro custom element to a new repository based on a current build. This process does not upgrade an existing repository, but migrate the necessary files from a legacy local repo to a newly created repo.

## Install

To install the script, run the following command

```
curl https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/util/auroUpgrade.sh -o ~/.auroUpgrade.sh
```

Then add the following line to your `.bash_profile` or `.bashrc` file.

```
source ~/.auroUpgrade.sh
```

Once installed, open a new shell and run the commands.

## Generate a new repo

**Dependency**: This process has a dependency on the [WC-Generator](http://auro.alaskaair.com/generator).

```
$ npm i @alaskaairux/wc-generator@latest -g
```

First step to perform a migration upgrade is to create a new repository from the Auro WC-Generator. The following command will generate a new repo, ignoring the install and build steps. This will simply create a new repository with all the assets needed. Remember, do not use `auro` in the name. Just simply enter the name, e.g. `card` or `toggle`.

```
$ generaterepo [element name]
```

If you are to create the new element repo in the same root as the legacy element, it is recommended that you rename the legacy repo as not to cause a collision. The newly generated repo will assume the `auro-` namespace.

## Migrate the files

Once the newly generated repo is ready, run the `auroupgrade` function. This function takes up to three arguments in this order.

1. Path to the legacy directory { String }
1. Path to the newly created directory { String }
1. `no-demo` flag { Boolean }

For example. If you were planning to migrate from a legacy version of the `auro-flight`. Assuming that both repos are in the same root directory and the legacy repo is named `flight` and the new repo is named `auro-flight`, the command would be the following:

```
$ auroupgrade flight auro-flight
```

If you do not intend to migrate the `./demo` directory, add the `no-demo` flag, e.g.

```
$ auroupgrade flight auro-flight no-demo
```

## Review and test the migration

Once the migration is complete, `$ cd` into the newly created repository and run `$ npm i` as this was not addressed with the initial repo creation. Also, be sure to review the following steps:

1. `$ git status` be sure to evaluate all the changed files, especially the `./package.json`. This file will be the one created with the new repo, not the legacy one. If there were customizations made in the legacy repo, this will need to be migrated by hand.
1. Multiple CDN deliverables. If the legacy repo had multiple CDN deliverables, this will appear as an edit to the `./rollup.config.js` file. Again, if there are alterations, these will need to be manually addressed.
1. Run `$ git log --date=local --abbrev-commit --graph`. This should contain the full history from the legacy repo

At this point, this repo will have all the Git history as the legacy repo and you should be able to publish a new feature brach as a pull request to the element's Github repo.
