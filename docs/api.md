# Auro WC-Generator API

| variable | required | description |
|----|----|----|
| -h, --help | no | Get help info about WC generator |
| -t, --test | no | Test repo generation without installing dependencies |
| -n, --name | yes | Name of the web component you wish to build. `auro` is assumed, so only the proper name, e.g. `button` or `checkbox` |
| -N, --namespace | no | Choose custom namespace of the web component if other than Auro |
| -P, --npm | no | Choose npm namespace if other than `@alaskaairux` |
| -d, --dir | no | Directory where the new custom element files will be created. If a directory is not provided, one using the `--name` variable will be created |
| -v, --version | no | Ouput the version number |
| --verbose | no | Verbose command line feedback |
