/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Stage Backdrop', () => {
  const stage = new blockLike.Stage();

  const backdrop = new blockLike.Backdrop();

  describe('addBackdrop()', () => {
    for (let i = 0; i < 5; i += 1) {
      stage.addBackdrop(new blockLike.Backdrop());
    }

    stage.addBackdrop(backdrop);

    it('should add a backdrop to the stage', () => {
      assert(stage.backdrops.length === 6);
    });
  });

  describe('switchBackdropTo()', () => {
    it('should switch to the the specified backdrop', () => {
      assert(stage.backdrop !== backdrop);
      stage.switchBackdropTo(backdrop);
      assert(stage.backdrop === backdrop);
    });
  });

  describe('switchBackdropToNum()', () => {
    it('should switch to the the specified backdrop', () => {
      const workonBackdrop = stage.backdrops[3];
      assert(stage.backdrop !== workonBackdrop);
      stage.switchBackdropToNum(3);
      assert(stage.backdrop === workonBackdrop);
    });
  });

  describe('nextBackdrop()', () => {
    it('should switch to the the specified backdrop', () => {
      const currentIndex = stage.backdrops.indexOf(stage.backdrop);
      stage.nextBackdrop(backdrop);
      assert(stage.backdrops.indexOf(stage.backdrop) === currentIndex + 1);
    });
  });

  describe('removeBackdrop()', () => {
    it('should remove the specified backdrop', () => {
      assert(stage.backdrops.indexOf(backdrop) !== -1);
      stage.removeBackdrop(backdrop);
      assert(stage.backdrops.indexOf(backdrop) === -1);
    });
    it('should change nothing when backdrop not found', () => {
      const workonBackdrop = new blockLike.Backdrop();
      const numOfBackdrops = stage.backdrops.length;
      assert(stage.backdrops.indexOf(workonBackdrop) === -1);
      stage.removeBackdrop(backdrop);
      assert(stage.backdrops.length === numOfBackdrops);
    });
  });

  describe('removeBackdropNum(3)', () => {
    it('should remove the specified backdrop', () => {
      const workonBackdrop = stage.backdrops[3];
      assert(stage.backdrops.indexOf(workonBackdrop) !== -1);
      stage.removeBackdropNum(3);
      assert(stage.backdrops.indexOf(workonBackdrop) === -1);
    });
    it('should change nothing when backdrop not found', () => {
      const numOfBackdrops = stage.backdrops.length;
      stage.removeBackdropNum(100);
      assert(stage.backdrops.length === numOfBackdrops);
    });
  });
});

describe('Stage CSS', () => {
  const stage = new blockLike.Stage();

  function resetBackdrops() { // eslint-disable-line require-jsdoc
    stage.classes = [];
    stage.addClass('rainbow');
    stage.addClass('unicorn');
    stage.addClass('big');
  }

  describe('css()', () => {
    it('it should add a css property to stage', () => {
      assert(stage.cssRules.length === 0);
      stage.css('color', 'red');
      assert(stage.cssRules.length === 1);
      assert(stage.cssRules[0].prop === 'color');
      assert(stage.cssRules[0].value === 'red');
    });
    it('it should accept a css object and add it to stage', () => {
      stage.css({ 'font-size': '16px', 'font-weight': 400 });
      assert(stage.cssRules.length === 3);
      assert(stage.cssRules[1].prop === 'font-size');
      assert(stage.cssRules[1].value === '16px');
      assert(stage.cssRules[2].prop === 'font-weight');
      assert(stage.cssRules[2].value === 400);
    });
    it('it should adjust camelCase css proips to dash-case', () => {
      stage.css({ lineHeight: '16px' });
      assert(stage.cssRules.length === 4);
      assert(stage.cssRules[3].prop === 'line-height');
      assert(stage.cssRules[3].value === '16px');
    });
  });
  describe('addClass()', () => {
    it('it should add a css class to stage', () => {
      resetBackdrops();
      stage.addClass('fluffy');
      assert(stage.classes.length === 4);
      assert(stage.classes[0] === 'rainbow');
      assert(stage.classes[3] === 'fluffy');
    });
  });
  describe('removeClass()', () => {
    it('it should remove css class from stage', () => {
      resetBackdrops();
      stage.removeClass('rainbow');
      assert(stage.classes.length === 2);
      assert(stage.classes[0] === 'unicorn');
    });
    it('should change nothing when class not found', () => {
      resetBackdrops();
      const numOfClasses = stage.classes.length;
      stage.removeClass('cat-on-wheels');
      assert(stage.classes.length === numOfClasses);
    });
  });
  describe('hasClass()', () => {
    it('it should return true if class is applied', () => {
      resetBackdrops();
      assert(stage.hasClass('rainbow') === true);
    });
    it('it should return false if class is not applied', () => {
      resetBackdrops();
      assert(stage.hasClass('blue') === false);
    });
  });
});

describe('Stage Zoom', () => {
  const stage = new blockLike.Stage();

  describe('zoom()', () => {
    it('should initilize to 100 and scale(1)', () => {
      assert(stage.magnification === 100);
      assert(stage.element.el.style.transform === 'scale(1)');
    });
    it('it should scale the stage element', () => {
      stage.zoom(200);
      assert(stage.element.el.style.transform === 'scale(2)');
      stage.zoom(50);
      assert(stage.element.el.style.transform === 'scale(0.5)');
    });
  });
});
