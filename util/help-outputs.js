const chalk = require('chalk');

const generate = `
    ${chalk.gray('Usage:')}

    ${chalk.bold('wc-generator')} [options]

    ${chalk.gray('Description:')}

    Generate an Auros Web Component from template.

    ${chalk.gray('Options:')}

    -h, --help                      Get help info about WC generator
    -t, --test                      Test repo generation without installing dependencies
    -n, --name [name]               Name of the web component you wish to build
    -N, --namespace [namespace]     Choose custom namespace of the web component if other than Auro
    -P, --npm [npm]                 Choose npm namespace
    -d, --dir [directory]           Directory where the new custom element files will be created
    -v, --version                   Ouput the version number
    --verbose                       Verbose command line feedback
`;

module.exports = { generate };
