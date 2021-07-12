/* global describe, it */
import * as blockLike from '../src/lib'

const assert = require('assert')

describe('backdrop Options', () => {
  const options = {
    color: '#ff0000',
    image: '../../images/bear_step.png'
  }

  const backdrop = new blockLike.Backdrop(options)

  describe('color', () => {
    it('should be as set in options', () => {
      assert(backdrop.color === options.color)
    })
  })
  describe('image', () => {
    it('should be as set in options', () => {
      assert(backdrop.image === options.image)
    })
  })
})
