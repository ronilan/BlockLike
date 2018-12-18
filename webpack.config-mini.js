const path = require('path');

const PACKAGE = require('./package.json');
const version = PACKAGE.version;

module.exports = {
  entry: './src/lib.js',
  mode: 'production',
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
