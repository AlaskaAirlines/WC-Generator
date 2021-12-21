const path = require('path');
const chalk = require('chalk');
const markdownMagic = require('markdown-magic');
const fs = require('fs');
const https = require('https');

const readmeTemplateUrl = 'https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/README.md';

/**
 * Copy README.md template from static source
 * */

const dir = './docTemplates';

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const readmeFilePath = './docTemplates/README.md';

if (!fs.existsSync(readmeFilePath)) {
  fs.writeFile(readmeFilePath, '', function(err) {
    if(err) {
      console.log('Unable to create README.md file', err);
    }
  });
}

const readmeTemplateFile = fs.createWriteStream(readmeFilePath);
const request = https.get(readmeTemplateUrl, function(response) {
  response.pipe(readmeTemplateFile);
});

/**
 * Compile `./docTemplates/README.md` -> `./README.md`
 */

const callbackReadme = function(updatedContent, outputConfig) {
  console.log(chalk.green('Finished compiling README documentation.'));
};

const configReadme = {
  matchWord: 'AURO-GENERATED-CONTENT',
  outputDir: './'
};

const markdownPathReadme = path.join(__dirname, '../docTemplates/README.md');

markdownMagic(markdownPathReadme, configReadme, callbackReadme);

/**
 * Compile `./docTemplates/demo.md` -> `./demo/demo.md`
 */

const callbackDemo = function(updatedContent, outputConfig) {
  console.log(chalk.green('Finished compiling demo documentation.'));
};

const configDemo = {
  matchWord: 'AURO-GENERATED-CONTENT',
  outputDir: './demo'
};

const markdownPathDemo = path.join(__dirname, '../docs/partials/demo.md');

markdownMagic(markdownPathDemo, configDemo, callbackDemo);

/**
 * If auroLabs project, include auroLabs documentation in `./README.md`
 */

fs.readFile('package.json', 'utf8', function(err, data) {
  try {
    data = JSON.parse(data);

    if (data.name.includes('@aurolabs/')) {
      const callbackAurolabs = function(updatedContent, outputConfig) {
        console.log(chalk.green('Readme updated to reference AuroLabs content.'));
      };

      const configAurolabs = {
        matchWord: 'AUROLABS-GENERATED-CONTENT'
      };

      const markdownPathAurolabs = path.join(__dirname, '../README.md');

      markdownMagic(markdownPathAurolabs, configAurolabs, callbackAurolabs);
    }
  } catch (e) {
    console.log(chalk.red('ERROR: Unable to reliably compile documentation.', err));
  }
})
