/* global describe, it */
import * as blockLike from '../src/lib'

const assert = require('assert')

describe('Sprite UI', () => {
  const stage = new blockLike.Stage()
  const sprite = new blockLike.Sprite()
  const otherSprite = new blockLike.Sprite()

  stage.addSprite(sprite)
  stage.addSprite(otherSprite)

  describe('think()', () => {
    it('it should create a think bubble', () => {
      sprite.think('I think therefore I am')
      assert(typeof sprite.textui === 'object')
      assert(sprite.textui.constructor.name === 'TextUiElement')
    })
    it('should contain a DOM element', () => {
      sprite.think('I think therefore I am')
      assert(typeof sprite.textui.el === 'object')
      assert(sprite.textui.el.constructor.name === 'HTMLDivElement')
    })
    it('should be styled like a think bubble', () => {
      sprite.think('I think therefore I am')
      assert(sprite.textui.el.className.indexOf('think') !== -1)
    })
    it('should contain the text specified', () => {
      sprite.think('I think therefore I am')
      assert(sprite.textui.el.innerHTML.indexOf('I think therefore I am') !== -1)
    })
    it('it should disappear when text is set to empty string', () => {
      sprite.think('')
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should disappear when text is ommited', () => {
      sprite.think()
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should replace old text with new text', () => {
      sprite.think('A')
      assert(sprite.textui.el.innerHTML.indexOf('A') !== -1)
      sprite.think('B')
      assert(sprite.textui.el.innerHTML.indexOf('A') === -1)
      assert(sprite.textui.el.innerHTML.indexOf('B') !== -1)
    })
    it('it should accept \' in text', () => {
      sprite.think('That\'s it!')
      assert(sprite.textui.el.innerHTML.indexOf('\'') !== -1)
    })
    it('it should accept " in text', () => {
      sprite.think('I say: "yay!"')
      assert(sprite.textui.el.innerHTML.indexOf('"') !== -1)
    })
    it('it should accept number as input text', () => {
      sprite.think(10)
      assert(sprite.textui.el.innerHTML.indexOf('10') !== -1)
    })
    it('it should accept 0 number as input text', () => {
      sprite.think(0)
      assert(sprite.textui.el.innerHTML.indexOf('0') !== -1)
    })
  })

  describe('say()', () => {
    it('it should create a speech bubble', () => {
      sprite.say('Hello World')
      assert(typeof sprite.textui === 'object')
      assert(sprite.textui.constructor.name === 'TextUiElement')
    })
    it('should contain a DOM element', () => {
      sprite.say('Hello World')
      assert(typeof sprite.textui.el === 'object')
      assert(sprite.textui.el.constructor.name === 'HTMLDivElement')
    })
    it('should be styled like a say bubble', () => {
      sprite.say('Hello World')
      assert(sprite.textui.el.className.indexOf('say') !== -1)
    })
    it('should contain the text specified', () => {
      sprite.say('Hello World')
      assert(sprite.textui.el.innerHTML.indexOf('Hello World') !== -1)
    })
    it('it should disappear when text is set to empty string', () => {
      sprite.say('')
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should disappear when text is ommited', () => {
      sprite.say()
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should replace old text with new text', () => {
      sprite.say('A')
      assert(sprite.textui.el.innerHTML.indexOf('A') !== -1)
      sprite.say('B')
      assert(sprite.textui.el.innerHTML.indexOf('A') === -1)
      assert(sprite.textui.el.innerHTML.indexOf('B') !== -1)
    })
    it('it should accept \' in text', () => {
      sprite.say('That\'s it!')
      assert(sprite.textui.el.innerHTML.indexOf('\'') !== -1)
    })
    it('it should accept " in text', () => {
      sprite.say('I say: "yay!"')
      assert(sprite.textui.el.innerHTML.indexOf('"') !== -1)
    })
    it('it should accept number as input text', () => {
      sprite.say(10)
      assert(sprite.textui.el.innerHTML.indexOf('10') !== -1)
    })
    it('it should accept 0 number as input text', () => {
      sprite.say(0)
      assert(sprite.textui.el.innerHTML.indexOf('0') !== -1)
    })
  })

  describe('ask()', () => {
    it('it should create a speech bubble', () => {
      sprite.ask('You OK?')
      assert(typeof sprite.textui === 'object')
      assert(sprite.textui.constructor.name === 'TextUiElement')
    })
    it('should contain a DOM element', () => {
      sprite.ask('You OK?')
      assert(typeof sprite.textui.el === 'object')
      assert(sprite.textui.el.constructor.name === 'HTMLDivElement')
    })
    it('should be styled like an ask bubble', () => {
      sprite.ask('You OK?')
      assert(sprite.textui.el.className.indexOf('ask') !== -1)
    })
    it('should contain the text specified', () => {
      sprite.ask('You OK?')
      assert(sprite.textui.el.innerHTML.indexOf('You OK?') !== -1)
    })
    it('it should disappear when text is set to empty string', () => {
      sprite.ask('')
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should disappear when text is ommited', () => {
      sprite.ask()
      assert(sprite.textui === null)
      assert(document.getElementsByClassName('block-script-say').length === 0)
    })
    it('it should replace old text with new text', () => {
      sprite.ask('A')
      assert(sprite.textui.el.innerHTML.indexOf('A') !== -1)
      sprite.ask('B')
      assert(sprite.textui.el.innerHTML.indexOf('A') === -1)
      assert(sprite.textui.el.innerHTML.indexOf('B') !== -1)
    })
    it('it should accept \' in text', () => {
      sprite.ask('What\'s your name?')
      assert(sprite.textui.el.innerHTML.indexOf('\'') !== -1)
    })
    it('it should accept " in text', () => {
      sprite.ask('Do you agree on: "yay!"')
      assert(sprite.textui.el.innerHTML.indexOf('"') !== -1)
    })
    it('it should accept number as input text', () => {
      sprite.ask(10)
      assert(sprite.textui.el.innerHTML.indexOf('10') !== -1)
    })
    it('it should accept 0 number as input text', () => {
      sprite.ask(0)
      assert(sprite.textui.el.innerHTML.indexOf('0') !== -1)
    })
    // TODO: add the tests for user input capture
  })
})
