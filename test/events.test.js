/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Event Methods', () => {
  const clickEvent = new window.MouseEvent('click');
  // const keyEvent = new window.KeyboardEvent('keydown', { key: 'z', char: 'z', keyCode: 90 });

  describe('Stage whenFlag()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    stage.whenFlag(() => {
      this.gotEvent = true;
    });

    it('it should create a Flag element and show it', () => {
      assert(typeof stage.element.flag === 'object');
      assert(stage.element.flag.constructor.name === 'HTMLDivElement');
      assert(stage.element.flag.style.zIndex === '1000');
    });
    it('should capture a Flag click initiated by the stage', () => {
      stage.element.flag.dispatchEvent(clickEvent);
      assert(stage.gotEvent === true); // eslint-disable-line no-undef
    });
    it('should remove the Flag', () => {
      assert(stage.element.flag.style.zIndex === '-1');
    });
  });

  describe('Sprite whenFlag()', () => {
    const stage = new blockLike.Stage();
    const sprite = new blockLike.Sprite();

    stage.addSprite(sprite);

    sprite.whenFlag(() => {
      this.gotEvent = true;
    });

    it('it should create a Flag element', () => {
      assert(typeof sprite.element.flag === 'object');
      assert(sprite.element.flag.constructor.name === 'HTMLDivElement');
      assert(sprite.element.flag.style.zIndex === '1000');
    });
    it('should capture a Flag click initiated by a sprite', () => {
      sprite.element.flag.dispatchEvent(clickEvent);
      assert(sprite.gotEvent === true);
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
      stage.whenClicked(() => {
        this.gotEvent = true;
      });

      stage.element.el.dispatchEvent(clickEvent);
      assert(stage.gotEvent === true);
    });
    it('should capture a click on the sprite', () => {
      sprite.whenClicked(() => {
        this.gotEvent = true;
      });

      sprite.element.el.dispatchEvent(clickEvent);
      assert(sprite.gotEvent === true);
    });
  });

  // TODO:
  // - solve keyboard
  // - rest of events
  // - apply
});
