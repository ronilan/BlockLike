/**
 * Class representing the UI Elements attached to a sprite.
 * Each Sprite may have one.
 * @private
 */
export default class TextUiElement {
  /**
  * constructor - Creates a ui element that "attahces" to a sprite.
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  * @param {string} type - what ui to create (say bubble, think bubble or ask box)
  * @param {string} text -  what the text said/thought/ask will be.
  * @param {object} askId - the ask box identifier (used to manage events).
  */
  constructor (sprite, type, text) {
    const el = document.createElement('div')
    /**
    * askInput - encapsulate the functionality of the input field used to capture user input with ask().
    *
    * @return {object} - the input dom element.
    */
    function askInput () {
      /**
      * sendAnswer - dispatches an event when the user has submitted the input.
      */
      function sendAnswer (value) {
        const event = new window.CustomEvent(`blockLike.ask.${sprite.id}.${sprite.askId}`, { detail: { value, askId: sprite.askId } })
        document.dispatchEvent(event)
      }

      const input = document.createElement('input')
      input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          sendAnswer(input.value)
          input.value = ''
        }
      })
      el.appendChild(input)

      const submit = document.createElement('button')
      submit.innerHTML = '&#x2713'
      submit.addEventListener('click', () => {
        sendAnswer(input.value)
        input.value = ''
      })
      el.appendChild(submit)

      return input
    }

    this.text = text.toString()
    this.type = type

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2)
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2)

    el.style.position = 'absolute'
    el.innerHTML = `${text}<br />`

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`

    el.style.zIndex = sprite.z
    el.className = `blocklike-${type}`

    let iel = null
    if (type === 'ask') {
      iel = askInput(sprite, el)
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`
    }

    sprite.element.el.parentNode.insertBefore(el, sprite.element.el)
    iel ? iel.focus() : null

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`

    this.el = el
  }

  /**
  * update - updated the DOM element (moves with sprite).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  update (sprite) {
    const el = sprite.textui.el

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2)
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2)

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`

    if (sprite.textui.type === 'ask') {
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`
    }

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`
  }

  /**
  * delete - deletes the DOM element (hides it).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  delete (sprite) {
    const el = sprite.textui.el

    el.parentNode.removeChild(el)
    return null
  }
}
