#!/usr/bin/env node

'use strict';

// Check min Node Version
const minNodeVersion = [14, 17, 0];

// Throw an error on unhandled rejections (exit non-zero)
process.on('unhandledRejection', (err) => {
  throw err;
});

// Can't write this using any fancy syntax because check must run on es5 and lower
function verifySemver(minimum, current) {
  if (!minimum.length || !current.length) return false;

  const currentMajor = current[0];
  const currentMinor = current[1];
  const currentPatch = current[2];

  const minMajor = minimum[0];
  const minMinor = minimum[1];
  const minPatch = minimum[2];

  const majorValid = currentMajor >= minMajor;
  const minorValid = currentMajor > minMajor || currentMinor >= minMinor;
  const patchValid =
    currentMajor > minMajor ||
    currentMinor > minMinor ||
    currentPatch >= minPatch;

  return majorValid && minorValid && patchValid;
}

const currentNodeVersion = process.versions.node;
const nodeVersionIsValid = verifySemver(
  minNodeVersion,
  currentNodeVersion.split('.'),
);
const chalk = require('chalk');
const log = require('./log');

if (!nodeVersionIsValid) {
  log(chalk.red(`Outdated Node version detected: ${currentNodeVersion}.`));
  log(chalk.white(`Upgrade Node to at least ${minNodeVersion.join('.')}\n`));

  process.exit(1);
} else {
  log(chalk.green(`Node version detected: ${currentNodeVersion}.`));
  log(chalk.green(`Minimum version required: ${minNodeVersion.join('.')}\n`));
}
