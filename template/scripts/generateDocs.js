const path = require('path')
const chalk = require('chalk');
const markdownMagic = require('markdown-magic')

// Compile ./README.md

const callbackReadme = function(updatedContent, outputConfig) {
  console.log(chalk.green('Finished compiling README documentation.'));
}

const configReadme = {
  matchWord: 'AURO-GENERATED-CONTENT',
  outputDir: './'
}

const markdownPathReadme = path.join(__dirname, '../docTemplates/README.md')

markdownMagic(markdownPathReadme, configReadme, callbackReadme)

// Compile ./demo/demo.md

const callbackDemo = function(updatedContent, outputConfig) {
  console.log(chalk.green('Finished compiling demo documentation.'));
}

const configDemo = {
  matchWord: 'AURO-GENERATED-CONTENT',
  outputDir: './demo'
}

const markdownPathDemo = path.join(__dirname, '../docs/partials/demo.md')

markdownMagic(markdownPathDemo, configDemo, callbackDemo)
