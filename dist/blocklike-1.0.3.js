var blockLike;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/backdrop.js":
/*!*************************!*\
  !*** ./src/backdrop.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Backdrop)
/* harmony export */ });
/* harmony import */ var _look__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./look */ "./src/look.js");


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
class Backdrop extends _look__WEBPACK_IMPORTED_MODULE_0__.default {
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


/***/ }),

/***/ "./src/costume.js":
/*!************************!*\
  !*** ./src/costume.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Costume)
/* harmony export */ });
/* harmony import */ var _look__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./look */ "./src/look.js");


/**
 * Class representing a Costume.
 * Costumes can be added to a Sprite.
 * @extends Look
 *
 * @example
 * let costume = new blockLike.Costume();
 *
 * @example
 * let costume = new blockLike.Costume({
 *   width: 50,
 *   height: 50,
 *   color: '#A2DAFF',
 *   image: 'https://www.blocklike.org/images/sheep_step.png'
 * });
 */
class Costume extends _look__WEBPACK_IMPORTED_MODULE_0__.default {
  /**
  * constructor - Creates a Costume to be used by Sprite objects..
  *
  * @param {object} options - options for the costume.
  * @param {number} options.width - the costume width in pixels. Default is 100.
  * @param {number} options.height - the costume height in pixels. Default is 100.
  * @param {string} options.image - a URI (or data URI) for the costume image.
  * @param {string} options.color - a css color string ('#ff0000', 'red')
  */
  constructor(options = {}) {
    const defaults = {
      width: 100,
      height: 100,
      color: null,
    };
    const actual = { ...defaults, ...options };

    super();

    this.width = actual.width;
    this.height = actual.height;
    this.visibleWidth = actual.width;
    this.visibleHeight = actual.height;

    this.image = actual.image;
    this.color = actual.color;

    // preload
    if (this.image) {
      const image = new window.Image();
      image.src = this.image;
    }

    this.innerHTML = '';
  }

  /** Setup Actions * */

  /**
  * addTo - Adds the costume to the sprite
  *
  * @example
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * costume.addTo(sprite);
  *
  * @param {object} sprite - which sprite to add the costume too.
  */
  addTo(sprite) {
    const curSprite = sprite;
    sprite.costumes.push(this);

    // if "bare" set the added as active.
    if (!sprite.costume) {
      curSprite.costume = sprite.costumes[0];
      curSprite.width = sprite.costume.visibleWidth;
      curSprite.height = sprite.costume.visibleHeight;
    }

    sprite.element ? sprite.element.update(sprite) : null;
  }

  /**
  * removeFrom - Removes the costume from to the sprite
  *
  * @example
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * costume.addTo(sprite);
  * costume.removeFrom(sprite);
  *
  * @param {object} sprite - which sprite to remove the costume from.
  */
  removeFrom(sprite) {
    sprite.removeCostume(this);
  }

  /** Looks * */

  /**
  * resizeToImage - sets the width and height of the costume to that of the image file.
  *
  * @example
  * let costume = new blockLike.Costume({
  *   image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Sheep_in_gray.svg'
  * });
  *
  * costume.resizeToImage();
  */
  resizeToImage() {
    // register the image size from the file
    if (this.image) {
      const image = new window.Image();
      const me = this;

      image.src = this.image;

      image.addEventListener('load', () => {
        me.width = image.width;
        me.height = image.height;
        me.visibleWidth = me.width;
        me.visibleHeight = me.height;
      });
    }
  }

  /**
  * inner - Places an HTML element inside the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.inner('<p class="big centered rainbow">:)</p>');
  *
  * @example
  * costume.inner('I like text only');
  *
  * @param {string} html - the html to insert.
  */
  inner(html) {
    this.innerHTML = html;
  }

  /**
  * insert - Places a DOM element inside the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.insert(document.getElementById('my-html-creation'));
  *
  * @param {object} el - the DOM element.
  */
  insert(el) {
    const iel = el.cloneNode(true);
    iel.style.display = 'block';
    iel.style.visibility = 'inherit';

    this.image = null;
    this.color = 'transparent';
    this.innerHTML = iel.outerHTML;
  }
}


/***/ }),

/***/ "./src/document-css.js":
/*!*****************************!*\
  !*** ./src/document-css.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultCSS": () => (/* binding */ defaultCSS),
/* harmony export */   "uiCSS": () => (/* binding */ uiCSS),
/* harmony export */   "thinkCSS": () => (/* binding */ thinkCSS),
/* harmony export */   "sayCSS": () => (/* binding */ sayCSS),
/* harmony export */   "askCSS": () => (/* binding */ askCSS)
/* harmony export */ });
/**
* Collection of css strings to be injected to the head section of a page.
* @private
*/
const defaultCSS = `
* { 
  box-sizing: border-box;
  -webkit-transform: translate3d(0, 0, 0);
  -webkit-touch-callout:none;                /* prevent callout to copy image, etc when tap to hold */
  -webkit-tap-highlight-color:rgba(0,0,0,0); /* prevent tap highlight color / shadow */
}
html, body{
  margin:0;
  padding:0;
}
`;

const uiCSS = `
.blocklike-flag {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 65px;
  line-height: 65px;
  padding: 32px;
  color: #222;
  background: #fafafa;
  border: 2px solid #666;
  border-radius: 65px;
}
`;

const thinkCSS = `
.blocklike-think {
  position: absolute;
  min-width: 60px;
  max-width: 200px;
  left: 200px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  min-height: 16px;
  line-height: 16px;
  text-align: left;
  color: #222;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
}
.blocklike-think:before {
  position:absolute;
  bottom: -30px;
  left: 0px;
  width: 30px;
  height: 30px;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
  content: "";
}
.blocklike-think:after {
  position: absolute;
  bottom: -45px;
  left: 0px;
  width: 15px;
  height: 15px;
  background: #fafafa;
  border: 2px solid #444;
  border-radius: 15px;
  content: "";
}
`;

const sayCSS = `
.blocklike-ask,
.blocklike-say {
  position: absolute;
  display: inline-block;
  min-width: 60px;
  max-width: 200px;
  padding: 10px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  min-height: 16px;
  line-height: 16px;
  text-align: left;
  background-color: #fafafa;
  border: 2px solid #444;
  border-radius: 20px;
}
.blocklike-ask:before,
.blocklike-say:before {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 13px;
  right: auto;
  top: auto;
  bottom: -33px;
  border: 16px solid;
  border-color: #444 transparent transparent #444;
}
.blocklike-ask:after,
.blocklike-say:after {
  content: ' ';
  position: absolute;
  width: 0;
  height: 0;
  left: 15px;
  right: auto;
  top: auto;
  bottom: -28px;
  border: 16px solid;
  border-color: #fafafa transparent transparent #fafafa;
}
`;

const askCSS = `
.blocklike-ask input {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  padding: 2px;
  margin: 2px;
  width: 75%;
}
.blocklike-ask button {
  font-size: 16px;
  line-height: 16px;
  height: 26px;
  padding: 0 5px;
  margin: 0;
}
`;


/***/ }),

/***/ "./src/element-css.js":
/*!****************************!*\
  !*** ./src/element-css.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "apply": () => (/* binding */ apply),
/* harmony export */   "register": () => (/* binding */ register)
/* harmony export */ });
/**
* Encapsulates the functionality of managing element style properties for the entities.
*/

/**
* apply - apply cssRules of an entity to its DOM element.
*
* @param {function} entity - a Sprite or Stage.
*/
function apply(entity) {
  const curEntity = entity;
  // Sprites have Costumes, Stage has Backdrop, figure out which entity it is.
  const curLook = entity.backdrop || entity.costume;
  const curLooks = entity.backdrops || entity.costumes;

  const el = entity.element.el;

  // remove any style applied by any look
  if (curLooks) {
    curLooks.forEach((b) => {
      b.cssRules.forEach((item) => {
        const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        el.style[camelCased] = '';
      });
    });
  }

  // add current look styles
  if (curLook) {
    curLook.cssRules.forEach((item) => {
      const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
      el.style[camelCased] = item.value;
    });
  }

  // Add curEntity styles. Must be done after look styles.
  curEntity.cssRules.forEach((item) => {
    const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    el.style[camelCased] = item.value;
  });
}

/**
* register - register cssRules of for an entity based on user input.
* Note: All rules are registered dash-case a-la css.
* This is regardless of how they are set and though they are used camelCase.
*
* @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
* @param {string} value - the value for the css property (e.g. #ff8833)
* @param {function} entity - a Sprite or Stage.
*/
function register(prop, value, entity) {
  const curEntity = entity;

  if (typeof prop === 'string' && typeof value === 'string') {
    const dashed = prop.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
    curEntity.cssRules.push({ prop: dashed, value });
  } else if (typeof prop === 'object' && !value) {
    Object.keys(prop).forEach((key) => {
      const dashed = key.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`);
      curEntity.cssRules.push({ prop: dashed, value: prop[key] });
    });
  }
}


/***/ }),

/***/ "./src/entity.js":
/*!***********************!*\
  !*** ./src/entity.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Entity)
/* harmony export */ });
/* harmony import */ var _rewriter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rewriter */ "./src/rewriter.js");
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");



/**
 * Class representing an entity.
 * Abstract for Stage and Sprite.
 * Do not instantiate objects directly from this class.
 *
 * @private
 */
class Entity {
  /**
  * constructor - Entity is abstract for Stage and Sprite.
  *
  * @param {number} pace - the number of milliseconds to pace paced methods.
  */
  constructor(pace) {
    Entity.messageListeners = [];
    this.id = this._generateUUID();
    this.pace = pace;
    this.sounds = []; // will hold all sounds currently played by entity, if any.
    /*
    * Paced methods work in the following manner:
    * 1. Event Method functions are rewritten.
    * 2. For paced methods rewriter will add an await to a promise after the paced method call.
    * 3. The promise will resolve after {pace} milliseconds.
    *
    * This allows the paced method to halt execution of any code following it until it is done.
    */
    this.paced = [
      'goTo',
      'move',
      'changeX',
      'changeY',
      'setX',
      'setY',
      'goTowards',
      'turnRight',
      'turnLeft',
      'pointInDirection',
      'pointTowards',
      'changeSize',
      'setSize',
      'say',
      'think',
      'refresh',
    ];

    /*
    * Waited methods work in the following manner:
    * 1. Event Method functions are rewritten.
    * 2. For waited methods rewriter will add an await to a promise after the waited method call.
    * 3. The promise includes a document level event listener.
    * 4. rewriter modifies the waited method call, inserting a triggeringId parameter.
    * 4. The event listener is unique to the triggeringId.
    * 5. When the method completes running an event is dispatched resolving the promise.
    *
    * This allows the waited method to halt execution of any code following it until it is done.
    */
    this.waited = [
      'wait',
      'glide',
      'sayWait',
      'thinkWait',
      'playSoundUntilDone',
      'broadcastMessageWait',
    ];

    /*
    * waitedRetunred methods work similarly to waited methods only that they enable capturing a value
    * into a globally declared variable (or an undeclared one).
    * 1. Event Method functions are rewritten.
    * 2. For waitedReturned methods rewriter will add an await to a promise after the waited method call.
    * 3. The promise includes a document level event listener.
    * 4. rewriter modifies the waited method call, inserting:
    *   - the name of the variable into which a value is returned.
    *   - a triggeringId parameter.
    * 4. The event listener is unique to the triggeringId.
    * 5. When the method completes running an event is dispatched resolving the promise.
    * 6. The value returned is transfered into the variable using eval.
    *
    * This allows the waited method to halt execution of any code following it until it is done.
    * At which point the variable has "captured" the value.
    */
    this.waitedReturned = [
      'invoke',
      'ask',
    ];

    /*
    * Event methods (evented) are containers for functions to be rewritten.
    * When an event method is nested inside another the code of the inner method is NOT rewritten.
    */
    this.evented = [
      'whenFlag',
      'whenLoaded',
      'whenClicked',
      'whenKeyPressed',
      'whenEvent',
      'whenReceiveMessage',
      'whenCloned',
    ];
  }

  /**
  * _generateUUID - generates a unique ID.
  * Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  *
  * @private
  * @return {string} - a unique id.
  */
  _generateUUID() {
    let d;
    let r;

    d = new Date().getTime();

    if (window.performance && typeof window.performance.now === 'function') {
      d += window.performance.now(); // use high-precision timer if available
    }

    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      r = (d + Math.random() * 16) % 16 | 0; // eslint-disable-line no-mixed-operators, no-bitwise
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16); // eslint-disable-line no-mixed-operators, no-bitwise
    });

    return uuid;
  }

  /**
  * _releaseWaited - releases a waited promise by dispatching an event.
  *
  * @private
  * @param {string} triggeringId - the name of the event that invoked the code that requested the wait.
  */
  _releaseWaited(triggeringId) {
    const event = new window.CustomEvent(`blockLike.waited.${triggeringId}`, { detail: { value: 0 } });
    document.dispatchEvent(event);
  }

  /**
  * _setToVar - sets a globally scoped user defined variable who's name is specified as a a string
  * with the value provided.
  *
  * @private
  * @param {varString} text - the name of the variable to which value should be set.
  * @param {any} value - the value to set.
  */
  _setToVar(varString, value) {
    try {
      eval(`${varString} = '${value}'`); // eslint-disable-line no-eval
    } catch (error) {
      throw ('BlockLike.js Error: Variables accepting a value must be declared in the global scope.'); // eslint-disable-line no-throw-literal
    }
  }

  /**
  * _exec - asynchronous function execution.
  * This is what creates the "paced" execution of the user supplied functions.
  *
  * @private
  * @param {function} func - a function to rewrite and execute.
  * @param {array} argsArr - an array of arguments to pass to the function.
  */
  _exec(func, argsArr) {
    const me = this;
    me.triggeringId = this._generateUUID();
    const f = (0,_rewriter__WEBPACK_IMPORTED_MODULE_0__.default)(func, me);
    return f.apply(me, argsArr);
  }

  /**
  * invoke - invoke a function. Allows passing an argument or array of arguments.
  * Function will be "paced" and code execution will be "waited" until it is completed.
  *
  * @example
  * sprite.whenFlag(() => {
  *   this.invoke(jump);
  *   this.invoke(talk, 'hi');
  *   this.invoke(pattern, [5, 50, 12]);
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  * @param {array} argsArr - an array of arguments to pass to the function. A single variable also accepted.
  */
  invoke(func, argsArr, theVar = null, triggeringId = null) {
    // theVar and triggeringId are not user supplied, they are inserted by rewriter.
    let args = argsArr;
    !(argsArr instanceof Array) ? args = [argsArr] : null;

    this._exec(func, args).then((result) => {
      // this is the waited method listener. release it.
      this._releaseWaited(triggeringId);
      // set the user defined variable to the captured value.
      theVar ? this._setToVar(theVar, result) : null;
    });
  }

  /**
  * wait - creates a pause in execution.
  *
  * @example
  * this.wait(5);
  *
  * @example
  * let time = 5;
  * this.wait(time * 0.95);
  *
  * @param {number} sec - number of seconds to wait. Must be an actual number.
  */
  wait(sec, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    setTimeout(() => {
      this._releaseWaited(triggeringId);
    }, sec * 1000);
  }

  /** Events * */

  /**
  * whenLoaded - invoke user supplied function.
  * To be used with code that needs to run onload.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenLoaded( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenLoaded(func) {
    setTimeout(() => {
      this._exec(func, []);
    }, 0);
  }

  /**
  * whenFlag - adds a flag to cover the stage with an event listener attached.
  * When triggered will remove the flag div and invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenFlag( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenFlag(func) {
    const me = this;

    if (me.element) {
      me.element.addFlag(this);

      this.element.flag.addEventListener('click', (e) => {
        me.element.removeFlag(me);
        me._exec(func, [e]);
        e.stopPropagation();
      });
    }
  }

  /**
  * whenClicked - adds a click event listener to the sprite or stage.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.say('I am alive');
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenClicked(func) {
    const me = this;

    if (me.element) {
      this.element.el.addEventListener('click', (e) => {
        me._exec(func, [e]);
        e.stopPropagation();
      });
    }
  }

  /**
  * whenKeyPressed - adds a keypress event listener to document.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenKeyPressed(' ', function() {
  *   this.say('Spacepressed');
  * });
  *
  * @param {string} userKey - the key pressed. may be the code or the character itself (A or 65)
  * @param {function} func - a function to rewrite and execute.
  */
  whenKeyPressed(userKey, func) {
    const me = this;
    let check;
    typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey;

    document.addEventListener('keydown', (e) => {
      let match = false;
      // Make sure each property is supported by browsers.
      // Note: user may write incompatible code.
      e.code && e.code.toLowerCase() === check ? match = true : null;
      e.key && e.key.toLowerCase() === check ? match = true : null;
      e.keyCode === check ? match = true : null;
      if (match) {
        me._exec(func, [e]);
        e.preventDefault();
      }
    });
  }

  /**
  * whenEvent - adds the specified event listener to sprite/stage.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenEvent('mouseover', (e) => {
  *   console.log(e);
  * });
  *
  * @param {string} eventStr - the named event (mosemove etc.).
  * @param {function} func - a function to rewrite and execute.
  */
  whenEvent(eventStr, func) {
    const me = this;

    if (me.element) {
      let attachTo = this.element.el;
      let options = {};
      'keydown|keyup|keypress'.indexOf(eventStr) !== -1 ? attachTo = document : null;
      'touchstart|touchmove'.indexOf(eventStr) !== -1 ? options = { passive: true } : null;

      attachTo.addEventListener(eventStr, (e) => {
        me._exec(func, [e]);
        e.stopPropagation();
      }, options);
    }
  }

  /**
  * whenReceiveMessage - adds the specified event listener to document.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenReceiveMessage('move', function() {
  *   this.move(-10);
  * })
  *
  * @param {string} msg - the named message (event);
  * @param {function} func - a function to rewrite and execute.
  */
  whenReceiveMessage(msg, func) {
    const listenerId = this._generateUUID();
    // register as a message listener.
    Entity.messageListeners.push({ msg, listenerId });

    // listen to specified message
    document.addEventListener(msg, (e) => {
      // execute the func and then
      this._exec(func, [e]).then(() => {
        // dispatch an event that is unique to the listener and message received.
        const msgId = e.detail.msgId;
        const event = new window.CustomEvent('blockLike.donewheneeceivemessage', { detail: { msgId, listenerId } });

        document.dispatchEvent(event);
      });
    });
  }

  /**
  * broadcastMessage - dispatches a custom event that acts as a global message.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.whenClicked(function() {
  *  stage.broadcastMessage('move')
  * });
  *
  * @param {string} msg - the named message (event)
  */
  broadcastMessage(msg) {
    const msgId = this._generateUUID();
    const event = new window.CustomEvent(msg, { detail: { msgId } });
    document.dispatchEvent(event);
  }

  /**
  * broadcastMessageWait - dispatches a custom event that acts as a global message.
  * Waits for all whenReceiveMessage listeners to complete.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  *
  * sprite.whenReceiveMessage('move', function() {
  *   this.move(-10);
  *   this.wait(5);
  * })
  *
  * stage.whenClicked(function() {
  *  stage.broadcastMessageWait('move');
  *  sprite.say('All done');
  * });
  *
  * @param {string} msg - the named message (event)
  */
  broadcastMessageWait(msg, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    const me = this;
    const msgId = this._generateUUID();
    // save registered listeners for this broadcast.
    let myListeners = Entity.messageListeners.filter((item) => item.msg === msg);
    // dispatch the message
    const event = new window.CustomEvent(msg, { detail: { msgId } });
    document.dispatchEvent(event);

    // listen to those who received the message
    document.addEventListener('blockLike.donewheneeceivemessage', function broadcastMessageWaitListener(e) {
      // if event is for this message remove listenerId from list of listeners.
      (e.detail.msgId === msgId) ? myListeners = myListeners.filter((item) => item.listenerId !== e.detail.listenerId) : null;
      // all listeners responded.
      if (!myListeners.length) {
        // remove the event listener
        document.removeEventListener('blockLike.donewheneeceivemessage', broadcastMessageWaitListener);
        // release the wait
        me._releaseWaited(triggeringId);
      }
    });
  }

  /** Sound * */

  /**
  * playSound - plays a sound file (mp3, wav)
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSound('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSound(url) {
    const audio = new window.Audio(url);
    audio.play();
    this.sounds.push(audio);
    audio.addEventListener('ended', () => {
      this.sounds = this.sounds.filter((item) => item !== audio);
    });
  }

  /**
  * playSoundLoop - plays a sound file (mp3, wav) again and again
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSoundLoop('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSoundLoop(url) {
    const audio = new window.Audio(url);
    audio.play();
    this.sounds.push(audio);
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });
  }

  /**
  * playSoundUntilDone - plays a sound file (mp3, wav) until done.
  * This is similar to playSound and wait for the duration of the sound.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSoundUntilDone('../../sounds/bleat.wav');
  * });
  *
  * @param {string} url - the url of the file to play.
  */
  playSoundUntilDone(url, triggeringId = null) {
    // triggeringId is not user supplied, it is inserted by rewriter.
    const audio = new window.Audio(url);
    audio.play();
    this.sounds.push(audio);
    audio.addEventListener('ended', () => {
      this.sounds = this.sounds.filter((item) => item !== audio);
      this._releaseWaited(triggeringId);
    });
  }

  /**
  * stopSounds - stops all sounds played by sprite or stage.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.playSound('../../sounds/bleat.wav');
  * });
  *
  * stage.whenKeyPressed('Escape', () => {
  *   this.stopSounds();
  * });
  */
  stopSounds() {
    this.sounds.forEach((item) => {
      item.pause();
    });
    this.sounds = [];
  }

  /* css */

  /**
  * css - applies a CSS rule to the sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.css('background', '#0000ff');
  *
  * @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
  * @param {string} value - the value for the css property (e.g. #ff8833)
  */
  css(prop, value = null) {
    _element_css__WEBPACK_IMPORTED_MODULE_1__.register(prop, value, this);
    this.element ? this.element.update(this) : null;
  }

  /**
  * addClass - adds a css class to sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addClass('rainbow');
  *
  * @param {string} name - the css class name to add.
  */
  addClass(name) {
    !this.hasClass(name) ? this.classes.push(name) : null;
    this.element ? this.element.update(this) : null;
  }

  /**
  * removeClass - removes a css class from the sprite and all costumes.
  *
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addClass('rainbow');
  * sprite.removeClass('rainbow');
  *
  * @param {string} name - the css class name to remove.
  */
  removeClass(name) {
    this.classes = this.classes.filter((item) => item !== name);
    this.element ? this.element.update(this) : null;
  }

  /**
  * hasClass - is the css class applied to the sprite and all costumes.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.hasClass('rainbow') ? this.removeClass('rainbow') : this.addClass('rainbow');
  * });
  *
  * @param {string} name - the css class name.
  * @return {boolean} - is the css class name on the list.
  */
  hasClass(name) {
    return this.classes.indexOf(name) !== -1;
  }
}


/***/ }),

/***/ "./src/look.js":
/*!*********************!*\
  !*** ./src/look.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Look)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing a look.
 * Abstract for Costume and Backdrop.
 * Do not instantiate objects directly from this class.
 *
 * @private
 */
class Look {
  /**
  * constructor - Look is abstract for Costume and Backdrop.
  */
  constructor() {
    this.cssRules = [];
    this.classes = [];
  }

  /** Looks * */

  /**
  * css - applies a CSS rule to a Costume or Backdrop.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.css('font-size', '16px');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.css('cursor', 'pointer');
  *
  * @param {string} prop - the css property (e.g. color)
  * @param {string} value - the value for the css property (e.g. #ff8833)
  */
  css(prop, value = null) {
    _element_css__WEBPACK_IMPORTED_MODULE_0__.register(prop, value, this);
  }

  /**
  * addClass - adds a css class to costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name to add.
  */
  addClass(name) {
    !this.hasClass(name) ? this.classes.push(name) : null;
  }

  /**
  * removeClass - removes a css class from the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.hasClass('rainbow') ? costume.removeClass('rainbow') : costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.hasClass('rainbow') ? backdrop.removeClass('rainbow') : backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name to remove.
  */
  removeClass(name) {
    this.classes = this.classes.filter((item) => item !== name);
  }

  /**
  * hasClass - is the css class applied to the costume.
  *
  * @example
  * let costume = new blockLike.Costume();
  *
  * costume.hasClass('rainbow') ? costume.removeClass('rainbow') : costume.addClass('rainbow');
  *
  * @example
  * let backdrop = new blockLike.Backdrop();
  *
  * backdrop.hasClass('rainbow') ? backdrop.removeClass('rainbow') : backdrop.addClass('rainbow');
  *
  * @param {string} name - the css class name.
  * @return {boolean} - is the css class name on the list.
  */
  hasClass(name) {
    return this.classes.indexOf(name) !== -1;
  }
}


/***/ }),

/***/ "./src/platforms.js":
/*!**************************!*\
  !*** ./src/platforms.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ platforms)
/* harmony export */ });
/**
* platforms - collection of things to ensure it plays nicely with coding platforms.
*/
function platforms() {
  /**
  * codepen.io
  * Paced and Waited methods trigger the protection - hence we prolong it.
  * https://blog.codepen.io/2016/06/08/can-adjust-infinite-loop-protection-timing/
  */
  if (window.CP) {
    window.CP.PenTimer.MAX_TIME_IN_LOOP_WO_EXIT = 60000;
  }
}


/***/ }),

/***/ "./src/rewriter.js":
/*!*************************!*\
  !*** ./src/rewriter.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rewrite)
/* harmony export */ });
/**
* Encapsulates the functionality of rewriting user code to allow for BlockLike.js features.
*/

/**
* countChar - count how many times a given character (or string) appears in another string.
* helper for evented skipping and method rewriting.
*
* @param {string} str - a line of code.
* @param {string} char - a string to look for.
*
* @return {number} - the number of times found.
*/
function countChar(str, char) {
  const regExp = new RegExp(`\\${char}`, 'g');
  return (str.match(regExp) || []).length;
}

/**
* replaceUserStringWithBlanks - for a given line of code, replaces all occurrences of
* user provided strings with a sequence of spaces of the same length.
* helper for evented skipping and method rewriting.
*
* @param {string} line - a line of code.
* @return {string} - the line without strings.
*/
function replaceUserStringWithBlanks(line) {
  return line.replace(/"(.*?)"|'(.*?)'|`(.*?)`/g, ' ');
}

/**
* isMethodInString - checks a string against an array of method names.
*
* @param {string} str - a line of code.
* @param {Array} arr - an array of method names.
*
* @return {boolean} - is the method in the string.
*/
function isMethodInString(arr, str) {
  return (arr.some((method) => str.indexOf(`.${method}(`) !== -1));
}

/**
* isPaced - checks if a line of code includes a paced method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is paced in code.
*/
function isPaced(item, entity) {
  return isMethodInString(entity.paced, item);
}

/**
* isWaited - checks if a line of code includes a waited method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is waited in code.
*/
function isWaited(item, entity) {
  return isMethodInString(entity.waited, item);
}

/**
* isEvented - checks if a line of code includes an evented method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - is evented in code.
*/
function isEvented(item, entity) {
  return isMethodInString(entity.evented, item);
}

/**
* whichWaitedReturn - checks if a line of code includes a waitedReturn method.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - the waitedReturn method found or null.
*/
function whichWaitedReturn(item, entity) {
  return entity.waitedReturned.find((method) => (item.indexOf(`.${method}(`) !== -1 ? method : false));
}

/**
* insertPaced - inserts a timed await line after any method that is on the list of paced methods.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified line of code.
*/
function insertPaced(item, entity) {
  const code = `${item}\n await new Promise(resolve => setTimeout(resolve, ${entity.pace}));`;
  return entity.pace && isPaced(replaceUserStringWithBlanks(item), entity) ? code : item;
}

/**
* insertWaited - inserts the "mechanism" that stops execution and awaits for the method to finish.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified (multi)line of code.
*/
function insertWaited(item, entity) {
  let found = null;
  let code;

  // look for waited methods.
  found = isWaited(replaceUserStringWithBlanks(item), entity);

  // not a normal "waited". look for waitedReturned.
  if (!found) {
    let theVar = null;

    found = whichWaitedReturn(replaceUserStringWithBlanks(item), entity);

    // code for waitedReturn
    theVar = item.substr(0, item.indexOf('='))
      .replace('let', '')
      .replace('var', '')
      .replace('const', '')
      .trim();

    code = `${item.substring(0, item.lastIndexOf(')'))}, '${theVar}', '${entity.triggeringId}')`;

    // invoke is "forgiving". may, or may not, have variables.
    found === 'invoke' && (item.indexOf(',') === -1) ? code = `${item.substring(0, item.lastIndexOf(')'))}, [], '${theVar}', '${entity.triggeringId}')` : null;
  } else {
    // code for "normal" waited
    code = `${item.substring(0, item.lastIndexOf(')'))}, '${entity.triggeringId}')`;
  }

  // entity.triggeringId creates a unique context to chain the waited methods.
  code = `${code}\n await new Promise(resolve => {
      document.addEventListener('blockLike.waited.${entity.triggeringId}', function waitedListener(e) {
        document.removeEventListener('blockLike.waited.${entity.triggeringId}', waitedListener);
        resolve();
      });
    });`;

  return found ? code : item;
}

/**
* insertAsync - Adds keyword async to function deceleration if not present
* Will catch:
* - all named function decelerations with a space after the keyword 'function'
* - anything that has a fat arrow with any of several variable patterns before it.
*
* @param {string} item - a line of code.
* @return {string} - a modified line of code.
*/
function insertAsync(item) {
  const exist = item.indexOf('async ');

  // function declaration
  let regExp = /function(\s*?[a-zA-Z]\w*\s*?\(|\s*?\()/;
  let matches = regExp.exec(replaceUserStringWithBlanks(item));

  // or arrow
  if (!matches) {
    regExp = /([a-zA-Z]\w*|\(\s*?[a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\s*?\))\s*?=>/;
    matches = regExp.exec(replaceUserStringWithBlanks(item));
  }
  return exist === -1 && matches ? `${item.substring(0, matches.index)}async ${item.substring(matches.index, item.length)}` : item;
}

/**
* emptyLoopProtection - examines the code for while and for statements that are empty.
* Note: since while(true){} is likely to be coded by the user this prevents infinite loops.
*
* @param {string} item - a line of code.
* @return {string} - a modified line of code.
*/
function emptyLoopProtection(funcS) {
  const check = funcS.replace(/\s+/g, '').replace(/\r?\n|\r/g, '');

  const regExp = /while\([\s\S]*\){}|for\([\s\S]*\){}|do{}while\([\s\S]*\)/;
  const matches = regExp.exec(check);

  return !!matches;
}

/**
* removeOuter - Removes the outer function definition and returns the function code body.
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the body of the function.
*/
function removeOuter(funcS) {
  return funcS.substring(funcS.indexOf('{') + 1, funcS.lastIndexOf('}'));
}

/**
* removeComments - Removes comments from code.
* from: https://stackoverflow.com/a/15123777
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the function without comments.
*/
function removeComments(funcS) {
  return funcS.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
}

/**
* getEventObjectVarName - extracts the variable name that holds the event object.
*
* @param {string} funcS - the function being rewritten.
* @return {string} - the variable name.
*/
function getEventObjectVarName(funcS) {
  return funcS.substring(funcS.indexOf('(') + 1, funcS.indexOf(')'));
}

/**
* rewrite - rewrites a function to an async version that is "paced" using awaiting for promises.
* This allows the user to write sequential simple code that will be executed in a paced manner.
*
* @param {function} func - a function to rewrite
* @param - {Object} entity - a sprite or stage object to which the function applies.
* @return {function} - an async modified function.
*/
function rewrite(func, entity) {
  let code = func.toString();
  const theVar = getEventObjectVarName(code);

  // rewrite the code
  if (emptyLoopProtection(code)) {
    code = 'throw \'BlockLike.js Error: Empty loop detected\';';
  } else {
    code = removeComments(removeOuter(code));
    code = code.split('\n').filter((item) => item.trim().length !== 0);

    // counter for open parentheses.
    let eventedOpenParen = 0;

    code = code.map((item) => {
      const temp = item;
      let result = temp;

      // internal evented methods are skipped
      if (isEvented(temp, entity) || eventedOpenParen) {
        eventedOpenParen += (countChar(replaceUserStringWithBlanks(temp), '(') - countChar(replaceUserStringWithBlanks(temp), ')'));
      } else {
        // a method can be one of the following but not more than one
        result === temp ? result = insertPaced(temp, entity) : null; // more likely
        result === temp ? result = insertWaited(temp, entity) : null; // less likely

        // and only if not a method will add async to functions
        result === temp ? result = insertAsync(temp) : null;
      }

      return result;
    });
    code = code.join('\n');
  }

  // transform the text into a function
  const AsyncFunction = Object.getPrototypeOf(async () => {}).constructor;
  let af = new AsyncFunction(code);

  // pass the event object to the function if exists.
  theVar ? af = new AsyncFunction(theVar, code) : null;

  window.blockLike && window.blockLike.debug ? console.log(af) : null; // eslint-disable-line no-console

  return af;
}


/***/ }),

/***/ "./src/sprite-element.js":
/*!*******************************!*\
  !*** ./src/sprite-element.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SpriteElement)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing the UI Element of the sprite.
 * Each Sprite has one.
 * @private
 */
class SpriteElement {
  /**
  * constructor - Creates a Sprite Element.
  *
  * @param {object} sprite - the sprite for which the element is created.
  * @param {object} stage - the stage to which the sprite is added.
  */
  constructor(sprite, stage) {
    const el = document.createElement('div');

    el.id = `${sprite.id}`;
    el.style.position = 'absolute';
    el.style.touchAction = 'manipulation';

    stage.element.el.appendChild(el);

    this.el = el;
  }

  /**
  * update - updates the DOM element. This is always called after the constructor.
  *
  * @param {object} sprite - the sprite to update.
  */
  update(sprite) {
    const el = sprite.element.el;
    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2);
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2);

    // Costume
    if (sprite.costume) {
      el.style.width = `${sprite.costume.visibleWidth}px`;
      el.style.height = `${sprite.costume.visibleHeight}px`;
    }

    el.style.left = `${(sprite.stageWidth / 2) + x}px`;
    el.style.top = `${(sprite.stageHeight / 2) + y}px`;
    el.style.zIndex = sprite.z;

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`;

    // Left or right rotation
    // Direction divided by 180 and floored -> 1 or 2.
    // Subtract 1 -> 0 or 1.
    // Multiply by -1 -> 0 or -1.
    // Css transform -> None or full X.
    sprite.rotationStyle === 1 ? el.style.transform = `scaleX(${((Math.floor(sprite.direction / 180) * 2) - 1) * -1})` : null;

    // Full rotation
    // Sprite "neutral position" is 90. CSS is 0. Subtract 90.
    // Normalize to 360.
    // Css rotate -> Number of degrees.
    sprite.rotationStyle === 0 ? el.style.transform = `rotate(${((sprite.direction - 90) + 360) % 360}deg)` : null;

    // CSS rules classes and the background color.
    // The costume color setting overrides any CSS setting.

    // There is no color property to current costume - so reset the background-color property of the element.
    !sprite.costume || !sprite.costume.color ? el.style.backgroundColor = '' : null;

    // apply CSS rules (may include background color)
    _element_css__WEBPACK_IMPORTED_MODULE_0__.apply(sprite);

    // apply CSS classes
    sprite.costume ? el.className = sprite.costume.classes.concat(sprite.classes).join(' ') : el.className = sprite.classes.join(' ');

    // There is a color property to current costume - so apply it and override CSS rules.
    sprite.costume && sprite.costume.color ? el.style.backgroundColor = sprite.costume.color : null;

    // Image.
    if (sprite.costume && el.firstChild) { // has image from previous costume
      if (!sprite.costume.image) { // needs removed as there is no image in current costume.
        el.removeChild(el.firstChild);
      } else if (sprite.costume.image !== this.el.firstChild.src) { // needs replaced
        this.el.firstChild.src = sprite.costume.image;
      }
    } else if (sprite.costume && sprite.costume.image) { // needs an image inserted.
      const image = new window.Image();

      image.style.width = '100%';
      image.style.height = '100%';
      image.style.position = 'absolute';
      image.src = sprite.costume.image;
      el.appendChild(image);
    }

    el.firstChild ? el.firstChild.draggable = false : null;

    // Inner. Must by done after the image
    sprite.costume && sprite.costume.innerHTML ? el.innerHTML = sprite.costume.innerHTML : null;

    // Text UI goes where sprite goes.
    sprite.textui ? sprite.textui.update(sprite) : null;

    this.el = el;
  }

  /**
  * delete - deletes the DOM element.
  *
  * @param {object} sprite - the sprite to delete.
  */
  delete(sprite) {
    const el = sprite.element.el;

    el.parentNode.removeChild(el);
    return null;
  }

  /**
  * addFlag - puts the flag div infront of everything (shows it).
  *
  * @param {object} sprite - the sprite that "requested" the flag.
  */
  addFlag(sprite) {
    const el = sprite.element.flag;

    el.style.zIndex = 1000;
    el.style.display = 'block';
  }

  /**
  * removeFlag - puts the flag div at the back (hides it).
  *
  * @param {object} sprite - the sprite that "requested" the flag.
  */
  removeFlag(sprite) {
    const el = sprite.element.flag;

    el.style.zIndex = -1;
    el.style.display = 'none';
  }
}


/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Sprite)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entity.js");
/* harmony import */ var _stage_surface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stage-surface */ "./src/stage-surface.js");
/* harmony import */ var _sprite_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sprite-element */ "./src/sprite-element.js");
/* harmony import */ var _costume__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./costume */ "./src/costume.js");
/* harmony import */ var _text_ui_element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./text-ui-element */ "./src/text-ui-element.js");







/**
 * Class representing a Sprite.
 * Sprites can be added to the Stage.
 * @extends Entity
 *
 * @example
 * let sprite = new blockLike.Sprite();
 *
 * @example
 * let sprite = new blockLike.Sprite({
 *   costume: new blockLike.Costume({
 *     width: 50,
 *     height: 50,
 *     color: '#A2DAFF',
 *     image: 'https://www.blocklike.org/images/sheep_step.png'
 *   })
 * });
 *
 * @example
 * let sprite = new blockLike.Sprite({
 *     width: 50,
 *     height: 50,
 *     color: '#A2DAFF',
 *     image: 'https://www.blocklike.org/images/sheep_step.png'
 * });
 *
 * @example
 * let confetti = new blockLike.Sprite('https://www.blocklike.org/images/confetti.svg');
 *
 * @example
 * let bareZeroSizedSprite = new blockLike.Sprite(null);
 */
class Sprite extends _entity__WEBPACK_IMPORTED_MODULE_0__.default {
  /**
  * constructor - Creates a Sprite to be added to Stage.
  *
  * @param {object} options - options for the sprite and/or options passed to costume.
  * Alternatively an image URL. If a URL is provided default costume will be sized to image.
  * @param {number} options.pace - The number of milliseconds to wait for each paced method.
  * @param {object} options.costume - A default Costume.
  * @param {number} options.width - the costume width in pixels. Default is 100.
  * @param {number} options.height - the costume height in pixels. Default is 100.
  * @param {string} options.image - a URL (or data URL) for the costume image.
  * @param {string} options.color - a css color string ('#ff0000', 'red').
  * @param {string} options - a URL (or data URL) for the costume image.
  */
  constructor(options = {}) {
    const sheepy = 'data:image/png;base64,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';
    const defaults = {
      pace: 33,
    };

    let actual = {};
    typeof options === 'object' ? actual = { ...defaults, ...options } : actual = defaults;

    super(actual.pace);

    // costumes
    this.costumes = [];

    /*
    * alternate options  - image url.
    * user can send a url instead of an option object.
    * this will be treated as a costume image url.
    * the image will be set the sprite costume.
    * when the image is loaded, costume width and height will be set to actual image width and height.
    * sprite will be refreshed.
    */
    if (typeof options === 'string') {
      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__.default({ image: options, width: 0, height: 0 });
      const image = new window.Image();

      const me = actual.costume;
      image.src = options;

      image.addEventListener('load', () => {
        me.originalWidth = image.width;
        me.originalHeight = image.height;
        me.width = me.originalWidth;
        me.height = me.originalHeight;

        this.refresh();
      });
    }

    /*
    * alternate options - passing custome options to sprite.
    * if costume is not defined by user, it will be created.
    * when no image is set, sheepy is default.
    *
    * alternate options - null.
    * user can pass null instead of an option object.
    * this is same as setting a costume as null.
    * the sprite will have no costumes and no size.
    */
    if (typeof actual.costume === 'undefined' && options !== null) {
      const costumeOptions = {};
      actual.width ? costumeOptions.width = actual.width : null;
      actual.height ? costumeOptions.height = actual.height : null;
      actual.color ? costumeOptions.color = actual.color : null;
      (typeof actual.image !== 'undefined') ? costumeOptions.image = actual.image : costumeOptions.image = sheepy;

      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__.default(costumeOptions);
    }

    // set costume
    actual.costume ? this.costume = actual.costume : null;
    this.costume ? this.costumes.push(this.costume) : null;

    // set width
    this.costume ? this.width = this.costume.visibleWidth : this.width = 0;
    this.costume ? this.height = this.costume.visibleHeight : this.height = 0;

    this.x = 0;
    this.y = 0;
    this.z = 0;

    this.prevX = 0;
    this.prevY = 0;

    this.showing = true;
    this.direction = 90;
    this.magnification = 100;

    this.rotationStyle = 0;

    this.textui = null;

    this.drawing = false;
    this.penColor = '#222222';
    this.penSize = 1;

    this.cssRules = [];
    this.classes = [];
  }

  /** Setup Actions * */

  /**
  * addTo - Adds the sprite to the stage
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  *
  * @param {object} stage - which stage to add the sprite too.
  */
  addTo(stage) {
    this.stageWidth = stage.width;
    this.stageHeight = stage.height;

    this.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_2__.default(this, stage);
    this.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_1__.default(stage);

    this.element.flag = stage.element.flag;
    this.againstBackdrop = stage.element.backdropContainer;

    stage.sprites.push(this);
    this.z = stage.sprites.length;

    this.element.update(this);
  }

  /**
  * clone - Creates a clone of the sprite and triggers an event.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   let clone = this.clone();
  *   clone.move(100);
  *   clone.addTo(stage);
  * });
  *
  */
  clone() {
    // make a new sprite.
    const sprite = new Sprite();
    // save id.
    const id = sprite.id;
    // and assign properties.
    const clone = Object.assign(sprite, this);
    // reassign the unique id.
    clone.id = id;

    // remove DOM elements
    clone.element = null;
    clone.surface = null;

    // detach arrays
    clone.cssRules = JSON.parse(JSON.stringify(this.cssRules));
    clone.classes = this.classes.slice();

    // figure out what the current costume is.
    const currentCostumeIndex = this.costumes.indexOf(this.costume);

    // fill the costumes array with new costumes and assign properties.
    clone.costumes = this.costumes.map((item) => {
      const costume = new _costume__WEBPACK_IMPORTED_MODULE_3__.default();
      const obj = Object.assign(costume, item);

      // detach arrays
      obj.cssRules = JSON.parse(JSON.stringify(item.cssRules));
      obj.classes = item.classes.slice();

      return obj;
    });

    // set the current costume.
    clone.costume = clone.costumes[currentCostumeIndex];

    // announce a clone
    const event = new window.CustomEvent(`blockLike.spritecloned.${this.id}`, { detail: clone });
    document.dispatchEvent(event);

    return clone;
  }

  /**
  * removeFrom - Removes a sprite from the stage.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.removeFrom(stage);
  *
  */
  removeFrom(stage) {
    const curStage = stage;

    curStage.sprites = stage.sprites.filter((item) => item !== this);
    this.element ? this.element = this.element.delete(this) : null;
  }

  /** Events * */

  /**
  * whenCloned - Adds a document level event listener triggered by a custom event.
  * The custom event is triggered by the clone() method.
  * When triggered will invoke user supplied function.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.clone();
  * });
  *
  * sprite.whenCloned( function() {
  *   this.addTo(stage);
  *   this.glide(5, 100, 0);
  * });
  *
  * @param {function} func - a function to rewrite and execute.
  */
  whenCloned(func) {
    document.addEventListener(`blockLike.spritecloned.${this.id}`, (e) => {
      e.detail._exec(func, []);
      e.stopPropagation();
    });
  }

  /** Motion * */

  /**
  * _motion - Moves the sprite to specified location (x, y).
  * All user motion methods translated to this motion.
  *
  * @private
  * @param {number} x - the x coordinate for the center of the sprite (0 is center screen).
  * @param {number} y - the y coordinate for the center of the sprite (0 is center screen).
  */
  _motion(x, y) {
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = x;
    this.y = y;
    this.element ? this.element.update(this) : null;
    this.surface ? this.surface.draw(this) : null;
  }

  /**
  * glide - Moves the sprite for the specified number of seconds so it arrives at specified location when time is up.
  * Provides smooth movement.
  *
  * @example
  * sprite.whenClicked( function() {
  *   this.glide(3, 100, 100);
  * });
  *
  * @example
  * sprite.whenClicked( function() {
  *   let time = 5;
  *   this.glide(time, 100, 100);
  * });
  *
  * @param {number} sec - the number of seconds the whole movement will last (and will halt further execution for).
  * @param {number} x - the x coordinate.
  * @param {number} y - the y coordinate.
  */
  glide(sec, x, y, triggeringId = null) {
    let i = 0;
    const me = this;
    // divide the x and y difference into steps
    const framesPerSecond = 1000 / this.pace;
    const stepX = (x - this.x) / (sec * framesPerSecond);
    const stepY = (y - this.y) / (sec * framesPerSecond);
    const int = setInterval(() => {
      i += 1;
      me._motion(me.x + stepX, me.y + stepY);
      if (i / framesPerSecond >= sec) {
        //  clear the interval and fix any "drift"
        clearInterval(int);
        me._motion(x, y);
        me._releaseWaited(triggeringId);
      }
    }, this.pace);
  }

  /**
  * move - Moves the sprite a specified number of pixels in the direction it is pointing.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.move(100, 100);
  * });
  *
  * @param {number} pixels - number of pixels to move.
  */
  move(pixels) {
    /**
    * toRad - converts a degree to radians.
    *
    * @param {number} deg - number of degrees.
    * @return {number} - degrees converted to radians.
    */
    function toRad(deg) {
      return deg * (Math.PI / 180);
    }

    const dx = Math.round(Math.cos(toRad(this.direction - 90)) * pixels);
    const dy = Math.round(Math.sin(toRad(this.direction + 90)) * pixels);

    this._motion(this.x + dx, this.y + dy);
  }

  /**
  * goTo - Moves the sprite to specified location.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.goTo(100, 100);
  * });
  *
  * @param {number} x - the x coordinate.
  * @param {number} y - the y coordinate.
  */
  goTo(x, y) {
    this._motion(x, y);
  }

  /**
  * goTowards - Moves the sprite towards another sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let otherSprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * otherSprite.addTo(stage);
  * otherSprite.move(100);
  * sprite.whenClicked( function() {
  *   this.goTowards(otherSprite);
  * });
  *
  * @param {object} sprite - the sprite to move to.
  */
  goTowards(sprite) {
    this._motion(sprite.x, sprite.y);
  }

  /**
  * setX - Places the sprite at the specified x position.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.setX(100);
  * });
  *
  * @param {number} x - the x coordinate
  */
  setX(x) {
    this._motion(x, this.y);
  }

  /**
  * setY - Places the sprite at the specified y position.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.setY(100);
  * });
  *
  * @param {number} y - the y coordinate.
  */
  setY(y) {
    this._motion(this.x, y);
  }

  /**
  * changeX - Moves the sprite on the x axis a specified number of pixels.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.changeX(100);
  * });
  *
  * @param {number} pixels - number of pixels to move.
  */
  changeX(pixels) {
    this._motion(this.x + pixels, this.y);
  }

  /**
  * changeY - Moves the sprite on the y axis a specified number of pixels.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.changeY(100);
  * });
  *
  * @param {number} pixels - number of pixels to move.
  */
  changeY(pixels) {
    this._motion(this.x, this.y + pixels);
  }

  /**
  * pointInDirection - Points the sprite in a specified direction.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.pointInDirection(45);
  * });
  *
  * @param {number} deg - direction to point to.
  */
  pointInDirection(deg) {
    deg > 0 ? this.direction = deg % 360 : this.direction = (deg + (360 * 10)) % 360;
    this.element ? this.element.update(this) : null;
  }

  /**
  * pointTowards - Point the sprite towards another sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let otherSprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * otherSprite.addTo(stage);
  * otherSprite.goTo(100, 100);
  * sprite.whenClicked( function() {
  *   this.pointTowards(otherSprite);
  * });
  *
  * @param {object} sprite - the sprite to move to.
  */
  pointTowards(sprite) {
    /**
    * computeDirectionTo - finds the direction from sprite's current location to a specified set of coordinates.
    *
    * @param {number} fromX - the x coordinate
    * @param {number} fromY - the y coordinate
    * @param {number} toX - the x coordinate
    * @param {number} toY - the y coordinate
    * @return {number} - direction in degrees.
    */
    function computeDirectionTo(fromX, fromY, toX, toY) {
      /**
      * toDeg - Converts radians to degrees.
      *
      * @param {number} rad - number of radians.
      * @return {number} - radians converted to degrees.
      */
      function toDeg(rad) {
        return rad * (180 / Math.PI);
      }

      // 1) Find the angle in rad, convert to deg (90 to -90).
      // 2) Find the sign of the delta on y axis (1, -1). Shift to (0, -2). Multiply by 90. (0, 180)
      // Add 1) and 2)
      // Normalize to 360

      let result = (toDeg(Math.atan((fromX - toX) / (fromY - toY))) + (90 * (Math.sign(fromY - toY) + 1)) + 360) % 360;
      (fromY - toY) === 0 ? result += 90 : null; // make sure we fix atan lim (division by zero).

      return result;
    }

    this.direction = computeDirectionTo(this.x, this.y, sprite.x, sprite.y);
    this.element ? this.element.update(this) : null;
  }

  /**
  * turnRight - Turns the sprite in a specified number of degrees to the right (clockwise)
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.turnRight(45);
  * });
  *
  * @param {number} deg - number of degrees to turn.
  */
  turnRight(deg) {
    this.direction = (this.direction + deg) % 360;
    this.element ? this.element.update(this) : null;
  }

  /**
  * turnLeft - Turns the sprite in a specified number of degrees to the left (counter-clockwise)
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.turnLeft(45);
  * });
  *
  * @param {number} deg - number of degrees to turn.
  */
  turnLeft(deg) {
    this.direction = ((this.direction + 360) - deg) % 360;
    this.element ? this.element.update(this) : null;
  }

  /**
  * setRotationStyle - Sets one of three possible rotation styles:
  *   - 'no' / 2 - the sprites changes the direction in which it points without changing the sprites appearance.
  *   - 'left-right' / 1 - the sprite will flip horizontally when direction is between 180 and 360.
  *   - 'all' / 0 - the sprite will rotate around its center
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.setRotationStyle('left-right');
  *
  * @example
  * sprite.setRotationStyle(1);
  *
  * @param {number} deg - number of degrees to turn.
  */
  setRotationStyle(style) {
    let curStyle = style;

    style === 'no' ? curStyle = 2 : null;
    style === 'left-right' ? curStyle = 1 : null;
    style === 'all' ? curStyle = 0 : null;

    this.rotationStyle = curStyle;
  }

  /** Looks * */

  /**
  * _refreshCostume - Sets the costume and sprite width and hight then refreshes element.
  *
  * @private
  */
  _refreshCostume() {
    if (this.costume) {
      this.width = this.costume.visibleWidth;
      this.height = this.costume.visibleHeight;
    }

    this.element ? this.element.update(this) : null;
  }

  /**
  * addCostume - Adds a costume to the sprite
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  *
  * @param {object} costume - the costume to add.
  */
  addCostume(costume) {
    this.costumes.push(costume);

    // if "bare" set the added as active.
    if (!this.costume) {
      this.costume = this.costumes[0];
      this.width = this.costume.visibleWidth;
      this.height = this.costume.visibleHeight;
    }

    this.element ? this.element.update(this) : null;
  }

  /**
  * switchCostumeTo - Switches to specified costume. If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  * sprite.switchCostumeTo(costume);
  *
  * @param {object} backdrop - the costume to switch too.
  */
  switchCostumeTo(costume) {
    const currentCostumeIndex = this.costumes.indexOf(costume);
    currentCostumeIndex !== -1 ? this.costume = this.costumes[currentCostumeIndex] : null;

    this._refreshCostume();
  }

  /**
  * switchCostumeToNum - Switches to specified costume by number of current (0 is first). If not found fails silently.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  * sprite.switchCostumeToNum(1);
  *
  * @param {number} index - the costume to switch too.
  */
  switchCostumeToNum(index) {
    this.switchCostumeTo(this.costumes[index]);
  }

  /**
  * nextCostume - Switches to the next costume.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  * sprite.nextCostume();
  *
  */
  nextCostume() {
    const currentCostumeIndex = this.costumes.indexOf(this.costume);
    this.costume = this.costumes[(currentCostumeIndex + 1) % this.costumes.length];

    this._refreshCostume();
  }

  /**
  * removeCostume - Removes a costume.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  * sprite.removeCostume(costume);
  *
  * @param {object} costume - the costume to remove.
  */
  removeCostume(costume) {
    if (this.costumes.length > 1) {
      const currentCostumeIndex = this.costumes.indexOf(costume);
      this.costume === costume ? this.costume = this.costumes[(currentCostumeIndex + 1) % this.costumes.length] : null;
      this.costumes = this.costumes.filter((item) => item !== costume);
    } else {
      this.costumes = [];
      this.costume = null;
    }
    this._refreshCostume();
  }

  /**
  * removeCostumeNum - Removes the specified costume by number of current (0 is first).
  * If there is only one costume, will fail and emit a console message.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let costume = new blockLike.Costume();
  *
  * sprite.addTo(stage);
  * sprite.addCostume(costume);
  * sprite.removeCostumeNum(1);
  *
  * @param {number} index - the costume to remove.
  */
  removeCostumeNum(index) {
    this.removeCostume(this.costumes[index]);
  }

  /**
  * show - Shows the sprite. By default sprites are shown.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.hide();
  * sprite.show();
  *
  */
  show() {
    this.showing = true;
    this.element ? this.element.update(this) : null;
  }

  /**
  * hide - Hides the sprite. By default sprites are shown.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.hide();
  *
  */
  hide() {
    this.showing = false;
    this.element ? this.element.update(this) : null;
  }

  /**
  * refresh - Forces a sprite refresh.
  * Note: service method to be used if costume was manipulated directly.
  */
  refresh() {
    const me = this;
    // wait a sec...
    // TODO: This is to accomodate dynamic image resize. Not ideal. Should be event driven.
    setTimeout(() => {
      // in case costume was resized force a reset of size.
      me.setSize(me.magnification);
      // then refresh the DOM.
      me.element ? me.element.update(me) : null;
    }, this.pace);
  }

  /**
  * resizeToImage - sets the width and height of the sprite to that of the image file of current costume.
  * Note: service method. Similar to calling resizeToImage() on costume and then refresh() on sprite.
  *
  * @example
  * const sprite = new blockLike.Sprite(null);
  *
  * const angrySheep = new blockLike.Costume({
  *   image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Emojione_1F411.svg/200px-Emojione_1F411.svg.png',
  * });
  * angrySheep.addTo(sprite);
  *
  * sprite.resizeToImage();
  * sprite.addTo(stage);
  */
  resizeToImage() {
    if (this.costume) {
      this.costume.resizeToImage();
    }

    this.refresh();
  }

  /**
  * inner - Places an HTML element inside the current costume of the sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.inner('<p class="big centered rainbow">:)</p>');
  *
  * @example
  * sprite.inner('I like text only');
  *
  * @param {object} el - the DOM element.
  */
  inner(html) {
    this.costume.inner(html);
    this.element ? this.element.update(this) : null;
  }

  /**
  * insert - Places a DOM element inside the current costume of the sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.insert(document.getElementById('my-html-creation'));
  *
  * @param {object} el - the DOM element.
  */
  insert(el) {
    this.costume.insert(el);
    this.element ? this.element.update(this) : null;
  }

  /**
  * _refreshSize - Sets the sprite width and hight in relation to original then refreshes element.
  *
  * @private
  * @param {object} costume - the costume to add.
  */
  _refreshSize() {
    /**
    * decimalRound - rounds a number too decimal points.
    *
    * @param {number} value - the value to round.
    * @param {number} points - how many decimal points to leave.
    */
    function decimalRound(value, points) {
      return Math.round(value * (10 ** points)) / (10 ** points);
    }

    if (this.costume) {
      this.width = decimalRound(this.costume.width * (this.magnification / 100), 2);
      this.height = decimalRound(this.costume.height * (this.magnification / 100), 2);

      this.costumes.forEach((item) => {
        const costume = item;
        costume.visibleWidth = decimalRound(costume.width * (this.magnification / 100), 2);
        costume.visibleHeight = decimalRound(costume.height * (this.magnification / 100), 2);
      });

      this.costume.visibleWidth = this.width;
      this.costume.visibleHeight = this.height;

      this.element ? this.element.update(this) : null;
    }
  }

  /**
  * changeSize - Changes the size of the sprite by specified percentage number.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.changeSize(50);
  *
  * @param {number} change - the percentage change.
  */
  changeSize(change) {
    this.magnification += change;

    this._refreshSize();
  }

  /**
  * setSize - Sets the size of the sprite to the specified percentage number.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.setSize(150);
  *
  * @param {number} percent - the percentage to set.
  */
  setSize(percent) {
    this.magnification = percent;

    this._refreshSize();
  }

  /** Text UI * */

  /**
  * think - Creates a "think bubble" over the sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.think('I think therefore I am.');
  *
  * @param {string} text - the text inside the bubble.
  */
  think(text) {
    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null;
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__.default(this, 'think', text) : null;
    }
  }

  /**
  * thinkWait - Creates a "think bubble" over the sprite for a specified number of seconds.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.thinkWait('I think therefore I am.', 3);
  *
  * @param {string} text - the text inside the bubble.
  * @param {number} sec - the number of seconds to wait.
  */
  thinkWait(text, sec, triggeringId = null) {
    setTimeout(() => {
      this.think('');
      this._releaseWaited(triggeringId);
    }, sec * 1000);
    this.think(text);
  }

  /**
  * say - Creates a "speech bubble" over the sprite.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.say('It is not the consciousness of men that determines their being, but, on the contrary, their social being that determines their consciousness.');
  *
  * @param {string} text - the text inside the bubble.
  */
  say(text) {
    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null;
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__.default(this, 'say', text) : null;
    }
  }

  /**
  * sayWait - Creates a "speech bubble" over the sprite for a specified number of seconds.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.sayWait('It is not the consciousness of men that determines their being, but, on the contrary, their social being that determines their consciousness.', 3);
  *
  * @param {string} text - the text inside the bubble.
  * @param {number} sec - the number of seconds to wait.
  */
  sayWait(text, sec, triggeringId = null) { // eslint-disable-line class-methods-use-this
    setTimeout(() => {
      this.say('');
      this._releaseWaited(triggeringId);
    }, sec * 1000);
    this.say(text);
  }

  /**
  * ask - Creates an "ask bubble" over the sprite.
  * Allows for an input box to be displayed to the user and
  * capture user input into the variable specified by the user.
  * Note - variable for answer must be declared in global scope.
  *
  * @example
  * //good:
  * let answer;
  * sprite.whenClicked( function() {
  *   answer = this.ask('Is the destiny of mankind decided by material computation?');
  *   this.say(answer);
  * });
  *
  * // bad:
  * sprite.whenClicked( function() {
  *   let answer;
  *   answer = this.ask('Is the destiny of mankind decided by material computation?');
  *   this.say(answer);
  * });
  *
  * @param {string} text - the text of the question
  *
  */
  ask(text, theVar = null, triggeringId = null) {
    const me = this;
    me.askId = this._generateUUID();

    if (this.element) {
      this.textui ? this.textui = this.textui.delete(this) : null;
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__.default(me, 'ask', text) : null;

      // this will wait for user input
      document.addEventListener(`blockLike.ask.${this.id}.${me.askId}`, function askListener(e) {
        // remove it.
        document.removeEventListener(`blockLike.ask.${me.id}.${me.askId}`, askListener);
        // this is the waited method listener. release it.
        me._releaseWaited(triggeringId);
        // set the user defined variable to the captured value.
        theVar ? me._setToVar(theVar, e.detail.value) : null;
        // remove the UI.
        me.textui ? me.textui = me.textui.delete(me) : null;
      });
    }
  }

  /** Pen * */

  /**
  * penClear - Clears the drawing surface.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.penClear();
  * });
  *
  */
  penClear() {
    this.surface.clear(this);
  }

  /**
  * penDown - "Activates" drawing by setting required values.
  * When activated sprite motion will create the drawing on the stage's canvas.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.penDown();
  *   this.move(100);
  * });
  *
  */
  penDown() {
    this.drawing = true;
    this.prevX = this.x;
    this.prevY = this.y;
    this.surface.draw(this);
  }

  /**
  * penUp - "Deactivates" drawing by setting required values.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.penDown();
  *   this.move(100);
  *   this.penUp();
  * });
  *
  */
  penUp() {
    this.drawing = false;
    this.surface.draw(this);
  }

  /**
  * setPenColor - Sets the color of the pen.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.setPenColor('#ff0000')
  *
  * @example
  * sprite.setPenColor('red')
  *
  * @param {string} colorString - a valid color definition for canvas strokeStyle.
  */
  setPenColor(colorString) {
    this.penColor = colorString;
  }

  /**
  * setPenSize - Sets the size of the pen.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.setPenSize(10);
  *
  * @param {number} pixels - a number for canvas lineWidth.
  */
  setPenSize(pixels) {
    this.penSize = pixels;
  }

  /**
  * changePenSize - Changes the size of the pen.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   this.changePenSize(10);
  * });
  *
  * @param {number} change - the change in pixels.
  */
  changePenSize(change) {
    this.penSize += change;
  }

  /* Sensing */

  /**
  * distanceTo - Returns the distance to a point on the screen.
  *
  * @example
  * let stage = new blockLike.Stage({sensing: true});
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  *
  * stage.whenClicked( function() {
  *  sprite.say(this.distanceTo(this.mouseX, this.mouseY))
  * });
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let sprite = new blockLike.otherSprite();
  *
  * sprite.addTo(stage);
  * otherSprite.addTo(stage);
  *
  * stage.whenClicked( function() {
  *  sprite.say(this.distanceTo(otherSprite.x, otherSprite.y))
  * });
  *
  * @param {number} x - the x coordinate.
  * @param {number} y - the y coordinate.
  * @return {number} - distance in pixels to position on screen (not rounded).
  */
  distanceTo(x, y) {
    const dx = this.x - x;
    const dy = this.y - y;

    return Math.sqrt((dx * dx) + (dy * dy));
  }

  /**
  * touchingEdge - Checks is this sprite touches the edge of the stage and returns the edge touched.
  *
  * Notes:
  * 1. This is based on rectangular collision detection.
  * 2. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *  while(this.x < stage.width / 2) {
  *    this.move(10)
  *    this.say(this.touchingEdge());
  *   }
  * });
  *
  * @return {string} - the side of the stage that is touched (null, top, bottom, left, right)
  */
  touchingEdge() {
    let result = null;

    if ((this.x) + (this.width / 2) > this.stageWidth / 2) {
      result = 'right';
    }
    if ((this.x) - (this.width / 2) < -1 * (this.stageWidth / 2)) {
      result = 'left';
    }
    if ((this.y) + (this.height / 2) > this.stageHeight / 2) {
      result = 'top';
    }
    if ((this.y) - (this.height / 2) < -1 * (this.stageHeight / 2)) {
      result = 'bottom';
    }

    return result;
  }

  /**
  * isTouchingEdge - Checks is this sprite touches the edge.
  *
  * Notes:
  * 1. This is based on rectangular collision detection.
  * 2. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *  while(this.x < stage.width / 2) {
  *    this.move(10)
  *    this.say(this.isTouchingEdge());
  *   }
  * });
  *
  * @return {boolean} - is the sprite touching the edge.
  */
  isTouchingEdge() {
    return !!this.touchingEdge();
  }

  /**
  * touching - Checks is this sprite touches another and returns at what side it touches.
  *
  * Notes:
  * 1. this compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
  * 2. if the sprite has gone "into" the other the side "penetrated more" will be returned.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let otherSprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * otherSprite.addTo(stage);
  * otherSprite.move(200);
  * sprite.whenClicked( function() {
  *  while(!this.touching(otherSprite)) {
  *    this.move(10);
  *    this.say(this.touching(otherSprite))
  *   }
  * });
  *
  * @param {string} sprite - the sprite to check if touching.
  * @return {string} - the side of the sprite that is touched (null, top, bottom, left, right)
  */
  touching(sprite) {
    let result = null;

    if (
      this.x + (this.width / 2) > sprite.x - (sprite.width / 2)
      && this.x - (this.width / 2) < sprite.x + (sprite.width / 2)
      && this.y + (this.height / 2) > sprite.y - (sprite.height / 2)
      && this.y - (this.height / 2) < sprite.y + (sprite.height / 2)
    ) {
      this.x >= sprite.x ? result = 'left' : null;
      this.x < sprite.x ? result = 'right' : null;
      this.y > sprite.y && Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x) ? result = 'bottom' : null;
      this.y < sprite.y && Math.abs(this.y - sprite.y) > Math.abs(this.x - sprite.x) ? result = 'top' : null;
    }

    return result;
  }

  /**
  * isTouching - Checks is this sprite touches another.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  * let otherSprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * otherSprite.addTo(stage);
  * otherSprite.move(200);
  * sprite.whenClicked( function() {
  *  while(!this.isTouching(otherSprite)) {
  *    this.move(10);
  *   }
  * });
  *
  * @param {string} sprite - the sprite to check if touching.
  * @return {boolean} - is the sprite touching the specified sprite.
  */
  isTouching(sprite) {
    return !!this.touching(sprite);
  }

  /**
  * touchingBackdropColor - Returns the hex value to all pixels in backdrop area covered by the sprite rectangle.
  *
  * Notes:
  * 1. This is based on rectangular collision detection.
  * 2. This compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
  * 3. The backdrop image must be a local image served from same origin.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * sprite.whenClicked( function() {
  *   while(true){
  *     let touchedColors = this.touchingBackdropColor();
  *     this.say(touchedColors);
  *     this.move(5);
  *   }
  * });
  *
  * @return {array} - colors (strings) touched.
  */
  touchingBackdropColor() {
    const result = [];

    /**
    * rgbToHex - converts a color defined by RGB values into a on defined as a hex string.
    *
    * From: https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
    *
    * @param {number} r - the red value (0 to 255).
    * @param {number} g - the green value (0 to 255).
    * @param {number} b -  the blue value (0 to 255).
    * @return {string} - hex color string.
    */
    function rgbToHex(r, g, b) {
      return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`; // eslint-disable-line no-bitwise
    }

    try {
      const backdropContext = this.againstBackdrop.getContext('2d');
      const data = backdropContext.getImageData(((this.stageWidth / 2) - (this.width / 2)) + this.x, ((this.stageHeight / 2) - (this.height / 2)) - this.y, this.width, this.height).data;

      for (let i = 0; i < data.length; i += 4) {
        data[i + 3] !== 0 ? result.push(rgbToHex(data[i], data[i + 1], data[i + 2])) : null;
      }
    } catch (e) {
      console.log('BlockLike.js Notice: isTouchingBackdropColor() ingnored. Backdrop image can not be located at a remote origin.'); // eslint-disable-line no-console
    }

    return Array.from(new Set(result));
  }

  /**
  * isTouchingBackdropColor - compares a given hex value to all pixels in backdrop area covered by the sprite rectangle.
  * If a match is found the color is returned.
  *
  * Notes:
  * 1. This is based on rectangular collision detection.
  * 2. This compares a naive rectangle, so if the sprite is rotated touching might be sensed early or late.
  * 3. The backdrop image must be a local image served from same origin.
  *
  * @example
  * let stage = new blockLike.Stage();
  * let sprite = new blockLike.Sprite();
  *
  * sprite.addTo(stage);
  * let moving = true;
  * sprite.whenClicked( function() {
  *   while(moving){
  *     this.isTouchingBackdropColor('#ff0000') ? moving = false : moving = true;
  *     this.move(5);
  *   }
  * });
  *
  * @param {string} backdropColor - the color to evaluate.
  * @return {boolean} - does the sprite touch the color.
  */
  isTouchingBackdropColor(backdropColor) {
    const hexArr = this.touchingBackdropColor(backdropColor);

    return hexArr.includes(backdropColor);
  }
}


/***/ }),

/***/ "./src/stage-element.js":
/*!******************************!*\
  !*** ./src/stage-element.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StageElement)
/* harmony export */ });
/* harmony import */ var _element_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./element-css */ "./src/element-css.js");


/**
 * Class representing the UI Element of the stage.
 * Each Stage has one.
 * @private
 */
class StageElement {
  /**
  * constructor - Creates a Stage Element.
  *
  * @param {object} options - the stage for which the element is created.
  * @param {object} stage - the stage created.
  */
  constructor(options, stage) {
    const el = document.createElement('div');

    /**
    * createDiv - creates a div at specified zIndex.
    *
    * @param {number} zIndex - desired place in "stack"
    * @return {object} - a stage wide/high DOM element.
    */
    function createDiv(zIndex) {
      const sel = document.createElement('div');

      sel.style.width = `${options.width}px`;
      sel.style.height = `${options.height}px`;
      sel.style.zIndex = zIndex;
      sel.style.position = 'absolute';
      sel.style.touchAction = 'manipulation';

      return sel;
    }

    /**
    * createCanvas - creates a canvas at specified zIndex.
    *
    * @param {number} zIndex - desired place in "stack"
    * @return {object} - a stage wide/high DOM element.
    */
    function createCanvas(zIndex) {
      const cel = document.createElement('canvas');

      cel.width = options.width;
      cel.height = options.height;
      cel.style.zIndex = zIndex;
      cel.style.position = 'absolute';
      cel.style.left = '0px';
      cel.style.top = '0px';

      return cel;
    }

    /**
    * createFlag - creates a "flag" div.
    *
    * @return {object} - a stage wide/high DOM element with flag at centers.
    */
    function createFlag() {
      const flagSize = 130;
      const fel = createDiv(-1);

      const felitem = document.createElement('div');

      // Convert the center based x coordinate to a left based one.
      const x = -(flagSize / 2);
      // Convert the center based y coordinate to a left based one.
      const y = -(flagSize / 2);

      // looks
      felitem.style.width = `${flagSize}px`;
      felitem.style.height = `${flagSize}px`;
      felitem.style.position = 'absolute';
      felitem.innerHTML = '&#9873;';

      felitem.style.left = `${(options.width / 2) + x}px`;
      felitem.style.top = `${(options.height / 2) + y}px`;
      felitem.className = 'blocklike-flag';

      fel.appendChild(felitem);
      fel.style.display = 'none';

      return fel;
    }

    el.id = `${stage.id}`;

    el.style.width = `${options.width}px`;
    el.style.height = `${options.height}px`;

    el.style.position = 'relative';
    el.style.boxSizing = 'border-box';
    el.style.overflow = 'hidden';

    options.parent.appendChild(el);

    this.backdropContainer = createCanvas(0);
    this.backdropContainer.id = `${stage.id}-backdrop`;
    this.backdropContainer.className = 'blocklike-panel-backdrop';
    el.appendChild(this.backdropContainer);

    this.canvas = createCanvas(0);
    this.canvas.id = `${stage.id}-surface`;
    this.canvas.className = 'blocklike-panel-surface';
    el.appendChild(this.canvas);

    this.flag = createFlag();
    this.flag.id = `${stage.id}-flag`;
    this.flag.className = 'blocklike-panel-flag';
    el.appendChild(this.flag);

    this.context = this.canvas.getContext('2d');

    this.el = el;
  }

  /**
  * update - updates the DOM element.
  *
  * @param {object} stage - the stage to update.
  */
  update(stage) {
    const el = stage.element.el;
    const backdropContext = stage.element.backdropContainer.getContext('2d');

    let marginTB = 0;
    if (stage.element.el.parentElement.tagName === 'BODY') {
      marginTB = Math.floor((window.innerHeight - stage.height) / 2);
      marginTB < 0 ? marginTB = 0 : null;
    }

    // If color - fill the canvas with the color set, or clear it
    if (stage.backdrop && stage.backdrop.color) {
      backdropContext.rect(0, 0, stage.width, stage.height);
      backdropContext.fillStyle = stage.backdrop.color;
      backdropContext.fill();
    } else {
      backdropContext.clearRect(0, 0, stage.width, stage.height);
    }

    // If image - draw the image on canvas
    if (stage.backdrop && stage.backdrop.image) {
      const img = new Image();
      img.onload = () => {
        backdropContext.drawImage(img, 0, 0, stage.width, stage.height);
      };
      img.src = stage.backdrop.image;
    }

    // zoom and placement
    el.style.transform = `scale(${stage.magnification / 100})`;
    el.style.margin = `${marginTB}px auto`;

    // css rules
    _element_css__WEBPACK_IMPORTED_MODULE_0__.apply(stage);

    // css classes
    stage.backdrop ? el.className = stage.backdrop.classes.concat(stage.classes).join(' ') : el.className = stage.classes.join(' ');
  }

  /**
  * delete - deletes the DOM element
  */
  delete(stage) {
    const el = stage.element.el;

    el.parentNode.removeChild(el);
    return null;
  }

  /**
  * addFlag - puts the flag div infront of everything (shows it)
  *
  * @param {object} stage - the stage that "requested" the flag.
  */
  addFlag(stage) {
    const el = stage.element.flag;

    el.style.zIndex = 1000;
    el.style.display = 'block';
  }

  /**
  * removeFlag - puts the flag div at the back (hides it)
  *
  * @param {object} stage - the stage that "requested" the flag.
  */
  removeFlag(stage) {
    const el = stage.element.flag;

    el.style.zIndex = -1;
    el.style.display = 'none';
  }
}


/***/ }),

/***/ "./src/stage-sensing.js":
/*!******************************!*\
  !*** ./src/stage-sensing.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ enable)
/* harmony export */ });
/**
* Encapsulates the stage sensing functionality.
*/

/**
* enable - Enables sensing of document level events (keydown, mousemove, mousedown, touchmove)
*/
function enable(stage) {
  const me = stage;
  me.sensing = true;

  /**
  * decimalRound - rounds a number too decimal points.
  *
  * @param {number} value - the value to round.
  * @param {number} points - how many decimal points to leave.
  */
  function decimalRound(value, points) {
    return Math.round(value * (10 ** points)) / (10 ** points);
  }

  /**
  * computeX - Computes centered x based on x extracted from event.
  */
  function computeX(x) {
    const mag = me.magnification / 100;
    return decimalRound((x - (me.element.el.offsetLeft) - (me.width / 2)) / mag, 2);
  }

  /**
  * computeY - Computes centered y based on y extracted from event.
  */
  function computeY(y) {
    const mag = me.magnification / 100;
    return decimalRound((-y + me.element.el.offsetTop + (me.height / 2)) / mag, 2);
  }

  document.addEventListener('keydown', (e) => {
    e.key && me.keysKey.indexOf(e.key.toLowerCase()) === -1 ? me.keysKey.push(e.key.toLowerCase()) : null;
    e.code && me.keysCode.indexOf(e.code.toLowerCase()) === -1 ? me.keysCode.push(e.code.toLowerCase()) : null;
    me.keysKeyCode.indexOf(e.keyCode) === -1 ? me.keysKeyCode.push(e.keyCode) : null;
  });

  document.addEventListener('keyup', (e) => {
    e.key ? me.keysKey = me.keysKey.filter((item) => item !== e.key.toLowerCase()) : null;
    e.code ? me.keysCode = me.keysCode.filter((item) => item !== e.code.toLowerCase()) : null;
    me.keysKeyCode = me.keysKeyCode.filter((item) => item !== e.keyCode);
  });

  me.element.el.addEventListener('mousemove', (e) => {
    me.mouseX = computeX(e.clientX);
    me.mouseY = computeY(e.clientY);
  });

  me.element.el.addEventListener('touchmove', (e) => {
    me.mouseX = computeX(e.changedTouches[0].clientX);
    me.mouseY = computeY(e.changedTouches[0].clientY);
  }, { passive: true });

  me.element.el.addEventListener('mousedown', () => {
    me.mouseDown = true;
  });
  me.element.el.addEventListener('mouseup', () => {
    me.mouseDown = false;
  });

  me.element.el.addEventListener('touchstart', (e) => {
    me.mouseX = computeX(e.touches[0].clientX);
    me.mouseY = computeY(e.touches[0].clientY);
    me.mouseDown = true;
  }, { passive: true });

  me.element.el.addEventListener('touchend', () => {
    me.mouseDown = false;
    me.mouseX = null;
    me.mouseY = null;
  });
}


/***/ }),

/***/ "./src/stage-surface.js":
/*!******************************!*\
  !*** ./src/stage-surface.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StageSurface)
/* harmony export */ });
/**
 * Class representing the stage surface on which sprites draw.
 * Each Stage has one.
 * @private
 */
class StageSurface {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} stage - the stage on which the sprite is drawing.
  */
  constructor(stage) {
    this.context = stage.element.context;
  }

  /**
  * draw - draws a line "behind" a moving sprite.
  * Note: sprite always has current and previous x,y values to allow drawing to previous location.
  *
  * @param {object} sprite - the sprite drawing the line.
  */
  draw(sprite) {
    if (sprite.drawing) {
      this.context.beginPath();
      this.context.moveTo((sprite.stageWidth / 2) + sprite.x, (sprite.stageHeight / 2) + (sprite.y * -1));
      this.context.lineTo((sprite.stageWidth / 2) + sprite.prevX, (sprite.stageHeight / 2) + (sprite.prevY * -1));
      this.context.lineWidth = sprite.penSize;
      this.context.strokeStyle = sprite.penColor;
      this.context.stroke();
    }
  }

  /**
  * clear - clears the canvas
  */
  clear(sprite) {
    this.context.clearRect(0, 0, sprite.stageWidth, sprite.stageHeight);
  }
}


/***/ }),

/***/ "./src/stage.js":
/*!**********************!*\
  !*** ./src/stage.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stage)
/* harmony export */ });
/* harmony import */ var _entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./entity */ "./src/entity.js");
/* harmony import */ var _stage_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stage-element */ "./src/stage-element.js");
/* harmony import */ var _stage_surface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage-surface */ "./src/stage-surface.js");
/* harmony import */ var _sprite_element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sprite-element */ "./src/sprite-element.js");
/* harmony import */ var _stage_sensing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stage-sensing */ "./src/stage-sensing.js");








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
class Stage extends _entity__WEBPACK_IMPORTED_MODULE_0__.default {
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
  constructor(options = {}) {
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
      parent: document.body,
      pace: 33,
      backdrop: null,
    };
    const actual = { ...defaults, ...options };

    super(actual.pace);

    // backdrops
    this.backdrops = [];

    if (actual.backdrop) {
      this.backdrop = actual.backdrop;
      this.backdrops.push(this.backdrop);
    }

    this.element = new _stage_element__WEBPACK_IMPORTED_MODULE_1__.default(actual, this);
    this.width = actual.width;
    this.height = actual.height;

    this.keysCode = [];
    this.keysKey = [];
    this.keysKeyCode = [];

    this.sprites = [];

    this.magnification = 100;

    this.cssRules = [];
    this.classes = [];

    this.mouseDown = null;
    this.mouseX = null;
    this.mouseY = null;

    actual.sensing ? (0,_stage_sensing__WEBPACK_IMPORTED_MODULE_4__.default)(this) : null;

    this.element.update(this);
  }

  /**
  * delete - Deletes the stage element.
  *
  * @example
  * let stage = new blockLike.Stage();
  *
  * stage.delete();
  */
  delete() {
    this.element = this.element.delete(this);
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
  addSprite(sprite) {
    const curSprite = sprite;

    curSprite.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_3__.default(sprite, this);
    curSprite.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_2__.default(this);

    curSprite.element.flag = this.element.flag;
    curSprite.againstBackdrop = this.element.backdropContainer;

    curSprite.stageWidth = this.width;
    curSprite.stageHeight = this.height;

    this.sprites.push(curSprite);
    curSprite.z = this.sprites.length;

    sprite.element.update(curSprite);
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
  removeSprite(sprite) {
    const curSprite = sprite;
    this.sprites = this.sprites.filter((item) => item !== sprite);
    curSprite.element ? curSprite.element = curSprite.element.delete(curSprite) : null;
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
  addBackdrop(backdrop) {
    this.backdrops.push(backdrop);
    // if "bare" set the added as active
    !this.backdrop ? this.backdrop = this.backdrops[0] : null;
    this.element ? this.element.update(this) : null;
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
  switchBackdropTo(backdrop) {
    const currentBackdropIndex = this.backdrops.indexOf(backdrop);
    currentBackdropIndex !== -1 ? this.backdrop = this.backdrops[currentBackdropIndex] : null;

    this.element ? this.element.update(this) : null;
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
  switchBackdropToNum(index) {
    this.switchBackdropTo(this.backdrops[index]);
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
  nextBackdrop() {
    const currentBackdropIndex = this.backdrops.indexOf(this.backdrop);
    this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length];

    this.element ? this.element.update(this) : null;
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
  removeBackdrop(backdrop) {
    if (this.backdrops.length > 1) {
      const currentBackdropIndex = this.backdrops.indexOf(backdrop);
      this.backdrop === backdrop ? this.backdrop = this.backdrops[(currentBackdropIndex + 1) % this.backdrops.length] : null;
      this.backdrops = this.backdrops.filter((item) => item !== backdrop);
    } else {
      this.backdrops = [];
      this.backdrop = null;
    }
    this.element ? this.element.update(this) : null;
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
  removeBackdropNum(index) {
    this.removeBackdrop(this.backdrops[index]);
  }

  /**
  * refresh - Forces a sprite refresh.
  * Note: service method to be used if costume was manipulated directly.
  */
  refresh() {
    this.element ? this.element.update(this) : null;
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
  zoom(percent) {
    this.magnification = percent;
    this.element.update(this);
  }

  /** Sprites * */

  /**
  * _refreshSprites - Refresh the DOM element of all sprites currently on stage.
  *
  * @private
  * @param {number} index - the backdrop to switch too.
  */
  _refreshSprites() {
    let i = 0;
    this.sprites.forEach((item) => {
      const sprite = item;
      i += 1;
      sprite.z = i;
      sprite.element ? sprite.element.update(sprite) : null;
    });
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
  sendSpriteBackwards(sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index > 0) {
      this.sprites[index] = this.sprites[index - 1]; // move one up
      this.sprites[index - 1] = sprite; // me subject down
    }
    this._refreshSprites();
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
  sendSpriteForward(sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index < this.sprites.length - 1 && index !== -1) {
      this.sprites[index] = this.sprites[index + 1]; // move one down
      this.sprites[index + 1] = sprite; // me subject up
    }
    this._refreshSprites();
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
  sendSpriteToFront(sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index !== -1) {
      this.sprites.splice(index, 1);
      this.sprites.push(sprite);
    }
    this._refreshSprites();
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
  sendSpriteToBack(sprite) {
    const index = this.sprites.indexOf(sprite);
    if (index !== -1) {
      this.sprites.splice(index, 1);
      this.sprites.unshift(sprite);
    }
    this._refreshSprites();
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
  isKeyPressed(userKey) {
    let match = false;
    let check;

    typeof userKey === 'string' ? check = userKey.toLowerCase() : check = userKey;
    // Make sure each property is supported by browsers.
    // Note: user may write incompatible code.
    this.keysKey.indexOf(check) !== -1 ? match = true : null;
    this.keysCode.indexOf(check) !== -1 ? match = true : null;
    this.keysKeyCode.indexOf(check) !== -1 ? match = true : null;

    !this.sensing ? console.log('BlockLike.js Notice: isKeyPressed() ingnored. Stage sensing not enabled.') : null; // eslint-disable-line no-console

    return match;
  }
}


/***/ }),

/***/ "./src/text-ui-element.js":
/*!********************************!*\
  !*** ./src/text-ui-element.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TextUiElement)
/* harmony export */ });
/**
 * Class representing the UI Elements attached to a sprite.
 * Each Sprite may have one.
 * @private
 */
class TextUiElement {
  /**
  * constructor - Creates a ui element that "attahces" to a sprite.
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  * @param {string} type - what ui to create (say bubble, think bubble or ask box)
  * @param {string} text -  what the text said/thought/ask will be.
  * @param {object} askId - the ask box identifier (used to manage events).
  */
  constructor(sprite, type, text) {
    const el = document.createElement('div');
    /**
    * askInput - encapsulate the functionality of the input field used to capture user input with ask().
    *
    * @return {object} - the input dom element.
    */
    function askInput() {
      /**
      * sendAnswer - dispatches an event when the user has submitted the input.
      */
      function sendAnswer(value) {
        const event = new window.CustomEvent(`blockLike.ask.${sprite.id}.${sprite.askId}`, { detail: { value, askId: sprite.askId } });
        document.dispatchEvent(event);
      }

      const input = document.createElement('input');
      input.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
          sendAnswer(input.value);
          input.value = '';
        }
      });
      el.appendChild(input);

      const submit = document.createElement('button');
      submit.innerHTML = '&#x2713';
      submit.addEventListener('click', () => {
        sendAnswer(input.value);
        input.value = '';
      });
      el.appendChild(submit);

      return input;
    }

    this.text = text.toString();
    this.type = type;

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2);
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2);

    el.style.position = 'absolute';
    el.innerHTML = `${text}<br />`;

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`;
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`;

    el.style.zIndex = sprite.z;
    el.className = `blocklike-${type}`;

    let iel = null;
    if (type === 'ask') {
      iel = askInput(sprite, el);
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`;
    }

    sprite.element.el.parentNode.insertBefore(el, sprite.element.el);
    iel ? iel.focus() : null;

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`;

    this.el = el;
  }

  /**
  * update - updated the DOM element (moves with sprite).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  update(sprite) {
    const el = sprite.textui.el;

    // Convert the center based x coordinate to a left based one.
    const x = sprite.x - (sprite.width / 2);
    // Convert the center based y coordinate to a left based one.
    const y = (sprite.y * -1) - (sprite.height / 2);

    // looks
    // TODO: make this nicer...
    el.style.left = `${(sprite.stageWidth / 2) + x + (sprite.width * 0.6)}px`;
    el.style.top = `${((sprite.stageHeight / 2) + y) - 80 - (Math.floor(this.text.length / 30) * 16)}px`;

    if (sprite.textui.type === 'ask') {
      el.style.top = `${((sprite.stageHeight / 2) + y) - 110 - (Math.floor(this.text.length / 30) * 16)}px`;
    }

    el.style.visibility = `${(sprite.showing ? 'visible' : 'hidden')}`;
  }

  /**
  * delete - deletes the DOM element (hides it).
  *
  * @param {object} sprite - the sprite to which the ui is attached.
  */
  delete(sprite) {
    const el = sprite.textui.el;

    el.parentNode.removeChild(el);
    return null;
  }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stage": () => (/* reexport safe */ _stage__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Backdrop": () => (/* reexport safe */ _backdrop__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Sprite": () => (/* reexport safe */ _sprite__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Costume": () => (/* reexport safe */ _costume__WEBPACK_IMPORTED_MODULE_5__.default)
/* harmony export */ });
/* harmony import */ var _document_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-css */ "./src/document-css.js");
/* harmony import */ var _platforms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platforms */ "./src/platforms.js");
/* harmony import */ var _stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage */ "./src/stage.js");
/* harmony import */ var _backdrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./backdrop */ "./src/backdrop.js");
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
/* harmony import */ var _costume__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./costume */ "./src/costume.js");
/**
* BlockLike.js
*
* BlockLike.js is an educational JavaScript library.
* It bridges the gap between block-based and text-based programming.
*
* BlockLike.js is designed following Scratch concepts, methods and patterns.
* The screen is a centered stage. Interaction is with Sprites.
* Code is executed in a "paced" manner.
* Scratch block code and BlockLike.js text code are meant to be
* as literally similar as possible.
*
* BlockLike.js is written in ES6/ES7 flavored JavaScript.
* It is environment independent.
* It can be used anywhere modern JavaScript runs.
*
* @author Yaron (Ron) Ilan
* @email blocklike@ronilan.com
*
* Copyright 2018
* Fabriqué au Canada : Made in Canada
*/




 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars
 // eslint-disable-line no-unused-vars






(function init() {
  const style = document.createElement('style');

  style.type = 'text/css';
  style.innerHTML = `
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.defaultCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.uiCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.thinkCSS}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.sayCSS} \n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__.askCSS}`;

  document.getElementsByTagName('head')[0].appendChild(style);

  (0,_platforms__WEBPACK_IMPORTED_MODULE_1__.default)();
}());

})();

blockLike = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvYmFja2Ryb3AuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2Nvc3R1bWUuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2RvY3VtZW50LWNzcy5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvZWxlbWVudC1jc3MuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2VudGl0eS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvbG9vay5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9yZXdyaXRlci5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3ByaXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc2Vuc2luZy5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc3VyZmFjZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvbGliLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDZSx1QkFBdUIsMENBQUk7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxvQkFBb0I7O0FBRXBCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRjBCOztBQUUxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ2Usc0JBQXNCLDBDQUFJO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbktBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUCxHO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCLFlBQVksTUFBTTtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkIsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FB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QUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsT0FBTztBQUNyQixjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FB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Z0RBQVksQ0FBQztBQUNuQixNQUFNLG1EQUFlLENBQUM7QUFDdEIsTUFBTSxpREFBYSxDQUFDO0FBQ3BCLE1BQU0saURBQWEsQ0FBQzs7QUFFcEI7O0FBRUEsRUFBRSxtREFBUztBQUNYLENBQUMiLCJmaWxlIjoiYmxvY2tsaWtlLTEuMC4zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBCYWNrZHJvcC5cbiAqIEJhY2tkcm9wcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe1xuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL2JhY2tkcm9wLnN2ZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKHtcbiAqICAgY29sb3I6ICcjQTJEQUZGJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIEJhY2tkcm9wIHRvIGJlIHVzZWQgYnkgU3RhZ2Ugb2JqZWN0cy5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGJhY2tkcm9wLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGJhY2tkcm9wIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHt9O1xuICAgIGNvbnN0IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcblxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgYmFja2Ryb3AgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIGNvbnN0IGN1clN0YWdlID0gc3RhZ2U7XG4gICAgc3RhZ2UuYmFja2Ryb3BzLnB1c2godGhpcyk7XG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmVcbiAgICAhc3RhZ2UuYmFja2Ryb3AgPyBjdXJTdGFnZS5iYWNrZHJvcCA9IHN0YWdlLmJhY2tkcm9wc1swXSA6IG51bGw7XG4gICAgc3RhZ2UuZWxlbWVudCA/IHN0YWdlLmVsZW1lbnQudXBkYXRlKHN0YWdlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRUbyhzdGFnZSk7XG4gICogYmFja2Ryb3AucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byByZW1vdmUgdGhlIGJhY2tkcm9wIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBzdGFnZS5yZW1vdmVCYWNrZHJvcCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBDb3N0dW1lLlxuICogQ29zdHVtZXMgY2FuIGJlIGFkZGVkIHRvIGEgU3ByaXRlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gKiAgIHdpZHRoOiA1MCxcbiAqICAgaGVpZ2h0OiA1MCxcbiAqICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqIH0pO1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3N0dW1lIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIENvc3R1bWUgdG8gYmUgdXNlZCBieSBTcHJpdGUgb2JqZWN0cy4uXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgZm9yIHRoZSBjb3N0dW1lLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gdGhlIGNvc3R1bWUgd2lkdGggaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSB0aGUgY29zdHVtZSBoZWlnaHQgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbWFnZSAtIGEgVVJJIChvciBkYXRhIFVSSSkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIGNvbG9yOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgYWN0dWFsID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuICAgIHRoaXMudmlzaWJsZVdpZHRoID0gYWN0dWFsLndpZHRoO1xuICAgIHRoaXMudmlzaWJsZUhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG5cbiAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgY29zdHVtZSB0byB0aGUgc3ByaXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmFkZFRvKHNwcml0ZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gd2hpY2ggc3ByaXRlIHRvIGFkZCB0aGUgY29zdHVtZSB0b28uXG4gICovXG4gIGFkZFRvKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcbiAgICBzcHJpdGUuY29zdHVtZXMucHVzaCh0aGlzKTtcblxuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlLlxuICAgIGlmICghc3ByaXRlLmNvc3R1bWUpIHtcbiAgICAgIGN1clNwcml0ZS5jb3N0dW1lID0gc3ByaXRlLmNvc3R1bWVzWzBdO1xuICAgICAgY3VyU3ByaXRlLndpZHRoID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgY3VyU3ByaXRlLmhlaWdodCA9IHNwcml0ZS5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgY29zdHVtZSBmcm9tIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKiBjb3N0dW1lLnJlbW92ZUZyb20oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gcmVtb3ZlIHRoZSBjb3N0dW1lIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3ByaXRlKSB7XG4gICAgc3ByaXRlLnJlbW92ZUNvc3R1bWUodGhpcyk7XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb3N0dW1lIHRvIHRoYXQgb2YgdGhlIGltYWdlIGZpbGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAgKiAgIGltYWdlOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2QzL1NoZWVwX2luX2dyYXkuc3ZnJ1xuICAqIH0pO1xuICAqXG4gICogY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICovXG4gIHJlc2l6ZVRvSW1hZ2UoKSB7XG4gICAgLy8gcmVnaXN0ZXIgdGhlIGltYWdlIHNpemUgZnJvbSB0aGUgZmlsZVxuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcblxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbWUud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgbWUuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS52aXNpYmxlV2lkdGggPSBtZS53aWR0aDtcbiAgICAgICAgbWUudmlzaWJsZUhlaWdodCA9IG1lLmhlaWdodDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGlubmVyIC0gUGxhY2VzIGFuIEhUTUwgZWxlbWVudCBpbnNpZGUgdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmlubmVyKCc8cCBjbGFzcz1cImJpZyBjZW50ZXJlZCByYWluYm93XCI+Oik8L3A+Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvc3R1bWUuaW5uZXIoJ0kgbGlrZSB0ZXh0IG9ubHknKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gdGhlIGh0bWwgdG8gaW5zZXJ0LlxuICAqL1xuICBpbm5lcihodG1sKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBodG1sO1xuICB9XG5cbiAgLyoqXG4gICogaW5zZXJ0IC0gUGxhY2VzIGEgRE9NIGVsZW1lbnQgaW5zaWRlIHRoZSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5pbnNlcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWh0bWwtY3JlYXRpb24nKSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGluc2VydChlbCkge1xuICAgIGNvbnN0IGllbCA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICBpZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgaWVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5oZXJpdCc7XG5cbiAgICB0aGlzLmltYWdlID0gbnVsbDtcbiAgICB0aGlzLmNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICB0aGlzLmlubmVySFRNTCA9IGllbC5vdXRlckhUTUw7XG4gIH1cbn1cbiIsIi8qKlxuKiBDb2xsZWN0aW9uIG9mIGNzcyBzdHJpbmdzIHRvIGJlIGluamVjdGVkIHRvIHRoZSBoZWFkIHNlY3Rpb24gb2YgYSBwYWdlLlxuKiBAcHJpdmF0ZVxuKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q1NTID0gYFxuKiB7IFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOyAgICAgICAgICAgICAgICAvKiBwcmV2ZW50IGNhbGxvdXQgdG8gY29weSBpbWFnZSwgZXRjIHdoZW4gdGFwIHRvIGhvbGQgKi9cbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7IC8qIHByZXZlbnQgdGFwIGhpZ2hsaWdodCBjb2xvciAvIHNoYWRvdyAqL1xufVxuaHRtbCwgYm9keXtcbiAgbWFyZ2luOjA7XG4gIHBhZGRpbmc6MDtcbn1cbmA7XG5cbmV4cG9ydCBjb25zdCB1aUNTUyA9IGBcbi5ibG9ja2xpa2UtZmxhZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogNjVweDtcbiAgbGluZS1oZWlnaHQ6IDY1cHg7XG4gIHBhZGRpbmc6IDMycHg7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xuICBib3JkZXItcmFkaXVzOiA2NXB4O1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHRoaW5rQ1NTID0gYFxuLmJsb2NrbGlrZS10aGluayB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBsZWZ0OiAyMDBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbWluLWhlaWdodDogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuLmJsb2NrbGlrZS10aGluazpiZWZvcmUge1xuICBwb3NpdGlvbjphYnNvbHV0ZTtcbiAgYm90dG9tOiAtMzBweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuLmJsb2NrbGlrZS10aGluazphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtNDVweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMTVweDtcbiAgaGVpZ2h0OiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHNheUNTUyA9IGBcbi5ibG9ja2xpa2UtYXNrLFxuLmJsb2NrbGlrZS1zYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5ibG9ja2xpa2UtYXNrOmJlZm9yZSxcbi5ibG9ja2xpa2Utc2F5OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxM3B4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0zM3B4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogIzQ0NCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNDQ0O1xufVxuLmJsb2NrbGlrZS1hc2s6YWZ0ZXIsXG4uYmxvY2tsaWtlLXNheTphZnRlciB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxNXB4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0yOHB4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogI2ZhZmFmYSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmFmYWZhO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IGFza0NTUyA9IGBcbi5ibG9ja2xpa2UtYXNrIGlucHV0IHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgcGFkZGluZzogMnB4O1xuICBtYXJnaW46IDJweDtcbiAgd2lkdGg6IDc1JTtcbn1cbi5ibG9ja2xpa2UtYXNrIGJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIGhlaWdodDogMjZweDtcbiAgcGFkZGluZzogMCA1cHg7XG4gIG1hcmdpbjogMDtcbn1cbmA7XG4iLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIG1hbmFnaW5nIGVsZW1lbnQgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIGVudGl0aWVzLlxuKi9cblxuLyoqXG4qIGFwcGx5IC0gYXBwbHkgY3NzUnVsZXMgb2YgYW4gZW50aXR5IHRvIGl0cyBET00gZWxlbWVudC5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG4gIC8vIFNwcml0ZXMgaGF2ZSBDb3N0dW1lcywgU3RhZ2UgaGFzIEJhY2tkcm9wLCBmaWd1cmUgb3V0IHdoaWNoIGVudGl0eSBpdCBpcy5cbiAgY29uc3QgY3VyTG9vayA9IGVudGl0eS5iYWNrZHJvcCB8fCBlbnRpdHkuY29zdHVtZTtcbiAgY29uc3QgY3VyTG9va3MgPSBlbnRpdHkuYmFja2Ryb3BzIHx8IGVudGl0eS5jb3N0dW1lcztcblxuICBjb25zdCBlbCA9IGVudGl0eS5lbGVtZW50LmVsO1xuXG4gIC8vIHJlbW92ZSBhbnkgc3R5bGUgYXBwbGllZCBieSBhbnkgbG9va1xuICBpZiAoY3VyTG9va3MpIHtcbiAgICBjdXJMb29rcy5mb3JFYWNoKChiKSA9PiB7XG4gICAgICBiLmNzc1J1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY2FtZWxDYXNlZCA9IGl0ZW0ucHJvcC5yZXBsYWNlKC8tKFthLXpdKS9nLCAoZykgPT4gZ1sxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSAnJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gYWRkIGN1cnJlbnQgbG9vayBzdHlsZXNcbiAgaWYgKGN1ckxvb2spIHtcbiAgICBjdXJMb29rLmNzc1J1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgY3VyRW50aXR5IHN0eWxlcy4gTXVzdCBiZSBkb25lIGFmdGVyIGxvb2sgc3R5bGVzLlxuICBjdXJFbnRpdHkuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSBpdGVtLnZhbHVlO1xuICB9KTtcbn1cblxuLyoqXG4qIHJlZ2lzdGVyIC0gcmVnaXN0ZXIgY3NzUnVsZXMgb2YgZm9yIGFuIGVudGl0eSBiYXNlZCBvbiB1c2VyIGlucHV0LlxuKiBOb3RlOiBBbGwgcnVsZXMgYXJlIHJlZ2lzdGVyZWQgZGFzaC1jYXNlIGEtbGEgY3NzLlxuKiBUaGlzIGlzIHJlZ2FyZGxlc3Mgb2YgaG93IHRoZXkgYXJlIHNldCBhbmQgdGhvdWdoIHRoZXkgYXJlIHVzZWQgY2FtZWxDYXNlLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gY29sb3IpLiBBbHRlcm5hdGl2ZWx5IGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgcGFpcnMuXG4qIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBlbnRpdHkgLSBhIFNwcml0ZSBvciBTdGFnZS5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIocHJvcCwgdmFsdWUsIGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG5cbiAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZGFzaGVkID0gcHJvcC5yZXBsYWNlKC8oW0EtWl0pL2csICgkMSkgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgY3VyRW50aXR5LmNzc1J1bGVzLnB1c2goeyBwcm9wOiBkYXNoZWQsIHZhbHVlIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9wID09PSAnb2JqZWN0JyAmJiAhdmFsdWUpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGRhc2hlZCA9IGtleS5yZXBsYWNlKC8oW0EtWl0pL2csICgkMSkgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWU6IHByb3Bba2V5XSB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHJld3JpdGUgZnJvbSAnLi9yZXdyaXRlcic7XG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVudGl0eS5cbiAqIEFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gRW50aXR5IGlzIGFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhY2UgLSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBwYWNlIHBhY2VkIG1ldGhvZHMuXG4gICovXG4gIGNvbnN0cnVjdG9yKHBhY2UpIHtcbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuaWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICB0aGlzLnBhY2UgPSBwYWNlO1xuICAgIHRoaXMuc291bmRzID0gW107IC8vIHdpbGwgaG9sZCBhbGwgc291bmRzIGN1cnJlbnRseSBwbGF5ZWQgYnkgZW50aXR5LCBpZiBhbnkuXG4gICAgLypcbiAgICAqIFBhY2VkIG1ldGhvZHMgd29yayBpbiB0aGUgZm9sbG93aW5nIG1hbm5lcjpcbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciBwYWNlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgcGFjZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYWZ0ZXIge3BhY2V9IG1pbGxpc2Vjb25kcy5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgcGFjZWQgbWV0aG9kIHRvIGhhbHQgZXhlY3V0aW9uIG9mIGFueSBjb2RlIGZvbGxvd2luZyBpdCB1bnRpbCBpdCBpcyBkb25lLlxuICAgICovXG4gICAgdGhpcy5wYWNlZCA9IFtcbiAgICAgICdnb1RvJyxcbiAgICAgICdtb3ZlJyxcbiAgICAgICdjaGFuZ2VYJyxcbiAgICAgICdjaGFuZ2VZJyxcbiAgICAgICdzZXRYJyxcbiAgICAgICdzZXRZJyxcbiAgICAgICdnb1Rvd2FyZHMnLFxuICAgICAgJ3R1cm5SaWdodCcsXG4gICAgICAndHVybkxlZnQnLFxuICAgICAgJ3BvaW50SW5EaXJlY3Rpb24nLFxuICAgICAgJ3BvaW50VG93YXJkcycsXG4gICAgICAnY2hhbmdlU2l6ZScsXG4gICAgICAnc2V0U2l6ZScsXG4gICAgICAnc2F5JyxcbiAgICAgICd0aGluaycsXG4gICAgICAncmVmcmVzaCcsXG4gICAgXTtcblxuICAgIC8qXG4gICAgKiBXYWl0ZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZyBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZCA9IFtcbiAgICAgICd3YWl0JyxcbiAgICAgICdnbGlkZScsXG4gICAgICAnc2F5V2FpdCcsXG4gICAgICAndGhpbmtXYWl0JyxcbiAgICAgICdwbGF5U291bmRVbnRpbERvbmUnLFxuICAgICAgJ2Jyb2FkY2FzdE1lc3NhZ2VXYWl0JyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIHdhaXRlZFJldHVucmVkIG1ldGhvZHMgd29yayBzaW1pbGFybHkgdG8gd2FpdGVkIG1ldGhvZHMgb25seSB0aGF0IHRoZXkgZW5hYmxlIGNhcHR1cmluZyBhIHZhbHVlXG4gICAgKiBpbnRvIGEgZ2xvYmFsbHkgZGVjbGFyZWQgdmFyaWFibGUgKG9yIGFuIHVuZGVjbGFyZWQgb25lKS5cbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciB3YWl0ZWRSZXR1cm5lZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZzpcbiAgICAqICAgLSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgaW50byB3aGljaCBhIHZhbHVlIGlzIHJldHVybmVkLlxuICAgICogICAtIGEgdHJpZ2dlcmluZ0lkIHBhcmFtZXRlci5cbiAgICAqIDQuIFRoZSBldmVudCBsaXN0ZW5lciBpcyB1bmlxdWUgdG8gdGhlIHRyaWdnZXJpbmdJZC5cbiAgICAqIDUuIFdoZW4gdGhlIG1ldGhvZCBjb21wbGV0ZXMgcnVubmluZyBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHJlc29sdmluZyB0aGUgcHJvbWlzZS5cbiAgICAqIDYuIFRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cmFuc2ZlcmVkIGludG8gdGhlIHZhcmlhYmxlIHVzaW5nIGV2YWwuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKiBBdCB3aGljaCBwb2ludCB0aGUgdmFyaWFibGUgaGFzIFwiY2FwdHVyZWRcIiB0aGUgdmFsdWUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZFJldHVybmVkID0gW1xuICAgICAgJ2ludm9rZScsXG4gICAgICAnYXNrJyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIEV2ZW50IG1ldGhvZHMgKGV2ZW50ZWQpIGFyZSBjb250YWluZXJzIGZvciBmdW5jdGlvbnMgdG8gYmUgcmV3cml0dGVuLlxuICAgICogV2hlbiBhbiBldmVudCBtZXRob2QgaXMgbmVzdGVkIGluc2lkZSBhbm90aGVyIHRoZSBjb2RlIG9mIHRoZSBpbm5lciBtZXRob2QgaXMgTk9UIHJld3JpdHRlbi5cbiAgICAqL1xuICAgIHRoaXMuZXZlbnRlZCA9IFtcbiAgICAgICd3aGVuRmxhZycsXG4gICAgICAnd2hlbkxvYWRlZCcsXG4gICAgICAnd2hlbkNsaWNrZWQnLFxuICAgICAgJ3doZW5LZXlQcmVzc2VkJyxcbiAgICAgICd3aGVuRXZlbnQnLFxuICAgICAgJ3doZW5SZWNlaXZlTWVzc2FnZScsXG4gICAgICAnd2hlbkNsb25lZCcsXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAqIF9nZW5lcmF0ZVVVSUQgLSBnZW5lcmF0ZXMgYSB1bmlxdWUgSUQuXG4gICogU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9jcmVhdGUtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHJldHVybiB7c3RyaW5nfSAtIGEgdW5pcXVlIGlkLlxuICAqL1xuICBfZ2VuZXJhdGVVVUlEKCkge1xuICAgIGxldCBkO1xuICAgIGxldCByO1xuXG4gICAgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB0eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZCArPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7IC8vIHVzZSBoaWdoLXByZWNpc2lvbiB0aW1lciBpZiBhdmFpbGFibGVcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgICAgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICB9KTtcblxuICAgIHJldHVybiB1dWlkO1xuICB9XG5cbiAgLyoqXG4gICogX3JlbGVhc2VXYWl0ZWQgLSByZWxlYXNlcyBhIHdhaXRlZCBwcm9taXNlIGJ5IGRpc3BhdGNoaW5nIGFuIGV2ZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdHJpZ2dlcmluZ0lkIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgaW52b2tlZCB0aGUgY29kZSB0aGF0IHJlcXVlc3RlZCB0aGUgd2FpdC5cbiAgKi9cbiAgX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2Uud2FpdGVkLiR7dHJpZ2dlcmluZ0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlOiAwIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvKipcbiAgKiBfc2V0VG9WYXIgLSBzZXRzIGEgZ2xvYmFsbHkgc2NvcGVkIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB3aG8ncyBuYW1lIGlzIHNwZWNpZmllZCBhcyBhIGEgc3RyaW5nXG4gICogd2l0aCB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7dmFyU3RyaW5nfSB0ZXh0IC0gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHdoaWNoIHZhbHVlIHNob3VsZCBiZSBzZXQuXG4gICogQHBhcmFtIHthbnl9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHNldC5cbiAgKi9cbiAgX3NldFRvVmFyKHZhclN0cmluZywgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgZXZhbChgJHt2YXJTdHJpbmd9ID0gJyR7dmFsdWV9J2ApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgKCdCbG9ja0xpa2UuanMgRXJyb3I6IFZhcmlhYmxlcyBhY2NlcHRpbmcgYSB2YWx1ZSBtdXN0IGJlIGRlY2xhcmVkIGluIHRoZSBnbG9iYWwgc2NvcGUuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIF9leGVjIC0gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAgKiBUaGlzIGlzIHdoYXQgY3JlYXRlcyB0aGUgXCJwYWNlZFwiIGV4ZWN1dGlvbiBvZiB0aGUgdXNlciBzdXBwbGllZCBmdW5jdGlvbnMuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICogQHBhcmFtIHthcnJheX0gYXJnc0FyciAtIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbi5cbiAgKi9cbiAgX2V4ZWMoZnVuYywgYXJnc0Fycikge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBtZS50cmlnZ2VyaW5nSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICBjb25zdCBmID0gcmV3cml0ZShmdW5jLCBtZSk7XG4gICAgcmV0dXJuIGYuYXBwbHkobWUsIGFyZ3NBcnIpO1xuICB9XG5cbiAgLyoqXG4gICogaW52b2tlIC0gaW52b2tlIGEgZnVuY3Rpb24uIEFsbG93cyBwYXNzaW5nIGFuIGFyZ3VtZW50IG9yIGFycmF5IG9mIGFyZ3VtZW50cy5cbiAgKiBGdW5jdGlvbiB3aWxsIGJlIFwicGFjZWRcIiBhbmQgY29kZSBleGVjdXRpb24gd2lsbCBiZSBcIndhaXRlZFwiIHVudGlsIGl0IGlzIGNvbXBsZXRlZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5GbGFnKCgpID0+IHtcbiAgKiAgIHRoaXMuaW52b2tlKGp1bXApO1xuICAqICAgdGhpcy5pbnZva2UodGFsaywgJ2hpJyk7XG4gICogICB0aGlzLmludm9rZShwYXR0ZXJuLCBbNSwgNTAsIDEyXSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NBcnIgLSBhbiBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24uIEEgc2luZ2xlIHZhcmlhYmxlIGFsc28gYWNjZXB0ZWQuXG4gICovXG4gIGludm9rZShmdW5jLCBhcmdzQXJyLCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdGhlVmFyIGFuZCB0cmlnZ2VyaW5nSWQgYXJlIG5vdCB1c2VyIHN1cHBsaWVkLCB0aGV5IGFyZSBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBsZXQgYXJncyA9IGFyZ3NBcnI7XG4gICAgIShhcmdzQXJyIGluc3RhbmNlb2YgQXJyYXkpID8gYXJncyA9IFthcmdzQXJyXSA6IG51bGw7XG5cbiAgICB0aGlzLl9leGVjKGZ1bmMsIGFyZ3MpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgd2FpdGVkIG1ldGhvZCBsaXN0ZW5lci4gcmVsZWFzZSBpdC5cbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgIHRoZVZhciA/IHRoaXMuX3NldFRvVmFyKHRoZVZhciwgcmVzdWx0KSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiB3YWl0IC0gY3JlYXRlcyBhIHBhdXNlIGluIGV4ZWN1dGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogdGhpcy53YWl0KDUpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgdGltZSA9IDU7XG4gICogdGhpcy53YWl0KHRpbWUgKiAwLjk1KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LiBNdXN0IGJlIGFuIGFjdHVhbCBudW1iZXIuXG4gICovXG4gIHdhaXQoc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5Mb2FkZWQgLSBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKiBUbyBiZSB1c2VkIHdpdGggY29kZSB0aGF0IG5lZWRzIHRvIHJ1biBvbmxvYWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5Mb2FkZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5Mb2FkZWQoZnVuYykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZXhlYyhmdW5jLCBbXSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKipcbiAgKiB3aGVuRmxhZyAtIGFkZHMgYSBmbGFnIHRvIGNvdmVyIHRoZSBzdGFnZSB3aXRoIGFuIGV2ZW50IGxpc3RlbmVyIGF0dGFjaGVkLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgcmVtb3ZlIHRoZSBmbGFnIGRpdiBhbmQgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdJIGFtIGFsaXZlJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuRmxhZyhmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgaWYgKG1lLmVsZW1lbnQpIHtcbiAgICAgIG1lLmVsZW1lbnQuYWRkRmxhZyh0aGlzKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmZsYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBtZS5lbGVtZW50LnJlbW92ZUZsYWcobWUpO1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbkNsaWNrZWQgLSBhZGRzIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwcml0ZSBvciBzdGFnZS5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkNsaWNrZWQoZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbktleVByZXNzZWQgLSBhZGRzIGEga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbktleVByZXNzZWQoJyAnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdTcGFjZXByZXNzZWQnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyS2V5IC0gdGhlIGtleSBwcmVzc2VkLiBtYXkgYmUgdGhlIGNvZGUgb3IgdGhlIGNoYXJhY3RlciBpdHNlbGYgKEEgb3IgNjUpXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbktleVByZXNzZWQodXNlcktleSwgZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBsZXQgY2hlY2s7XG4gICAgdHlwZW9mIHVzZXJLZXkgPT09ICdzdHJpbmcnID8gY2hlY2sgPSB1c2VyS2V5LnRvTG93ZXJDYXNlKCkgOiBjaGVjayA9IHVzZXJLZXk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuICAgICAgLy8gTWFrZSBzdXJlIGVhY2ggcHJvcGVydHkgaXMgc3VwcG9ydGVkIGJ5IGJyb3dzZXJzLlxuICAgICAgLy8gTm90ZTogdXNlciBtYXkgd3JpdGUgaW5jb21wYXRpYmxlIGNvZGUuXG4gICAgICBlLmNvZGUgJiYgZS5jb2RlLnRvTG93ZXJDYXNlKCkgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGUua2V5ICYmIGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGUua2V5Q29kZSA9PT0gY2hlY2sgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5FdmVudCAtIGFkZHMgdGhlIHNwZWNpZmllZCBldmVudCBsaXN0ZW5lciB0byBzcHJpdGUvc3RhZ2UuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkV2ZW50KCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAqICAgY29uc29sZS5sb2coZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRTdHIgLSB0aGUgbmFtZWQgZXZlbnQgKG1vc2Vtb3ZlIGV0Yy4pLlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5FdmVudChldmVudFN0ciwgZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICBsZXQgYXR0YWNoVG8gPSB0aGlzLmVsZW1lbnQuZWw7XG4gICAgICBsZXQgb3B0aW9ucyA9IHt9O1xuICAgICAgJ2tleWRvd258a2V5dXB8a2V5cHJlc3MnLmluZGV4T2YoZXZlbnRTdHIpICE9PSAtMSA/IGF0dGFjaFRvID0gZG9jdW1lbnQgOiBudWxsO1xuICAgICAgJ3RvdWNoc3RhcnR8dG91Y2htb3ZlJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBvcHRpb25zID0geyBwYXNzaXZlOiB0cnVlIH0gOiBudWxsO1xuXG4gICAgICBhdHRhY2hUby5hZGRFdmVudExpc3RlbmVyKGV2ZW50U3RyLCAoZSkgPT4ge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlblJlY2VpdmVNZXNzYWdlIC0gYWRkcyB0aGUgc3BlY2lmaWVkIGV2ZW50IGxpc3RlbmVyIHRvIGRvY3VtZW50LlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5SZWNlaXZlTWVzc2FnZSgnbW92ZScsIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5tb3ZlKC0xMCk7XG4gICogfSlcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpO1xuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5SZWNlaXZlTWVzc2FnZShtc2csIGZ1bmMpIHtcbiAgICBjb25zdCBsaXN0ZW5lcklkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgLy8gcmVnaXN0ZXIgYXMgYSBtZXNzYWdlIGxpc3RlbmVyLlxuICAgIEVudGl0eS5tZXNzYWdlTGlzdGVuZXJzLnB1c2goeyBtc2csIGxpc3RlbmVySWQgfSk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gc3BlY2lmaWVkIG1lc3NhZ2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1zZywgKGUpID0+IHtcbiAgICAgIC8vIGV4ZWN1dGUgdGhlIGZ1bmMgYW5kIHRoZW5cbiAgICAgIHRoaXMuX2V4ZWMoZnVuYywgW2VdKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gZGlzcGF0Y2ggYW4gZXZlbnQgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIGxpc3RlbmVyIGFuZCBtZXNzYWdlIHJlY2VpdmVkLlxuICAgICAgICBjb25zdCBtc2dJZCA9IGUuZGV0YWlsLm1zZ0lkO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2Jsb2NrTGlrZS5kb25ld2hlbmVlY2VpdmVtZXNzYWdlJywgeyBkZXRhaWw6IHsgbXNnSWQsIGxpc3RlbmVySWQgfSB9KTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogYnJvYWRjYXN0TWVzc2FnZSAtIGRpc3BhdGNoZXMgYSBjdXN0b20gZXZlbnQgdGhhdCBhY3RzIGFzIGEgZ2xvYmFsIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKGZ1bmN0aW9uKCkge1xuICAqICBzdGFnZS5icm9hZGNhc3RNZXNzYWdlKCdtb3ZlJylcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpXG4gICovXG4gIGJyb2FkY2FzdE1lc3NhZ2UobXNnKSB7XG4gICAgY29uc3QgbXNnSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQobXNnLCB7IGRldGFpbDogeyBtc2dJZCB9IH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICogYnJvYWRjYXN0TWVzc2FnZVdhaXQgLSBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50IHRoYXQgYWN0cyBhcyBhIGdsb2JhbCBtZXNzYWdlLlxuICAqIFdhaXRzIGZvciBhbGwgd2hlblJlY2VpdmVNZXNzYWdlIGxpc3RlbmVycyB0byBjb21wbGV0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHNwcml0ZS53aGVuUmVjZWl2ZU1lc3NhZ2UoJ21vdmUnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgtMTApO1xuICAqICAgdGhpcy53YWl0KDUpO1xuICAqIH0pXG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZChmdW5jdGlvbigpIHtcbiAgKiAgc3RhZ2UuYnJvYWRjYXN0TWVzc2FnZVdhaXQoJ21vdmUnKTtcbiAgKiAgc3ByaXRlLnNheSgnQWxsIGRvbmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpXG4gICovXG4gIGJyb2FkY2FzdE1lc3NhZ2VXYWl0KG1zZywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIGNvbnN0IG1zZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgLy8gc2F2ZSByZWdpc3RlcmVkIGxpc3RlbmVycyBmb3IgdGhpcyBicm9hZGNhc3QuXG4gICAgbGV0IG15TGlzdGVuZXJzID0gRW50aXR5Lm1lc3NhZ2VMaXN0ZW5lcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm1zZyA9PT0gbXNnKTtcbiAgICAvLyBkaXNwYXRjaCB0aGUgbWVzc2FnZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChtc2csIHsgZGV0YWlsOiB7IG1zZ0lkIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gdGhvc2Ugd2hvIHJlY2VpdmVkIHRoZSBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCBmdW5jdGlvbiBicm9hZGNhc3RNZXNzYWdlV2FpdExpc3RlbmVyKGUpIHtcbiAgICAgIC8vIGlmIGV2ZW50IGlzIGZvciB0aGlzIG1lc3NhZ2UgcmVtb3ZlIGxpc3RlbmVySWQgZnJvbSBsaXN0IG9mIGxpc3RlbmVycy5cbiAgICAgIChlLmRldGFpbC5tc2dJZCA9PT0gbXNnSWQpID8gbXlMaXN0ZW5lcnMgPSBteUxpc3RlbmVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGlzdGVuZXJJZCAhPT0gZS5kZXRhaWwubGlzdGVuZXJJZCkgOiBudWxsO1xuICAgICAgLy8gYWxsIGxpc3RlbmVycyByZXNwb25kZWQuXG4gICAgICBpZiAoIW15TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS5kb25ld2hlbmVlY2VpdmVtZXNzYWdlJywgYnJvYWRjYXN0TWVzc2FnZVdhaXRMaXN0ZW5lcik7XG4gICAgICAgIC8vIHJlbGVhc2UgdGhlIHdhaXRcbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTb3VuZCAqICovXG5cbiAgLyoqXG4gICogcGxheVNvdW5kIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdilcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wbGF5U291bmQoJy4uLy4uL3NvdW5kcy9ibGVhdC53YXYnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIG9mIHRoZSBmaWxlIHRvIHBsYXkuXG4gICovXG4gIHBsYXlTb3VuZCh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNvdW5kcyA9IHRoaXMuc291bmRzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gYXVkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kTG9vcCAtIHBsYXlzIGEgc291bmQgZmlsZSAobXAzLCB3YXYpIGFnYWluIGFuZCBhZ2FpblxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZExvb3AoJy4uLy4uL3NvdW5kcy9ibGVhdC53YXYnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIG9mIHRoZSBmaWxlIHRvIHBsYXkuXG4gICovXG4gIHBsYXlTb3VuZExvb3AodXJsKSB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kVW50aWxEb25lIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdikgdW50aWwgZG9uZS5cbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gcGxheVNvdW5kIGFuZCB3YWl0IGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHNvdW5kLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZFVudGlsRG9uZSgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kVW50aWxEb25lKHVybCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGF1ZGlvKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHN0b3BTb3VuZHMgLSBzdG9wcyBhbGwgc291bmRzIHBsYXllZCBieSBzcHJpdGUgb3Igc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBzdGFnZS53aGVuS2V5UHJlc3NlZCgnRXNjYXBlJywgKCkgPT4ge1xuICAqICAgdGhpcy5zdG9wU291bmRzKCk7XG4gICogfSk7XG4gICovXG4gIHN0b3BTb3VuZHMoKSB7XG4gICAgdGhpcy5zb3VuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5wYXVzZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc291bmRzID0gW107XG4gIH1cblxuICAvKiBjc3MgKi9cblxuICAvKipcbiAgKiBjc3MgLSBhcHBsaWVzIGEgQ1NTIHJ1bGUgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5jc3MoJ2JhY2tncm91bmQnLCAnIzAwMDBmZicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MobmFtZSkge1xuICAgICF0aGlzLmhhc0NsYXNzKG5hbWUpID8gdGhpcy5jbGFzc2VzLnB1c2gobmFtZSkgOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ2xhc3MgLSByZW1vdmVzIGEgY3NzIGNsYXNzIGZyb20gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqIHNwcml0ZS5yZW1vdmVDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbmFtZSk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBoYXNDbGFzcyAtIGlzIHRoZSBjc3MgY2xhc3MgYXBwbGllZCB0byB0aGUgc3ByaXRlIGFuZCBhbGwgY29zdHVtZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IHRoaXMucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IHRoaXMuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgY3NzIGZyb20gJy4vZWxlbWVudC1jc3MnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIGxvb2suXG4gKiBBYnN0cmFjdCBmb3IgQ29zdHVtZSBhbmQgQmFja2Ryb3AuXG4gKiBEbyBub3QgaW5zdGFudGlhdGUgb2JqZWN0cyBkaXJlY3RseSBmcm9tIHRoaXMgY2xhc3MuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gTG9vayBpcyBhYnN0cmFjdCBmb3IgQ29zdHVtZSBhbmQgQmFja2Ryb3AuXG4gICovXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY3NzUnVsZXMgPSBbXTtcbiAgICB0aGlzLmNsYXNzZXMgPSBbXTtcbiAgfVxuXG4gIC8qKiBMb29rcyAqICovXG5cbiAgLyoqXG4gICogY3NzIC0gYXBwbGllcyBhIENTUyBydWxlIHRvIGEgQ29zdHVtZSBvciBCYWNrZHJvcC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuY3NzKCdmb250LXNpemUnLCAnMTZweCcpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5jc3MoJ2N1cnNvcicsICdwb2ludGVyJyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gY29sb3IpXG4gICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gdGhlIHZhbHVlIGZvciB0aGUgY3NzIHByb3BlcnR5IChlLmcuICNmZjg4MzMpXG4gICovXG4gIGNzcyhwcm9wLCB2YWx1ZSA9IG51bGwpIHtcbiAgICBjc3MucmVnaXN0ZXIocHJvcCwgdmFsdWUsIHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogYWRkQ2xhc3MgLSBhZGRzIGEgY3NzIGNsYXNzIHRvIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZSB0byBhZGQuXG4gICovXG4gIGFkZENsYXNzKG5hbWUpIHtcbiAgICAhdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMuY2xhc3Nlcy5wdXNoKG5hbWUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUNsYXNzIC0gcmVtb3ZlcyBhIGNzcyBjbGFzcyBmcm9tIHRoZSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5oYXNDbGFzcygncmFpbmJvdycpID8gY29zdHVtZS5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5oYXNDbGFzcygncmFpbmJvdycpID8gYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGJhY2tkcm9wLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZSB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUNsYXNzKG5hbWUpIHtcbiAgICB0aGlzLmNsYXNzZXMgPSB0aGlzLmNsYXNzZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBuYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAqIGhhc0NsYXNzIC0gaXMgdGhlIGNzcyBjbGFzcyBhcHBsaWVkIHRvIHRoZSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5oYXNDbGFzcygncmFpbmJvdycpID8gY29zdHVtZS5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5oYXNDbGFzcygncmFpbmJvdycpID8gYmFja2Ryb3AucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGJhY2tkcm9wLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBjc3MgY2xhc3MgbmFtZSBvbiB0aGUgbGlzdC5cbiAgKi9cbiAgaGFzQ2xhc3MobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzZXMuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gIH1cbn1cbiIsIi8qKlxuKiBwbGF0Zm9ybXMgLSBjb2xsZWN0aW9uIG9mIHRoaW5ncyB0byBlbnN1cmUgaXQgcGxheXMgbmljZWx5IHdpdGggY29kaW5nIHBsYXRmb3Jtcy5cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwbGF0Zm9ybXMoKSB7XG4gIC8qKlxuICAqIGNvZGVwZW4uaW9cbiAgKiBQYWNlZCBhbmQgV2FpdGVkIG1ldGhvZHMgdHJpZ2dlciB0aGUgcHJvdGVjdGlvbiAtIGhlbmNlIHdlIHByb2xvbmcgaXQuXG4gICogaHR0cHM6Ly9ibG9nLmNvZGVwZW4uaW8vMjAxNi8wNi8wOC9jYW4tYWRqdXN0LWluZmluaXRlLWxvb3AtcHJvdGVjdGlvbi10aW1pbmcvXG4gICovXG4gIGlmICh3aW5kb3cuQ1ApIHtcbiAgICB3aW5kb3cuQ1AuUGVuVGltZXIuTUFYX1RJTUVfSU5fTE9PUF9XT19FWElUID0gNjAwMDA7XG4gIH1cbn1cbiIsIi8qKlxuKiBFbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgcmV3cml0aW5nIHVzZXIgY29kZSB0byBhbGxvdyBmb3IgQmxvY2tMaWtlLmpzIGZlYXR1cmVzLlxuKi9cblxuLyoqXG4qIGNvdW50Q2hhciAtIGNvdW50IGhvdyBtYW55IHRpbWVzIGEgZ2l2ZW4gY2hhcmFjdGVyIChvciBzdHJpbmcpIGFwcGVhcnMgaW4gYW5vdGhlciBzdHJpbmcuXG4qIGhlbHBlciBmb3IgZXZlbnRlZCBza2lwcGluZyBhbmQgbWV0aG9kIHJld3JpdGluZy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge3N0cmluZ30gY2hhciAtIGEgc3RyaW5nIHRvIGxvb2sgZm9yLlxuKlxuKiBAcmV0dXJuIHtudW1iZXJ9IC0gdGhlIG51bWJlciBvZiB0aW1lcyBmb3VuZC5cbiovXG5mdW5jdGlvbiBjb3VudENoYXIoc3RyLCBjaGFyKSB7XG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYFxcXFwke2NoYXJ9YCwgJ2cnKTtcbiAgcmV0dXJuIChzdHIubWF0Y2gocmVnRXhwKSB8fCBbXSkubGVuZ3RoO1xufVxuXG4vKipcbiogcmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzIC0gZm9yIGEgZ2l2ZW4gbGluZSBvZiBjb2RlLCByZXBsYWNlcyBhbGwgb2NjdXJyZW5jZXMgb2ZcbiogdXNlciBwcm92aWRlZCBzdHJpbmdzIHdpdGggYSBzZXF1ZW5jZSBvZiBzcGFjZXMgb2YgdGhlIHNhbWUgbGVuZ3RoLlxuKiBoZWxwZXIgZm9yIGV2ZW50ZWQgc2tpcHBpbmcgYW5kIG1ldGhvZCByZXdyaXRpbmcuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBsaW5lIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgbGluZSB3aXRob3V0IHN0cmluZ3MuXG4qL1xuZnVuY3Rpb24gcmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKGxpbmUpIHtcbiAgcmV0dXJuIGxpbmUucmVwbGFjZSgvXCIoLio/KVwifCcoLio/KSd8YCguKj8pYC9nLCAnICcpO1xufVxuXG4vKipcbiogaXNNZXRob2RJblN0cmluZyAtIGNoZWNrcyBhIHN0cmluZyBhZ2FpbnN0IGFuIGFycmF5IG9mIG1ldGhvZCBuYW1lcy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBhbiBhcnJheSBvZiBtZXRob2QgbmFtZXMuXG4qXG4qIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIG1ldGhvZCBpbiB0aGUgc3RyaW5nLlxuKi9cbmZ1bmN0aW9uIGlzTWV0aG9kSW5TdHJpbmcoYXJyLCBzdHIpIHtcbiAgcmV0dXJuIChhcnIuc29tZSgobWV0aG9kKSA9PiBzdHIuaW5kZXhPZihgLiR7bWV0aG9kfShgKSAhPT0gLTEpKTtcbn1cblxuLyoqXG4qIGlzUGFjZWQgLSBjaGVja3MgaWYgYSBsaW5lIG9mIGNvZGUgaW5jbHVkZXMgYSBwYWNlZCBtZXRob2QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGlzIHBhY2VkIGluIGNvZGUuXG4qL1xuZnVuY3Rpb24gaXNQYWNlZChpdGVtLCBlbnRpdHkpIHtcbiAgcmV0dXJuIGlzTWV0aG9kSW5TdHJpbmcoZW50aXR5LnBhY2VkLCBpdGVtKTtcbn1cblxuLyoqXG4qIGlzV2FpdGVkIC0gY2hlY2tzIGlmIGEgbGluZSBvZiBjb2RlIGluY2x1ZGVzIGEgd2FpdGVkIG1ldGhvZC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gaXMgd2FpdGVkIGluIGNvZGUuXG4qL1xuZnVuY3Rpb24gaXNXYWl0ZWQoaXRlbSwgZW50aXR5KSB7XG4gIHJldHVybiBpc01ldGhvZEluU3RyaW5nKGVudGl0eS53YWl0ZWQsIGl0ZW0pO1xufVxuXG4vKipcbiogaXNFdmVudGVkIC0gY2hlY2tzIGlmIGEgbGluZSBvZiBjb2RlIGluY2x1ZGVzIGFuIGV2ZW50ZWQgbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBpcyBldmVudGVkIGluIGNvZGUuXG4qL1xuZnVuY3Rpb24gaXNFdmVudGVkKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gaXNNZXRob2RJblN0cmluZyhlbnRpdHkuZXZlbnRlZCwgaXRlbSk7XG59XG5cbi8qKlxuKiB3aGljaFdhaXRlZFJldHVybiAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhIHdhaXRlZFJldHVybiBtZXRob2QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSB3YWl0ZWRSZXR1cm4gbWV0aG9kIGZvdW5kIG9yIG51bGwuXG4qL1xuZnVuY3Rpb24gd2hpY2hXYWl0ZWRSZXR1cm4oaXRlbSwgZW50aXR5KSB7XG4gIHJldHVybiBlbnRpdHkud2FpdGVkUmV0dXJuZWQuZmluZCgobWV0aG9kKSA9PiAoaXRlbS5pbmRleE9mKGAuJHttZXRob2R9KGApICE9PSAtMSA/IG1ldGhvZCA6IGZhbHNlKSk7XG59XG5cbi8qKlxuKiBpbnNlcnRQYWNlZCAtIGluc2VydHMgYSB0aW1lZCBhd2FpdCBsaW5lIGFmdGVyIGFueSBtZXRob2QgdGhhdCBpcyBvbiB0aGUgbGlzdCBvZiBwYWNlZCBtZXRob2RzLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRQYWNlZChpdGVtLCBlbnRpdHkpIHtcbiAgY29uc3QgY29kZSA9IGAke2l0ZW19XFxuIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCAke2VudGl0eS5wYWNlfSkpO2A7XG4gIHJldHVybiBlbnRpdHkucGFjZSAmJiBpc1BhY2VkKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyhpdGVtKSwgZW50aXR5KSA/IGNvZGUgOiBpdGVtO1xufVxuXG4vKipcbiogaW5zZXJ0V2FpdGVkIC0gaW5zZXJ0cyB0aGUgXCJtZWNoYW5pc21cIiB0aGF0IHN0b3BzIGV4ZWN1dGlvbiBhbmQgYXdhaXRzIGZvciB0aGUgbWV0aG9kIHRvIGZpbmlzaC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCAobXVsdGkpbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydFdhaXRlZChpdGVtLCBlbnRpdHkpIHtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgbGV0IGNvZGU7XG5cbiAgLy8gbG9vayBmb3Igd2FpdGVkIG1ldGhvZHMuXG4gIGZvdW5kID0gaXNXYWl0ZWQocmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKGl0ZW0pLCBlbnRpdHkpO1xuXG4gIC8vIG5vdCBhIG5vcm1hbCBcIndhaXRlZFwiLiBsb29rIGZvciB3YWl0ZWRSZXR1cm5lZC5cbiAgaWYgKCFmb3VuZCkge1xuICAgIGxldCB0aGVWYXIgPSBudWxsO1xuXG4gICAgZm91bmQgPSB3aGljaFdhaXRlZFJldHVybihyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSksIGVudGl0eSk7XG5cbiAgICAvLyBjb2RlIGZvciB3YWl0ZWRSZXR1cm5cbiAgICB0aGVWYXIgPSBpdGVtLnN1YnN0cigwLCBpdGVtLmluZGV4T2YoJz0nKSlcbiAgICAgIC5yZXBsYWNlKCdsZXQnLCAnJylcbiAgICAgIC5yZXBsYWNlKCd2YXInLCAnJylcbiAgICAgIC5yZXBsYWNlKCdjb25zdCcsICcnKVxuICAgICAgLnRyaW0oKTtcblxuICAgIGNvZGUgPSBgJHtpdGVtLnN1YnN0cmluZygwLCBpdGVtLmxhc3RJbmRleE9mKCcpJykpfSwgJyR7dGhlVmFyfScsICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgO1xuXG4gICAgLy8gaW52b2tlIGlzIFwiZm9yZ2l2aW5nXCIuIG1heSwgb3IgbWF5IG5vdCwgaGF2ZSB2YXJpYWJsZXMuXG4gICAgZm91bmQgPT09ICdpbnZva2UnICYmIChpdGVtLmluZGV4T2YoJywnKSA9PT0gLTEpID8gY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCBbXSwgJyR7dGhlVmFyfScsICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgIDogbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBjb2RlIGZvciBcIm5vcm1hbFwiIHdhaXRlZFxuICAgIGNvZGUgPSBgJHtpdGVtLnN1YnN0cmluZygwLCBpdGVtLmxhc3RJbmRleE9mKCcpJykpfSwgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWA7XG4gIH1cblxuICAvLyBlbnRpdHkudHJpZ2dlcmluZ0lkIGNyZWF0ZXMgYSB1bmlxdWUgY29udGV4dCB0byBjaGFpbiB0aGUgd2FpdGVkIG1ldGhvZHMuXG4gIGNvZGUgPSBgJHtjb2RlfVxcbiBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS53YWl0ZWQuJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScsIGZ1bmN0aW9uIHdhaXRlZExpc3RlbmVyKGUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLndhaXRlZC4ke2VudGl0eS50cmlnZ2VyaW5nSWR9Jywgd2FpdGVkTGlzdGVuZXIpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtgO1xuXG4gIHJldHVybiBmb3VuZCA/IGNvZGUgOiBpdGVtO1xufVxuXG4vKipcbiogaW5zZXJ0QXN5bmMgLSBBZGRzIGtleXdvcmQgYXN5bmMgdG8gZnVuY3Rpb24gZGVjZWxlcmF0aW9uIGlmIG5vdCBwcmVzZW50XG4qIFdpbGwgY2F0Y2g6XG4qIC0gYWxsIG5hbWVkIGZ1bmN0aW9uIGRlY2VsZXJhdGlvbnMgd2l0aCBhIHNwYWNlIGFmdGVyIHRoZSBrZXl3b3JkICdmdW5jdGlvbidcbiogLSBhbnl0aGluZyB0aGF0IGhhcyBhIGZhdCBhcnJvdyB3aXRoIGFueSBvZiBzZXZlcmFsIHZhcmlhYmxlIHBhdHRlcm5zIGJlZm9yZSBpdC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydEFzeW5jKGl0ZW0pIHtcbiAgY29uc3QgZXhpc3QgPSBpdGVtLmluZGV4T2YoJ2FzeW5jICcpO1xuXG4gIC8vIGZ1bmN0aW9uIGRlY2xhcmF0aW9uXG4gIGxldCByZWdFeHAgPSAvZnVuY3Rpb24oXFxzKj9bYS16QS1aXVxcdypcXHMqP1xcKHxcXHMqP1xcKCkvO1xuICBsZXQgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyhpdGVtKSk7XG5cbiAgLy8gb3IgYXJyb3dcbiAgaWYgKCFtYXRjaGVzKSB7XG4gICAgcmVnRXhwID0gLyhbYS16QS1aXVxcdyp8XFwoXFxzKj9bYS16QS1aXVxcdyooLFxccypbYS16QS1aXVxcdyopKlxccyo/XFwpKVxccyo/PT4vO1xuICAgIG1hdGNoZXMgPSByZWdFeHAuZXhlYyhyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSkpO1xuICB9XG4gIHJldHVybiBleGlzdCA9PT0gLTEgJiYgbWF0Y2hlcyA/IGAke2l0ZW0uc3Vic3RyaW5nKDAsIG1hdGNoZXMuaW5kZXgpfWFzeW5jICR7aXRlbS5zdWJzdHJpbmcobWF0Y2hlcy5pbmRleCwgaXRlbS5sZW5ndGgpfWAgOiBpdGVtO1xufVxuXG4vKipcbiogZW1wdHlMb29wUHJvdGVjdGlvbiAtIGV4YW1pbmVzIHRoZSBjb2RlIGZvciB3aGlsZSBhbmQgZm9yIHN0YXRlbWVudHMgdGhhdCBhcmUgZW1wdHkuXG4qIE5vdGU6IHNpbmNlIHdoaWxlKHRydWUpe30gaXMgbGlrZWx5IHRvIGJlIGNvZGVkIGJ5IHRoZSB1c2VyIHRoaXMgcHJldmVudHMgaW5maW5pdGUgbG9vcHMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBlbXB0eUxvb3BQcm90ZWN0aW9uKGZ1bmNTKSB7XG4gIGNvbnN0IGNoZWNrID0gZnVuY1MucmVwbGFjZSgvXFxzKy9nLCAnJykucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgJycpO1xuXG4gIGNvbnN0IHJlZ0V4cCA9IC93aGlsZVxcKFtcXHNcXFNdKlxcKXt9fGZvclxcKFtcXHNcXFNdKlxcKXt9fGRve313aGlsZVxcKFtcXHNcXFNdKlxcKS87XG4gIGNvbnN0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhjaGVjayk7XG5cbiAgcmV0dXJuICEhbWF0Y2hlcztcbn1cblxuLyoqXG4qIHJlbW92ZU91dGVyIC0gUmVtb3ZlcyB0aGUgb3V0ZXIgZnVuY3Rpb24gZGVmaW5pdGlvbiBhbmQgcmV0dXJucyB0aGUgZnVuY3Rpb24gY29kZSBib2R5LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGJvZHkgb2YgdGhlIGZ1bmN0aW9uLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZU91dGVyKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5zdWJzdHJpbmcoZnVuY1MuaW5kZXhPZigneycpICsgMSwgZnVuY1MubGFzdEluZGV4T2YoJ30nKSk7XG59XG5cbi8qKlxuKiByZW1vdmVDb21tZW50cyAtIFJlbW92ZXMgY29tbWVudHMgZnJvbSBjb2RlLlxuKiBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTUxMjM3NzdcbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBmdW5jdGlvbiB3aXRob3V0IGNvbW1lbnRzLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZUNvbW1lbnRzKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5yZXBsYWNlKC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvfChbXlxcXFw6XXxeKVxcL1xcLy4qJC9nbSwgJycpO1xufVxuXG4vKipcbiogZ2V0RXZlbnRPYmplY3RWYXJOYW1lIC0gZXh0cmFjdHMgdGhlIHZhcmlhYmxlIG5hbWUgdGhhdCBob2xkcyB0aGUgZXZlbnQgb2JqZWN0LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHZhcmlhYmxlIG5hbWUuXG4qL1xuZnVuY3Rpb24gZ2V0RXZlbnRPYmplY3RWYXJOYW1lKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5zdWJzdHJpbmcoZnVuY1MuaW5kZXhPZignKCcpICsgMSwgZnVuY1MuaW5kZXhPZignKScpKTtcbn1cblxuLyoqXG4qIHJld3JpdGUgLSByZXdyaXRlcyBhIGZ1bmN0aW9uIHRvIGFuIGFzeW5jIHZlcnNpb24gdGhhdCBpcyBcInBhY2VkXCIgdXNpbmcgYXdhaXRpbmcgZm9yIHByb21pc2VzLlxuKiBUaGlzIGFsbG93cyB0aGUgdXNlciB0byB3cml0ZSBzZXF1ZW50aWFsIHNpbXBsZSBjb2RlIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBpbiBhIHBhY2VkIG1hbm5lci5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZVxuKiBAcGFyYW0gLSB7T2JqZWN0fSBlbnRpdHkgLSBhIHNwcml0ZSBvciBzdGFnZSBvYmplY3QgdG8gd2hpY2ggdGhlIGZ1bmN0aW9uIGFwcGxpZXMuXG4qIEByZXR1cm4ge2Z1bmN0aW9ufSAtIGFuIGFzeW5jIG1vZGlmaWVkIGZ1bmN0aW9uLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJld3JpdGUoZnVuYywgZW50aXR5KSB7XG4gIGxldCBjb2RlID0gZnVuYy50b1N0cmluZygpO1xuICBjb25zdCB0aGVWYXIgPSBnZXRFdmVudE9iamVjdFZhck5hbWUoY29kZSk7XG5cbiAgLy8gcmV3cml0ZSB0aGUgY29kZVxuICBpZiAoZW1wdHlMb29wUHJvdGVjdGlvbihjb2RlKSkge1xuICAgIGNvZGUgPSAndGhyb3cgXFwnQmxvY2tMaWtlLmpzIEVycm9yOiBFbXB0eSBsb29wIGRldGVjdGVkXFwnOyc7XG4gIH0gZWxzZSB7XG4gICAgY29kZSA9IHJlbW92ZUNvbW1lbnRzKHJlbW92ZU91dGVyKGNvZGUpKTtcbiAgICBjb2RlID0gY29kZS5zcGxpdCgnXFxuJykuZmlsdGVyKChpdGVtKSA9PiBpdGVtLnRyaW0oKS5sZW5ndGggIT09IDApO1xuXG4gICAgLy8gY291bnRlciBmb3Igb3BlbiBwYXJlbnRoZXNlcy5cbiAgICBsZXQgZXZlbnRlZE9wZW5QYXJlbiA9IDA7XG5cbiAgICBjb2RlID0gY29kZS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRlbXAgPSBpdGVtO1xuICAgICAgbGV0IHJlc3VsdCA9IHRlbXA7XG5cbiAgICAgIC8vIGludGVybmFsIGV2ZW50ZWQgbWV0aG9kcyBhcmUgc2tpcHBlZFxuICAgICAgaWYgKGlzRXZlbnRlZCh0ZW1wLCBlbnRpdHkpIHx8IGV2ZW50ZWRPcGVuUGFyZW4pIHtcbiAgICAgICAgZXZlbnRlZE9wZW5QYXJlbiArPSAoY291bnRDaGFyKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyh0ZW1wKSwgJygnKSAtIGNvdW50Q2hhcihyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3ModGVtcCksICcpJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYSBtZXRob2QgY2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIGJ1dCBub3QgbW9yZSB0aGFuIG9uZVxuICAgICAgICByZXN1bHQgPT09IHRlbXAgPyByZXN1bHQgPSBpbnNlcnRQYWNlZCh0ZW1wLCBlbnRpdHkpIDogbnVsbDsgLy8gbW9yZSBsaWtlbHlcbiAgICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0V2FpdGVkKHRlbXAsIGVudGl0eSkgOiBudWxsOyAvLyBsZXNzIGxpa2VseVxuXG4gICAgICAgIC8vIGFuZCBvbmx5IGlmIG5vdCBhIG1ldGhvZCB3aWxsIGFkZCBhc3luYyB0byBmdW5jdGlvbnNcbiAgICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0QXN5bmModGVtcCkgOiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuICAgIGNvZGUgPSBjb2RlLmpvaW4oJ1xcbicpO1xuICB9XG5cbiAgLy8gdHJhbnNmb3JtIHRoZSB0ZXh0IGludG8gYSBmdW5jdGlvblxuICBjb25zdCBBc3luY0Z1bmN0aW9uID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKGFzeW5jICgpID0+IHt9KS5jb25zdHJ1Y3RvcjtcbiAgbGV0IGFmID0gbmV3IEFzeW5jRnVuY3Rpb24oY29kZSk7XG5cbiAgLy8gcGFzcyB0aGUgZXZlbnQgb2JqZWN0IHRvIHRoZSBmdW5jdGlvbiBpZiBleGlzdHMuXG4gIHRoZVZhciA/IGFmID0gbmV3IEFzeW5jRnVuY3Rpb24odGhlVmFyLCBjb2RlKSA6IG51bGw7XG5cbiAgd2luZG93LmJsb2NrTGlrZSAmJiB3aW5kb3cuYmxvY2tMaWtlLmRlYnVnID8gY29uc29sZS5sb2coYWYpIDogbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgcmV0dXJuIGFmO1xufVxuIiwiaW1wb3J0ICogYXMgY3NzIGZyb20gJy4vZWxlbWVudC1jc3MnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgVUkgRWxlbWVudCBvZiB0aGUgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZUVsZW1lbnQge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTcHJpdGUgRWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIGZvciB3aGljaCB0aGUgZWxlbWVudCBpcyBjcmVhdGVkLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0byB3aGljaCB0aGUgc3ByaXRlIGlzIGFkZGVkLlxuICAqL1xuICBjb25zdHJ1Y3RvcihzcHJpdGUsIHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGVsLmlkID0gYCR7c3ByaXRlLmlkfWA7XG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGVsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ21hbmlwdWxhdGlvbic7XG5cbiAgICBzdGFnZS5lbGVtZW50LmVsLmFwcGVuZENoaWxkKGVsKTtcblxuICAgIHRoaXMuZWwgPSBlbDtcbiAgfVxuXG4gIC8qKlxuICAqIHVwZGF0ZSAtIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50LiBUaGlzIGlzIGFsd2F5cyBjYWxsZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gdXBkYXRlLlxuICAqL1xuICB1cGRhdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5lbDtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeCA9IHNwcml0ZS54IC0gKHNwcml0ZS53aWR0aCAvIDIpO1xuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB5ID0gKHNwcml0ZS55ICogLTEpIC0gKHNwcml0ZS5oZWlnaHQgLyAyKTtcblxuICAgIC8vIENvc3R1bWVcbiAgICBpZiAoc3ByaXRlLmNvc3R1bWUpIHtcbiAgICAgIGVsLnN0eWxlLndpZHRoID0gYCR7c3ByaXRlLmNvc3R1bWUudmlzaWJsZVdpZHRofXB4YDtcbiAgICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke3Nwcml0ZS5jb3N0dW1lLnZpc2libGVIZWlnaHR9cHhgO1xuICAgIH1cblxuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHsoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHh9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeyhzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHl9cHhgO1xuICAgIGVsLnN0eWxlLnpJbmRleCA9IHNwcml0ZS56O1xuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuXG4gICAgLy8gTGVmdCBvciByaWdodCByb3RhdGlvblxuICAgIC8vIERpcmVjdGlvbiBkaXZpZGVkIGJ5IDE4MCBhbmQgZmxvb3JlZCAtPiAxIG9yIDIuXG4gICAgLy8gU3VidHJhY3QgMSAtPiAwIG9yIDEuXG4gICAgLy8gTXVsdGlwbHkgYnkgLTEgLT4gMCBvciAtMS5cbiAgICAvLyBDc3MgdHJhbnNmb3JtIC0+IE5vbmUgb3IgZnVsbCBYLlxuICAgIHNwcml0ZS5yb3RhdGlvblN0eWxlID09PSAxID8gZWwuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlWCgkeygoTWF0aC5mbG9vcihzcHJpdGUuZGlyZWN0aW9uIC8gMTgwKSAqIDIpIC0gMSkgKiAtMX0pYCA6IG51bGw7XG5cbiAgICAvLyBGdWxsIHJvdGF0aW9uXG4gICAgLy8gU3ByaXRlIFwibmV1dHJhbCBwb3NpdGlvblwiIGlzIDkwLiBDU1MgaXMgMC4gU3VidHJhY3QgOTAuXG4gICAgLy8gTm9ybWFsaXplIHRvIDM2MC5cbiAgICAvLyBDc3Mgcm90YXRlIC0+IE51bWJlciBvZiBkZWdyZWVzLlxuICAgIHNwcml0ZS5yb3RhdGlvblN0eWxlID09PSAwID8gZWwuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgkeygoc3ByaXRlLmRpcmVjdGlvbiAtIDkwKSArIDM2MCkgJSAzNjB9ZGVnKWAgOiBudWxsO1xuXG4gICAgLy8gQ1NTIHJ1bGVzIGNsYXNzZXMgYW5kIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLlxuICAgIC8vIFRoZSBjb3N0dW1lIGNvbG9yIHNldHRpbmcgb3ZlcnJpZGVzIGFueSBDU1Mgc2V0dGluZy5cblxuICAgIC8vIFRoZXJlIGlzIG5vIGNvbG9yIHByb3BlcnR5IHRvIGN1cnJlbnQgY29zdHVtZSAtIHNvIHJlc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIHByb3BlcnR5IG9mIHRoZSBlbGVtZW50LlxuICAgICFzcHJpdGUuY29zdHVtZSB8fCAhc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAnJyA6IG51bGw7XG5cbiAgICAvLyBhcHBseSBDU1MgcnVsZXMgKG1heSBpbmNsdWRlIGJhY2tncm91bmQgY29sb3IpXG4gICAgY3NzLmFwcGx5KHNwcml0ZSk7XG5cbiAgICAvLyBhcHBseSBDU1MgY2xhc3Nlc1xuICAgIHNwcml0ZS5jb3N0dW1lID8gZWwuY2xhc3NOYW1lID0gc3ByaXRlLmNvc3R1bWUuY2xhc3Nlcy5jb25jYXQoc3ByaXRlLmNsYXNzZXMpLmpvaW4oJyAnKSA6IGVsLmNsYXNzTmFtZSA9IHNwcml0ZS5jbGFzc2VzLmpvaW4oJyAnKTtcblxuICAgIC8vIFRoZXJlIGlzIGEgY29sb3IgcHJvcGVydHkgdG8gY3VycmVudCBjb3N0dW1lIC0gc28gYXBwbHkgaXQgYW5kIG92ZXJyaWRlIENTUyBydWxlcy5cbiAgICBzcHJpdGUuY29zdHVtZSAmJiBzcHJpdGUuY29zdHVtZS5jb2xvciA/IGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHNwcml0ZS5jb3N0dW1lLmNvbG9yIDogbnVsbDtcblxuICAgIC8vIEltYWdlLlxuICAgIGlmIChzcHJpdGUuY29zdHVtZSAmJiBlbC5maXJzdENoaWxkKSB7IC8vIGhhcyBpbWFnZSBmcm9tIHByZXZpb3VzIGNvc3R1bWVcbiAgICAgIGlmICghc3ByaXRlLmNvc3R1bWUuaW1hZ2UpIHsgLy8gbmVlZHMgcmVtb3ZlZCBhcyB0aGVyZSBpcyBubyBpbWFnZSBpbiBjdXJyZW50IGNvc3R1bWUuXG4gICAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgICAgfSBlbHNlIGlmIChzcHJpdGUuY29zdHVtZS5pbWFnZSAhPT0gdGhpcy5lbC5maXJzdENoaWxkLnNyYykgeyAvLyBuZWVkcyByZXBsYWNlZFxuICAgICAgICB0aGlzLmVsLmZpcnN0Q2hpbGQuc3JjID0gc3ByaXRlLmNvc3R1bWUuaW1hZ2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzcHJpdGUuY29zdHVtZSAmJiBzcHJpdGUuY29zdHVtZS5pbWFnZSkgeyAvLyBuZWVkcyBhbiBpbWFnZSBpbnNlcnRlZC5cbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuXG4gICAgICBpbWFnZS5zdHlsZS53aWR0aCA9ICcxMDAlJztcbiAgICAgIGltYWdlLnN0eWxlLmhlaWdodCA9ICcxMDAlJztcbiAgICAgIGltYWdlLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGltYWdlLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuICAgIH1cblxuICAgIGVsLmZpcnN0Q2hpbGQgPyBlbC5maXJzdENoaWxkLmRyYWdnYWJsZSA9IGZhbHNlIDogbnVsbDtcblxuICAgIC8vIElubmVyLiBNdXN0IGJ5IGRvbmUgYWZ0ZXIgdGhlIGltYWdlXG4gICAgc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuaW5uZXJIVE1MID8gZWwuaW5uZXJIVE1MID0gc3ByaXRlLmNvc3R1bWUuaW5uZXJIVE1MIDogbnVsbDtcblxuICAgIC8vIFRleHQgVUkgZ29lcyB3aGVyZSBzcHJpdGUgZ29lcy5cbiAgICBzcHJpdGUudGV4dHVpID8gc3ByaXRlLnRleHR1aS51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiBkZWxldGUgLSBkZWxldGVzIHRoZSBET00gZWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGRlbGV0ZS5cbiAgKi9cbiAgZGVsZXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZWw7XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZEZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBpbmZyb250IG9mIGV2ZXJ5dGhpbmcgKHNob3dzIGl0KS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRoYXQgXCJyZXF1ZXN0ZWRcIiB0aGUgZmxhZy5cbiAgKi9cbiAgYWRkRmxhZyhzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmZsYWc7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAxMDAwO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGF0IHRoZSBiYWNrIChoaWRlcyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIHJlbW92ZUZsYWcoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJztcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnO1xuaW1wb3J0IENvc3R1bWUgZnJvbSAnLi9jb3N0dW1lJztcbmltcG9ydCBUZXh0VWlFbGVtZW50IGZyb20gJy4vdGV4dC11aS1lbGVtZW50JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTcHJpdGUuXG4gKiBTcHJpdGVzIGNhbiBiZSBhZGRlZCB0byB0aGUgU3RhZ2UuXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSh7XG4gKiAgIGNvc3R1bWU6IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gKiAgICAgd2lkdGg6IDUwLFxuICogICAgIGhlaWdodDogNTAsXG4gKiAgICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogICB9KVxuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSh7XG4gKiAgICAgd2lkdGg6IDUwLFxuICogICAgIGhlaWdodDogNTAsXG4gKiAgICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb25mZXR0aSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9jb25mZXR0aS5zdmcnKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhcmVaZXJvU2l6ZWRTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIHRvIGJlIGFkZGVkIHRvIFN0YWdlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciB0aGUgc3ByaXRlIGFuZC9vciBvcHRpb25zIHBhc3NlZCB0byBjb3N0dW1lLlxuICAqIEFsdGVybmF0aXZlbHkgYW4gaW1hZ2UgVVJMLiBJZiBhIFVSTCBpcyBwcm92aWRlZCBkZWZhdWx0IGNvc3R1bWUgd2lsbCBiZSBzaXplZCB0byBpbWFnZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuY29zdHVtZSAtIEEgZGVmYXVsdCBDb3N0dW1lLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gdGhlIGNvc3R1bWUgd2lkdGggaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSB0aGUgY29zdHVtZSBoZWlnaHQgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbWFnZSAtIGEgVVJMIChvciBkYXRhIFVSTCkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucyAtIGEgVVJMIChvciBkYXRhIFVSTCkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBzaGVlcHkgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFGOEFBQUJlQ0FZQUFBQkZFTWhRQUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBUnNrbEVRVlI0MnUxZEIxUlUxeFpGUVpvVUVSVkZSYkZqVndRTEtvcWdCanZnVnhHajJHTXZzV3VJMFVSaTc3MlhiemYyWG1KdjJGdnN4dDRWWVJvRGMvNCtUM1R4RVdiZU5KcXoxN3BybUpuM0htLzJ1L2ZjYzArN1ptWW1tR0JDMWtReEt5dXJSWFoyZGsvd0tzSHJNMnRyNjJYNHZKU0pHaU1pUjQ0Y0hVQzRyRStmUG9xb3FDaTZmLzgrWGJ4NGtRWU9IQmlIQnlERDk5MlRIRzZGMWlaWHJsekxIUjBkZCtGMUNkNEg4V1ZNVEdxUHBnNE9EakltUFNWY3ZYcVZuSnljcERndUJNM0gxdGIyVmZueTVTV1RKazJpQlFzVzBJUUpFNmhreVpJU2ZQNEUzMWN4MFNrZWxpRHQ5YjU5KzBnZERodzRRSmFXbHAvUTVLdFdyVklsLzE2bFV0SGN1WE1UV0Z4OVQySXFOMXBiYzNQeitUbHo1andMT1gwVDdUcEV4UzU4L2dlYUg1cUZtdk1iQlFZR1NrZ0RFaElTdVBjbnpKbzFTNlh1dUxGang4WmpGSjNQNnFTWFJTL2JuRDE3OW9UQ2hRdkxPbmJzbURCeDRrUkJES0FIMHJCaHc2aFJvMFlLOU9vNEd4dWI5eFlXRnIvaG5GekpybEU5Yjk2OHg5NjhlYU9KZTRxSmlhR3laY3NLRDBFZEZBckZGeEZWTVN1U2JnMGlmMGRUZ3ZDNHk1Y3ZheVJqMjdadFZLTkdEUW1MRFp3ZnhnOEJvMk0veS9tbFM1ZXFTQ1MyYnQwcTZyaVFrSkJZL0krZnNocnhCU0JPN3BRb1VVSjYrdlJwMGhhYk4yOG1lM3Q3QlloL0V4d2NMSk5LcGZUcDB5ZlI1My84K0ZIVWNhTkdqVXJBdlk3TFNzUzdRWHc4UnE5U2NHL1dGWU1IRHladmIyOVNLcFZrTEVSSFIxT2VQSG00OTFmS0NzVGJvOGMvYnQrK3ZTSStQbDVuVWxnaktWU29FSjA3ZDQ2TWpZTUhENm93Mzd6RHZlZkoxTXhEaTFudDYrc3IxelRaYWNLalI0OG9kKzdjbEZibzBLR0RIQTlnZG1ibXZqbklsejk5K2xSdk1xNWR1MFpGaXhaTk0vSlpHUUQ1N3pNcjhkbEEvSU5seTVZWmhJejM3OThUeEJmRnhzYW1DZmtzSWxrVlpyR1orSHVjZVUyQ05nWXRNckVOUUd1QjVvWG1pbVp1bEpVa1drdmN6QUlRZWdFOTRqbFV2MWk4dm9COTVBQytHOFY2ZC9KbHY0dUxpOVNRazJQTm1qVUo2bVdha00rS1FiWnMyVlQ0SGVWdGJLelg0KzhFMS96NXBFSE5Ha2s2aDRYSXcwT0Q1ZlZxVjQ5eEsrUWFZMjFsRllmaitQZ0VHMnZyTjFaV2x0dnh2cjYrcER2QktEVVRSRWZEQUNYdjJiT25jc21TSmJScDB5Wmh5YjVod3dZYVAzNDgrZnY3UzNHY0VnL2pRYUl1bmgxcTRlbnAwNmVMMHNNbEVnbFBjalJpeEFpcVc3Y09aTHNUOFkvQmVvQktGQzlPNGVIaGRQandZZHE3ZHkvbHo1K2ZIajU4bU9xMWVHUzhmUG1TV0JYVkIwZU9IT0dSRm0xaFlSNFgxS3loOHR5aHpVUWY3cWJhWXA5ZHBWdm45dEhlVFV0cFVPL09Ta3ZMSEhIb3JFTjBKYjRWcnk0OVBUMFZHemR1cExpNE9MVTMrKzdkTzRxTWpDUThKQVhPdXd5VFFUeUxpdFNHTkpNNWZQaHdxb1hlakFkSHVSd2RxVVdUQUpvMThSYzZzWGNkM2I5MG1DNGUzVWFiVnN5bXptR3R5Y0hlbmp3OXExS1BIajBJSzF0aDBaUjBFbWM5bmxmR0x2bnk0c2Qzb1hKbFBlang0OGZmL0crZWYwNmVQS2wydGN2ZlFiTlNPdGpieGUvZXVGZ3Q2YW0xUFp1V2NPZVJhaTJyUWQ0TUxHWVVDeGN1RkZROGJmWGtidDI2S2RGclZLZE9uZnJtKzdObnoxTHAwcVhJR2IyN1UyZ3dMWncrbnE2ZjNrMEo3MjZyL1RFZkhsMmdVWU43a1NVZWxMVzFGUlV1VkJBUElRLzVZcVI0VmZNa21DdW9hV00vZW5UMWIxSzl2ME8vRHU4bmpDQitJUHYzNzZjelo4N1FpaFVyeUs5K1BjcnQ1RVR0MnJXbGxOWWMvSHNiTkdoQTluWTVWVmRQN3RTSmVHNlhqKzhnYy9Qc1NtM21BWjRrRjhQZUltZlZUaDlNbXphTjhBQnB6NTQ5WHo5NysvWXRSb2FqUUl6c3hYV2RmdFRmTzllUVhVNWJtajBwUWhnWlcxYk5vWjNyRjlIemYwNTljeXlMZ2FIOXU1TnY3UnJrNVZtWmdsc0UwcEpaRStqMTNiUFUyTDhlbGZYd0lPNWdiSGErZWZNbXJWbXpoaXBYcWtRVzV1YTBmZTBDbllubk5yaDNsNFNjTmpaSHhSdGVySzBqb2M1SkRhRWFNbGF2WGsyWWtPbjI3ZHZDZTdiVEZIY3ZvdGVQK2pLa01jblJQK2YyNjN3TkhoMnJGMDZoZ1BwMXFFQitGMEZjMWE3cFJZRUI5Y2k3YWtXOTdvODdCZHV2UUdsTnNkd0hRTnpJMVUxbXVtRGt5SkZVcWxRcFFSeGR1blNKb0RuUXV3ZFJlaitBOXEyYlUzajdZTDJ2azd6VjhxNUtjeWIvcXZQNUwyNmZvbng1bldVV0Z0a25pRFlCZ1BqWGl4WXRVaGxhWmVPSm1sWEUwYU5IQys5OWZldFNtNkFtUXMvVGh5UVdQNDRPOW5wZkoza3I1SnFmRG01ZG9kTzVMRXFyVmlvbmh3VFp3eHFmS09ZeFJBYUJJSm14ZE9iejU4OEw0b2Mxb2djUEhwQ0xTejdxM1RWTUwrSjQ5TEE2K3ZMMmFZT1NYN0o0VWZwcjlWeWR4RmpiNEtaS2pPeTdTUlptbXJuSEpQc3E2Y1JvRERSdjNwekdqQmtqL0gzcjFpMHFXTkFWWWlPRTR0LytveE5KejI2ZEZNai85T1N5UWNudkZCcEVQY0xiYW4zZStGRURWTkR0b3ptS1FodlZNZ2dPNUZodFZVcHR3UXVmcEhvL2o0Qmk3dTZDQ0lwN2ZVdnJIOHVUWlhGM040UEwvS2dqZndtVCtiVlR1MFNmTSsyUGtTcElEem00cksyZHZkZmVmaFVXUnlwS0J6eDc5Z3p1UFE5cTBxZytTWjVmRmYxaitkaXlwVXZRaElpZkRVNCt0Nkg5dTFIQkFpNTBiUGRhdGNjOXVYR2MvdE15VUpIWTQrdHBiMnkzdDMvR0s3NzBBdnRndmIyOXFFSzVNcUo2R3krMi9PdlY0b21ORks5dUdvVjhsdC84WUdHbklWOGZiMkVoeU9ZRkhoVW45NjJuVlFzbVU2dW1EZVdzVHRyYTJteGxMNTB1SmdSWDJHM2lOSmtPakEyWlRDYVlEWEF2MUsxakd6cXlZL1UzeEw2NWQ0NW1SSTZCUHA1SElOOFE2cXFtOXZqNk1XRmRZbWRuR3dNN1RUelBNVENid0xGdmN4ZnZKK0o5QlgwTVozNmxTNWVPcGd5QzY5ZXZVL2Z1M1JCQmtFc3dxaFYxSzB5d0pGSitFQTZMSVhsN1ZxVGxjLzgwdUhxcHJ2MDJzajlaV1ZwZU1JYXBPTlRQeis4VFpURHdTR1NOYU8zYXRaVFQxcGFPNzFtbnRxZXpJYTV5QlErcVhhTWEzWWs2b0JmWlBMb2FONmhMRThjT0U5N3YzN0tjMXhNdmpVRitlTk9tVFdNb2cyTFhybDNrNSt1amtURFdlbGdrY0d2U3NKN094UE1FKytVNjNOaU04ZjVoRk9Xd3NJZ1h2V2pTQW0zcTE2OGZuVkhKbnpkdkh1WUF6VHAzNFlJRnZoSVdVTjlIWi9KNWNaV1VmSjVZK1hPWWxsbU5kRE0wK2JXS0ZTdjJLYU9TenlZSnRvQnFJdTNBWHl1b1RNbGk1QVdEbURiNmVmTEdrM3d6bUtYaFFLR0dmclZKK3VLYThIbkY4cVUvNnFSS2FvcW5nZmRKbmxISkQrL1VrUmJQL0NQTkp0ZlVXdXVXUDhTQXF5NkdKdDhDWGlTOWJmZkdRc01BZjBIdXBqZjVFY1A2SmxoYVdrUWFmTVpGek9PdUdUTm1xRElpK2RXeCtEcHpZRk82azgrTExDZEhoLzhhUmVPcFU2ZE9ocFQ3TmFwNzAra0RHOU9kL0xWTHBzRWw2YmpiR09UbjRhUUJkcU5sTk5TcVdVTll6cWMzK2V4U2RNcmx5QnBQWTJQa05FMkJ5VGMybzVGZnA3YVBZR3BJYi9KM2JWaEVWU3BYZ2hmT0pnNEt5akpENTI5eDc1ZXloejg1T1A2RkoyUzJ2NlExd3RxSDB0TFprZWxPL3NyNWs0UjdZUmNyWEtJeW04K09jUWVEc1E5RFVWOEVKRWsrZlBnZ0xPMDVISnQ5ci9pY3MvclNwZWRIUkVRSTRTTHBUZjZVOFNOb3dJRCtYME5qRVBncnd3aTRZdlk1czlGQWFTUFcxc2NLRkNpUUFNc2RCUVFFQ0dFVmJPd3l0cU1sTmF4Y3VSS3V1V1lHSVhEOTBobFV3Q1V2YkVVMmdyMWVtM09IOU9zbVJPWWxEU1dzVXFXS0JIek5Nd2p2a1B1VDJUN2RyMTgvZXZMa1NZYVErUndwWE1TdGtFSElieEhvLzlWc29LM2p2VkVEWDlxeVpjdi8zZHUvLy80clpNb2tCc3JxSGtLUElYUUNJa2FlRm9rSDJvQkhYRDZFQm5KRW03N2tzNk1kaXlVYTJDdWNMaDNiTHZvOGRuRTZPamdJWHJma1dMZHVIY0gvL1V4RHhtVHFqaXljSE9YajR5UFhKcjhwTGRHcjEwODB1RThYblFoZk1HMmNFTUQ2eFc2emNma3NRZng4Y2RyenE2WXdFWTdWckZTeFFxcjNWNkZDaFZqTWl6MjBaaDdoZkZzUVlTeFBEMDFHTEM1Y3VDQUV5YkluUzF2eVEwT2FVZlZxbFlRVktvZUUrRlQzRk96K2JLOW4wdXZVckNZRVNhbTdSZ09ZdEtkTW1aTHEvWEVVSGpyd1U2Mkl4NlFhaW1oZldXcVJ4QmtKVFpzMG9WQkVxR2xMUHZkc2p1bnMyQzVJaU9uOEV0akVJNGtmUW1URUVMV1JFMXZYekVOeW5MUGFURWFPYUlic2wzRWN2MWp1blJIVkc4c3g4WmtCWE1qQzBkR0IvdngxYUpxcGx4d0hpbFV0TFY2OFdPUDlJZGxQQnRFelVxeEtPYlpGaXhaeXlrVFlzV09INEdCZk5PTjNveFAvOXY1NWlDbDMrSk83aTdvM2RuY2lMK0dzR081dE9PT0M0K1F6R3pnaGdoTXBXR3N4RnZFc2xtcGhibWplckJtSlRWM2xFSFBNbjYvRmtCK0diSk1ZeXFSWXYzNjlrQWd4cEY5WGpRa1YyamFXL3lFdGZoQUN1WGlsTHhhc0tTWW16NWxyc3Qrdm56eDVzb295TVE0ZE9pVE1BWnlKRXYzNGtrR0laNWNoTDhUYzNZdVNMczRsZEFpRnh1QXBESTlYbVZIa0pBY25YSEFQTFZiVWpRNXRXNmtYOFJ6MjUxbTVBcFVvVVR6RlBDNHhTRXlHY0ZZYm9ZWW5GR2ZNMmdWcENSN3V5UDhTakg4L3RtMGw1R05wU3p5cm9IbWNjNU9QVHkwU1V6NG1KYkRsRjl5cU5LMTA2eUJhSVpxeUdEZ3RsWlBza1A5S1AzVU9GWkxSeENTc0lhZFdlSEJzejlKbm9mbjgrWFBXeE9TYUp0dVdxRjJUNWNobjhHam1PSjhpUlQ0SFVGVkU0QzB2cG5paHhBR3U5eTRlRWh3elUzOGZDVzJtcWhCKzZPVlZqWTRlUGFyMy8rYmNCaVIvM05aRWZnajh0Vm1TL0tRcnpwMDdkL0xDUjBqQVNCb0V4WTFMQ0tCZWp4QU5aeWdNR2pSSUNYRStSV05nTE1wZGlTSS92V3o0aGdablZySzFsa1VUK3lhTVljZnk4UERnK1B4QVRlU1h4RXBNS3FiM21DQU9WNjVjb2NTcWhEazFrVy9MeFJ6a2N2V1dCWDJxUVgxdmdBaVRZcktORkd0R2ZzcEZIZFFac1V6UVBMbHpqNzl6NXc2Yk83amlTRUZSNUdPSVRPM2J0MitLcVNpOHdEQ0pITTFnOTJaWVdCajdjYVhnYzVvMnBueGZWMWZYMkpSSVpyZVlDWnJCbVpSY1Z3SWhKTGNTYXhHSjk2T3c1NFZyNVNURnZYdjNCT3VjQ2VLQTRpQ3N1bmJTeFhmN283dTd1eVNweVpScjMyUVY5VEl0Z0lybDhWZ2RqOWNwTkp4N1A4cXlmR1c3WGJ0MkprYTF3Snc1YzNoVnUxblhrQkV2ek5TS0V5ZE9DQm9PVm1rbVJyWEE5dTNidWU3eVJkMHpJeXdzaGlKQ1RUcDE2dFEwS3h5WFZjQlJGWENjUDllci9DSjYveExNM0VwREdKaStKM0FKTTFnTEh1cGQveEt5Nno1dmMyR0NlTEJoRGhWdUwra2RxSW1Mbk1wb29ZSVpIZGlCZ21YK1lVT1FmM0wzN3QwbVJyVlROVkU3MDNLaS9tVytVZmFGSjEwVHhBTWVRVTRQOVRkRWlIakVnQUVEbENaS3hlSFZxMWRjZlVRcHhvd3NCaDFSQUNQR1JLczRqQnMzTGdFaE9BY05sWlRpeXFaUnJtbHNnbnB3cEFMdjF3TE92QTJXRWdSMTh5NzdQazFRajltelo2c3dSMTQxYkkxMlM4dXhyVnExa3Bub1RSMmNxd3dIUEVlbTFUSjBPbTV1VGdmVnRIM1M5d291RFYrbVRCa0pielZsbEswZTRCeVlhdXI5MzRJajQxRDBWYzRwVkdaRzNNQXlMNGVQY3pWdEV6N2p4WXNYWDlJK1QybFRLVlpYK0xOYzR4aVg3eG5zV09KZE10RGJGZUNEaTE3WXBzbE9NNXk1Z28yNjVGbkZyY2lCVXB4WXdkdC9jRmE3dW83MSt2VnJ3bllqTE4rbDRJSDN5bXFUNWx2OVlQSWRoL3hjaGJvd2s4d0dqcWxFUVQ5ZW5mTGVLeXBrMlV2d1FGU2MvdE82ZFdzbHlseEtPY2tCcXVSMVVOQ2JOWEN6OUFKdXBDY3ZveEZxRXA4WnNoYkZnQVBHWUpmaENMTTVhSnpFTmhkdEFkcFVOTjR4dXFSWkJrSWxqSUFvbG4zOEVJNGZQNTVpUkJ0L3hwYlJ6cDA3RXlvV0VxcFhDVnVoNmdvT1NNTC9GR0lzRFd5TmpNTjF6NXNaYVU4cm8wM0U4SGh0NDJyWmFQRWMvWUNJWnlrM1ZDR1hjUVZZWjJkbjZ0Ky9QK25ybUdHNWkrQlRybTBUZi9mdVhZTVJ6N3NlOFZvR3Y4WGRMSk9DeTV4d3FmS09pY09VRys4di9qTW5DQ1NQQjlKRnRXT3hnRWl3M1pqd3hrRTJ5MjdjdUdFUTRua3ZMOXhuc0ZrV1JXTitBTmhUVm1Nd2JrcmdWSHJPaWdmeFc3NHNabkM5WDFqazZTcCtPREp2NXN5WnFzU1l5aUN6TEk2cXZGT2NtNXViak1NUHhWUW9aMmQweTVZdEZTQ0lSVUxmNVBJWWszNFhUampyMnJXcmtqZEJFQXNlTVY1ZVhqS01vTGU0VENPejd3UXNtdnJCWFBFVzFsSUYxTGw0TGx6RWFtdFVWSlN3WVJqdjdNdzdDV0h1NFBsQ2ptTlhhNGoyOWNBSU9NWUpmYmlla2pjZVMybDA4VjVjdkJrWktxbHdTbjRDanArZnJpcGpPb0o3Y0NCNjdueE0xcmNUZS9ibkRSenhZS0JQNzBtY08reTB1R1lObkxzS3BIN0M5ZUo1ODh0eTVjcEprSEVqd2NLUTdleXNKVDBCOGFQeGQyRXpFNHl6RERIN3ZIbEFVSktKUHlnamFqTC9BMTVFeHkrTTQ0TGZBQUFBQUVsRlRrU3VRbUNDJztcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHBhY2U6IDMzLFxuICAgIH07XG5cbiAgICBsZXQgYWN0dWFsID0ge307XG4gICAgdHlwZW9mIG9wdGlvbnMgPT09ICdvYmplY3QnID8gYWN0dWFsID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9IDogYWN0dWFsID0gZGVmYXVsdHM7XG5cbiAgICBzdXBlcihhY3R1YWwucGFjZSk7XG5cbiAgICAvLyBjb3N0dW1lc1xuICAgIHRoaXMuY29zdHVtZXMgPSBbXTtcblxuICAgIC8qXG4gICAgKiBhbHRlcm5hdGUgb3B0aW9ucyAgLSBpbWFnZSB1cmwuXG4gICAgKiB1c2VyIGNhbiBzZW5kIGEgdXJsIGluc3RlYWQgb2YgYW4gb3B0aW9uIG9iamVjdC5cbiAgICAqIHRoaXMgd2lsbCBiZSB0cmVhdGVkIGFzIGEgY29zdHVtZSBpbWFnZSB1cmwuXG4gICAgKiB0aGUgaW1hZ2Ugd2lsbCBiZSBzZXQgdGhlIHNwcml0ZSBjb3N0dW1lLlxuICAgICogd2hlbiB0aGUgaW1hZ2UgaXMgbG9hZGVkLCBjb3N0dW1lIHdpZHRoIGFuZCBoZWlnaHQgd2lsbCBiZSBzZXQgdG8gYWN0dWFsIGltYWdlIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAgKiBzcHJpdGUgd2lsbCBiZSByZWZyZXNoZWQuXG4gICAgKi9cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhY3R1YWwuY29zdHVtZSA9IG5ldyBDb3N0dW1lKHsgaW1hZ2U6IG9wdGlvbnMsIHdpZHRoOiAwLCBoZWlnaHQ6IDAgfSk7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblxuICAgICAgY29uc3QgbWUgPSBhY3R1YWwuY29zdHVtZTtcbiAgICAgIGltYWdlLnNyYyA9IG9wdGlvbnM7XG5cbiAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICAgIG1lLm9yaWdpbmFsV2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgbWUub3JpZ2luYWxIZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIG1lLndpZHRoID0gbWUub3JpZ2luYWxXaWR0aDtcbiAgICAgICAgbWUuaGVpZ2h0ID0gbWUub3JpZ2luYWxIZWlnaHQ7XG5cbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgLSBwYXNzaW5nIGN1c3RvbWUgb3B0aW9ucyB0byBzcHJpdGUuXG4gICAgKiBpZiBjb3N0dW1lIGlzIG5vdCBkZWZpbmVkIGJ5IHVzZXIsIGl0IHdpbGwgYmUgY3JlYXRlZC5cbiAgICAqIHdoZW4gbm8gaW1hZ2UgaXMgc2V0LCBzaGVlcHkgaXMgZGVmYXVsdC5cbiAgICAqXG4gICAgKiBhbHRlcm5hdGUgb3B0aW9ucyAtIG51bGwuXG4gICAgKiB1c2VyIGNhbiBwYXNzIG51bGwgaW5zdGVhZCBvZiBhbiBvcHRpb24gb2JqZWN0LlxuICAgICogdGhpcyBpcyBzYW1lIGFzIHNldHRpbmcgYSBjb3N0dW1lIGFzIG51bGwuXG4gICAgKiB0aGUgc3ByaXRlIHdpbGwgaGF2ZSBubyBjb3N0dW1lcyBhbmQgbm8gc2l6ZS5cbiAgICAqL1xuICAgIGlmICh0eXBlb2YgYWN0dWFsLmNvc3R1bWUgPT09ICd1bmRlZmluZWQnICYmIG9wdGlvbnMgIT09IG51bGwpIHtcbiAgICAgIGNvbnN0IGNvc3R1bWVPcHRpb25zID0ge307XG4gICAgICBhY3R1YWwud2lkdGggPyBjb3N0dW1lT3B0aW9ucy53aWR0aCA9IGFjdHVhbC53aWR0aCA6IG51bGw7XG4gICAgICBhY3R1YWwuaGVpZ2h0ID8gY29zdHVtZU9wdGlvbnMuaGVpZ2h0ID0gYWN0dWFsLmhlaWdodCA6IG51bGw7XG4gICAgICBhY3R1YWwuY29sb3IgPyBjb3N0dW1lT3B0aW9ucy5jb2xvciA9IGFjdHVhbC5jb2xvciA6IG51bGw7XG4gICAgICAodHlwZW9mIGFjdHVhbC5pbWFnZSAhPT0gJ3VuZGVmaW5lZCcpID8gY29zdHVtZU9wdGlvbnMuaW1hZ2UgPSBhY3R1YWwuaW1hZ2UgOiBjb3N0dW1lT3B0aW9ucy5pbWFnZSA9IHNoZWVweTtcblxuICAgICAgYWN0dWFsLmNvc3R1bWUgPSBuZXcgQ29zdHVtZShjb3N0dW1lT3B0aW9ucyk7XG4gICAgfVxuXG4gICAgLy8gc2V0IGNvc3R1bWVcbiAgICBhY3R1YWwuY29zdHVtZSA/IHRoaXMuY29zdHVtZSA9IGFjdHVhbC5jb3N0dW1lIDogbnVsbDtcbiAgICB0aGlzLmNvc3R1bWUgPyB0aGlzLmNvc3R1bWVzLnB1c2godGhpcy5jb3N0dW1lKSA6IG51bGw7XG5cbiAgICAvLyBzZXQgd2lkdGhcbiAgICB0aGlzLmNvc3R1bWUgPyB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aCA6IHRoaXMud2lkdGggPSAwO1xuICAgIHRoaXMuY29zdHVtZSA/IHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQgOiB0aGlzLmhlaWdodCA9IDA7XG5cbiAgICB0aGlzLnggPSAwO1xuICAgIHRoaXMueSA9IDA7XG4gICAgdGhpcy56ID0gMDtcblxuICAgIHRoaXMucHJldlggPSAwO1xuICAgIHRoaXMucHJldlkgPSAwO1xuXG4gICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmRpcmVjdGlvbiA9IDkwO1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IDEwMDtcblxuICAgIHRoaXMucm90YXRpb25TdHlsZSA9IDA7XG5cbiAgICB0aGlzLnRleHR1aSA9IG51bGw7XG5cbiAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnBlbkNvbG9yID0gJyMyMjIyMjInO1xuICAgIHRoaXMucGVuU2l6ZSA9IDE7XG5cbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBzcHJpdGUgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byBhZGQgdGhlIHNwcml0ZSB0b28uXG4gICovXG4gIGFkZFRvKHN0YWdlKSB7XG4gICAgdGhpcy5zdGFnZVdpZHRoID0gc3RhZ2Uud2lkdGg7XG4gICAgdGhpcy5zdGFnZUhlaWdodCA9IHN0YWdlLmhlaWdodDtcblxuICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTcHJpdGVFbGVtZW50KHRoaXMsIHN0YWdlKTtcbiAgICB0aGlzLnN1cmZhY2UgPSBuZXcgU3RhZ2VTdXJmYWNlKHN0YWdlKTtcblxuICAgIHRoaXMuZWxlbWVudC5mbGFnID0gc3RhZ2UuZWxlbWVudC5mbGFnO1xuICAgIHRoaXMuYWdhaW5zdEJhY2tkcm9wID0gc3RhZ2UuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lcjtcblxuICAgIHN0YWdlLnNwcml0ZXMucHVzaCh0aGlzKTtcbiAgICB0aGlzLnogPSBzdGFnZS5zcHJpdGVzLmxlbmd0aDtcblxuICAgIHRoaXMuZWxlbWVudC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBjbG9uZSAtIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgc3ByaXRlIGFuZCB0cmlnZ2VycyBhbiBldmVudC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgbGV0IGNsb25lID0gdGhpcy5jbG9uZSgpO1xuICAqICAgY2xvbmUubW92ZSgxMDApO1xuICAqICAgY2xvbmUuYWRkVG8oc3RhZ2UpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIGNsb25lKCkge1xuICAgIC8vIG1ha2UgYSBuZXcgc3ByaXRlLlxuICAgIGNvbnN0IHNwcml0ZSA9IG5ldyBTcHJpdGUoKTtcbiAgICAvLyBzYXZlIGlkLlxuICAgIGNvbnN0IGlkID0gc3ByaXRlLmlkO1xuICAgIC8vIGFuZCBhc3NpZ24gcHJvcGVydGllcy5cbiAgICBjb25zdCBjbG9uZSA9IE9iamVjdC5hc3NpZ24oc3ByaXRlLCB0aGlzKTtcbiAgICAvLyByZWFzc2lnbiB0aGUgdW5pcXVlIGlkLlxuICAgIGNsb25lLmlkID0gaWQ7XG5cbiAgICAvLyByZW1vdmUgRE9NIGVsZW1lbnRzXG4gICAgY2xvbmUuZWxlbWVudCA9IG51bGw7XG4gICAgY2xvbmUuc3VyZmFjZSA9IG51bGw7XG5cbiAgICAvLyBkZXRhY2ggYXJyYXlzXG4gICAgY2xvbmUuY3NzUnVsZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMuY3NzUnVsZXMpKTtcbiAgICBjbG9uZS5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLnNsaWNlKCk7XG5cbiAgICAvLyBmaWd1cmUgb3V0IHdoYXQgdGhlIGN1cnJlbnQgY29zdHVtZSBpcy5cbiAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKHRoaXMuY29zdHVtZSk7XG5cbiAgICAvLyBmaWxsIHRoZSBjb3N0dW1lcyBhcnJheSB3aXRoIG5ldyBjb3N0dW1lcyBhbmQgYXNzaWduIHByb3BlcnRpZXMuXG4gICAgY2xvbmUuY29zdHVtZXMgPSB0aGlzLmNvc3R1bWVzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY29zdHVtZSA9IG5ldyBDb3N0dW1lKCk7XG4gICAgICBjb25zdCBvYmogPSBPYmplY3QuYXNzaWduKGNvc3R1bWUsIGl0ZW0pO1xuXG4gICAgICAvLyBkZXRhY2ggYXJyYXlzXG4gICAgICBvYmouY3NzUnVsZXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGl0ZW0uY3NzUnVsZXMpKTtcbiAgICAgIG9iai5jbGFzc2VzID0gaXRlbS5jbGFzc2VzLnNsaWNlKCk7XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgdGhlIGN1cnJlbnQgY29zdHVtZS5cbiAgICBjbG9uZS5jb3N0dW1lID0gY2xvbmUuY29zdHVtZXNbY3VycmVudENvc3R1bWVJbmRleF07XG5cbiAgICAvLyBhbm5vdW5jZSBhIGNsb25lXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2Uuc3ByaXRlY2xvbmVkLiR7dGhpcy5pZH1gLCB7IGRldGFpbDogY2xvbmUgfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICByZXR1cm4gY2xvbmU7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyBhIHNwcml0ZSBmcm9tIHRoZSBzdGFnZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKi9cbiAgcmVtb3ZlRnJvbShzdGFnZSkge1xuICAgIGNvbnN0IGN1clN0YWdlID0gc3RhZ2U7XG5cbiAgICBjdXJTdGFnZS5zcHJpdGVzID0gc3RhZ2Uuc3ByaXRlcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHRoaXMpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudC5kZWxldGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqIEV2ZW50cyAqICovXG5cbiAgLyoqXG4gICogd2hlbkNsb25lZCAtIEFkZHMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lciB0cmlnZ2VyZWQgYnkgYSBjdXN0b20gZXZlbnQuXG4gICogVGhlIGN1c3RvbSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgdGhlIGNsb25lKCkgbWV0aG9kLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2xvbmUoKTtcbiAgKiB9KTtcbiAgKlxuICAqIHNwcml0ZS53aGVuQ2xvbmVkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuYWRkVG8oc3RhZ2UpO1xuICAqICAgdGhpcy5nbGlkZSg1LCAxMDAsIDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkNsb25lZChmdW5jKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgYmxvY2tMaWtlLnNwcml0ZWNsb25lZC4ke3RoaXMuaWR9YCwgKGUpID0+IHtcbiAgICAgIGUuZGV0YWlsLl9leGVjKGZ1bmMsIFtdKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogTW90aW9uICogKi9cblxuICAvKipcbiAgKiBfbW90aW9uIC0gTW92ZXMgdGhlIHNwcml0ZSB0byBzcGVjaWZpZWQgbG9jYXRpb24gKHgsIHkpLlxuICAqIEFsbCB1c2VyIG1vdGlvbiBtZXRob2RzIHRyYW5zbGF0ZWQgdG8gdGhpcyBtb3Rpb24uXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBvZiB0aGUgc3ByaXRlICgwIGlzIGNlbnRlciBzY3JlZW4pLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBvZiB0aGUgc3ByaXRlICgwIGlzIGNlbnRlciBzY3JlZW4pLlxuICAqL1xuICBfbW90aW9uKHgsIHkpIHtcbiAgICB0aGlzLnByZXZYID0gdGhpcy54O1xuICAgIHRoaXMucHJldlkgPSB0aGlzLnk7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICAgIHRoaXMuc3VyZmFjZSA/IHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGdsaWRlIC0gTW92ZXMgdGhlIHNwcml0ZSBmb3IgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcyBzbyBpdCBhcnJpdmVzIGF0IHNwZWNpZmllZCBsb2NhdGlvbiB3aGVuIHRpbWUgaXMgdXAuXG4gICogUHJvdmlkZXMgc21vb3RoIG1vdmVtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nbGlkZSgzLCAxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgdGltZSA9IDU7XG4gICogICB0aGlzLmdsaWRlKHRpbWUsIDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdGhlIHdob2xlIG1vdmVtZW50IHdpbGwgbGFzdCAoYW5kIHdpbGwgaGFsdCBmdXJ0aGVyIGV4ZWN1dGlvbiBmb3IpLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICovXG4gIGdsaWRlKHNlYywgeCwgeSwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgLy8gZGl2aWRlIHRoZSB4IGFuZCB5IGRpZmZlcmVuY2UgaW50byBzdGVwc1xuICAgIGNvbnN0IGZyYW1lc1BlclNlY29uZCA9IDEwMDAgLyB0aGlzLnBhY2U7XG4gICAgY29uc3Qgc3RlcFggPSAoeCAtIHRoaXMueCkgLyAoc2VjICogZnJhbWVzUGVyU2Vjb25kKTtcbiAgICBjb25zdCBzdGVwWSA9ICh5IC0gdGhpcy55KSAvIChzZWMgKiBmcmFtZXNQZXJTZWNvbmQpO1xuICAgIGNvbnN0IGludCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGkgKz0gMTtcbiAgICAgIG1lLl9tb3Rpb24obWUueCArIHN0ZXBYLCBtZS55ICsgc3RlcFkpO1xuICAgICAgaWYgKGkgLyBmcmFtZXNQZXJTZWNvbmQgPj0gc2VjKSB7XG4gICAgICAgIC8vICBjbGVhciB0aGUgaW50ZXJ2YWwgYW5kIGZpeCBhbnkgXCJkcmlmdFwiXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcbiAgICAgICAgbWUuX21vdGlvbih4LCB5KTtcbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzLnBhY2UpO1xuICB9XG5cbiAgLyoqXG4gICogbW92ZSAtIE1vdmVzIHRoZSBzcHJpdGUgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHBpeGVscyBpbiB0aGUgZGlyZWN0aW9uIGl0IGlzIHBvaW50aW5nLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgbW92ZShwaXhlbHMpIHtcbiAgICAvKipcbiAgICAqIHRvUmFkIC0gY29udmVydHMgYSBkZWdyZWUgdG8gcmFkaWFucy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMuXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGVncmVlcyBjb252ZXJ0ZWQgdG8gcmFkaWFucy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvUmFkKGRlZykge1xuICAgICAgcmV0dXJuIGRlZyAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB9XG5cbiAgICBjb25zdCBkeCA9IE1hdGgucm91bmQoTWF0aC5jb3ModG9SYWQodGhpcy5kaXJlY3Rpb24gLSA5MCkpICogcGl4ZWxzKTtcbiAgICBjb25zdCBkeSA9IE1hdGgucm91bmQoTWF0aC5zaW4odG9SYWQodGhpcy5kaXJlY3Rpb24gKyA5MCkpICogcGl4ZWxzKTtcblxuICAgIHRoaXMuX21vdGlvbih0aGlzLnggKyBkeCwgdGhpcy55ICsgZHkpO1xuICB9XG5cbiAgLyoqXG4gICogZ29UbyAtIE1vdmVzIHRoZSBzcHJpdGUgdG8gc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdvVG8oMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgZ29Ubyh4LCB5KSB7XG4gICAgdGhpcy5fbW90aW9uKHgsIHkpO1xuICB9XG5cbiAgLyoqXG4gICogZ29Ub3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSB0b3dhcmRzIGFub3RoZXIgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMTAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nb1Rvd2FyZHMob3RoZXJTcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZSB0by5cbiAgKi9cbiAgZ29Ub3dhcmRzKHNwcml0ZSkge1xuICAgIHRoaXMuX21vdGlvbihzcHJpdGUueCwgc3ByaXRlLnkpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0WCAtIFBsYWNlcyB0aGUgc3ByaXRlIGF0IHRoZSBzcGVjaWZpZWQgeCBwb3NpdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZXRYKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgKi9cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy5fbW90aW9uKHgsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRZIC0gUGxhY2VzIHRoZSBzcHJpdGUgYXQgdGhlIHNwZWNpZmllZCB5IHBvc2l0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNldFkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCwgeSk7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VYIC0gTW92ZXMgdGhlIHNwcml0ZSBvbiB0aGUgeCBheGlzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlWCgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgY2hhbmdlWChwaXhlbHMpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54ICsgcGl4ZWxzLCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlWSAtIE1vdmVzIHRoZSBzcHJpdGUgb24gdGhlIHkgYXhpcyBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNoYW5nZVkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBudW1iZXIgb2YgcGl4ZWxzIHRvIG1vdmUuXG4gICovXG4gIGNoYW5nZVkocGl4ZWxzKSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCwgdGhpcy55ICsgcGl4ZWxzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBvaW50SW5EaXJlY3Rpb24gLSBQb2ludHMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBkaXJlY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRJbkRpcmVjdGlvbig0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gZGlyZWN0aW9uIHRvIHBvaW50IHRvLlxuICAqL1xuICBwb2ludEluRGlyZWN0aW9uKGRlZykge1xuICAgIGRlZyA+IDAgPyB0aGlzLmRpcmVjdGlvbiA9IGRlZyAlIDM2MCA6IHRoaXMuZGlyZWN0aW9uID0gKGRlZyArICgzNjAgKiAxMCkpICUgMzYwO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcG9pbnRUb3dhcmRzIC0gUG9pbnQgdGhlIHNwcml0ZSB0b3dhcmRzIGFub3RoZXIgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmdvVG8oMTAwLCAxMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBvaW50VG93YXJkcyhvdGhlclNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlIHRvLlxuICAqL1xuICBwb2ludFRvd2FyZHMoc3ByaXRlKSB7XG4gICAgLyoqXG4gICAgKiBjb21wdXRlRGlyZWN0aW9uVG8gLSBmaW5kcyB0aGUgZGlyZWN0aW9uIGZyb20gc3ByaXRlJ3MgY3VycmVudCBsb2NhdGlvbiB0byBhIHNwZWNpZmllZCBzZXQgb2YgY29vcmRpbmF0ZXMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21YIC0gdGhlIHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21ZIC0gdGhlIHkgY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvWCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1kgLSB0aGUgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGlyZWN0aW9uIGluIGRlZ3JlZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlRGlyZWN0aW9uVG8oZnJvbVgsIGZyb21ZLCB0b1gsIHRvWSkge1xuICAgICAgLyoqXG4gICAgICAqIHRvRGVnIC0gQ29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzLlxuICAgICAgKlxuICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIC0gbnVtYmVyIG9mIHJhZGlhbnMuXG4gICAgICAqIEByZXR1cm4ge251bWJlcn0gLSByYWRpYW5zIGNvbnZlcnRlZCB0byBkZWdyZWVzLlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHRvRGVnKHJhZCkge1xuICAgICAgICByZXR1cm4gcmFkICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgfVxuXG4gICAgICAvLyAxKSBGaW5kIHRoZSBhbmdsZSBpbiByYWQsIGNvbnZlcnQgdG8gZGVnICg5MCB0byAtOTApLlxuICAgICAgLy8gMikgRmluZCB0aGUgc2lnbiBvZiB0aGUgZGVsdGEgb24geSBheGlzICgxLCAtMSkuIFNoaWZ0IHRvICgwLCAtMikuIE11bHRpcGx5IGJ5IDkwLiAoMCwgMTgwKVxuICAgICAgLy8gQWRkIDEpIGFuZCAyKVxuICAgICAgLy8gTm9ybWFsaXplIHRvIDM2MFxuXG4gICAgICBsZXQgcmVzdWx0ID0gKHRvRGVnKE1hdGguYXRhbigoZnJvbVggLSB0b1gpIC8gKGZyb21ZIC0gdG9ZKSkpICsgKDkwICogKE1hdGguc2lnbihmcm9tWSAtIHRvWSkgKyAxKSkgKyAzNjApICUgMzYwO1xuICAgICAgKGZyb21ZIC0gdG9ZKSA9PT0gMCA/IHJlc3VsdCArPSA5MCA6IG51bGw7IC8vIG1ha2Ugc3VyZSB3ZSBmaXggYXRhbiBsaW0gKGRpdmlzaW9uIGJ5IHplcm8pLlxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRoaXMuZGlyZWN0aW9uID0gY29tcHV0ZURpcmVjdGlvblRvKHRoaXMueCwgdGhpcy55LCBzcHJpdGUueCwgc3ByaXRlLnkpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogdHVyblJpZ2h0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgcmlnaHQgKGNsb2Nrd2lzZSlcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy50dXJuUmlnaHQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5SaWdodChkZWcpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICh0aGlzLmRpcmVjdGlvbiArIGRlZykgJSAzNjA7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiB0dXJuTGVmdCAtIFR1cm5zIHRoZSBzcHJpdGUgaW4gYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdGhlIGxlZnQgKGNvdW50ZXItY2xvY2t3aXNlKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnR1cm5MZWZ0KDQ1KTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcyB0byB0dXJuLlxuICAqL1xuICB0dXJuTGVmdChkZWcpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICgodGhpcy5kaXJlY3Rpb24gKyAzNjApIC0gZGVnKSAlIDM2MDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFJvdGF0aW9uU3R5bGUgLSBTZXRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSByb3RhdGlvbiBzdHlsZXM6XG4gICogICAtICdubycgLyAyIC0gdGhlIHNwcml0ZXMgY2hhbmdlcyB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIGl0IHBvaW50cyB3aXRob3V0IGNoYW5naW5nIHRoZSBzcHJpdGVzIGFwcGVhcmFuY2UuXG4gICogICAtICdsZWZ0LXJpZ2h0JyAvIDEgLSB0aGUgc3ByaXRlIHdpbGwgZmxpcCBob3Jpem9udGFsbHkgd2hlbiBkaXJlY3Rpb24gaXMgYmV0d2VlbiAxODAgYW5kIDM2MC5cbiAgKiAgIC0gJ2FsbCcgLyAwIC0gdGhlIHNwcml0ZSB3aWxsIHJvdGF0ZSBhcm91bmQgaXRzIGNlbnRlclxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRSb3RhdGlvblN0eWxlKCdsZWZ0LXJpZ2h0Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5zZXRSb3RhdGlvblN0eWxlKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHNldFJvdGF0aW9uU3R5bGUoc3R5bGUpIHtcbiAgICBsZXQgY3VyU3R5bGUgPSBzdHlsZTtcblxuICAgIHN0eWxlID09PSAnbm8nID8gY3VyU3R5bGUgPSAyIDogbnVsbDtcbiAgICBzdHlsZSA9PT0gJ2xlZnQtcmlnaHQnID8gY3VyU3R5bGUgPSAxIDogbnVsbDtcbiAgICBzdHlsZSA9PT0gJ2FsbCcgPyBjdXJTdHlsZSA9IDAgOiBudWxsO1xuXG4gICAgdGhpcy5yb3RhdGlvblN0eWxlID0gY3VyU3R5bGU7XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIF9yZWZyZXNoQ29zdHVtZSAtIFNldHMgdGhlIGNvc3R1bWUgYW5kIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICovXG4gIF9yZWZyZXNoQ29zdHVtZSgpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRDb3N0dW1lIC0gQWRkcyBhIGNvc3R1bWUgdG8gdGhlIHNwcml0ZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ29zdHVtZShjb3N0dW1lKSB7XG4gICAgdGhpcy5jb3N0dW1lcy5wdXNoKGNvc3R1bWUpO1xuXG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmUuXG4gICAgaWYgKCF0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbMF07XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hDb3N0dW1lVG8gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgY29zdHVtZS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnN3aXRjaENvc3R1bWVUbyhjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBjb3N0dW1lIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaENvc3R1bWVUbyhjb3N0dW1lKSB7XG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZihjb3N0dW1lKTtcbiAgICBjdXJyZW50Q29zdHVtZUluZGV4ICE9PSAtMSA/IHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbY3VycmVudENvc3R1bWVJbmRleF0gOiBudWxsO1xuXG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaENvc3R1bWVUb051bSAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnN3aXRjaENvc3R1bWVUb051bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaENvc3R1bWVUb051bShpbmRleCkge1xuICAgIHRoaXMuc3dpdGNoQ29zdHVtZVRvKHRoaXMuY29zdHVtZXNbaW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAqIG5leHRDb3N0dW1lIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5uZXh0Q29zdHVtZSgpO1xuICAqXG4gICovXG4gIG5leHRDb3N0dW1lKCkge1xuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YodGhpcy5jb3N0dW1lKTtcbiAgICB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzWyhjdXJyZW50Q29zdHVtZUluZGV4ICsgMSkgJSB0aGlzLmNvc3R1bWVzLmxlbmd0aF07XG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZSAtIFJlbW92ZXMgYSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnJlbW92ZUNvc3R1bWUoY29zdHVtZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZShjb3N0dW1lKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZXMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZihjb3N0dW1lKTtcbiAgICAgIHRoaXMuY29zdHVtZSA9PT0gY29zdHVtZSA/IHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbKGN1cnJlbnRDb3N0dW1lSW5kZXggKyAxKSAlIHRoaXMuY29zdHVtZXMubGVuZ3RoXSA6IG51bGw7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGNvc3R1bWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gW107XG4gICAgICB0aGlzLmNvc3R1bWUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZU51bSAtIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjb3N0dW1lLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZU51bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZU51bShpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQ29zdHVtZSh0aGlzLmNvc3R1bWVzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiBzaG93IC0gU2hvd3MgdGhlIHNwcml0ZS4gQnkgZGVmYXVsdCBzcHJpdGVzIGFyZSBzaG93bi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaGlkZSgpO1xuICAqIHNwcml0ZS5zaG93KCk7XG4gICpcbiAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaGlkZSAtIEhpZGVzIHRoZSBzcHJpdGUuIEJ5IGRlZmF1bHQgc3ByaXRlcyBhcmUgc2hvd24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmhpZGUoKTtcbiAgKlxuICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVmcmVzaCAtIEZvcmNlcyBhIHNwcml0ZSByZWZyZXNoLlxuICAqIE5vdGU6IHNlcnZpY2UgbWV0aG9kIHRvIGJlIHVzZWQgaWYgY29zdHVtZSB3YXMgbWFuaXB1bGF0ZWQgZGlyZWN0bHkuXG4gICovXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIC8vIHdhaXQgYSBzZWMuLi5cbiAgICAvLyBUT0RPOiBUaGlzIGlzIHRvIGFjY29tb2RhdGUgZHluYW1pYyBpbWFnZSByZXNpemUuIE5vdCBpZGVhbC4gU2hvdWxkIGJlIGV2ZW50IGRyaXZlbi5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGluIGNhc2UgY29zdHVtZSB3YXMgcmVzaXplZCBmb3JjZSBhIHJlc2V0IG9mIHNpemUuXG4gICAgICBtZS5zZXRTaXplKG1lLm1hZ25pZmljYXRpb24pO1xuICAgICAgLy8gdGhlbiByZWZyZXNoIHRoZSBET00uXG4gICAgICBtZS5lbGVtZW50ID8gbWUuZWxlbWVudC51cGRhdGUobWUpIDogbnVsbDtcbiAgICB9LCB0aGlzLnBhY2UpO1xuICB9XG5cbiAgLyoqXG4gICogcmVzaXplVG9JbWFnZSAtIHNldHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHNwcml0ZSB0byB0aGF0IG9mIHRoZSBpbWFnZSBmaWxlIG9mIGN1cnJlbnQgY29zdHVtZS5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZC4gU2ltaWxhciB0byBjYWxsaW5nIHJlc2l6ZVRvSW1hZ2UoKSBvbiBjb3N0dW1lIGFuZCB0aGVuIHJlZnJlc2goKSBvbiBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvbnN0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKG51bGwpO1xuICAqXG4gICogY29uc3QgYW5ncnlTaGVlcCA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gICogICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvZC9kYi9FbW9qaW9uZV8xRjQxMS5zdmcvMjAwcHgtRW1vamlvbmVfMUY0MTEuc3ZnLnBuZycsXG4gICogfSk7XG4gICogYW5ncnlTaGVlcC5hZGRUbyhzcHJpdGUpO1xuICAqXG4gICogc3ByaXRlLnJlc2l6ZVRvSW1hZ2UoKTtcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqL1xuICByZXNpemVUb0ltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMuY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgKiBpbm5lciAtIFBsYWNlcyBhbiBIVE1MIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLmlubmVyKCdJIGxpa2UgdGV4dCBvbmx5Jyk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGlubmVyKGh0bWwpIHtcbiAgICB0aGlzLmNvc3R1bWUuaW5uZXIoaHRtbCk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBQbGFjZXMgYSBET00gZWxlbWVudCBpbnNpZGUgdGhlIGN1cnJlbnQgY29zdHVtZSBvZiB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5pbnNlcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWh0bWwtY3JlYXRpb24nKSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGluc2VydChlbCkge1xuICAgIHRoaXMuY29zdHVtZS5pbnNlcnQoZWwpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogX3JlZnJlc2hTaXplIC0gU2V0cyB0aGUgc3ByaXRlIHdpZHRoIGFuZCBoaWdodCBpbiByZWxhdGlvbiB0byBvcmlnaW5hbCB0aGVuIHJlZnJlc2hlcyBlbGVtZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIGFkZC5cbiAgKi9cbiAgX3JlZnJlc2hTaXplKCkge1xuICAgIC8qKlxuICAgICogZGVjaW1hbFJvdW5kIC0gcm91bmRzIGEgbnVtYmVyIHRvbyBkZWNpbWFsIHBvaW50cy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gcm91bmQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gcG9pbnRzIC0gaG93IG1hbnkgZGVjaW1hbCBwb2ludHMgdG8gbGVhdmUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBkZWNpbWFsUm91bmQodmFsdWUsIHBvaW50cykge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAoMTAgKiogcG9pbnRzKSkgLyAoMTAgKiogcG9pbnRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLndpZHRoID0gZGVjaW1hbFJvdW5kKHRoaXMuY29zdHVtZS53aWR0aCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gZGVjaW1hbFJvdW5kKHRoaXMuY29zdHVtZS5oZWlnaHQgKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG5cbiAgICAgIHRoaXMuY29zdHVtZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjb3N0dW1lID0gaXRlbTtcbiAgICAgICAgY29zdHVtZS52aXNpYmxlV2lkdGggPSBkZWNpbWFsUm91bmQoY29zdHVtZS53aWR0aCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgICAgY29zdHVtZS52aXNpYmxlSGVpZ2h0ID0gZGVjaW1hbFJvdW5kKGNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlU2l6ZSAtIENoYW5nZXMgdGhlIHNpemUgb2YgdGhlIHNwcml0ZSBieSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmNoYW5nZVNpemUoNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZSAtIHRoZSBwZXJjZW50YWdlIGNoYW5nZS5cbiAgKi9cbiAgY2hhbmdlU2l6ZShjaGFuZ2UpIHtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gKz0gY2hhbmdlO1xuXG4gICAgdGhpcy5fcmVmcmVzaFNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFNpemUgLSBTZXRzIHRoZSBzaXplIG9mIHRoZSBzcHJpdGUgdG8gdGhlIHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0U2l6ZSgxNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgLSB0aGUgcGVyY2VudGFnZSB0byBzZXQuXG4gICovXG4gIHNldFNpemUocGVyY2VudCkge1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IHBlcmNlbnQ7XG5cbiAgICB0aGlzLl9yZWZyZXNoU2l6ZSgpO1xuICB9XG5cbiAgLyoqIFRleHQgVUkgKiAqL1xuXG4gIC8qKlxuICAqIHRoaW5rIC0gQ3JlYXRlcyBhIFwidGhpbmsgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS50aGluaygnSSB0aGluayB0aGVyZWZvcmUgSSBhbS4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHRoaW5rKHRleHQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHR1aSA/IHRoaXMudGV4dHVpID0gdGhpcy50ZXh0dWkuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KHRoaXMsICd0aGluaycsIHRleHQpIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB0aGlua1dhaXQgLSBDcmVhdGVzIGEgXCJ0aGluayBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUgZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS50aGlua1dhaXQoJ0kgdGhpbmsgdGhlcmVmb3JlIEkgYW0uJywgMyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC5cbiAgKi9cbiAgdGhpbmtXYWl0KHRleHQsIHNlYywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50aGluaygnJyk7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSwgc2VjICogMTAwMCk7XG4gICAgdGhpcy50aGluayh0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNheSAtIENyZWF0ZXMgYSBcInNwZWVjaCBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheSgnSXQgaXMgbm90IHRoZSBjb25zY2lvdXNuZXNzIG9mIG1lbiB0aGF0IGRldGVybWluZXMgdGhlaXIgYmVpbmcsIGJ1dCwgb24gdGhlIGNvbnRyYXJ5LCB0aGVpciBzb2NpYWwgYmVpbmcgdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGNvbnNjaW91c25lc3MuJyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqL1xuICBzYXkodGV4dCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGV4dHVpID8gdGhpcy50ZXh0dWkgPSB0aGlzLnRleHR1aS5kZWxldGUodGhpcykgOiBudWxsO1xuICAgICAgdHlwZW9mIHRleHQgIT09ICd1bmRlZmluZWQnICYmIHRleHQudG9TdHJpbmcoKSA/IHRoaXMudGV4dHVpID0gbmV3IFRleHRVaUVsZW1lbnQodGhpcywgJ3NheScsIHRleHQpIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBzYXlXYWl0IC0gQ3JlYXRlcyBhIFwic3BlZWNoIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZSBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheVdhaXQoJ0l0IGlzIG5vdCB0aGUgY29uc2Npb3VzbmVzcyBvZiBtZW4gdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGJlaW5nLCBidXQsIG9uIHRoZSBjb250cmFyeSwgdGhlaXIgc29jaWFsIGJlaW5nIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBjb25zY2lvdXNuZXNzLicsIDMpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gdGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXG4gICovXG4gIHNheVdhaXQodGV4dCwgc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zYXkoJycpO1xuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgIH0sIHNlYyAqIDEwMDApO1xuICAgIHRoaXMuc2F5KHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICogYXNrIC0gQ3JlYXRlcyBhbiBcImFzayBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUuXG4gICogQWxsb3dzIGZvciBhbiBpbnB1dCBib3ggdG8gYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyIGFuZFxuICAqIGNhcHR1cmUgdXNlciBpbnB1dCBpbnRvIHRoZSB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICogTm90ZSAtIHZhcmlhYmxlIGZvciBhbnN3ZXIgbXVzdCBiZSBkZWNsYXJlZCBpbiBnbG9iYWwgc2NvcGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vZ29vZDpcbiAgKiBsZXQgYW5zd2VyO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBhbnN3ZXIgPSB0aGlzLmFzaygnSXMgdGhlIGRlc3Rpbnkgb2YgbWFua2luZCBkZWNpZGVkIGJ5IG1hdGVyaWFsIGNvbXB1dGF0aW9uPycpO1xuICAqICAgdGhpcy5zYXkoYW5zd2VyKTtcbiAgKiB9KTtcbiAgKlxuICAqIC8vIGJhZDpcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgbGV0IGFuc3dlcjtcbiAgKiAgIGFuc3dlciA9IHRoaXMuYXNrKCdJcyB0aGUgZGVzdGlueSBvZiBtYW5raW5kIGRlY2lkZWQgYnkgbWF0ZXJpYWwgY29tcHV0YXRpb24/Jyk7XG4gICogICB0aGlzLnNheShhbnN3ZXIpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBvZiB0aGUgcXVlc3Rpb25cbiAgKlxuICAqL1xuICBhc2sodGV4dCwgdGhlVmFyID0gbnVsbCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBtZS5hc2tJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudChtZSwgJ2FzaycsIHRleHQpIDogbnVsbDtcblxuICAgICAgLy8gdGhpcyB3aWxsIHdhaXQgZm9yIHVzZXIgaW5wdXRcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5hc2suJHt0aGlzLmlkfS4ke21lLmFza0lkfWAsIGZ1bmN0aW9uIGFza0xpc3RlbmVyKGUpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGl0LlxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGBibG9ja0xpa2UuYXNrLiR7bWUuaWR9LiR7bWUuYXNrSWR9YCwgYXNrTGlzdGVuZXIpO1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSB3YWl0ZWQgbWV0aG9kIGxpc3RlbmVyLiByZWxlYXNlIGl0LlxuICAgICAgICBtZS5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgICAvLyBzZXQgdGhlIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB0byB0aGUgY2FwdHVyZWQgdmFsdWUuXG4gICAgICAgIHRoZVZhciA/IG1lLl9zZXRUb1Zhcih0aGVWYXIsIGUuZGV0YWlsLnZhbHVlKSA6IG51bGw7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgVUkuXG4gICAgICAgIG1lLnRleHR1aSA/IG1lLnRleHR1aSA9IG1lLnRleHR1aS5kZWxldGUobWUpIDogbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBQZW4gKiAqL1xuXG4gIC8qKlxuICAqIHBlbkNsZWFyIC0gQ2xlYXJzIHRoZSBkcmF3aW5nIHN1cmZhY2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuQ2xlYXIoKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBwZW5DbGVhcigpIHtcbiAgICB0aGlzLnN1cmZhY2UuY2xlYXIodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBwZW5Eb3duIC0gXCJBY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqIFdoZW4gYWN0aXZhdGVkIHNwcml0ZSBtb3Rpb24gd2lsbCBjcmVhdGUgdGhlIGRyYXdpbmcgb24gdGhlIHN0YWdlJ3MgY2FudmFzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlbkRvd24oKSB7XG4gICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnByZXZYID0gdGhpcy54O1xuICAgIHRoaXMucHJldlkgPSB0aGlzLnk7XG4gICAgdGhpcy5zdXJmYWNlLmRyYXcodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBwZW5VcCAtIFwiRGVhY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqICAgdGhpcy5wZW5VcCgpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlblVwKCkge1xuICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0UGVuQ29sb3IgLSBTZXRzIHRoZSBjb2xvciBvZiB0aGUgcGVuLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRQZW5Db2xvcignI2ZmMDAwMCcpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5zZXRQZW5Db2xvcigncmVkJylcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclN0cmluZyAtIGEgdmFsaWQgY29sb3IgZGVmaW5pdGlvbiBmb3IgY2FudmFzIHN0cm9rZVN0eWxlLlxuICAqL1xuICBzZXRQZW5Db2xvcihjb2xvclN0cmluZykge1xuICAgIHRoaXMucGVuQ29sb3IgPSBjb2xvclN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAqIHNldFBlblNpemUgLSBTZXRzIHRoZSBzaXplIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFBlblNpemUoMTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIGEgbnVtYmVyIGZvciBjYW52YXMgbGluZVdpZHRoLlxuICAqL1xuICBzZXRQZW5TaXplKHBpeGVscykge1xuICAgIHRoaXMucGVuU2l6ZSA9IHBpeGVscztcbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVBlblNpemUgLSBDaGFuZ2VzIHRoZSBzaXplIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlUGVuU2l6ZSgxMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gY2hhbmdlIC0gdGhlIGNoYW5nZSBpbiBwaXhlbHMuXG4gICovXG4gIGNoYW5nZVBlblNpemUoY2hhbmdlKSB7XG4gICAgdGhpcy5wZW5TaXplICs9IGNoYW5nZTtcbiAgfVxuXG4gIC8qIFNlbnNpbmcgKi9cblxuICAvKipcbiAgKiBkaXN0YW5jZVRvIC0gUmV0dXJucyB0aGUgZGlzdGFuY2UgdG8gYSBwb2ludCBvbiB0aGUgc2NyZWVuLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKHtzZW5zaW5nOiB0cnVlfSk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICBzcHJpdGUuc2F5KHRoaXMuZGlzdGFuY2VUbyh0aGlzLm1vdXNlWCwgdGhpcy5tb3VzZVkpKVxuICAqIH0pO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2Uub3RoZXJTcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICBzcHJpdGUuc2F5KHRoaXMuZGlzdGFuY2VUbyhvdGhlclNwcml0ZS54LCBvdGhlclNwcml0ZS55KSlcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICogQHJldHVybiB7bnVtYmVyfSAtIGRpc3RhbmNlIGluIHBpeGVscyB0byBwb3NpdGlvbiBvbiBzY3JlZW4gKG5vdCByb3VuZGVkKS5cbiAgKi9cbiAgZGlzdGFuY2VUbyh4LCB5KSB7XG4gICAgY29uc3QgZHggPSB0aGlzLnggLSB4O1xuICAgIGNvbnN0IGR5ID0gdGhpcy55IC0geTtcblxuICAgIHJldHVybiBNYXRoLnNxcnQoKGR4ICogZHgpICsgKGR5ICogZHkpKTtcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlIG9mIHRoZSBzdGFnZSBhbmQgcmV0dXJucyB0aGUgZWRnZSB0b3VjaGVkLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZ0VkZ2UoKSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHN0YWdlIHRoYXQgaXMgdG91Y2hlZCAobnVsbCwgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0KVxuICAqL1xuICB0b3VjaGluZ0VkZ2UoKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoKHRoaXMueCkgKyAodGhpcy53aWR0aCAvIDIpID4gdGhpcy5zdGFnZVdpZHRoIC8gMikge1xuICAgICAgcmVzdWx0ID0gJ3JpZ2h0JztcbiAgICB9XG4gICAgaWYgKCh0aGlzLngpIC0gKHRoaXMud2lkdGggLyAyKSA8IC0xICogKHRoaXMuc3RhZ2VXaWR0aCAvIDIpKSB7XG4gICAgICByZXN1bHQgPSAnbGVmdCc7XG4gICAgfVxuICAgIGlmICgodGhpcy55KSArICh0aGlzLmhlaWdodCAvIDIpID4gdGhpcy5zdGFnZUhlaWdodCAvIDIpIHtcbiAgICAgIHJlc3VsdCA9ICd0b3AnO1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgLSAodGhpcy5oZWlnaHQgLyAyKSA8IC0xICogKHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSkge1xuICAgICAgcmVzdWx0ID0gJ2JvdHRvbSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAqIGlzVG91Y2hpbmdFZGdlIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgdGhlIGVkZ2UuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gdGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKHRoaXMueCA8IHN0YWdlLndpZHRoIC8gMikge1xuICAqICAgIHRoaXMubW92ZSgxMClcbiAgKiAgICB0aGlzLnNheSh0aGlzLmlzVG91Y2hpbmdFZGdlKCkpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7Ym9vbGVhbn0gLSBpcyB0aGUgc3ByaXRlIHRvdWNoaW5nIHRoZSBlZGdlLlxuICAqL1xuICBpc1RvdWNoaW5nRWRnZSgpIHtcbiAgICByZXR1cm4gISF0aGlzLnRvdWNoaW5nRWRnZSgpO1xuICB9XG5cbiAgLyoqXG4gICogdG91Y2hpbmcgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyBhbm90aGVyIGFuZCByZXR1cm5zIGF0IHdoYXQgc2lkZSBpdCB0b3VjaGVzLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gdGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqIDIuIGlmIHRoZSBzcHJpdGUgaGFzIGdvbmUgXCJpbnRvXCIgdGhlIG90aGVyIHRoZSBzaWRlIFwicGVuZXRyYXRlZCBtb3JlXCIgd2lsbCBiZSByZXR1cm5lZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBvdGhlclNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5tb3ZlKDIwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUoIXRoaXMudG91Y2hpbmcob3RoZXJTcHJpdGUpKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKTtcbiAgKiAgICB0aGlzLnNheSh0aGlzLnRvdWNoaW5nKG90aGVyU3ByaXRlKSlcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGNoZWNrIGlmIHRvdWNoaW5nLlxuICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgc2lkZSBvZiB0aGUgc3ByaXRlIHRoYXQgaXMgdG91Y2hlZCAobnVsbCwgdG9wLCBib3R0b20sIGxlZnQsIHJpZ2h0KVxuICAqL1xuICB0b3VjaGluZyhzcHJpdGUpIHtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgIGlmIChcbiAgICAgIHRoaXMueCArICh0aGlzLndpZHRoIC8gMikgPiBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKVxuICAgICAgJiYgdGhpcy54IC0gKHRoaXMud2lkdGggLyAyKSA8IHNwcml0ZS54ICsgKHNwcml0ZS53aWR0aCAvIDIpXG4gICAgICAmJiB0aGlzLnkgKyAodGhpcy5oZWlnaHQgLyAyKSA+IHNwcml0ZS55IC0gKHNwcml0ZS5oZWlnaHQgLyAyKVxuICAgICAgJiYgdGhpcy55IC0gKHRoaXMuaGVpZ2h0IC8gMikgPCBzcHJpdGUueSArIChzcHJpdGUuaGVpZ2h0IC8gMilcbiAgICApIHtcbiAgICAgIHRoaXMueCA+PSBzcHJpdGUueCA/IHJlc3VsdCA9ICdsZWZ0JyA6IG51bGw7XG4gICAgICB0aGlzLnggPCBzcHJpdGUueCA/IHJlc3VsdCA9ICdyaWdodCcgOiBudWxsO1xuICAgICAgdGhpcy55ID4gc3ByaXRlLnkgJiYgTWF0aC5hYnModGhpcy55IC0gc3ByaXRlLnkpID4gTWF0aC5hYnModGhpcy54IC0gc3ByaXRlLngpID8gcmVzdWx0ID0gJ2JvdHRvbScgOiBudWxsO1xuICAgICAgdGhpcy55IDwgc3ByaXRlLnkgJiYgTWF0aC5hYnModGhpcy55IC0gc3ByaXRlLnkpID4gTWF0aC5hYnModGhpcy54IC0gc3ByaXRlLngpID8gcmVzdWx0ID0gJ3RvcCcgOiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgYW5vdGhlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBvdGhlclNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5tb3ZlKDIwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUoIXRoaXMuaXNUb3VjaGluZyhvdGhlclNwcml0ZSkpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gY2hlY2sgaWYgdG91Y2hpbmcuXG4gICogQHJldHVybiB7Ym9vbGVhbn0gLSBpcyB0aGUgc3ByaXRlIHRvdWNoaW5nIHRoZSBzcGVjaWZpZWQgc3ByaXRlLlxuICAqL1xuICBpc1RvdWNoaW5nKHNwcml0ZSkge1xuICAgIHJldHVybiAhIXRoaXMudG91Y2hpbmcoc3ByaXRlKTtcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nQmFja2Ryb3BDb2xvciAtIFJldHVybnMgdGhlIGhleCB2YWx1ZSB0byBhbGwgcGl4ZWxzIGluIGJhY2tkcm9wIGFyZWEgY292ZXJlZCBieSB0aGUgc3ByaXRlIHJlY3RhbmdsZS5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiBUaGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICogMy4gVGhlIGJhY2tkcm9wIGltYWdlIG11c3QgYmUgYSBsb2NhbCBpbWFnZSBzZXJ2ZWQgZnJvbSBzYW1lIG9yaWdpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgd2hpbGUodHJ1ZSl7XG4gICogICAgIGxldCB0b3VjaGVkQ29sb3JzID0gdGhpcy50b3VjaGluZ0JhY2tkcm9wQ29sb3IoKTtcbiAgKiAgICAgdGhpcy5zYXkodG91Y2hlZENvbG9ycyk7XG4gICogICAgIHRoaXMubW92ZSg1KTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge2FycmF5fSAtIGNvbG9ycyAoc3RyaW5ncykgdG91Y2hlZC5cbiAgKi9cbiAgdG91Y2hpbmdCYWNrZHJvcENvbG9yKCkge1xuICAgIGNvbnN0IHJlc3VsdCA9IFtdO1xuXG4gICAgLyoqXG4gICAgKiByZ2JUb0hleCAtIGNvbnZlcnRzIGEgY29sb3IgZGVmaW5lZCBieSBSR0IgdmFsdWVzIGludG8gYSBvbiBkZWZpbmVkIGFzIGEgaGV4IHN0cmluZy5cbiAgICAqXG4gICAgKiBGcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NjIzODM4L3JnYi10by1oZXgtYW5kLWhleC10by1yZ2JcbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gciAtIHRoZSByZWQgdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBnIC0gdGhlIGdyZWVuIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gYiAtICB0aGUgYmx1ZSB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHJldHVybiB7c3RyaW5nfSAtIGhleCBjb2xvciBzdHJpbmcuXG4gICAgKi9cbiAgICBmdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgICByZXR1cm4gYCMkeygoMSA8PCAyNCkgKyAociA8PCAxNikgKyAoZyA8PCA4KSArIGIpLnRvU3RyaW5nKDE2KS5zbGljZSgxKX1gOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWJpdHdpc2VcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgYmFja2Ryb3BDb250ZXh0ID0gdGhpcy5hZ2FpbnN0QmFja2Ryb3AuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBiYWNrZHJvcENvbnRleHQuZ2V0SW1hZ2VEYXRhKCgodGhpcy5zdGFnZVdpZHRoIC8gMikgLSAodGhpcy53aWR0aCAvIDIpKSArIHRoaXMueCwgKCh0aGlzLnN0YWdlSGVpZ2h0IC8gMikgLSAodGhpcy5oZWlnaHQgLyAyKSkgLSB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KS5kYXRhO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpICs9IDQpIHtcbiAgICAgICAgZGF0YVtpICsgM10gIT09IDAgPyByZXN1bHQucHVzaChyZ2JUb0hleChkYXRhW2ldLCBkYXRhW2kgKyAxXSwgZGF0YVtpICsgMl0pKSA6IG51bGw7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5sb2coJ0Jsb2NrTGlrZS5qcyBOb3RpY2U6IGlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKCkgaW5nbm9yZWQuIEJhY2tkcm9wIGltYWdlIGNhbiBub3QgYmUgbG9jYXRlZCBhdCBhIHJlbW90ZSBvcmlnaW4uJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuICAgIH1cblxuICAgIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQocmVzdWx0KSk7XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvciAtIGNvbXBhcmVzIGEgZ2l2ZW4gaGV4IHZhbHVlIHRvIGFsbCBwaXhlbHMgaW4gYmFja2Ryb3AgYXJlYSBjb3ZlcmVkIGJ5IHRoZSBzcHJpdGUgcmVjdGFuZ2xlLlxuICAqIElmIGEgbWF0Y2ggaXMgZm91bmQgdGhlIGNvbG9yIGlzIHJldHVybmVkLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIFRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAzLiBUaGUgYmFja2Ryb3AgaW1hZ2UgbXVzdCBiZSBhIGxvY2FsIGltYWdlIHNlcnZlZCBmcm9tIHNhbWUgb3JpZ2luLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIGxldCBtb3ZpbmcgPSB0cnVlO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB3aGlsZShtb3Zpbmcpe1xuICAqICAgICB0aGlzLmlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKCcjZmYwMDAwJykgPyBtb3ZpbmcgPSBmYWxzZSA6IG1vdmluZyA9IHRydWU7XG4gICogICAgIHRoaXMubW92ZSg1KTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBiYWNrZHJvcENvbG9yIC0gdGhlIGNvbG9yIHRvIGV2YWx1YXRlLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gZG9lcyB0aGUgc3ByaXRlIHRvdWNoIHRoZSBjb2xvci5cbiAgKi9cbiAgaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IoYmFja2Ryb3BDb2xvcikge1xuICAgIGNvbnN0IGhleEFyciA9IHRoaXMudG91Y2hpbmdCYWNrZHJvcENvbG9yKGJhY2tkcm9wQ29sb3IpO1xuXG4gICAgcmV0dXJuIGhleEFyci5pbmNsdWRlcyhiYWNrZHJvcENvbG9yKTtcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgY3NzIGZyb20gJy4vZWxlbWVudC1jc3MnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgVUkgRWxlbWVudCBvZiB0aGUgc3RhZ2UuXG4gKiBFYWNoIFN0YWdlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUVsZW1lbnQge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZSBFbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB0aGUgc3RhZ2UgZm9yIHdoaWNoIHRoZSBlbGVtZW50IGlzIGNyZWF0ZWQuXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIGNyZWF0ZWQuXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8qKlxuICAgICogY3JlYXRlRGl2IC0gY3JlYXRlcyBhIGRpdiBhdCBzcGVjaWZpZWQgekluZGV4LlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB6SW5kZXggLSBkZXNpcmVkIHBsYWNlIGluIFwic3RhY2tcIlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50LlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRGl2KHpJbmRleCkge1xuICAgICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIHNlbC5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgICAgc2VsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcbiAgICAgIHNlbC5zdHlsZS56SW5kZXggPSB6SW5kZXg7XG4gICAgICBzZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2VsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ21hbmlwdWxhdGlvbic7XG5cbiAgICAgIHJldHVybiBzZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBjcmVhdGVDYW52YXMgLSBjcmVhdGVzIGEgY2FudmFzIGF0IHNwZWNpZmllZCB6SW5kZXguXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHpJbmRleCAtIGRlc2lyZWQgcGxhY2UgaW4gXCJzdGFja1wiXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gYSBzdGFnZSB3aWRlL2hpZ2ggRE9NIGVsZW1lbnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDYW52YXMoekluZGV4KSB7XG4gICAgICBjb25zdCBjZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgY2VsLndpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICAgIGNlbC5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICAgIGNlbC5zdHlsZS56SW5kZXggPSB6SW5kZXg7XG4gICAgICBjZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgY2VsLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgIGNlbC5zdHlsZS50b3AgPSAnMHB4JztcblxuICAgICAgcmV0dXJuIGNlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZUZsYWcgLSBjcmVhdGVzIGEgXCJmbGFnXCIgZGl2LlxuICAgICpcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudCB3aXRoIGZsYWcgYXQgY2VudGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUZsYWcoKSB7XG4gICAgICBjb25zdCBmbGFnU2l6ZSA9IDEzMDtcbiAgICAgIGNvbnN0IGZlbCA9IGNyZWF0ZURpdigtMSk7XG5cbiAgICAgIGNvbnN0IGZlbGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgICAgY29uc3QgeCA9IC0oZmxhZ1NpemUgLyAyKTtcbiAgICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICAgIGNvbnN0IHkgPSAtKGZsYWdTaXplIC8gMik7XG5cbiAgICAgIC8vIGxvb2tzXG4gICAgICBmZWxpdGVtLnN0eWxlLndpZHRoID0gYCR7ZmxhZ1NpemV9cHhgO1xuICAgICAgZmVsaXRlbS5zdHlsZS5oZWlnaHQgPSBgJHtmbGFnU2l6ZX1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGZlbGl0ZW0uaW5uZXJIVE1MID0gJyYjOTg3MzsnO1xuXG4gICAgICBmZWxpdGVtLnN0eWxlLmxlZnQgPSBgJHsob3B0aW9ucy53aWR0aCAvIDIpICsgeH1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLnRvcCA9IGAkeyhvcHRpb25zLmhlaWdodCAvIDIpICsgeX1weGA7XG4gICAgICBmZWxpdGVtLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtZmxhZyc7XG5cbiAgICAgIGZlbC5hcHBlbmRDaGlsZChmZWxpdGVtKTtcbiAgICAgIGZlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICByZXR1cm4gZmVsO1xuICAgIH1cblxuICAgIGVsLmlkID0gYCR7c3RhZ2UuaWR9YDtcblxuICAgIGVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuXG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgb3B0aW9ucy5wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lciA9IGNyZWF0ZUNhbnZhcygwKTtcbiAgICB0aGlzLmJhY2tkcm9wQ29udGFpbmVyLmlkID0gYCR7c3RhZ2UuaWR9LWJhY2tkcm9wYDtcbiAgICB0aGlzLmJhY2tkcm9wQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtYmFja2Ryb3AnO1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BDb250YWluZXIpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXMoMCk7XG4gICAgdGhpcy5jYW52YXMuaWQgPSBgJHtzdGFnZS5pZH0tc3VyZmFjZWA7XG4gICAgdGhpcy5jYW52YXMuY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1wYW5lbC1zdXJmYWNlJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICB0aGlzLmZsYWcgPSBjcmVhdGVGbGFnKCk7XG4gICAgdGhpcy5mbGFnLmlkID0gYCR7c3RhZ2UuaWR9LWZsYWdgO1xuICAgIHRoaXMuZmxhZy5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWZsYWcnO1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuZmxhZyk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdG8gdXBkYXRlLlxuICAqL1xuICB1cGRhdGUoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZWw7XG4gICAgY29uc3QgYmFja2Ryb3BDb250ZXh0ID0gc3RhZ2UuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lci5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgbGV0IG1hcmdpblRCID0gMDtcbiAgICBpZiAoc3RhZ2UuZWxlbWVudC5lbC5wYXJlbnRFbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJykge1xuICAgICAgbWFyZ2luVEIgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSBzdGFnZS5oZWlnaHQpIC8gMik7XG4gICAgICBtYXJnaW5UQiA8IDAgPyBtYXJnaW5UQiA9IDAgOiBudWxsO1xuICAgIH1cblxuICAgIC8vIElmIGNvbG9yIC0gZmlsbCB0aGUgY2FudmFzIHdpdGggdGhlIGNvbG9yIHNldCwgb3IgY2xlYXIgaXRcbiAgICBpZiAoc3RhZ2UuYmFja2Ryb3AgJiYgc3RhZ2UuYmFja2Ryb3AuY29sb3IpIHtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5yZWN0KDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpO1xuICAgICAgYmFja2Ryb3BDb250ZXh0LmZpbGxTdHlsZSA9IHN0YWdlLmJhY2tkcm9wLmNvbG9yO1xuICAgICAgYmFja2Ryb3BDb250ZXh0LmZpbGwoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYmFja2Ryb3BDb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICAvLyBJZiBpbWFnZSAtIGRyYXcgdGhlIGltYWdlIG9uIGNhbnZhc1xuICAgIGlmIChzdGFnZS5iYWNrZHJvcCAmJiBzdGFnZS5iYWNrZHJvcC5pbWFnZSkge1xuICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBiYWNrZHJvcENvbnRleHQuZHJhd0ltYWdlKGltZywgMCwgMCwgc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCk7XG4gICAgICB9O1xuICAgICAgaW1nLnNyYyA9IHN0YWdlLmJhY2tkcm9wLmltYWdlO1xuICAgIH1cblxuICAgIC8vIHpvb20gYW5kIHBsYWNlbWVudFxuICAgIGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZSgke3N0YWdlLm1hZ25pZmljYXRpb24gLyAxMDB9KWA7XG4gICAgZWwuc3R5bGUubWFyZ2luID0gYCR7bWFyZ2luVEJ9cHggYXV0b2A7XG5cbiAgICAvLyBjc3MgcnVsZXNcbiAgICBjc3MuYXBwbHkoc3RhZ2UpO1xuXG4gICAgLy8gY3NzIGNsYXNzZXNcbiAgICBzdGFnZS5iYWNrZHJvcCA/IGVsLmNsYXNzTmFtZSA9IHN0YWdlLmJhY2tkcm9wLmNsYXNzZXMuY29uY2F0KHN0YWdlLmNsYXNzZXMpLmpvaW4oJyAnKSA6IGVsLmNsYXNzTmFtZSA9IHN0YWdlLmNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnRcbiAgKi9cbiAgZGVsZXRlKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdClcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IDEwMDA7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgYXQgdGhlIGJhY2sgKGhpZGVzIGl0KVxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRoYXQgXCJyZXF1ZXN0ZWRcIiB0aGUgZmxhZy5cbiAgKi9cbiAgcmVtb3ZlRmxhZyhzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIiwiLyoqXG4qIEVuY2Fwc3VsYXRlcyB0aGUgc3RhZ2Ugc2Vuc2luZyBmdW5jdGlvbmFsaXR5LlxuKi9cblxuLyoqXG4qIGVuYWJsZSAtIEVuYWJsZXMgc2Vuc2luZyBvZiBkb2N1bWVudCBsZXZlbCBldmVudHMgKGtleWRvd24sIG1vdXNlbW92ZSwgbW91c2Vkb3duLCB0b3VjaG1vdmUpXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZW5hYmxlKHN0YWdlKSB7XG4gIGNvbnN0IG1lID0gc3RhZ2U7XG4gIG1lLnNlbnNpbmcgPSB0cnVlO1xuXG4gIC8qKlxuICAqIGRlY2ltYWxSb3VuZCAtIHJvdW5kcyBhIG51bWJlciB0b28gZGVjaW1hbCBwb2ludHMuXG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gcm91bmQuXG4gICogQHBhcmFtIHtudW1iZXJ9IHBvaW50cyAtIGhvdyBtYW55IGRlY2ltYWwgcG9pbnRzIHRvIGxlYXZlLlxuICAqL1xuICBmdW5jdGlvbiBkZWNpbWFsUm91bmQodmFsdWUsIHBvaW50cykge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogKDEwICoqIHBvaW50cykpIC8gKDEwICoqIHBvaW50cyk7XG4gIH1cblxuICAvKipcbiAgKiBjb21wdXRlWCAtIENvbXB1dGVzIGNlbnRlcmVkIHggYmFzZWQgb24geCBleHRyYWN0ZWQgZnJvbSBldmVudC5cbiAgKi9cbiAgZnVuY3Rpb24gY29tcHV0ZVgoeCkge1xuICAgIGNvbnN0IG1hZyA9IG1lLm1hZ25pZmljYXRpb24gLyAxMDA7XG4gICAgcmV0dXJuIGRlY2ltYWxSb3VuZCgoeCAtIChtZS5lbGVtZW50LmVsLm9mZnNldExlZnQpIC0gKG1lLndpZHRoIC8gMikpIC8gbWFnLCAyKTtcbiAgfVxuXG4gIC8qKlxuICAqIGNvbXB1dGVZIC0gQ29tcHV0ZXMgY2VudGVyZWQgeSBiYXNlZCBvbiB5IGV4dHJhY3RlZCBmcm9tIGV2ZW50LlxuICAqL1xuICBmdW5jdGlvbiBjb21wdXRlWSh5KSB7XG4gICAgY29uc3QgbWFnID0gbWUubWFnbmlmaWNhdGlvbiAvIDEwMDtcbiAgICByZXR1cm4gZGVjaW1hbFJvdW5kKCgteSArIG1lLmVsZW1lbnQuZWwub2Zmc2V0VG9wICsgKG1lLmhlaWdodCAvIDIpKSAvIG1hZywgMik7XG4gIH1cblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICBlLmtleSAmJiBtZS5rZXlzS2V5LmluZGV4T2YoZS5rZXkudG9Mb3dlckNhc2UoKSkgPT09IC0xID8gbWUua2V5c0tleS5wdXNoKGUua2V5LnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBlLmNvZGUgJiYgbWUua2V5c0NvZGUuaW5kZXhPZihlLmNvZGUudG9Mb3dlckNhc2UoKSkgPT09IC0xID8gbWUua2V5c0NvZGUucHVzaChlLmNvZGUudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgIG1lLmtleXNLZXlDb2RlLmluZGV4T2YoZS5rZXlDb2RlKSA9PT0gLTEgPyBtZS5rZXlzS2V5Q29kZS5wdXNoKGUua2V5Q29kZSkgOiBudWxsO1xuICB9KTtcblxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgZS5rZXkgPyBtZS5rZXlzS2V5ID0gbWUua2V5c0tleS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGUua2V5LnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBlLmNvZGUgPyBtZS5rZXlzQ29kZSA9IG1lLmtleXNDb2RlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZS5jb2RlLnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBtZS5rZXlzS2V5Q29kZSA9IG1lLmtleXNLZXlDb2RlLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gZS5rZXlDb2RlKTtcbiAgfSk7XG5cbiAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgIG1lLm1vdXNlWCA9IGNvbXB1dGVYKGUuY2xpZW50WCk7XG4gICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS5jbGllbnRZKTtcbiAgfSk7XG5cbiAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCAoZSkgPT4ge1xuICAgIG1lLm1vdXNlWCA9IGNvbXB1dGVYKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCk7XG4gICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKTtcbiAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgIG1lLm1vdXNlRG93biA9IHRydWU7XG4gIH0pO1xuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgbWUubW91c2VEb3duID0gZmFsc2U7XG4gIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIChlKSA9PiB7XG4gICAgbWUubW91c2VYID0gY29tcHV0ZVgoZS50b3VjaGVzWzBdLmNsaWVudFgpO1xuICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUudG91Y2hlc1swXS5jbGllbnRZKTtcbiAgICBtZS5tb3VzZURvd24gPSB0cnVlO1xuICB9LCB7IHBhc3NpdmU6IHRydWUgfSk7XG5cbiAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcbiAgICBtZS5tb3VzZURvd24gPSBmYWxzZTtcbiAgICBtZS5tb3VzZVggPSBudWxsO1xuICAgIG1lLm1vdXNlWSA9IG51bGw7XG4gIH0pO1xufVxuIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIHN0YWdlIHN1cmZhY2Ugb24gd2hpY2ggc3ByaXRlcyBkcmF3LlxuICogRWFjaCBTdGFnZSBoYXMgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VTdXJmYWNlIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2Ugb24gd2hpY2ggdGhlIHNwcml0ZSBpcyBkcmF3aW5nLlxuICAqL1xuICBjb25zdHJ1Y3RvcihzdGFnZSkge1xuICAgIHRoaXMuY29udGV4dCA9IHN0YWdlLmVsZW1lbnQuY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAqIGRyYXcgLSBkcmF3cyBhIGxpbmUgXCJiZWhpbmRcIiBhIG1vdmluZyBzcHJpdGUuXG4gICogTm90ZTogc3ByaXRlIGFsd2F5cyBoYXMgY3VycmVudCBhbmQgcHJldmlvdXMgeCx5IHZhbHVlcyB0byBhbGxvdyBkcmF3aW5nIHRvIHByZXZpb3VzIGxvY2F0aW9uLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgZHJhd2luZyB0aGUgbGluZS5cbiAgKi9cbiAgZHJhdyhzcHJpdGUpIHtcbiAgICBpZiAoc3ByaXRlLmRyYXdpbmcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oKHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyBzcHJpdGUueCwgKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgKHNwcml0ZS55ICogLTEpKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oKHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyBzcHJpdGUucHJldlgsIChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIChzcHJpdGUucHJldlkgKiAtMSkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHNwcml0ZS5wZW5TaXplO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gc3ByaXRlLnBlbkNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGNsZWFyIC0gY2xlYXJzIHRoZSBjYW52YXNcbiAgKi9cbiAgY2xlYXIoc3ByaXRlKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBzcHJpdGUuc3RhZ2VXaWR0aCwgc3ByaXRlLnN0YWdlSGVpZ2h0KTtcbiAgfVxufVxuIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmltcG9ydCBTdGFnZUVsZW1lbnQgZnJvbSAnLi9zdGFnZS1lbGVtZW50JztcbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJztcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnO1xuXG5pbXBvcnQgc2Vuc2luZyBmcm9tICcuL3N0YWdlLXNlbnNpbmcnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7XG4gKiAgIHdpZHRoOiA2MDAsXG4gKiAgIGhlaWdodDogNDAwLFxuICogICBwYWNlOiAxNixcbiAqICAgc2Vuc2luZzogdHJ1ZSxcbiAqICAgcGFyZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2Utd3JhcCcpLFxuICogICBiYWNrZHJvcDogbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7Y29sb3I6ICcjRkZCNkMxJ30pXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFN0YWdlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHN0YWdlIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBUaGUgc3RhZ2UgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuICBXaWxsIGRpc2FibGUgcGFjaW5nIHdoZW4gc2V0IHRvIHplcm8uXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyZW50IC0gVGhlIERPTSBlbGVtZW50IGludG8gd2hpY2ggdGhlIHN0YWdlIHdpbGwgYmUgaW5zZXJ0ZWQuIERlZmF1bHQgaXMgdGhlIGJvZHkuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuYmFja2Ryb3AgLSBBIGRlZmF1bHQgQmFja2Ryb3AuXG4gICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNlbnNpbmcgLSBFbmFibGVzIHNlbnNpbmcgb2YgbW91c2UgbG9jYXRpb24gYW5kIHdoYXQga2V5cyBwcmVzc2VkLlxuICAqIElmIHRydWUsIHdpbGwgY29uc3RhbnRseSB1cGRhdGUgc3RhZ2UgcHJvcGVydGllczogbW91c2VYLCBtb3VzZVksIGtleXNLZXlDb2RlLCBrZXlzS2V5Q29kZSBhbmQga2V5c0NvZGUgYmFzZWQgb24gdXNlciBpbnB1dC5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHBhcmVudDogZG9jdW1lbnQuYm9keSxcbiAgICAgIHBhY2U6IDMzLFxuICAgICAgYmFja2Ryb3A6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBhY3R1YWwgPSB7IC4uLmRlZmF1bHRzLCAuLi5vcHRpb25zIH07XG5cbiAgICBzdXBlcihhY3R1YWwucGFjZSk7XG5cbiAgICAvLyBiYWNrZHJvcHNcbiAgICB0aGlzLmJhY2tkcm9wcyA9IFtdO1xuXG4gICAgaWYgKGFjdHVhbC5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IGFjdHVhbC5iYWNrZHJvcDtcbiAgICAgIHRoaXMuYmFja2Ryb3BzLnB1c2godGhpcy5iYWNrZHJvcCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IFN0YWdlRWxlbWVudChhY3R1YWwsIHRoaXMpO1xuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuXG4gICAgdGhpcy5rZXlzQ29kZSA9IFtdO1xuICAgIHRoaXMua2V5c0tleSA9IFtdO1xuICAgIHRoaXMua2V5c0tleUNvZGUgPSBbXTtcblxuICAgIHRoaXMuc3ByaXRlcyA9IFtdO1xuXG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gMTAwO1xuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdO1xuICAgIHRoaXMuY2xhc3NlcyA9IFtdO1xuXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xuICAgIHRoaXMubW91c2VYID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlWSA9IG51bGw7XG5cbiAgICBhY3R1YWwuc2Vuc2luZyA/IHNlbnNpbmcodGhpcykgOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIERlbGV0ZXMgdGhlIHN0YWdlIGVsZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLmRlbGV0ZSgpO1xuICAqL1xuICBkZWxldGUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRTcHJpdGUgLSBBZGRzIGEgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGFkZC5cbiAgKi9cbiAgYWRkU3ByaXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcblxuICAgIGN1clNwcml0ZS5lbGVtZW50ID0gbmV3IFNwcml0ZUVsZW1lbnQoc3ByaXRlLCB0aGlzKTtcbiAgICBjdXJTcHJpdGUuc3VyZmFjZSA9IG5ldyBTdGFnZVN1cmZhY2UodGhpcyk7XG5cbiAgICBjdXJTcHJpdGUuZWxlbWVudC5mbGFnID0gdGhpcy5lbGVtZW50LmZsYWc7XG4gICAgY3VyU3ByaXRlLmFnYWluc3RCYWNrZHJvcCA9IHRoaXMuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lcjtcblxuICAgIGN1clNwcml0ZS5zdGFnZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBjdXJTcHJpdGUuc3RhZ2VIZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuc3ByaXRlcy5wdXNoKGN1clNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLnogPSB0aGlzLnNwcml0ZXMubGVuZ3RoO1xuXG4gICAgc3ByaXRlLmVsZW1lbnQudXBkYXRlKGN1clNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVTcHJpdGUgLSBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLnJlbW92ZVNwcml0ZShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gYWRkLlxuICAqL1xuICByZW1vdmVTcHJpdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuICAgIHRoaXMuc3ByaXRlcyA9IHRoaXMuc3ByaXRlcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IHNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLmVsZW1lbnQgPyBjdXJTcHJpdGUuZWxlbWVudCA9IGN1clNwcml0ZS5lbGVtZW50LmRlbGV0ZShjdXJTcHJpdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBsb29rcyAqICovXG5cbiAgLyoqXG4gICogYWRkQmFja2Ryb3AgLSBBZGRzIGEgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gYWRkLlxuICAqL1xuICBhZGRCYWNrZHJvcChiYWNrZHJvcCkge1xuICAgIHRoaXMuYmFja2Ryb3BzLnB1c2goYmFja2Ryb3ApO1xuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlXG4gICAgIXRoaXMuYmFja2Ryb3AgPyB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbMF0gOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQmFja2Ryb3BUbyAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBiYWNrZHJvcC4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApO1xuICAgIGN1cnJlbnRCYWNrZHJvcEluZGV4ICE9PSAtMSA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1tjdXJyZW50QmFja2Ryb3BJbmRleF0gOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUb051bShpbmRleCkge1xuICAgIHRoaXMuc3dpdGNoQmFja2Ryb3BUbyh0aGlzLmJhY2tkcm9wc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogbmV4dEJhY2tkcm9wIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UubmV4dEJhY2tkcm9wKCk7XG4gICovXG4gIG5leHRCYWNrZHJvcCgpIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YodGhpcy5iYWNrZHJvcCk7XG4gICAgdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXTtcblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQmFja2Ryb3AgLSBSZW1vdmVzIGEgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UucmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApIHtcbiAgICBpZiAodGhpcy5iYWNrZHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKGJhY2tkcm9wKTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPT09IGJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXSA6IG51bGw7XG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IHRoaXMuYmFja2Ryb3BzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gYmFja2Ryb3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IFtdO1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQmFja2Ryb3BOdW0gLSBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYmFja2Ryb3AgYnkgbnVtYmVyIG9mIGN1cnJlbnQgKDAgaXMgZmlyc3QpLlxuICAqIElmIHRoZXJlIGlzIG9ubHkgb25lIGJhY2tkcm9wLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UucmVtb3ZlQmFja2Ryb3BOdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVCYWNrZHJvcE51bShpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AodGhpcy5iYWNrZHJvcHNbaW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlZnJlc2ggLSBGb3JjZXMgYSBzcHJpdGUgcmVmcmVzaC5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZCB0byBiZSB1c2VkIGlmIGNvc3R1bWUgd2FzIG1hbmlwdWxhdGVkIGRpcmVjdGx5LlxuICAqL1xuICByZWZyZXNoKCkge1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogem9vbSAtIHpvb21zIHRoZSBzdGFnZSB0byB0aGUgc3BlY2lmaWVkIHBlcmNlbnRhZ2UgbnVtYmVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICpcbiAgKiBzdGFnZS56b29tKDE1MCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudCAtIHRoZSBwZXJjZW50YWdlIHRvIHNldC5cbiAgKi9cbiAgem9vbShwZXJjZW50KSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gcGVyY2VudDtcbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqIFNwcml0ZXMgKiAqL1xuXG4gIC8qKlxuICAqIF9yZWZyZXNoU3ByaXRlcyAtIFJlZnJlc2ggdGhlIERPTSBlbGVtZW50IG9mIGFsbCBzcHJpdGVzIGN1cnJlbnRseSBvbiBzdGFnZS5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIF9yZWZyZXNoU3ByaXRlcygpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgdGhpcy5zcHJpdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IGl0ZW07XG4gICAgICBpICs9IDE7XG4gICAgICBzcHJpdGUueiA9IGk7XG4gICAgICBzcHJpdGUuZWxlbWVudCA/IHNwcml0ZS5lbGVtZW50LnVwZGF0ZShzcHJpdGUpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVCYWNrd2FyZHMgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uZSBwbGFjZSBkb3duIHRoZSBcInBpbGVcIi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlQmFja3dhcmRzKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlQmFja3dhcmRzKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXhdID0gdGhpcy5zcHJpdGVzW2luZGV4IC0gMV07IC8vIG1vdmUgb25lIHVwXG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXggLSAxXSA9IHNwcml0ZTsgLy8gbWUgc3ViamVjdCBkb3duXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlRm9yd2FyZCAtIE1vdmVzIHRoZSBzcHJpdGUgb25lIHBsYWNlIHVwIGluIHRoZSBcInBpbGVcIi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlRm9yd2FyZChzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZUZvcndhcmQoc3ByaXRlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNwcml0ZXMuaW5kZXhPZihzcHJpdGUpO1xuICAgIGlmIChpbmRleCA8IHRoaXMuc3ByaXRlcy5sZW5ndGggLSAxICYmIGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCArIDFdOyAvLyBtb3ZlIG9uZSBkb3duXG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXggKyAxXSA9IHNwcml0ZTsgLy8gbWUgc3ViamVjdCB1cFxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZVRvRnJvbnQgLSBCcmluZ3MgdGhlIHNwcml0ZSB0byB0aGUgZnJvbnQgb2YgdGhlIFwicGlsZVwiXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZVRvRnJvbnQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVUb0Zyb250KHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlVG9CYWNrIC0gU2VuZHMgdGhlIHNwcml0ZSB0byB0aGUgYmFjayBvZiB0aGUgXCJwaWxlXCJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIHRoaXMuc3ByaXRlcy51bnNoaWZ0KHNwcml0ZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKiBzZW5zaW5nICovXG5cbiAgLyoqXG4gICogaXNLZXlQcmVzc2VkIC0gQ2hlY2tzIGlmIGEga2V5IGlzIHByZXNzZWQuIFN0YWdlIHNlbnNpbmcgbXVzdCBiZSBlbmFibGVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXkoc3RhZ2UuaXNLZXlQcmVzc2VkKCdhJykpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJLZXkgLSB0aGUga2V5IHByZXNzZWQuIE1heSBiZSB0aGUgY29kZSBvciB0aGUgY2hhcmFjdGVyIGl0c2VsZiAoQSBvciA2NSlcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICBpc0tleVByZXNzZWQodXNlcktleSkge1xuICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuICAgIGxldCBjaGVjaztcblxuICAgIHR5cGVvZiB1c2VyS2V5ID09PSAnc3RyaW5nJyA/IGNoZWNrID0gdXNlcktleS50b0xvd2VyQ2FzZSgpIDogY2hlY2sgPSB1c2VyS2V5O1xuICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAvLyBOb3RlOiB1c2VyIG1heSB3cml0ZSBpbmNvbXBhdGlibGUgY29kZS5cbiAgICB0aGlzLmtleXNLZXkuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICB0aGlzLmtleXNDb2RlLmluZGV4T2YoY2hlY2spICE9PSAtMSA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgdGhpcy5rZXlzS2V5Q29kZS5pbmRleE9mKGNoZWNrKSAhPT0gLTEgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuXG4gICAgIXRoaXMuc2Vuc2luZyA/IGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc0tleVByZXNzZWQoKSBpbmdub3JlZC4gU3RhZ2Ugc2Vuc2luZyBub3QgZW5hYmxlZC4nKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG4iLCIvKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgVUkgRWxlbWVudHMgYXR0YWNoZWQgdG8gYSBzcHJpdGUuXG4gKiBFYWNoIFNwcml0ZSBtYXkgaGF2ZSBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUZXh0VWlFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgdWkgZWxlbWVudCB0aGF0IFwiYXR0YWhjZXNcIiB0byBhIHNwcml0ZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIHdoYXQgdWkgdG8gY3JlYXRlIChzYXkgYnViYmxlLCB0aGluayBidWJibGUgb3IgYXNrIGJveClcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtICB3aGF0IHRoZSB0ZXh0IHNhaWQvdGhvdWdodC9hc2sgd2lsbCBiZS5cbiAgKiBAcGFyYW0ge29iamVjdH0gYXNrSWQgLSB0aGUgYXNrIGJveCBpZGVudGlmaWVyICh1c2VkIHRvIG1hbmFnZSBldmVudHMpLlxuICAqL1xuICBjb25zdHJ1Y3RvcihzcHJpdGUsIHR5cGUsIHRleHQpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8qKlxuICAgICogYXNrSW5wdXQgLSBlbmNhcHN1bGF0ZSB0aGUgZnVuY3Rpb25hbGl0eSBvZiB0aGUgaW5wdXQgZmllbGQgdXNlZCB0byBjYXB0dXJlIHVzZXIgaW5wdXQgd2l0aCBhc2soKS5cbiAgICAqXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gdGhlIGlucHV0IGRvbSBlbGVtZW50LlxuICAgICovXG4gICAgZnVuY3Rpb24gYXNrSW5wdXQoKSB7XG4gICAgICAvKipcbiAgICAgICogc2VuZEFuc3dlciAtIGRpc3BhdGNoZXMgYW4gZXZlbnQgd2hlbiB0aGUgdXNlciBoYXMgc3VibWl0dGVkIHRoZSBpbnB1dC5cbiAgICAgICovXG4gICAgICBmdW5jdGlvbiBzZW5kQW5zd2VyKHZhbHVlKSB7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLmFzay4ke3Nwcml0ZS5pZH0uJHtzcHJpdGUuYXNrSWR9YCwgeyBkZXRhaWw6IHsgdmFsdWUsIGFza0lkOiBzcHJpdGUuYXNrSWQgfSB9KTtcbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAxMykge1xuICAgICAgICAgIHNlbmRBbnN3ZXIoaW5wdXQudmFsdWUpO1xuICAgICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoaW5wdXQpO1xuXG4gICAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgIHN1Ym1pdC5pbm5lckhUTUwgPSAnJiN4MjcxMyc7XG4gICAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgIHNlbmRBbnN3ZXIoaW5wdXQudmFsdWUpO1xuICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgfSk7XG4gICAgICBlbC5hcHBlbmRDaGlsZChzdWJtaXQpO1xuXG4gICAgICByZXR1cm4gaW5wdXQ7XG4gICAgfVxuXG4gICAgdGhpcy50ZXh0ID0gdGV4dC50b1N0cmluZygpO1xuICAgIHRoaXMudHlwZSA9IHR5cGU7XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeCA9IHNwcml0ZS54IC0gKHNwcml0ZS53aWR0aCAvIDIpO1xuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB5ID0gKHNwcml0ZS55ICogLTEpIC0gKHNwcml0ZS5oZWlnaHQgLyAyKTtcblxuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBlbC5pbm5lckhUTUwgPSBgJHt0ZXh0fTxiciAvPmA7XG5cbiAgICAvLyBsb29rc1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBuaWNlci4uLlxuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHsoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHggKyAoc3ByaXRlLndpZHRoICogMC42KX1weGA7XG4gICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gODAgLSAoTWF0aC5mbG9vcih0aGlzLnRleHQubGVuZ3RoIC8gMzApICogMTYpfXB4YDtcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IHNwcml0ZS56O1xuICAgIGVsLmNsYXNzTmFtZSA9IGBibG9ja2xpa2UtJHt0eXBlfWA7XG5cbiAgICBsZXQgaWVsID0gbnVsbDtcbiAgICBpZiAodHlwZSA9PT0gJ2FzaycpIHtcbiAgICAgIGllbCA9IGFza0lucHV0KHNwcml0ZSwgZWwpO1xuICAgICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gMTEwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG4gICAgfVxuXG4gICAgc3ByaXRlLmVsZW1lbnQuZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHNwcml0ZS5lbGVtZW50LmVsKTtcbiAgICBpZWwgPyBpZWwuZm9jdXMoKSA6IG51bGw7XG5cbiAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gYCR7KHNwcml0ZS5zaG93aW5nID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpfWA7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVkIHRoZSBET00gZWxlbWVudCAobW92ZXMgd2l0aCBzcHJpdGUpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gd2hpY2ggdGhlIHVpIGlzIGF0dGFjaGVkLlxuICAqL1xuICB1cGRhdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUudGV4dHVpLmVsO1xuXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICAvLyBsb29rc1xuICAgIC8vIFRPRE86IG1ha2UgdGhpcyBuaWNlci4uLlxuICAgIGVsLnN0eWxlLmxlZnQgPSBgJHsoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHggKyAoc3ByaXRlLndpZHRoICogMC42KX1weGA7XG4gICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gODAgLSAoTWF0aC5mbG9vcih0aGlzLnRleHQubGVuZ3RoIC8gMzApICogMTYpfXB4YDtcblxuICAgIGlmIChzcHJpdGUudGV4dHVpLnR5cGUgPT09ICdhc2snKSB7XG4gICAgICBlbC5zdHlsZS50b3AgPSBgJHsoKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeSkgLSAxMTAgLSAoTWF0aC5mbG9vcih0aGlzLnRleHQubGVuZ3RoIC8gMzApICogMTYpfXB4YDtcbiAgICB9XG5cbiAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gYCR7KHNwcml0ZS5zaG93aW5nID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpfWA7XG4gIH1cblxuICAvKipcbiAgKiBkZWxldGUgLSBkZWxldGVzIHRoZSBET00gZWxlbWVudCAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gd2hpY2ggdGhlIHVpIGlzIGF0dGFjaGVkLlxuICAqL1xuICBkZWxldGUoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUudGV4dHVpLmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4qIEJsb2NrTGlrZS5qc1xuKlxuKiBCbG9ja0xpa2UuanMgaXMgYW4gZWR1Y2F0aW9uYWwgSmF2YVNjcmlwdCBsaWJyYXJ5LlxuKiBJdCBicmlkZ2VzIHRoZSBnYXAgYmV0d2VlbiBibG9jay1iYXNlZCBhbmQgdGV4dC1iYXNlZCBwcm9ncmFtbWluZy5cbipcbiogQmxvY2tMaWtlLmpzIGlzIGRlc2lnbmVkIGZvbGxvd2luZyBTY3JhdGNoIGNvbmNlcHRzLCBtZXRob2RzIGFuZCBwYXR0ZXJucy5cbiogVGhlIHNjcmVlbiBpcyBhIGNlbnRlcmVkIHN0YWdlLiBJbnRlcmFjdGlvbiBpcyB3aXRoIFNwcml0ZXMuXG4qIENvZGUgaXMgZXhlY3V0ZWQgaW4gYSBcInBhY2VkXCIgbWFubmVyLlxuKiBTY3JhdGNoIGJsb2NrIGNvZGUgYW5kIEJsb2NrTGlrZS5qcyB0ZXh0IGNvZGUgYXJlIG1lYW50IHRvIGJlXG4qIGFzIGxpdGVyYWxseSBzaW1pbGFyIGFzIHBvc3NpYmxlLlxuKlxuKiBCbG9ja0xpa2UuanMgaXMgd3JpdHRlbiBpbiBFUzYvRVM3IGZsYXZvcmVkIEphdmFTY3JpcHQuXG4qIEl0IGlzIGVudmlyb25tZW50IGluZGVwZW5kZW50LlxuKiBJdCBjYW4gYmUgdXNlZCBhbnl3aGVyZSBtb2Rlcm4gSmF2YVNjcmlwdCBydW5zLlxuKlxuKiBAYXV0aG9yIFlhcm9uIChSb24pIElsYW5cbiogQGVtYWlsIGJsb2NrbGlrZUByb25pbGFuLmNvbVxuKlxuKiBDb3B5cmlnaHQgMjAxOFxuKiBGYWJyaXF1w6kgYXUgQ2FuYWRhIDogTWFkZSBpbiBDYW5hZGFcbiovXG5cbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL2RvY3VtZW50LWNzcyc7XG5pbXBvcnQgcGxhdGZvcm1zIGZyb20gJy4vcGxhdGZvcm1zJztcblxuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi9iYWNrZHJvcCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQ29zdHVtZSBmcm9tICcuL2Nvc3R1bWUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmV4cG9ydCB7IFN0YWdlIH07XG5leHBvcnQgeyBCYWNrZHJvcCB9O1xuZXhwb3J0IHsgU3ByaXRlIH07XG5leHBvcnQgeyBDb3N0dW1lIH07XG5cbihmdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gIHN0eWxlLmlubmVySFRNTCA9IGBcbiAgICAke3N0eWxlcy5kZWZhdWx0Q1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy51aUNTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMudGhpbmtDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnNheUNTU30gXFxuXFxuIFxuICAgICR7c3R5bGVzLmFza0NTU31gO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIHBsYXRmb3JtcygpO1xufSgpKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=