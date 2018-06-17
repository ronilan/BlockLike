/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Sprite Sensing', () => {
  const stage = new blockLike.Stage();
  const backdrop = new blockLike.Backdrop({ color: 'red' });
  const emptyBackdrop = new blockLike.Backdrop();

  stage.addBackdrop(backdrop);
  stage.addBackdrop(emptyBackdrop);


  const sprite = new blockLike.Sprite();
  const otherSprite = new blockLike.Sprite();

  stage.addSprite(sprite);
  stage.addSprite(otherSprite);

  describe('distanceTo()', () => {
    it('it should return distance from one sprtie to a point on the screen', () => {
      sprite.goTo(0, 0);
      assert(sprite.distanceTo(0, 0) === 0);
      assert(sprite.distanceTo(100, 50) === Math.sqrt((100 * 100) + (50 * 50)));
      assert(sprite.distanceTo(50, 100) === Math.sqrt((100 * 100) + (50 * 50)));
      assert(sprite.distanceTo(-100, 50) === Math.sqrt((100 * 100) + (50 * 50)));
      assert(sprite.distanceTo(100, -50) === Math.sqrt((100 * 100) + (50 * 50)));
    });
  });

  describe('touching()', () => {
    it('it should return on what side a sprite is touching another', () => {
      sprite.goTo(0, 0);
      assert(sprite.touching(otherSprite) === 'left');
      sprite.goTo(35, 25);
      assert(sprite.touching(otherSprite) === 'left');
      sprite.goTo(25, 35);
      assert(sprite.touching(otherSprite) === 'bottom');
      sprite.goTo(-35, -25);
      assert(sprite.touching(otherSprite) === 'right');
      sprite.goTo(-25, -35);
      assert(sprite.touching(otherSprite) === 'top');
    });
    it('it should return null if not touching', () => {
      sprite.goTo(-200, -200);
      assert(sprite.touching(otherSprite) === null);
    });
  });

  describe('isTouching()', () => {
    it('it should return if a sprite is touching another', () => {
      sprite.goTo(35, 35);
      assert(sprite.isTouching(otherSprite) === true);
      sprite.goTo(-200, -200);
      assert(sprite.isTouching(otherSprite) === false);
    });
  });

  describe('touchingEdge()', () => {
    it('it should return what edge a sprite is touching', () => {
      sprite.goTo(stage.width, 0);
      assert(sprite.touchingEdge() === 'right');
      sprite.goTo(-stage.width, 0);
      assert(sprite.touchingEdge() === 'left');
      sprite.goTo(0, stage.height);
      assert(sprite.touchingEdge() === 'top');
      sprite.goTo(0, -stage.height);
      assert(sprite.touchingEdge() === 'bottom');
    });
    it('it should return null if not touching', () => {
      sprite.goTo(0, 0);
      assert(sprite.touchingEdge() === null);
    });
  });

  describe('isTouchingEdge()', () => {
    it('it should return if a sprite is an edge', () => {
      sprite.goTo(stage.width, 0);
      assert(sprite.isTouchingEdge() === true);
      sprite.goTo(0, 0);
      assert(sprite.isTouchingEdge() === false);
    });
  });

  describe('touchingBackdropColor()', () => {
    it('it should return what colors a sprite is touching', () => {
      stage.switchBackdropTo(backdrop);
      const backdropColors = sprite.touchingBackdropColor();
      assert(backdropColors.length === 1);
      assert(backdropColors[0] === '#ff0000');
    });


    it('it should return nothing when backdrop is empty', () => {
      stage.switchBackdropTo(emptyBackdrop);
      const backdropColors = sprite.touchingBackdropColor();
      assert(backdropColors.length === 0);
    });
  });

  describe('isTouchingBackdropColor()', () => {
    it('it should return if a sprite is touching a specified color', () => {
      stage.switchBackdropTo(backdrop);
      assert(sprite.isTouchingBackdropColor('#ff0000') === true);
      assert(sprite.isTouchingBackdropColor('#00ff00') === false);
    });
    it('it should not (at this point) be able to detect anything other than 6 char hex ', () => {
      stage.switchBackdropTo(backdrop);
      assert(sprite.isTouchingBackdropColor('#f00') === false);
      assert(sprite.isTouchingBackdropColor('red') === false);
    });
    it('it should return false when backdrop empty and testing for #000000', () => {
      stage.switchBackdropTo(emptyBackdrop);
      assert(sprite.isTouchingBackdropColor('#000000') === false);
    });
  });

  // TODO: add backdrop image tests
});
