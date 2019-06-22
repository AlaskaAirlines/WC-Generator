#!/usr/bin/env node

'use strict';

// Throw an error on unhandled rejections (exit non-zero)
process.on('unhandledRejection', err => {
  throw err;
});

['SIGINT', 'SIGTERM'].forEach(function(sig) {
  process.on(sig, function() {
    process.exit();
  });
});

require('../util/verifyNodeVersion');

const fs = require('fs');
const fsPromises = fs.promises;
const exec = require('util').promisify(require('child_process').exec);
const arg = require('arg');
const chalk = require('chalk');
const path = require('path');
const paths = require('../util/paths');
const log = require('../util/log');

const lowerKebabCase = str => str.toLowerCase().replace(' ', '-');
const upperCamelCase = str =>
  lowerKebabCase(str)
    .split('-')
    .map(chunk => `${chunk.charAt(0).toUpperCase()}${chunk.slice(1)}`)
    .join('');

const parseArgs = () => {
  const args = arg({
    // Types
    '--help': Boolean,
    '--test': Boolean,
    '--version': Boolean,
    '--name': String,
    '--dir': String,
    '--verbose': Boolean,
    // Aliases
    '-h': '--help',
    '-v': '--version',
    '-n': '--name',
    '-d': '--dir',
  });

  if (args['--help']) {
    log(require('../util/help-outputs').generate);
    process.exit(0);
  }
  if (args['--version']) {
    log(require(paths.packageJson).version);
    process.exit(0);
  }

  const test = args['--test'];
  const name = args['--name'] || 'no-name-given';
  const dir = path.resolve(
    args['--dir'] || `./OrionStatelessComponents__ods-${lowerKebabCase(name)}`
  );

  return {
    name,
    test,
    dir,
    verbose: args['--verbose'],
  };
};

const makeFolder = async dir => {
  if (dir !== '.' && !fs.existsSync(dir)) {
    await fsPromises.mkdir(dir);
  }
};

const formatTemplateFileContents = (content, { name }) => {
  // name to lower-kebab-case (e.g. Text Input -> text-input)
  const lowerKebabCaseName = lowerKebabCase(name);
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseName = upperCamelCase(name);
  const replacements = [
    { regex: /\[name\]/g, value: lowerKebabCaseName },
    {
      regex: /\[Name\]/g,
      value: upperCamelCaseName,
    },
  ];

  // replace all instances of [name] and [Name] accordingly
  let result = content;
  for (let i = 0; i < replacements.length; i++) {
    const { regex, value } = replacements[i];
    result = result.replace(regex, value);
  }
  return result;
};

const copyFile = async (sourcePath, targetPath, params, fileRenames = {}) => {
  const stats = await fsPromises.stat(sourcePath);
  if (stats.isDirectory()) {
    await makeFolder(targetPath);
    await copyAllFiles(sourcePath, targetPath, params, fileRenames);
  } else if (stats.isFile()) {
    const templateFileContents = await fsPromises.readFile(sourcePath, {
      encoding: 'utf8',
    });
    const formattedTemplateFileContents = formatTemplateFileContents(
      templateFileContents,
      params
    );
    await fsPromises.writeFile(targetPath, formattedTemplateFileContents, {
      encoding: 'utf8',
    });

    if (params.verbose) {
      log(`${chalk.green('Copied')}: ${sourcePath} -> ${targetPath}`);
    }
  }
};

const copyAllFiles = async (
  sourcePath,
  targetPath,
  params,
  fileRenames = {}
) => {
  const fileNames = await fsPromises.readdir(sourcePath);
  const fileCopyPromises = [];
  fileNames.forEach(fileName => {
    log(
      `${chalk.bold('Creating')}: ${targetPath}/${fileRenames[fileName] || fileName}`
    );
    fileCopyPromises.push(
      copyFile(
        `${sourcePath}/${fileName}`,
        `${targetPath}/${fileRenames[fileName] || fileName}`,
        params,
        fileRenames
      )
    );
  });
  await Promise.all(fileCopyPromises);
};

const loadingLoop = condition => {
  if (condition()) return;
  process.stdout.write(' .');
  setTimeout(() => {
    loadingLoop(condition);
  }, 1000);
};

const generateFromTemplate = async () => {
  const pjson = require('../package.json');
  const latestVersion = require('latest-version');
  const latestPublishedVersion = await latestVersion('@alaskaairux/ods-wc-generator');
  log(chalk.green(latestPublishedVersion))
  const params = parseArgs();

  if(latestPublishedVersion > pjson.version) {
    log(chalk.red(`\n\nNNNNNNNN        NNNNNNNN                                                          !!! `));
    log(chalk.red(`N:::::::N       N::::::N                                                         !!:!! `));
    log(chalk.red(`N::::::::N      N::::::N                                                         !:::! `));
    log(chalk.red(`N:::::::::N     N::::::N                                                         !:::! `));
    log(chalk.red(`N::::::::::N    N::::::N   ooooooooooo   ppppp   ppppppppp       eeeeeeeeeeee    !:::! `));
    log(chalk.red(`N:::::::::::N   N::::::N oo:::::::::::oo p::::ppp:::::::::p    ee::::::::::::ee  !:::! `));
    log(chalk.red(`N:::::::N::::N  N::::::No:::::::::::::::op:::::::::::::::::p  e::::::eeeee:::::ee!:::! `));
    log(chalk.red(`N::::::N N::::N N::::::No:::::ooooo:::::opp::::::ppppp::::::pe::::::e     e:::::e!:::! `));
    log(chalk.red(`N::::::N  N::::N:::::::No::::o     o::::o p:::::p     p:::::pe:::::::eeeee::::::e!:::! `));
    log(chalk.red(`N::::::N   N:::::::::::No::::o     o::::o p:::::p     p:::::pe:::::::::::::::::e !:::! `));
    log(chalk.red(`N::::::N    N::::::::::No::::o     o::::o p:::::p     p:::::pe::::::eeeeeeeeeee  !!:!! `));
    log(chalk.red(`N::::::N     N:::::::::No::::o     o::::o p:::::p    p::::::pe:::::::e            !!!  `));
    log(chalk.red(`N::::::N      N::::::::No:::::ooooo:::::o p:::::ppppp:::::::pe::::::::e                `));
    log(chalk.red(`N::::::N       N:::::::No:::::::::::::::o p::::::::::::::::p  e::::::::eeeeeeee   !!!  `));
    log(chalk.red(`N::::::N        N::::::N oo:::::::::::oo  p::::::::::::::pp    ee:::::::::::::e  !!:!! `));
    log(chalk.red(`NNNNNNNN         NNNNNNN   ooooooooooo    p::::::pppppppp        eeeeeeeeeeeeee   !!!  `));
    log(chalk.red(`                                          p:::::p                                      `));
    log(chalk.red(`                                          p:::::p                                      `));
    log(chalk.red(`                                         p:::::::p                                     `));
    log(chalk.red(`                                         p:::::::p                                     `));
    log(chalk.red(`                                         p:::::::p                                     `));
    log(chalk.red(`                                         ppppppppp                                     \n\n`));
    log(chalk.red(`\nSorry, we have to stop you here.\nIt's been detected you have v${pjson.version} installed,\nand the latest version is v${latestPublishedVersion}. Please run the following:\n\nnpm i @alaskaairux/ods-wc-generator@${latestPublishedVersion} -g\n\nfor the latest version.\n`))
  }

  else {
    await makeFolder(params.dir);
    await copyAllFiles(paths.self.template, params.dir, params, {
      'ods-[name]_test.html': `ods-${lowerKebabCase(params.name)}_test.html`,
      'ods-[name].js': `ods-${lowerKebabCase(params.name)}.js`,
      'package.temp': 'package.json',
      '.npmignore.temp': '.npmignore',
      '.gitignore.temp': '.gitignore',
      '.travis.temp': '.travis.yml'
    });
    log(chalk.green('\nCopied all files!'));

    let areDependenciesInstalled = false;
    let isNodeSassRebuilt = false;

    if (!params.test) {
      process.stdout.write(`\nInstalling Dependencies`);
      loadingLoop(() => areDependenciesInstalled);
      try {
        await exec('npm i', { cwd: params.dir });
        log(chalk.green('\nSuccesfully installed dependencies!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      areDependenciesInstalled = true;

      process.stdout.write(`\nRebuilding node-sass`);
      loadingLoop(() => isNodeSassRebuilt);
      try {
        await exec('npm rebuild node-sass', { cwd: params.dir });
        log(chalk.green('\nSuccesfully rebuilt node-sass!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isNodeSassRebuilt = true;

      log('\n')
      log('         .         . ')
      log('               *       *')
      log('')
      log('                 * * *')
      log('                    !')
      log('               *       * ')
      log('')
      log(" ██████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗")
      log("██╔═══██╗██╔══██╗██║██╔═══██╗████╗  ██║")
      log("██║   ██║██████╔╝██║██║   ██║██╔██╗ ██║")
      log("██║   ██║██╔══██╗██║██║   ██║██║╚██╗██║")
      log("╚██████╔╝██║  ██║██║╚██████╔╝██║ ╚████║")
      log(" ╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝")
      log('')
      log("██████╗ ███████╗███████╗██╗ ██████╗ ███╗   ██╗")
      log("██╔══██╗██╔════╝██╔════╝██║██╔════╝ ████╗  ██║")
      log("██║  ██║█████╗  ███████╗██║██║  ███╗██╔██╗ ██║")
      log("██║  ██║██╔══╝  ╚════██║██║██║   ██║██║╚██╗██║")
      log("██████╔╝███████╗███████║██║╚██████╔╝██║ ╚████║")
      log("╚═════╝ ╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝")
      log('')
      log("███████╗██╗   ██╗███████╗████████╗███████╗███╗   ███╗")
      log("██╔════╝╚██╗ ██╔╝██╔════╝╚══██╔══╝██╔════╝████╗ ████║")
      log("███████╗ ╚████╔╝ ███████╗   ██║   █████╗  ██╔████╔██║")
      log("╚════██║  ╚██╔╝  ╚════██║   ██║   ██╔══╝  ██║╚██╔╝██║")
      log("███████║   ██║   ███████║   ██║   ███████╗██║ ╚═╝ ██║")
      log("╚══════╝   ╚═╝   ╚══════╝   ╚═╝   ╚══════╝╚═╝     ╚═╝")
      log('\n')
      log(chalk.green(`Well done! The new HTML Custom Element ods-${params.name} has been created!
        \nDir: ${params.dir}
        \nODS-WC: v${pjson.version}
      \n`));
    }
  }
};


generateFromTemplate();
