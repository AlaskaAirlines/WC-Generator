import path from 'path';
import markdownMagic from 'markdown-magic';
import fs from 'fs';
import https from 'https';

const __dirname = new URL('.', import.meta.url).pathname;

const readmeTemplateUrl = 'https://raw.githubusercontent.com/AlaskaAirlines/WC-Generator/master/componentDocs/README.md';
const dirDocTemplates = './docTemplates';
const readmeFilePath = dirDocTemplates + '/README.md';

/**
 * Extract NPM, NAMESPACE and NAME from package.json
 */

function nameExtraction() {
 const packageJson = fs.readFileSync('package.json', 'utf8', function(err, data) {
   if (err) {
     console.log('ERROR: Unable to read package.json file', err);
   }
 })

 let pName = JSON.parse(packageJson).name;

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
}

/**
 * Replace all instances of [npm], [name], [Name], [namespace] and [Namespace] accordingly
 */

function formatTemplateFileContents(content, destination) {
  let nameExtractionData = nameExtraction();
  let result = content;

  /**
   * Replace placeholder strings
   */
  result = result.replace(/\[npm]/g, nameExtractionData.npm);
  result = result.replace(/\[name](?!\()/g, nameExtractionData.name);
  result = result.replace(/\[Name](?!\()/g, nameExtractionData.nameCap);
  result = result.replace(/\[namespace]/g, nameExtractionData.namespace);
  result = result.replace(/\[Namespace]/g, nameExtractionData.namespaceCap);

  /**
   * Cleanup line breaks
   */
  result = result.replace(/(\r\n|\r|\n)[\s]+(\r\n|\r|\n)/g, '\r\n\r\n'); // Replace lines containing only whitespace with a carriage return.
  result = result.replace(/>(\r\n|\r|\n){2,}/g, '>\r\n'); // Remove empty lines directly after a closing html tag.
  result = result.replace(/>(\r\n|\r|\n)```/g, '>\r\n\r\n```'); // Ensure an empty line before code samples.
  result = result.replace(/>(\r\n|\r|\n){2,}```(\r\n|\r|\n)/g, '>\r\n```\r\n'); // Ensure no empty lines before close of code sample.
  result = result.replace(/([^(\r\n|\r|\n)])(\r\n|\r|\n)+#/g, "$1\r\n\r\n#"); // Ensure empty line before header sections.

  /**
   * Write the result to the destination file
   */
  fs.writeFileSync(destination, result, { encoding: 'utf8'});
}

function formatApiTableContents(content, destination) {
  const nameExtractionData = nameExtraction();
  const wcName = nameExtractionData.namespace + '-' + nameExtractionData.name;

  let result = content;

  result = result
    .replace(/\r\n|\r|\n####\s`([a-zA-Z]*)`/g, `\r\n#### <a name="$1"></a>\`$1\`<a href="#" style="float: right; font-size: 1rem; font-weight: 100;">back to top</a>`)
    .replace(/\r\n|\r|\n\|\s`([a-zA-Z]*)`/g, '\r\n| [$1](#$1)')
    .replace(/\| \[\]\(#\)/g, "");

  fs.writeFileSync(destination, result, { encoding: 'utf8'});

  fs.readFile('./demo/apiExamples.md', 'utf8', function(err, data) {
    formatTemplateFileContents(data, './demo/apiExamples.md');
  });
}

/**
 * Compiles `./docTemplates/README.md` -> `./README.md`
 */

function processReadme() {
  const callback = function(updatedContent, outputConfig) {

    if (fs.existsSync('./README.md')) {
      fs.readFile('./README.md', 'utf8', function(err, data) {
        formatTemplateFileContents(data, './README.md');
      });
    } else {
      console.log('ERROR: ./README.md file is missing');
    }
  };

  const config = {
    matchWord: 'AURO-GENERATED-CONTENT',
    outputDir: './'
  };

  const markdownPath = path.join(__dirname, '../docTemplates/README.md');

  markdownMagic(markdownPath, config, callback);
}

/**
 * Compiles `./docTemplates/demo.md` -> `./demo/demo.md`
 */

function processDemo() {
  const callback = function(updatedContent, outputConfig) {
    if (fs.existsSync('./demo/demo.md')) {
      fs.readFile('./demo/demo.md', 'utf8', function(err, data) {
        formatTemplateFileContents(data, './demo/demo.md');
      });
    } else {
      console.log('ERROR: ./demo/demo.md file is missing');
    }
  };

  const configDemo = {
    matchWord: 'AURO-GENERATED-CONTENT',
    outputDir: './demo'
  };

  const markdownPath = path.join(__dirname, '../docs/partials/demo.md');

  markdownMagic(markdownPath, configDemo, callback);
}

/**
 * Compiles `./docTemplates/apiExamples.md` -> `./demo/apiExamples.md`
 */

function processApiExamples() {
  const callback = function(updatedContent, outputConfig) {
    if (fs.existsSync('./demo/apiExamples.md')) {
      fs.readFile('./demo/apiExamples.md', 'utf8', function(err, data) {
        formatApiTableContents(data, './demo/apiExamples.md');
      });
    } else {
      console.log('ERROR: ./demo/apiExamples.md file is missing');
    }
  };

  const config = {
    matchWord: 'AURO-GENERATED-CONTENT',
    outputDir: './demo'
  };

  const markdownPath = path.join(__dirname, '../docs/partials/apiExamples.md');

  markdownMagic(markdownPath, config, callback);
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
        console.log('ERROR: Unable to create README.md file.', err);
      }
    });
  }

  https.get(readmeTemplateUrl, function(response) {
    let writeTemplate = response.pipe(fs.createWriteStream(readmeFilePath));

    writeTemplate.on('finish', () => {
      processReadme();
    });

  }).on('error', (err) => {
    console.log('ERROR: Unable to fetch README.md file from server.', err);
  });
}

/**
 * Run all the actual document generation
 */
copyReadmeLocally();
processApiExamples();
processDemo();
