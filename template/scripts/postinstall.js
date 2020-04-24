const fs = require('fs');

// convince Parcel to Transpile auro dependencies
const modules = [
  'lit-element',
  'lit-html',
];
const browserslistrc = 'node 12.15.0';

modules.forEach(name => {
  fs.writeFileSync(`node_modules/${name}/.browserslistrc`, browserslistrc);
});
