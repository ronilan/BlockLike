var blockLike =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/lib.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/backdrop.js":
/*!*************************!*\
  !*** ./src/backdrop.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Backdrop; });
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
class Backdrop extends _look__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Costume; });
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
class Costume extends _look__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
/*! exports provided: defaultCSS, uiCSS, thinkCSS, sayCSS, askCSS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCSS", function() { return defaultCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "uiCSS", function() { return uiCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "thinkCSS", function() { return thinkCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sayCSS", function() { return sayCSS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "askCSS", function() { return askCSS; });
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
/*! exports provided: apply, register */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "apply", function() { return apply; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "register", function() { return register; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Entity; });
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
    const f = Object(_rewriter__WEBPACK_IMPORTED_MODULE_0__["default"])(func, me);
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
    _element_css__WEBPACK_IMPORTED_MODULE_1__["register"](prop, value, this);
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

/***/ "./src/lib.js":
/*!********************!*\
  !*** ./src/lib.js ***!
  \********************/
/*! exports provided: Stage, Backdrop, Sprite, Costume */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _document_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./document-css */ "./src/document-css.js");
/* harmony import */ var _platforms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./platforms */ "./src/platforms.js");
/* harmony import */ var _stage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stage */ "./src/stage.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return _stage__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _backdrop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./backdrop */ "./src/backdrop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Backdrop", function() { return _backdrop__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./sprite */ "./src/sprite.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return _sprite__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _costume__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./costume */ "./src/costume.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Costume", function() { return _costume__WEBPACK_IMPORTED_MODULE_5__["default"]; });

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
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__["defaultCSS"]}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__["uiCSS"]}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__["thinkCSS"]}\n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__["sayCSS"]} \n\n 
    ${_document_css__WEBPACK_IMPORTED_MODULE_0__["askCSS"]}`;

  document.getElementsByTagName('head')[0].appendChild(style);

  Object(_platforms__WEBPACK_IMPORTED_MODULE_1__["default"])();
}());


/***/ }),

/***/ "./src/look.js":
/*!*********************!*\
  !*** ./src/look.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Look; });
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
    _element_css__WEBPACK_IMPORTED_MODULE_0__["register"](prop, value, this);
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return platforms; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rewrite; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SpriteElement; });
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
    _element_css__WEBPACK_IMPORTED_MODULE_0__["apply"](sprite);

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sprite; });
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
class Sprite extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"]({ image: options, width: 0, height: 0 });
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

      actual.costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"](costumeOptions);
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

    this.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_2__["default"](this, stage);
    this.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_1__["default"](stage);

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
      const costume = new _costume__WEBPACK_IMPORTED_MODULE_3__["default"]();
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
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](this, 'think', text) : null;
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
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](this, 'say', text) : null;
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
      typeof text !== 'undefined' && text.toString() ? this.textui = new _text_ui_element__WEBPACK_IMPORTED_MODULE_4__["default"](me, 'ask', text) : null;

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StageElement; });
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
    _element_css__WEBPACK_IMPORTED_MODULE_0__["apply"](stage);

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return enable; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return StageSurface; });
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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Stage; });
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
class Stage extends _entity__WEBPACK_IMPORTED_MODULE_0__["default"] {
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

    this.element = new _stage_element__WEBPACK_IMPORTED_MODULE_1__["default"](actual, this);
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

    actual.sensing ? Object(_stage_sensing__WEBPACK_IMPORTED_MODULE_4__["default"])(this) : null;

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

    curSprite.element = new _sprite_element__WEBPACK_IMPORTED_MODULE_3__["default"](sprite, this);
    curSprite.surface = new _stage_surface__WEBPACK_IMPORTED_MODULE_2__["default"](this);

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
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TextUiElement; });
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

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja0xpa2Uvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2JhY2tkcm9wLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9jb3N0dW1lLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9kb2N1bWVudC1jc3MuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2VsZW1lbnQtY3NzLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL2xpYi5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvbG9vay5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovL2Jsb2NrTGlrZS8uL3NyYy9yZXdyaXRlci5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3ByaXRlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3Nwcml0ZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc2Vuc2luZy5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2Utc3VyZmFjZS5qcyIsIndlYnBhY2s6Ly9ibG9ja0xpa2UvLi9zcmMvc3RhZ2UuanMiLCJ3ZWJwYWNrOi8vYmxvY2tMaWtlLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FB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Q0E7QUFDQTtBQUNBO0FBQ087QUFDUCxHO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qiw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwSUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLE9BQU87QUFDakIsVUFBVSxPQUFPO0FBQ2pCLFVBQVUsU0FBUztBQUNuQjtBQUNPO0FBQ1A7O0FBRUE7QUFDQSx3REFBd0QsaUJBQWlCO0FBQ3pFLDZCQUE2QixzQkFBc0I7QUFDbkQsR0FBRztBQUNIO0FBQ0EseURBQXlELGlCQUFpQjtBQUMxRSwrQkFBK0IsaUNBQWlDO0FBQ2hFLEtBQUs7QUFDTDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDL0RBO0FBQUE7QUFBQTtBQUFBO0FBQWlDO0FBQ0k7O0FBRXJDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2U7QUFDZjtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxLQUFLO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9DQUFvQztBQUNwQzs7QUFFQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBLDREQUE0RDtBQUM1RCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBLDZEQUE2RCxhQUFhLElBQUksVUFBVSxXQUFXLEVBQUU7QUFDckc7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCLFlBQVksSUFBSTtBQUNoQjtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVUsTUFBTSxNQUFNLElBQUk7QUFDeEMsS0FBSztBQUNMLHNHQUFzRztBQUN0RztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFNBQVM7QUFDckIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyx5REFBTztBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksU0FBUztBQUNyQixZQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxTQUFTO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLGdCQUFnQjs7QUFFbkY7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLFNBQVM7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0Msa0JBQWtCOztBQUVwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRkFBa0YsVUFBVSxvQkFBb0IsRUFBRTs7QUFFbEg7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFVBQVUsUUFBUSxFQUFFO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxVQUFVLFFBQVEsRUFBRTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZ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QTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQixlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsT0FBTztBQUNyQixjQUFjLE9BQU87QUFDckIsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsT0FBTztBQUN2QixpQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDs7QUFFaEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BELHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0Q7QUFDcEQsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CLFlBQVksU0FBUztBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUhBQW1IOztBQUVuSDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuYUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsWUFBWSxPQUFPO0FBQ25CLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThELFVBQVUsR0FBRyxhQUFhLElBQUksVUFBVSw2QkFBNkIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixLQUFLOztBQUUzQjtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRSxzQkFBc0IsK0VBQStFOztBQUVyRztBQUNBLGdDQUFnQyxLQUFLOztBQUVyQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZ0ZBQWdGO0FBQ3hHOztBQUVBO0FBQ0E7O0FBRUEsNkJBQTZCLHdDQUF3Qzs7QUFFckU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUIsbURBQW1EO0FBQzFFLHNCQUFzQiwrRUFBK0U7O0FBRXJHO0FBQ0Esd0JBQXdCLGdGQUFnRjtBQUN4Rzs7QUFFQSw2QkFBNkIsd0NBQXdDO0FBQ3JFOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYmxvY2tsaWtlLTEuMC4xLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbGliLmpzXCIpO1xuIiwiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBCYWNrZHJvcC5cbiAqIEJhY2tkcm9wcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe1xuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL2JhY2tkcm9wLnN2ZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKHtcbiAqICAgY29sb3I6ICcjQTJEQUZGJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIEJhY2tkcm9wIHRvIGJlIHVzZWQgYnkgU3RhZ2Ugb2JqZWN0cy5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGJhY2tkcm9wLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGJhY2tkcm9wIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHt9O1xuICAgIGNvbnN0IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfTtcblxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgYmFja2Ryb3AgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIGNvbnN0IGN1clN0YWdlID0gc3RhZ2U7XG4gICAgc3RhZ2UuYmFja2Ryb3BzLnB1c2godGhpcyk7XG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmVcbiAgICAhc3RhZ2UuYmFja2Ryb3AgPyBjdXJTdGFnZS5iYWNrZHJvcCA9IHN0YWdlLmJhY2tkcm9wc1swXSA6IG51bGw7XG4gICAgc3RhZ2UuZWxlbWVudCA/IHN0YWdlLmVsZW1lbnQudXBkYXRlKHN0YWdlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRUbyhzdGFnZSk7XG4gICogYmFja2Ryb3AucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byByZW1vdmUgdGhlIGJhY2tkcm9wIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBzdGFnZS5yZW1vdmVCYWNrZHJvcCh0aGlzKTtcbiAgfVxufVxuIiwiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBDb3N0dW1lLlxuICogQ29zdHVtZXMgY2FuIGJlIGFkZGVkIHRvIGEgU3ByaXRlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gKiAgIHdpZHRoOiA1MCxcbiAqICAgaGVpZ2h0OiA1MCxcbiAqICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqIH0pO1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb3N0dW1lIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIENvc3R1bWUgdG8gYmUgdXNlZCBieSBTcHJpdGUgb2JqZWN0cy4uXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgZm9yIHRoZSBjb3N0dW1lLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gdGhlIGNvc3R1bWUgd2lkdGggaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSB0aGUgY29zdHVtZSBoZWlnaHQgaW4gcGl4ZWxzLiBEZWZhdWx0IGlzIDEwMC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbWFnZSAtIGEgVVJJIChvciBkYXRhIFVSSSkgZm9yIHRoZSBjb3N0dW1lIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHdpZHRoOiAxMDAsXG4gICAgICBoZWlnaHQ6IDEwMCxcbiAgICAgIGNvbG9yOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgYWN0dWFsID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuICAgIHRoaXMudmlzaWJsZVdpZHRoID0gYWN0dWFsLndpZHRoO1xuICAgIHRoaXMudmlzaWJsZUhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG5cbiAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgY29zdHVtZSB0byB0aGUgc3ByaXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmFkZFRvKHNwcml0ZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gd2hpY2ggc3ByaXRlIHRvIGFkZCB0aGUgY29zdHVtZSB0b28uXG4gICovXG4gIGFkZFRvKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcbiAgICBzcHJpdGUuY29zdHVtZXMucHVzaCh0aGlzKTtcblxuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlLlxuICAgIGlmICghc3ByaXRlLmNvc3R1bWUpIHtcbiAgICAgIGN1clNwcml0ZS5jb3N0dW1lID0gc3ByaXRlLmNvc3R1bWVzWzBdO1xuICAgICAgY3VyU3ByaXRlLndpZHRoID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgY3VyU3ByaXRlLmhlaWdodCA9IHNwcml0ZS5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgY29zdHVtZSBmcm9tIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKiBjb3N0dW1lLnJlbW92ZUZyb20oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gcmVtb3ZlIHRoZSBjb3N0dW1lIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3ByaXRlKSB7XG4gICAgc3ByaXRlLnJlbW92ZUNvc3R1bWUodGhpcyk7XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb3N0dW1lIHRvIHRoYXQgb2YgdGhlIGltYWdlIGZpbGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAgKiAgIGltYWdlOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2QzL1NoZWVwX2luX2dyYXkuc3ZnJ1xuICAqIH0pO1xuICAqXG4gICogY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICovXG4gIHJlc2l6ZVRvSW1hZ2UoKSB7XG4gICAgLy8gcmVnaXN0ZXIgdGhlIGltYWdlIHNpemUgZnJvbSB0aGUgZmlsZVxuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcblxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbWUud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgbWUuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS52aXNpYmxlV2lkdGggPSBtZS53aWR0aDtcbiAgICAgICAgbWUudmlzaWJsZUhlaWdodCA9IG1lLmhlaWdodDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGlubmVyIC0gUGxhY2VzIGFuIEhUTUwgZWxlbWVudCBpbnNpZGUgdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmlubmVyKCc8cCBjbGFzcz1cImJpZyBjZW50ZXJlZCByYWluYm93XCI+Oik8L3A+Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvc3R1bWUuaW5uZXIoJ0kgbGlrZSB0ZXh0IG9ubHknKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gdGhlIGh0bWwgdG8gaW5zZXJ0LlxuICAqL1xuICBpbm5lcihodG1sKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBodG1sO1xuICB9XG5cbiAgLyoqXG4gICogaW5zZXJ0IC0gUGxhY2VzIGEgRE9NIGVsZW1lbnQgaW5zaWRlIHRoZSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5pbnNlcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWh0bWwtY3JlYXRpb24nKSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGluc2VydChlbCkge1xuICAgIGNvbnN0IGllbCA9IGVsLmNsb25lTm9kZSh0cnVlKTtcbiAgICBpZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgaWVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaW5oZXJpdCc7XG5cbiAgICB0aGlzLmltYWdlID0gbnVsbDtcbiAgICB0aGlzLmNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICB0aGlzLmlubmVySFRNTCA9IGllbC5vdXRlckhUTUw7XG4gIH1cbn1cbiIsIi8qKlxuKiBDb2xsZWN0aW9uIG9mIGNzcyBzdHJpbmdzIHRvIGJlIGluamVjdGVkIHRvIHRoZSBoZWFkIHNlY3Rpb24gb2YgYSBwYWdlLlxuKiBAcHJpdmF0ZVxuKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q1NTID0gYFxuKiB7IFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOyAgICAgICAgICAgICAgICAvKiBwcmV2ZW50IGNhbGxvdXQgdG8gY29weSBpbWFnZSwgZXRjIHdoZW4gdGFwIHRvIGhvbGQgKi9cbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7IC8qIHByZXZlbnQgdGFwIGhpZ2hsaWdodCBjb2xvciAvIHNoYWRvdyAqL1xufVxuaHRtbCwgYm9keXtcbiAgbWFyZ2luOjA7XG4gIHBhZGRpbmc6MDtcbn1cbmA7XG5cbmV4cG9ydCBjb25zdCB1aUNTUyA9IGBcbi5ibG9ja2xpa2UtZmxhZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogNjVweDtcbiAgbGluZS1oZWlnaHQ6IDY1cHg7XG4gIHBhZGRpbmc6IDMycHg7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xuICBib3JkZXItcmFkaXVzOiA2NXB4O1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHRoaW5rQ1NTID0gYFxuLmJsb2NrbGlrZS10aGluayB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBsZWZ0OiAyMDBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbWluLWhlaWdodDogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuLmJsb2NrbGlrZS10aGluazpiZWZvcmUge1xuICBwb3NpdGlvbjphYnNvbHV0ZTtcbiAgYm90dG9tOiAtMzBweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuLmJsb2NrbGlrZS10aGluazphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtNDVweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMTVweDtcbiAgaGVpZ2h0OiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHNheUNTUyA9IGBcbi5ibG9ja2xpa2UtYXNrLFxuLmJsb2NrbGlrZS1zYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5ibG9ja2xpa2UtYXNrOmJlZm9yZSxcbi5ibG9ja2xpa2Utc2F5OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxM3B4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0zM3B4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogIzQ0NCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNDQ0O1xufVxuLmJsb2NrbGlrZS1hc2s6YWZ0ZXIsXG4uYmxvY2tsaWtlLXNheTphZnRlciB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxNXB4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0yOHB4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogI2ZhZmFmYSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmFmYWZhO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IGFza0NTUyA9IGBcbi5ibG9ja2xpa2UtYXNrIGlucHV0IHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgcGFkZGluZzogMnB4O1xuICBtYXJnaW46IDJweDtcbiAgd2lkdGg6IDc1JTtcbn1cbi5ibG9ja2xpa2UtYXNrIGJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIGhlaWdodDogMjZweDtcbiAgcGFkZGluZzogMCA1cHg7XG4gIG1hcmdpbjogMDtcbn1cbmA7XG4iLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIG1hbmFnaW5nIGVsZW1lbnQgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIGVudGl0aWVzLlxuKi9cblxuLyoqXG4qIGFwcGx5IC0gYXBwbHkgY3NzUnVsZXMgb2YgYW4gZW50aXR5IHRvIGl0cyBET00gZWxlbWVudC5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG4gIC8vIFNwcml0ZXMgaGF2ZSBDb3N0dW1lcywgU3RhZ2UgaGFzIEJhY2tkcm9wLCBmaWd1cmUgb3V0IHdoaWNoIGVudGl0eSBpdCBpcy5cbiAgY29uc3QgY3VyTG9vayA9IGVudGl0eS5iYWNrZHJvcCB8fCBlbnRpdHkuY29zdHVtZTtcbiAgY29uc3QgY3VyTG9va3MgPSBlbnRpdHkuYmFja2Ryb3BzIHx8IGVudGl0eS5jb3N0dW1lcztcblxuICBjb25zdCBlbCA9IGVudGl0eS5lbGVtZW50LmVsO1xuXG4gIC8vIHJlbW92ZSBhbnkgc3R5bGUgYXBwbGllZCBieSBhbnkgbG9va1xuICBpZiAoY3VyTG9va3MpIHtcbiAgICBjdXJMb29rcy5mb3JFYWNoKChiKSA9PiB7XG4gICAgICBiLmNzc1J1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY2FtZWxDYXNlZCA9IGl0ZW0ucHJvcC5yZXBsYWNlKC8tKFthLXpdKS9nLCAoZykgPT4gZ1sxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSAnJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gYWRkIGN1cnJlbnQgbG9vayBzdHlsZXNcbiAgaWYgKGN1ckxvb2spIHtcbiAgICBjdXJMb29rLmNzc1J1bGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgY3VyRW50aXR5IHN0eWxlcy4gTXVzdCBiZSBkb25lIGFmdGVyIGxvb2sgc3R5bGVzLlxuICBjdXJFbnRpdHkuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgKGcpID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSBpdGVtLnZhbHVlO1xuICB9KTtcbn1cblxuLyoqXG4qIHJlZ2lzdGVyIC0gcmVnaXN0ZXIgY3NzUnVsZXMgb2YgZm9yIGFuIGVudGl0eSBiYXNlZCBvbiB1c2VyIGlucHV0LlxuKiBOb3RlOiBBbGwgcnVsZXMgYXJlIHJlZ2lzdGVyZWQgZGFzaC1jYXNlIGEtbGEgY3NzLlxuKiBUaGlzIGlzIHJlZ2FyZGxlc3Mgb2YgaG93IHRoZXkgYXJlIHNldCBhbmQgdGhvdWdoIHRoZXkgYXJlIHVzZWQgY2FtZWxDYXNlLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gY29sb3IpLiBBbHRlcm5hdGl2ZWx5IGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgcGFpcnMuXG4qIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBlbnRpdHkgLSBhIFNwcml0ZSBvciBTdGFnZS5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIocHJvcCwgdmFsdWUsIGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG5cbiAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZGFzaGVkID0gcHJvcC5yZXBsYWNlKC8oW0EtWl0pL2csICgkMSkgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgY3VyRW50aXR5LmNzc1J1bGVzLnB1c2goeyBwcm9wOiBkYXNoZWQsIHZhbHVlIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBwcm9wID09PSAnb2JqZWN0JyAmJiAhdmFsdWUpIHtcbiAgICBPYmplY3Qua2V5cyhwcm9wKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGNvbnN0IGRhc2hlZCA9IGtleS5yZXBsYWNlKC8oW0EtWl0pL2csICgkMSkgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWU6IHByb3Bba2V5XSB9KTtcbiAgICB9KTtcbiAgfVxufVxuIiwiaW1wb3J0IHJld3JpdGUgZnJvbSAnLi9yZXdyaXRlcic7XG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVudGl0eS5cbiAqIEFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gRW50aXR5IGlzIGFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhY2UgLSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBwYWNlIHBhY2VkIG1ldGhvZHMuXG4gICovXG4gIGNvbnN0cnVjdG9yKHBhY2UpIHtcbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuaWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICB0aGlzLnBhY2UgPSBwYWNlO1xuICAgIHRoaXMuc291bmRzID0gW107IC8vIHdpbGwgaG9sZCBhbGwgc291bmRzIGN1cnJlbnRseSBwbGF5ZWQgYnkgZW50aXR5LCBpZiBhbnkuXG4gICAgLypcbiAgICAqIFBhY2VkIG1ldGhvZHMgd29yayBpbiB0aGUgZm9sbG93aW5nIG1hbm5lcjpcbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciBwYWNlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgcGFjZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYWZ0ZXIge3BhY2V9IG1pbGxpc2Vjb25kcy5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgcGFjZWQgbWV0aG9kIHRvIGhhbHQgZXhlY3V0aW9uIG9mIGFueSBjb2RlIGZvbGxvd2luZyBpdCB1bnRpbCBpdCBpcyBkb25lLlxuICAgICovXG4gICAgdGhpcy5wYWNlZCA9IFtcbiAgICAgICdnb1RvJyxcbiAgICAgICdtb3ZlJyxcbiAgICAgICdjaGFuZ2VYJyxcbiAgICAgICdjaGFuZ2VZJyxcbiAgICAgICdzZXRYJyxcbiAgICAgICdzZXRZJyxcbiAgICAgICdnb1Rvd2FyZHMnLFxuICAgICAgJ3R1cm5SaWdodCcsXG4gICAgICAndHVybkxlZnQnLFxuICAgICAgJ3BvaW50SW5EaXJlY3Rpb24nLFxuICAgICAgJ3BvaW50VG93YXJkcycsXG4gICAgICAnY2hhbmdlU2l6ZScsXG4gICAgICAnc2V0U2l6ZScsXG4gICAgICAnc2F5JyxcbiAgICAgICd0aGluaycsXG4gICAgICAncmVmcmVzaCcsXG4gICAgXTtcblxuICAgIC8qXG4gICAgKiBXYWl0ZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZyBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZCA9IFtcbiAgICAgICd3YWl0JyxcbiAgICAgICdnbGlkZScsXG4gICAgICAnc2F5V2FpdCcsXG4gICAgICAndGhpbmtXYWl0JyxcbiAgICAgICdwbGF5U291bmRVbnRpbERvbmUnLFxuICAgICAgJ2Jyb2FkY2FzdE1lc3NhZ2VXYWl0JyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIHdhaXRlZFJldHVucmVkIG1ldGhvZHMgd29yayBzaW1pbGFybHkgdG8gd2FpdGVkIG1ldGhvZHMgb25seSB0aGF0IHRoZXkgZW5hYmxlIGNhcHR1cmluZyBhIHZhbHVlXG4gICAgKiBpbnRvIGEgZ2xvYmFsbHkgZGVjbGFyZWQgdmFyaWFibGUgKG9yIGFuIHVuZGVjbGFyZWQgb25lKS5cbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciB3YWl0ZWRSZXR1cm5lZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZzpcbiAgICAqICAgLSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgaW50byB3aGljaCBhIHZhbHVlIGlzIHJldHVybmVkLlxuICAgICogICAtIGEgdHJpZ2dlcmluZ0lkIHBhcmFtZXRlci5cbiAgICAqIDQuIFRoZSBldmVudCBsaXN0ZW5lciBpcyB1bmlxdWUgdG8gdGhlIHRyaWdnZXJpbmdJZC5cbiAgICAqIDUuIFdoZW4gdGhlIG1ldGhvZCBjb21wbGV0ZXMgcnVubmluZyBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHJlc29sdmluZyB0aGUgcHJvbWlzZS5cbiAgICAqIDYuIFRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cmFuc2ZlcmVkIGludG8gdGhlIHZhcmlhYmxlIHVzaW5nIGV2YWwuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKiBBdCB3aGljaCBwb2ludCB0aGUgdmFyaWFibGUgaGFzIFwiY2FwdHVyZWRcIiB0aGUgdmFsdWUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZFJldHVybmVkID0gW1xuICAgICAgJ2ludm9rZScsXG4gICAgICAnYXNrJyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIEV2ZW50IG1ldGhvZHMgKGV2ZW50ZWQpIGFyZSBjb250YWluZXJzIGZvciBmdW5jdGlvbnMgdG8gYmUgcmV3cml0dGVuLlxuICAgICogV2hlbiBhbiBldmVudCBtZXRob2QgaXMgbmVzdGVkIGluc2lkZSBhbm90aGVyIHRoZSBjb2RlIG9mIHRoZSBpbm5lciBtZXRob2QgaXMgTk9UIHJld3JpdHRlbi5cbiAgICAqL1xuICAgIHRoaXMuZXZlbnRlZCA9IFtcbiAgICAgICd3aGVuRmxhZycsXG4gICAgICAnd2hlbkxvYWRlZCcsXG4gICAgICAnd2hlbkNsaWNrZWQnLFxuICAgICAgJ3doZW5LZXlQcmVzc2VkJyxcbiAgICAgICd3aGVuRXZlbnQnLFxuICAgICAgJ3doZW5SZWNlaXZlTWVzc2FnZScsXG4gICAgICAnd2hlbkNsb25lZCcsXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAqIF9nZW5lcmF0ZVVVSUQgLSBnZW5lcmF0ZXMgYSB1bmlxdWUgSUQuXG4gICogU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9jcmVhdGUtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHJldHVybiB7c3RyaW5nfSAtIGEgdW5pcXVlIGlkLlxuICAqL1xuICBfZ2VuZXJhdGVVVUlEKCkge1xuICAgIGxldCBkO1xuICAgIGxldCByO1xuXG4gICAgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB0eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZCArPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7IC8vIHVzZSBoaWdoLXByZWNpc2lvbiB0aW1lciBpZiBhdmFpbGFibGVcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgICAgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICB9KTtcblxuICAgIHJldHVybiB1dWlkO1xuICB9XG5cbiAgLyoqXG4gICogX3JlbGVhc2VXYWl0ZWQgLSByZWxlYXNlcyBhIHdhaXRlZCBwcm9taXNlIGJ5IGRpc3BhdGNoaW5nIGFuIGV2ZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdHJpZ2dlcmluZ0lkIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgaW52b2tlZCB0aGUgY29kZSB0aGF0IHJlcXVlc3RlZCB0aGUgd2FpdC5cbiAgKi9cbiAgX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2Uud2FpdGVkLiR7dHJpZ2dlcmluZ0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlOiAwIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvKipcbiAgKiBfc2V0VG9WYXIgLSBzZXRzIGEgZ2xvYmFsbHkgc2NvcGVkIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB3aG8ncyBuYW1lIGlzIHNwZWNpZmllZCBhcyBhIGEgc3RyaW5nXG4gICogd2l0aCB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7dmFyU3RyaW5nfSB0ZXh0IC0gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHdoaWNoIHZhbHVlIHNob3VsZCBiZSBzZXQuXG4gICogQHBhcmFtIHthbnl9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHNldC5cbiAgKi9cbiAgX3NldFRvVmFyKHZhclN0cmluZywgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgZXZhbChgJHt2YXJTdHJpbmd9ID0gJyR7dmFsdWV9J2ApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgKCdCbG9ja0xpa2UuanMgRXJyb3I6IFZhcmlhYmxlcyBhY2NlcHRpbmcgYSB2YWx1ZSBtdXN0IGJlIGRlY2xhcmVkIGluIHRoZSBnbG9iYWwgc2NvcGUuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIF9leGVjIC0gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAgKiBUaGlzIGlzIHdoYXQgY3JlYXRlcyB0aGUgXCJwYWNlZFwiIGV4ZWN1dGlvbiBvZiB0aGUgdXNlciBzdXBwbGllZCBmdW5jdGlvbnMuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICogQHBhcmFtIHthcnJheX0gYXJnc0FyciAtIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbi5cbiAgKi9cbiAgX2V4ZWMoZnVuYywgYXJnc0Fycikge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBtZS50cmlnZ2VyaW5nSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICBjb25zdCBmID0gcmV3cml0ZShmdW5jLCBtZSk7XG4gICAgcmV0dXJuIGYuYXBwbHkobWUsIGFyZ3NBcnIpO1xuICB9XG5cbiAgLyoqXG4gICogaW52b2tlIC0gaW52b2tlIGEgZnVuY3Rpb24uIEFsbG93cyBwYXNzaW5nIGFuIGFyZ3VtZW50IG9yIGFycmF5IG9mIGFyZ3VtZW50cy5cbiAgKiBGdW5jdGlvbiB3aWxsIGJlIFwicGFjZWRcIiBhbmQgY29kZSBleGVjdXRpb24gd2lsbCBiZSBcIndhaXRlZFwiIHVudGlsIGl0IGlzIGNvbXBsZXRlZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5GbGFnKCgpID0+IHtcbiAgKiAgIHRoaXMuaW52b2tlKGp1bXApO1xuICAqICAgdGhpcy5pbnZva2UodGFsaywgJ2hpJyk7XG4gICogICB0aGlzLmludm9rZShwYXR0ZXJuLCBbNSwgNTAsIDEyXSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NBcnIgLSBhbiBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24uIEEgc2luZ2xlIHZhcmlhYmxlIGFsc28gYWNjZXB0ZWQuXG4gICovXG4gIGludm9rZShmdW5jLCBhcmdzQXJyLCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdGhlVmFyIGFuZCB0cmlnZ2VyaW5nSWQgYXJlIG5vdCB1c2VyIHN1cHBsaWVkLCB0aGV5IGFyZSBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBsZXQgYXJncyA9IGFyZ3NBcnI7XG4gICAgIShhcmdzQXJyIGluc3RhbmNlb2YgQXJyYXkpID8gYXJncyA9IFthcmdzQXJyXSA6IG51bGw7XG5cbiAgICB0aGlzLl9leGVjKGZ1bmMsIGFyZ3MpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgd2FpdGVkIG1ldGhvZCBsaXN0ZW5lci4gcmVsZWFzZSBpdC5cbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgIHRoZVZhciA/IHRoaXMuX3NldFRvVmFyKHRoZVZhciwgcmVzdWx0KSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiB3YWl0IC0gY3JlYXRlcyBhIHBhdXNlIGluIGV4ZWN1dGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogdGhpcy53YWl0KDUpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgdGltZSA9IDU7XG4gICogdGhpcy53YWl0KHRpbWUgKiAwLjk1KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LiBNdXN0IGJlIGFuIGFjdHVhbCBudW1iZXIuXG4gICovXG4gIHdhaXQoc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgfVxuXG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5Mb2FkZWQgLSBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKiBUbyBiZSB1c2VkIHdpdGggY29kZSB0aGF0IG5lZWRzIHRvIHJ1biBvbmxvYWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5Mb2FkZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5Mb2FkZWQoZnVuYykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fZXhlYyhmdW5jLCBbXSk7XG4gICAgfSwgMCk7XG4gIH1cblxuICAvKipcbiAgKiB3aGVuRmxhZyAtIGFkZHMgYSBmbGFnIHRvIGNvdmVyIHRoZSBzdGFnZSB3aXRoIGFuIGV2ZW50IGxpc3RlbmVyIGF0dGFjaGVkLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgcmVtb3ZlIHRoZSBmbGFnIGRpdiBhbmQgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdJIGFtIGFsaXZlJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuRmxhZyhmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgaWYgKG1lLmVsZW1lbnQpIHtcbiAgICAgIG1lLmVsZW1lbnQuYWRkRmxhZyh0aGlzKTtcblxuICAgICAgdGhpcy5lbGVtZW50LmZsYWcuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBtZS5lbGVtZW50LnJlbW92ZUZsYWcobWUpO1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbkNsaWNrZWQgLSBhZGRzIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHNwcml0ZSBvciBzdGFnZS5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkNsaWNrZWQoZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlbktleVByZXNzZWQgLSBhZGRzIGEga2V5cHJlc3MgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbktleVByZXNzZWQoJyAnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdTcGFjZXByZXNzZWQnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyS2V5IC0gdGhlIGtleSBwcmVzc2VkLiBtYXkgYmUgdGhlIGNvZGUgb3IgdGhlIGNoYXJhY3RlciBpdHNlbGYgKEEgb3IgNjUpXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbktleVByZXNzZWQodXNlcktleSwgZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBsZXQgY2hlY2s7XG4gICAgdHlwZW9mIHVzZXJLZXkgPT09ICdzdHJpbmcnID8gY2hlY2sgPSB1c2VyS2V5LnRvTG93ZXJDYXNlKCkgOiBjaGVjayA9IHVzZXJLZXk7XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuICAgICAgLy8gTWFrZSBzdXJlIGVhY2ggcHJvcGVydHkgaXMgc3VwcG9ydGVkIGJ5IGJyb3dzZXJzLlxuICAgICAgLy8gTm90ZTogdXNlciBtYXkgd3JpdGUgaW5jb21wYXRpYmxlIGNvZGUuXG4gICAgICBlLmNvZGUgJiYgZS5jb2RlLnRvTG93ZXJDYXNlKCkgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGUua2V5ICYmIGUua2V5LnRvTG93ZXJDYXNlKCkgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGUua2V5Q29kZSA9PT0gY2hlY2sgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5FdmVudCAtIGFkZHMgdGhlIHNwZWNpZmllZCBldmVudCBsaXN0ZW5lciB0byBzcHJpdGUvc3RhZ2UuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkV2ZW50KCdtb3VzZW92ZXInLCAoZSkgPT4ge1xuICAqICAgY29uc29sZS5sb2coZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnRTdHIgLSB0aGUgbmFtZWQgZXZlbnQgKG1vc2Vtb3ZlIGV0Yy4pLlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5FdmVudChldmVudFN0ciwgZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICBsZXQgYXR0YWNoVG8gPSB0aGlzLmVsZW1lbnQuZWw7XG4gICAgICBsZXQgb3B0aW9ucyA9IHt9O1xuICAgICAgJ2tleWRvd258a2V5dXB8a2V5cHJlc3MnLmluZGV4T2YoZXZlbnRTdHIpICE9PSAtMSA/IGF0dGFjaFRvID0gZG9jdW1lbnQgOiBudWxsO1xuICAgICAgJ3RvdWNoc3RhcnR8dG91Y2htb3ZlJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBvcHRpb25zID0geyBwYXNzaXZlOiB0cnVlIH0gOiBudWxsO1xuXG4gICAgICBhdHRhY2hUby5hZGRFdmVudExpc3RlbmVyKGV2ZW50U3RyLCAoZSkgPT4ge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogd2hlblJlY2VpdmVNZXNzYWdlIC0gYWRkcyB0aGUgc3BlY2lmaWVkIGV2ZW50IGxpc3RlbmVyIHRvIGRvY3VtZW50LlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5SZWNlaXZlTWVzc2FnZSgnbW92ZScsIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5tb3ZlKC0xMCk7XG4gICogfSlcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpO1xuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5SZWNlaXZlTWVzc2FnZShtc2csIGZ1bmMpIHtcbiAgICBjb25zdCBsaXN0ZW5lcklkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgLy8gcmVnaXN0ZXIgYXMgYSBtZXNzYWdlIGxpc3RlbmVyLlxuICAgIEVudGl0eS5tZXNzYWdlTGlzdGVuZXJzLnB1c2goeyBtc2csIGxpc3RlbmVySWQgfSk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gc3BlY2lmaWVkIG1lc3NhZ2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKG1zZywgKGUpID0+IHtcbiAgICAgIC8vIGV4ZWN1dGUgdGhlIGZ1bmMgYW5kIHRoZW5cbiAgICAgIHRoaXMuX2V4ZWMoZnVuYywgW2VdKS50aGVuKCgpID0+IHtcbiAgICAgICAgLy8gZGlzcGF0Y2ggYW4gZXZlbnQgdGhhdCBpcyB1bmlxdWUgdG8gdGhlIGxpc3RlbmVyIGFuZCBtZXNzYWdlIHJlY2VpdmVkLlxuICAgICAgICBjb25zdCBtc2dJZCA9IGUuZGV0YWlsLm1zZ0lkO1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ2Jsb2NrTGlrZS5kb25ld2hlbmVlY2VpdmVtZXNzYWdlJywgeyBkZXRhaWw6IHsgbXNnSWQsIGxpc3RlbmVySWQgfSB9KTtcblxuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogYnJvYWRjYXN0TWVzc2FnZSAtIGRpc3BhdGNoZXMgYSBjdXN0b20gZXZlbnQgdGhhdCBhY3RzIGFzIGEgZ2xvYmFsIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKGZ1bmN0aW9uKCkge1xuICAqICBzdGFnZS5icm9hZGNhc3RNZXNzYWdlKCdtb3ZlJylcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpXG4gICovXG4gIGJyb2FkY2FzdE1lc3NhZ2UobXNnKSB7XG4gICAgY29uc3QgbXNnSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQobXNnLCB7IGRldGFpbDogeyBtc2dJZCB9IH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICogYnJvYWRjYXN0TWVzc2FnZVdhaXQgLSBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50IHRoYXQgYWN0cyBhcyBhIGdsb2JhbCBtZXNzYWdlLlxuICAqIFdhaXRzIGZvciBhbGwgd2hlblJlY2VpdmVNZXNzYWdlIGxpc3RlbmVycyB0byBjb21wbGV0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHNwcml0ZS53aGVuUmVjZWl2ZU1lc3NhZ2UoJ21vdmUnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgtMTApO1xuICAqICAgdGhpcy53YWl0KDUpO1xuICAqIH0pXG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZChmdW5jdGlvbigpIHtcbiAgKiAgc3RhZ2UuYnJvYWRjYXN0TWVzc2FnZVdhaXQoJ21vdmUnKTtcbiAgKiAgc3ByaXRlLnNheSgnQWxsIGRvbmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBtc2cgLSB0aGUgbmFtZWQgbWVzc2FnZSAoZXZlbnQpXG4gICovXG4gIGJyb2FkY2FzdE1lc3NhZ2VXYWl0KG1zZywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIGNvbnN0IG1zZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgLy8gc2F2ZSByZWdpc3RlcmVkIGxpc3RlbmVycyBmb3IgdGhpcyBicm9hZGNhc3QuXG4gICAgbGV0IG15TGlzdGVuZXJzID0gRW50aXR5Lm1lc3NhZ2VMaXN0ZW5lcnMuZmlsdGVyKChpdGVtKSA9PiBpdGVtLm1zZyA9PT0gbXNnKTtcbiAgICAvLyBkaXNwYXRjaCB0aGUgbWVzc2FnZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChtc2csIHsgZGV0YWlsOiB7IG1zZ0lkIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gdGhvc2Ugd2hvIHJlY2VpdmVkIHRoZSBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCBmdW5jdGlvbiBicm9hZGNhc3RNZXNzYWdlV2FpdExpc3RlbmVyKGUpIHtcbiAgICAgIC8vIGlmIGV2ZW50IGlzIGZvciB0aGlzIG1lc3NhZ2UgcmVtb3ZlIGxpc3RlbmVySWQgZnJvbSBsaXN0IG9mIGxpc3RlbmVycy5cbiAgICAgIChlLmRldGFpbC5tc2dJZCA9PT0gbXNnSWQpID8gbXlMaXN0ZW5lcnMgPSBteUxpc3RlbmVycy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0ubGlzdGVuZXJJZCAhPT0gZS5kZXRhaWwubGlzdGVuZXJJZCkgOiBudWxsO1xuICAgICAgLy8gYWxsIGxpc3RlbmVycyByZXNwb25kZWQuXG4gICAgICBpZiAoIW15TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICAvLyByZW1vdmUgdGhlIGV2ZW50IGxpc3RlbmVyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS5kb25ld2hlbmVlY2VpdmVtZXNzYWdlJywgYnJvYWRjYXN0TWVzc2FnZVdhaXRMaXN0ZW5lcik7XG4gICAgICAgIC8vIHJlbGVhc2UgdGhlIHdhaXRcbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBTb3VuZCAqICovXG5cbiAgLyoqXG4gICogcGxheVNvdW5kIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdilcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wbGF5U291bmQoJy4uLy4uL3NvdW5kcy9ibGVhdC53YXYnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIG9mIHRoZSBmaWxlIHRvIHBsYXkuXG4gICovXG4gIHBsYXlTb3VuZCh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNvdW5kcyA9IHRoaXMuc291bmRzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gYXVkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kTG9vcCAtIHBsYXlzIGEgc291bmQgZmlsZSAobXAzLCB3YXYpIGFnYWluIGFuZCBhZ2FpblxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZExvb3AoJy4uLy4uL3NvdW5kcy9ibGVhdC53YXYnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIG9mIHRoZSBmaWxlIHRvIHBsYXkuXG4gICovXG4gIHBsYXlTb3VuZExvb3AodXJsKSB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kVW50aWxEb25lIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdikgdW50aWwgZG9uZS5cbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gcGxheVNvdW5kIGFuZCB3YWl0IGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHNvdW5kLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZFVudGlsRG9uZSgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kVW50aWxEb25lKHVybCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGF1ZGlvKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHN0b3BTb3VuZHMgLSBzdG9wcyBhbGwgc291bmRzIHBsYXllZCBieSBzcHJpdGUgb3Igc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBzdGFnZS53aGVuS2V5UHJlc3NlZCgnRXNjYXBlJywgKCkgPT4ge1xuICAqICAgdGhpcy5zdG9wU291bmRzKCk7XG4gICogfSk7XG4gICovXG4gIHN0b3BTb3VuZHMoKSB7XG4gICAgdGhpcy5zb3VuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5wYXVzZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc291bmRzID0gW107XG4gIH1cblxuICAvKiBjc3MgKi9cblxuICAvKipcbiAgKiBjc3MgLSBhcHBsaWVzIGEgQ1NTIHJ1bGUgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5jc3MoJ2JhY2tncm91bmQnLCAnIzAwMDBmZicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MobmFtZSkge1xuICAgICF0aGlzLmhhc0NsYXNzKG5hbWUpID8gdGhpcy5jbGFzc2VzLnB1c2gobmFtZSkgOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ2xhc3MgLSByZW1vdmVzIGEgY3NzIGNsYXNzIGZyb20gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqIHNwcml0ZS5yZW1vdmVDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbmFtZSk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBoYXNDbGFzcyAtIGlzIHRoZSBjc3MgY2xhc3MgYXBwbGllZCB0byB0aGUgc3ByaXRlIGFuZCBhbGwgY29zdHVtZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IHRoaXMucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IHRoaXMuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfVxufVxuIiwiLyoqXG4qIEJsb2NrTGlrZS5qc1xuKlxuKiBCbG9ja0xpa2UuanMgaXMgYW4gZWR1Y2F0aW9uYWwgSmF2YVNjcmlwdCBsaWJyYXJ5LlxuKiBJdCBicmlkZ2VzIHRoZSBnYXAgYmV0d2VlbiBibG9jay1iYXNlZCBhbmQgdGV4dC1iYXNlZCBwcm9ncmFtbWluZy5cbipcbiogQmxvY2tMaWtlLmpzIGlzIGRlc2lnbmVkIGZvbGxvd2luZyBTY3JhdGNoIGNvbmNlcHRzLCBtZXRob2RzIGFuZCBwYXR0ZXJucy5cbiogVGhlIHNjcmVlbiBpcyBhIGNlbnRlcmVkIHN0YWdlLiBJbnRlcmFjdGlvbiBpcyB3aXRoIFNwcml0ZXMuXG4qIENvZGUgaXMgZXhlY3V0ZWQgaW4gYSBcInBhY2VkXCIgbWFubmVyLlxuKiBTY3JhdGNoIGJsb2NrIGNvZGUgYW5kIEJsb2NrTGlrZS5qcyB0ZXh0IGNvZGUgYXJlIG1lYW50IHRvIGJlXG4qIGFzIGxpdGVyYWxseSBzaW1pbGFyIGFzIHBvc3NpYmxlLlxuKlxuKiBCbG9ja0xpa2UuanMgaXMgd3JpdHRlbiBpbiBFUzYvRVM3IGZsYXZvcmVkIEphdmFTY3JpcHQuXG4qIEl0IGlzIGVudmlyb25tZW50IGluZGVwZW5kZW50LlxuKiBJdCBjYW4gYmUgdXNlZCBhbnl3aGVyZSBtb2Rlcm4gSmF2YVNjcmlwdCBydW5zLlxuKlxuKiBAYXV0aG9yIFlhcm9uIChSb24pIElsYW5cbiogQGVtYWlsIGJsb2NrbGlrZUByb25pbGFuLmNvbVxuKlxuKiBDb3B5cmlnaHQgMjAxOFxuKiBGYWJyaXF1w6kgYXUgQ2FuYWRhIDogTWFkZSBpbiBDYW5hZGFcbiovXG5cbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL2RvY3VtZW50LWNzcyc7XG5pbXBvcnQgcGxhdGZvcm1zIGZyb20gJy4vcGxhdGZvcm1zJztcblxuaW1wb3J0IFN0YWdlIGZyb20gJy4vc3RhZ2UnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi9iYWNrZHJvcCc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBTcHJpdGUgZnJvbSAnLi9zcHJpdGUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgQ29zdHVtZSBmcm9tICcuL2Nvc3R1bWUnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5cbmV4cG9ydCB7IFN0YWdlIH07XG5leHBvcnQgeyBCYWNrZHJvcCB9O1xuZXhwb3J0IHsgU3ByaXRlIH07XG5leHBvcnQgeyBDb3N0dW1lIH07XG5cbihmdW5jdGlvbiBpbml0KCkge1xuICBjb25zdCBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcyc7XG4gIHN0eWxlLmlubmVySFRNTCA9IGBcbiAgICAke3N0eWxlcy5kZWZhdWx0Q1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy51aUNTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMudGhpbmtDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnNheUNTU30gXFxuXFxuIFxuICAgICR7c3R5bGVzLmFza0NTU31gO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xuXG4gIHBsYXRmb3JtcygpO1xufSgpKTtcbiIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb29rLlxuICogQWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb2sge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIExvb2sgaXMgYWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGNzcyAtIGFwcGxpZXMgYSBDU1MgcnVsZSB0byBhIENvc3R1bWUgb3IgQmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmNzcygnZm9udC1zaXplJywgJzE2cHgnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKVxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gYWRkLlxuICAqL1xuICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgIXRoaXMuaGFzQ2xhc3MobmFtZSkgPyB0aGlzLmNsYXNzZXMucHVzaChuYW1lKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDbGFzcyAtIHJlbW92ZXMgYSBjc3MgY2xhc3MgZnJvbSB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGNvc3R1bWUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcigoaXRlbSkgPT4gaXRlbSAhPT0gbmFtZSk7XG4gIH1cblxuICAvKipcbiAgKiBoYXNDbGFzcyAtIGlzIHRoZSBjc3MgY2xhc3MgYXBwbGllZCB0byB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGNvc3R1bWUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUuXG4gICogQHJldHVybiB7Ym9vbGVhbn0gLSBpcyB0aGUgY3NzIGNsYXNzIG5hbWUgb24gdGhlIGxpc3QuXG4gICovXG4gIGhhc0NsYXNzKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmluZGV4T2YobmFtZSkgIT09IC0xO1xuICB9XG59XG4iLCIvKipcbiogcGxhdGZvcm1zIC0gY29sbGVjdGlvbiBvZiB0aGluZ3MgdG8gZW5zdXJlIGl0IHBsYXlzIG5pY2VseSB3aXRoIGNvZGluZyBwbGF0Zm9ybXMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxhdGZvcm1zKCkge1xuICAvKipcbiAgKiBjb2RlcGVuLmlvXG4gICogUGFjZWQgYW5kIFdhaXRlZCBtZXRob2RzIHRyaWdnZXIgdGhlIHByb3RlY3Rpb24gLSBoZW5jZSB3ZSBwcm9sb25nIGl0LlxuICAqIGh0dHBzOi8vYmxvZy5jb2RlcGVuLmlvLzIwMTYvMDYvMDgvY2FuLWFkanVzdC1pbmZpbml0ZS1sb29wLXByb3RlY3Rpb24tdGltaW5nL1xuICAqL1xuICBpZiAod2luZG93LkNQKSB7XG4gICAgd2luZG93LkNQLlBlblRpbWVyLk1BWF9USU1FX0lOX0xPT1BfV09fRVhJVCA9IDYwMDAwO1xuICB9XG59XG4iLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHJld3JpdGluZyB1c2VyIGNvZGUgdG8gYWxsb3cgZm9yIEJsb2NrTGlrZS5qcyBmZWF0dXJlcy5cbiovXG5cbi8qKlxuKiBjb3VudENoYXIgLSBjb3VudCBob3cgbWFueSB0aW1lcyBhIGdpdmVuIGNoYXJhY3RlciAob3Igc3RyaW5nKSBhcHBlYXJzIGluIGFub3RoZXIgc3RyaW5nLlxuKiBoZWxwZXIgZm9yIGV2ZW50ZWQgc2tpcHBpbmcgYW5kIG1ldGhvZCByZXdyaXRpbmcuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtzdHJpbmd9IGNoYXIgLSBhIHN0cmluZyB0byBsb29rIGZvci5cbipcbiogQHJldHVybiB7bnVtYmVyfSAtIHRoZSBudW1iZXIgb2YgdGltZXMgZm91bmQuXG4qL1xuZnVuY3Rpb24gY291bnRDaGFyKHN0ciwgY2hhcikge1xuICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBcXFxcJHtjaGFyfWAsICdnJyk7XG4gIHJldHVybiAoc3RyLm1hdGNoKHJlZ0V4cCkgfHwgW10pLmxlbmd0aDtcbn1cblxuLyoqXG4qIHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyAtIGZvciBhIGdpdmVuIGxpbmUgb2YgY29kZSwgcmVwbGFjZXMgYWxsIG9jY3VycmVuY2VzIG9mXG4qIHVzZXIgcHJvdmlkZWQgc3RyaW5ncyB3aXRoIGEgc2VxdWVuY2Ugb2Ygc3BhY2VzIG9mIHRoZSBzYW1lIGxlbmd0aC5cbiogaGVscGVyIGZvciBldmVudGVkIHNraXBwaW5nIGFuZCBtZXRob2QgcmV3cml0aW5nLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gbGluZSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGxpbmUgd2l0aG91dCBzdHJpbmdzLlxuKi9cbmZ1bmN0aW9uIHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyhsaW5lKSB7XG4gIHJldHVybiBsaW5lLnJlcGxhY2UoL1wiKC4qPylcInwnKC4qPyknfGAoLio/KWAvZywgJyAnKTtcbn1cblxuLyoqXG4qIGlzTWV0aG9kSW5TdHJpbmcgLSBjaGVja3MgYSBzdHJpbmcgYWdhaW5zdCBhbiBhcnJheSBvZiBtZXRob2QgbmFtZXMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBzdHIgLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtBcnJheX0gYXJyIC0gYW4gYXJyYXkgb2YgbWV0aG9kIG5hbWVzLlxuKlxuKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBtZXRob2QgaW4gdGhlIHN0cmluZy5cbiovXG5mdW5jdGlvbiBpc01ldGhvZEluU3RyaW5nKGFyciwgc3RyKSB7XG4gIHJldHVybiAoYXJyLnNvbWUoKG1ldGhvZCkgPT4gc3RyLmluZGV4T2YoYC4ke21ldGhvZH0oYCkgIT09IC0xKSk7XG59XG5cbi8qKlxuKiBpc1BhY2VkIC0gY2hlY2tzIGlmIGEgbGluZSBvZiBjb2RlIGluY2x1ZGVzIGEgcGFjZWQgbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBpcyBwYWNlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzUGFjZWQoaXRlbSwgZW50aXR5KSB7XG4gIHJldHVybiBpc01ldGhvZEluU3RyaW5nKGVudGl0eS5wYWNlZCwgaXRlbSk7XG59XG5cbi8qKlxuKiBpc1dhaXRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhIHdhaXRlZCBtZXRob2QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGlzIHdhaXRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzV2FpdGVkKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gaXNNZXRob2RJblN0cmluZyhlbnRpdHkud2FpdGVkLCBpdGVtKTtcbn1cblxuLyoqXG4qIGlzRXZlbnRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhbiBldmVudGVkIG1ldGhvZC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gaXMgZXZlbnRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzRXZlbnRlZChpdGVtLCBlbnRpdHkpIHtcbiAgcmV0dXJuIGlzTWV0aG9kSW5TdHJpbmcoZW50aXR5LmV2ZW50ZWQsIGl0ZW0pO1xufVxuXG4vKipcbiogd2hpY2hXYWl0ZWRSZXR1cm4gLSBjaGVja3MgaWYgYSBsaW5lIG9mIGNvZGUgaW5jbHVkZXMgYSB3YWl0ZWRSZXR1cm4gbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgd2FpdGVkUmV0dXJuIG1ldGhvZCBmb3VuZCBvciBudWxsLlxuKi9cbmZ1bmN0aW9uIHdoaWNoV2FpdGVkUmV0dXJuKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gZW50aXR5LndhaXRlZFJldHVybmVkLmZpbmQoKG1ldGhvZCkgPT4gKGl0ZW0uaW5kZXhPZihgLiR7bWV0aG9kfShgKSAhPT0gLTEgPyBtZXRob2QgOiBmYWxzZSkpO1xufVxuXG4vKipcbiogaW5zZXJ0UGFjZWQgLSBpbnNlcnRzIGEgdGltZWQgYXdhaXQgbGluZSBhZnRlciBhbnkgbWV0aG9kIHRoYXQgaXMgb24gdGhlIGxpc3Qgb2YgcGFjZWQgbWV0aG9kcy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gaW5zZXJ0UGFjZWQoaXRlbSwgZW50aXR5KSB7XG4gIGNvbnN0IGNvZGUgPSBgJHtpdGVtfVxcbiBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgJHtlbnRpdHkucGFjZX0pKTtgO1xuICByZXR1cm4gZW50aXR5LnBhY2UgJiYgaXNQYWNlZChyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSksIGVudGl0eSkgPyBjb2RlIDogaXRlbTtcbn1cblxuLyoqXG4qIGluc2VydFdhaXRlZCAtIGluc2VydHMgdGhlIFwibWVjaGFuaXNtXCIgdGhhdCBzdG9wcyBleGVjdXRpb24gYW5kIGF3YWl0cyBmb3IgdGhlIG1ldGhvZCB0byBmaW5pc2guXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgKG11bHRpKWxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRXYWl0ZWQoaXRlbSwgZW50aXR5KSB7XG4gIGxldCBmb3VuZCA9IG51bGw7XG4gIGxldCBjb2RlO1xuXG4gIC8vIGxvb2sgZm9yIHdhaXRlZCBtZXRob2RzLlxuICBmb3VuZCA9IGlzV2FpdGVkKHJlcGxhY2VVc2VyU3RyaW5nV2l0aEJsYW5rcyhpdGVtKSwgZW50aXR5KTtcblxuICAvLyBub3QgYSBub3JtYWwgXCJ3YWl0ZWRcIi4gbG9vayBmb3Igd2FpdGVkUmV0dXJuZWQuXG4gIGlmICghZm91bmQpIHtcbiAgICBsZXQgdGhlVmFyID0gbnVsbDtcblxuICAgIGZvdW5kID0gd2hpY2hXYWl0ZWRSZXR1cm4ocmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKGl0ZW0pLCBlbnRpdHkpO1xuXG4gICAgLy8gY29kZSBmb3Igd2FpdGVkUmV0dXJuXG4gICAgdGhlVmFyID0gaXRlbS5zdWJzdHIoMCwgaXRlbS5pbmRleE9mKCc9JykpXG4gICAgICAucmVwbGFjZSgnbGV0JywgJycpXG4gICAgICAucmVwbGFjZSgndmFyJywgJycpXG4gICAgICAucmVwbGFjZSgnY29uc3QnLCAnJylcbiAgICAgIC50cmltKCk7XG5cbiAgICBjb2RlID0gYCR7aXRlbS5zdWJzdHJpbmcoMCwgaXRlbS5sYXN0SW5kZXhPZignKScpKX0sICcke3RoZVZhcn0nLCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYDtcblxuICAgIC8vIGludm9rZSBpcyBcImZvcmdpdmluZ1wiLiBtYXksIG9yIG1heSBub3QsIGhhdmUgdmFyaWFibGVzLlxuICAgIGZvdW5kID09PSAnaW52b2tlJyAmJiAoaXRlbS5pbmRleE9mKCcsJykgPT09IC0xKSA/IGNvZGUgPSBgJHtpdGVtLnN1YnN0cmluZygwLCBpdGVtLmxhc3RJbmRleE9mKCcpJykpfSwgW10sICcke3RoZVZhcn0nLCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYCA6IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgLy8gY29kZSBmb3IgXCJub3JtYWxcIiB3YWl0ZWRcbiAgICBjb2RlID0gYCR7aXRlbS5zdWJzdHJpbmcoMCwgaXRlbS5sYXN0SW5kZXhPZignKScpKX0sICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgO1xuICB9XG5cbiAgLy8gZW50aXR5LnRyaWdnZXJpbmdJZCBjcmVhdGVzIGEgdW5pcXVlIGNvbnRleHQgdG8gY2hhaW4gdGhlIHdhaXRlZCBtZXRob2RzLlxuICBjb2RlID0gYCR7Y29kZX1cXG4gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibG9ja0xpa2Uud2FpdGVkLiR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nLCBmdW5jdGlvbiB3YWl0ZWRMaXN0ZW5lcihlKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS53YWl0ZWQuJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScsIHdhaXRlZExpc3RlbmVyKTtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7YDtcblxuICByZXR1cm4gZm91bmQgPyBjb2RlIDogaXRlbTtcbn1cblxuLyoqXG4qIGluc2VydEFzeW5jIC0gQWRkcyBrZXl3b3JkIGFzeW5jIHRvIGZ1bmN0aW9uIGRlY2VsZXJhdGlvbiBpZiBub3QgcHJlc2VudFxuKiBXaWxsIGNhdGNoOlxuKiAtIGFsbCBuYW1lZCBmdW5jdGlvbiBkZWNlbGVyYXRpb25zIHdpdGggYSBzcGFjZSBhZnRlciB0aGUga2V5d29yZCAnZnVuY3Rpb24nXG4qIC0gYW55dGhpbmcgdGhhdCBoYXMgYSBmYXQgYXJyb3cgd2l0aCBhbnkgb2Ygc2V2ZXJhbCB2YXJpYWJsZSBwYXR0ZXJucyBiZWZvcmUgaXQuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRBc3luYyhpdGVtKSB7XG4gIGNvbnN0IGV4aXN0ID0gaXRlbS5pbmRleE9mKCdhc3luYyAnKTtcblxuICAvLyBmdW5jdGlvbiBkZWNsYXJhdGlvblxuICBsZXQgcmVnRXhwID0gL2Z1bmN0aW9uKFxccyo/W2EtekEtWl1cXHcqXFxzKj9cXCh8XFxzKj9cXCgpLztcbiAgbGV0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3MoaXRlbSkpO1xuXG4gIC8vIG9yIGFycm93XG4gIGlmICghbWF0Y2hlcykge1xuICAgIHJlZ0V4cCA9IC8oW2EtekEtWl1cXHcqfFxcKFxccyo/W2EtekEtWl1cXHcqKCxcXHMqW2EtekEtWl1cXHcqKSpcXHMqP1xcKSlcXHMqPz0+LztcbiAgICBtYXRjaGVzID0gcmVnRXhwLmV4ZWMocmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKGl0ZW0pKTtcbiAgfVxuICByZXR1cm4gZXhpc3QgPT09IC0xICYmIG1hdGNoZXMgPyBgJHtpdGVtLnN1YnN0cmluZygwLCBtYXRjaGVzLmluZGV4KX1hc3luYyAke2l0ZW0uc3Vic3RyaW5nKG1hdGNoZXMuaW5kZXgsIGl0ZW0ubGVuZ3RoKX1gIDogaXRlbTtcbn1cblxuLyoqXG4qIGVtcHR5TG9vcFByb3RlY3Rpb24gLSBleGFtaW5lcyB0aGUgY29kZSBmb3Igd2hpbGUgYW5kIGZvciBzdGF0ZW1lbnRzIHRoYXQgYXJlIGVtcHR5LlxuKiBOb3RlOiBzaW5jZSB3aGlsZSh0cnVlKXt9IGlzIGxpa2VseSB0byBiZSBjb2RlZCBieSB0aGUgdXNlciB0aGlzIHByZXZlbnRzIGluZmluaXRlIGxvb3BzLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gZW1wdHlMb29wUHJvdGVjdGlvbihmdW5jUykge1xuICBjb25zdCBjaGVjayA9IGZ1bmNTLnJlcGxhY2UoL1xccysvZywgJycpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcnKTtcblxuICBjb25zdCByZWdFeHAgPSAvd2hpbGVcXChbXFxzXFxTXSpcXCl7fXxmb3JcXChbXFxzXFxTXSpcXCl7fXxkb3t9d2hpbGVcXChbXFxzXFxTXSpcXCkvO1xuICBjb25zdCBtYXRjaGVzID0gcmVnRXhwLmV4ZWMoY2hlY2spO1xuXG4gIHJldHVybiAhIW1hdGNoZXM7XG59XG5cbi8qKlxuKiByZW1vdmVPdXRlciAtIFJlbW92ZXMgdGhlIG91dGVyIGZ1bmN0aW9uIGRlZmluaXRpb24gYW5kIHJldHVybnMgdGhlIGZ1bmN0aW9uIGNvZGUgYm9keS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBib2R5IG9mIHRoZSBmdW5jdGlvbi5cbiovXG5mdW5jdGlvbiByZW1vdmVPdXRlcihmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJ3snKSArIDEsIGZ1bmNTLmxhc3RJbmRleE9mKCd9JykpO1xufVxuXG4vKipcbiogcmVtb3ZlQ29tbWVudHMgLSBSZW1vdmVzIGNvbW1lbnRzIGZyb20gY29kZS5cbiogZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE1MTIzNzc3XG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBmdW5jUyAtIHRoZSBmdW5jdGlvbiBiZWluZyByZXdyaXR0ZW4uXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgZnVuY3Rpb24gd2l0aG91dCBjb21tZW50cy5cbiovXG5mdW5jdGlvbiByZW1vdmVDb21tZW50cyhmdW5jUykge1xuICByZXR1cm4gZnVuY1MucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3woW15cXFxcOl18XilcXC9cXC8uKiQvZ20sICcnKTtcbn1cblxuLyoqXG4qIGdldEV2ZW50T2JqZWN0VmFyTmFtZSAtIGV4dHJhY3RzIHRoZSB2YXJpYWJsZSBuYW1lIHRoYXQgaG9sZHMgdGhlIGV2ZW50IG9iamVjdC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSB2YXJpYWJsZSBuYW1lLlxuKi9cbmZ1bmN0aW9uIGdldEV2ZW50T2JqZWN0VmFyTmFtZShmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJygnKSArIDEsIGZ1bmNTLmluZGV4T2YoJyknKSk7XG59XG5cbi8qKlxuKiByZXdyaXRlIC0gcmV3cml0ZXMgYSBmdW5jdGlvbiB0byBhbiBhc3luYyB2ZXJzaW9uIHRoYXQgaXMgXCJwYWNlZFwiIHVzaW5nIGF3YWl0aW5nIGZvciBwcm9taXNlcy5cbiogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gd3JpdGUgc2VxdWVudGlhbCBzaW1wbGUgY29kZSB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgaW4gYSBwYWNlZCBtYW5uZXIuXG4qXG4qIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGVcbiogQHBhcmFtIC0ge09iamVjdH0gZW50aXR5IC0gYSBzcHJpdGUgb3Igc3RhZ2Ugb2JqZWN0IHRvIHdoaWNoIHRoZSBmdW5jdGlvbiBhcHBsaWVzLlxuKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBhbiBhc3luYyBtb2RpZmllZCBmdW5jdGlvbi5cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXdyaXRlKGZ1bmMsIGVudGl0eSkge1xuICBsZXQgY29kZSA9IGZ1bmMudG9TdHJpbmcoKTtcbiAgY29uc3QgdGhlVmFyID0gZ2V0RXZlbnRPYmplY3RWYXJOYW1lKGNvZGUpO1xuXG4gIC8vIHJld3JpdGUgdGhlIGNvZGVcbiAgaWYgKGVtcHR5TG9vcFByb3RlY3Rpb24oY29kZSkpIHtcbiAgICBjb2RlID0gJ3Rocm93IFxcJ0Jsb2NrTGlrZS5qcyBFcnJvcjogRW1wdHkgbG9vcCBkZXRlY3RlZFxcJzsnO1xuICB9IGVsc2Uge1xuICAgIGNvZGUgPSByZW1vdmVDb21tZW50cyhyZW1vdmVPdXRlcihjb2RlKSk7XG4gICAgY29kZSA9IGNvZGUuc3BsaXQoJ1xcbicpLmZpbHRlcigoaXRlbSkgPT4gaXRlbS50cmltKCkubGVuZ3RoICE9PSAwKTtcblxuICAgIC8vIGNvdW50ZXIgZm9yIG9wZW4gcGFyZW50aGVzZXMuXG4gICAgbGV0IGV2ZW50ZWRPcGVuUGFyZW4gPSAwO1xuXG4gICAgY29kZSA9IGNvZGUubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCB0ZW1wID0gaXRlbTtcbiAgICAgIGxldCByZXN1bHQgPSB0ZW1wO1xuXG4gICAgICAvLyBpbnRlcm5hbCBldmVudGVkIG1ldGhvZHMgYXJlIHNraXBwZWRcbiAgICAgIGlmIChpc0V2ZW50ZWQodGVtcCwgZW50aXR5KSB8fCBldmVudGVkT3BlblBhcmVuKSB7XG4gICAgICAgIGV2ZW50ZWRPcGVuUGFyZW4gKz0gKGNvdW50Q2hhcihyZXBsYWNlVXNlclN0cmluZ1dpdGhCbGFua3ModGVtcCksICcoJykgLSBjb3VudENoYXIocmVwbGFjZVVzZXJTdHJpbmdXaXRoQmxhbmtzKHRlbXApLCAnKScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGEgbWV0aG9kIGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyBidXQgbm90IG1vcmUgdGhhbiBvbmVcbiAgICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0UGFjZWQodGVtcCwgZW50aXR5KSA6IG51bGw7IC8vIG1vcmUgbGlrZWx5XG4gICAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydFdhaXRlZCh0ZW1wLCBlbnRpdHkpIDogbnVsbDsgLy8gbGVzcyBsaWtlbHlcblxuICAgICAgICAvLyBhbmQgb25seSBpZiBub3QgYSBtZXRob2Qgd2lsbCBhZGQgYXN5bmMgdG8gZnVuY3Rpb25zXG4gICAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydEFzeW5jKHRlbXApIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgICBjb2RlID0gY29kZS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8vIHRyYW5zZm9ybSB0aGUgdGV4dCBpbnRvIGEgZnVuY3Rpb25cbiAgY29uc3QgQXN5bmNGdW5jdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyAoKSA9PiB7fSkuY29uc3RydWN0b3I7XG4gIGxldCBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKGNvZGUpO1xuXG4gIC8vIHBhc3MgdGhlIGV2ZW50IG9iamVjdCB0byB0aGUgZnVuY3Rpb24gaWYgZXhpc3RzLlxuICB0aGVWYXIgPyBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKHRoZVZhciwgY29kZSkgOiBudWxsO1xuXG4gIHdpbmRvdy5ibG9ja0xpa2UgJiYgd2luZG93LmJsb2NrTGlrZS5kZWJ1ZyA/IGNvbnNvbGUubG9nKGFmKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gIHJldHVybiBhZjtcbn1cbiIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnQgb2YgdGhlIHNwcml0ZS5cbiAqIEVhY2ggU3ByaXRlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIEVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSBmb3Igd2hpY2ggdGhlIGVsZW1lbnQgaXMgY3JlYXRlZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdG8gd2hpY2ggdGhlIHNwcml0ZSBpcyBhZGRlZC5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCBzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbC5pZCA9IGAke3Nwcml0ZS5pZH1gO1xuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBlbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdtYW5pcHVsYXRpb24nO1xuXG4gICAgc3RhZ2UuZWxlbWVudC5lbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC4gVGhpcyBpcyBhbHdheXMgY2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3Rvci5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZWw7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICAvLyBDb3N0dW1lXG4gICAgaWYgKHNwcml0ZS5jb3N0dW1lKSB7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IGAke3Nwcml0ZS5jb3N0dW1lLnZpc2libGVXaWR0aH1weGA7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlSGVpZ2h0fXB4YDtcbiAgICB9XG5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4fXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5fXB4YDtcbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcblxuICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBgJHsoc3ByaXRlLnNob3dpbmcgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9YDtcblxuICAgIC8vIExlZnQgb3IgcmlnaHQgcm90YXRpb25cbiAgICAvLyBEaXJlY3Rpb24gZGl2aWRlZCBieSAxODAgYW5kIGZsb29yZWQgLT4gMSBvciAyLlxuICAgIC8vIFN1YnRyYWN0IDEgLT4gMCBvciAxLlxuICAgIC8vIE11bHRpcGx5IGJ5IC0xIC0+IDAgb3IgLTEuXG4gICAgLy8gQ3NzIHRyYW5zZm9ybSAtPiBOb25lIG9yIGZ1bGwgWC5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMSA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHsoKE1hdGguZmxvb3Ioc3ByaXRlLmRpcmVjdGlvbiAvIDE4MCkgKiAyKSAtIDEpICogLTF9KWAgOiBudWxsO1xuXG4gICAgLy8gRnVsbCByb3RhdGlvblxuICAgIC8vIFNwcml0ZSBcIm5ldXRyYWwgcG9zaXRpb25cIiBpcyA5MC4gQ1NTIGlzIDAuIFN1YnRyYWN0IDkwLlxuICAgIC8vIE5vcm1hbGl6ZSB0byAzNjAuXG4gICAgLy8gQ3NzIHJvdGF0ZSAtPiBOdW1iZXIgb2YgZGVncmVlcy5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMCA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHsoKHNwcml0ZS5kaXJlY3Rpb24gLSA5MCkgKyAzNjApICUgMzYwfWRlZylgIDogbnVsbDtcblxuICAgIC8vIENTUyBydWxlcyBjbGFzc2VzIGFuZCB0aGUgYmFja2dyb3VuZCBjb2xvci5cbiAgICAvLyBUaGUgY29zdHVtZSBjb2xvciBzZXR0aW5nIG92ZXJyaWRlcyBhbnkgQ1NTIHNldHRpbmcuXG5cbiAgICAvLyBUaGVyZSBpcyBubyBjb2xvciBwcm9wZXJ0eSB0byBjdXJyZW50IGNvc3R1bWUgLSBzbyByZXNldCB0aGUgYmFja2dyb3VuZC1jb2xvciBwcm9wZXJ0eSBvZiB0aGUgZWxlbWVudC5cbiAgICAhc3ByaXRlLmNvc3R1bWUgfHwgIXNwcml0ZS5jb3N0dW1lLmNvbG9yID8gZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJycgOiBudWxsO1xuXG4gICAgLy8gYXBwbHkgQ1NTIHJ1bGVzIChtYXkgaW5jbHVkZSBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgIGNzcy5hcHBseShzcHJpdGUpO1xuXG4gICAgLy8gYXBwbHkgQ1NTIGNsYXNzZXNcbiAgICBzcHJpdGUuY29zdHVtZSA/IGVsLmNsYXNzTmFtZSA9IHNwcml0ZS5jb3N0dW1lLmNsYXNzZXMuY29uY2F0KHNwcml0ZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzcHJpdGUuY2xhc3Nlcy5qb2luKCcgJyk7XG5cbiAgICAvLyBUaGVyZSBpcyBhIGNvbG9yIHByb3BlcnR5IHRvIGN1cnJlbnQgY29zdHVtZSAtIHNvIGFwcGx5IGl0IGFuZCBvdmVycmlkZSBDU1MgcnVsZXMuXG4gICAgc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzcHJpdGUuY29zdHVtZS5jb2xvciA6IG51bGw7XG5cbiAgICAvLyBJbWFnZS5cbiAgICBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgZWwuZmlyc3RDaGlsZCkgeyAvLyBoYXMgaW1hZ2UgZnJvbSBwcmV2aW91cyBjb3N0dW1lXG4gICAgICBpZiAoIXNwcml0ZS5jb3N0dW1lLmltYWdlKSB7IC8vIG5lZWRzIHJlbW92ZWQgYXMgdGhlcmUgaXMgbm8gaW1hZ2UgaW4gY3VycmVudCBjb3N0dW1lLlxuICAgICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUuaW1hZ2UgIT09IHRoaXMuZWwuZmlyc3RDaGlsZC5zcmMpIHsgLy8gbmVlZHMgcmVwbGFjZWRcbiAgICAgICAgdGhpcy5lbC5maXJzdENoaWxkLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuaW1hZ2UpIHsgLy8gbmVlZHMgYW4gaW1hZ2UgaW5zZXJ0ZWQuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblxuICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBpbWFnZS5zcmMgPSBzcHJpdGUuY29zdHVtZS5pbWFnZTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB9XG5cbiAgICBlbC5maXJzdENoaWxkID8gZWwuZmlyc3RDaGlsZC5kcmFnZ2FibGUgPSBmYWxzZSA6IG51bGw7XG5cbiAgICAvLyBJbm5lci4gTXVzdCBieSBkb25lIGFmdGVyIHRoZSBpbWFnZVxuICAgIHNwcml0ZS5jb3N0dW1lICYmIHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA/IGVsLmlubmVySFRNTCA9IHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA6IG51bGw7XG5cbiAgICAvLyBUZXh0IFVJIGdvZXMgd2hlcmUgc3ByaXRlIGdvZXMuXG4gICAgc3ByaXRlLnRleHR1aSA/IHNwcml0ZS50ZXh0dWkudXBkYXRlKHNwcml0ZSkgOiBudWxsO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBkZWxldGUuXG4gICovXG4gIGRlbGV0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gMTAwMDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5pbXBvcnQgU3RhZ2VTdXJmYWNlIGZyb20gJy4vc3RhZ2Utc3VyZmFjZSc7XG5pbXBvcnQgU3ByaXRlRWxlbWVudCBmcm9tICcuL3Nwcml0ZS1lbGVtZW50JztcbmltcG9ydCBDb3N0dW1lIGZyb20gJy4vY29zdHVtZSc7XG5pbXBvcnQgVGV4dFVpRWxlbWVudCBmcm9tICcuL3RleHQtdWktZWxlbWVudCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgU3ByaXRlLlxuICogU3ByaXRlcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoe1xuICogICBjb3N0dW1lOiBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICogICAgIHdpZHRoOiA1MCxcbiAqICAgICBoZWlnaHQ6IDUwLFxuICogICAgIGNvbG9yOiAnI0EyREFGRicsXG4gKiAgICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqICAgfSlcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoe1xuICogICAgIHdpZHRoOiA1MCxcbiAqICAgICBoZWlnaHQ6IDUwLFxuICogICAgIGNvbG9yOiAnI0EyREFGRicsXG4gKiAgICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29uZmV0dGkgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgnaHR0cHM6Ly93d3cuYmxvY2tsaWtlLm9yZy9pbWFnZXMvY29uZmV0dGkuc3ZnJyk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYXJlWmVyb1NpemVkU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUobnVsbCk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFNwcml0ZSB0byBiZSBhZGRlZCB0byBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIHNwcml0ZSBhbmQvb3Igb3B0aW9ucyBwYXNzZWQgdG8gY29zdHVtZS5cbiAgKiBBbHRlcm5hdGl2ZWx5IGFuIGltYWdlIFVSTC4gSWYgYSBVUkwgaXMgcHJvdmlkZWQgZGVmYXVsdCBjb3N0dW1lIHdpbGwgYmUgc2l6ZWQgdG8gaW1hZ2UuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFjZSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIGVhY2ggcGFjZWQgbWV0aG9kLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmNvc3R1bWUgLSBBIGRlZmF1bHQgQ29zdHVtZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy53aWR0aCAtIHRoZSBjb3N0dW1lIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyAxMDAuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gdGhlIGNvc3R1bWUgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyAxMDAuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaW1hZ2UgLSBhIFVSTCAob3IgZGF0YSBVUkwpIGZvciB0aGUgY29zdHVtZSBpbWFnZS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb2xvciAtIGEgY3NzIGNvbG9yIHN0cmluZyAoJyNmZjAwMDAnLCAncmVkJykuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMgLSBhIFVSTCAob3IgZGF0YSBVUkwpIGZvciB0aGUgY29zdHVtZSBpbWFnZS5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2hlZXB5ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRjhBQUFCZUNBWUFBQUJGRU1oUUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQVJza2xFUVZSNDJ1MWRCMVJVMXhaRlFab1VFUlZGUmJGalZ3UUxLb3FnQmp2Z1Z4R2oyR012c1d1STBVUmk3NzJYYnpmMlhtSnYyRnZzeHQ0VllSb0RjLzQrVDNUeEVXYmVOSnF6MTdwcm1KbjNIbS8ydS9mY2MwKzdabVltbUdCQzFrUXhLeXVyUlhaMmRrL3dLc0hyTTJ0cjYyWDR2SlNKR2lNaVI0NGNIVUM0ckUrZlBvcW9xQ2k2Zi84K1hieDRrUVlPSEJpSEJ5REQ5OTJUSEc2RjFpWlhybHpMSFIwZGQrRjFDZDRIOFdWTVRHcVBwZzRPRGpJbVBTVmN2WHFWbkp5Y3BEZ3VCTTNIMXRiMlZmbnk1U1dUSmsyaUJRc1cwSVFKRTZoa3laSVNmUDRFMzFjeDBTa2VsaUR0OWI1OSswZ2REaHc0UUphV2xwL1E1S3RXclZJbC8xNmxVdEhjdVhNVFdGeDlUMklxTjFwYmMzUHorVGx6NWp3TE9YMFQ3VHBFeFM1OC9nZWFINXFGbXZNYkJRWUdTa2dERWhJU3VQY256Sm8xUzZYdXVMRmp4OFpqRkozUDZxU1hSUy9ibkQxNzlvVENoUXZMT25ic21EQng0a1JCREtBSDByQmh3NmhSbzBZSzlPbzRHeHViOXhZV0ZyL2huRnpKcmxFOWI5Njh4OTY4ZWFPSmU0cUppYUd5WmNzS0QwRWRGQXJGRnhGVk1TdVNiZzBpZjBkVGd2QzR5NWN2YXlSajI3WnRWS05HRFFtTERad2Z4ZzhCbzJNL3kvbWxTNWVxU0NTMmJ0MHE2cmlRa0pCWS9JK2ZzaHJ4QlNCTzdwUW9VVUo2K3ZScDBoYWJOMjhtZTN0N0JZaC9FeHdjTEpOS3BmVHAweWZSNTMvOCtGSFVjYU5HalVyQXZZN0xTc1M3UVh3OFJxOVNjRy9XRllNSER5WnZiMjlTS3BWa0xFUkhSMU9lUEhtNDkxZktDc1RibzhjL2J0Kyt2U0krUGw1blVsZ2pLVlNvRUowN2Q0Nk1qWU1IRDZvdzM3ekR2ZWZKMU14RGkxbnQ2K3NyMXpUWmFjS2pSNDhvZCs3Y2xGYm8wS0dESEE5Z2RtYm12am5JbHo5OStsUnZNcTVkdTBaRml4Wk5NL0paR1FENTd6TXI4ZGxBL0lObHk1WVpoSXozNzk4VHhCZkZ4c2FtQ2Zrc0lsa1ZackdaK0h1Y2VVMkNOZ1l0TXJFTlFHdUI1b1htaW1adWxKVWtXa3ZjekFJUWVnRTk0amxVdjFpOHZvQjk1QUMrRzhWNmQvSmx2NHVMaTlTUWsyUE5talVKNm1XYWtNK0tRYlpzMlZUNEhlVnRiS3pYNCs4RTEvejVwRUhOR2trNmg0WEl3ME9ENWZWcVY0OXhLK1FhWTIxbEZZZmorUGdFRzJ2ck4xWldsdHZ4dnI2K3BEdkJLRFVUUkVmREFDWHYyYk9uY3NtU0piUnAweVpoeWI1aHd3WWFQMzQ4K2Z2N1MzR2NFZy9qUWFJdW5oMXE0ZW5wMDZlTDBzTWxFZ2xQY2pSaXhBaXFXN2NPWkxzVDhZL0Jlb0JLRkM5TzRlSGhkUGp3WWRxN2R5L2x6NStmSGo1OG1PcTFlR1M4ZlBtU1dCWFZCMGVPSE9HUkZtMWhZUjRYMUt5aDh0eWh6VVFmN3FiYVlwOWRwVnZuOXRIZVRVdHBVTy9PU2t2TEhISG9yRU4wSmI0VnJ5NDlQVDBWR3pkdXBMaTRPTFUzKys3ZE80cU1qQ1E4SkFYT3V3eVRRVHlMaXRTR05KTTVmUGh3cW9YZWpBZEh1UndkcVVXVEFKbzE4UmM2c1hjZDNiOTBtQzRlM1VhYlZzeW16bUd0eWNIZW5qdzlxMUtQSGowSUsxdGgwWlIwRW1jOW5sZkdMdm55NHNkM29YSmxQZWp4NDhmZi9HK2VmMDZlUEtsMnRjdmZRYk5TT3RqYnhlL2V1Rmd0NmFtMVBadVdjT2VSYWkyclFkNE1MR1lVQ3hjdUZGUThiZlhrYnQyNktkRnJWS2RPbmZybSs3Tm56MUxwMHFYSUdiMjdVMmd3TFp3K25xNmYzazBKNzI2ci9URWZIbDJnVVlON2tTVWVsTFcxRlJVdVZCQVBJUS81WXFSNFZmTWttQ3VvYVdNL2VuVDFiMUs5djBPL0R1OG5qQ0IrSVB2Mzc2Y3paODdRaWhVcnlLOStQY3J0NUVUdDJyV2xsTlljL0hzYk5HaEE5blk1VlZkUDd0U0plRzZYais4Z2MvUHNTbTNtQVo0a0Y4UGVJbWZWVGg5TW16YU44QUJwejU0OVh6OTcrL1l0Um9halFJenN4WFdkZnRUZk85ZVFYVTVibWowcFFoZ1pXMWJOb1ozckY5SHpmMDU5Y3l5TGdhSDl1NU52N1JyazVWbVpnbHNFMHBKWkUrajEzYlBVMkw4ZWxmWHdJTzVnYkhhK2VmTW1yVm16aGlwWHFrUVc1dWEwZmUwQ25Zbm5OcmgzbDRTY05qWkh4UnRlckswam9jNUpEYUVhTWxhdlhrMllrT24yN2R2Q2U3YlRGSGN2b3RlUCtqS2tNY25SUCtmMjYzd05IaDJyRjA2aGdQcDFxRUIrRjBGYzFhN3BSWUVCOWNpN2FrVzk3bzg3QmR1dlFHbE5zZHdIUU56STFVMW11bURreUpGVXFsUXBRUnhkdW5TSm9EblF1d2RSZWorQTlxMmJVM2o3WUwydms3elY4cTVLY3liL3F2UDVMMjZmb254NW5XVVdGdGtuaURZQmdQalhpeFl0VWhsYVplT0ptbFhFMGFOSEMrOTlmZXRTbTZBbVFzL1RoeVFXUDQ0TzlucGZKM2tyNUpxZkRtNWRvZE81TEVxclZpb25od1Rad3hxZktPWXhSQWFCSUpteGRPYno1ODhMNG9jMW9nY1BIcENMU3o3cTNUVk1MK0o0OUxBNit2TDJhWU9TWDdKNFVmcHI5VnlkeEZqYjRLWktqT3k3U1JabW1ybkhKUHNxNmNSb0REUnYzcHpHakJrai9IM3IxaTBxV05BVllpT0U0dC8rb3hOSnoyNmRGTWovOU9TeVFjbnZGQnBFUGNMYmFuM2UrRkVEVk5EdG96bUtRaHZWTWdnTzVGaHRWVXB0d1F1ZnBIby9qNEJpN3U2Q0NJcDdmVXZySDh1VFpYRjNONFBML0tnamZ3bVQrYlZUdTBTZk0rMlBrU3BJRHptNHJLMmR2ZGZlZmhVV1J5cEtCeng3OWd6dVBROXEwcWcrU1o1ZkZmMWorZGl5cFV2UWhJaWZEVTQrdDZIOXUxSEJBaTUwYlBkYXRjYzl1WEdjL3RNeVVKSFk0K3RwYjJ5M3QzL0dLNzcwQXZ0Z3ZiMjlxRUs1TXFKNkd5KzIvT3ZWNG9tTkZLOXVHb1Y4bHQvOFlHR25JVjhmYjJFaHlPWUZIaFVuOTYyblZRc21VNnVtRGVXc1R0cmEybXhsTDUwdUpnUlgyRzNpTkprT2pBMlpUQ2FZRFhBdjFLMWpHenF5WS9VM3hMNjVkNDVtUkk2QlBwNUhJTjhRNnFxbTl2ajZNV0ZkWW1kbkd3TTdUVHpQTVRDYndMRnZjeGZ2SitKOUJYME1aMzZsUzVlT3BneUM2OWV2VS9mdTNSQkJrRXN3cWhWMUsweXdKRkorRUE2TElYbDdWcVRsYy84MHVIcXBydjAyc2o5WldWcGVNSWFwT05UUHorOFRaVER3U0dTTmFPM2F0WlRUMXBhTzcxbW50cWV6SWE1eUJRK3FYYU1hM1lrNm9CZlpQTG9hTjZoTEU4Y09FOTd2MzdLYzF4TXZqVUYrZU5PbVRXTW9nMkxYcmwzazUrdWprVERXZWxna2NHdlNzSjdPeFBNRSsrVTYzTmlNOGY1aEZPV3dzSWdYdldqU0FtM3ExNjhmblZISm56ZHZIdVlBelRwMzRZSUZ2aElXVU45SFovSjVjWldVZko1WStYT1lsbG1OZERNMCtiV0tGU3YyS2FPU3p5WUp0b0JxSXUzQVh5dW9UTWxpNUFXRG1EYjZlZkxHazN3em1LWGhRS0dHZnJWSit1S2E4SG5GOHFVLzZxUkthb3FuZ2ZkSm5sSEpEKy9Va1JiUC9DUE5KdGZVV3V1V1A4U0FxeTZHSnQ4Q1hpUzliZmZHUXNNQWYwSHVwamY1RWNQNkpsaGFXa1FhZk1aRnpPT3VHVE5tcURJaStkV3grRHB6WUZPNms4K0xMQ2RIaC84YVJlT3BVNmRPaHBUN05hcDcwK2tERzlPZC9MVkxwc0VsNmJqYkdPVG40YVFCZHFObE5OU3FXVU5ZenFjMytleFNkTXJseUJwUFkyUGtORTJCeVRjMm81RmZwN2FQWUdwSWIvSjNiVmhFVlNwWGdoZk9KZzRLeWpKRDUyOXg3NWV5aHo4NU9QNkZKMlMydjZRMXd0cUgwdExaa2VsTy9zcjVrNFI3WVJjclhLSXltOCtPY1FlRHNROURVVjhFSkVrK2ZQZ2dMTzA1SEp0OXIvaWNzL3JTcGVkSFJFUUk0U0xwVGY2VThTTm93SUQrWDBOakVQZ3J3d2k0WXZZNXM5RkFhU1BXMXNjS0ZDaVFBTXNkQlFRRUNHRVZiT3d5dHFNbE5heGN1Ukt1dVdZR0lYRDkwaGxVd0NVdmJFVTJncjFlbTNPSDlPc21ST1lsRFNXc1VxV0tCSHpOTXdqdmtQdVQyVDdkcjE4L2V2TGtTWWFRK1J3cFhNU3RrRUhJYnhIby85VnNvSzNqdlZFRFg5cXlaY3YvM2R1Ly8vNHJaTW9rQnNycUhrS1BJWFFDSWthZUZva0gyb0JIWEQ2RUJuSkVtNzdrczZNZGl5VWEyQ3VjTGgzYkx2bzhkbkU2T2pnSVhyZmtXTGR1SGNILy9VeER4bVRxaml5Y0hPWGo0eVBYSnI4cExkR3IxMDgwdUU4WG5RaGZNRzJjRU1ENnhXNnpjZmtzUWZ4OGNkcnpxNll3RVk3VnJGU3hRcXIzVjZGQ2hWak1pejIwWmg3aGZGc1FZU3hQRDAxR0xDNWN1Q0FFeWJJblMxdnlRME9hVWZWcWxZUVZLb2VFK0ZUM0ZPeitiSzluMHV2VXJDWUVTYW03UmdPWXRLZE1tWkxxL1hFVUhqcndVNjJJeDZRYWltaGZXV3FSeEJrSlRaczBvVkJFcUdsTFB2ZHNqdW5zMkM1SWlPbjhFdGpFSTRrZlFtVEVFTFdSRTF2WHpFTnluTFBhVEVhT2FJYnNsM0VjdjFqdW5SSFZHOHN4OFprQlhNakMwZEdCL3Z4MWFKcXBseHdIaWxVdExWNjhXT1A5SWRsUEJ0RXpVcXhLT2JaRml4Wnl5a1RZc1dPSDRHQmZOT04zb3hQLzl2NTVpQ2wzK0pPN2k3bzNkbmNpTCtHc0dPNXRPT09DNCtRekd6Z2hnaE1wV0dzeEZ2RXNsbXBoYm1qZXJCbUpUVjNsRUhQTW42L0ZrQitHYkpNWXlxUll2MzY5a0FneHBGOVhqUWtWMmphVy95RXRmaEFDdVhpbEx4YXNLU1ltejVscnN0K3Zueng1c29veU1RNGRPaVRNQVp5SkV2MzRra0dJWjVjaEw4VGMzWXVTTHM0bGRBaUZ4dUFwREk5WG1WSGtKQWNuWEhBUExWYlVqUTV0VzZrWDhSejI1MW01QXBVb1VUekZQQzR4U0V5R2NGWWJvWVluRkdmTTJnVnBDUjd1eVA4U2pIOC90bTBsNUdOcFN6eXJvSG1jYzVPUFR5MFNVejRtSmJEbEY5eXFOSzEwNnlCYUlacXlHRGd0bFpQc2tQOUtQM1VPRlpMUnhDU3NJYWRXZUhCc3o5Sm5vZm44K1hQV3hPU2FKdHVXcUYyVDVjaG44R2ptT0o4aVJUNEhVRlZFNEMwdnBuaWh4QUd1OXk0ZUVod3pVMzhmQ1cybXFoQis2T1ZWalk0ZVBhcjMvK2JjQmlSLzNOWkVmZ2o4dFZtUy9LUXJ6cDA3ZC9MQ1IwakFTQm9FeFkxTENLQmVqeEFOWnlnTUdqUklDWEUrUldOZ0xNcGRpU0kvdld6NGhnWm5WcksxbGtVVCt5YU1ZY2Z5OFBEZytQeEFUZVNYeEVwTUtxYjNtQ0FPVjY1Y29jU3FoRGsxa1cvTHhSemtjdldXQlgycVFYMXZnQWlUWXJLTkZHdEdmc3BGSGRRWnNVelFQTGx6ajc5ejV3NmJPN2ppU0VGUjVHT0lUTzNidDIrS3FTaTh3RENKSE0xZzkyWllXQmo3Y2FYZ2M1bzJwbnhmVjFmWDJKUklacmVZQ1pyQm1aUmNWd0loSkxjU2F4R0o5Nk93NTRWcjVTVEZ2WHYzQk91Y0NlS0E0aUNzdW5iU3hYZjdvN3U3dXlTcHlaUnIzMlFWOVRJdGdJcmw4VmdkajljcE5KeDdQOHF5ZkdXN1hidDJKa2Exd0p3NWMzaFZ1MW5Ya0JFdnpOU0tFeWRPQ0JvT1Zta21SclhBOXUzYnVlN3lSZDB6SXl3c2hpSkNUVHAxNnRRMEt4eVhWY0JSRlhDY1A5ZXIvQ0o2L3hMTTNFcERHSmkrSjNBSk0xZ0xIdXBkL3hLeTZ6NXZjMkdDZUxCaERoVnVMK2tkcUltTG5NcG9vWUlaSGRpQmdtWCtZVU9RZjNMMzd0MG1SclZUTlZFNzAzS2kvbVcrVWZhRkoxMFR4QU1lUVU0UDlUZEVpSGpFZ0FFRGxDWkt4ZUhWcTFkY2ZVUXB4b3dzQmgxUkFDUEdSS3M0akJzM0xnRWhPQWNObFpUaXlxWlJybWxzZ25wd3BBTHYxd0xPdkEyV0VnUjE4eTc3UGsxUWo5bXpaNnN3UjE0MWJJMTJTOHV4clZxMWtwbm9UUjJjcXd3SFBFZW0xVEowT201dVRnZlZ0SDNTOXdvdURWK21UQmtKYnpWbGxLMGU0QnlZYXVyOTM0SWo0MUQwVmM0cFZHWkczTUF5TDRlUGN6VnRFejdqeFlzWFg5SStUMmxUS1ZaWCtMTmM0eGlYN3huc1dPSmRNdERiRmVDRGkxN1lwc2xPTTV5NWdvMjY1Rm5GcmNpQlVweFl3ZHQvY0ZhN3VvNzErdlZyd25ZakxOK2w0SUgzeW1xVDVsdjlZUElkaC94Y2hib3drOHdHanFsRVFUOWVuZkxlS3lwazJVdndRRlNjL3RPNmRXc2x5bHhLT2NrQnF1UjFVTkNiTlhDejlBSnVwQ2N2b3hGcUVwOFpzaGJGZ0FQR1lKZmhDTE01YUp6RU5oZHRBZHBVTk40eHVxUlpCa0lsaklBb2xuMzhFSTRmUDU1aVJCdC94cGJSenAwN0V5b1dFcXBYQ1Z1aDZnb09TTUwvRkdJc0RXeU5qTU4xejVzWmFVOHJvMDNFOEhodDQyclphUEVjL1lDSVp5azNWQ0dYY1FWWVoyZG42dCsvUCtucm1HRzVpK0JUcm0wVGYvZnVYWU1SejdzZThWb0d2OFhkTEpPQ3k1eHdxZktPaWNPVUcrOHYvak1uQ0NTUEI5SkZ0V094Z0VpdzNaand4a0UyeTI3Y3VHRVE0bmt2TDl4bnNGa1dSV04rQU5oVFZtTXdia3JnVkhyT2lnZnhXNzRzWm5DOVgxams2U3ArT0RKdjVzeVpxc1NZeWlDekxJNnF2Rk9jbTV1YmpNTVB4VlFvWjJkMHk1WXRGU0NJUlVMZjVQSVlrMzRYVGpqcjJyV3JramRCRUFzZU1WNWVYaktNb0xlNFRDT3o3d1FzbXZyQlhQRVcxbElGMUxsNExsekVhbXRVVkpTd1lSanY3TXc3Q1dIdTRQbENqbU5YYTRqMjljQUlPTVlKZmJpZWtqY2VTMmwwOFY1Y3ZCa1pLcWx3U240Q2pwK2ZyaXBqT29KN2NDQjY3bnhNMXJjVGUvYm5EUnp4WUtCUDcwbWNPK3kwdUdZTm5Mc0twSDdDOWVKNTg4dHk1Y3BKa0hFandjS1E3ZXlzSlQwQjhhUHhkMkV6RTR5ekRESDd2SGxBVUpLSlB5Z2phakwvQTE1RXh5K000NExmQUFBQUFFbEZUa1N1UW1DQyc7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICBwYWNlOiAzMyxcbiAgICB9O1xuXG4gICAgbGV0IGFjdHVhbCA9IHt9O1xuICAgIHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyA/IGFjdHVhbCA9IHsgLi4uZGVmYXVsdHMsIC4uLm9wdGlvbnMgfSA6IGFjdHVhbCA9IGRlZmF1bHRzO1xuXG4gICAgc3VwZXIoYWN0dWFsLnBhY2UpO1xuXG4gICAgLy8gY29zdHVtZXNcbiAgICB0aGlzLmNvc3R1bWVzID0gW107XG5cbiAgICAvKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgIC0gaW1hZ2UgdXJsLlxuICAgICogdXNlciBjYW4gc2VuZCBhIHVybCBpbnN0ZWFkIG9mIGFuIG9wdGlvbiBvYmplY3QuXG4gICAgKiB0aGlzIHdpbGwgYmUgdHJlYXRlZCBhcyBhIGNvc3R1bWUgaW1hZ2UgdXJsLlxuICAgICogdGhlIGltYWdlIHdpbGwgYmUgc2V0IHRoZSBzcHJpdGUgY29zdHVtZS5cbiAgICAqIHdoZW4gdGhlIGltYWdlIGlzIGxvYWRlZCwgY29zdHVtZSB3aWR0aCBhbmQgaGVpZ2h0IHdpbGwgYmUgc2V0IHRvIGFjdHVhbCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICogc3ByaXRlIHdpbGwgYmUgcmVmcmVzaGVkLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgYWN0dWFsLmNvc3R1bWUgPSBuZXcgQ29zdHVtZSh7IGltYWdlOiBvcHRpb25zLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG5cbiAgICAgIGNvbnN0IG1lID0gYWN0dWFsLmNvc3R1bWU7XG4gICAgICBpbWFnZS5zcmMgPSBvcHRpb25zO1xuXG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBtZS5vcmlnaW5hbFdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIG1lLm9yaWdpbmFsSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS53aWR0aCA9IG1lLm9yaWdpbmFsV2lkdGg7XG4gICAgICAgIG1lLmhlaWdodCA9IG1lLm9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zIC0gcGFzc2luZyBjdXN0b21lIG9wdGlvbnMgdG8gc3ByaXRlLlxuICAgICogaWYgY29zdHVtZSBpcyBub3QgZGVmaW5lZCBieSB1c2VyLCBpdCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgKiB3aGVuIG5vIGltYWdlIGlzIHNldCwgc2hlZXB5IGlzIGRlZmF1bHQuXG4gICAgKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgLSBudWxsLlxuICAgICogdXNlciBjYW4gcGFzcyBudWxsIGluc3RlYWQgb2YgYW4gb3B0aW9uIG9iamVjdC5cbiAgICAqIHRoaXMgaXMgc2FtZSBhcyBzZXR0aW5nIGEgY29zdHVtZSBhcyBudWxsLlxuICAgICogdGhlIHNwcml0ZSB3aWxsIGhhdmUgbm8gY29zdHVtZXMgYW5kIG5vIHNpemUuXG4gICAgKi9cbiAgICBpZiAodHlwZW9mIGFjdHVhbC5jb3N0dW1lID09PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBjb3N0dW1lT3B0aW9ucyA9IHt9O1xuICAgICAgYWN0dWFsLndpZHRoID8gY29zdHVtZU9wdGlvbnMud2lkdGggPSBhY3R1YWwud2lkdGggOiBudWxsO1xuICAgICAgYWN0dWFsLmhlaWdodCA/IGNvc3R1bWVPcHRpb25zLmhlaWdodCA9IGFjdHVhbC5oZWlnaHQgOiBudWxsO1xuICAgICAgYWN0dWFsLmNvbG9yID8gY29zdHVtZU9wdGlvbnMuY29sb3IgPSBhY3R1YWwuY29sb3IgOiBudWxsO1xuICAgICAgKHR5cGVvZiBhY3R1YWwuaW1hZ2UgIT09ICd1bmRlZmluZWQnKSA/IGNvc3R1bWVPcHRpb25zLmltYWdlID0gYWN0dWFsLmltYWdlIDogY29zdHVtZU9wdGlvbnMuaW1hZ2UgPSBzaGVlcHk7XG5cbiAgICAgIGFjdHVhbC5jb3N0dW1lID0gbmV3IENvc3R1bWUoY29zdHVtZU9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIHNldCBjb3N0dW1lXG4gICAgYWN0dWFsLmNvc3R1bWUgPyB0aGlzLmNvc3R1bWUgPSBhY3R1YWwuY29zdHVtZSA6IG51bGw7XG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy5jb3N0dW1lcy5wdXNoKHRoaXMuY29zdHVtZSkgOiBudWxsO1xuXG4gICAgLy8gc2V0IHdpZHRoXG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGggOiB0aGlzLndpZHRoID0gMDtcbiAgICB0aGlzLmNvc3R1bWUgPyB0aGlzLmhlaWdodCA9IHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0IDogdGhpcy5oZWlnaHQgPSAwO1xuXG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMueiA9IDA7XG5cbiAgICB0aGlzLnByZXZYID0gMDtcbiAgICB0aGlzLnByZXZZID0gMDtcblxuICAgIHRoaXMuc2hvd2luZyA9IHRydWU7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSA5MDtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSAxMDA7XG5cbiAgICB0aGlzLnJvdGF0aW9uU3R5bGUgPSAwO1xuXG4gICAgdGhpcy50ZXh0dWkgPSBudWxsO1xuXG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wZW5Db2xvciA9ICcjMjIyMjIyJztcbiAgICB0aGlzLnBlblNpemUgPSAxO1xuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdO1xuICAgIHRoaXMuY2xhc3NlcyA9IFtdO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gd2hpY2ggc3RhZ2UgdG8gYWRkIHRoZSBzcHJpdGUgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2VXaWR0aCA9IHN0YWdlLndpZHRoO1xuICAgIHRoaXMuc3RhZ2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgU3ByaXRlRWxlbWVudCh0aGlzLCBzdGFnZSk7XG4gICAgdGhpcy5zdXJmYWNlID0gbmV3IFN0YWdlU3VyZmFjZShzdGFnZSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZmxhZyA9IHN0YWdlLmVsZW1lbnQuZmxhZztcbiAgICB0aGlzLmFnYWluc3RCYWNrZHJvcCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXI7XG5cbiAgICBzdGFnZS5zcHJpdGVzLnB1c2godGhpcyk7XG4gICAgdGhpcy56ID0gc3RhZ2Uuc3ByaXRlcy5sZW5ndGg7XG5cbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogY2xvbmUgLSBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIHNwcml0ZSBhbmQgdHJpZ2dlcnMgYW4gZXZlbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCBjbG9uZSA9IHRoaXMuY2xvbmUoKTtcbiAgKiAgIGNsb25lLm1vdmUoMTAwKTtcbiAgKiAgIGNsb25lLmFkZFRvKHN0YWdlKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBjbG9uZSgpIHtcbiAgICAvLyBtYWtlIGEgbmV3IHNwcml0ZS5cbiAgICBjb25zdCBzcHJpdGUgPSBuZXcgU3ByaXRlKCk7XG4gICAgLy8gc2F2ZSBpZC5cbiAgICBjb25zdCBpZCA9IHNwcml0ZS5pZDtcbiAgICAvLyBhbmQgYXNzaWduIHByb3BlcnRpZXMuXG4gICAgY29uc3QgY2xvbmUgPSBPYmplY3QuYXNzaWduKHNwcml0ZSwgdGhpcyk7XG4gICAgLy8gcmVhc3NpZ24gdGhlIHVuaXF1ZSBpZC5cbiAgICBjbG9uZS5pZCA9IGlkO1xuXG4gICAgLy8gcmVtb3ZlIERPTSBlbGVtZW50c1xuICAgIGNsb25lLmVsZW1lbnQgPSBudWxsO1xuICAgIGNsb25lLnN1cmZhY2UgPSBudWxsO1xuXG4gICAgLy8gZGV0YWNoIGFycmF5c1xuICAgIGNsb25lLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNzc1J1bGVzKSk7XG4gICAgY2xvbmUuY2xhc3NlcyA9IHRoaXMuY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgLy8gZmlndXJlIG91dCB3aGF0IHRoZSBjdXJyZW50IGNvc3R1bWUgaXMuXG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpO1xuXG4gICAgLy8gZmlsbCB0aGUgY29zdHVtZXMgYXJyYXkgd2l0aCBuZXcgY29zdHVtZXMgYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNsb25lLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNvc3R1bWUgPSBuZXcgQ29zdHVtZSgpO1xuICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbihjb3N0dW1lLCBpdGVtKTtcblxuICAgICAgLy8gZGV0YWNoIGFycmF5c1xuICAgICAgb2JqLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLmNzc1J1bGVzKSk7XG4gICAgICBvYmouY2xhc3NlcyA9IGl0ZW0uY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IGNvc3R1bWUuXG4gICAgY2xvbmUuY29zdHVtZSA9IGNsb25lLmNvc3R1bWVzW2N1cnJlbnRDb3N0dW1lSW5kZXhdO1xuXG4gICAgLy8gYW5ub3VuY2UgYSBjbG9uZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLnNwcml0ZWNsb25lZC4ke3RoaXMuaWR9YCwgeyBkZXRhaWw6IGNsb25lIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRnJvbSAtIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnJlbW92ZUZyb20oc3RhZ2UpO1xuICAqXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlO1xuXG4gICAgY3VyU3RhZ2Uuc3ByaXRlcyA9IHN0YWdlLnNwcml0ZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSB0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnQuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5DbG9uZWQgLSBBZGRzIGEgZG9jdW1lbnQgbGV2ZWwgZXZlbnQgbGlzdGVuZXIgdHJpZ2dlcmVkIGJ5IGEgY3VzdG9tIGV2ZW50LlxuICAqIFRoZSBjdXN0b20gZXZlbnQgaXMgdHJpZ2dlcmVkIGJ5IHRoZSBjbG9uZSgpIG1ldGhvZC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNsb25lKCk7XG4gICogfSk7XG4gICpcbiAgKiBzcHJpdGUud2hlbkNsb25lZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmFkZFRvKHN0YWdlKTtcbiAgKiAgIHRoaXMuZ2xpZGUoNSwgMTAwLCAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5DbG9uZWQoZnVuYykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5zcHJpdGVjbG9uZWQuJHt0aGlzLmlkfWAsIChlKSA9PiB7XG4gICAgICBlLmRldGFpbC5fZXhlYyhmdW5jLCBbXSk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqIE1vdGlvbiAqICovXG5cbiAgLyoqXG4gICogX21vdGlvbiAtIE1vdmVzIHRoZSBzcHJpdGUgdG8gc3BlY2lmaWVkIGxvY2F0aW9uICh4LCB5KS5cbiAgKiBBbGwgdXNlciBtb3Rpb24gbWV0aG9kcyB0cmFuc2xhdGVkIHRvIHRoaXMgbW90aW9uLlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgb2YgdGhlIHNwcml0ZSAoMCBpcyBjZW50ZXIgc2NyZWVuKS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUgZm9yIHRoZSBjZW50ZXIgb2YgdGhlIHNwcml0ZSAoMCBpcyBjZW50ZXIgc2NyZWVuKS5cbiAgKi9cbiAgX21vdGlvbih4LCB5KSB7XG4gICAgdGhpcy5wcmV2WCA9IHRoaXMueDtcbiAgICB0aGlzLnByZXZZID0gdGhpcy55O1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgICB0aGlzLnN1cmZhY2UgPyB0aGlzLnN1cmZhY2UuZHJhdyh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBnbGlkZSAtIE1vdmVzIHRoZSBzcHJpdGUgZm9yIHRoZSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMgc28gaXQgYXJyaXZlcyBhdCBzcGVjaWZpZWQgbG9jYXRpb24gd2hlbiB0aW1lIGlzIHVwLlxuICAqIFByb3ZpZGVzIHNtb290aCBtb3ZlbWVudC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuZ2xpZGUoMywgMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgbGV0IHRpbWUgPSA1O1xuICAqICAgdGhpcy5nbGlkZSh0aW1lLCAxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gdGhlIG51bWJlciBvZiBzZWNvbmRzIHRoZSB3aG9sZSBtb3ZlbWVudCB3aWxsIGxhc3QgKGFuZCB3aWxsIGhhbHQgZnVydGhlciBleGVjdXRpb24gZm9yKS5cbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqL1xuICBnbGlkZShzZWMsIHgsIHksIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIC8vIGRpdmlkZSB0aGUgeCBhbmQgeSBkaWZmZXJlbmNlIGludG8gc3RlcHNcbiAgICBjb25zdCBmcmFtZXNQZXJTZWNvbmQgPSAxMDAwIC8gdGhpcy5wYWNlO1xuICAgIGNvbnN0IHN0ZXBYID0gKHggLSB0aGlzLngpIC8gKHNlYyAqIGZyYW1lc1BlclNlY29uZCk7XG4gICAgY29uc3Qgc3RlcFkgPSAoeSAtIHRoaXMueSkgLyAoc2VjICogZnJhbWVzUGVyU2Vjb25kKTtcbiAgICBjb25zdCBpbnQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBpICs9IDE7XG4gICAgICBtZS5fbW90aW9uKG1lLnggKyBzdGVwWCwgbWUueSArIHN0ZXBZKTtcbiAgICAgIGlmIChpIC8gZnJhbWVzUGVyU2Vjb25kID49IHNlYykge1xuICAgICAgICAvLyAgY2xlYXIgdGhlIGludGVydmFsIGFuZCBmaXggYW55IFwiZHJpZnRcIlxuICAgICAgICBjbGVhckludGVydmFsKGludCk7XG4gICAgICAgIG1lLl9tb3Rpb24oeCwgeSk7XG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICB9XG4gICAgfSwgdGhpcy5wYWNlKTtcbiAgfVxuXG4gIC8qKlxuICAqIG1vdmUgLSBNb3ZlcyB0aGUgc3ByaXRlIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMgaW4gdGhlIGRpcmVjdGlvbiBpdCBpcyBwb2ludGluZy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5tb3ZlKDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBudW1iZXIgb2YgcGl4ZWxzIHRvIG1vdmUuXG4gICovXG4gIG1vdmUocGl4ZWxzKSB7XG4gICAgLyoqXG4gICAgKiB0b1JhZCAtIGNvbnZlcnRzIGEgZGVncmVlIHRvIHJhZGlhbnMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzLlxuICAgICogQHJldHVybiB7bnVtYmVyfSAtIGRlZ3JlZXMgY29udmVydGVkIHRvIHJhZGlhbnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiB0b1JhZChkZWcpIHtcbiAgICAgIHJldHVybiBkZWcgKiAoTWF0aC5QSSAvIDE4MCk7XG4gICAgfVxuXG4gICAgY29uc3QgZHggPSBNYXRoLnJvdW5kKE1hdGguY29zKHRvUmFkKHRoaXMuZGlyZWN0aW9uIC0gOTApKSAqIHBpeGVscyk7XG4gICAgY29uc3QgZHkgPSBNYXRoLnJvdW5kKE1hdGguc2luKHRvUmFkKHRoaXMuZGlyZWN0aW9uICsgOTApKSAqIHBpeGVscyk7XG5cbiAgICB0aGlzLl9tb3Rpb24odGhpcy54ICsgZHgsIHRoaXMueSArIGR5KTtcbiAgfVxuXG4gIC8qKlxuICAqIGdvVG8gLSBNb3ZlcyB0aGUgc3ByaXRlIHRvIHNwZWNpZmllZCBsb2NhdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nb1RvKDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICovXG4gIGdvVG8oeCwgeSkge1xuICAgIHRoaXMuX21vdGlvbih4LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAqIGdvVG93YXJkcyAtIE1vdmVzIHRoZSBzcHJpdGUgdG93YXJkcyBhbm90aGVyIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBvdGhlclNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5tb3ZlKDEwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuZ29Ub3dhcmRzKG90aGVyU3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUgdG8uXG4gICovXG4gIGdvVG93YXJkcyhzcHJpdGUpIHtcbiAgICB0aGlzLl9tb3Rpb24oc3ByaXRlLngsIHNwcml0ZS55KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFggLSBQbGFjZXMgdGhlIHNwcml0ZSBhdCB0aGUgc3BlY2lmaWVkIHggcG9zaXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2V0WCgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlXG4gICovXG4gIHNldFgoeCkge1xuICAgIHRoaXMuX21vdGlvbih4LCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0WSAtIFBsYWNlcyB0aGUgc3ByaXRlIGF0IHRoZSBzcGVjaWZpZWQgeSBwb3NpdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZXRZKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICovXG4gIHNldFkoeSkge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLngsIHkpO1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlWCAtIE1vdmVzIHRoZSBzcHJpdGUgb24gdGhlIHggYXhpcyBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNoYW5nZVgoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBudW1iZXIgb2YgcGl4ZWxzIHRvIG1vdmUuXG4gICovXG4gIGNoYW5nZVgocGl4ZWxzKSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCArIHBpeGVscywgdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVkgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uIHRoZSB5IGF4aXMgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHBpeGVscy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VZKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBjaGFuZ2VZKHBpeGVscykge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLngsIHRoaXMueSArIHBpeGVscyk7XG4gIH1cblxuICAvKipcbiAgKiBwb2ludEluRGlyZWN0aW9uIC0gUG9pbnRzIHRoZSBzcHJpdGUgaW4gYSBzcGVjaWZpZWQgZGlyZWN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBvaW50SW5EaXJlY3Rpb24oNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIGRpcmVjdGlvbiB0byBwb2ludCB0by5cbiAgKi9cbiAgcG9pbnRJbkRpcmVjdGlvbihkZWcpIHtcbiAgICBkZWcgPiAwID8gdGhpcy5kaXJlY3Rpb24gPSBkZWcgJSAzNjAgOiB0aGlzLmRpcmVjdGlvbiA9IChkZWcgKyAoMzYwICogMTApKSAlIDM2MDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHBvaW50VG93YXJkcyAtIFBvaW50IHRoZSBzcHJpdGUgdG93YXJkcyBhbm90aGVyIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBvdGhlclNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5nb1RvKDEwMCwgMTAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wb2ludFRvd2FyZHMob3RoZXJTcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZSB0by5cbiAgKi9cbiAgcG9pbnRUb3dhcmRzKHNwcml0ZSkge1xuICAgIC8qKlxuICAgICogY29tcHV0ZURpcmVjdGlvblRvIC0gZmluZHMgdGhlIGRpcmVjdGlvbiBmcm9tIHNwcml0ZSdzIGN1cnJlbnQgbG9jYXRpb24gdG8gYSBzcGVjaWZpZWQgc2V0IG9mIGNvb3JkaW5hdGVzLlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tWCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBmcm9tWSAtIHRoZSB5IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1ggLSB0aGUgeCBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdG9ZIC0gdGhlIHkgY29vcmRpbmF0ZVxuICAgICogQHJldHVybiB7bnVtYmVyfSAtIGRpcmVjdGlvbiBpbiBkZWdyZWVzLlxuICAgICovXG4gICAgZnVuY3Rpb24gY29tcHV0ZURpcmVjdGlvblRvKGZyb21YLCBmcm9tWSwgdG9YLCB0b1kpIHtcbiAgICAgIC8qKlxuICAgICAgKiB0b0RlZyAtIENvbnZlcnRzIHJhZGlhbnMgdG8gZGVncmVlcy5cbiAgICAgICpcbiAgICAgICogQHBhcmFtIHtudW1iZXJ9IHJhZCAtIG51bWJlciBvZiByYWRpYW5zLlxuICAgICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gcmFkaWFucyBjb252ZXJ0ZWQgdG8gZGVncmVlcy5cbiAgICAgICovXG4gICAgICBmdW5jdGlvbiB0b0RlZyhyYWQpIHtcbiAgICAgICAgcmV0dXJuIHJhZCAqICgxODAgLyBNYXRoLlBJKTtcbiAgICAgIH1cblxuICAgICAgLy8gMSkgRmluZCB0aGUgYW5nbGUgaW4gcmFkLCBjb252ZXJ0IHRvIGRlZyAoOTAgdG8gLTkwKS5cbiAgICAgIC8vIDIpIEZpbmQgdGhlIHNpZ24gb2YgdGhlIGRlbHRhIG9uIHkgYXhpcyAoMSwgLTEpLiBTaGlmdCB0byAoMCwgLTIpLiBNdWx0aXBseSBieSA5MC4gKDAsIDE4MClcbiAgICAgIC8vIEFkZCAxKSBhbmQgMilcbiAgICAgIC8vIE5vcm1hbGl6ZSB0byAzNjBcblxuICAgICAgbGV0IHJlc3VsdCA9ICh0b0RlZyhNYXRoLmF0YW4oKGZyb21YIC0gdG9YKSAvIChmcm9tWSAtIHRvWSkpKSArICg5MCAqIChNYXRoLnNpZ24oZnJvbVkgLSB0b1kpICsgMSkpICsgMzYwKSAlIDM2MDtcbiAgICAgIChmcm9tWSAtIHRvWSkgPT09IDAgPyByZXN1bHQgKz0gOTAgOiBudWxsOyAvLyBtYWtlIHN1cmUgd2UgZml4IGF0YW4gbGltIChkaXZpc2lvbiBieSB6ZXJvKS5cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICB0aGlzLmRpcmVjdGlvbiA9IGNvbXB1dGVEaXJlY3Rpb25Ubyh0aGlzLngsIHRoaXMueSwgc3ByaXRlLngsIHNwcml0ZS55KTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHR1cm5SaWdodCAtIFR1cm5zIHRoZSBzcHJpdGUgaW4gYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdGhlIHJpZ2h0IChjbG9ja3dpc2UpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMudHVyblJpZ2h0KDQ1KTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcyB0byB0dXJuLlxuICAqL1xuICB0dXJuUmlnaHQoZGVnKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAodGhpcy5kaXJlY3Rpb24gKyBkZWcpICUgMzYwO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogdHVybkxlZnQgLSBUdXJucyB0aGUgc3ByaXRlIGluIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkZWdyZWVzIHRvIHRoZSBsZWZ0IChjb3VudGVyLWNsb2Nrd2lzZSlcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy50dXJuTGVmdCg0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdHVybi5cbiAgKi9cbiAgdHVybkxlZnQoZGVnKSB7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSAoKHRoaXMuZGlyZWN0aW9uICsgMzYwKSAtIGRlZykgJSAzNjA7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzZXRSb3RhdGlvblN0eWxlIC0gU2V0cyBvbmUgb2YgdGhyZWUgcG9zc2libGUgcm90YXRpb24gc3R5bGVzOlxuICAqICAgLSAnbm8nIC8gMiAtIHRoZSBzcHJpdGVzIGNoYW5nZXMgdGhlIGRpcmVjdGlvbiBpbiB3aGljaCBpdCBwb2ludHMgd2l0aG91dCBjaGFuZ2luZyB0aGUgc3ByaXRlcyBhcHBlYXJhbmNlLlxuICAqICAgLSAnbGVmdC1yaWdodCcgLyAxIC0gdGhlIHNwcml0ZSB3aWxsIGZsaXAgaG9yaXpvbnRhbGx5IHdoZW4gZGlyZWN0aW9uIGlzIGJldHdlZW4gMTgwIGFuZCAzNjAuXG4gICogICAtICdhbGwnIC8gMCAtIHRoZSBzcHJpdGUgd2lsbCByb3RhdGUgYXJvdW5kIGl0cyBjZW50ZXJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0Um90YXRpb25TdHlsZSgnbGVmdC1yaWdodCcpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUuc2V0Um90YXRpb25TdHlsZSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcyB0byB0dXJuLlxuICAqL1xuICBzZXRSb3RhdGlvblN0eWxlKHN0eWxlKSB7XG4gICAgbGV0IGN1clN0eWxlID0gc3R5bGU7XG5cbiAgICBzdHlsZSA9PT0gJ25vJyA/IGN1clN0eWxlID0gMiA6IG51bGw7XG4gICAgc3R5bGUgPT09ICdsZWZ0LXJpZ2h0JyA/IGN1clN0eWxlID0gMSA6IG51bGw7XG4gICAgc3R5bGUgPT09ICdhbGwnID8gY3VyU3R5bGUgPSAwIDogbnVsbDtcblxuICAgIHRoaXMucm90YXRpb25TdHlsZSA9IGN1clN0eWxlO1xuICB9XG5cbiAgLyoqIExvb2tzICogKi9cblxuICAvKipcbiAgKiBfcmVmcmVzaENvc3R1bWUgLSBTZXRzIHRoZSBjb3N0dW1lIGFuZCBzcHJpdGUgd2lkdGggYW5kIGhpZ2h0IHRoZW4gcmVmcmVzaGVzIGVsZW1lbnQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqL1xuICBfcmVmcmVzaENvc3R1bWUoKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0O1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogYWRkQ29zdHVtZSAtIEFkZHMgYSBjb3N0dW1lIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byBhZGQuXG4gICovXG4gIGFkZENvc3R1bWUoY29zdHVtZSkge1xuICAgIHRoaXMuY29zdHVtZXMucHVzaChjb3N0dW1lKTtcblxuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlLlxuICAgIGlmICghdGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzWzBdO1xuICAgICAgdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGg7XG4gICAgICB0aGlzLmhlaWdodCA9IHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0O1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQ29zdHVtZVRvIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGNvc3R1bWUuIElmIG5vdCBmb3VuZCBmYWlscyBzaWxlbnRseS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5zd2l0Y2hDb3N0dW1lVG8oY29zdHVtZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgY29zdHVtZSB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBzd2l0Y2hDb3N0dW1lVG8oY29zdHVtZSkge1xuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YoY29zdHVtZSk7XG4gICAgY3VycmVudENvc3R1bWVJbmRleCAhPT0gLTEgPyB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzW2N1cnJlbnRDb3N0dW1lSW5kZXhdIDogbnVsbDtcblxuICAgIHRoaXMuX3JlZnJlc2hDb3N0dW1lKCk7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hDb3N0dW1lVG9OdW0gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgY29zdHVtZSBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuIElmIG5vdCBmb3VuZCBmYWlscyBzaWxlbnRseS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5zd2l0Y2hDb3N0dW1lVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgY29zdHVtZSB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBzd2l0Y2hDb3N0dW1lVG9OdW0oaW5kZXgpIHtcbiAgICB0aGlzLnN3aXRjaENvc3R1bWVUbyh0aGlzLmNvc3R1bWVzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiBuZXh0Q29zdHVtZSAtIFN3aXRjaGVzIHRvIHRoZSBuZXh0IGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUubmV4dENvc3R1bWUoKTtcbiAgKlxuICAqL1xuICBuZXh0Q29zdHVtZSgpIHtcbiAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKHRoaXMuY29zdHVtZSk7XG4gICAgdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1soY3VycmVudENvc3R1bWVJbmRleCArIDEpICUgdGhpcy5jb3N0dW1lcy5sZW5ndGhdO1xuXG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUNvc3R1bWUgLSBSZW1vdmVzIGEgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5yZW1vdmVDb3N0dW1lKGNvc3R1bWUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUNvc3R1bWUoY29zdHVtZSkge1xuICAgIGlmICh0aGlzLmNvc3R1bWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YoY29zdHVtZSk7XG4gICAgICB0aGlzLmNvc3R1bWUgPT09IGNvc3R1bWUgPyB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzWyhjdXJyZW50Q29zdHVtZUluZGV4ICsgMSkgJSB0aGlzLmNvc3R1bWVzLmxlbmd0aF0gOiBudWxsO1xuICAgICAgdGhpcy5jb3N0dW1lcyA9IHRoaXMuY29zdHVtZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBjb3N0dW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3N0dW1lcyA9IFtdO1xuICAgICAgdGhpcy5jb3N0dW1lID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUNvc3R1bWVOdW0gLSBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY29zdHVtZSBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuXG4gICogSWYgdGhlcmUgaXMgb25seSBvbmUgY29zdHVtZSwgd2lsbCBmYWlsIGFuZCBlbWl0IGEgY29uc29sZSBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnJlbW92ZUNvc3R1bWVOdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgY29zdHVtZSB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUNvc3R1bWVOdW0oaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUNvc3R1bWUodGhpcy5jb3N0dW1lc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogc2hvdyAtIFNob3dzIHRoZSBzcHJpdGUuIEJ5IGRlZmF1bHQgc3ByaXRlcyBhcmUgc2hvd24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmhpZGUoKTtcbiAgKiBzcHJpdGUuc2hvdygpO1xuICAqXG4gICovXG4gIHNob3coKSB7XG4gICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGhpZGUgLSBIaWRlcyB0aGUgc3ByaXRlLiBCeSBkZWZhdWx0IHNwcml0ZXMgYXJlIHNob3duLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5oaWRlKCk7XG4gICpcbiAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlZnJlc2ggLSBGb3JjZXMgYSBzcHJpdGUgcmVmcmVzaC5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZCB0byBiZSB1c2VkIGlmIGNvc3R1bWUgd2FzIG1hbmlwdWxhdGVkIGRpcmVjdGx5LlxuICAqL1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAvLyB3YWl0IGEgc2VjLi4uXG4gICAgLy8gVE9ETzogVGhpcyBpcyB0byBhY2NvbW9kYXRlIGR5bmFtaWMgaW1hZ2UgcmVzaXplLiBOb3QgaWRlYWwuIFNob3VsZCBiZSBldmVudCBkcml2ZW4uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpbiBjYXNlIGNvc3R1bWUgd2FzIHJlc2l6ZWQgZm9yY2UgYSByZXNldCBvZiBzaXplLlxuICAgICAgbWUuc2V0U2l6ZShtZS5tYWduaWZpY2F0aW9uKTtcbiAgICAgIC8vIHRoZW4gcmVmcmVzaCB0aGUgRE9NLlxuICAgICAgbWUuZWxlbWVudCA/IG1lLmVsZW1lbnQudXBkYXRlKG1lKSA6IG51bGw7XG4gICAgfSwgdGhpcy5wYWNlKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBzcHJpdGUgdG8gdGhhdCBvZiB0aGUgaW1hZ2UgZmlsZSBvZiBjdXJyZW50IGNvc3R1bWUuXG4gICogTm90ZTogc2VydmljZSBtZXRob2QuIFNpbWlsYXIgdG8gY2FsbGluZyByZXNpemVUb0ltYWdlKCkgb24gY29zdHVtZSBhbmQgdGhlbiByZWZyZXNoKCkgb24gc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBjb25zdCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAgKlxuICAqIGNvbnN0IGFuZ3J5U2hlZXAgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICAqICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2QvZGIvRW1vamlvbmVfMUY0MTEuc3ZnLzIwMHB4LUVtb2ppb25lXzFGNDExLnN2Zy5wbmcnLFxuICAqIH0pO1xuICAqIGFuZ3J5U2hlZXAuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIHNwcml0ZS5yZXNpemVUb0ltYWdlKCk7XG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKi9cbiAgcmVzaXplVG9JbWFnZSgpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLmNvc3R1bWUucmVzaXplVG9JbWFnZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICogaW5uZXIgLSBQbGFjZXMgYW4gSFRNTCBlbGVtZW50IGluc2lkZSB0aGUgY3VycmVudCBjb3N0dW1lIG9mIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmlubmVyKCc8cCBjbGFzcz1cImJpZyBjZW50ZXJlZCByYWluYm93XCI+Oik8L3A+Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5pbm5lcignSSBsaWtlIHRleHQgb25seScpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbm5lcihodG1sKSB7XG4gICAgdGhpcy5jb3N0dW1lLmlubmVyKGh0bWwpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaW5zZXJ0IC0gUGxhY2VzIGEgRE9NIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5zZXJ0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1odG1sLWNyZWF0aW9uJykpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbnNlcnQoZWwpIHtcbiAgICB0aGlzLmNvc3R1bWUuaW5zZXJ0KGVsKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIF9yZWZyZXNoU2l6ZSAtIFNldHMgdGhlIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgaW4gcmVsYXRpb24gdG8gb3JpZ2luYWwgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byBhZGQuXG4gICovXG4gIF9yZWZyZXNoU2l6ZSgpIHtcbiAgICAvKipcbiAgICAqIGRlY2ltYWxSb3VuZCAtIHJvdW5kcyBhIG51bWJlciB0b28gZGVjaW1hbCBwb2ludHMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHJvdW5kLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50cyAtIGhvdyBtYW55IGRlY2ltYWwgcG9pbnRzIHRvIGxlYXZlLlxuICAgICovXG4gICAgZnVuY3Rpb24gZGVjaW1hbFJvdW5kKHZhbHVlLCBwb2ludHMpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogKDEwICoqIHBvaW50cykpIC8gKDEwICoqIHBvaW50cyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy53aWR0aCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUud2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgICB0aGlzLmhlaWdodCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpO1xuXG4gICAgICB0aGlzLmNvc3R1bWVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY29zdHVtZSA9IGl0ZW07XG4gICAgICAgIGNvc3R1bWUudmlzaWJsZVdpZHRoID0gZGVjaW1hbFJvdW5kKGNvc3R1bWUud2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgICAgIGNvc3R1bWUudmlzaWJsZUhlaWdodCA9IGRlY2ltYWxSb3VuZChjb3N0dW1lLmhlaWdodCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVNpemUgLSBDaGFuZ2VzIHRoZSBzaXplIG9mIHRoZSBzcHJpdGUgYnkgc3BlY2lmaWVkIHBlcmNlbnRhZ2UgbnVtYmVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5jaGFuZ2VTaXplKDUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2UgLSB0aGUgcGVyY2VudGFnZSBjaGFuZ2UuXG4gICovXG4gIGNoYW5nZVNpemUoY2hhbmdlKSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uICs9IGNoYW5nZTtcblxuICAgIHRoaXMuX3JlZnJlc2hTaXplKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRTaXplIC0gU2V0cyB0aGUgc2l6ZSBvZiB0aGUgc3ByaXRlIHRvIHRoZSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFNpemUoMTUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50IC0gdGhlIHBlcmNlbnRhZ2UgdG8gc2V0LlxuICAqL1xuICBzZXRTaXplKHBlcmNlbnQpIHtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSBwZXJjZW50O1xuXG4gICAgdGhpcy5fcmVmcmVzaFNpemUoKTtcbiAgfVxuXG4gIC8qKiBUZXh0IFVJICogKi9cblxuICAvKipcbiAgKiB0aGluayAtIENyZWF0ZXMgYSBcInRoaW5rIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUudGhpbmsoJ0kgdGhpbmsgdGhlcmVmb3JlIEkgYW0uJyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqL1xuICB0aGluayh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudCh0aGlzLCAndGhpbmsnLCB0ZXh0KSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogdGhpbmtXYWl0IC0gQ3JlYXRlcyBhIFwidGhpbmsgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUudGhpbmtXYWl0KCdJIHRoaW5rIHRoZXJlZm9yZSBJIGFtLicsIDMpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gdGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXG4gICovXG4gIHRoaW5rV2FpdCh0ZXh0LCBzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudGhpbmsoJycpO1xuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgIH0sIHNlYyAqIDEwMDApO1xuICAgIHRoaXMudGhpbmsodGV4dCk7XG4gIH1cblxuICAvKipcbiAgKiBzYXkgLSBDcmVhdGVzIGEgXCJzcGVlY2ggYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXkoJ0l0IGlzIG5vdCB0aGUgY29uc2Npb3VzbmVzcyBvZiBtZW4gdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGJlaW5nLCBidXQsIG9uIHRoZSBjb250cmFyeSwgdGhlaXIgc29jaWFsIGJlaW5nIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBjb25zY2lvdXNuZXNzLicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKi9cbiAgc2F5KHRleHQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHR1aSA/IHRoaXMudGV4dHVpID0gdGhpcy50ZXh0dWkuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KHRoaXMsICdzYXknLCB0ZXh0KSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogc2F5V2FpdCAtIENyZWF0ZXMgYSBcInNwZWVjaCBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUgZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXlXYWl0KCdJdCBpcyBub3QgdGhlIGNvbnNjaW91c25lc3Mgb2YgbWVuIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBiZWluZywgYnV0LCBvbiB0aGUgY29udHJhcnksIHRoZWlyIHNvY2lhbCBiZWluZyB0aGF0IGRldGVybWluZXMgdGhlaXIgY29uc2Npb3VzbmVzcy4nLCAzKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LlxuICAqL1xuICBzYXlXYWl0KHRleHQsIHNlYywgdHJpZ2dlcmluZ0lkID0gbnVsbCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGNsYXNzLW1ldGhvZHMtdXNlLXRoaXNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2F5KCcnKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgICB0aGlzLnNheSh0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAqIGFzayAtIENyZWF0ZXMgYW4gXCJhc2sgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqIEFsbG93cyBmb3IgYW4gaW5wdXQgYm94IHRvIGJlIGRpc3BsYXllZCB0byB0aGUgdXNlciBhbmRcbiAgKiBjYXB0dXJlIHVzZXIgaW5wdXQgaW50byB0aGUgdmFyaWFibGUgc3BlY2lmaWVkIGJ5IHRoZSB1c2VyLlxuICAqIE5vdGUgLSB2YXJpYWJsZSBmb3IgYW5zd2VyIG11c3QgYmUgZGVjbGFyZWQgaW4gZ2xvYmFsIHNjb3BlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiAvL2dvb2Q6XG4gICogbGV0IGFuc3dlcjtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgYW5zd2VyID0gdGhpcy5hc2soJ0lzIHRoZSBkZXN0aW55IG9mIG1hbmtpbmQgZGVjaWRlZCBieSBtYXRlcmlhbCBjb21wdXRhdGlvbj8nKTtcbiAgKiAgIHRoaXMuc2F5KGFuc3dlcik7XG4gICogfSk7XG4gICpcbiAgKiAvLyBiYWQ6XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCBhbnN3ZXI7XG4gICogICBhbnN3ZXIgPSB0aGlzLmFzaygnSXMgdGhlIGRlc3Rpbnkgb2YgbWFua2luZCBkZWNpZGVkIGJ5IG1hdGVyaWFsIGNvbXB1dGF0aW9uPycpO1xuICAqICAgdGhpcy5zYXkoYW5zd2VyKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgb2YgdGhlIHF1ZXN0aW9uXG4gICpcbiAgKi9cbiAgYXNrKHRleHQsIHRoZVZhciA9IG51bGwsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgbWUuYXNrSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcblxuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGV4dHVpID8gdGhpcy50ZXh0dWkgPSB0aGlzLnRleHR1aS5kZWxldGUodGhpcykgOiBudWxsO1xuICAgICAgdHlwZW9mIHRleHQgIT09ICd1bmRlZmluZWQnICYmIHRleHQudG9TdHJpbmcoKSA/IHRoaXMudGV4dHVpID0gbmV3IFRleHRVaUVsZW1lbnQobWUsICdhc2snLCB0ZXh0KSA6IG51bGw7XG5cbiAgICAgIC8vIHRoaXMgd2lsbCB3YWl0IGZvciB1c2VyIGlucHV0XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBibG9ja0xpa2UuYXNrLiR7dGhpcy5pZH0uJHttZS5hc2tJZH1gLCBmdW5jdGlvbiBhc2tMaXN0ZW5lcihlKSB7XG4gICAgICAgIC8vIHJlbW92ZSBpdC5cbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihgYmxvY2tMaWtlLmFzay4ke21lLmlkfS4ke21lLmFza0lkfWAsIGFza0xpc3RlbmVyKTtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgd2FpdGVkIG1ldGhvZCBsaXN0ZW5lci4gcmVsZWFzZSBpdC5cbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgICAgLy8gc2V0IHRoZSB1c2VyIGRlZmluZWQgdmFyaWFibGUgdG8gdGhlIGNhcHR1cmVkIHZhbHVlLlxuICAgICAgICB0aGVWYXIgPyBtZS5fc2V0VG9WYXIodGhlVmFyLCBlLmRldGFpbC52YWx1ZSkgOiBudWxsO1xuICAgICAgICAvLyByZW1vdmUgdGhlIFVJLlxuICAgICAgICBtZS50ZXh0dWkgPyBtZS50ZXh0dWkgPSBtZS50ZXh0dWkuZGVsZXRlKG1lKSA6IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKiogUGVuICogKi9cblxuICAvKipcbiAgKiBwZW5DbGVhciAtIENsZWFycyB0aGUgZHJhd2luZyBzdXJmYWNlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkNsZWFyKCk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgcGVuQ2xlYXIoKSB7XG4gICAgdGhpcy5zdXJmYWNlLmNsZWFyKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogcGVuRG93biAtIFwiQWN0aXZhdGVzXCIgZHJhd2luZyBieSBzZXR0aW5nIHJlcXVpcmVkIHZhbHVlcy5cbiAgKiBXaGVuIGFjdGl2YXRlZCBzcHJpdGUgbW90aW9uIHdpbGwgY3JlYXRlIHRoZSBkcmF3aW5nIG9uIHRoZSBzdGFnZSdzIGNhbnZhcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wZW5Eb3duKCk7XG4gICogICB0aGlzLm1vdmUoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBwZW5Eb3duKCkge1xuICAgIHRoaXMuZHJhd2luZyA9IHRydWU7XG4gICAgdGhpcy5wcmV2WCA9IHRoaXMueDtcbiAgICB0aGlzLnByZXZZID0gdGhpcy55O1xuICAgIHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogcGVuVXAgLSBcIkRlYWN0aXZhdGVzXCIgZHJhd2luZyBieSBzZXR0aW5nIHJlcXVpcmVkIHZhbHVlcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wZW5Eb3duKCk7XG4gICogICB0aGlzLm1vdmUoMTAwKTtcbiAgKiAgIHRoaXMucGVuVXAoKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBwZW5VcCgpIHtcbiAgICB0aGlzLmRyYXdpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnN1cmZhY2UuZHJhdyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFBlbkNvbG9yIC0gU2V0cyB0aGUgY29sb3Igb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0UGVuQ29sb3IoJyNmZjAwMDAnKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUuc2V0UGVuQ29sb3IoJ3JlZCcpXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gY29sb3JTdHJpbmcgLSBhIHZhbGlkIGNvbG9yIGRlZmluaXRpb24gZm9yIGNhbnZhcyBzdHJva2VTdHlsZS5cbiAgKi9cbiAgc2V0UGVuQ29sb3IoY29sb3JTdHJpbmcpIHtcbiAgICB0aGlzLnBlbkNvbG9yID0gY29sb3JTdHJpbmc7XG4gIH1cblxuICAvKipcbiAgKiBzZXRQZW5TaXplIC0gU2V0cyB0aGUgc2l6ZSBvZiB0aGUgcGVuLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRQZW5TaXplKDEwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBhIG51bWJlciBmb3IgY2FudmFzIGxpbmVXaWR0aC5cbiAgKi9cbiAgc2V0UGVuU2l6ZShwaXhlbHMpIHtcbiAgICB0aGlzLnBlblNpemUgPSBwaXhlbHM7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VQZW5TaXplIC0gQ2hhbmdlcyB0aGUgc2l6ZSBvZiB0aGUgcGVuLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNoYW5nZVBlblNpemUoMTApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZSAtIHRoZSBjaGFuZ2UgaW4gcGl4ZWxzLlxuICAqL1xuICBjaGFuZ2VQZW5TaXplKGNoYW5nZSkge1xuICAgIHRoaXMucGVuU2l6ZSArPSBjaGFuZ2U7XG4gIH1cblxuICAvKiBTZW5zaW5nICovXG5cbiAgLyoqXG4gICogZGlzdGFuY2VUbyAtIFJldHVybnMgdGhlIGRpc3RhbmNlIHRvIGEgcG9pbnQgb24gdGhlIHNjcmVlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7c2Vuc2luZzogdHJ1ZX0pO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8odGhpcy5tb3VzZVgsIHRoaXMubW91c2VZKSlcbiAgKiB9KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLm90aGVyU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8ob3RoZXJTcHJpdGUueCwgb3RoZXJTcHJpdGUueSkpXG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqIEByZXR1cm4ge251bWJlcn0gLSBkaXN0YW5jZSBpbiBwaXhlbHMgdG8gcG9zaXRpb24gb24gc2NyZWVuIChub3Qgcm91bmRlZCkuXG4gICovXG4gIGRpc3RhbmNlVG8oeCwgeSkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0geDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0VkZ2UgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyB0aGUgZWRnZSBvZiB0aGUgc3RhZ2UgYW5kIHJldHVybnMgdGhlIGVkZ2UgdG91Y2hlZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiB0aGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUodGhpcy54IDwgc3RhZ2Uud2lkdGggLyAyKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKVxuICAqICAgIHRoaXMuc2F5KHRoaXMudG91Y2hpbmdFZGdlKCkpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzaWRlIG9mIHRoZSBzdGFnZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmdFZGdlKCkge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLngpICsgKHRoaXMud2lkdGggLyAyKSA+IHRoaXMuc3RhZ2VXaWR0aCAvIDIpIHtcbiAgICAgIHJlc3VsdCA9ICdyaWdodCc7XG4gICAgfVxuICAgIGlmICgodGhpcy54KSAtICh0aGlzLndpZHRoIC8gMikgPCAtMSAqICh0aGlzLnN0YWdlV2lkdGggLyAyKSkge1xuICAgICAgcmVzdWx0ID0gJ2xlZnQnO1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgKyAodGhpcy5oZWlnaHQgLyAyKSA+IHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSB7XG4gICAgICByZXN1bHQgPSAndG9wJztcbiAgICB9XG4gICAgaWYgKCh0aGlzLnkpIC0gKHRoaXMuaGVpZ2h0IC8gMikgPCAtMSAqICh0aGlzLnN0YWdlSGVpZ2h0IC8gMikpIHtcbiAgICAgIHJlc3VsdCA9ICdib3R0b20nO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy5pc1RvdWNoaW5nRWRnZSgpKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgZWRnZS5cbiAgKi9cbiAgaXNUb3VjaGluZ0VkZ2UoKSB7XG4gICAgcmV0dXJuICEhdGhpcy50b3VjaGluZ0VkZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgYW5vdGhlciBhbmQgcmV0dXJucyBhdCB3aGF0IHNpZGUgaXQgdG91Y2hlcy5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAyLiBpZiB0aGUgc3ByaXRlIGhhcyBnb25lIFwiaW50b1wiIHRoZSBvdGhlciB0aGUgc2lkZSBcInBlbmV0cmF0ZWQgbW9yZVwiIHdpbGwgYmUgcmV0dXJuZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLnRvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZyhvdGhlclNwcml0ZSkpXG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHNwcml0ZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmcoc3ByaXRlKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpID4gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMilcbiAgICAgICYmIHRoaXMueCAtICh0aGlzLndpZHRoIC8gMikgPCBzcHJpdGUueCArIChzcHJpdGUud2lkdGggLyAyKVxuICAgICAgJiYgdGhpcy55ICsgKHRoaXMuaGVpZ2h0IC8gMikgPiBzcHJpdGUueSAtIChzcHJpdGUuaGVpZ2h0IC8gMilcbiAgICAgICYmIHRoaXMueSAtICh0aGlzLmhlaWdodCAvIDIpIDwgc3ByaXRlLnkgKyAoc3ByaXRlLmhlaWdodCAvIDIpXG4gICAgKSB7XG4gICAgICB0aGlzLnggPj0gc3ByaXRlLnggPyByZXN1bHQgPSAnbGVmdCcgOiBudWxsO1xuICAgICAgdGhpcy54IDwgc3ByaXRlLnggPyByZXN1bHQgPSAncmlnaHQnIDogbnVsbDtcbiAgICAgIHRoaXMueSA+IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICdib3R0b20nIDogbnVsbDtcbiAgICAgIHRoaXMueSA8IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICd0b3AnIDogbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZyAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIGFub3RoZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLmlzVG91Y2hpbmcob3RoZXJTcHJpdGUpKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGNoZWNrIGlmIHRvdWNoaW5nLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgc3BlY2lmaWVkIHNwcml0ZS5cbiAgKi9cbiAgaXNUb3VjaGluZyhzcHJpdGUpIHtcbiAgICByZXR1cm4gISF0aGlzLnRvdWNoaW5nKHNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBSZXR1cm5zIHRoZSBoZXggdmFsdWUgdG8gYWxsIHBpeGVscyBpbiBiYWNrZHJvcCBhcmVhIGNvdmVyZWQgYnkgdGhlIHNwcml0ZSByZWN0YW5nbGUuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gVGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqIDMuIFRoZSBiYWNrZHJvcCBpbWFnZSBtdXN0IGJlIGEgbG9jYWwgaW1hZ2Ugc2VydmVkIGZyb20gc2FtZSBvcmlnaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHdoaWxlKHRydWUpe1xuICAqICAgICBsZXQgdG91Y2hlZENvbG9ycyA9IHRoaXMudG91Y2hpbmdCYWNrZHJvcENvbG9yKCk7XG4gICogICAgIHRoaXMuc2F5KHRvdWNoZWRDb2xvcnMpO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHthcnJheX0gLSBjb2xvcnMgKHN0cmluZ3MpIHRvdWNoZWQuXG4gICovXG4gIHRvdWNoaW5nQmFja2Ryb3BDb2xvcigpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8qKlxuICAgICogcmdiVG9IZXggLSBjb252ZXJ0cyBhIGNvbG9yIGRlZmluZWQgYnkgUkdCIHZhbHVlcyBpbnRvIGEgb24gZGVmaW5lZCBhcyBhIGhleCBzdHJpbmcuXG4gICAgKlxuICAgICogRnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYyMzgzOC9yZ2ItdG8taGV4LWFuZC1oZXgtdG8tcmdiXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHIgLSB0aGUgcmVkIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZyAtIHRoZSBncmVlbiB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGIgLSAgdGhlIGJsdWUgdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBoZXggY29sb3Igc3RyaW5nLlxuICAgICovXG4gICAgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xuICAgICAgcmV0dXJuIGAjJHsoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSl9YDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1iaXR3aXNlXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhY2tkcm9wQ29udGV4dCA9IHRoaXMuYWdhaW5zdEJhY2tkcm9wLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjb25zdCBkYXRhID0gYmFja2Ryb3BDb250ZXh0LmdldEltYWdlRGF0YSgoKHRoaXMuc3RhZ2VXaWR0aCAvIDIpIC0gKHRoaXMud2lkdGggLyAyKSkgKyB0aGlzLngsICgodGhpcy5zdGFnZUhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMikpIC0gdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIGRhdGFbaSArIDNdICE9PSAwID8gcmVzdWx0LnB1c2gocmdiVG9IZXgoZGF0YVtpXSwgZGF0YVtpICsgMV0sIGRhdGFbaSArIDJdKSkgOiBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvcigpIGluZ25vcmVkLiBCYWNrZHJvcCBpbWFnZSBjYW4gbm90IGJlIGxvY2F0ZWQgYXQgYSByZW1vdGUgb3JpZ2luLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHJlc3VsdCkpO1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBjb21wYXJlcyBhIGdpdmVuIGhleCB2YWx1ZSB0byBhbGwgcGl4ZWxzIGluIGJhY2tkcm9wIGFyZWEgY292ZXJlZCBieSB0aGUgc3ByaXRlIHJlY3RhbmdsZS5cbiAgKiBJZiBhIG1hdGNoIGlzIGZvdW5kIHRoZSBjb2xvciBpcyByZXR1cm5lZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiBUaGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICogMy4gVGhlIGJhY2tkcm9wIGltYWdlIG11c3QgYmUgYSBsb2NhbCBpbWFnZSBzZXJ2ZWQgZnJvbSBzYW1lIG9yaWdpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBsZXQgbW92aW5nID0gdHJ1ZTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgd2hpbGUobW92aW5nKXtcbiAgKiAgICAgdGhpcy5pc1RvdWNoaW5nQmFja2Ryb3BDb2xvcignI2ZmMDAwMCcpID8gbW92aW5nID0gZmFsc2UgOiBtb3ZpbmcgPSB0cnVlO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gYmFja2Ryb3BDb2xvciAtIHRoZSBjb2xvciB0byBldmFsdWF0ZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGRvZXMgdGhlIHNwcml0ZSB0b3VjaCB0aGUgY29sb3IuXG4gICovXG4gIGlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKGJhY2tkcm9wQ29sb3IpIHtcbiAgICBjb25zdCBoZXhBcnIgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcihiYWNrZHJvcENvbG9yKTtcblxuICAgIHJldHVybiBoZXhBcnIuaW5jbHVkZXMoYmFja2Ryb3BDb2xvcik7XG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnQgb2YgdGhlIHN0YWdlLlxuICogRWFjaCBTdGFnZSBoYXMgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UgRWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gdGhlIHN0YWdlIGZvciB3aGljaCB0aGUgZWxlbWVudCBpcyBjcmVhdGVkLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSBjcmVhdGVkLlxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zLCBzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZURpdiAtIGNyZWF0ZXMgYSBkaXYgYXQgc3BlY2lmaWVkIHpJbmRleC5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gekluZGV4IC0gZGVzaXJlZCBwbGFjZSBpbiBcInN0YWNrXCJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZURpdih6SW5kZXgpIHtcbiAgICAgIGNvbnN0IHNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICBzZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICAgIHNlbC5zdHlsZS5oZWlnaHQgPSBgJHtvcHRpb25zLmhlaWdodH1weGA7XG4gICAgICBzZWwuc3R5bGUuekluZGV4ID0gekluZGV4O1xuICAgICAgc2VsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHNlbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdtYW5pcHVsYXRpb24nO1xuXG4gICAgICByZXR1cm4gc2VsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogY3JlYXRlQ2FudmFzIC0gY3JlYXRlcyBhIGNhbnZhcyBhdCBzcGVjaWZpZWQgekluZGV4LlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB6SW5kZXggLSBkZXNpcmVkIHBsYWNlIGluIFwic3RhY2tcIlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50LlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKHpJbmRleCkge1xuICAgICAgY29uc3QgY2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgIGNlbC53aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gICAgICBjZWwuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQ7XG4gICAgICBjZWwuc3R5bGUuekluZGV4ID0gekluZGV4O1xuICAgICAgY2VsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGNlbC5zdHlsZS5sZWZ0ID0gJzBweCc7XG4gICAgICBjZWwuc3R5bGUudG9wID0gJzBweCc7XG5cbiAgICAgIHJldHVybiBjZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBjcmVhdGVGbGFnIC0gY3JlYXRlcyBhIFwiZmxhZ1wiIGRpdi5cbiAgICAqXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gYSBzdGFnZSB3aWRlL2hpZ2ggRE9NIGVsZW1lbnQgd2l0aCBmbGFnIGF0IGNlbnRlcnMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVGbGFnKCkge1xuICAgICAgY29uc3QgZmxhZ1NpemUgPSAxMzA7XG4gICAgICBjb25zdCBmZWwgPSBjcmVhdGVEaXYoLTEpO1xuXG4gICAgICBjb25zdCBmZWxpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICAgIGNvbnN0IHggPSAtKGZsYWdTaXplIC8gMik7XG4gICAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgICBjb25zdCB5ID0gLShmbGFnU2l6ZSAvIDIpO1xuXG4gICAgICAvLyBsb29rc1xuICAgICAgZmVsaXRlbS5zdHlsZS53aWR0aCA9IGAke2ZsYWdTaXplfXB4YDtcbiAgICAgIGZlbGl0ZW0uc3R5bGUuaGVpZ2h0ID0gYCR7ZmxhZ1NpemV9cHhgO1xuICAgICAgZmVsaXRlbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBmZWxpdGVtLmlubmVySFRNTCA9ICcmIzk4NzM7JztcblxuICAgICAgZmVsaXRlbS5zdHlsZS5sZWZ0ID0gYCR7KG9wdGlvbnMud2lkdGggLyAyKSArIHh9cHhgO1xuICAgICAgZmVsaXRlbS5zdHlsZS50b3AgPSBgJHsob3B0aW9ucy5oZWlnaHQgLyAyKSArIHl9cHhgO1xuICAgICAgZmVsaXRlbS5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLWZsYWcnO1xuXG4gICAgICBmZWwuYXBwZW5kQ2hpbGQoZmVsaXRlbSk7XG4gICAgICBmZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgcmV0dXJuIGZlbDtcbiAgICB9XG5cbiAgICBlbC5pZCA9IGAke3N0YWdlLmlkfWA7XG5cbiAgICBlbC5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgIGVsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcblxuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBlbC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgIG9wdGlvbnMucGFyZW50LmFwcGVuZENoaWxkKGVsKTtcblxuICAgIHRoaXMuYmFja2Ryb3BDb250YWluZXIgPSBjcmVhdGVDYW52YXMoMCk7XG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lci5pZCA9IGAke3N0YWdlLmlkfS1iYWNrZHJvcGA7XG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lci5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWJhY2tkcm9wJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wQ29udGFpbmVyKTtcblxuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKDApO1xuICAgIHRoaXMuY2FudmFzLmlkID0gYCR7c3RhZ2UuaWR9LXN1cmZhY2VgO1xuICAgIHRoaXMuY2FudmFzLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtc3VyZmFjZSc7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuXG4gICAgdGhpcy5mbGFnID0gY3JlYXRlRmxhZygpO1xuICAgIHRoaXMuZmxhZy5pZCA9IGAke3N0YWdlLmlkfS1mbGFnYDtcbiAgICB0aGlzLmZsYWcuY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1wYW5lbC1mbGFnJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmZsYWcpO1xuXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIHRoaXMuZWwgPSBlbDtcbiAgfVxuXG4gIC8qKlxuICAqIHVwZGF0ZSAtIHVwZGF0ZXMgdGhlIERPTSBlbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmVsO1xuICAgIGNvbnN0IGJhY2tkcm9wQ29udGV4dCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXIuZ2V0Q29udGV4dCgnMmQnKTtcblxuICAgIGxldCBtYXJnaW5UQiA9IDA7XG4gICAgaWYgKHN0YWdlLmVsZW1lbnQuZWwucGFyZW50RWxlbWVudC50YWdOYW1lID09PSAnQk9EWScpIHtcbiAgICAgIG1hcmdpblRCID0gTWF0aC5mbG9vcigod2luZG93LmlubmVySGVpZ2h0IC0gc3RhZ2UuaGVpZ2h0KSAvIDIpO1xuICAgICAgbWFyZ2luVEIgPCAwID8gbWFyZ2luVEIgPSAwIDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBJZiBjb2xvciAtIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciBzZXQsIG9yIGNsZWFyIGl0XG4gICAgaWYgKHN0YWdlLmJhY2tkcm9wICYmIHN0YWdlLmJhY2tkcm9wLmNvbG9yKSB7XG4gICAgICBiYWNrZHJvcENvbnRleHQucmVjdCgwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KTtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5maWxsU3R5bGUgPSBzdGFnZS5iYWNrZHJvcC5jb2xvcjtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCk7XG4gICAgfVxuXG4gICAgLy8gSWYgaW1hZ2UgLSBkcmF3IHRoZSBpbWFnZSBvbiBjYW52YXNcbiAgICBpZiAoc3RhZ2UuYmFja2Ryb3AgJiYgc3RhZ2UuYmFja2Ryb3AuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgYmFja2Ryb3BDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSBzdGFnZS5iYWNrZHJvcC5pbWFnZTtcbiAgICB9XG5cbiAgICAvLyB6b29tIGFuZCBwbGFjZW1lbnRcbiAgICBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGUoJHtzdGFnZS5tYWduaWZpY2F0aW9uIC8gMTAwfSlgO1xuICAgIGVsLnN0eWxlLm1hcmdpbiA9IGAke21hcmdpblRCfXB4IGF1dG9gO1xuXG4gICAgLy8gY3NzIHJ1bGVzXG4gICAgY3NzLmFwcGx5KHN0YWdlKTtcblxuICAgIC8vIGNzcyBjbGFzc2VzXG4gICAgc3RhZ2UuYmFja2Ryb3AgPyBlbC5jbGFzc05hbWUgPSBzdGFnZS5iYWNrZHJvcC5jbGFzc2VzLmNvbmNhdChzdGFnZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzdGFnZS5jbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIGRlbGV0ZXMgdGhlIERPTSBlbGVtZW50XG4gICovXG4gIGRlbGV0ZShzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbDtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogYWRkRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGluZnJvbnQgb2YgZXZlcnl0aGluZyAoc2hvd3MgaXQpXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICBhZGRGbGFnKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmZsYWc7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAxMDAwO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGF0IHRoZSBiYWNrIChoaWRlcyBpdClcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIHJlbW92ZUZsYWcoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cbiIsIi8qKlxuKiBFbmNhcHN1bGF0ZXMgdGhlIHN0YWdlIHNlbnNpbmcgZnVuY3Rpb25hbGl0eS5cbiovXG5cbi8qKlxuKiBlbmFibGUgLSBFbmFibGVzIHNlbnNpbmcgb2YgZG9jdW1lbnQgbGV2ZWwgZXZlbnRzIChrZXlkb3duLCBtb3VzZW1vdmUsIG1vdXNlZG93biwgdG91Y2htb3ZlKVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuYWJsZShzdGFnZSkge1xuICBjb25zdCBtZSA9IHN0YWdlO1xuICBtZS5zZW5zaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgKiBkZWNpbWFsUm91bmQgLSByb3VuZHMgYSBudW1iZXIgdG9vIGRlY2ltYWwgcG9pbnRzLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHJvdW5kLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwb2ludHMgLSBob3cgbWFueSBkZWNpbWFsIHBvaW50cyB0byBsZWF2ZS5cbiAgKi9cbiAgZnVuY3Rpb24gZGVjaW1hbFJvdW5kKHZhbHVlLCBwb2ludHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqICgxMCAqKiBwb2ludHMpKSAvICgxMCAqKiBwb2ludHMpO1xuICB9XG5cbiAgLyoqXG4gICogY29tcHV0ZVggLSBDb21wdXRlcyBjZW50ZXJlZCB4IGJhc2VkIG9uIHggZXh0cmFjdGVkIGZyb20gZXZlbnQuXG4gICovXG4gIGZ1bmN0aW9uIGNvbXB1dGVYKHgpIHtcbiAgICBjb25zdCBtYWcgPSBtZS5tYWduaWZpY2F0aW9uIC8gMTAwO1xuICAgIHJldHVybiBkZWNpbWFsUm91bmQoKHggLSAobWUuZWxlbWVudC5lbC5vZmZzZXRMZWZ0KSAtIChtZS53aWR0aCAvIDIpKSAvIG1hZywgMik7XG4gIH1cblxuICAvKipcbiAgKiBjb21wdXRlWSAtIENvbXB1dGVzIGNlbnRlcmVkIHkgYmFzZWQgb24geSBleHRyYWN0ZWQgZnJvbSBldmVudC5cbiAgKi9cbiAgZnVuY3Rpb24gY29tcHV0ZVkoeSkge1xuICAgIGNvbnN0IG1hZyA9IG1lLm1hZ25pZmljYXRpb24gLyAxMDA7XG4gICAgcmV0dXJuIGRlY2ltYWxSb3VuZCgoLXkgKyBtZS5lbGVtZW50LmVsLm9mZnNldFRvcCArIChtZS5oZWlnaHQgLyAyKSkgLyBtYWcsIDIpO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgZS5rZXkgJiYgbWUua2V5c0tleS5pbmRleE9mKGUua2V5LnRvTG93ZXJDYXNlKCkpID09PSAtMSA/IG1lLmtleXNLZXkucHVzaChlLmtleS50b0xvd2VyQ2FzZSgpKSA6IG51bGw7XG4gICAgZS5jb2RlICYmIG1lLmtleXNDb2RlLmluZGV4T2YoZS5jb2RlLnRvTG93ZXJDYXNlKCkpID09PSAtMSA/IG1lLmtleXNDb2RlLnB1c2goZS5jb2RlLnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBtZS5rZXlzS2V5Q29kZS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xID8gbWUua2V5c0tleUNvZGUucHVzaChlLmtleUNvZGUpIDogbnVsbDtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGUua2V5ID8gbWUua2V5c0tleSA9IG1lLmtleXNLZXkuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBlLmtleS50b0xvd2VyQ2FzZSgpKSA6IG51bGw7XG4gICAgZS5jb2RlID8gbWUua2V5c0NvZGUgPSBtZS5rZXlzQ29kZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGUuY29kZS50b0xvd2VyQ2FzZSgpKSA6IG51bGw7XG4gICAgbWUua2V5c0tleUNvZGUgPSBtZS5rZXlzS2V5Q29kZS5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGUua2V5Q29kZSk7XG4gIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNsaWVudFgpO1xuICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUuY2xpZW50WSk7XG4gIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgpO1xuICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSk7XG4gIH0sIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICBtZS5tb3VzZURvd24gPSB0cnVlO1xuICB9KTtcbiAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgIG1lLm1vdXNlRG93biA9IGZhbHNlO1xuICB9KTtcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgIG1lLm1vdXNlWCA9IGNvbXB1dGVYKGUudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICBtZS5tb3VzZVkgPSBjb21wdXRlWShlLnRvdWNoZXNbMF0uY2xpZW50WSk7XG4gICAgbWUubW91c2VEb3duID0gdHJ1ZTtcbiAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgbWUubW91c2VEb3duID0gZmFsc2U7XG4gICAgbWUubW91c2VYID0gbnVsbDtcbiAgICBtZS5tb3VzZVkgPSBudWxsO1xuICB9KTtcbn1cbiIsIi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBzdGFnZSBzdXJmYWNlIG9uIHdoaWNoIHNwcml0ZXMgZHJhdy5cbiAqIEVhY2ggU3RhZ2UgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlU3VyZmFjZSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFN0YWdlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIG9uIHdoaWNoIHRoZSBzcHJpdGUgaXMgZHJhd2luZy5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3RhZ2UpIHtcbiAgICB0aGlzLmNvbnRleHQgPSBzdGFnZS5lbGVtZW50LmNvbnRleHQ7XG4gIH1cblxuICAvKipcbiAgKiBkcmF3IC0gZHJhd3MgYSBsaW5lIFwiYmVoaW5kXCIgYSBtb3Zpbmcgc3ByaXRlLlxuICAqIE5vdGU6IHNwcml0ZSBhbHdheXMgaGFzIGN1cnJlbnQgYW5kIHByZXZpb3VzIHgseSB2YWx1ZXMgdG8gYWxsb3cgZHJhd2luZyB0byBwcmV2aW91cyBsb2NhdGlvbi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIGRyYXdpbmcgdGhlIGxpbmUuXG4gICovXG4gIGRyYXcoc3ByaXRlKSB7XG4gICAgaWYgKHNwcml0ZS5kcmF3aW5nKSB7XG4gICAgICB0aGlzLmNvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICB0aGlzLmNvbnRleHQubW92ZVRvKChzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgc3ByaXRlLngsIChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIChzcHJpdGUueSAqIC0xKSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVRvKChzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgc3ByaXRlLnByZXZYLCAoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyAoc3ByaXRlLnByZXZZICogLTEpKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lV2lkdGggPSBzcHJpdGUucGVuU2l6ZTtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2VTdHlsZSA9IHNwcml0ZS5wZW5Db2xvcjtcbiAgICAgIHRoaXMuY29udGV4dC5zdHJva2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBjbGVhciAtIGNsZWFycyB0aGUgY2FudmFzXG4gICovXG4gIGNsZWFyKHNwcml0ZSkge1xuICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgc3ByaXRlLnN0YWdlV2lkdGgsIHNwcml0ZS5zdGFnZUhlaWdodCk7XG4gIH1cbn1cbiIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5pbXBvcnQgU3RhZ2VFbGVtZW50IGZyb20gJy4vc3RhZ2UtZWxlbWVudCc7XG5pbXBvcnQgU3RhZ2VTdXJmYWNlIGZyb20gJy4vc3RhZ2Utc3VyZmFjZSc7XG5pbXBvcnQgU3ByaXRlRWxlbWVudCBmcm9tICcuL3Nwcml0ZS1lbGVtZW50JztcblxuaW1wb3J0IHNlbnNpbmcgZnJvbSAnLi9zdGFnZS1zZW5zaW5nJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTdGFnZS5cbiAqIEBleHRlbmRzIEVudGl0eVxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2Uoe1xuICogICB3aWR0aDogNjAwLFxuICogICBoZWlnaHQ6IDQwMCxcbiAqICAgcGFjZTogMTYsXG4gKiAgIHNlbnNpbmc6IHRydWUsXG4gKiAgIHBhcmVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlLXdyYXAnKSxcbiAqICAgYmFja2Ryb3A6IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe2NvbG9yOiAnI0ZGQjZDMSd9KVxuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBTdGFnZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy53aWR0aCAtIFRoZSBzdGFnZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgZnVsbCB3aW5kb3cuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gVGhlIHN0YWdlIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgZnVsbCB3aW5kb3cuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFjZSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIGVhY2ggcGFjZWQgbWV0aG9kLiAgV2lsbCBkaXNhYmxlIHBhY2luZyB3aGVuIHNldCB0byB6ZXJvLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLnBhcmVudCAtIFRoZSBET00gZWxlbWVudCBpbnRvIHdoaWNoIHRoZSBzdGFnZSB3aWxsIGJlIGluc2VydGVkLiBEZWZhdWx0IGlzIHRoZSBib2R5LlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmJhY2tkcm9wIC0gQSBkZWZhdWx0IEJhY2tkcm9wLlxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zZW5zaW5nIC0gRW5hYmxlcyBzZW5zaW5nIG9mIG1vdXNlIGxvY2F0aW9uIGFuZCB3aGF0IGtleXMgcHJlc3NlZC5cbiAgKiBJZiB0cnVlLCB3aWxsIGNvbnN0YW50bHkgdXBkYXRlIHN0YWdlIHByb3BlcnRpZXM6IG1vdXNlWCwgbW91c2VZLCBrZXlzS2V5Q29kZSwga2V5c0tleUNvZGUgYW5kIGtleXNDb2RlIGJhc2VkIG9uIHVzZXIgaW5wdXQuXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICBwYXJlbnQ6IGRvY3VtZW50LmJvZHksXG4gICAgICBwYWNlOiAzMyxcbiAgICAgIGJhY2tkcm9wOiBudWxsLFxuICAgIH07XG4gICAgY29uc3QgYWN0dWFsID0geyAuLi5kZWZhdWx0cywgLi4ub3B0aW9ucyB9O1xuXG4gICAgc3VwZXIoYWN0dWFsLnBhY2UpO1xuXG4gICAgLy8gYmFja2Ryb3BzXG4gICAgdGhpcy5iYWNrZHJvcHMgPSBbXTtcblxuICAgIGlmIChhY3R1YWwuYmFja2Ryb3ApIHtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBhY3R1YWwuYmFja2Ryb3A7XG4gICAgICB0aGlzLmJhY2tkcm9wcy5wdXNoKHRoaXMuYmFja2Ryb3ApO1xuICAgIH1cblxuICAgIHRoaXMuZWxlbWVudCA9IG5ldyBTdGFnZUVsZW1lbnQoYWN0dWFsLCB0aGlzKTtcbiAgICB0aGlzLndpZHRoID0gYWN0dWFsLndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gYWN0dWFsLmhlaWdodDtcblxuICAgIHRoaXMua2V5c0NvZGUgPSBbXTtcbiAgICB0aGlzLmtleXNLZXkgPSBbXTtcbiAgICB0aGlzLmtleXNLZXlDb2RlID0gW107XG5cbiAgICB0aGlzLnNwcml0ZXMgPSBbXTtcblxuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IDEwMDtcblxuICAgIHRoaXMuY3NzUnVsZXMgPSBbXTtcbiAgICB0aGlzLmNsYXNzZXMgPSBbXTtcblxuICAgIHRoaXMubW91c2VEb3duID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlWCA9IG51bGw7XG4gICAgdGhpcy5tb3VzZVkgPSBudWxsO1xuXG4gICAgYWN0dWFsLnNlbnNpbmcgPyBzZW5zaW5nKHRoaXMpIDogbnVsbDtcblxuICAgIHRoaXMuZWxlbWVudC51cGRhdGUodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBkZWxldGUgLSBEZWxldGVzIHRoZSBzdGFnZSBlbGVtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICpcbiAgKiBzdGFnZS5kZWxldGUoKTtcbiAgKi9cbiAgZGVsZXRlKCkge1xuICAgIHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudC5kZWxldGUodGhpcyk7XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkU3ByaXRlIC0gQWRkcyBhIHNwcml0ZSB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBhZGQuXG4gICovXG4gIGFkZFNwcml0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBjdXJTcHJpdGUgPSBzcHJpdGU7XG5cbiAgICBjdXJTcHJpdGUuZWxlbWVudCA9IG5ldyBTcHJpdGVFbGVtZW50KHNwcml0ZSwgdGhpcyk7XG4gICAgY3VyU3ByaXRlLnN1cmZhY2UgPSBuZXcgU3RhZ2VTdXJmYWNlKHRoaXMpO1xuXG4gICAgY3VyU3ByaXRlLmVsZW1lbnQuZmxhZyA9IHRoaXMuZWxlbWVudC5mbGFnO1xuICAgIGN1clNwcml0ZS5hZ2FpbnN0QmFja2Ryb3AgPSB0aGlzLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXI7XG5cbiAgICBjdXJTcHJpdGUuc3RhZ2VXaWR0aCA9IHRoaXMud2lkdGg7XG4gICAgY3VyU3ByaXRlLnN0YWdlSGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICB0aGlzLnNwcml0ZXMucHVzaChjdXJTcHJpdGUpO1xuICAgIGN1clNwcml0ZS56ID0gdGhpcy5zcHJpdGVzLmxlbmd0aDtcblxuICAgIHNwcml0ZS5lbGVtZW50LnVwZGF0ZShjdXJTcHJpdGUpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlU3ByaXRlIC0gUmVtb3ZlcyBhIHNwcml0ZSBmcm9tIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS5yZW1vdmVTcHJpdGUoc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGFkZC5cbiAgKi9cbiAgcmVtb3ZlU3ByaXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcbiAgICB0aGlzLnNwcml0ZXMgPSB0aGlzLnNwcml0ZXMuZmlsdGVyKChpdGVtKSA9PiBpdGVtICE9PSBzcHJpdGUpO1xuICAgIGN1clNwcml0ZS5lbGVtZW50ID8gY3VyU3ByaXRlLmVsZW1lbnQgPSBjdXJTcHJpdGUuZWxlbWVudC5kZWxldGUoY3VyU3ByaXRlKSA6IG51bGw7XG4gIH1cblxuICAvKiogbG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGFkZEJhY2tkcm9wIC0gQWRkcyBhIGJhY2tkcm9wIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIGFkZC5cbiAgKi9cbiAgYWRkQmFja2Ryb3AoYmFja2Ryb3ApIHtcbiAgICB0aGlzLmJhY2tkcm9wcy5wdXNoKGJhY2tkcm9wKTtcbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZVxuICAgICF0aGlzLmJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWzBdIDogbnVsbDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaEJhY2tkcm9wVG8gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgYmFja2Ryb3AuIElmIG5vdCBmb3VuZCBmYWlscyBzaWxlbnRseS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKiBzdGFnZS5zd2l0Y2hCYWNrZHJvcFRvKGJhY2tkcm9wKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBzd2l0Y2hCYWNrZHJvcFRvKGJhY2tkcm9wKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKGJhY2tkcm9wKTtcbiAgICBjdXJyZW50QmFja2Ryb3BJbmRleCAhPT0gLTEgPyB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbY3VycmVudEJhY2tkcm9wSW5kZXhdIDogbnVsbDtcblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQmFja2Ryb3BUb051bSAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBiYWNrZHJvcCBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuIElmIG5vdCBmb3VuZCBmYWlscyBzaWxlbnRseS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKiBzdGFnZS5zd2l0Y2hCYWNrZHJvcFRvTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaEJhY2tkcm9wVG9OdW0oaW5kZXgpIHtcbiAgICB0aGlzLnN3aXRjaEJhY2tkcm9wVG8odGhpcy5iYWNrZHJvcHNbaW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAqIG5leHRCYWNrZHJvcCAtIFN3aXRjaGVzIHRvIHRoZSBuZXh0IGJhY2tkcm9wLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLm5leHRCYWNrZHJvcCgpO1xuICAqL1xuICBuZXh0QmFja2Ryb3AoKSB7XG4gICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKHRoaXMuYmFja2Ryb3ApO1xuICAgIHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1soY3VycmVudEJhY2tkcm9wSW5kZXggKyAxKSAlIHRoaXMuYmFja2Ryb3BzLmxlbmd0aF07XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUJhY2tkcm9wIC0gUmVtb3ZlcyBhIGJhY2tkcm9wLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnJlbW92ZUJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBiYWNrZHJvcCB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUJhY2tkcm9wKGJhY2tkcm9wKSB7XG4gICAgaWYgKHRoaXMuYmFja2Ryb3BzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRCYWNrZHJvcEluZGV4ID0gdGhpcy5iYWNrZHJvcHMuaW5kZXhPZihiYWNrZHJvcCk7XG4gICAgICB0aGlzLmJhY2tkcm9wID09PSBiYWNrZHJvcCA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1soY3VycmVudEJhY2tkcm9wSW5kZXggKyAxKSAlIHRoaXMuYmFja2Ryb3BzLmxlbmd0aF0gOiBudWxsO1xuICAgICAgdGhpcy5iYWNrZHJvcHMgPSB0aGlzLmJhY2tkcm9wcy5maWx0ZXIoKGl0ZW0pID0+IGl0ZW0gIT09IGJhY2tkcm9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYWNrZHJvcHMgPSBbXTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUJhY2tkcm9wTnVtIC0gUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBiYWNrZHJvcCwgd2lsbCBmYWlsIGFuZCBlbWl0IGEgY29uc29sZSBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnJlbW92ZUJhY2tkcm9wTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3BOdW0oaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKHRoaXMuYmFja2Ryb3BzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiByZWZyZXNoIC0gRm9yY2VzIGEgc3ByaXRlIHJlZnJlc2guXG4gICogTm90ZTogc2VydmljZSBtZXRob2QgdG8gYmUgdXNlZCBpZiBjb3N0dW1lIHdhcyBtYW5pcHVsYXRlZCBkaXJlY3RseS5cbiAgKi9cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHpvb20gLSB6b29tcyB0aGUgc3RhZ2UgdG8gdGhlIHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqXG4gICogc3RhZ2Uuem9vbSgxNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgLSB0aGUgcGVyY2VudGFnZSB0byBzZXQuXG4gICovXG4gIHpvb20ocGVyY2VudCkge1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IHBlcmNlbnQ7XG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBTcHJpdGVzICogKi9cblxuICAvKipcbiAgKiBfcmVmcmVzaFNwcml0ZXMgLSBSZWZyZXNoIHRoZSBET00gZWxlbWVudCBvZiBhbGwgc3ByaXRlcyBjdXJyZW50bHkgb24gc3RhZ2UuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBfcmVmcmVzaFNwcml0ZXMoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIHRoaXMuc3ByaXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBzcHJpdGUgPSBpdGVtO1xuICAgICAgaSArPSAxO1xuICAgICAgc3ByaXRlLnogPSBpO1xuICAgICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlQmFja3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSBvbmUgcGxhY2UgZG93biB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3ByaXRlcy5pbmRleE9mKHNwcml0ZSk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCAtIDFdOyAvLyBtb3ZlIG9uZSB1cFxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4IC0gMV0gPSBzcHJpdGU7IC8vIG1lIHN1YmplY3QgZG93blxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZUZvcndhcmQgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uZSBwbGFjZSB1cCBpbiB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUZvcndhcmQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVGb3J3YXJkKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNwcml0ZXMubGVuZ3RoIC0gMSAmJiBpbmRleCAhPT0gLTEpIHtcbiAgICAgIHRoaXMuc3ByaXRlc1tpbmRleF0gPSB0aGlzLnNwcml0ZXNbaW5kZXggKyAxXTsgLy8gbW92ZSBvbmUgZG93blxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4ICsgMV0gPSBzcHJpdGU7IC8vIG1lIHN1YmplY3QgdXBcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaFNwcml0ZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVUb0Zyb250IC0gQnJpbmdzIHRoZSBzcHJpdGUgdG8gdGhlIGZyb250IG9mIHRoZSBcInBpbGVcIlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNlbmRTcHJpdGVUb0Zyb250KHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlVG9Gcm9udChzcHJpdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3ByaXRlcy5pbmRleE9mKHNwcml0ZSk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5zcHJpdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZVRvQmFjayAtIFNlbmRzIHRoZSBzcHJpdGUgdG8gdGhlIGJhY2sgb2YgdGhlIFwicGlsZVwiXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZVRvQmFjayhzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZVRvQmFjayhzcHJpdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3ByaXRlcy5pbmRleE9mKHNwcml0ZSk7XG4gICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgdGhpcy5zcHJpdGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB0aGlzLnNwcml0ZXMudW5zaGlmdChzcHJpdGUpO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyogc2Vuc2luZyAqL1xuXG4gIC8qKlxuICAqIGlzS2V5UHJlc3NlZCAtIENoZWNrcyBpZiBhIGtleSBpcyBwcmVzc2VkLiBTdGFnZSBzZW5zaW5nIG11c3QgYmUgZW5hYmxlZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5KHN0YWdlLmlzS2V5UHJlc3NlZCgnYScpKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1c2VyS2V5IC0gdGhlIGtleSBwcmVzc2VkLiBNYXkgYmUgdGhlIGNvZGUgb3IgdGhlIGNoYXJhY3RlciBpdHNlbGYgKEEgb3IgNjUpXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgaXNLZXlQcmVzc2VkKHVzZXJLZXkpIHtcbiAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICBsZXQgY2hlY2s7XG5cbiAgICB0eXBlb2YgdXNlcktleSA9PT0gJ3N0cmluZycgPyBjaGVjayA9IHVzZXJLZXkudG9Mb3dlckNhc2UoKSA6IGNoZWNrID0gdXNlcktleTtcbiAgICAvLyBNYWtlIHN1cmUgZWFjaCBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgYnkgYnJvd3NlcnMuXG4gICAgLy8gTm90ZTogdXNlciBtYXkgd3JpdGUgaW5jb21wYXRpYmxlIGNvZGUuXG4gICAgdGhpcy5rZXlzS2V5LmluZGV4T2YoY2hlY2spICE9PSAtMSA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgdGhpcy5rZXlzQ29kZS5pbmRleE9mKGNoZWNrKSAhPT0gLTEgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgIHRoaXMua2V5c0tleUNvZGUuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcblxuICAgICF0aGlzLnNlbnNpbmcgPyBjb25zb2xlLmxvZygnQmxvY2tMaWtlLmpzIE5vdGljZTogaXNLZXlQcmVzc2VkKCkgaW5nbm9yZWQuIFN0YWdlIHNlbnNpbmcgbm90IGVuYWJsZWQuJykgOiBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICAgIHJldHVybiBtYXRjaDtcbiAgfVxufVxuIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnRzIGF0dGFjaGVkIHRvIGEgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgbWF5IGhhdmUgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFVpRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIHVpIGVsZW1lbnQgdGhhdCBcImF0dGFoY2VzXCIgdG8gYSBzcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB3aGF0IHVpIHRvIGNyZWF0ZSAoc2F5IGJ1YmJsZSwgdGhpbmsgYnViYmxlIG9yIGFzayBib3gpXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSAgd2hhdCB0aGUgdGV4dCBzYWlkL3Rob3VnaHQvYXNrIHdpbGwgYmUuXG4gICogQHBhcmFtIHtvYmplY3R9IGFza0lkIC0gdGhlIGFzayBib3ggaWRlbnRpZmllciAodXNlZCB0byBtYW5hZ2UgZXZlbnRzKS5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCB0eXBlLCB0ZXh0KSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvKipcbiAgICAqIGFza0lucHV0IC0gZW5jYXBzdWxhdGUgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIGlucHV0IGZpZWxkIHVzZWQgdG8gY2FwdHVyZSB1c2VyIGlucHV0IHdpdGggYXNrKCkuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoZSBpbnB1dCBkb20gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFza0lucHV0KCkge1xuICAgICAgLyoqXG4gICAgICAqIHNlbmRBbnN3ZXIgLSBkaXNwYXRjaGVzIGFuIGV2ZW50IHdoZW4gdGhlIHVzZXIgaGFzIHN1Ym1pdHRlZCB0aGUgaW5wdXQuXG4gICAgICAqL1xuICAgICAgZnVuY3Rpb24gc2VuZEFuc3dlcih2YWx1ZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS5hc2suJHtzcHJpdGUuaWR9LiR7c3ByaXRlLmFza0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlLCBhc2tJZDogc3ByaXRlLmFza0lkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBzdWJtaXQuaW5uZXJIVE1MID0gJyYjeDI3MTMnO1xuICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIH0pO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoc3VibWl0KTtcblxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuaW5uZXJIVE1MID0gYCR7dGV4dH08YnIgLz5gO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcbiAgICBlbC5jbGFzc05hbWUgPSBgYmxvY2tsaWtlLSR7dHlwZX1gO1xuXG4gICAgbGV0IGllbCA9IG51bGw7XG4gICAgaWYgKHR5cGUgPT09ICdhc2snKSB7XG4gICAgICBpZWwgPSBhc2tJbnB1dChzcHJpdGUsIGVsKTtcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDExMCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuICAgIH1cblxuICAgIHNwcml0ZS5lbGVtZW50LmVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBzcHJpdGUuZWxlbWVudC5lbCk7XG4gICAgaWVsID8gaWVsLmZvY3VzKCkgOiBudWxsO1xuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlZCB0aGUgRE9NIGVsZW1lbnQgKG1vdmVzIHdpdGggc3ByaXRlKS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMik7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBpZiAoc3ByaXRlLnRleHR1aS50eXBlID09PSAnYXNrJykge1xuICAgICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gMTEwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG4gICAgfVxuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQgKGhpZGVzIGl0KS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgZGVsZXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG4iXSwic291cmNlUm9vdCI6IiJ9