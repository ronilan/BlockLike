const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const PACKAGE = require('./package.json');
const version = PACKAGE.version;

module.exports = {
  entry: './src/lib.js',
  plugins: [
    new UglifyJsPlugin({
      sourceMap: false,
      parallel: true,
      uglifyOptions: {
        compress: {
          keep_classnames: true,
        },
        mangle: {
          reserved: ['Stage', 'Sprite', 'Costume', 'Backdrop'],
          properties: false
        },
        output: {
          beautify: false
        },
      },
    })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        loader: 'eslint-loader',
        include: path.resolve(process.cwd(), 'src'),
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
    ]
  },
  output: {
    filename: `blocklike-${version}.min.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'blockLike',
  },
  watch: false,
};
