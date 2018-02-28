/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Costume', () => {
  const costume = new blockLike.Costume();

  it('should be a Costume object', () => {
    assert(costume.constructor.name === 'Costume');
  });

  describe('width', () => {
    it('should be 100 by default', () => {
      assert(costume.width === 100);
      assert(costume.originalWidth === 100);
    });
  });
  describe('height', () => {
    it('should be 100 by default', () => {
      assert(costume.height === 100);
      assert(costume.originalHeight === 100);
    });
  });
  describe('color', () => {
    it('should be undefined', () => {
      assert(typeof costume.color === 'undefined');
    });
  });
  describe('image', () => {
    it('should be undefined', () => {
      assert(typeof costume.image === 'undefined');
    });
  });
  describe('cssRules', () => {
    it('should be empty array', () => {
      assert(costume.cssRules.length === 0);
    });
  });
  describe('classes', () => {
    it('should be empty array', () => {
      assert(costume.classes.length === 0);
    });
  });
  describe('innerHTML', () => {
    it('should be empty string', () => {
      assert(costume.innerHTML === '');
    });
  });
});

describe('Costume Sprite', () => {
  const sprite = new blockLike.Sprite();
  const bareSprite = new blockLike.Sprite(null);

  const costume = new blockLike.Costume();

  describe('addTo()', () => {
    it('should add a costume to the sprite', () => {
      costume.addTo(sprite);
      assert(sprite.costumes.length === 2);
    });
    it('should adjust width and height when added to bare sprite', () => {
      costume.addTo(bareSprite);
      assert(bareSprite.height === costume.height);
      assert(bareSprite.width === costume.width);
    });
  });

  describe('removeFrom', () => {
    it('should remove a costume to the sprite', () => {
      costume.removeFrom(sprite);
      assert(sprite.costumes.length === 1);
    });
  });
});

describe('Costume CSS', () => {
  const costume = new blockLike.Costume();

  function resetCostumes() { // eslint-disable-line require-jsdoc
    costume.classes = [];
    costume.addClass('rainbow');
    costume.addClass('unicorn');
    costume.addClass('big');
  }

  describe('css()', () => {
    it('it should add a css property to current costume', () => {
      assert(costume.cssRules.length === 0);
      costume.css('color', 'red');
      assert(costume.cssRules.length === 1);
      assert(costume.cssRules[0].prop === 'color');
      assert(costume.cssRules[0].value === 'red');
    });
    it('it should accept a css object and add it to costume', () => {
      costume.css({ 'font-size': '16px', 'font-weight': 400 });
      assert(costume.cssRules.length === 3);
      assert(costume.cssRules[1].prop === 'font-size');
      assert(costume.cssRules[1].value === '16px');
      assert(costume.cssRules[2].prop === 'font-weight');
      assert(costume.cssRules[2].value === 400);
    });
    it('it should adjust camelCase css proips to dash-case', () => {
      costume.css({ lineHeight: '16px' });
      assert(costume.cssRules.length === 4);
      assert(costume.cssRules[3].prop === 'line-height');
      assert(costume.cssRules[3].value === '16px');
    });
  });
  describe('addClass()', () => {
    it('it should add a css class to current costume', () => {
      resetCostumes();
      costume.addClass('fluffy');
      assert(costume.classes.length === 4);
      assert(costume.classes[0] === 'rainbow');
      assert(costume.classes[3] === 'fluffy');
    });
  });
  describe('removeClass()', () => {
    it('it should remove css class to current costume', () => {
      resetCostumes();
      costume.removeClass('rainbow');
      assert(costume.classes.length === 2);
      assert(costume.classes[0] === 'unicorn');
    });
    it('should change nothing when class not found', () => {
      resetCostumes();
      const numOfClasses = costume.classes.length;
      costume.removeClass('cat-on-wheels');
      assert(costume.classes.length === numOfClasses);
    });
  });
  describe('hasClass()', () => {
    it('it should return true if class is applied', () => {
      resetCostumes();
      assert(costume.hasClass('rainbow') === true);
    });
    it('it should return false if class is not applied', () => {
      resetCostumes();
      assert(costume.hasClass('blue') === false);
    });
  });
});

