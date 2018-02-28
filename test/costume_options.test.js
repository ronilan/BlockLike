/* global describe, it */
import * as blockLike from '../src/lib';

const assert = require('assert');

describe('costume Options', () => {
  const options = {
    width: 150,
    height: 200,
    color: '#ff0000',
    image: '../../images/bear_step.png',
  };

  const costume = new blockLike.Costume(options);

  const optionsColor = {
    width: 150,
    height: 200,
    color: '#ff0000',
  };
  const colorCostume = new blockLike.Costume(optionsColor);

  const optionsImage = {
    width: 150,
    height: 200,
    image: '../../images/bear_step.png',
  };
  const imageCostume = new blockLike.Costume(optionsImage);

  describe('width', () => {
    it('should be as set in options', () => {
      assert(costume.width === options.width);
    });
  });
  describe('height', () => {
    it('should be as set in options', () => {
      assert(costume.height === options.height);
    });
  });
  describe('image', () => {
    it('should be as set in options', () => {
      assert(imageCostume.image === optionsImage.image);
    });
    it('should not have a color if none is set', () => {
      assert(typeof imageCostume.color === 'undefined');
    });
  });
  describe('color', () => {
    it('should be as set in options', () => {
      assert(colorCostume.color === optionsColor.color);
    });
    it('should not have an image if none is set', () => {
      assert(typeof colorCostume.image === 'undefined');
    });
  });
});
