/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Stage Sprites', () => {
  const stage = new blockLike.Stage();
  const sprite = new blockLike.Sprite();

  describe('addSprite()', () => {
    stage.addSprite(sprite);

    for (let i = 0; i < 5; i += 1) {
      stage.addSprite(new blockLike.Sprite());
    }

    it('should add a sprite to the stage', () => {
      assert(stage.sprites.length === 6);
    });
    it('should inform sprite of Canvas', () => {
      assert(sprite.surface.constructor.name === 'StageSurface');
    });
    it('should create the sprite DOM Element', () => {
      assert(typeof sprite.element.el === 'object');
      assert(sprite.element.el.constructor.name === 'HTMLDivElement');
    });
  });

  describe('sendSpriteToFront()', () => {
    it('should bring the sprite to the front of the "pile"', () => {
      stage.sendSpriteToFront(sprite);
      assert(stage.sprites.indexOf(sprite) === stage.sprites.length - 1);
    });

    it('should not bring a sprite to the front if it is not added to stage', () => {
      const offStageSprite = new blockLike.Sprite();
      stage.sendSpriteToFront(offStageSprite);
      assert(stage.sprites.indexOf(offStageSprite) === -1);
      assert(stage.sprites.indexOf(sprite) === stage.sprites.length - 1);
    });
  });

  describe('sendSpriteToBack()', () => {
    it('should send the sprite to the back of the "pile"', () => {
      stage.sendSpriteToBack(sprite);
      assert(stage.sprites.indexOf(sprite) === 0);
    });

    it('should not send the sprite to the back if it is not added to stage', () => {
      const offStageSprite = new blockLike.Sprite();
      stage.sendSpriteToBack(offStageSprite);
      assert(stage.sprites.indexOf(offStageSprite) === -1);
      assert(stage.sprites.indexOf(sprite) === 0);
    });
  });

  describe('sendSpriteForward()', () => {
    it('should move the sprite one place up the "pile"', () => {
      stage.sendSpriteToBack(sprite);
      stage.sendSpriteForward(sprite);
      stage.sendSpriteForward(sprite);
      assert(stage.sprites.indexOf(sprite) === 2);
    });

    it('should not move the sprite if it is not added to stage', () => {
      const offStageSprite = new blockLike.Sprite();
      stage.sendSpriteForward(offStageSprite);
      assert(stage.sprites.indexOf(offStageSprite) === -1);
      assert(stage.sprites.indexOf(sprite) === 2);
    });
  });

  describe('sendSpriteBackwords()', () => {
    it('should move the sprite one place down the "pile"', () => {
      stage.sendSpriteToFront(sprite);
      stage.sendSpriteBackwards(sprite);
      stage.sendSpriteBackwards(sprite);
      assert(stage.sprites.indexOf(sprite) === (stage.sprites.length - 1) - 2);
    });

    it('should not move the sprite if it is not added to stage', () => {
      const offStageSprite = new blockLike.Sprite();
      stage.sendSpriteBackwards(offStageSprite);
      assert(stage.sprites.indexOf(offStageSprite) === -1);
      assert(stage.sprites.indexOf(sprite) === (stage.sprites.length - 1) - 2);
    });
  });

  describe('removeSprite()', () => {
    it('should remove the sprite from the stage', () => {
      assert(stage.sprites.length === 6);
      stage.removeSprite(sprite);
      assert(stage.sprites.length === 5);
      assert(sprite.element === null);
    });

    it('should not remove the sprite if it is not added to stage', () => {
      const offStageSprite = new blockLike.Sprite();
      assert(stage.sprites.length === 5);
      stage.removeSprite(offStageSprite);
      assert(stage.sprites.length === 5);
      assert(sprite.element === null);
    });
  });
});
