const chalk = require('chalk');
const pjson = require('../package.json');

const generate = `
  ${chalk.gray('Installed version:')}
  v${pjson.version}

  ${chalk.gray('Upgrade to latest version:')}
  $ npm i @aurodesignsystem/wc-generator@latest -g

  ${chalk.gray('More help:')}
  For more help with migrating an Auro Web Component,
  be sure to see ${chalk.blue(
    'https://auro.alaskaair.com/getting-started/developers/generator/upgrade',
  )}

  ${chalk.gray('Install script:')}
  $ curl https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/util/auroMigrate.sh -o ~/.auroMigrate.sh

  ${chalk.gray('Add a reference:')}
  Add a reference to this file in either your ${chalk.yellow(
    '~/.bash_profile',
  )} or ${chalk.yellow('~/.bashrc_profile')} file:

  $ echo -e "\\n\\n# Auro repo migration tool\\nsource ~/.auroMigrate.sh" >> ~/.bash_profile
  ${chalk.gray('or')}
  $ echo -e "\\n\\n# Auro repo migration tool\\nsource ~/.auroMigrate.sh" >> ~/.bashrc

  ${chalk.gray('Generate a new repo:')}
  $ generateRepo [element-name] [optional npm namespace]

  ${chalk.gray('Migrate the files:')}
  $ auroMigrate [legacy repo] [new repo] [--no-demo]
`;

module.exports = { generate };
