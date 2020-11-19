const { browserslist: defaultBrowserslist } = require('./package.json');

const modernBrowserslist = defaultBrowserslist.filter(
  (browser) => browser !== 'ie 11'
);

const sharedPlugins = [
  '@babel/plugin-syntax-dynamic-import',
  [
    '@babel/plugin-transform-runtime',
    {
      useESModules: true
    }
  ]
];

module.exports = {
  exclude: [
    'node_modules/@babel/**',
    'node_modules/core-js/**',
    'node_modules/@webcomponents/webcomponentsjs/**'
  ],
  env: {
    modern: {
      // lit-element supports the last two versions of modern browsers, so we don't need to polyfill
      exclude: ['node_modules/lit-element/**', 'node_modules/lit-html/**'],
      presets: [
        [
          '@babel/preset-env',
          {
            targets: modernBrowserslist.join(', '),
            useBuiltIns: 'usage',
            corejs: 3
          }
        ]
      ],
      plugins: sharedPlugins
    },
    legacy: {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: defaultBrowserslist.join(', '),
            useBuiltIns: 'usage',
            corejs: 3
          }
        ]
      ],
      plugins: sharedPlugins
    }
  }
};
