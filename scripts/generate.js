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

  const name = args['--name'] || 'element';
  const dir = path.resolve(
    args['--dir'] || `./OrionStatelessComponents__ods-${lowerKebabCase(name)}`
  );

  return {
    name,
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
      `${chalk.bold('Copying')}: ${fileName} -> ${fileRenames[fileName] ||
        fileName}`
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
  process.stdout.write('.');
  setTimeout(() => {
    loadingLoop(condition);
  }, 1000);
};

const generateFromTemplate = async () => {
  const params = parseArgs();
  await makeFolder(params.dir);
  await copyAllFiles(paths.self.template, params.dir, params, {
    'ods-[name]_test.html': `ods-${lowerKebabCase(params.name)}_test.html`,
    'ods-[name].js': `ods-${lowerKebabCase(params.name)}.js`,
    'README.temp': 'README.md',
    '.travis.temp': '.travis.yml',
  });
  log(chalk.green('\nCopied all files!'));

  let areDependenciesInstalled = false;
  let isNodeSassRebuilt = false;

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

  log(chalk.green(`\nGenerated ods-${params.name} boilerplate`));
};

generateFromTemplate();
