/* global describe, it */
import * as blockLike from '../src/lib'

const assert = require('assert')

describe('Sprite Clone', () => {
  const stage = new blockLike.Stage()
  const sprite = new blockLike.Sprite()

  sprite.addTo(stage)

  for (let i = 0; i < 5; i += 1) {
    sprite.addCostume(new blockLike.Costume())
  }

  const costume = new blockLike.Costume()

  costume.addTo(sprite)

  sprite.addClass('sprite-class-1')
  sprite.addClass('sprite-class-2')

  sprite.css({ 'line-height': '16px', color: 'red' })

  costume.addClass('costume-class-1')
  costume.addClass('costume-class-2')

  costume.css({ 'font-size': '16px', 'font-weight': 400 })

  sprite.goTo(100, 100)
  sprite.pointInDirection(45)

  const clone = sprite.clone()

  describe('clone()', () => {
    it('should create a clone the sprite', () => {
      assert(clone.constructor.name === 'Sprite')
    })
    it('should create a clone with unique id', () => {
      assert(clone.id !== sprite.id)
    })
    it('should create a clone with sprite properties', () => {
      assert(clone.x === sprite.x)
      assert(clone.y === sprite.y)
      assert(clone.z === sprite.z)
      assert(clone.prevX === sprite.prevX)
      assert(clone.prevY === sprite.prevY)
    })
    it('should give clone same looking costume', () => {
      assert(clone.costume.width === sprite.x)
      assert(clone.costume.height === sprite.x)
      assert(clone.costume.color === sprite.costume.color)
      assert(clone.costume.image === sprite.costume.image)
    })
    it('should have own costumes', () => {
      assert(clone.costumes[0] !== sprite.costumes[0])
    })
    it('should give clone same number of costumes', () => {
      assert(clone.costumes.length === sprite.costumes.length)
    })

    it('should have own css classes', () => {
      assert(clone.classes !== sprite.classes)
    })
    it('should give clone same css classes values as sprite', () => {
      assert(clone.classes[0] === sprite.classes[0])
      assert(clone.classes[1] === sprite.classes[1])
    })
    it('should have own cssRules classes', () => {
      assert(clone.cssRules !== sprite.cssRules)
    })
    it('should give clone same css rules values as sprite', () => {
      assert(clone.cssRules[0]['line-height'] === sprite.cssRules[0]['line-height'])
      assert(clone.cssRules[1].color === sprite.cssRules[1].color)
    })

    it('should have clone costumes with own css classes', () => {
      const lastSpriteCostume = sprite.costumes[sprite.costumes.length - 1]
      const lastCloneCostume = clone.costumes[clone.costumes.length - 1]

      assert(lastCloneCostume.classes !== lastSpriteCostume.classes)
    })
    it('should give clone costume same css classes values as sprite costume', () => {
      const lastSpriteCostume = sprite.costumes[sprite.costumes.length - 1]
      const lastCloneCostume = clone.costumes[clone.costumes.length - 1]

      assert(lastCloneCostume.classes[0] === lastSpriteCostume.classes[0])
      assert(lastCloneCostume.classes[1] === lastSpriteCostume.classes[1])
    })

    it('should have clone costumes with own css rules', () => {
      const lastSpriteCostume = sprite.costumes[sprite.costumes.length - 1]
      const lastCloneCostume = clone.costumes[clone.costumes.length - 1]

      assert(lastCloneCostume.cssRules !== lastSpriteCostume.cssRules)
    })
    it('should give clone costume same css rules values as sprite costume', () => {
      const lastSpriteCostume = sprite.costumes[sprite.costumes.length - 1]
      const lastCloneCostume = clone.costumes[clone.costumes.length - 1]

      assert(lastCloneCostume.cssRules[0]['font-size'] === lastSpriteCostume.cssRules[0]['font-size'])
      assert(lastCloneCostume.cssRules[1]['font-weight'] === lastSpriteCostume.cssRules[1]['font-weight'])
    })

    it('should move independently', () => {
      clone.goTo(-100, -100)
      assert(clone.x !== sprite.x)
      assert(clone.y !== sprite.y)
      assert(clone.prevX !== sprite.prevX)
      assert(clone.prevY !== sprite.prevY, sprite.prevY)
    })
    it('should control costumes independently', () => {
      clone.removeCostumeNum(0)
      assert(clone.costumes.length !== sprite.costumes.length)
    })
    it('should change costumes independently', () => {
      clone.switchCostumeToNum(5)
      assert(clone.costume !== sprite.costume)
    })
    it('should change css classes independently', () => {
      clone.removeClass('sprite-class-2')
      assert(clone.classes.length === 1)
      assert(clone.classes.length !== sprite.classes.length)
    })
    it('should change costume css classes independently', () => {
      const lastSpriteCostume = sprite.costumes[sprite.costumes.length - 1]
      const lastCloneCostume = clone.costumes[clone.costumes.length - 1]

      lastCloneCostume.removeClass('costume-class-2')
      assert(lastCloneCostume.classes.length === 1)
      assert(lastCloneCostume.classes.length !== lastSpriteCostume.classes.length)
    })
  })
})
