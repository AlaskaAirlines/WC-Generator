const path = require('path');
const chalk = require('chalk');
const markdownMagic = require('markdown-magic');
const fs = require('fs');
const https = require('https');

const readmeTemplateUrl = 'https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/README.md';
const dirDocTemplates = './docTemplates';
const readmeFilePath = dirDocTemplates + '/README.md';

/**
 * Extract NPM, NAMESPACE and NAME from package.json
 */

 function nameExtraction() {
  const packageJson = fs.readFileSync('package.json', 'utf8', function(err, data) {
    if (err) {
      console.log(chalk.red('ERROR: Unable to read package.json file', err));
    }
  })

  pName = JSON.parse(packageJson).name;

  let npmStart = pName.indexOf('@');
  let namespaceStart = pName.indexOf('/');
  let nameStart = pName.indexOf('-');

  let result = {
    'npm': pName.substring(npmStart, namespaceStart),
    'namespace': pName.substring(namespaceStart + 1, nameStart),
    'namespaceCap': pName.substring(namespaceStart + 1)[0].toUpperCase() + pName.substring(namespaceStart + 2, nameStart),
    'name': pName.substring(nameStart + 1),
    'nameCap': pName.substring(nameStart + 1)[0].toUpperCase() + pName.substring(nameStart + 2)
  };

  return result;
};

/**
 * Replace all instances of [npm], [name], [Name], [namespace] and [Namespace] accordingly
 */

function formatTemplateFileContents(content, destination) {
  let nameExtractionData = nameExtraction();

  let result = content;
  result = result.replace(/\[npm]/g, nameExtractionData.npm);
  result = result.replace(/\[name]/g, nameExtractionData.name);
  result = result.replace(/\[Name]/g, nameExtractionData.nameCap);
  result = result.replace(/\[namespace]/g, nameExtractionData.namespace);
  result = result.replace(/\[Namespace]/g, nameExtractionData.namespaceCap);

  // Strip all markdown-magic comments
  result = result.replace(/<!-- AURO(.*?)-GENERATED-CONTENT(.*?)-->/g, '');
  result = result.replace(/<!-- The below content is automatically added from(.*?)-->/g, '');
  result = result.replace(/<!-- The below code snippet is automatically added from(.*?)-->/g, '');
  // Strip extra new lines left behind when removing markdown-magic comments
  result = result.replace(/\s\s(\r\n|\r|\n)/g, '\r\n');
  result = result.replace(/(\r\n|\r|\n){3,}/g, '\r\n\r\n');

  fs.writeFileSync(destination, result, { encoding: 'utf8'});
};

/**
 * If auroLabs project, include auroLabs documentation in `./README.md`
 */

function processLabsReadmeContent() {
  let nameExtractionData = nameExtraction();

  if (nameExtractionData.npm === '@aurolabs') {
    console.warn('is labs');
    const callbackAurolabs = function(updatedContent, outputConfig) {
      console.log(chalk.green('Readme updated to reference AuroLabs content.'));
    };

    const configAurolabs = {
      matchWord: 'AUROLABS-GENERATED-CONTENT'
    };

    const markdownPathAurolabs = path.join(__dirname, '../README.md');

    markdownMagic(markdownPathAurolabs, configAurolabs, callbackAurolabs);
  }
}

/**
 * Compiles `./docTemplates/README.md` -> `./README.md`
 */

function processReadme() {
  const callbackReadme = function(updatedContent, outputConfig) {
    processLabsReadmeContent()

    if (fs.existsSync('./README.md')) {
      fs.readFile('./README.md', 'utf8', function(err, data) {
        formatTemplateFileContents(data, './README.md');
      });
    } else {
      console.log(chalk.red('ERROR: ./README.md file is missing'));
    }
  };

  const configReadme = {
    matchWord: 'AURO-GENERATED-CONTENT',
    outputDir: './'
  };

  const markdownPathReadme = path.join(__dirname, '../docTemplates/README.md');

  markdownMagic(markdownPathReadme, configReadme, callbackReadme);

  processLabsReadmeContent();
}

/**
 * Compiles `./docTemplates/demo.md` -> `./demo/demo.md`
 */

function processDemo() {
  const callbackDemo = function(updatedContent, outputConfig) {
    if (fs.existsSync('./demo/demo.md')) {
      fs.readFile('./demo/demo.md', 'utf8', function(err, data) {
        formatTemplateFileContents(data, './demo/demo.md');
      });
    } else {
      console.log(chalk.red('ERROR: ./demo/demo.md file is missing'));
    }
  };

  const configDemo = {
    matchWord: 'AURO-GENERATED-CONTENT',
    outputDir: './demo'
  };

  const markdownPathDemo = path.join(__dirname, '../docs/partials/demo.md');

  markdownMagic(markdownPathDemo, configDemo, callbackDemo);
}

/**
 * Copy README.md template from static source
 * */

function copyReadmeLocally() {

  if (!fs.existsSync(dirDocTemplates)){
    fs.mkdirSync(dirDocTemplates);
  }

  if (!fs.existsSync(readmeFilePath)) {
    fs.writeFile(readmeFilePath, '', function(err) {
      if(err) {
        console.log(chalk.red('ERROR: Unable to create README.md file.', err));
      }
    });
  }

  https.get(readmeTemplateUrl, function(response) {
    let writeTemplate = response.pipe(fs.createWriteStream(readmeFilePath));

    writeTemplate.on('finish', () => {
      processReadme();
    });

  }).on('error', (err) => {
    console.log(chalk.red('ERROR: Unable to fetch README.md file from server.', err));
  });
}

/**
 * Run all the actual document generation
 */
copyReadmeLocally();
processDemo();
