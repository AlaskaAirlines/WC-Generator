const path = require('path')
const chalk = require('chalk');
const markdownMagic = require('markdown-magic')

const config = {
  matchWord: 'AURO-GENERATED-CONTENT',
  ignore: 'template'
}

const callbackDocs = function(group) {
  console.log(chalk.green('Finished compiling `/docs`.'));
}

const callbackReadme = function(group) {
  console.log(chalk.green('Finished compiling README.'));
}

let markdownPath = ''

markdownPath = path.join(__dirname, '../docs/*.md')
markdownMagic(markdownPath, config, callbackDocs)

markdownPath = path.join(__dirname, '../README.md')
markdownMagic(markdownPath, config, callbackReadme)
