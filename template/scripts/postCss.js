const autoprefixer = require('autoprefixer');
const postcss = require('postcss');
const comments = require('postcss-discard-comments');
const fs = require('fs');

fs.readFile('src/style.css', (err, css) => {
  postcss([autoprefixer, comments])
    .use(comments({
      remove: function(comment) { return comment[0] == "@"; }
    }))
    .process(css, { from: 'src/style.css', to: 'src/style.css' })
    .then(result => {
      fs.writeFile('src/style.css', result.css, () => true)
      if ( result.map ) {
        fs.writeFile('src/style.map', result.map, () => true)
      }
    })
});
