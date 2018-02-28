/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

// setup the jsdom document.
const el = document.createElement('div');
el.id = 'container';
document.body.appendChild(el);

describe('Stage Options', () => {
  const options = {
    pace: 100,
    width: 400,
    height: 300,
    parent: document.getElementById('container'),
    backdrop: new blockLike.Backdrop({ color: '#FFB6C1' }),
  };

  const stage = new blockLike.Stage(options);

  describe('width', () => {
    it('should be as set in options', () => {
      assert(stage.width === options.width);
    });
  });
  describe('height', () => {
    it('should be as set in options', () => {
      assert(stage.height === options.height);
    });
  });
  describe('pace', () => {
    it('should be as set in options', () => {
      assert(stage.pace === options.pace);
    });
  });
  describe('parent', () => {
    it('should be a DOM element as set in options', () => {
      assert(stage.element.el.parentElement.constructor.name === 'HTMLDivElement');
      assert(stage.element.el.parentElement === options.parent);
    });
  });
  describe('backdrop', () => {
    it('should be as set in options', () => {
      assert(stage.backdrop === options.backdrop);
    });
    it('should be a Backdrop object', () => {
      assert(stage.backdrop.constructor.name === 'Backdrop');
    });
    it('should replace the default backdrop', () => {
      assert(stage.backdrops.length === 1);
    });
  });
});
