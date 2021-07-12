/*
* Build Script:
* On version bump, before commit:
* 1. Switch the examples to current version.
* 2. Remove the artifacts from dist and docs.
*/

const PACKAGE = require('../package.json')

const { version } = PACKAGE

const fs = require('fs')
const path = require('path')
const replace = require('replace-in-file') // eslint-disable-line import/no-extraneous-dependencies

// flip examples
replace.sync({
  files: 'example/**/*.html',
  from: /\/dist\/blocklike-\d+.\d+.\d+.min.js/g,
  to: `/dist/blocklike-${version}.min.js`
})

// remove artifacts
const directories = ['dist', 'docs']

directories.forEach((directory) => {
  const files = fs.readdirSync(directory)
  files.forEach((file) => {
    if (fs.lstatSync(path.join(directory, file)).isFile()) {
      fs.unlinkSync(path.join(directory, file))
    }
  })
})
