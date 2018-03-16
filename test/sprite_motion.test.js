/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Sprite Motion', () => {
  function resetSprite(s) { // eslint-disable-line require-jsdoc
    s.pointInDirection(90);
    s.goTo(0, 0);
  }

  const stage = new blockLike.Stage();
  const sprite = new blockLike.Sprite();
  const otherSprite = new blockLike.Sprite();

  stage.addSprite(sprite);
  stage.addSprite(otherSprite);

  describe('goTo()', () => {
    it('should change x and y to specified values', () => {
      resetSprite(sprite);
      sprite.goTo(134, 157);

      assert(sprite.x === 134);
      assert(sprite.y === 157);
    });
  });

  describe('move()', () => {
    it('should change only x when pointing right', () => {
      resetSprite(sprite);
      sprite.move(100);

      assert(sprite.x === 100);
      assert(sprite.y === 0);
    });
    it('should change only y when pointing up', () => {
      resetSprite(sprite);
      sprite.pointInDirection(0);
      sprite.move(100);

      assert(sprite.x === 0);
      assert(sprite.y === 100);
    });
    it('should change x and y based on calculated value', () => {
      resetSprite(sprite);
      sprite.pointInDirection(45);
      sprite.move(100);

      assert(sprite.x === 71);
      assert(sprite.y === 71);
    });
  });

  describe('changeX()', () => {
    it('should change only x', () => {
      resetSprite(sprite);
      sprite.changeX(100);

      assert(sprite.x === 100);
      assert(sprite.y === 0);
    });
  });

  describe('changeY()', () => {
    it('should change only y', () => {
      resetSprite(sprite);
      sprite.changeY(100);

      assert(sprite.x === 0);
      assert(sprite.y === 100);
    });
  });

  describe('setX()', () => {
    it('should set only x', () => {
      resetSprite(sprite);
      sprite.changeX(100);
      sprite.setX(-11);

      assert(sprite.x === -11);
      assert(sprite.y === 0);
    });
  });

  describe('setY()', () => {
    it('should set only y', () => {
      resetSprite(sprite);
      sprite.changeY(100);
      sprite.setY(-11);

      assert(sprite.x === 0);
      assert(sprite.y === -11);
    });
  });

  describe('turnRight()', () => {
    it('should change direction by adding to it', () => {
      resetSprite(sprite);

      sprite.turnRight(100);
      assert(sprite.direction === 190);

      sprite.turnRight(100);
      assert(sprite.direction === 290);

      sprite.turnRight(200);
      assert(sprite.direction === 130);
    });
  });

  describe('turnLeft()', () => {
    it('should change direction by substructing from it', () => {
      resetSprite(sprite);

      sprite.turnLeft(100);
      assert(sprite.direction === 350);

      sprite.turnLeft(100);
      assert(sprite.direction === 250);

      sprite.turnLeft(200);
      assert(sprite.direction === 50);

      sprite.turnLeft(100);
      assert(sprite.direction === 310);
    });
  });

  describe('pointInDirection()', () => {
    it('should point in direction between 0 and 360 for all inputs', () => {
      resetSprite(sprite);

      sprite.pointInDirection(100);
      assert(sprite.direction === 100);

      sprite.pointInDirection(-100);
      assert(sprite.direction === 260);

      sprite.pointInDirection(460);
      assert(sprite.direction === 100);

      sprite.pointInDirection(-460);
      assert(sprite.direction === 260);
    });
  });

  describe('pointTowards()', () => {
    it('should point in direction of another sprite', () => {
      resetSprite(sprite);
      resetSprite(otherSprite);

      otherSprite.goTo(100, 100);
      sprite.pointTowards(otherSprite);
      assert(sprite.direction === 45);


      otherSprite.goTo(0, 100);
      sprite.pointTowards(otherSprite);
      assert(sprite.direction === 0);

      otherSprite.goTo(0, -100);
      sprite.pointTowards(otherSprite);
      assert(sprite.direction === 180);

      otherSprite.goTo(100, 0);
      sprite.pointTowards(otherSprite);
      assert(sprite.direction === 90);

      otherSprite.goTo(-100, 0);
      sprite.pointTowards(otherSprite);
      assert(sprite.direction === 270);
    });
  });

  describe('setRotationStyle()', () => {
    it('should set rotation styles using text values', () => {
      resetSprite(sprite);
      sprite.setRotationStyle('no');
      assert(sprite.rotationStyle === 2);

      sprite.setRotationStyle('left-right');
      assert(sprite.rotationStyle === 1);

      sprite.setRotationStyle('all');
      assert(sprite.rotationStyle === 0);
    });
    it('should set rotation styles using number values', () => {
      resetSprite(sprite);
      sprite.setRotationStyle(2);
      assert(sprite.rotationStyle === 2);

      sprite.setRotationStyle(1);
      assert(sprite.rotationStyle === 1);

      sprite.setRotationStyle(0);
      assert(sprite.rotationStyle === 0);
    });
    // TODO: add "should" for element CSS?
  });

  describe('glide()', () => {
    it('should change x and y to specified values, after specified number of seconds', (done) => {
      const startAt = Date.now();
      const sec = 0.5;

      sprite.pointInDirection(90);
      sprite.goTo(0, 0);
      sprite.glide(sec, 100, 100);

      setTimeout(() => {
        assert(sprite.x === 100);
        assert(sprite.y === 100);
        assert(Date.now() - startAt > 1000);
        done();
      }, (sec * 1000) + 500);
    });
  });
});
