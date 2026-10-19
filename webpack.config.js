const path = require('path')

const PACKAGE = require('./package.json')
const version = PACKAGE.version

module.exports = {
  entry: './src/lib.js',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.jsx?$/, // both .js and .jsx
        loader: 'eslint-loader',
        include: path.resolve(process.cwd(), 'src'),
        enforce: 'pre',
        options: {
          fix: true
        }
      }
    ]
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: false
  },
  devtool: 'inline-source-map',
  output: {
    filename: `blocklike-${version}.js`,
    path: path.resolve(__dirname, 'dist'),
    library: 'blockLike'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, ''),
      // chokidar v5 (webpack-dev-server v6) watches file-by-file via fs.watch
      // on macOS - without this ignore it opens one fd per file in node_modules
      // (~24k) and crashes with EMFILE (kernel cap kern.maxfilesperproc: 10240).
      watch: {
        ignored: /node_modules|\.git/
      }
    },
    compress: true,
    host: '0.0.0.0', // your ip address
    port: 9000,
    watchFiles: {
      paths: ['**'],
      options: {
        ignored: /node_modules/
      }
    }
  }
}
