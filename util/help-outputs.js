const chalk = require('chalk');

const generate = `
    ${chalk.gray('Usage:')}

    ${chalk.bold('wc-generator')} [options]

    ${chalk.gray('Description:')}

    Generate an Auros Web Component from template.

    ${chalk.gray('Options:')}

    -n, --name <name>           Set the component name (e.g. auro-input)
    -d, --dir <directory>       Set the directory to output generated files to
    -h, --help                  Output usage information
    -v, --version               Ouput the version number
`;

module.exports = { generate };
