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
const inquirer = require('inquirer');
let npm = '';
let labs = false;

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
    '--migrate-help': Boolean,
    '--version': Boolean,
    '--test': Boolean,
    '--name': String,
    '--npm': String,
    '--dir': String,
    '--verbose': Boolean,
    // Aliases
    '-h': '--help',
    '-m': '--migrate-help',
    '-v': '--version',
    '-t': '--test',
    '-n': '--name',
    '-P': '--npm',
    '-d': '--dir',
  });

  if (args['--help']) {
    log(require('../util/help-outputs').generate);
    process.exit(0);
  }

  if (args['--migrate-help']) {
    log(require('../util/migrate-outputs').generate);
    process.exit(0);
  }

  if (args['--version']) {
    log(require('../util/version-outputs').generate);
    process.exit(0);
  }

  const nameErrorMessage = `'${args[`--name`]}' does not follow the correct name format.\nPlease include a single '-'; [namespace]-[element name]\n`

  // if ends with "-" or has too many, stop process.
  if (args[`--name`].endsWith("-") || args[`--name`].includes(" ")) {
    console.log(nameErrorMessage)
    process.exit(0);
  } else if ((args[`--name`].match(new RegExp("-", "g")) || []).length > 1) {
    console.log(nameErrorMessage)
    process.exit(0);
  }

  // check to see if there is one hyphen in the name
  const correctNameFormat = (args[`--name`].match(new RegExp("-", "g")) || []).length === 1;

  if (!correctNameFormat) {
    console.log(nameErrorMessage)
    process.exit(0);
  }

  npm = args['--npm'] || '@aurodesignsystem';
  const test = args['--test'];
  const name = args['--name'].split('-')[1];
  const namespace = args['--name'].split('-')[0];
  const dir = path.resolve(
    args['--dir'] || `./${lowerKebabCase(namespace)}-${lowerKebabCase(name)}`
  );

  return {
    name,
    namespace,
    npm,
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

const formatTemplateFileContents = (replacements, content) => {
  // replace all instances of [name], [Name], [namespace] and [Namespace] accordingly
  let result = content;
  for (let i = 0; i < replacements.length; i++) {
    const { regex, value } = replacements[i];
    result = result.replace(regex, value);
  }
  return result;
};

const copyFile = async (sourcePath, targetPath, params, replacements, fileRenames = {}) => {

  const stats = await fsPromises.stat(sourcePath);
  if (stats.isDirectory()) {
    await makeFolder(targetPath);
    await copyAllFiles(sourcePath, targetPath, params, fileRenames);
  } else if (stats.isFile()) {
    const templateFileContents = await fsPromises.readFile(sourcePath, {
      encoding: 'utf8',
    });
    const formattedTemplateFileContents = formatTemplateFileContents(
      replacements,
      templateFileContents
    );
    await fsPromises.writeFile(targetPath, formattedTemplateFileContents, {
      encoding: 'utf8',
    });

    if (params.verbose) {
      log(`${chalk.green('Copied')}: ${sourcePath} -> ${targetPath}`);
    }
  }
};

// function will replace the settings.yml if the project is auroLabs
const labsOverride__Settings = async (targetPath) => {
  if (labs) {
    fs.copyFile(`${targetPath}/.github/settings__labs.yml`, `${targetPath}/.github/settings.yml`, (err) => {
      if (err) {
        console.log("Error Found:", err);
        process.exit(0);
      }
    });

    log(`${chalk.green('auroLabs settings applied to new repo.')}: ${targetPath}`);
  }

  try {
    fs.unlinkSync(`${targetPath}/.github/settings__labs.yml`)
  } catch(err) {
    console.error(err)
  }
}

const labsOverride__Readme = async (targetPath) => {
  if (labs) {
    fs.copyFile(`${targetPath}/README__labs.md`, `${targetPath}/README.md`, (err) => {
      if (err) {
        console.log("Error Found:", err);
        process.exit(0);
      }
    });

    log(`${chalk.green('auroLabs README applied to new repo.')}: ${targetPath}`);
  }

  try {
    fs.unlinkSync(`${targetPath}/README__labs.md`)
  } catch(err) {
    console.error(err)
  }
}

const getVersionData = async () => {
  const { devDependencies, dependencies, peerDependencies } = require('../template/package.json');

  const packageNames = new Set([...Object.keys(devDependencies), ...Object.keys(dependencies), ...Object.keys(peerDependencies)]);

  const versions = { };
  const latestVersion = require('latest-version');
  for (const name of packageNames) {
    versions[name] = await latestVersion(name);
  }

  return versions;
}

const question = async () => {
  const params = parseArgs();
  const pjson = require('../package.json');
  const latestVersion = require('latest-version');
  const latestPublishedVersion = await latestVersion('@aurodesignsystem/wc-generator');

  if (pjson.version === latestPublishedVersion) {
    if (!params.test) {
      const questions = [
        {
          type: 'confirm',
          name: 'auroLabs',
          message: 'Is this an AuroLabs project?',
          when: function (answers) {
            return !readDocs('auroLabs')(answers);
          },
        },
        {
          type: 'confirm',
          name: 'governance',
          message: 'Have you reviewed Auro\'s Contributing Guidelines?',
          when: function (answers) {
            return !readDocs('governance')(answers);
          },
        },
        {
          type: 'confirm',
          name: 'status',
          message: 'Have you reviewed the list of available components to ensure this is not a duplicate custom element?',
          when: function (answers) {
            return !readDocs('status')(answers);
          },
        },
        {
          type: 'confirm',
          name: 'cssConventions',
          message: 'Have you reviewed Auro\'s CSS conventions and how to apply CSS to custom elements?',
          when: function (answers) {
            return !readDocs('cssConventions')(answers);
          },
        },
      ];

      function readDocs(arg) {
        return function (answers) {
          return answers[arg];
        };
      }

      console.log(chalk.yellow(`Please review the following questions to ensure \nyou are fully aware of Auro\'s development support.\n`));

      inquirer.prompt(questions).then((answers) => {

        if (answers.auroLabs === true) {
          labs = true;
        }

        if (answers.governance === false) {
          console.log(`\nNot reviewed the Contributing Guidelines?\nPlease review ${chalk.underline.yellow(`https://auro.alaskaair.com/contributing`)} before submitting any new work\nto ensure that you will be in compliance with our expectations.\n`);
        }

        if (answers.status === false) {
          console.log(`\nPlease review ${chalk.underline.yellow(`https://auro.alaskaair.com/component-status`)} before starting a new project.\n`);
        }

        if (answers.cssConventions === false) {
          console.log(`\nNot familiar with Auro\'s CSS conventions?\nPlease review ${chalk.underline.yellow(`https://auro.alaskaair.com/webcorestylesheets/custom-element-css`)} before starting a new project.\n`);
        }

        if (answers.governance === true
            && answers.status === true
            && answers.cssConventions === true) {
          generateFromTemplate();
        }
      });
    } else {
      generateFromTemplate();
    }
  } else {
    log(chalk.red(`\nCurrently published WC-Generator: v${latestPublishedVersion} | Installed WC-Generator: v${pjson.version}\n`))
    log(chalk.red(`\nSorry, we have to stop you here.\nIt's been detected you have v${pjson.version} installed,\nand the latest version is v${latestPublishedVersion}. Please run the following:\n\nnpm i @aurodesignsystem/wc-generator@${latestPublishedVersion} -g\n\nfor the latest version.\n`))
  }
}

const escapeRegExp = (string) => string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&');
const getReplacements = async ({ name, namespace, npm }) => {
  const versionData = await getVersionData();
  const pjson = require('../package.json');

  const pkgReplacements = Object.keys(versionData).map(packageName => ({
    regex: new RegExp(`("${escapeRegExp(packageName)}": )""`, 'g'),
    value: `$1"^${versionData[packageName]}"`
  }));

  // name to lower-kebab-case (e.g. Text Input -> text-input)
  const lowerKebabCaseName = lowerKebabCase(name);
  // namespace to lower-kebab-case (e.g. Text Input -> text-input)
  const lowerKebabCaseNameSpace = lowerKebabCase(namespace);
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseName = upperCamelCase(name);
  // name to UpperCamelCase (e.g. text-input -> TextInput)
  const upperCamelCaseNameSpace = upperCamelCase(namespace);
  // gets git username from ./gitconfig
  const userName = require('git-user-name');
  // generate new year for copyright stamp
  const newYear = new Date().getFullYear();
  // Retrieve Node version defined in package.json
  const minNodeVersion = pjson.engines.node.replace(/[^0-9,.]+/g,'');

  if (labs) {
    npm = `@aurolabs`
  }

  const nameReplacements = [
    { regex: /\[genVersion\]/g, value: pjson.version },
    { regex: /\[genVersionDash\]/g, value: pjson.version.split('.').join("-") },
    { regex: /\[author\]/g, value: userName },
    { regex: /\[name\]/g, value: lowerKebabCaseName },
    { regex: /\[namespace\]/g, value: lowerKebabCaseNameSpace },
    { regex: /\[Namespace\]/g, value: upperCamelCaseNameSpace },
    { regex: /\[Name\]/g, value: upperCamelCaseName },
    { regex: /\[npm\]/g, value: npm },
    { regex: /\[year\]/g, value: newYear },
    { regex: /\[designTokens\]/g, value: versionData['@aurodesignsystem/design-tokens'] },
    { regex: /\[wcss\]/g, value: versionData['@aurodesignsystem/webcorestylesheets'] },
    { regex: /\[nodeVersion\]/g, value: minNodeVersion }
  ];

  return nameReplacements.concat(pkgReplacements);
}

const copyAllFiles = async (
  sourcePath,
  targetPath,
  params,
  fileRenames = {}
) => {
  const fileNames = await fsPromises.readdir(sourcePath);
  const fileCopyPromises = [];
  const replacements = await getReplacements(params);
  fileNames.forEach(fileName => {
    log(
      `${chalk.bold('Creating')}: ${targetPath}/${fileRenames[fileName] || fileName}`
    );
    fileCopyPromises.push(
      copyFile(
        `${sourcePath}/${fileName}`,
        `${targetPath}/${fileRenames[fileName] || fileName}`,
        params,
        replacements,
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

  // this test needs to be updated post first release of new '@aurodesignsystem/wc-generator'
  const legacyPublishedVersion = await latestVersion('@alaskaairux/wc-generator');
  const latestPublishedVersion = await latestVersion('@aurodesignsystem/wc-generator');
  log(chalk.green(`\nCurrently published WC-Generator: v${latestPublishedVersion} | Installed WC-Generator: v${pjson.version}\n`))

  const params = parseArgs();

  if(legacyPublishedVersion > pjson.version || latestPublishedVersion > pjson.version) {
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
    log(chalk.red(`\nSorry, we have to stop you here.\nIt's been detected you have v${pjson.version} installed,\nand the latest version is v${latestPublishedVersion}. Please run the following:\n\nnpm i @aurodesignsystem/wc-generator@${latestPublishedVersion} -g\n\nfor the latest version.\n`))
  }

  else {
    log(chalk.green(
      `
 _____ _         _          _____ _     _ _
|  _  | |___ ___| |_ ___   |  _  |_|___| |_|___ ___ ___
|     | | .'|_ -| '_| .'|  |     | |  _| | |   | -_|_ -|
|__|__|_|__,|___|_,_|__,|  |__|__|_|_| |_|_|_|_|___|___|


 _ _ _ _____    _____                     _
| | | |     |  |   __|___ ___ ___ ___ ___| |_ ___ ___
| | | |   --|  |  |  | -_|   | -_|  _| .'|  _| . |  _|
|_____|_____|  |_____|___|_|_|___|_| |__,|_| |___|_|


Creating Web Components People Love.
    `))

    await makeFolder(params.dir);
    await copyAllFiles(paths.self.template, params.dir, params, {
      '[namespace]-[name].test.js': `${lowerKebabCase(params.namespace)}-${lowerKebabCase(params.name)}.test.js`,
      '[namespace]-[name].js': `${lowerKebabCase(params.namespace)}-${lowerKebabCase(params.name)}.js`,
      '.npmignore.temp': '.npmignore',
      '.gitignore.temp': '.gitignore'
    });
    await labsOverride__Settings(params.dir);
    await labsOverride__Readme(params.dir);
    log(chalk.green('\nCopied all files!'));

    let areDependenciesInstalled = false;
    let isGitRepo = false;
    let isMainBranch = false;
    let isHuskyInstalled = false;
    let isHuskyConfigured = false;
    let isBuilt = false;
    let assetsAreCommitted = false;

    if (!params.test) {
      process.stdout.write(`\nSetting up Git`);
      loadingLoop(() => isGitRepo);
      try {
        await exec('git init && git add . && git commit -m "initial commit"', { cwd: params.dir });
        log(chalk.green('\nGit repo successfully created'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isGitRepo = true;

      process.stdout.write(`\nRenaming master to main`);
      loadingLoop(() => isMainBranch);
      try {
        await exec('git branch -m main', { cwd: params.dir });
        log(chalk.green('\nGit branch successfully renamed'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isMainBranch = true;

      process.stdout.write(`\nInstalling Husky scripts`);
      loadingLoop(() => isHuskyInstalled);
      try {
        await exec('npx husky-init', { cwd: params.dir });
        await exec('chmod ug+x .husky/*', { cwd: params.dir });
        await exec('chmod ug+x .git/hooks/*', { cwd: params.dir });
        log(chalk.green('\nHusky successfully installed!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isHuskyInstalled = true;

      process.stdout.write(`\nInstalling dependencies`);
      loadingLoop(() => areDependenciesInstalled);
      try {
        await exec('npm i', { cwd: params.dir });
        log(chalk.green('\nSuccessfully installed dependencies!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      areDependenciesInstalled = true;

      process.stdout.write(`\nRunning initial component build`);
      loadingLoop(() => isBuilt);
      try {
        await exec('npm run build', { cwd: params.dir });
        log(chalk.green('\nInitial build success!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isBuilt = true;

      process.stdout.write(`\nConfiguring Husky scripts`);
      loadingLoop(() => isHuskyConfigured);
      try {
        await exec('cat .husky/pre-commit.temp > .husky/pre-commit', { cwd: params.dir });
        await exec('rm .husky/pre-commit.temp', { cwd: params.dir });
        log(chalk.green('\nHusky successfully configured!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isHuskyConfigured = true;

      process.stdout.write(`\nCommitting generated resources`);
      loadingLoop(() => assetsAreCommitted);
      try {
        await exec('git add . && git commit -m "chore: add auto generated assets" --no-verify', { cwd: params.dir });
        log(chalk.green('\nGenerated assets are committed!\n'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      assetsAreCommitted = true;

      log(chalk.green(`Well done! The new HTML Custom Element auro-${params.name} has been created!\n\nDir: ${params.dir}\nBuilt using WC-Generator: v${pjson.version}\n`));

      log(chalk.yellow(`\nMore questions about Auro? Be sure to check out\n${chalk.underline.yellow(`https://auro.alaskaair.com/auro-support`)}\nfor more information and answers to frequently asked questions.\n`));

      if (labs) {
        log(chalk.yellow(`\nYou are building an element for AuroLabs! Awesome!\n\nBe sure to check out all the information we have to go\nfrom the minors to the majors with your new custom element!\n${chalk.underline.yellow(`https://auro.alaskaair.com/aurolabs`)}\n\n`));
      }
    }
  }
};

question();
