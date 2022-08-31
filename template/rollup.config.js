import { terser } from 'rollup-plugin-terser';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const srcFiles = [];
const production = !process.env.ROLLUP_WATCH;

// The following evaluates the existence of
// auro components in the ./src dir against
// the input config.
const directoryPath = path.join(__dirname, 'src');

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  files.forEach(function (file) {
    if(file.includes("auro")) {
      let fileName = file.replace('.js', '')
      srcFiles.push(`${fileName}__bundled`);
    }
  });

  if(JSON.stringify(Object.keys(modernConfig.input)) != JSON.stringify(srcFiles)) {
    console.log(chalk.hex('#f26135')(`
              **** WARNING ****

Auro component source files and rollup config
      are out of sync, please update.

     Not all bundled assets were created.

              **** WARNING ****`)
    )
  }
});

const getSharedPlugins = (isLegacy) => [
  resolve({
    // in case of multiple lit-element versions (e.g. importing another auro component)
    dedupe: ['lit-element', 'lit-html']
  }),
  commonjs(),
  // skipPreflightCheck flag needed or else build fails
  // see https://github.com/rollup/plugins/issues/381
  babel({
    babelHelpers: 'bundled',
    envName: isLegacy ? 'legacy' : 'modern',
    skipPreflightCheck: true
  }),
  minifyHTML(),
  terser()
];

const modernConfig = {
  input: {
    ['[namespace]-[name]__bundled']: './src/[namespace]-[name].js',
  },
  output: {
    format: 'esm',
    dir: 'dist/'
  },
  plugins: [
    // remove shady DOM polyfill for modern browsers
    // https://lit-element.polymer-project.org/guide/build#compile-out-the-shady-render-module
    alias({
      entries: [
        {
          find: 'lit-html/lib/shady-render.js',
          replacement: 'node_modules/lit-html/lit-html.js'
        }
      ]
    }),
    ...getSharedPlugins(false),
    !production &&
      serve({
        open: true,
        openPage: '/docs/'
      })
  ]
};

const [namespace][Name]Config = {
  input: 'src/es5.js',
  output: {
    format: 'iife',
    file: 'dist/[namespace]-[name]__bundled.es5.js'
  },
  plugins: getSharedPlugins(true)
};

export default [modernConfig, [namespace][Name]Config];
