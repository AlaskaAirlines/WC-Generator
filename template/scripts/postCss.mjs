import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import comments from 'postcss-discard-comments';
import path from 'path';
import fs from 'fs';
const __dirname = new URL('.', import.meta.url).pathname;
const directoryPath = path.join(__dirname, '../src');

/**
 * Default postCSS run
 * Locates all CSS files within the directory and loop
 * through the standardProcessor() function.
 */
fs.readdir(directoryPath, function (err, files) {
  //handling error
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  }
  //listing all files using forEach
  files.forEach(function (file) {
    if (file.includes(".css")) {
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
   postcss([autoprefixer, comments])
   .use(comments({
     remove: function(comment) { return comment[0] == "@"; }
   }))
   .process(css, { from: `src/${file}`, to: `src/${file}` })
   .then(result => {
     fs.writeFile(`src/${file}`, result.css, () => true)
   })
 });
}

/**
 * ALTERNATE script:
 * The following is a static builder for rendering one
 * CSS file at a time if that is required.
 */
// fs.readFile('src/style.css', (err, css) => {
//   postcss([autoprefixer, comments])
//     .use(comments({
//       remove: function(comment) { return comment[0] == "@"; }
//     }))
//     .process(css, { from: 'src/style.css', to: 'src/style.css' })
//     .then(result => {
//       fs.writeFile('src/style.css', result.css, () => true)
//       if ( result.map ) {
//         fs.writeFile('src/style.map', result.map, () => true)
//       }
//     })
// });
