# BlockLike.js

BlockLike.js is an educational JavaScript library. It bridges the gap between block-based and text-based programming.

BlockLike.js is designed following [Scratch](https://scratch.mit.edu) concepts, methods and patterns. The screen is a centered stage. Interaction is with Sprites. Code is executed in a "paced" manner. Scratch block code and BlockLike.js text code are meant to be as literally similar as possible.

BlockLike.js is written in ES6/ES7 flavored JavaScript. It is environment independent. It can be used anywhere modern JavaScript runs.

See [BlockLike.org](https://www.blocklike.org) for details, [docs](https://www.blocklike.org/docs), [examples](https://www.blocklike.org/example) and [FAQ](https://www.blocklike.org/faq.html).

## Get Started

The easiest way to start with BlockLike.js is using CodePen or replit. Alternatively, you can create an index.html file and include BlockLike.js with the script tag.

The [website](https://www.blocklike.org/#getstarted) has a one-click setup for CodePen and [instructions](https://www.blocklike.org/#getstarted) how to set up replit and how to load the most recent version off of a CDN.

## Development

### Install

Make sure to have [Node.js](https://nodejs.org) installed.

Clone the repo.

In a terminal:

```sh
npm install
npm start

npm run watch
```

#### Troubleshoot

##### If you encounter:

```sh
listen EADDRINUSE 127.0.0.1:9000
```

Something else is using that port. 

Open webpack.config.js and change the port setting for the devServer.

### Test

All:
```sh
npm run test
```

Single test:
```sh
TEST=stage_looks npm run test:it
```

### Build

```sh
npm run build
```

The build script will build the two library versions (normal and min), generate the third one (mascotless) and republish the docs.


### Publish

For most cases.

```sh
npm version patch
```

For more festive occasions:

```sh
npm version minor
```

Generally speaking, patch a version any time there is a change in the minified distribution, even if the change is not the result of a code change but only of build tools. 

Running version will trigger the version script and will create a tagged commit.

```sh
git push origin master
git push --tags  

```

Pushing tags will trigger a GitHub Workflow and will publish the version to the NPM registry

### Documentation publishing

```sh
npm run docs
```

Note that building the library will also build the docs.

## Authors

[Ron Ilan](https://www.ronilan.com)

## License
[MIT](https://en.wikipedia.org/wiki/MIT_License)

###### Fabriqué au Canada : Made in Canada
