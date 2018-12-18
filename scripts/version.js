/*
* Build Script:
* On version bump, before commit:
* 1. Switch the examples to current version.
* 2. Remove the artifacts from dist and docs.
*/

const PACKAGE = require('../package.json');

const version = PACKAGE.version;

const fs = require('fs');
const path = require('path');
const replace = require('replace-in-file');

// flip examples
const changes = replace.sync({
  files: 'example/**/*.html',
  from: /\/dist\/blocklike-\d+.\d+.\d+.min.js/g,
  to: `/dist/blocklike-${version}.min.js`,
});

// remove artifacts
const directories = ['dist', 'docs'];
let i = directories.length;

while (i > 0) {
  i -= 1;
  const files = fs.readdirSync(directories[i]);
  for (const file of files) {
    if (fs.lstatSync(path.join(directories[i], file)).isFile()) {
      fs.unlinkSync(path.join(directories[i], file));
    }
  }
}
