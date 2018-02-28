/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

// setup the jsdom document.
const el = document.createElement('div');
el.id = 'container';
document.body.appendChild(el);

describe('Sprite Object Options', () => {
  const options = {
    pace: 100,
    costume: new blockLike.Costume({ image: '../../images/bear.png' }),
  };

  const sprite = new blockLike.Sprite(options);

  describe('pace', () => {
    it('should be as set in options', () => {
      assert(sprite.pace === options.pace);
    });
  });
  describe('costume', () => {
    it('should be as set in options', () => {
      assert(sprite.costume === options.costume);
    });
    it('should be a Costume object', () => {
      assert(sprite.costume.constructor.name === 'Costume');
    });
    it('should replace the default costume', () => {
      assert(sprite.costumes.length === 1);
    });
  });
});

describe('Sprite String Options', () => {
  const sprite = new blockLike.Sprite('../../images/confetti.svg');

  describe('costume', () => {
    it('should create a Costume object', () => {
      assert(sprite.costume.constructor.name === 'Costume');
    });
    it('should replace the default costume', () => {
      assert(sprite.costumes.length === 1);
    });
    // TODO: figure out jsdom image loading
    // it('should set image size', () => {

    // });
  });
});

describe('Sprite null Options', () => {
  const sprite = new blockLike.Sprite(null);

  describe('costume', () => {
    it('should not create a Costume', () => {
      assert(sprite.costume === null);
    });
    it('should not create any costumes', () => {
      assert(sprite.costumes.length === 0);
    });
    it('should set sprite width and height to 0', () => {
      assert(sprite.x === 0);
      assert(sprite.y === 0);
    });
  });
});
