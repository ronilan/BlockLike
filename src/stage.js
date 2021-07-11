import Entity from './entity'

import StageElement from './stage-element'
import StageSurface from './stage-surface'
import SpriteElement from './sprite-element'

import sensing from './stage-sensing'

/**
 * Class representing a Stage.
 * @extends Entity
 *
 * @example
 * let stage = new blockLike.Stage();
 *
 * @example
 * let stage = new blockLike.Stage({
 *   width: 600,
 *   height: 400,
 *   pace: 16,
 *   sensing: true,
 *   parent: document.getElementById('stage-wrap'),
 *   backdrop: new blockLike.Backdrop({color: '#FFB6C1'})
 * });
 */
export default class Stage extends Entity {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} options - Options for the Stage.
  * @param {number} options.width - The stage width in pixels. Default is full window.
  * @param {number} options.height - The stage height in pixels. Default is full window.
  * @param {number} options.pace - The number of milliseconds to wait for each paced method.  Will disable pacing when set to zero.
  * @param {object} options.parent - The DOM element into which the stage will be inserted. Default is the body.
  * @param {object} options.backdrop - A default Backdrop.
  * @param {boolean} options.sensing - Enables sensing of mouse location and what keys pressed.
  * If true, will constantly update stage properties: mouseX, mouseY, keysKeyCode, keysKeyCode and keysCode based on user input.
  */
  constructor (options = {}) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
      parent: document.body,
      pace: 33,
      backdrop: null
    }
    const actual = { ...defaults, ...options }

    super(actual.pace)

    // backdrops
    this.backdrops = []

    if (actual.backdrop) {
      this.backdrop = actual.backdrop
      this.backdrops.push(this.backdrop)
    }

    this.element = new StageElement(actual, this)
    this.width = actual.width
    this.height = actual.height

    this.keysCode = []
    this.keysKey = []
    this.keysKeyCode = []

    this.sprites = []

    this.magnification = 100

    this.cssRules = []
    this.classes = []

    this.mouseDown = null
    this.mouseX = null
    this.mouseY = null

    actual.sensing ? sensing(this) : null

    this.element.update(this)
  }

  /**
  * delete - Deletes the stage element.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.delete();
  */
  delete () {
    this.element = this.element.delete(this)
  }

  /** Setup Actions * */

  /**
  * addSprite - Adds a sprite to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  *
  * @param {object} sprite - the sprite to add.
  */
  addSprite (sprite) {
    const curSprite = sprite

    curSprite.element = new SpriteElement(sprite, this)
    curSprite.surface = new StageSurface(this)

    curSprite.element.flag = this.element.flag
    curSprite.againstBackdrop = this.element.backdropContainer

    curSprite.stageWidth = this.width
    curSprite.stageHeight = this.height

    this.sprites.push(curSprite)
    curSprite.z = this.sprites.length

    sprite.element.update(curSprite)
  }

  /**
  * removeSprite - Removes a sprite from the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.removeSprite(sprite);
  *
  * @param {object} sprite - the sprite to add.
  */
  removeSprite (sprite) {
    const curSprite = sprite
    this.sprites = this.sprites.filter((item) => item !== sprite)
    curSprite.element ? curSprite.element = curSprite.element.delete(curSprite) : null
  }

  /** looks * */

  /**
  * addBackdrop - Adds a backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  *
  * @param {object} backdrop - the backdrop to add.
  */
  addBackdrop (backdrop) {
    this.backdrops.push(backdrop)
    // if "bare" set the added as active
    !this.backdrop ? this.backdrop = this.backdrops[0] : null
    this.element ? this.element.update(this) : null
  }

  /**
  * switchBackdropTo - Switches to specified backdrop. If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.switchBackdropTo(backdrop);
  *
  * @param {object} backdrop - the backdrop to switch too.
  */
  switchBackdropTo (backdrop) {
    const currentBackdropIndex = this.backdrops.indexOf(backdrop)
    currentBackdropIndex !== -1 ? this.backdrop = this.backdrops[currentBackdropIndex] : null

    this.element ? this.element.update(this) : null
  }

  /**
  * switchBackdropToNum - Switches to specified backdrop by number of current (0 is first). If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.switchBackdropToNum(1);
  *
  * @param {number} index - the backdrop to switch too.
  */
  switchBackdropToNum (index) {
    this.switchBackdropTo(this.backdrops[index])
  }

  /**
  * nextBackdrop - Switches to the next backdrop.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.nextBackdrop();
  */
  nextBackdrop () {
    const currentBackdropIndex = this.backdrops.indexOf(this.backdrop)
    this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length]

    this.element ? this.element.update(this) : null
  }

  /**
  * removeBackdrop - Removes a backdrop.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.removeBackdrop(backdrop);
  *
  * @param {object} backdrop - the backdrop to remove.
  */
  removeBackdrop (backdrop) {
    if (this.backdrops.length > 1) {
      const currentBackdropIndex = this.backdrops.indexOf(backdrop)
      this.backdrop === backdrop ? this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length] : null
      this.backdrops = this.backdrops.filter((item) => item !== backdrop)
    } else {
      this.backdrops = []
      this.backdrop = null
    }
    this.element ? this.element.update(this) : null
  }

  /**
  * removeBackdropNum - Removes the specified backdrop by number of current (0 is first).
  * If there is only one backdrop, will fail and emit a console message.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * stage.addBackdrop(backdrop);
  * stage.removeBackdropNum(1);
  *
  * @param {number} index - the backdrop to remove.
  */
  removeBackdropNum (index) {
    this.removeBackdrop(this.backdrops[index])
  }

  /**
  * refresh - Forces a sprite refresh.
  * Note: service method to be used if costume was manipulated directly.
  */
  refresh () {
    this.element ? this.element.update(this) : null
  }

  /**
  * zoom - zooms the stage to the specified percentage number.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.zoom(150);
  *
  * @param {number} percent - the percentage to set.
  */
  zoom (percent) {
    this.magnification = percent
    this.element.update(this)
  }

  /** Sprites * */

  /**
  * _refreshSprites - Refresh the DOM element of all sprites currently on stage.
  *
  * @private
  * @param {number} index - the backdrop to switch too.
  */
  _refreshSprites () {
    let i = 0
    this.sprites.forEach((item) => {
      const sprite = item
      i += 1
      sprite.z = i
      sprite.element ? sprite.element.update(sprite) : null
    })
  }

  /**
  * sendSpriteBackwards - Moves the sprite one place down the "pile".
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteBackwards(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteBackwards (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index > 0) {
      this.sprites[index] = this.sprites[index - 1] // move one up
      this.sprites[index - 1] = sprite // me subject down
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteForward - Moves the sprite one place up in the "pile".
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteForward(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteForward (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index < this.sprites.length - 1 && index !== -1) {
      this.sprites[index] = this.sprites[index + 1] // move one down
      this.sprites[index + 1] = sprite // me subject up
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteToFront - Brings the sprite to the front of the "pile"
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteToFront(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteToFront (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index !== -1) {
      this.sprites.splice(index, 1)
      this.sprites.push(sprite)
    }
    this._refreshSprites()
  }

  /**
  * sendSpriteToBack - Sends the sprite to the back of the "pile"
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * stage.addSprite(sprite);
  * stage.whenFlag( function() {
  *   this.sendSpriteToBack(sprite);
  * });
  *
  * @param {object} sprite - the sprite to move.
  */
  sendSpriteToBack (sprite) {
    const index = this.sprites.indexOf(sprite)
    if (index !== -1) {
      this.sprites.splice(index, 1)
      this.sprites.unshift(sprite)
    }
    this._refreshSprites()
  }

  /* sensing */

  /**
  * isKeyPressed - Checks if a key is pressed. Stage sensing must be enabled.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.say(stage.isKeyPressed('a'));
  *
  * @param {string} userKey - the key pressed. May be the code or the character itself (A or 65)
  * @param {function} func - a function to rewrite and execute.
  */
  isKeyPressed (userKey) {
    let match = false
    let check

    typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey
    // Make sure each property is supported by browsers.
    // Note: user may write incompatible code.
    this.keysKey.indexOf(check) !== -1 ? match = true : null
    this.keysCode.indexOf(check) !== -1 ? match = true : null
    this.keysKeyCode.indexOf(check) !== -1 ? match = true : null

    !this.sensing ? console.log('BlockLike.js Notice: isKeyPressed() ingnored. Stage sensing not enabled.') : null // eslint-disable-line no-console

    return match
  }
}
