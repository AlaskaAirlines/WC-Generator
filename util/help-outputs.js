const chalk = require('chalk');

const generate = `
    ${chalk.gray('Usage:')}

    ${chalk.bold('ods-wc-generator')} [options]

    ${chalk.gray('Description:')}

    Generate an ODS Stateless Web Component from a boilerplate.

    ${chalk.gray('Options:')}

    -n, --name <name>           Set the component name (e.g. text-input)
    -d, --dir <directory>       Set the directory to output generated files to
    -h, --help                  Output usage information
    -v, --version               Ouput the version number
`;

module.exports = { generate };
