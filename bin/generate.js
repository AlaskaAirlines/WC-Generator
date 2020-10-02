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
    '--name': String,
    '--namespace': String,
    '--npm': String,
    '--dir': String,
    '--verbose': Boolean,
    // Aliases
    '-h': '--help',
    '-t': '--test',
    '-n': '--name',
    '-N': '--namespace',
    '-P': '--npm',
    '-d': '--dir',
  });

  if (args['--help']) {
    log(require('../util/help-outputs').generate);
    process.exit(0);
  }
  if (args['--version']) {
    process.exit(0);
  }

  const test = args['--test'];
  const name = args['--name'] || 'component';
  const npm = args['--npm'] || '@alaskaairux';
  const namespace = args['--namespace'] || 'auro';
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

const getVersionData = async () => {
  const latestVersion = require('latest-version');
  let versions =  {};

  versions['designTokens'] = await latestVersion('@alaskaairux/orion-design-tokens');
  versions['wcss'] = await latestVersion('@alaskaairux/orion-web-core-style-sheets');
  versions['icons'] = await latestVersion('@alaskaairux/icons');
  versions['focusVisible'] = await latestVersion('focus-visible');
  versions['webcomponentsjs'] = await latestVersion('@webcomponents/webcomponentsjs');
  versions['litElement'] = await latestVersion('lit-element');
  versions['bableCore'] = await latestVersion('@babel/core');
  versions['bableLoader'] = await latestVersion('babel-loader');
  versions['bableSyntaxDynamicImport'] = await latestVersion('@babel/plugin-syntax-dynamic-import');
  versions['bableTransRuntime'] = await latestVersion('@babel/plugin-transform-runtime');
  versions['bablePreset'] = await latestVersion('@babel/preset-env');
  versions['bableRuntime'] = await latestVersion('@babel/runtime');
  versions['compression'] = await latestVersion('compression');
  versions['commitlintCli'] = await latestVersion('@commitlint/cli');
  versions['commitlintConfig'] = await latestVersion('@commitlint/config-conventional');
  versions['openwcTesting'] = await latestVersion('@open-wc/testing');
  versions['openwcKarma'] = await latestVersion('@open-wc/testing-karma');
  versions['srChangelog'] = await latestVersion('@semantic-release/changelog');
  versions['srGit'] = await latestVersion('@semantic-release/git');
  versions['srNpm'] = await latestVersion('@semantic-release/npm');
  versions['autoprefixer'] = await latestVersion('autoprefixer');
  versions['chalk'] = await latestVersion('chalk');
  versions['concat'] = await latestVersion('concat');
  versions['copyfiles'] = await latestVersion('copyfiles');
  versions['copyWebpackPlugin'] = await latestVersion('copy-webpack-plugin');
  versions['coreJs'] = await latestVersion('core-js');
  versions['eslint'] = await latestVersion('eslint');
  versions['eslintLit'] = await latestVersion('eslint-plugin-lit');
  versions['husky'] = await latestVersion('husky');
  versions['lodash'] = await latestVersion('lodash');
  versions['marked'] = await latestVersion('marked');
  versions['nodemon'] = await latestVersion('nodemon');
  versions['npmRunAll'] = await latestVersion('npm-run-all');
  versions['parcelBundler'] = await latestVersion('parcel-bundler');
  versions['parcelCompress'] = await latestVersion('parcel-plugin-compress');
  versions['postcss'] = await latestVersion('postcss');
  versions['postcssCustomProperties'] = await latestVersion('postcss-custom-properties');
  versions['postcssDiscardComments'] = await latestVersion('postcss-discard-comments');
  versions['postcssRemoveRules'] = await latestVersion('postcss-remove-rules');
  versions['postcssSelectorReplace'] = await latestVersion('postcss-selector-replace');
  versions['sr'] = await latestVersion('semantic-release');
  versions['sinon'] = await latestVersion('sinon');
  versions['stylelint'] = await latestVersion('stylelint');
  versions['stylelintConfig'] = await latestVersion('stylelint-config-standard');
  versions['wcSassRender'] = await latestVersion('wc-sass-render');
  versions['wca'] = await latestVersion('web-component-analyzer');
  versions['webpack'] = await latestVersion('webpack');
  versions['webpackBundleAnalyzer'] = await latestVersion('webpack-bundle-analyzer');
  versions['webpackMerge'] = await latestVersion('webpack-merge');
  versions['webpackCli'] = await latestVersion('webpack-cli');
  versions['webpackDevServer'] = await latestVersion('webpack-dev-server');
  versions['yamlLint'] = await latestVersion('yaml-lint');

  return versions;
}

const formatTemplateFileContents = (data, content, { name, namespace, npm }) => {
  const pkgReplacements = [
    { regex: /\[designTokens\]/g, value: data.designTokens },
    { regex: /\[wcss\]/g, value: data.wcss },
    { regex: /\[icons\]/g, value: data.icons },
    { regex: /\[focusVisible\]/g, value: data.focusVisible },
    { regex: /\[webcomponentsjs\]/g, value: data.webcomponentsjs },
    { regex: /\[litElement\]/g, value: data.litElement },
    { regex: /\[bableCore\]/g, value: data.bableCore },
    { regex: /\[bableLoader\]/g, value: data.bableLoader },
    { regex: /\[bableSyntaxDynamicImport\]/g, value: data.bableSyntaxDynamicImport },
    { regex: /\[bableTransRuntime\]/g, value: data.bableTransRuntime },
    { regex: /\[bablePreset\]/g, value: data.bablePreset },
    { regex: /\[bableRuntime\]/g, value: data.bableRuntime },
    { regex: /\[compression\]/g, value: data.compression },
    { regex: /\[chalk\]/g, value: data.chalk },
    { regex: /\[commitlintCli\]/g, value: data.commitlintCli },
    { regex: /\[commitlintConfig\]/g, value: data.commitlintConfig },
    { regex: /\[openwcTesting\]/g, value: data.openwcTesting },
    { regex: /\[openwcKarma\]/g, value: data.openwcKarma },
    { regex: /\[srChangelog\]/g, value: data.srChangelog },
    { regex: /\[srGit\]/g, value: data.srGit },
    { regex: /\[srNpm\]/g, value: data.srNpm },
    { regex: /\[autoprefixer\]/g, value: data.autoprefixer },
    { regex: /\[concat\]/g, value: data.concat },
    { regex: /\[copyfiles\]/g, value: data.copyfiles },
    { regex: /\[copyWebpackPlugin\]/g, value: data.copyWebpackPlugin },
    { regex: /\[coreJs\]/g, value: data.coreJs },
    { regex: /\[eslint\]/g, value: data.eslint },
    { regex: /\[eslintLit\]/g, value: data.eslintLit },
    { regex: /\[husky\]/g, value: data.husky },
    { regex: /\[lodash\]/g, value: data.lodash },
    { regex: /\[marked\]/g, value: data.marked },
    { regex: /\[nodemon\]/g, value: data.nodemon },
    { regex: /\[npmRunAll\]/g, value: data.npmRunAll },
    { regex: /\[parcelBundler\]/g, value: data.parcelBundler },
    { regex: /\[parcelCompress\]/g, value: data.parcelCompress },
    { regex: /\[postcss\]/g, value: data.postcss },
    { regex: /\[postcssCustomProperties\]/g, value: data.postcssCustomProperties },
    { regex: /\[postcssDiscardComments\]/g, value: data.postcssDiscardComments },
    { regex: /\[postcssRemoveRules\]/g, value: data.postcssRemoveRules },
    { regex: /\[postcssSelectorReplace\]/g, value: data.postcssSelectorReplace },
    { regex: /\[sr\]/g, value: data.sr },
    { regex: /\[sinon\]/g, value: data.sinon },
    { regex: /\[stylelint\]/g, value: data.stylelint },
    { regex: /\[stylelintConfig\]/g, value: data.stylelintConfig },
    { regex: /\[wcSassRender\]/g, value: data.wcSassRender },
    { regex: /\[wca\]/g, value: data.wca },
    { regex: /\[webpackMerge\]/g, value: data.webpackMerge },
    { regex: /\[webpack\]/g, value: data.webpack },
    { regex: /\[webpackDevServer\]/g, value: data.webpackDevServer },
    { regex: /\[webpackCli\]/g, value: data.webpackCli },
    { regex: /\[webpackBundleAnalyzer\]/g, value: data.webpackBundleAnalyzer },
    { regex: /\[yamlLint\]/g, value: data.yamlLint }
  ];

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

  const webPackName = '[name].js';

  const nameReplacements = [
    { regex: /\[author\]/g, value: userName },
    { regex: /\[name\]/g, value: lowerKebabCaseName },
    { regex: /\[namespace\]/g, value: lowerKebabCaseNameSpace },
    { regex: /\[Namespace\]/g, value: upperCamelCaseNameSpace },
    { regex: /\[Name\]/g, value: upperCamelCaseName },
    { regex: /\[npm\]/g, value: npm },
    { regex: /\[year\]/g, value: newYear },
    { regex: /\|webPackName\|/g, value: webPackName }
  ];

  const replacements = nameReplacements.concat(pkgReplacements);

  // replace all instances of [name], [Name], [namespace] and [Namespace] accordingly
  let result = content;
  for (let i = 0; i < replacements.length; i++) {
    const { regex, value } = replacements[i];
    result = result.replace(regex, value);
  }
  return result;
};

const copyFile = async (sourcePath, targetPath, params, fileRenames = {}) => {
  const versionData = await getVersionData();
  const stats = await fsPromises.stat(sourcePath);
  if (stats.isDirectory()) {
    await makeFolder(targetPath);
    await copyAllFiles(sourcePath, targetPath, params, fileRenames);
  } else if (stats.isFile()) {
    const templateFileContents = await fsPromises.readFile(sourcePath, {
      encoding: 'utf8',
    });
    const formattedTemplateFileContents = formatTemplateFileContents(
      versionData,
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

const question = async () => {
  const params = parseArgs();

  if (!params.test) {
    const questions = [
      {
        type: 'confirm',
        name: 'governance',
        message: 'Did you review the Auro Governance Working Agreement?',
      },
      {
        type: 'confirm',
        name: 'status',
        message: 'Have you reviewed the Auro Components status board?',
        when: function (answers) {
          return answers.governance;
        },
      },
      {
        type: 'confirm',
        name: 'status',
        message: 'Have you reviewed the Auro Components status board?',
        when: function (answers) {
          return !readDocs('governance')(answers);
        },
      }
    ];

    function readDocs(arg) {
      return function (answers) {
        return answers[arg];
      };
    }

    inquirer.prompt(questions).then((answers) => {
      if (answers.status === false) {
        console.log('Be sure to review https://auro.alaskaair.com/component-status before starting')
      }

      if (answers.governance === false) {
        console.log('Be sure to review https://auro.alaskaair.com/getting-started/developers/governance before starting')
      }

      if (answers.governance === true && answers.status === true) {
        generateFromTemplate();
      }
    });
  } else {
    generateFromTemplate();
  }
}

const generateFromTemplate = async () => {
  const pjson = require('../package.json');
  const latestVersion = require('latest-version');

  // this test needs to be updated post first release of new '@alaskaairux/wc-generator'
  const latestPublishedGenVersion = await latestVersion('@alaskaairux/wc-generator');
  log(chalk.green(`\nPublished: v${latestPublishedGenVersion} | Installed: v${pjson.version}\n`))

  const params = parseArgs();

  if(latestPublishedGenVersion > pjson.version) {
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
    log(chalk.red(`\nSorry, we have to stop you here.\nIt's been detected you have v${pjson.version} installed,\nand the latest version is v${latestPublishedGenVersion}. Please run the following:\n\nnpm i @alaskaairux/wc-generator@${latestPublishedGenVersion} -g\n\nfor the latest version.\n`))
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


Creating a Design System People Love.
    `))

    await makeFolder(params.dir);
    await copyAllFiles(paths.self.template, params.dir, params, {
      '[namespace]-[name].test.js': `${lowerKebabCase(params.namespace)}-${lowerKebabCase(params.name)}.test.js`,
      '[namespace]-[name].js': `${lowerKebabCase(params.namespace)}-${lowerKebabCase(params.name)}.js`,
      'package.temp': 'package.json',
      '.npmignore.temp': '.npmignore',
      '.gitignore.temp': '.gitignore',
      '.travis.temp': '.travis.yml'
    });
    log(chalk.green('\nCopied all files!'));

    let areDependenciesInstalled = false;
    let isNodeSassRebuilt = false;
    let isGitRepo = false;
    let isBuilt = false;
    let isPolymerInstalled = false;

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

      process.stdout.write(`\nSetting up Polymer`);
      loadingLoop(() => isPolymerInstalled);
      try {
        await exec('npm i polymer -g', { cwd: params.dir });
        log(chalk.green('\nPolymer successfully installed globably!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isPolymerInstalled = true;

      process.stdout.write(`\nInstalling dependencies`);
      loadingLoop(() => areDependenciesInstalled);
      try {
        await exec('npm i', { cwd: params.dir });
        log(chalk.green('\nSuccesfully installed dependencies!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      areDependenciesInstalled = true;

      process.stdout.write(`\nRebuilding node-sass, ugh`);
      loadingLoop(() => isNodeSassRebuilt);
      try {
        await exec('npm rebuild node-sass', { cwd: params.dir });
        log(chalk.green('\nSuccesfully rebuilt node-sass!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isNodeSassRebuilt = true;

      process.stdout.write(`\nRunning initial component build`);
      loadingLoop(() => isBuilt);
      try {
        await exec('npm run ciBuild', { cwd: params.dir });
        log(chalk.green('\nInitial build success!'));
      } catch ({ message }) {
        log(chalk.red(message));
      }
      isBuilt = true;

      log(chalk.green(`Well done! The new HTML Custom Element auro-${params.name} has been created!
        \nDir: ${params.dir}
        \nWC: v${pjson.version}
      \n`));
    }
  }
};

question();
