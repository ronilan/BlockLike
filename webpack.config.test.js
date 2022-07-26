const path = require('path')
const glob = require('glob')

const PACKAGE = require('./package.json')
const version = PACKAGE.version

module.exports = {
  entry: { test: glob.sync('./test/*.test.js') },
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    filename: '~~out.js',
    path: path.resolve(__dirname, 'test')
  }
}
