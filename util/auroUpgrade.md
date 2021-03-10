# Auro upgrade shell script

Located in `./util/auroUpgrade.sh` is a BASH shell script to be used for the purposes of easily upgrading an existing Auro custom element to a new repository based on a current build.

## Build a new repo

First step to perform a migration upgrade is to create a new repository from the Auro WC-Generator. Using the following command will generate a new repo and not perform the install and build steps. This will simply create a new repository with all the assets needed. Remember, do not use `auro` in the name. Just simply enter the name, e.g. `card` or `toggle`.

```
$ newgenerate [element name]
```

If you are to create the new element repo in the same root as the legacy element, it is recommended that you rename the legacy repo as not to cause a collision. The newly generated repo will assume the `auro-` namespace.

# Migrate the files

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

## Install

To install the script, run the following command

```
curl https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/util/auroupgrade.sh -o ~/.auroUpgrade.sh
```

Then add the following line to your `.bash_profile` or `.bashrc` file.

```
source ~/.auroUpgrade.sh
```

Once installed, open a new shell and run the commands.
