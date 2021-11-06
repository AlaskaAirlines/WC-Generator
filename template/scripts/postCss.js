const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const remToPx = require('postcss-rem-to-pixel');
const removeNonRem = require('./removeNonRemPlugin.js');
const postcssCustomProperties = require('postcss-custom-properties');
const removeRules = require('postcss-remove-rules');
const comments = require('postcss-discard-comments');
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, '../src');

/**
 * Default postCSS run
 */
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
      if (file.includes(".css") && !file.includes("-fixed.css")) {
        standardProcessor(file);
      }
  });
});

/**
 * The standardProcessor function applies tokens for fallback selectors
 * and completes a post cleanup.
 * @param {string} file
 */
function standardProcessor(file) {
  fs.readFile(`src/${file}`, (err, css) => {
    postcss([autoprefixer, postcssCustomProperties, comments])
      .use(comments({
        remove: function(comment) { return comment[0] == "@"; }
      }))
      .use(removeRules({
        rulesToRemove: {
          ':root': '*'
        }
      }))
      .process(css, { from: `src/${file}`, to: `src/${file}` })
      .then(result => {
        fs.writeFile(`src/${file}`, result.css, () => true)
      })
    })
}

/**
 * Addresses postCSS run of style-fixed files.
 */
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
      if (file.includes("-fixed.css")) {
        fixedProcessor(file);
      }
  });
});


/**
 * Output a "fixed" stylesheet that only contains
 * declarations with rem units converted to their px equivalent.
 * @param {string} file
 */
 function fixedProcessor(file) {
  fs.readFile(`src/${file}`, (err, css) => {
    postcss([
      autoprefixer,
      postcssCustomProperties({preserve: false}),
      comments,
      removeNonRem,
      remToPx({replace: true, propList: ['*']})
    ])
    .use(comments({
      remove: function(comment) { return comment[0] == "@"; }
    }))
    .process(css, { from: `src/${file}`, to: `src/${file}` })
    .then(result => {
      fs.writeFile(`src/${file}`, result.css, () => true)
    })
  });
}
