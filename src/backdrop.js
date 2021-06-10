import Look from './look';

/**
 * Class representing a Backdrop.
 * Backdrops can be added to the Stage.
 * @extends Look
 *
 * @example
 * let backdrop = new blockLike.Backdrop();
 *
 * @example
 * let backdrop = new blockLike.Backdrop({
 *   image: 'https://www.blocklike.org/images/backdrop.svg'
 * });
 *
 * @example
 * let backdrop = new blockLike.Backdrop({
 *   color: '#A2DAFF'
 * });
 */
export default class Backdrop extends Look {
  /**
  * constructor - Creates a Backdrop to be used by Stage objects.
  *
  * @param {object} options - options for the backdrop.
  * @param {string} options.image - a URI (or data URI) for the backdrop image.
  * @param {string} options.color - a css color string ('#ff0000', 'red')
  */
  constructor(options = {}) {
    const defaults = {};
    const actual = { ...defaults, ...options };

    super();

    this.image = actual.image;
    this.color = actual.color;

    // preload
    if (this.image) {
      const image = new window.Image();
      image.src = this.image;
    }
  }

  /** Setup Actions * */

  /**
  * addTo - Adds the backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addTo(stage);
  *
  * @param {object} stage - which stage to add the backdrop too.
  */
  addTo(stage) {
    const curStage = stage;
    stage.backdrops.push(this);
    // if "bare" set the added as active
    !stage.backdrop ? curStage.backdrop = stage.backdrops[0] : null;
    stage.element ? stage.element.update(stage) : null;
  }

  /**
  * removeFrom - Removes the backdrop to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addTo(stage);
  * backdrop.removeFrom(stage);
  *
  * @param {object} stage - which stage to remove the backdrop from.
  */
  removeFrom(stage) {
    stage.removeBackdrop(this);
  }
}
