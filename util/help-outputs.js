const chalk = require('chalk');

const generate = `
    ${chalk.gray('Usage:')}
    ${chalk.bold('wc-generator [options]')}

    ${chalk.gray('Example:')}
    ${chalk.bold('wc-generator --name dialog')}

    ${chalk.gray('Description:')}
    Generate a new Auro Web Component from template.

    ${chalk.gray('More help:')}
    For more help with building an Auro Web Component,
    be sure to see ${chalk.blue('https://bit.ly/3cqTsp5')}

    ${chalk.gray('Options:')}

    -h, --help                      Get help info about WC generator
    -t, --test                      Test repo generation without installing dependencies
    -n, --name [name]               Name of the web component you wish to build, must follow format [namespace]-[name]
    -P, --npm [npm]                 Choose npm namespace
    -d, --dir [directory]           Directory where the new custom element files will be created
    --verbose                       Verbose command line feedback
`;

module.exports = { generate };
