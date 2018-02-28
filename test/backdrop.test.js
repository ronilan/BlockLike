/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Backdrop', () => {
  const backdrop = new blockLike.Backdrop();

  it('should be a Backdrop object', () => {
    assert(backdrop.constructor.name === 'Backdrop');
  });

  describe('color', () => {
    it('should be undefined', () => {
      assert(typeof backdrop.color === 'undefined');
    });
  });
  describe('image', () => {
    it('should be undefined', () => {
      assert(typeof backdrop.image === 'undefined');
    });
  });
  describe('cssRules', () => {
    it('should be empty array', () => {
      assert(backdrop.cssRules.length === 0);
    });
  });
  describe('classes', () => {
    it('should be empty array', () => {
      assert(backdrop.classes.length === 0);
    });
  });
});

describe('Backdrop Stage', () => {
  const stage = new blockLike.Stage();
  const backdrop = new blockLike.Backdrop();

  describe('addTo()', () => {
    it('should add a backdrop to the stage', () => {
      backdrop.addTo(stage);
      assert(stage.backdrops.length === 1);
    });
  });

  describe('removeFrom', () => {
    it('should remove a backdrop to the stage', () => {
      backdrop.removeFrom(stage);
      assert(stage.backdrops.length === 0);
    });
  });
});

describe('Backdrop CSS', () => {
  const backdrop = new blockLike.Backdrop();

  function resetBackdrops() { // eslint-disable-line require-jsdoc
    backdrop.classes = [];
    backdrop.addClass('rainbow');
    backdrop.addClass('unicorn');
    backdrop.addClass('big');
  }

  describe('css()', () => {
    it('it should add a css property to current backdrop', () => {
      assert(backdrop.cssRules.length === 0);
      backdrop.css('color', 'red');
      assert(backdrop.cssRules.length === 1);
      assert(backdrop.cssRules[0].prop === 'color');
      assert(backdrop.cssRules[0].value === 'red');
    });
    it('it should accept a css object and add it to backdrop', () => {
      backdrop.css({ 'font-size': '16px', 'font-weight': 400 });
      assert(backdrop.cssRules.length === 3);
      assert(backdrop.cssRules[1].prop === 'font-size');
      assert(backdrop.cssRules[1].value === '16px');
      assert(backdrop.cssRules[2].prop === 'font-weight');
      assert(backdrop.cssRules[2].value === 400);
    });
    it('it should adjust camelCase css proips to dash-case', () => {
      backdrop.css({ lineHeight: '16px' });
      assert(backdrop.cssRules.length === 4);
      assert(backdrop.cssRules[3].prop === 'line-height');
      assert(backdrop.cssRules[3].value === '16px');
    });
  });
  describe('addClass()', () => {
    it('it should add a css class to current backdrop', () => {
      resetBackdrops();
      backdrop.addClass('fluffy');
      assert(backdrop.classes.length === 4);
      assert(backdrop.classes[0] === 'rainbow');
      assert(backdrop.classes[3] === 'fluffy');
    });
  });
  describe('removeClass()', () => {
    it('it should remove css class to current backdrop', () => {
      resetBackdrops();
      backdrop.removeClass('rainbow');
      assert(backdrop.classes.length === 2);
      assert(backdrop.classes[0] === 'unicorn');
    });
    it('should change nothing when class not found', () => {
      resetBackdrops();
      const numOfClasses = backdrop.classes.length;
      backdrop.removeClass('cat-on-wheels');
      assert(backdrop.classes.length === numOfClasses);
    });
  });
  describe('hasClass()', () => {
    it('it should return true if class is applied', () => {
      resetBackdrops();
      assert(backdrop.hasClass('rainbow') === true);
    });
    it('it should return false if class is not applied', () => {
      resetBackdrops();
      assert(backdrop.hasClass('blue') === false);
    });
  });
});
