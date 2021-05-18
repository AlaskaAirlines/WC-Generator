const chalk = require('chalk');
const pjson = require('../package.json');

const generate = `
    ${chalk.gray('Usage:')}
    ${chalk.bold('wc-generator [options]')}

    ${chalk.gray('Example:')}
    ${chalk.bold('wc-generator --name auro-dialog')}

    ${chalk.gray('Description:')}
    Generate a new Auro Web Component from template.

    ${chalk.gray('More help:')}
    For more help with building an Auro Web Component,
    be sure to see ${chalk.blue('https://bit.ly/3cqTsp5')}

    ${chalk.gray('Installed version:')}
    ${pjson.version}

    ${chalk.gray('Upgrade to latest version:')}
    $ npm i @alaskaairux/wc-generator@latest -g

    ${chalk.gray('Options:')}

    -h, --help                Get help info about WC generator
    -t, --test                Test repo generation without installing dependencies
    -n, --name [name]         Name of the web component to build, must follow format [namespace]-[name]
    -P, --npm [npm]           Choose npm namespace
    -d, --dir [directory]     Directory where the new custom element will be created
    --verbose                 Verbose command line feedback
`;

module.exports = { generate };
