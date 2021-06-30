# Auro migrate shell script

Install this BASH shell script to easily migrate an existing Auro custom element to a new repository based on a current build. This process does not upgrade an existing repository, but migrates the necessary files from a legacy repo to a newly created repo.

## Install

To install the script, run the following command:

```
curl https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/util/auroMigrate.sh -o ~/.auroMigrate.sh
```

Even if you have installed this before, it's good to reinstall to ensure you have the latest version.

The next step is to add a reference to this file in either your `~/.bash_profile` or `~/.bashrc` file.

```
echo -e "\n\n# Auro repo migration tool\nsource ~/.auroMigrate.sh" >> ~/.bash_profile

or

echo -e "\n\n# Auro repo migration tool\nsource ~/.auroMigrate.sh" >> ~/.bashrc
```

## Install generator dependency

**Dependency**: This process has a dependency on the [WC-Generator](http://auro.alaskaair.com/generator). Installed or not, running this command will at least ensure that you have the latest version of the generator.

```
$ npm i @aurodesignsystem/wc-generator@latest -g
```

Having gone through the install steps, it's **important** to either **open a new terminal window** or **re-source the one you are using**. Depending on your configuration, BASH may or may not be aware of the new commands from the WC-Generator or the migration script.

```
$ source ~/.bash_profile

or

$ source ~/.bashrc
```

## Generate a new repo

First step to performing the migration is to create a new repository from the Auro WC-Generator. The following command will generate a new repo, ignoring the npm install and build steps. See the [WC-Generator API](/getting-started/developers/generator/generator/api) for more information.

If you are creating a new element repo in the same directory as the legacy repo, it is recommended that you **rename the legacy repo** BEFORE you run the generator as not to cause a collision.

Use the optional namespace argument if you do not want `@aurodesignsystem`. Use this option with `@aurolabs` if you are migrating an auroLabs repo.

```
$ generateRepo [element-name] [optional npm namespace]
```

## What to expect

When running the migration, the tool will address the following steps:

1. Migrate the ./.git, ./src, ./test, and ./demo directories from the legacy repo to the new repo
1. The ./CHANGELOG.md will be copied over as well
1. The tool will change directories into the newly created repo and...
  * if the legacy repo used a `master` branch, this will be renamed to `main`
  * a new `upgradeRepo` branch will be created for all the changes
  * the changes will be committed to the new `upgradeRepo` branch

Once this is complete there will be an instruction about amending the previous commit if there are any subsequent changes from the migration.

## Migrate the files

To start the migration, run the `auroMigrate` function.

```
auroMigrate [legacy repo] [new repo] [--no-demo]
```

This function takes up to three arguments in this order:

1. Path to the legacy directory `{ String }`
1. Path to the newly created directory `{ String }`
1. `--no-demo` flag `{ Boolean }`

### DIrectory path support

For obvious reasons, you cannot have two directories named the same. The migration command accepts any directory path, e.g. if the newly created repo was in a sub-directory from where the legacy repo is, the command could be the following:

```
$ auroMigrate auro-flight migration/auro-flight
```

Or if the new repo was outside the current directory:

```
$ auroMigrate auro-flight ../auro-flight
```

If the repos are in the same directory, again using auro-flight as an example, ensure that the directory names do not clash. The command may be like the following:

```
$ auroMigrate flight auro-flight
```

### Migrating the demo

If the repo you are migrating from does not have a modern markdown demo in the `./demo` directory, please add the `--no-demo` flag.

```
$ auroMigrate auroMigrate auro-flight migration/auro-flight --no-demo
```

## Review and test the migration

Once the migration is complete, you will be in the **newly created repository**. Run `$ npm i`. The install was not addressed with the initial repo creation step. Be sure to review the following:

1. Be sure to evaluate all the changed files, especially the `./package.json`. This file will be the one created with the new repo, not the legacy one. If there were customizations made in the legacy repo, this will need to be manually migrated.
1. No need to update the `"version": "0.0.0",` line. This will be addressed with the first publish of the new repo.
1. If the legacy repo had multiple CDN deliverables, if there were alterations, these will need to be manually migrated.
1. Run `$ git log --date=local --abbrev-commit --graph`. This should contain the full history from the legacy repo.

If the remote repo is still using a `master` branch, you will need to push the `main` and the `upgradeRepo` branches before you make the PR. The legacy `master` branch is to be deleted.

At this point you should be able to create a pull request to the element's Github repo for review.
