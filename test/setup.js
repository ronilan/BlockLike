const jsdom = require('jsdom')

/**
  * mockCanvas - Creates a mock canvas. Does nothing but tests pass.
  *
  * @param {object} window - the window object (via jsdom)
  */
const mockCanvas = (window) => {
  const context = {
    constructor: {
      name: 'CanvasRenderingContext2D'
    },
    fillRect () {},
    clearRect () {},
    getImageData (x, y, w, h) {
      return {
        data: new Array(w * h * 4)
      }
    },
    putImageData () {},
    createImageData () { return [] },
    setTransform () {},
    drawImage () {},
    save () {},
    fillText () {},
    restore () {},
    beginPath () {},
    moveTo () {},
    lineTo () {},
    closePath () {},
    stroke () {},
    translate () {},
    scale () {},
    rotate () {},
    arc () {},
    fill () {},
    measureText () {
      return { width: 0 }
    },
    transform () {},
    rect () {},
    clip () {}
  }
  window.HTMLCanvasElement.prototype.getContext = () => context // eslint-disable-line no-param-reassign
  window.HTMLCanvasElement.prototype.toDataURL = () => '' // eslint-disable-line no-param-reassign
}

const { JSDOM } = jsdom

// TODO: figure out jsdom resource loading paths. Setting is: { resources: "usable" }
const { document } = (new JSDOM(
  '',
  {
    url: 'https://example.org/',
    referrer: 'https://example.com/',
    contentType: 'text/html',
    includeNodeLocations: true,
    storageQuota: 10000000
  }
)).window

const window = document.defaultView
mockCanvas(window)

global.document = document

Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}
