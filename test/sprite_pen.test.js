/* global describe, it */
import * as blockLike from '../src/lib'

const assert = require('assert')

describe('Sprite Pen', () => {
  const stage = new blockLike.Stage()
  const sprite = new blockLike.Sprite()
  const otherSprite = new blockLike.Sprite()

  stage.addSprite(sprite)
  stage.addSprite(otherSprite)

  describe('penDown()', () => {
    it('it should set prep sprite for drawing', () => {
      sprite.penDown()
      assert(sprite.drawing === true)
      assert(sprite.prevX === 0)
      assert(sprite.prevY === 0)
      sprite.goTo(100, 100)
      assert(sprite.x - sprite.prevX === 100)
      assert(sprite.y - sprite.prevY === 100)
      sprite.goTo(200, 200)
      assert(sprite.x - sprite.prevX === 100)
      assert(sprite.y - sprite.prevY === 100)
    })
  })

  describe('setPenSize()', () => {
    it('it should set the size of the pen', () => {
      sprite.setPenSize(5)
      assert(sprite.penSize === 5)
      sprite.setPenSize(1)
      assert(sprite.penSize === 1)
    })
  })

  describe('changePenSize()', () => {
    it('it should change the size of the pen', () => {
      sprite.changePenSize(1)
      assert(sprite.penSize === 2)
      sprite.changePenSize(2)
      assert(sprite.penSize === 4)
      sprite.changePenSize(-3)
      assert(sprite.penSize === 1)
    })
  })

  describe('setPenColor()', () => {
    it('it should change the color of the pen', () => {
      sprite.setPenColor('red')
      assert(sprite.penColor === 'red')
      sprite.setPenColor('#00ff00')
      assert(sprite.penColor === '#00ff00')
    })
  })

  // TODO: real tests with image diff
})
