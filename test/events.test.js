/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Event Methods', () => {
  const clickEvent = new window.MouseEvent('click');
  const keyEvent = new window.KeyboardEvent('keydown', { key: 'z', char: 'z', keyCode: 90 });

  describe('Stage whenFlag()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);


    window.gotEvent = false;
    stage.whenFlag(() => {
      window.gotEvent = true;
    });

    it('it should create a Flag element and show it', () => {
      assert(typeof stage.element.flag === 'object');
      assert(stage.element.flag.constructor.name === 'HTMLDivElement');
      assert(stage.element.flag.style.zIndex === '1000');
    });
    it('should capture a Flag click initiated by the stage', () => {
      stage.element.flag.dispatchEvent(clickEvent);
      assert(window.gotEvent === true);
    });
    it('should remove the Flag', () => {
      assert(stage.element.flag.style.zIndex === '-1');
    });
  });

  describe('Sprite whenFlag()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    window.gotEvent = false;
    sprite.whenFlag(() => {
      window.gotEvent = true;
    });

    it('it should create a Flag element', () => {
      assert(typeof sprite.element.flag === 'object');
      assert(sprite.element.flag.constructor.name === 'HTMLDivElement');
      assert(sprite.element.flag.style.zIndex === '1000');
    });
    it('should capture a Flag click initiated by a sprite', () => {
      sprite.element.flag.dispatchEvent(clickEvent);
      assert(window.gotEvent === true);
    });
    it('should remove the Flag', () => {
      assert(sprite.element.flag.style.zIndex === '-1');
    });
  });

  describe('whenClicked()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    it('should capture a click on the stage', () => {
      window.gotEvent = false;
      stage.whenClicked(() => {
        window.gotEvent = true;
      });

      stage.element.el.dispatchEvent(clickEvent);
      assert(window.gotEvent === true);
    });
    it('should capture a click on the sprite', () => {
      window.gotEvent = false;
      sprite.whenClicked(() => {
        window.gotEvent = true;
      });

      sprite.element.el.dispatchEvent(clickEvent);
      assert(window.gotEvent === true);
    });
  });

  describe('whenLoaded()', () => {
    const stage = new blockLike.Stage();

    it('should execute after all code is loaded', (done) => {
      window.gotEvent = false;
      stage.whenLoaded(() => {
        window.gotEvent = true;
        window.outOfEvent = 1;
      });

      window.outOfEvent = 0;

      setTimeout(() => {
        assert(window.gotEvent === true);
        assert(window.outOfEvent === 1);
        done();
      }, 100);
    });
  });

  describe('whenKeyPressed()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    it('should capture a pressed key when specified as letter', () => {
      window.gotEvent = false;
      stage.whenKeyPressed('z', () => {
        window.gotEvent = true;
      });

      document.dispatchEvent(keyEvent);
      assert(window.gotEvent === true);
    });

    it('should capture a pressed key when specified as code', () => {
      window.gotEvent = false;
      stage.whenKeyPressed(90, () => {
        window.gotEvent = true;
      });

      document.dispatchEvent(keyEvent);
      assert(window.gotEvent === true);
    });

    it('should capture a pressed key with both stage and sprites', () => {
      window.gotEventStage = false;
      stage.whenKeyPressed('z', () => {
        window.gotEventStage = true;
      });
      window.gotEventSprite = true;
      sprite.whenKeyPressed('z', () => {
        window.gotEventSprite = true;
      });

      document.dispatchEvent(keyEvent);
      assert(window.gotEventStage === true);
      assert(window.gotEventSprite === true);
    });
  });

  // TODO:
  // - rest of events
  // - apply
});
