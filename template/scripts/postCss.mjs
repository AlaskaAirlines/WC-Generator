import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import comments from 'postcss-discard-comments';
import fs from 'fs';

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
