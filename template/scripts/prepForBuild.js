const fs = require('fs');
const bundle = '[namespace]-[name]__bundled.js';
const indexFile = './build/index.html';

// File destination.txt will be created or overwritten by default.
let copyFiles = async function () {
  fs.copyFile(`./dist/${bundle}`, `./build/${bundle}`, (err) => {
    if (err) throw err;
    console.log(`${bundle} was copied to ./build dir`);
  });

  fs.copyFile(`./demo/style.css`, `./build/style.css`, (err) => {
    if (err) throw err;
    console.log(`CSS was copied to ./build dir`);
  });
};

// Edit string in new index.html file
fs.readFile(indexFile, 'utf8', function (err, data) {
  copyFiles();

  if (err) {
    return console.log(err);
  }

  const element = data.replace(
    `../src/[namespace]-[name].js`,
    `[namespace]-[name]__bundled.js`,
  );

  fs.writeFile(indexFile, element, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
