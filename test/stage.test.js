/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('Stage', () => {
  const stage = new blockLike.Stage();

  it('should be a Stage object', () => {
    assert(stage.constructor.name === 'Stage');
  });

  describe('id', () => {
    it('should be a string that is of the following format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx', () => {
      assert(typeof stage.id === 'string');
      assert(stage.id.length === 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.length);
    });
  });
  describe('width', () => {
    it('should be equal to window width', () => {
      assert(stage.width === window.innerWidth);
    });
  });
  describe('height', () => {
    it('should be equal to window height', () => {
      assert(stage.height === window.innerHeight);
    });
  });
  describe('paced', () => {
    it('should have 16 default methods', () => {
      assert(stage.paced.length === 16);
    });
  });
  describe('waited', () => {
    it('should have 6 default methods', () => {
      assert(stage.waited.length === 6);
    });
  });
  describe('waitedReturned', () => {
    it('should have 2 default methods', () => {
      assert(stage.waitedReturned.length === 2);
    });
  });
  describe('pace', () => {
    it('should be 33 by default', () => {
      assert(stage.pace === 33);
    });
  });
  describe('sprites', () => {
    it('should be empty', () => {
      assert(stage.sprites.length === 0);
    });
  });
  describe('element', () => {
    it('should exist', () => {
      assert(typeof stage.element === 'object');
      assert(stage.element.constructor.name === 'StageElement');
    });
    it('should contain a DOM element', () => {
      assert(typeof stage.element.el === 'object');
      assert(stage.element.el.constructor.name === 'HTMLDivElement');
    });
    it('should contain a canvas element', () => {
      assert(typeof stage.element.canvas === 'object');
      assert(stage.element.canvas.constructor.name === 'HTMLCanvasElement');
    });
    it('should contain a flag DOM element', () => {
      assert(typeof stage.element.flag === 'object');
      assert(stage.element.flag.constructor.name === 'HTMLDivElement');
    });
    it('should contain a backdrop container canvas element', () => {
      assert(typeof stage.element.backdropContainer === 'object');
      assert(stage.element.backdropContainer.constructor.name === 'HTMLCanvasElement');
    });
    it('should have 2D canvas context set', () => {
      assert(typeof stage.element.context === 'object');
      assert(stage.element.context.constructor.name === 'CanvasRenderingContext2D');
    });
  });
  describe('parent', () => {
    it('should be the DOM Body element', () => {
      assert(stage.element.el.parentElement.constructor.name === 'HTMLBodyElement');
      assert(stage.element.el.parentElement === document.body);
    });
  });

  // TODO: add tests for mouse and key press events when sensing is enabled in options.

  describe('delete()', () => {
    it('should delete the stage', () => {
      stage.delete();
      assert(stage.element === null);
    });
  });
});

