const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const remToPx = require('postcss-rem-to-pixel');
const removeNonRem = require('./removeNonRemPlugin.js');
const postcssCustomProperties = require('postcss-custom-properties');
const removeRules = require('postcss-remove-rules');
const comments = require('postcss-discard-comments');
const fs = require('fs');

const cssFiles = ['style']

cssFiles.map(name => fs.readFile(`src/${name}.css`, (err, css) => {
  postcss([autoprefixer, postcssCustomProperties, comments])
    .use(comments({
      remove: function(comment) { return comment[0] == "@"; }
    }))
    .use(removeRules({
      rulesToRemove: {
        ':root': '*'
      }
    }))
    .process(css, { from: `src/${name}.css`, to: `src/${name}.css` })
    .then(result => {
      fs.writeFile(`src/${name}.css`, result.css, () => true)
      if ( result.map ) {
        fs.writeFile(`src/${name}.map`, result.map, () => true)
      }
    })
  }));

/*
  Output a "fixed" stylesheet that only contains declarations with rem units
  converted to their px equivalent.
*/
const cssFixedFiles = ['style-fixed']

cssFixedFiles.map(name => fs.readFile(`src/${name}.css`, (err, css) => {
  fs.readFile(`src/${name}.css`, (err, css) => {
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
    .process(css, { from: `src/${name}.css`, to: `src/${name}.css` })
    .then(result => {
      fs.writeFile(`src/${name}.css`, result.css, () => true)
      if ( result.map ) {
        fs.writeFile(`src/${name}.map`, result.map, () => true)
      }
    })
  });
}));
