const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config = {
  entry: {
    ['[namespace]-[name]__bundled']: './src/[namespace]-[name].js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '|webPackName|',
  },
  module: {
    rules: [
      {
        /* Transpile JS from source and Web Component packages in ES6 */
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'node_modules/lit-element'),
          path.resolve(__dirname, 'node_modules/lit-html'),
          path.resolve(__dirname, 'node_modules/@alaskaairux'),
          path.resolve(__dirname, 'node_modules/focus-visible'),
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'polyfills'
        },
      },
    },
  },
  devServer: {
    contentBase: [path.join(__dirname, 'docs'), path.join(__dirname, 'dist')],
    compress: true,
    port: 8080
  }
};


module.exports = (env, argv) => {
  argv = argv || {};

  if (argv.mode === 'development') {
    config.devtool = 'inline-source-map';
    config.mode = 'development';
    config.watch = true;
  } else if (argv.env === 'debug') {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
