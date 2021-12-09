const path = require('path')
const chalk = require('chalk');
const markdownMagic = require('markdown-magic')

const config = {
  matchWord: 'AURO-GENERATED-CONTENT'
}

const callback = function(updatedContent, outputConfig) {
  console.log(chalk.green('Finished compiling documentation.'));
}

const markdownPath = path.join(__dirname, '../**/*.md')
markdownMagic(markdownPath, config, callback)
