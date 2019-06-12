const path = require('path');

const selfRoot = path.resolve(__dirname, '..');

const selfPaths = {
  root: '.',
  template: 'template',
  packageJson: 'package.json',
};

const resolveSelfDirectory = relativePath =>
  path.resolve(selfRoot, relativePath);
const resolvedSelfPaths = {};
Object.entries(selfPaths).forEach(([key, value]) => {
  resolvedSelfPaths[key] = resolveSelfDirectory(value);
});

module.exports = {
  self: {
    ...resolvedSelfPaths,
  },
};
