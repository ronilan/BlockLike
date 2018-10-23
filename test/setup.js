const jsdom = require('jsdom');

const { JSDOM } = jsdom;

// TODO: figure out jsdom resource loading paths. Setting is: { resources: "usable" }
const { document } = (new JSDOM(
  '',
  {
    url: 'https://example.org/',
    referrer: 'https://example.com/',
    contentType: 'text/html',
    includeNodeLocations: true,
    storageQuota: 10000000,
  },
)).window;

global.document = document;

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
