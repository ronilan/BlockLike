/**
 * Class representing the stage surface on which sprites draw.
 * Each Stage has one.
 * @private
 */
export default class StageSurface {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} stage - the stage on which the sprite is drawing.
  */
  constructor (stage) {
    this.context = stage.element.context
  }

  /**
  * draw - draws a line "behind" a moving sprite.
  * Note: sprite always has current and previous x,y values to allow drawing to previous location.
  *
  * @param {object} sprite - the sprite drawing the line.
  */
  draw (sprite) {
    if (sprite.drawing) {
      this.context.beginPath()
      this.context.moveTo((sprite.stageWidth / 2) + sprite.x, (sprite.stageHeight / 2) + (sprite.y * -1))
      this.context.lineTo((sprite.stageWidth / 2) + sprite.prevX, (sprite.stageHeight / 2) + (sprite.prevY * -1))
      this.context.lineWidth = sprite.penSize
      this.context.strokeStyle = sprite.penColor
      this.context.stroke()
    }
  }

  /**
  * clear - clears the canvas
  */
  clear (sprite) {
    this.context.clearRect(0, 0, sprite.stageWidth, sprite.stageHeight)
  }
}
