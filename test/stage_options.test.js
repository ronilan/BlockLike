/* global describe, it */
import * as blockLike from '../src/lib'

const assert = require('assert')

// setup the jsdom document.
const el = document.createElement('div')
el.id = 'container'
document.body.appendChild(el)

describe('Stage Options', () => {
  const options = {
    pace: 100,
    width: 400,
    height: 300,
    parent: document.getElementById('container'),
    backdrop: new blockLike.Backdrop({ color: '#FFB6C1' }),
    sensing: true
  }

  const stage = new blockLike.Stage(options)

  describe('width', () => {
    it('should be as set in options', () => {
      assert(stage.width === options.width)
    })
  })
  describe('height', () => {
    it('should be as set in options', () => {
      assert(stage.height === options.height)
    })
  })
  describe('pace', () => {
    it('should be as set in options', () => {
      assert(stage.pace === options.pace)
    })
  })
  describe('parent', () => {
    it('should be a DOM element as set in options', () => {
      assert(stage.element.el.parentElement.constructor.name === 'HTMLDivElement')
      assert(stage.element.el.parentElement === options.parent)
    })
    it('should set stage top and bottom margins to 0', () => {
      assert(stage.element.el.style.margin === '0px auto')
    })
  })
  describe('backdrop', () => {
    it('should be as set in options', () => {
      assert(stage.backdrop === options.backdrop)
    })
    it('should be a Backdrop object', () => {
      assert(stage.backdrop.constructor.name === 'Backdrop')
    })
    it('should replace the default backdrop', () => {
      assert(stage.backdrops.length === 1)
    })
  })
  describe('sensing', () => {
    it('should initilize mouseX and mouseY as null', () => {
      assert(stage.mouseX === null)
      assert(stage.mouseY === null)
    })
    it('should update mouseX and mouseY on mousemove', () => {
      const event = new window.MouseEvent('mousemove', { clientX: 25, clientY: 50 })
      stage.element.el.dispatchEvent(event)
      assert(stage.mouseX === -(stage.width / 2) + 25)
      assert(stage.mouseY === (stage.height / 2) - 50)
    })
    it('should initilize mouseDown as null', () => {
      assert(stage.mouseDown === null)
    })
    it('should detect when mouse is down', () => {
      const event = new window.MouseEvent('mousedown')
      stage.element.el.dispatchEvent(event)
      assert(stage.mouseDown === true)
    })
    it('should detect when mouse is up', () => {
      const event = new window.MouseEvent('mouseup')
      stage.element.el.dispatchEvent(event)
      assert(stage.mouseDown === false)
    })
    it('should detect when screen is touched', () => {
      const event = new window.TouchEvent('touchstart', { touches: [{ clientX: 0, clientY: 0 }] })
      stage.element.el.dispatchEvent(event)
      assert(stage.mouseDown === true)
    })
    it('should detect when screen is no longer touched', () => {
      const event = new window.TouchEvent('touchend', { touches: [{ clientX: 0, clientY: 0 }] })
      stage.element.el.dispatchEvent(event)
      assert(stage.mouseDown === false)
      assert(stage.mouseX === null)
      assert(stage.mouseY === null)
    })
    it('should update mouseX and mouseY on touchmove', () => {
      const event = new window.TouchEvent('touchmove', { changedTouches: [{ clientX: 25, clientY: 50 }] })
      stage.element.el.dispatchEvent(event)

      assert(stage.mouseX === -(stage.width / 2) + 25)
      assert(stage.mouseY === (stage.height / 2) - 50)
    })
    it('should detect when a key is pressed', () => {
      const event = new window.KeyboardEvent('keydown', { key: 'z', char: 'z', keyCode: 90 })
      document.dispatchEvent(event)
      // note: jsdom leave code property empty. uses keyCode.
      assert(stage.keysKeyCode[0] === 90)
      assert(stage.keysKey[0] === 'z')
    })
    it('should detect when a two keys are pressed', () => {
      const event = new window.KeyboardEvent('keydown', { key: 'z', char: 'z', keyCode: 90 })
      const anotherEvent = new window.KeyboardEvent('keydown', { key: 'x', char: 'x', keyCode: 89 })
      document.dispatchEvent(event)
      document.dispatchEvent(anotherEvent)

      assert(stage.keysKeyCode.length === 2)
      assert(stage.keysKeyCode[0] === 90)
      assert(stage.keysKey[0] === 'z')
      assert(stage.keysKeyCode[1] === 89)
      assert(stage.keysKey[1] === 'x')
    })
    it('should detect when a key is released', () => {
      const event = new window.KeyboardEvent('keydown', { key: 'z', char: 'z', keyCode: 90 })
      const anotherEvent = new window.KeyboardEvent('keydown', { key: 'x', char: 'x', keyCode: 89 })
      document.dispatchEvent(event)
      document.dispatchEvent(anotherEvent)

      assert(stage.keysKeyCode.length === 2)
      const releaseEvent = new window.KeyboardEvent('keyup', { key: 'z', char: 'z', keyCode: 90 })

      document.dispatchEvent(releaseEvent)
      assert(stage.keysKeyCode.length === 1)
      assert(stage.keysKeyCode[0] === 89)
      assert(stage.keysKey[0] === 'x')
    })
  })
})
