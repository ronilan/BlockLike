/*
* Build Script:
* Removes the artifacts from dist and docs on version bump
*/
const fs = require('fs');
const path = require('path');


const directories = ['dist', 'docs'];
let i = directories.length;

while(i > 0) {
  i -= 1;
  let files = fs.readdirSync(directories[i])
  for (const file of files) {
    if(fs.lstatSync(path.join(directories[i], file)).isFile() ) {
      fs.unlinkSync(path.join(directories[i], file));
    }
  }
}
