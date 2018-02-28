/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Sprite', () => {
  const stage = new blockLike.Stage();
  const sprite = new blockLike.Sprite();

  it('should be a Sprite object', () => {
    assert(sprite.constructor.name === 'Sprite');
  });

  describe('id', () => {
    it('should be a string that is of the following format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', () => {
      assert(typeof sprite.id === 'string');
      assert(sprite.id.length === 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length);
    });
  });
  describe('width', () => {
    it('should be bigger than zero', () => {
      assert(sprite.width > 0);
    });
  });
  describe('height', () => {
    it('should be bigger than zero', () => {
      assert(sprite.height > 0);
    });
  });
  describe('paced', () => {
    it('should have 16 default methods', () => {
      assert(sprite.paced.length === 16);
    });
  });
  describe('waited', () => {
    it('should have 6 default methods', () => {
      assert(sprite.waited.length === 6);
    });
  });
  describe('waitedReturned', () => {
    it('should have 2 default methods', () => {
      assert(stage.waitedReturned.length === 2);
    });
  });
  describe('pace', () => {
    it('should be 33 by default', () => {
      assert(sprite.pace === 33);
    });
  });
  describe('costumes', () => {
    it('should have a single default costume', () => {
      assert(sprite.costumes.length === 1);
    });
  });
  describe('costume', () => {
    it('should be a Costume object', () => {
      assert(sprite.costume.constructor.name === 'Costume');
    });
  });

  describe('addTo()', () => {
    it('should add the sprite to the stage', () => {
      assert(stage.sprites.length === 0);
      sprite.addTo(stage);
      assert(stage.sprites.length === 1);
    });
  });

  describe('element', () => {
    it('should exist', () => {
      assert(typeof sprite.element === 'object');
      assert(sprite.element.constructor.name === 'SpriteElement');
    });
    it('should contain a DOM element', () => {
      assert(typeof sprite.element.el === 'object');
      assert(sprite.element.el.constructor.name === 'HTMLDivElement');
    });
    it('should contain an image inside the DOM element', () => {
      assert(typeof sprite.element.el.firstChild === 'object');
      assert(sprite.element.el.firstChild.constructor.name === 'HTMLImageElement');
    });
    it('should set image to the current costume image', () => {
      assert(sprite.element.el.firstChild.src === sprite.costume.image);
    });
    it('should style image 100% width and height', () => {
      assert(sprite.element.el.firstChild.style.width === '100%');
      assert(sprite.element.el.firstChild.style.height === '100%');
    });
  });

  describe('removeFrom()', () => {
    it('should remove the sprite from the stage', () => {
      assert(stage.sprites.length === 1);
      sprite.removeFrom(stage);
      assert(stage.sprites.length === 0);
      assert(sprite.element === null);
    });
  });
});
