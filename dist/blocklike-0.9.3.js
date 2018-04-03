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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = apply;
/* harmony export (immutable) */ __webpack_exports__["b"] = register;
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
  const el = entity.element.el;

  // Sprites have Costumes, Stage has Backdrop, figure out which entity it is.
  entity.backdrop ? curEntity.look = entity.backdrop : curEntity.look = entity.costume;
  entity.backdrops ? curEntity.looks = entity.backdrops : curEntity.looks = entity.costumes;

  // remove any style applied by any look
  if (curEntity.looks) {
    curEntity.looks.forEach((b) => {
      b.cssRules.forEach((item) => {
        const camelCased = item.prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
        el.style[camelCased] = '';
      });
    });
  }

  // add current look styles
  if (curEntity.look) {
    curEntity.look.cssRules.forEach((item) => {
      const camelCased = item.prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
      el.style[camelCased] = item.value;
    });
  }

  // Add curEntity styles. Must be done after look styles.
  curEntity.cssRules.forEach((item) => {
    const camelCased = item.prop.replace(/-([a-z])/g, g => g[1].toUpperCase());
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
    const dashed = prop.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
    curEntity.cssRules.push({ prop: dashed, value });
  } else if (typeof prop === 'object' && !value) {
    Object.keys(prop).forEach((key) => {
      const dashed = key.replace(/([A-Z])/g, $1 => `-${$1.toLowerCase()}`);
      curEntity.cssRules.push({ prop: dashed, value: prop[key] });
    });
  }
}


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__rewriter__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__element_css__ = __webpack_require__(0);



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
    const f = Object(__WEBPACK_IMPORTED_MODULE_0__rewriter__["a" /* default */])(func, me);
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
    this._exec(func, []);
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
      this.element.el.addEventListener(eventStr, (e) => {
        me._exec(func, [e]);
        e.stopPropagation();
      });
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
    Entity.messageListeners.push(listenerId);

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
    let myListeners = Entity.messageListeners;
    // dispatch the message
    const event = new window.CustomEvent(msg, { detail: { msgId } });
    document.dispatchEvent(event);

    // listen to those who received the message
    document.addEventListener('blockLike.donewheneeceivemessage', function broadcastMessageWaitListener(e) {
      // if event is for this message remove listenerId from list of listeners.
      (e.detail.msgId === msgId) ? myListeners = myListeners.filter(item => item !== e.detail.listenerId) : null;
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
      this.sounds = this.sounds.filter(item => item !== audio);
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
      this.sounds = this.sounds.filter(item => item !== audio);
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
  * @example
  * let sprite = new blockLike.Sprite();
  *
  * sprite.css({background: '#0000ff'});
  *
  * @param {string} prop - the css property (e.g. color). Alternatively an object with key: value pairs.
  * @param {string} value - the value for the css property (e.g. #ff8833)
  */
  css(prop, value = null) {
    __WEBPACK_IMPORTED_MODULE_1__element_css__["b" /* register */](prop, value, this);
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
    this.classes = this.classes.filter(item => item !== name);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Entity;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = StageSurface;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_css__ = __webpack_require__(0);


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

    // css rules
    __WEBPACK_IMPORTED_MODULE_0__element_css__["a" /* apply */](sprite);

    // css classes
    sprite.costume ? el.className = sprite.costume.classes.concat(sprite.classes).join(' ') : el.className = sprite.classes.join(' ');

    // Background. Must be done after the CSS.
    sprite.costume && sprite.costume.color ? el.style.backgroundColor = sprite.costume.color : el.style.backgroundColor = null;

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
      image.src = sprite.costume.image;
      el.appendChild(image);
    }

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
/* harmony export (immutable) */ __webpack_exports__["a"] = SpriteElement;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_css__ = __webpack_require__(0);


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
    __WEBPACK_IMPORTED_MODULE_0__element_css__["b" /* register */](prop, value, this);
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
    this.classes = this.classes.filter(item => item !== name);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Look;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__look__ = __webpack_require__(4);


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
class Costume extends __WEBPACK_IMPORTED_MODULE_0__look__["a" /* default */] {
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
    };
    const actual = Object.assign({}, defaults, options);

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
  * inner - inserts html into the costume.
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
  * insert - places a dom element inside the sprite.
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
    iel.style.visibility = 'visible';

    this.image = null;
    this.color = 'transparent';
    this.innerHTML = iel.outerHTML;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Costume;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__document_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__platforms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stage__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backdrop__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprite__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__costume__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Stage", function() { return __WEBPACK_IMPORTED_MODULE_2__stage__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Backdrop", function() { return __WEBPACK_IMPORTED_MODULE_3__backdrop__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return __WEBPACK_IMPORTED_MODULE_4__sprite__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Costume", function() { return __WEBPACK_IMPORTED_MODULE_5__costume__["a"]; });
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
    ${__WEBPACK_IMPORTED_MODULE_0__document_css__["b" /* defaultCSS */]}\n\n 
    ${__WEBPACK_IMPORTED_MODULE_0__document_css__["e" /* uiCSS */]}\n\n 
    ${__WEBPACK_IMPORTED_MODULE_0__document_css__["d" /* thinkCSS */]}\n\n 
    ${__WEBPACK_IMPORTED_MODULE_0__document_css__["c" /* sayCSS */]} \n\n 
    ${__WEBPACK_IMPORTED_MODULE_0__document_css__["a" /* askCSS */]}`;

  document.getElementsByTagName('head')[0].appendChild(style);

  Object(__WEBPACK_IMPORTED_MODULE_1__platforms__["a" /* default */])();
}());


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["b"] = defaultCSS;


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
/* harmony export (immutable) */ __webpack_exports__["e"] = uiCSS;


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
/* harmony export (immutable) */ __webpack_exports__["d"] = thinkCSS;


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
/* harmony export (immutable) */ __webpack_exports__["c"] = sayCSS;


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
/* harmony export (immutable) */ __webpack_exports__["a"] = askCSS;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = platforms;
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_element__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stage_surface__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sprite_element__ = __webpack_require__(3);




// import Backdrop from './backdrop';


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
class Stage extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
  /**
  * constructor - Creates a Stage.
  *
  * @param {object} options - Options for the Stage.
  * @param {number} options.width - The stage width in pixels. Default is full window.
  * @param {number} options.height - The stage height in pixels. Default is full window.
  * @param {number} options.pace - The number of milliseconds to wait for each paced method.
  * @param {number} options.parent - The DOM element into which the stage will be inserted. Default is the body.
  * @param {object} options.backdrop - A default Backdrop.
  * @param {boolean} options.sensing - Enables sensing of mouse location and what keys pressed.
  * If true, will constantly update stage properties: mouseX, mouseY, keysKeyCode, keysKeyCode and keysCode based on user input.
  */
  constructor(options = {}) {
    /**
    * enableSensing - Enables sensing of document level events (keydown and mousemove)
    */
    function enableSensing(stage) {
      const me = stage;
      me.sensing = true;

      document.addEventListener('keydown', (e) => {
        e.key && me.keysKey.indexOf(e.key.toLowerCase()) === -1 ? me.keysKey.push(e.key.toLowerCase()) : null;
        e.code && me.keysCode.indexOf(e.code.toLowerCase()) === -1 ? me.keysCode.push(e.code.toLowerCase()) : null;
        me.keysKeyCode.indexOf(e.keyCode) === -1 ? me.keysKeyCode.push(e.keyCode) : null;
      });

      document.addEventListener('keyup', (e) => {
        e.key ? me.keysKey = me.keysKey.filter(item => item !== e.key.toLowerCase()) : null;
        e.code ? me.keysCode = me.keysCode.filter(item => item !== e.code.toLowerCase()) : null;
        me.keysKeyCode = me.keysKeyCode.filter(item => item !== e.keyCode);
      });

      me.element.el.addEventListener('mousemove', (e) => {
        me.mouseX = e.x - me.element.el.offsetLeft - (me.width / 2);
        me.mouseY = -e.y + me.element.el.offsetTop + (me.height / 2);
      });

      me.element.el.addEventListener('mousedown', () => {
        me.mouseDown = true;
      });
      me.element.el.addEventListener('mouseup', () => {
        me.mouseDown = false;
      });

      me.element.el.addEventListener('touchstart', () => {
        me.mouseDown = true;
      });
      me.element.el.addEventListener('touchend', () => {
        me.mouseDown = false;
      });
    }

    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
      parent: document.body,
      pace: 33,
      backdrop: null,
      marginTB: 0,
    };
    const actual = Object.assign({}, defaults, options);

    if (actual.parent === defaults.parent) {
      actual.marginTB = Math.floor((window.innerHeight - actual.height) / 2);
    }

    super(actual.pace);

    // backdrops
    this.backdrops = [];

    //! actual.backdrop ? this.backdrop = new Backdrop() : this.backdrop = actual.backdrop;
    if (actual.backdrop) {
      this.backdrop = actual.backdrop;
      this.backdrops.push(this.backdrop);
    }

    this.element = new __WEBPACK_IMPORTED_MODULE_1__stage_element__["a" /* default */](actual, this);
    this.width = actual.width;
    this.height = actual.height;

    this.keysCode = [];
    this.keysKey = [];
    this.keysKeyCode = [];

    this.mouseDown = null;
    this.mouseX = null;
    this.mouseY = null;

    this.sprites = [];

    this.cssRules = [];
    this.classes = [];

    actual.sensing ? enableSensing(this) : null;

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

    curSprite.element = new __WEBPACK_IMPORTED_MODULE_3__sprite_element__["a" /* default */](sprite, this);
    curSprite.surface = new __WEBPACK_IMPORTED_MODULE_2__stage_surface__["a" /* default */](this);

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

    this.sprites = this.sprites.filter(item => item !== sprite);
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
      this.backdrops = this.backdrops.filter(item => item !== backdrop);
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
    if (index < this.sprites.length - 1) {
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
    this.sprites.splice(index, 1);
    this.sprites.push(sprite);
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
    this.sprites.splice(index, 1);
    this.sprites.unshift(sprite);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Stage;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rewrite;
/**
* Encapsulates the functionality of rewriting user code to allow for BlockLike.js features.
*/

/**
* insertPaced - inserts a timed await line after any method that is on the list of paced methods.
*
* @param {string} item - a line of code.
* @param {entity} entity - the entity triggering the method.
*
* @return {string} - a modified line of code.
*/
function insertPaced(item, entity) {
  let found = false;
  let i = entity.paced.length;

  while (i) {
    i -= 1;
    item.indexOf(`.${entity.paced[i]}(`) !== -1 ? (found = true) : null;
    if (found) {
      break;
    }
  }

  return found ? `${item}\n await new Promise(resolve => setTimeout(resolve, ${entity.pace}));` : item;
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
  let i;

  // look for waited methods.
  i = entity.waited.length;
  while (i) {
    i -= 1;
    item.indexOf(`.${entity.waited[i]}(`) !== -1 ? (found = entity.waited[i]) : null;
    if (found) {
      break;
    }
  }

  // not a normal "waited". look for waitedReturned.
  if (!found) {
    let theVar = null;

    i = entity.waitedReturned.length;
    while (i) {
      i -= 1;
      item.indexOf(`.${entity.waitedReturned[i]}(`) !== -1 ? (found = entity.waitedReturned[i]) : null;
      if (found) {
        break;
      }
    }

    // code for waitedReturn
    theVar = item.substr(0, item.indexOf('=')).replace('let', '').replace('var', '').trim();
    code = `${item.substring(0, item.lastIndexOf(')'))}, '${theVar}', '${entity.triggeringId}')`;

    // invoke is "forgiving". may, or may not, have variables.
    found === 'invoke' && (item.indexOf(',') === -1) ? code = `${item.substring(0, item.lastIndexOf(')'))}, [], '${theVar}', '${entity.triggeringId}')` : null;
  } else {
    // code for "normal" waited
    code = `${item.substring(0, item.lastIndexOf(')'))}, '${entity.triggeringId}')`;
  }

  // entity.triggeringId creates a unique context to chain the waited methods.
  code = `
    ${code}\n 
    await new Promise(resolve => {
      document.addEventListener('blockLike.waited.${entity.triggeringId}', function waitedListener(e) {
        document.removeEventListener('blockLike.waited.${entity.triggeringId}', waitedListener);
        resolve();
      });
    });
    `;

  return found ? code : item;
}

/**
* insertAsync - Adds keyword async to function deceleration.
* Will catch all named function decelerations with a space after the keyword 'function'
*
* @param {string} item - a line of code.
* @return {string} - a modified line of code.
*/
function insertAsync(item) {
  const exist = item.indexOf('async ');
  const regExp = /function |function\(|function( |\t)\(/;
  const matches = regExp.exec(item);

  return exist === -1 && matches ? `${item.substring(0, matches.index)} async ${item.substring(matches.index, item.length)}` : item;
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

    code = code.split('\n').filter(item => item !== '');

    code = code.map((item) => {
      const temp = item;
      let result = temp;

      // a method can be one of the following but not more than one
      result === temp ? result = insertPaced(temp, entity) : null; // more likely
      result === temp ? result = insertWaited(temp, entity) : null; // less likely

      // and only if not a method will add async to functions
      result === temp ? result = insertAsync(temp) : null;

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
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__element_css__ = __webpack_require__(0);


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

    el.style.margin = `${options.marginTB}px auto`;

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

    this.el = createDiv(0);
    this.el.id = `${stage.id}-container`;
    this.el.className = 'blocklike-panel-container';
    el.appendChild(this.el);

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

    // css rules
    __WEBPACK_IMPORTED_MODULE_0__element_css__["a" /* apply */](stage);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = StageElement;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__look__ = __webpack_require__(4);


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
class Backdrop extends __WEBPACK_IMPORTED_MODULE_0__look__["a" /* default */] {
  /**
  * constructor - Creates a Backdrop to be used by Stage objects.
  *
  * @param {object} options - options for the backdrop.
  * @param {string} options.image - a URI (or data URI) for the backdrop image.
  * @param {string} options.color - a css color string ('#ff0000', 'red')
  */
  constructor(options = {}) {
    const defaults = {};
    const actual = Object.assign({}, defaults, options);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = Backdrop;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_surface__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprite_element__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__costume__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__text_ui_element__ = __webpack_require__(14);







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
 * let confetti = new blockLike.Sprite('https://www.blocklike.org/images/confetti.svg');
 *
 * @example
 * let bareZeroSizedSprite = new blockLike.Sprite(null);
 */
class Sprite extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
  /**
  * constructor - Creates a Sprite to be added to Stage.
  *
  * @param {object} options - options for the sprite.
  * Alternatively an image url. If a url is provided default costume will be sized to image.
  * @param {number} options.pace - The number of milliseconds to wait for each paced method.
  * @param {object} options.costume - A default Costume.
  */
  constructor(options = {}) {
    const sheepy = 'data:image/png;base64,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';
    const defaults = {
      pace: 33,
      costume: null,
    };

    const actual = Object.assign({}, defaults, options);

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
      actual.costume = new __WEBPACK_IMPORTED_MODULE_3__costume__["a" /* default */]({ image: options, width: 0, height: 0 });
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
    * alternate options - null.
    * user can null instead of an option object.
    * this is same as setting a costume with no image or color and width/height of 0.
    * the sprite will have no costumes and no size.
    */

    // set costumes based on settings
    !actual.costume && options ? this.costume = new __WEBPACK_IMPORTED_MODULE_3__costume__["a" /* default */]({ image: sheepy }) : this.costume = actual.costume;

    if (this.costume) {
      this.costumes.push(this.costume);
      this.width = this.costume.visibleWidth;
      this.height = this.costume.visibleHeight;
    } else {
      this.width = 0;
      this.height = 0;
    }

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

    this.element = new __WEBPACK_IMPORTED_MODULE_2__sprite_element__["a" /* default */](this, stage);
    this.surface = new __WEBPACK_IMPORTED_MODULE_1__stage_surface__["a" /* default */](stage);

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
      const costume = new __WEBPACK_IMPORTED_MODULE_3__costume__["a" /* default */]();
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

    curStage.sprites = stage.sprites.filter(item => item !== this);
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
      this.costumes = this.costumes.filter(item => item !== costume);
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
  * inner - Places html element inside the current costume of the sprite.
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
    this.magnification = this.magnification + change;

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
      typeof text !== 'undefined' && text.toString() ? this.textui = new __WEBPACK_IMPORTED_MODULE_4__text_ui_element__["a" /* default */](this, 'think', text) : null;
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
      this.say('');
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
      typeof text !== 'undefined' && text.toString() ? this.textui = new __WEBPACK_IMPORTED_MODULE_4__text_ui_element__["a" /* default */](this, 'say', text) : null;
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
      typeof text !== 'undefined' && text.toString() ? this.textui = new __WEBPACK_IMPORTED_MODULE_4__text_ui_element__["a" /* default */](me, 'ask', text) : null;

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
    this.penSize = this.penSize + change;
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
      this.x + (this.width / 2) > sprite.x - (sprite.width / 2) &&
      this.x - (this.width / 2) < sprite.x + (sprite.width / 2) &&
      this.y + (this.height / 2) > sprite.y - (sprite.height / 2) &&
      this.y - (this.height / 2) < sprite.y + (sprite.height / 2)
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
        result.push(rgbToHex(data[i], data[i + 1], data[i + 2]));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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
/* harmony export (immutable) */ __webpack_exports__["a"] = TextUiElement;



/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNGJiNWVlYWYxYmMzZWQxNTJiNzUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQtY3NzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLXN1cmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3N0dW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvY3VtZW50LWNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmV3cml0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tkcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7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LE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFVBQVUsUUFBUSxFQUFFO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxVQUFVLFFBQVEsRUFBRTtBQUNuRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNB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Q0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQzs7QUFFbkM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QSx3QkFBd0IsZ0ZBQWdGO0FBQ3hHOztBQUVBLDZCQUE2Qix3Q0FBd0M7QUFDckU7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUEiLCJmaWxlIjoiYmxvY2tsaWtlLTAuOS4zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgNGJiNWVlYWYxYmMzZWQxNTJiNzUiLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIG1hbmFnaW5nIGVsZW1lbnQgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIGVudGl0aWVzLlxuKi9cblxuLyoqXG4qIGFwcGx5IC0gYXBwbHkgY3NzUnVsZXMgb2YgYW4gZW50aXR5IHRvIGl0cyBET00gZWxlbWVudC5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG4gIGNvbnN0IGVsID0gZW50aXR5LmVsZW1lbnQuZWw7XG5cbiAgLy8gU3ByaXRlcyBoYXZlIENvc3R1bWVzLCBTdGFnZSBoYXMgQmFja2Ryb3AsIGZpZ3VyZSBvdXQgd2hpY2ggZW50aXR5IGl0IGlzLlxuICBlbnRpdHkuYmFja2Ryb3AgPyBjdXJFbnRpdHkubG9vayA9IGVudGl0eS5iYWNrZHJvcCA6IGN1ckVudGl0eS5sb29rID0gZW50aXR5LmNvc3R1bWU7XG4gIGVudGl0eS5iYWNrZHJvcHMgPyBjdXJFbnRpdHkubG9va3MgPSBlbnRpdHkuYmFja2Ryb3BzIDogY3VyRW50aXR5Lmxvb2tzID0gZW50aXR5LmNvc3R1bWVzO1xuXG4gIC8vIHJlbW92ZSBhbnkgc3R5bGUgYXBwbGllZCBieSBhbnkgbG9va1xuICBpZiAoY3VyRW50aXR5Lmxvb2tzKSB7XG4gICAgY3VyRW50aXR5Lmxvb2tzLmZvckVhY2goKGIpID0+IHtcbiAgICAgIGIuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjYW1lbENhc2VkID0gaXRlbS5wcm9wLnJlcGxhY2UoLy0oW2Etel0pL2csIGcgPT4gZ1sxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSAnJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gYWRkIGN1cnJlbnQgbG9vayBzdHlsZXNcbiAgaWYgKGN1ckVudGl0eS5sb29rKSB7XG4gICAgY3VyRW50aXR5Lmxvb2suY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY2FtZWxDYXNlZCA9IGl0ZW0ucHJvcC5yZXBsYWNlKC8tKFthLXpdKS9nLCBnID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgY3VyRW50aXR5IHN0eWxlcy4gTXVzdCBiZSBkb25lIGFmdGVyIGxvb2sgc3R5bGVzLlxuICBjdXJFbnRpdHkuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgZyA9PiBnWzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgIGVsLnN0eWxlW2NhbWVsQ2FzZWRdID0gaXRlbS52YWx1ZTtcbiAgfSk7XG59XG5cbi8qKlxuKiByZWdpc3RlciAtIHJlZ2lzdGVyIGNzc1J1bGVzIG9mIGZvciBhbiBlbnRpdHkgYmFzZWQgb24gdXNlciBpbnB1dC5cbiogTm90ZTogQWxsIHJ1bGVzIGFyZSByZWdpc3RlcmVkIGRhc2gtY2FzZSBhLWxhIGNzcy5cbiogVGhpcyBpcyByZWdhcmRsZXNzIG9mIGhvdyB0aGV5IGFyZSBzZXQgYW5kIHRob3VnaCB0aGV5IGFyZSB1c2VkIGNhbWVsQ2FzZS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgZm9yIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gI2ZmODgzMylcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHByb3AsIHZhbHVlLCBlbnRpdHkpIHtcbiAgY29uc3QgY3VyRW50aXR5ID0gZW50aXR5O1xuXG4gIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGRhc2hlZCA9IHByb3AucmVwbGFjZSgvKFtBLVpdKS9nLCAkMSA9PiBgLSR7JDEudG9Mb3dlckNhc2UoKX1gKTtcbiAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWUgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmICF2YWx1ZSkge1xuICAgIE9iamVjdC5rZXlzKHByb3ApLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgZGFzaGVkID0ga2V5LnJlcGxhY2UoLyhbQS1aXSkvZywgJDEgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWU6IHByb3Bba2V5XSB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlbWVudC1jc3MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHJld3JpdGUgZnJvbSAnLi9yZXdyaXRlcic7XG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVudGl0eS5cbiAqIEFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gRW50aXR5IGlzIGFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhY2UgLSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBwYWNlIHBhY2VkIG1ldGhvZHMuXG4gICovXG4gIGNvbnN0cnVjdG9yKHBhY2UpIHtcbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuaWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICB0aGlzLnBhY2UgPSBwYWNlO1xuICAgIHRoaXMuc291bmRzID0gW107IC8vIHdpbGwgaG9sZCBhbGwgc291bmRzIGN1cnJlbnRseSBwbGF5ZWQgYnkgZW50aXR5LCBpZiBhbnkuXG4gICAgLypcbiAgICAqIFBhY2VkIG1ldGhvZHMgd29yayBpbiB0aGUgZm9sbG93aW5nIG1hbm5lcjpcbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciBwYWNlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgcGFjZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYWZ0ZXIge3BhY2V9IG1pbGxpc2Vjb25kcy5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgcGFjZWQgbWV0aG9kIHRvIGhhbHQgZXhlY3V0aW9uIG9mIGFueSBjb2RlIGZvbGxvd2luZyBpdCB1bnRpbCBpdCBpcyBkb25lLlxuICAgICovXG4gICAgdGhpcy5wYWNlZCA9IFtcbiAgICAgICdnb1RvJyxcbiAgICAgICdtb3ZlJyxcbiAgICAgICdjaGFuZ2VYJyxcbiAgICAgICdjaGFuZ2VZJyxcbiAgICAgICdzZXRYJyxcbiAgICAgICdzZXRZJyxcbiAgICAgICdnb1Rvd2FyZHMnLFxuICAgICAgJ3R1cm5SaWdodCcsXG4gICAgICAndHVybkxlZnQnLFxuICAgICAgJ3BvaW50SW5EaXJlY3Rpb24nLFxuICAgICAgJ3BvaW50VG93YXJkcycsXG4gICAgICAnY2hhbmdlU2l6ZScsXG4gICAgICAnc2V0U2l6ZScsXG4gICAgICAnc2F5JyxcbiAgICAgICd0aGluaycsXG4gICAgICAncmVmcmVzaCcsXG4gICAgXTtcblxuICAgIC8qXG4gICAgKiBXYWl0ZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZyBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZCA9IFtcbiAgICAgICd3YWl0JyxcbiAgICAgICdnbGlkZScsXG4gICAgICAnc2F5V2FpdCcsXG4gICAgICAndGhpbmtXYWl0JyxcbiAgICAgICdwbGF5U291bmRVbnRpbERvbmUnLFxuICAgICAgJ2Jyb2FkY2FzdE1lc3NhZ2VXYWl0JyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIHdhaXRlZFJldHVucmVkIG1ldGhvZHMgd29yayBzaW1pbGFybHkgdG8gd2FpdGVkIG1ldGhvZHMgb25seSB0aGF0IHRoZXkgZW5hYmxlIGNhcHR1cmluZyBhIHZhbHVlXG4gICAgKiBpbnRvIGEgZ2xvYmFsbHkgZGVjbGFyZWQgdmFyaWFibGUgKG9yIGFuIHVuZGVjbGFyZWQgb25lKS5cbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciB3YWl0ZWRSZXR1cm5lZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZzpcbiAgICAqICAgLSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgaW50byB3aGljaCBhIHZhbHVlIGlzIHJldHVybmVkLlxuICAgICogICAtIGEgdHJpZ2dlcmluZ0lkIHBhcmFtZXRlci5cbiAgICAqIDQuIFRoZSBldmVudCBsaXN0ZW5lciBpcyB1bmlxdWUgdG8gdGhlIHRyaWdnZXJpbmdJZC5cbiAgICAqIDUuIFdoZW4gdGhlIG1ldGhvZCBjb21wbGV0ZXMgcnVubmluZyBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHJlc29sdmluZyB0aGUgcHJvbWlzZS5cbiAgICAqIDYuIFRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cmFuc2ZlcmVkIGludG8gdGhlIHZhcmlhYmxlIHVzaW5nIGV2YWwuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKiBBdCB3aGljaCBwb2ludCB0aGUgdmFyaWFibGUgaGFzIFwiY2FwdHVyZWRcIiB0aGUgdmFsdWUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZFJldHVybmVkID0gW1xuICAgICAgJ2ludm9rZScsXG4gICAgICAnYXNrJyxcbiAgICBdO1xuICB9XG5cbiAgLyoqXG4gICogX2dlbmVyYXRlVVVJRCAtIGdlbmVyYXRlcyBhIHVuaXF1ZSBJRC5cbiAgKiBTb3VyY2U6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA1MDM0L2NyZWF0ZS1ndWlkLXV1aWQtaW4tamF2YXNjcmlwdFxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSB1bmlxdWUgaWQuXG4gICovXG4gIF9nZW5lcmF0ZVVVSUQoKSB7XG4gICAgbGV0IGQ7XG4gICAgbGV0IHI7XG5cbiAgICBkID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICBpZiAod2luZG93LnBlcmZvcm1hbmNlICYmIHR5cGVvZiB3aW5kb3cucGVyZm9ybWFuY2Uubm93ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkICs9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKTsgLy8gdXNlIGhpZ2gtcHJlY2lzaW9uIHRpbWVyIGlmIGF2YWlsYWJsZVxuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSAneHh4eHh4eHgteHh4eC00eHh4LXl4eHgteHh4eHh4eHh4eHh4Jy5yZXBsYWNlKC9beHldL2csIChjKSA9PiB7XG4gICAgICByID0gKGQgKyBNYXRoLnJhbmRvbSgpICogMTYpICUgMTYgfCAwOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9ycywgbm8tYml0d2lzZVxuICAgICAgZCA9IE1hdGguZmxvb3IoZCAvIDE2KTtcbiAgICAgIHJldHVybiAoYyA9PT0gJ3gnID8gciA6IChyICYgMHgzIHwgMHg4KSkudG9TdHJpbmcoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW1peGVkLW9wZXJhdG9ycywgbm8tYml0d2lzZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHV1aWQ7XG4gIH1cblxuICAvKipcbiAgKiBfcmVsZWFzZVdhaXRlZCAtIHJlbGVhc2VzIGEgd2FpdGVkIHByb21pc2UgYnkgZGlzcGF0Y2hpbmcgYW4gZXZlbnQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7c3RyaW5nfSB0cmlnZ2VyaW5nSWQgLSB0aGUgbmFtZSBvZiB0aGUgZXZlbnQgdGhhdCBpbnZva2VkIHRoZSBjb2RlIHRoYXQgcmVxdWVzdGVkIHRoZSB3YWl0LlxuICAqL1xuICBfcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpIHtcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS53YWl0ZWQuJHt0cmlnZ2VyaW5nSWR9YCwgeyBkZXRhaWw6IHsgdmFsdWU6IDAgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAqIF9zZXRUb1ZhciAtIHNldHMgYSBnbG9iYWxseSBzY29wZWQgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHdobydzIG5hbWUgaXMgc3BlY2lmaWVkIGFzIGEgYSBzdHJpbmdcbiAgKiB3aXRoIHRoZSB2YWx1ZSBwcm92aWRlZC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHt2YXJTdHJpbmd9IHRleHQgLSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgdG8gd2hpY2ggdmFsdWUgc2hvdWxkIGJlIHNldC5cbiAgKiBAcGFyYW0ge2FueX0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gc2V0LlxuICAqL1xuICBfc2V0VG9WYXIodmFyU3RyaW5nLCB2YWx1ZSkge1xuICAgIHRyeSB7XG4gICAgICBldmFsKGAke3ZhclN0cmluZ30gPSAnJHt2YWx1ZX0nYCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tZXZhbFxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aHJvdyAoJ0Jsb2NrTGlrZS5qcyBFcnJvcjogVmFyaWFibGVzIGFjY2VwdGluZyBhIHZhbHVlIG11c3QgYmUgZGVjbGFyZWQgaW4gdGhlIGdsb2JhbCBzY29wZS4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby10aHJvdy1saXRlcmFsXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogX2V4ZWMgLSBhc3luY2hyb25vdXMgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICAqIFRoaXMgaXMgd2hhdCBjcmVhdGVzIHRoZSBcInBhY2VkXCIgZXhlY3V0aW9uIG9mIHRoZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9ucy5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKiBAcGFyYW0ge2FycmF5fSBhcmdzQXJyIC0gYW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uLlxuICAqL1xuICBfZXhlYyhmdW5jLCBhcmdzQXJyKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIG1lLnRyaWdnZXJpbmdJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIGNvbnN0IGYgPSByZXdyaXRlKGZ1bmMsIG1lKTtcbiAgICByZXR1cm4gZi5hcHBseShtZSwgYXJnc0Fycik7XG4gIH1cblxuICAvKipcbiAgKiBpbnZva2UgLSBpbnZva2UgYSBmdW5jdGlvbi4gQWxsb3dzIHBhc3NpbmcgYW4gYXJndW1lbnQgb3IgYXJyYXkgb2YgYXJndW1lbnRzLlxuICAqIEZ1bmN0aW9uIHdpbGwgYmUgXCJwYWNlZFwiIGFuZCBjb2RlIGV4ZWN1dGlvbiB3aWxsIGJlIFwid2FpdGVkXCIgdW50aWwgaXQgaXMgY29tcGxldGVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkZsYWcoKCkgPT4ge1xuICAqICAgdGhpcy5pbnZva2UoanVtcCk7XG4gICogICB0aGlzLmludm9rZSh0YWxrLCAnaGknKTtcbiAgKiAgIHRoaXMuaW52b2tlKHBhdHRlcm4sIFs1LCA1MCwgMTJdKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICogQHBhcmFtIHthcnJheX0gYXJnc0FyciAtIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbi4gQSBzaW5nbGUgdmFyaWFibGUgYWxzbyBhY2NlcHRlZC5cbiAgKi9cbiAgaW52b2tlKGZ1bmMsIGFyZ3NBcnIsIHRoZVZhciA9IG51bGwsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0aGVWYXIgYW5kIHRyaWdnZXJpbmdJZCBhcmUgbm90IHVzZXIgc3VwcGxpZWQsIHRoZXkgYXJlIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIGxldCBhcmdzID0gYXJnc0FycjtcbiAgICAhKGFyZ3NBcnIgaW5zdGFuY2VvZiBBcnJheSkgPyBhcmdzID0gW2FyZ3NBcnJdIDogbnVsbDtcblxuICAgIHRoaXMuX2V4ZWMoZnVuYywgYXJncykudGhlbigocmVzdWx0KSA9PiB7XG4gICAgICAvLyB0aGlzIGlzIHRoZSB3YWl0ZWQgbWV0aG9kIGxpc3RlbmVyLiByZWxlYXNlIGl0LlxuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgLy8gc2V0IHRoZSB1c2VyIGRlZmluZWQgdmFyaWFibGUgdG8gdGhlIGNhcHR1cmVkIHZhbHVlLlxuICAgICAgdGhlVmFyID8gdGhpcy5fc2V0VG9WYXIodGhlVmFyLCByZXN1bHQpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHdhaXQgLSBjcmVhdGVzIGEgcGF1c2UgaW4gZXhlY3V0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiB0aGlzLndhaXQoNSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCB0aW1lID0gNTtcbiAgKiB0aGlzLndhaXQodGltZSAqIDAuOTUpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuIE11c3QgYmUgYW4gYWN0dWFsIG51bWJlci5cbiAgKi9cbiAgd2FpdChzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0cmlnZ2VyaW5nSWQgaXMgbm90IHVzZXIgc3VwcGxpZWQsIGl0IGlzIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgIH0sIHNlYyAqIDEwMDApO1xuICB9XG4gIC8qKiBFdmVudHMgKiAqL1xuXG4gIC8qKlxuICAqIHdoZW5Mb2FkZWQgLSBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKiBUbyBiZSB1c2VkIHdpdGggY29kZSB0aGF0IG5lZWRzIHRvIHJ1biBvbmxvYWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5Mb2FkZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5Mb2FkZWQoZnVuYykge1xuICAgIHRoaXMuX2V4ZWMoZnVuYywgW10pO1xuICB9XG5cbiAgLyoqXG4gICogd2hlbkZsYWcgLSBhZGRzIGEgZmxhZyB0byBjb3ZlciB0aGUgc3RhZ2Ugd2l0aCBhbiBldmVudCBsaXN0ZW5lciBhdHRhY2hlZC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIHJlbW92ZSB0aGUgZmxhZyBkaXYgYW5kIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkZsYWcoZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICBtZS5lbGVtZW50LmFkZEZsYWcodGhpcyk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5mbGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVGbGFnKG1lKTtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5DbGlja2VkIC0gYWRkcyBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBzcHJpdGUgb3Igc3RhZ2UuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5DbGlja2VkKGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5LZXlQcmVzc2VkIC0gYWRkcyBhIGtleXByZXNzIGV2ZW50IGxpc3RlbmVyIHRvIGRvY3VtZW50LlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5LZXlQcmVzc2VkKCcgJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnU3BhY2VwcmVzc2VkJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcktleSAtIHRoZSBrZXkgcHJlc3NlZC4gbWF5IGJlIHRoZSBjb2RlIG9yIHRoZSBjaGFyYWN0ZXIgaXRzZWxmIChBIG9yIDY1KVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5LZXlQcmVzc2VkKHVzZXJLZXksIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgbGV0IGNoZWNrO1xuICAgIHR5cGVvZiB1c2VyS2V5ID09PSAnc3RyaW5nJyA/IGNoZWNrID0gdXNlcktleS50b0xvd2VyQ2FzZSgpIDogY2hlY2sgPSB1c2VyS2V5O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAgIC8vIE5vdGU6IHVzZXIgbWF5IHdyaXRlIGluY29tcGF0aWJsZSBjb2RlLlxuICAgICAgZS5jb2RlICYmIGUuY29kZS50b0xvd2VyQ2FzZSgpID09PSBjaGVjayA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgICBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpID09PSBjaGVjayA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgICBlLmtleUNvZGUgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiB3aGVuRXZlbnQgLSBhZGRzIHRoZSBzcGVjaWZpZWQgZXZlbnQgbGlzdGVuZXIgdG8gc3ByaXRlL3N0YWdlLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5FdmVudCgnbW91c2VvdmVyJywgKGUpID0+IHtcbiAgKiAgIGNvbnNvbGUubG9nKGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50U3RyIC0gdGhlIG5hbWVkIGV2ZW50IChtb3NlbW92ZSBldGMuKS5cbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuRXZlbnQoZXZlbnRTdHIsIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRTdHIsIChlKSA9PiB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB3aGVuUmVjZWl2ZU1lc3NhZ2UgLSBhZGRzIHRoZSBzcGVjaWZpZWQgZXZlbnQgbGlzdGVuZXIgdG8gZG9jdW1lbnQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlblJlY2VpdmVNZXNzYWdlKCdtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoLTEwKTtcbiAgKiB9KVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIHRoZSBuYW1lZCBtZXNzYWdlIChldmVudCk7XG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlblJlY2VpdmVNZXNzYWdlKG1zZywgZnVuYykge1xuICAgIGNvbnN0IGxpc3RlbmVySWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICAvLyByZWdpc3RlciBhcyBhIG1lc3NhZ2UgbGlzdGVuZXIuXG4gICAgRW50aXR5Lm1lc3NhZ2VMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcklkKTtcblxuICAgIC8vIGxpc3RlbiB0byBzcGVjaWZpZWQgbWVzc2FnZVxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIobXNnLCAoZSkgPT4ge1xuICAgICAgLy8gZXhlY3V0ZSB0aGUgZnVuYyBhbmQgdGhlblxuICAgICAgdGhpcy5fZXhlYyhmdW5jLCBbZV0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAvLyBkaXNwYXRjaCBhbiBldmVudCB0aGF0IGlzIHVuaXF1ZSB0byB0aGUgbGlzdGVuZXIgYW5kIG1lc3NhZ2UgcmVjZWl2ZWQuXG4gICAgICAgIGNvbnN0IG1zZ0lkID0gZS5kZXRhaWwubXNnSWQ7XG4gICAgICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgnYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCB7IGRldGFpbDogeyBtc2dJZCwgbGlzdGVuZXJJZCB9IH0pO1xuXG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBicm9hZGNhc3RNZXNzYWdlIC0gZGlzcGF0Y2hlcyBhIGN1c3RvbSBldmVudCB0aGF0IGFjdHMgYXMgYSBnbG9iYWwgbWVzc2FnZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoZnVuY3Rpb24oKSB7XG4gICogIHN0YWdlLmJyb2FkY2FzdE1lc3NhZ2UoJ21vdmUnKVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIHRoZSBuYW1lZCBtZXNzYWdlIChldmVudClcbiAgKi9cbiAgYnJvYWRjYXN0TWVzc2FnZShtc2cpIHtcbiAgICBjb25zdCBtc2dJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChtc2csIHsgZGV0YWlsOiB7IG1zZ0lkIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvKipcbiAgKiBicm9hZGNhc3RNZXNzYWdlV2FpdCAtIGRpc3BhdGNoZXMgYSBjdXN0b20gZXZlbnQgdGhhdCBhY3RzIGFzIGEgZ2xvYmFsIG1lc3NhZ2UuXG4gICogV2FpdHMgZm9yIGFsbCB3aGVuUmVjZWl2ZU1lc3NhZ2UgbGlzdGVuZXJzIHRvIGNvbXBsZXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogc3ByaXRlLndoZW5SZWNlaXZlTWVzc2FnZSgnbW92ZScsIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5tb3ZlKC0xMCk7XG4gICogICB0aGlzLndhaXQoNSk7XG4gICogfSlcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKGZ1bmN0aW9uKCkge1xuICAqICBzdGFnZS5icm9hZGNhc3RNZXNzYWdlV2FpdCgnbW92ZScpO1xuICAqICBzcHJpdGUuc2F5KCdBbGwgZG9uZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG1zZyAtIHRoZSBuYW1lZCBtZXNzYWdlIChldmVudClcbiAgKi9cbiAgYnJvYWRjYXN0TWVzc2FnZVdhaXQobXNnLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgY29uc3QgbXNnSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICAvLyBzYXZlIHJlZ2lzdGVyZWQgbGlzdGVuZXJzIGZvciB0aGlzIGJyb2FkY2FzdC5cbiAgICBsZXQgbXlMaXN0ZW5lcnMgPSBFbnRpdHkubWVzc2FnZUxpc3RlbmVycztcbiAgICAvLyBkaXNwYXRjaCB0aGUgbWVzc2FnZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChtc2csIHsgZGV0YWlsOiB7IG1zZ0lkIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG5cbiAgICAvLyBsaXN0ZW4gdG8gdGhvc2Ugd2hvIHJlY2VpdmVkIHRoZSBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCBmdW5jdGlvbiBicm9hZGNhc3RNZXNzYWdlV2FpdExpc3RlbmVyKGUpIHtcbiAgICAgIC8vIGlmIGV2ZW50IGlzIGZvciB0aGlzIG1lc3NhZ2UgcmVtb3ZlIGxpc3RlbmVySWQgZnJvbSBsaXN0IG9mIGxpc3RlbmVycy5cbiAgICAgIChlLmRldGFpbC5tc2dJZCA9PT0gbXNnSWQpID8gbXlMaXN0ZW5lcnMgPSBteUxpc3RlbmVycy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBlLmRldGFpbC5saXN0ZW5lcklkKSA6IG51bGw7XG4gICAgICAvLyBhbGwgbGlzdGVuZXJzIHJlc3BvbmRlZC5cbiAgICAgIGlmICghbXlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgZXZlbnQgbGlzdGVuZXJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLmRvbmV3aGVuZWVjZWl2ZW1lc3NhZ2UnLCBicm9hZGNhc3RNZXNzYWdlV2FpdExpc3RlbmVyKTtcbiAgICAgICAgLy8gcmVsZWFzZSB0aGUgd2FpdFxuICAgICAgICBtZS5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqIFNvdW5kICogKi9cblxuICAvKipcbiAgKiBwbGF5U291bmQgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZCgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kKHVybCkge1xuICAgIGNvbnN0IGF1ZGlvID0gbmV3IHdpbmRvdy5BdWRpbyh1cmwpO1xuICAgIGF1ZGlvLnBsYXkoKTtcbiAgICB0aGlzLnNvdW5kcy5wdXNoKGF1ZGlvKTtcbiAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHtcbiAgICAgIHRoaXMuc291bmRzID0gdGhpcy5zb3VuZHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gYXVkaW8pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kTG9vcCAtIHBsYXlzIGEgc291bmQgZmlsZSAobXAzLCB3YXYpIGFnYWluIGFuZCBhZ2FpblxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZExvb3AoJy4uLy4uL3NvdW5kcy9ibGVhdC53YXYnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgLSB0aGUgdXJsIG9mIHRoZSBmaWxlIHRvIHBsYXkuXG4gICovXG4gIHBsYXlTb3VuZExvb3AodXJsKSB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXVkaW8ucGxheSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogcGxheVNvdW5kVW50aWxEb25lIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdikgdW50aWwgZG9uZS5cbiAgKiBUaGlzIGlzIHNpbWlsYXIgdG8gcGxheVNvdW5kIGFuZCB3YWl0IGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIHNvdW5kLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZFVudGlsRG9uZSgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kVW50aWxEb25lKHVybCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBhdWRpbyk7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBzdG9wU291bmRzIC0gc3RvcHMgYWxsIHNvdW5kcyBwbGF5ZWQgYnkgc3ByaXRlIG9yIHN0YWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBsYXlTb3VuZCgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogc3RhZ2Uud2hlbktleVByZXNzZWQoJ0VzY2FwZScsICgpID0+IHtcbiAgKiAgIHRoaXMuc3RvcFNvdW5kcygpO1xuICAqIH0pO1xuICAqL1xuICBzdG9wU291bmRzKCkge1xuICAgIHRoaXMuc291bmRzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGl0ZW0ucGF1c2UoKTtcbiAgICB9KTtcbiAgICB0aGlzLnNvdW5kcyA9IFtdO1xuICB9XG5cbiAgLyogY3NzICovXG5cbiAgLyoqXG4gICogY3NzIC0gYXBwbGllcyBhIENTUyBydWxlIHRvIHRoZSBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuY3NzKCdiYWNrZ3JvdW5kJywgJyMwMDAwZmYnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuY3NzKHtiYWNrZ3JvdW5kOiAnIzAwMDBmZid9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiBjb2xvcikuIEFsdGVybmF0aXZlbHkgYW4gb2JqZWN0IHdpdGgga2V5OiB2YWx1ZSBwYWlycy5cbiAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgZm9yIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gI2ZmODgzMylcbiAgKi9cbiAgY3NzKHByb3AsIHZhbHVlID0gbnVsbCkge1xuICAgIGNzcy5yZWdpc3Rlcihwcm9wLCB2YWx1ZSwgdGhpcyk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRDbGFzcyAtIGFkZHMgYSBjc3MgY2xhc3MgdG8gc3ByaXRlIGFuZCBhbGwgY29zdHVtZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZSB0byBhZGQuXG4gICovXG4gIGFkZENsYXNzKG5hbWUpIHtcbiAgICAhdGhpcy5oYXNDbGFzcyhuYW1lKSA/IHRoaXMuY2xhc3Nlcy5wdXNoKG5hbWUpIDogbnVsbDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUNsYXNzIC0gcmVtb3ZlcyBhIGNzcyBjbGFzcyBmcm9tIHRoZSBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ2xhc3MobmFtZSkge1xuICAgIHRoaXMuY2xhc3NlcyA9IHRoaXMuY2xhc3Nlcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBuYW1lKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGhhc0NsYXNzIC0gaXMgdGhlIGNzcyBjbGFzcyBhcHBsaWVkIHRvIHRoZSBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5oYXNDbGFzcygncmFpbmJvdycpID8gdGhpcy5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogdGhpcy5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUuXG4gICogQHJldHVybiB7Ym9vbGVhbn0gLSBpcyB0aGUgY3NzIGNsYXNzIG5hbWUgb24gdGhlIGxpc3QuXG4gICovXG4gIGhhc0NsYXNzKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5jbGFzc2VzLmluZGV4T2YobmFtZSkgIT09IC0xO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbnRpdHkuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIHN0YWdlIHN1cmZhY2Ugb24gd2hpY2ggc3ByaXRlcyBkcmF3LlxuICogRWFjaCBTdGFnZSBoYXMgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2VTdXJmYWNlIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2Ugb24gd2hpY2ggdGhlIHNwcml0ZSBpcyBkcmF3aW5nLlxuICAqL1xuICBjb25zdHJ1Y3RvcihzdGFnZSkge1xuICAgIHRoaXMuY29udGV4dCA9IHN0YWdlLmVsZW1lbnQuY29udGV4dDtcbiAgfVxuXG4gIC8qKlxuICAqIGRyYXcgLSBkcmF3cyBhIGxpbmUgXCJiZWhpbmRcIiBhIG1vdmluZyBzcHJpdGUuXG4gICogTm90ZTogc3ByaXRlIGFsd2F5cyBoYXMgY3VycmVudCBhbmQgcHJldmlvdXMgeCx5IHZhbHVlcyB0byBhbGxvdyBkcmF3aW5nIHRvIHByZXZpb3VzIGxvY2F0aW9uLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgZHJhd2luZyB0aGUgbGluZS5cbiAgKi9cbiAgZHJhdyhzcHJpdGUpIHtcbiAgICBpZiAoc3ByaXRlLmRyYXdpbmcpIHtcbiAgICAgIHRoaXMuY29udGV4dC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY29udGV4dC5tb3ZlVG8oKHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyBzcHJpdGUueCwgKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgKHNwcml0ZS55ICogLTEpKTtcbiAgICAgIHRoaXMuY29udGV4dC5saW5lVG8oKHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyBzcHJpdGUucHJldlgsIChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIChzcHJpdGUucHJldlkgKiAtMSkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVXaWR0aCA9IHNwcml0ZS5wZW5TaXplO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZVN0eWxlID0gc3ByaXRlLnBlbkNvbG9yO1xuICAgICAgdGhpcy5jb250ZXh0LnN0cm9rZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGNsZWFyIC0gY2xlYXJzIHRoZSBjYW52YXNcbiAgKi9cbiAgY2xlYXIoc3ByaXRlKSB7XG4gICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCBzcHJpdGUuc3RhZ2VXaWR0aCwgc3ByaXRlLnN0YWdlSGVpZ2h0KTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhZ2Utc3VyZmFjZS5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBVSSBFbGVtZW50IG9mIHRoZSBzcHJpdGUuXG4gKiBFYWNoIFNwcml0ZSBoYXMgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFNwcml0ZSBFbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgZm9yIHdoaWNoIHRoZSBlbGVtZW50IGlzIGNyZWF0ZWQuXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRvIHdoaWNoIHRoZSBzcHJpdGUgaXMgYWRkZWQuXG4gICovXG4gIGNvbnN0cnVjdG9yKHNwcml0ZSwgc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgZWwuaWQgPSBgJHtzcHJpdGUuaWR9YDtcbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnbWFuaXB1bGF0aW9uJztcblxuICAgIHN0YWdlLmVsZW1lbnQuZWwuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQuIFRoaXMgaXMgYWx3YXlzIGNhbGxlZCBhZnRlciB0aGUgY29uc3RydWN0b3IuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB1cGRhdGUuXG4gICovXG4gIHVwZGF0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsO1xuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMik7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpO1xuXG4gICAgLy8gQ29zdHVtZVxuICAgIGlmIChzcHJpdGUuY29zdHVtZSkge1xuICAgICAgZWwuc3R5bGUud2lkdGggPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlV2lkdGh9cHhgO1xuICAgICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7c3ByaXRlLmNvc3R1bWUudmlzaWJsZUhlaWdodH1weGA7XG4gICAgfVxuXG4gICAgZWwuc3R5bGUubGVmdCA9IGAkeyhzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgeH1weGA7XG4gICAgZWwuc3R5bGUudG9wID0gYCR7KHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeX1weGA7XG4gICAgZWwuc3R5bGUuekluZGV4ID0gc3ByaXRlLno7XG5cbiAgICBlbC5zdHlsZS52aXNpYmlsaXR5ID0gYCR7KHNwcml0ZS5zaG93aW5nID8gJ3Zpc2libGUnIDogJ2hpZGRlbicpfWA7XG5cbiAgICAvLyBMZWZ0IG9yIHJpZ2h0IHJvdGF0aW9uXG4gICAgLy8gRGlyZWN0aW9uIGRpdmlkZWQgYnkgMTgwIGFuZCBmbG9vcmVkIC0+IDEgb3IgMi5cbiAgICAvLyBTdWJ0cmFjdCAxIC0+IDAgb3IgMS5cbiAgICAvLyBNdWx0aXBseSBieSAtMSAtPiAwIG9yIC0xLlxuICAgIC8vIENzcyB0cmFuc2Zvcm0gLT4gTm9uZSBvciBmdWxsIFguXG4gICAgc3ByaXRlLnJvdGF0aW9uU3R5bGUgPT09IDEgPyBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgc2NhbGVYKCR7KChNYXRoLmZsb29yKHNwcml0ZS5kaXJlY3Rpb24gLyAxODApICogMikgLSAxKSAqIC0xfSlgIDogbnVsbDtcblxuICAgIC8vIEZ1bGwgcm90YXRpb25cbiAgICAvLyBTcHJpdGUgXCJuZXV0cmFsIHBvc2l0aW9uXCIgaXMgOTAuIENTUyBpcyAwLiBTdWJ0cmFjdCA5MC5cbiAgICAvLyBOb3JtYWxpemUgdG8gMzYwLlxuICAgIC8vIENzcyByb3RhdGUgLT4gTnVtYmVyIG9mIGRlZ3JlZXMuXG4gICAgc3ByaXRlLnJvdGF0aW9uU3R5bGUgPT09IDAgPyBlbC5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7KChzcHJpdGUuZGlyZWN0aW9uIC0gOTApICsgMzYwKSAlIDM2MH1kZWcpYCA6IG51bGw7XG5cbiAgICAvLyBjc3MgcnVsZXNcbiAgICBjc3MuYXBwbHkoc3ByaXRlKTtcblxuICAgIC8vIGNzcyBjbGFzc2VzXG4gICAgc3ByaXRlLmNvc3R1bWUgPyBlbC5jbGFzc05hbWUgPSBzcHJpdGUuY29zdHVtZS5jbGFzc2VzLmNvbmNhdChzcHJpdGUuY2xhc3Nlcykuam9pbignICcpIDogZWwuY2xhc3NOYW1lID0gc3ByaXRlLmNsYXNzZXMuam9pbignICcpO1xuXG4gICAgLy8gQmFja2dyb3VuZC4gTXVzdCBiZSBkb25lIGFmdGVyIHRoZSBDU1MuXG4gICAgc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzcHJpdGUuY29zdHVtZS5jb2xvciA6IGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IG51bGw7XG5cbiAgICAvLyBJbWFnZS5cbiAgICBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgZWwuZmlyc3RDaGlsZCkgeyAvLyBoYXMgaW1hZ2UgZnJvbSBwcmV2aW91cyBjb3N0dW1lXG4gICAgICBpZiAoIXNwcml0ZS5jb3N0dW1lLmltYWdlKSB7IC8vIG5lZWRzIHJlbW92ZWQgYXMgdGhlcmUgaXMgbm8gaW1hZ2UgaW4gY3VycmVudCBjb3N0dW1lLlxuICAgICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUuaW1hZ2UgIT09IHRoaXMuZWwuZmlyc3RDaGlsZC5zcmMpIHsgLy8gbmVlZHMgcmVwbGFjZWRcbiAgICAgICAgdGhpcy5lbC5maXJzdENoaWxkLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuaW1hZ2UpIHsgLy8gbmVlZHMgYW4gaW1hZ2UgaW5zZXJ0ZWQuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblxuICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zcmMgPSBzcHJpdGUuY29zdHVtZS5pbWFnZTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB9XG5cbiAgICAvLyBJbm5lci4gTXVzdCBieSBkb25lIGFmdGVyIHRoZSBpbWFnZVxuICAgIHNwcml0ZS5jb3N0dW1lICYmIHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA/IGVsLmlubmVySFRNTCA9IHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA6IG51bGw7XG5cbiAgICAvLyBUZXh0IFVJIGdvZXMgd2hlcmUgc3ByaXRlIGdvZXMuXG4gICAgc3ByaXRlLnRleHR1aSA/IHNwcml0ZS50ZXh0dWkudXBkYXRlKHNwcml0ZSkgOiBudWxsO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBkZWxldGUuXG4gICovXG4gIGRlbGV0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gMTAwMDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb29rLlxuICogQWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb2sge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIExvb2sgaXMgYWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGNzcyAtIGFwcGxpZXMgYSBDU1MgcnVsZSB0byBhIENvc3R1bWUgb3IgQmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmNzcygnZm9udC1zaXplJywgJzE2cHgnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKVxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gYWRkLlxuICAqL1xuICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgIXRoaXMuaGFzQ2xhc3MobmFtZSkgPyB0aGlzLmNsYXNzZXMucHVzaChuYW1lKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDbGFzcyAtIHJlbW92ZXMgYSBjc3MgY2xhc3MgZnJvbSB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGNvc3R1bWUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmhhc0NsYXNzKCdyYWluYm93JykgPyBjb3N0dW1lLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmhhc0NsYXNzKCdyYWluYm93JykgPyBiYWNrZHJvcC5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbG9vay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTG9vayBmcm9tICcuL2xvb2snO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIENvc3R1bWUuXG4gKiBDb3N0dW1lcyBjYW4gYmUgYWRkZWQgdG8gYSBTcHJpdGUuXG4gKiBAZXh0ZW5kcyBMb29rXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAqICAgd2lkdGg6IDUwLFxuICogICBoZWlnaHQ6IDUwLFxuICogICBjb2xvcjogJyNBMkRBRkYnLFxuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvc3R1bWUgZXh0ZW5kcyBMb29rIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgQ29zdHVtZSB0byBiZSB1c2VkIGJ5IFNwcml0ZSBvYmplY3RzLi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGNvc3R1bWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGggLSB0aGUgY29zdHVtZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIHRoZSBjb3N0dW1lIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgIH07XG4gICAgY29uc3QgYWN0dWFsID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuICAgIHRoaXMudmlzaWJsZVdpZHRoID0gYWN0dWFsLndpZHRoO1xuICAgIHRoaXMudmlzaWJsZUhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG5cbiAgICB0aGlzLmlubmVySFRNTCA9ICcnO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgY29zdHVtZSB0byB0aGUgc3ByaXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmFkZFRvKHNwcml0ZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gd2hpY2ggc3ByaXRlIHRvIGFkZCB0aGUgY29zdHVtZSB0b28uXG4gICovXG4gIGFkZFRvKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcbiAgICBzcHJpdGUuY29zdHVtZXMucHVzaCh0aGlzKTtcblxuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlLlxuICAgIGlmICghc3ByaXRlLmNvc3R1bWUpIHtcbiAgICAgIGN1clNwcml0ZS5jb3N0dW1lID0gc3ByaXRlLmNvc3R1bWVzWzBdO1xuICAgICAgY3VyU3ByaXRlLndpZHRoID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgY3VyU3ByaXRlLmhlaWdodCA9IHNwcml0ZS5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgY29zdHVtZSBmcm9tIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKiBjb3N0dW1lLnJlbW92ZUZyb20oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gcmVtb3ZlIHRoZSBjb3N0dW1lIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3ByaXRlKSB7XG4gICAgc3ByaXRlLnJlbW92ZUNvc3R1bWUodGhpcyk7XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjb3N0dW1lIHRvIHRoYXQgb2YgdGhlIGltYWdlIGZpbGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAgKiAgIGltYWdlOiAnaHR0cHM6Ly91cGxvYWQud2lraW1lZGlhLm9yZy93aWtpcGVkaWEvY29tbW9ucy9kL2QzL1NoZWVwX2luX2dyYXkuc3ZnJ1xuICAqIH0pO1xuICAqXG4gICogY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICovXG4gIHJlc2l6ZVRvSW1hZ2UoKSB7XG4gICAgLy8gcmVnaXN0ZXIgdGhlIGltYWdlIHNpemUgZnJvbSB0aGUgZmlsZVxuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcblxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbWUud2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgbWUuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS52aXNpYmxlV2lkdGggPSBtZS53aWR0aDtcbiAgICAgICAgbWUudmlzaWJsZUhlaWdodCA9IG1lLmhlaWdodDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGlubmVyIC0gaW5zZXJ0cyBodG1sIGludG8gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmlubmVyKCc8cCBjbGFzcz1cImJpZyBjZW50ZXJlZCByYWluYm93XCI+Oik8L3A+Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvc3R1bWUuaW5uZXIoJ0kgbGlrZSB0ZXh0IG9ubHknKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBodG1sIC0gdGhlIGh0bWwgdG8gaW5zZXJ0LlxuICAqL1xuICBpbm5lcihodG1sKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBodG1sO1xuICB9XG5cbiAgLyoqXG4gICogaW5zZXJ0IC0gcGxhY2VzIGEgZG9tIGVsZW1lbnQgaW5zaWRlIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmluc2VydChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXktaHRtbC1jcmVhdGlvbicpKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBlbCAtIHRoZSBET00gZWxlbWVudC5cbiAgKi9cbiAgaW5zZXJ0KGVsKSB7XG4gICAgY29uc3QgaWVsID0gZWwuY2xvbmVOb2RlKHRydWUpO1xuICAgIGllbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICBpZWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgIHRoaXMuaW1hZ2UgPSBudWxsO1xuICAgIHRoaXMuY29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gaWVsLm91dGVySFRNTDtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvY29zdHVtZS5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogQmxvY2tMaWtlLmpzXG4qXG4qIEJsb2NrTGlrZS5qcyBpcyBhbiBlZHVjYXRpb25hbCBKYXZhU2NyaXB0IGxpYnJhcnkuXG4qIEl0IGJyaWRnZXMgdGhlIGdhcCBiZXR3ZWVuIGJsb2NrLWJhc2VkIGFuZCB0ZXh0LWJhc2VkIHByb2dyYW1taW5nLlxuKlxuKiBCbG9ja0xpa2UuanMgaXMgZGVzaWduZWQgZm9sbG93aW5nIFNjcmF0Y2ggY29uY2VwdHMsIG1ldGhvZHMgYW5kIHBhdHRlcm5zLlxuKiBUaGUgc2NyZWVuIGlzIGEgY2VudGVyZWQgc3RhZ2UuIEludGVyYWN0aW9uIGlzIHdpdGggU3ByaXRlcy5cbiogQ29kZSBpcyBleGVjdXRlZCBpbiBhIFwicGFjZWRcIiBtYW5uZXIuXG4qIFNjcmF0Y2ggYmxvY2sgY29kZSBhbmQgQmxvY2tMaWtlLmpzIHRleHQgY29kZSBhcmUgbWVhbnQgdG8gYmVcbiogYXMgbGl0ZXJhbGx5IHNpbWlsYXIgYXMgcG9zc2libGUuXG4qXG4qIEJsb2NrTGlrZS5qcyBpcyB3cml0dGVuIGluIEVTNi9FUzcgZmxhdm9yZWQgSmF2YVNjcmlwdC5cbiogSXQgaXMgZW52aXJvbm1lbnQgaW5kZXBlbmRlbnQuXG4qIEl0IGNhbiBiZSB1c2VkIGFueXdoZXJlIG1vZGVybiBKYXZhU2NyaXB0IHJ1bnMuXG4qXG4qIEBhdXRob3IgWWFyb24gKFJvbikgSWxhblxuKiBAZW1haWwgYmxvY2tsaWtlQHJvbmlsYW4uY29tXG4qXG4qIENvcHlyaWdodCAyMDE4XG4qIEZhYnJpcXXDqSBhdSBDYW5hZGEgOiBNYWRlIGluIENhbmFkYVxuKi9cblxuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vZG9jdW1lbnQtY3NzJztcbmltcG9ydCBwbGF0Zm9ybXMgZnJvbSAnLi9wbGF0Zm9ybXMnO1xuXG5pbXBvcnQgU3RhZ2UgZnJvbSAnLi9zdGFnZSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBCYWNrZHJvcCBmcm9tICcuL2JhY2tkcm9wJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbmltcG9ydCBDb3N0dW1lIGZyb20gJy4vY29zdHVtZSc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcblxuZXhwb3J0IHsgU3RhZ2UgfTtcbmV4cG9ydCB7IEJhY2tkcm9wIH07XG5leHBvcnQgeyBTcHJpdGUgfTtcbmV4cG9ydCB7IENvc3R1bWUgfTtcblxuKGZ1bmN0aW9uIGluaXQoKSB7XG4gIGNvbnN0IHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBzdHlsZS50eXBlID0gJ3RleHQvY3NzJztcbiAgc3R5bGUuaW5uZXJIVE1MID0gYFxuICAgICR7c3R5bGVzLmRlZmF1bHRDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnVpQ1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy50aGlua0NTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMuc2F5Q1NTfSBcXG5cXG4gXG4gICAgJHtzdHlsZXMuYXNrQ1NTfWA7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2hlYWQnKVswXS5hcHBlbmRDaGlsZChzdHlsZSk7XG5cbiAgcGxhdGZvcm1zKCk7XG59KCkpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbGliLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBDb2xsZWN0aW9uIG9mIGNzcyBzdHJpbmdzIHRvIGJlIGluamVjdGVkIHRvIHRoZSBoZWFkIHNlY3Rpb24gb2YgYSBwYWdlLlxuKiBAcHJpdmF0ZVxuKi9cbmV4cG9ydCBjb25zdCBkZWZhdWx0Q1NTID0gYFxuKiB7IFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlM2QoMCwgMCwgMCk7XG4gIC13ZWJraXQtdG91Y2gtY2FsbG91dDpub25lOyAgICAgICAgICAgICAgICAvKiBwcmV2ZW50IGNhbGxvdXQgdG8gY29weSBpbWFnZSwgZXRjIHdoZW4gdGFwIHRvIGhvbGQgKi9cbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOnJnYmEoMCwwLDAsMCk7IC8qIHByZXZlbnQgdGFwIGhpZ2hsaWdodCBjb2xvciAvIHNoYWRvdyAqL1xufVxuaHRtbCwgYm9keXtcbiAgbWFyZ2luOjA7XG4gIHBhZGRpbmc6MDtcbn1cbmA7XG5cbmV4cG9ydCBjb25zdCB1aUNTUyA9IGBcbi5ibG9ja2xpa2UtZmxhZyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogNjVweDtcbiAgbGluZS1oZWlnaHQ6IDY1cHg7XG4gIHBhZGRpbmc6IDMycHg7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNjY2O1xuICBib3JkZXItcmFkaXVzOiA2NXB4O1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHRoaW5rQ1NTID0gYFxuLmJsb2NrbGlrZS10aGluayB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBsZWZ0OiAyMDBweDtcbiAgcGFkZGluZzogMTBweDtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbWluLWhlaWdodDogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIHRleHQtYWxpZ246IGxlZnQ7XG4gIGNvbG9yOiAjMjIyO1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuLmJsb2NrbGlrZS10aGluazpiZWZvcmUge1xuICBwb3NpdGlvbjphYnNvbHV0ZTtcbiAgYm90dG9tOiAtMzBweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMzBweDtcbiAgaGVpZ2h0OiAzMHB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuLmJsb2NrbGlrZS10aGluazphZnRlciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAtNDVweDtcbiAgbGVmdDogMHB4O1xuICB3aWR0aDogMTVweDtcbiAgaGVpZ2h0OiAxNXB4O1xuICBiYWNrZ3JvdW5kOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAxNXB4O1xuICBjb250ZW50OiBcIlwiO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHNheUNTUyA9IGBcbi5ibG9ja2xpa2UtYXNrLFxuLmJsb2NrbGlrZS1zYXkge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgbWluLXdpZHRoOiA2MHB4O1xuICBtYXgtd2lkdGg6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZhZmFmYTtcbiAgYm9yZGVyOiAycHggc29saWQgIzQ0NDtcbiAgYm9yZGVyLXJhZGl1czogMjBweDtcbn1cbi5ibG9ja2xpa2UtYXNrOmJlZm9yZSxcbi5ibG9ja2xpa2Utc2F5OmJlZm9yZSB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxM3B4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0zM3B4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogIzQ0NCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjNDQ0O1xufVxuLmJsb2NrbGlrZS1hc2s6YWZ0ZXIsXG4uYmxvY2tsaWtlLXNheTphZnRlciB7XG4gIGNvbnRlbnQ6ICcgJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBsZWZ0OiAxNXB4O1xuICByaWdodDogYXV0bztcbiAgdG9wOiBhdXRvO1xuICBib3R0b206IC0yOHB4O1xuICBib3JkZXI6IDE2cHggc29saWQ7XG4gIGJvcmRlci1jb2xvcjogI2ZhZmFmYSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCAjZmFmYWZhO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IGFza0NTUyA9IGBcbi5ibG9ja2xpa2UtYXNrIGlucHV0IHtcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgcGFkZGluZzogMnB4O1xuICBtYXJnaW46IDJweDtcbiAgd2lkdGg6IDc1JTtcbn1cbi5ibG9ja2xpa2UtYXNrIGJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogMTZweDtcbiAgbGluZS1oZWlnaHQ6IDE2cHg7XG4gIGhlaWdodDogMjZweDtcbiAgcGFkZGluZzogMCA1cHg7XG4gIG1hcmdpbjogMDtcbn1cbmA7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9kb2N1bWVudC1jc3MuanNcbi8vIG1vZHVsZSBpZCA9IDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4qIHBsYXRmb3JtcyAtIGNvbGxlY3Rpb24gb2YgdGhpbmdzIHRvIGVuc3VyZSBpdCBwbGF5cyBuaWNlbHkgd2l0aCBjb2RpbmcgcGxhdGZvcm1zLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHBsYXRmb3JtcygpIHtcbiAgLyoqXG4gICogY29kZXBlbi5pb1xuICAqIFBhY2VkIGFuZCBXYWl0ZWQgbWV0aG9kcyB0cmlnZ2VyIHRoZSBwcm90ZWN0aW9uIC0gaGVuY2Ugd2UgcHJvbG9uZyBpdC5cbiAgKiBodHRwczovL2Jsb2cuY29kZXBlbi5pby8yMDE2LzA2LzA4L2Nhbi1hZGp1c3QtaW5maW5pdGUtbG9vcC1wcm90ZWN0aW9uLXRpbWluZy9cbiAgKi9cbiAgaWYgKHdpbmRvdy5DUCkge1xuICAgIHdpbmRvdy5DUC5QZW5UaW1lci5NQVhfVElNRV9JTl9MT09QX1dPX0VYSVQgPSA2MDAwMDtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvcGxhdGZvcm1zLmpzXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5pbXBvcnQgU3RhZ2VFbGVtZW50IGZyb20gJy4vc3RhZ2UtZWxlbWVudCc7XG5pbXBvcnQgU3RhZ2VTdXJmYWNlIGZyb20gJy4vc3RhZ2Utc3VyZmFjZSc7XG4vLyBpbXBvcnQgQmFja2Ryb3AgZnJvbSAnLi9iYWNrZHJvcCc7XG5pbXBvcnQgU3ByaXRlRWxlbWVudCBmcm9tICcuL3Nwcml0ZS1lbGVtZW50JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTdGFnZS5cbiAqIEBleHRlbmRzIEVudGl0eVxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2Uoe1xuICogICB3aWR0aDogNjAwLFxuICogICBoZWlnaHQ6IDQwMCxcbiAqICAgcGFjZTogMTYsXG4gKiAgIHNlbnNpbmc6IHRydWUsXG4gKiAgIHBhcmVudDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YWdlLXdyYXAnKSxcbiAqICAgYmFja2Ryb3A6IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe2NvbG9yOiAnI0ZGQjZDMSd9KVxuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3RhZ2UuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIHRoZSBTdGFnZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy53aWR0aCAtIFRoZSBzdGFnZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgZnVsbCB3aW5kb3cuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gVGhlIHN0YWdlIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgZnVsbCB3aW5kb3cuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFjZSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIGVhY2ggcGFjZWQgbWV0aG9kLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmVudCAtIFRoZSBET00gZWxlbWVudCBpbnRvIHdoaWNoIHRoZSBzdGFnZSB3aWxsIGJlIGluc2VydGVkLiBEZWZhdWx0IGlzIHRoZSBib2R5LlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmJhY2tkcm9wIC0gQSBkZWZhdWx0IEJhY2tkcm9wLlxuICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zZW5zaW5nIC0gRW5hYmxlcyBzZW5zaW5nIG9mIG1vdXNlIGxvY2F0aW9uIGFuZCB3aGF0IGtleXMgcHJlc3NlZC5cbiAgKiBJZiB0cnVlLCB3aWxsIGNvbnN0YW50bHkgdXBkYXRlIHN0YWdlIHByb3BlcnRpZXM6IG1vdXNlWCwgbW91c2VZLCBrZXlzS2V5Q29kZSwga2V5c0tleUNvZGUgYW5kIGtleXNDb2RlIGJhc2VkIG9uIHVzZXIgaW5wdXQuXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIC8qKlxuICAgICogZW5hYmxlU2Vuc2luZyAtIEVuYWJsZXMgc2Vuc2luZyBvZiBkb2N1bWVudCBsZXZlbCBldmVudHMgKGtleWRvd24gYW5kIG1vdXNlbW92ZSlcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGVuYWJsZVNlbnNpbmcoc3RhZ2UpIHtcbiAgICAgIGNvbnN0IG1lID0gc3RhZ2U7XG4gICAgICBtZS5zZW5zaW5nID0gdHJ1ZTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGUua2V5ICYmIG1lLmtleXNLZXkuaW5kZXhPZihlLmtleS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEgPyBtZS5rZXlzS2V5LnB1c2goZS5rZXkudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgICAgICBlLmNvZGUgJiYgbWUua2V5c0NvZGUuaW5kZXhPZihlLmNvZGUudG9Mb3dlckNhc2UoKSkgPT09IC0xID8gbWUua2V5c0NvZGUucHVzaChlLmNvZGUudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgICAgICBtZS5rZXlzS2V5Q29kZS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xID8gbWUua2V5c0tleUNvZGUucHVzaChlLmtleUNvZGUpIDogbnVsbDtcbiAgICAgIH0pO1xuXG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChlKSA9PiB7XG4gICAgICAgIGUua2V5ID8gbWUua2V5c0tleSA9IG1lLmtleXNLZXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZS5rZXkudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgICAgICBlLmNvZGUgPyBtZS5rZXlzQ29kZSA9IG1lLmtleXNDb2RlLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUuY29kZS50b0xvd2VyQ2FzZSgpKSA6IG51bGw7XG4gICAgICAgIG1lLmtleXNLZXlDb2RlID0gbWUua2V5c0tleUNvZGUuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZS5rZXlDb2RlKTtcbiAgICAgIH0pO1xuXG4gICAgICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChlKSA9PiB7XG4gICAgICAgIG1lLm1vdXNlWCA9IGUueCAtIG1lLmVsZW1lbnQuZWwub2Zmc2V0TGVmdCAtIChtZS53aWR0aCAvIDIpO1xuICAgICAgICBtZS5tb3VzZVkgPSAtZS55ICsgbWUuZWxlbWVudC5lbC5vZmZzZXRUb3AgKyAobWUuaGVpZ2h0IC8gMik7XG4gICAgICB9KTtcblxuICAgICAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICAgIG1lLm1vdXNlRG93biA9IHRydWU7XG4gICAgICB9KTtcbiAgICAgIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsICgpID0+IHtcbiAgICAgICAgbWUubW91c2VEb3duID0gZmFsc2U7XG4gICAgICB9KTtcblxuICAgICAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgKCkgPT4ge1xuICAgICAgICBtZS5tb3VzZURvd24gPSB0cnVlO1xuICAgICAgfSk7XG4gICAgICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgKCkgPT4ge1xuICAgICAgICBtZS5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgaGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICBwYXJlbnQ6IGRvY3VtZW50LmJvZHksXG4gICAgICBwYWNlOiAzMyxcbiAgICAgIGJhY2tkcm9wOiBudWxsLFxuICAgICAgbWFyZ2luVEI6IDAsXG4gICAgfTtcbiAgICBjb25zdCBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBpZiAoYWN0dWFsLnBhcmVudCA9PT0gZGVmYXVsdHMucGFyZW50KSB7XG4gICAgICBhY3R1YWwubWFyZ2luVEIgPSBNYXRoLmZsb29yKCh3aW5kb3cuaW5uZXJIZWlnaHQgLSBhY3R1YWwuaGVpZ2h0KSAvIDIpO1xuICAgIH1cblxuICAgIHN1cGVyKGFjdHVhbC5wYWNlKTtcblxuICAgIC8vIGJhY2tkcm9wc1xuICAgIHRoaXMuYmFja2Ryb3BzID0gW107XG5cbiAgICAvLyEgYWN0dWFsLmJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IG5ldyBCYWNrZHJvcCgpIDogdGhpcy5iYWNrZHJvcCA9IGFjdHVhbC5iYWNrZHJvcDtcbiAgICBpZiAoYWN0dWFsLmJhY2tkcm9wKSB7XG4gICAgICB0aGlzLmJhY2tkcm9wID0gYWN0dWFsLmJhY2tkcm9wO1xuICAgICAgdGhpcy5iYWNrZHJvcHMucHVzaCh0aGlzLmJhY2tkcm9wKTtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgU3RhZ2VFbGVtZW50KGFjdHVhbCwgdGhpcyk7XG4gICAgdGhpcy53aWR0aCA9IGFjdHVhbC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG5cbiAgICB0aGlzLmtleXNDb2RlID0gW107XG4gICAgdGhpcy5rZXlzS2V5ID0gW107XG4gICAgdGhpcy5rZXlzS2V5Q29kZSA9IFtdO1xuXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xuICAgIHRoaXMubW91c2VYID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlWSA9IG51bGw7XG5cbiAgICB0aGlzLnNwcml0ZXMgPSBbXTtcblxuICAgIHRoaXMuY3NzUnVsZXMgPSBbXTtcbiAgICB0aGlzLmNsYXNzZXMgPSBbXTtcblxuICAgIGFjdHVhbC5zZW5zaW5nID8gZW5hYmxlU2Vuc2luZyh0aGlzKSA6IG51bGw7XG5cbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gRGVsZXRlcyB0aGUgc3RhZ2UgZWxlbWVudC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqXG4gICogc3RhZ2UuZGVsZXRlKCk7XG4gICovXG4gIGRlbGV0ZSgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSB0aGlzLmVsZW1lbnQuZGVsZXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFNwcml0ZSAtIEFkZHMgYSBzcHJpdGUgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gYWRkLlxuICAqL1xuICBhZGRTcHJpdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuXG4gICAgY3VyU3ByaXRlLmVsZW1lbnQgPSBuZXcgU3ByaXRlRWxlbWVudChzcHJpdGUsIHRoaXMpO1xuICAgIGN1clNwcml0ZS5zdXJmYWNlID0gbmV3IFN0YWdlU3VyZmFjZSh0aGlzKTtcblxuICAgIGN1clNwcml0ZS5lbGVtZW50LmZsYWcgPSB0aGlzLmVsZW1lbnQuZmxhZztcbiAgICBjdXJTcHJpdGUuYWdhaW5zdEJhY2tkcm9wID0gdGhpcy5lbGVtZW50LmJhY2tkcm9wQ29udGFpbmVyO1xuXG4gICAgY3VyU3ByaXRlLnN0YWdlV2lkdGggPSB0aGlzLndpZHRoO1xuICAgIGN1clNwcml0ZS5zdGFnZUhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5zcHJpdGVzLnB1c2goY3VyU3ByaXRlKTtcbiAgICBjdXJTcHJpdGUueiA9IHRoaXMuc3ByaXRlcy5sZW5ndGg7XG5cbiAgICBzcHJpdGUuZWxlbWVudC51cGRhdGUoY3VyU3ByaXRlKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZVNwcml0ZSAtIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2UucmVtb3ZlU3ByaXRlKHNwcml0ZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBhZGQuXG4gICovXG4gIHJlbW92ZVNwcml0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBjdXJTcHJpdGUgPSBzcHJpdGU7XG5cbiAgICB0aGlzLnNwcml0ZXMgPSB0aGlzLnNwcml0ZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gc3ByaXRlKTtcbiAgICBjdXJTcHJpdGUuZWxlbWVudCA/IGN1clNwcml0ZS5lbGVtZW50ID0gY3VyU3ByaXRlLmVsZW1lbnQuZGVsZXRlKGN1clNwcml0ZSkgOiBudWxsO1xuICB9XG5cbiAgLyoqIGxvb2tzICogKi9cblxuICAvKipcbiAgKiBhZGRCYWNrZHJvcCAtIEFkZHMgYSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBiYWNrZHJvcCB0byBhZGQuXG4gICovXG4gIGFkZEJhY2tkcm9wKGJhY2tkcm9wKSB7XG4gICAgdGhpcy5iYWNrZHJvcHMucHVzaChiYWNrZHJvcCk7XG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmVcbiAgICAhdGhpcy5iYWNrZHJvcCA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1swXSA6IG51bGw7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2Uuc3dpdGNoQmFja2Ryb3BUbyhiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUbyhiYWNrZHJvcCkge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZHJvcEluZGV4ID0gdGhpcy5iYWNrZHJvcHMuaW5kZXhPZihiYWNrZHJvcCk7XG4gICAgY3VycmVudEJhY2tkcm9wSW5kZXggIT09IC0xID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzW2N1cnJlbnRCYWNrZHJvcEluZGV4XSA6IG51bGw7XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaEJhY2tkcm9wVG9OdW0gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgYmFja2Ryb3AgYnkgbnVtYmVyIG9mIGN1cnJlbnQgKDAgaXMgZmlyc3QpLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2Uuc3dpdGNoQmFja2Ryb3BUb051bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBzd2l0Y2hCYWNrZHJvcFRvTnVtKGluZGV4KSB7XG4gICAgdGhpcy5zd2l0Y2hCYWNrZHJvcFRvKHRoaXMuYmFja2Ryb3BzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiBuZXh0QmFja2Ryb3AgLSBTd2l0Y2hlcyB0byB0aGUgbmV4dCBiYWNrZHJvcC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKiBzdGFnZS5uZXh0QmFja2Ryb3AoKTtcbiAgKi9cbiAgbmV4dEJhY2tkcm9wKCkge1xuICAgIGNvbnN0IGN1cnJlbnRCYWNrZHJvcEluZGV4ID0gdGhpcy5iYWNrZHJvcHMuaW5kZXhPZih0aGlzLmJhY2tkcm9wKTtcbiAgICB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbKGN1cnJlbnRCYWNrZHJvcEluZGV4ICsgMSkgJSB0aGlzLmJhY2tkcm9wcy5sZW5ndGhdO1xuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVCYWNrZHJvcCAtIFJlbW92ZXMgYSBiYWNrZHJvcC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIHN0YWdlLmFkZEJhY2tkcm9wKGJhY2tkcm9wKTtcbiAgKiBzdGFnZS5yZW1vdmVCYWNrZHJvcChiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVCYWNrZHJvcChiYWNrZHJvcCkge1xuICAgIGlmICh0aGlzLmJhY2tkcm9wcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApO1xuICAgICAgdGhpcy5iYWNrZHJvcCA9PT0gYmFja2Ryb3AgPyB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbKGN1cnJlbnRCYWNrZHJvcEluZGV4ICsgMSkgJSB0aGlzLmJhY2tkcm9wcy5sZW5ndGhdIDogbnVsbDtcbiAgICAgIHRoaXMuYmFja2Ryb3BzID0gdGhpcy5iYWNrZHJvcHMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gYmFja2Ryb3ApO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IFtdO1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IG51bGw7XG4gICAgfVxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQmFja2Ryb3BOdW0gLSBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgYmFja2Ryb3AgYnkgbnVtYmVyIG9mIGN1cnJlbnQgKDAgaXMgZmlyc3QpLlxuICAqIElmIHRoZXJlIGlzIG9ubHkgb25lIGJhY2tkcm9wLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UucmVtb3ZlQmFja2Ryb3BOdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVCYWNrZHJvcE51bShpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQmFja2Ryb3AodGhpcy5iYWNrZHJvcHNbaW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlZnJlc2ggLSBGb3JjZXMgYSBzcHJpdGUgcmVmcmVzaC5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZCB0byBiZSB1c2VkIGlmIGNvc3R1bWUgd2FzIG1hbmlwdWxhdGVkIGRpcmVjdGx5LlxuICAqL1xuICByZWZyZXNoKCkge1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqIFNwcml0ZXMgKiAqL1xuXG4gIC8qKlxuICAqIF9yZWZyZXNoU3ByaXRlcyAtIFJlZnJlc2ggdGhlIERPTSBlbGVtZW50IG9mIGFsbCBzcHJpdGVzIGN1cnJlbnRseSBvbiBzdGFnZS5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIF9yZWZyZXNoU3ByaXRlcygpIHtcbiAgICBsZXQgaSA9IDA7XG4gICAgdGhpcy5zcHJpdGVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHNwcml0ZSA9IGl0ZW07XG4gICAgICBpICs9IDE7XG4gICAgICBzcHJpdGUueiA9IGk7XG4gICAgICBzcHJpdGUuZWxlbWVudCA/IHNwcml0ZS5lbGVtZW50LnVwZGF0ZShzcHJpdGUpIDogbnVsbDtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVCYWNrd2FyZHMgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uZSBwbGFjZSBkb3duIHRoZSBcInBpbGVcIi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlQmFja3dhcmRzKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlQmFja3dhcmRzKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggPiAwKSB7XG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXhdID0gdGhpcy5zcHJpdGVzW2luZGV4IC0gMV07IC8vIG1vdmUgb25lIHVwXG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXggLSAxXSA9IHNwcml0ZTsgLy8gbWUgc3ViamVjdCBkb3duXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlRm9yd2FyZCAtIE1vdmVzIHRoZSBzcHJpdGUgb25lIHBsYWNlIHVwIGluIHRoZSBcInBpbGVcIi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlRm9yd2FyZChzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZUZvcndhcmQoc3ByaXRlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNwcml0ZXMuaW5kZXhPZihzcHJpdGUpO1xuICAgIGlmIChpbmRleCA8IHRoaXMuc3ByaXRlcy5sZW5ndGggLSAxKSB7XG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXhdID0gdGhpcy5zcHJpdGVzW2luZGV4ICsgMV07IC8vIG1vdmUgb25lIGRvd25cbiAgICAgIHRoaXMuc3ByaXRlc1tpbmRleCArIDFdID0gc3ByaXRlOyAvLyBtZSBzdWJqZWN0IHVwXG4gICAgfVxuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlVG9Gcm9udCAtIEJyaW5ncyB0aGUgc3ByaXRlIHRvIHRoZSBmcm9udCBvZiB0aGUgXCJwaWxlXCJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlVG9Gcm9udChzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZVRvRnJvbnQoc3ByaXRlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNwcml0ZXMuaW5kZXhPZihzcHJpdGUpO1xuICAgIHRoaXMuc3ByaXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuc3ByaXRlcy5wdXNoKHNwcml0ZSk7XG4gICAgdGhpcy5fcmVmcmVzaFNwcml0ZXMoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNlbmRTcHJpdGVUb0JhY2sgLSBTZW5kcyB0aGUgc3ByaXRlIHRvIHRoZSBiYWNrIG9mIHRoZSBcInBpbGVcIlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKiBzdGFnZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNlbmRTcHJpdGVUb0JhY2soc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVUb0JhY2soc3ByaXRlKSB7XG4gICAgY29uc3QgaW5kZXggPSB0aGlzLnNwcml0ZXMuaW5kZXhPZihzcHJpdGUpO1xuICAgIHRoaXMuc3ByaXRlcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIHRoaXMuc3ByaXRlcy51bnNoaWZ0KHNwcml0ZSk7XG4gICAgdGhpcy5fcmVmcmVzaFNwcml0ZXMoKTtcbiAgfVxuXG4gIC8qIHNlbnNpbmcgKi9cblxuICAvKipcbiAgKiBpc0tleVByZXNzZWQgLSBDaGVja3MgaWYgYSBrZXkgaXMgcHJlc3NlZC4gU3RhZ2Ugc2Vuc2luZyBtdXN0IGJlIGVuYWJsZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheShzdGFnZS5pc0tleVByZXNzZWQoJ2EnKSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcktleSAtIHRoZSBrZXkgcHJlc3NlZC4gTWF5IGJlIHRoZSBjb2RlIG9yIHRoZSBjaGFyYWN0ZXIgaXRzZWxmIChBIG9yIDY1KVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIGlzS2V5UHJlc3NlZCh1c2VyS2V5KSB7XG4gICAgbGV0IG1hdGNoID0gZmFsc2U7XG4gICAgbGV0IGNoZWNrO1xuXG4gICAgdHlwZW9mIHVzZXJLZXkgPT09ICdzdHJpbmcnID8gY2hlY2sgPSB1c2VyS2V5LnRvTG93ZXJDYXNlKCkgOiBjaGVjayA9IHVzZXJLZXk7XG4gICAgLy8gTWFrZSBzdXJlIGVhY2ggcHJvcGVydHkgaXMgc3VwcG9ydGVkIGJ5IGJyb3dzZXJzLlxuICAgIC8vIE5vdGU6IHVzZXIgbWF5IHdyaXRlIGluY29tcGF0aWJsZSBjb2RlLlxuICAgIHRoaXMua2V5c0tleS5pbmRleE9mKGNoZWNrKSAhPT0gLTEgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgIHRoaXMua2V5c0NvZGUuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICB0aGlzLmtleXNLZXlDb2RlLmluZGV4T2YoY2hlY2spICE9PSAtMSA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG5cbiAgICAhdGhpcy5zZW5zaW5nID8gY29uc29sZS5sb2coJ0Jsb2NrTGlrZS5qcyBOb3RpY2U6IGlzS2V5UHJlc3NlZCgpIGluZ25vcmVkLiBTdGFnZSBzZW5zaW5nIG5vdCBlbmFibGVkLicpIDogbnVsbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG5cbiAgICByZXR1cm4gbWF0Y2g7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YWdlLmpzXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBFbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgcmV3cml0aW5nIHVzZXIgY29kZSB0byBhbGxvdyBmb3IgQmxvY2tMaWtlLmpzIGZlYXR1cmVzLlxuKi9cblxuLyoqXG4qIGluc2VydFBhY2VkIC0gaW5zZXJ0cyBhIHRpbWVkIGF3YWl0IGxpbmUgYWZ0ZXIgYW55IG1ldGhvZCB0aGF0IGlzIG9uIHRoZSBsaXN0IG9mIHBhY2VkIG1ldGhvZHMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydFBhY2VkKGl0ZW0sIGVudGl0eSkge1xuICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgbGV0IGkgPSBlbnRpdHkucGFjZWQubGVuZ3RoO1xuXG4gIHdoaWxlIChpKSB7XG4gICAgaSAtPSAxO1xuICAgIGl0ZW0uaW5kZXhPZihgLiR7ZW50aXR5LnBhY2VkW2ldfShgKSAhPT0gLTEgPyAoZm91bmQgPSB0cnVlKSA6IG51bGw7XG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZm91bmQgPyBgJHtpdGVtfVxcbiBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgJHtlbnRpdHkucGFjZX0pKTtgIDogaXRlbTtcbn1cblxuLyoqXG4qIGluc2VydFdhaXRlZCAtIGluc2VydHMgdGhlIFwibWVjaGFuaXNtXCIgdGhhdCBzdG9wcyBleGVjdXRpb24gYW5kIGF3YWl0cyBmb3IgdGhlIG1ldGhvZCB0byBmaW5pc2guXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgKG11bHRpKWxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRXYWl0ZWQoaXRlbSwgZW50aXR5KSB7XG4gIGxldCBmb3VuZCA9IG51bGw7XG4gIGxldCBjb2RlO1xuICBsZXQgaTtcblxuICAvLyBsb29rIGZvciB3YWl0ZWQgbWV0aG9kcy5cbiAgaSA9IGVudGl0eS53YWl0ZWQubGVuZ3RoO1xuICB3aGlsZSAoaSkge1xuICAgIGkgLT0gMTtcbiAgICBpdGVtLmluZGV4T2YoYC4ke2VudGl0eS53YWl0ZWRbaV19KGApICE9PSAtMSA/IChmb3VuZCA9IGVudGl0eS53YWl0ZWRbaV0pIDogbnVsbDtcbiAgICBpZiAoZm91bmQpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIC8vIG5vdCBhIG5vcm1hbCBcIndhaXRlZFwiLiBsb29rIGZvciB3YWl0ZWRSZXR1cm5lZC5cbiAgaWYgKCFmb3VuZCkge1xuICAgIGxldCB0aGVWYXIgPSBudWxsO1xuXG4gICAgaSA9IGVudGl0eS53YWl0ZWRSZXR1cm5lZC5sZW5ndGg7XG4gICAgd2hpbGUgKGkpIHtcbiAgICAgIGkgLT0gMTtcbiAgICAgIGl0ZW0uaW5kZXhPZihgLiR7ZW50aXR5LndhaXRlZFJldHVybmVkW2ldfShgKSAhPT0gLTEgPyAoZm91bmQgPSBlbnRpdHkud2FpdGVkUmV0dXJuZWRbaV0pIDogbnVsbDtcbiAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2RlIGZvciB3YWl0ZWRSZXR1cm5cbiAgICB0aGVWYXIgPSBpdGVtLnN1YnN0cigwLCBpdGVtLmluZGV4T2YoJz0nKSkucmVwbGFjZSgnbGV0JywgJycpLnJlcGxhY2UoJ3ZhcicsICcnKS50cmltKCk7XG4gICAgY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCAnJHt0aGVWYXJ9JywgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWA7XG5cbiAgICAvLyBpbnZva2UgaXMgXCJmb3JnaXZpbmdcIi4gbWF5LCBvciBtYXkgbm90LCBoYXZlIHZhcmlhYmxlcy5cbiAgICBmb3VuZCA9PT0gJ2ludm9rZScgJiYgKGl0ZW0uaW5kZXhPZignLCcpID09PSAtMSkgPyBjb2RlID0gYCR7aXRlbS5zdWJzdHJpbmcoMCwgaXRlbS5sYXN0SW5kZXhPZignKScpKX0sIFtdLCAnJHt0aGVWYXJ9JywgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWAgOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvZGUgZm9yIFwibm9ybWFsXCIgd2FpdGVkXG4gICAgY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYDtcbiAgfVxuXG4gIC8vIGVudGl0eS50cmlnZ2VyaW5nSWQgY3JlYXRlcyBhIHVuaXF1ZSBjb250ZXh0IHRvIGNoYWluIHRoZSB3YWl0ZWQgbWV0aG9kcy5cbiAgY29kZSA9IGBcbiAgICAke2NvZGV9XFxuIFxuICAgIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLndhaXRlZC4ke2VudGl0eS50cmlnZ2VyaW5nSWR9JywgZnVuY3Rpb24gd2FpdGVkTGlzdGVuZXIoZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibG9ja0xpa2Uud2FpdGVkLiR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nLCB3YWl0ZWRMaXN0ZW5lcik7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGA7XG5cbiAgcmV0dXJuIGZvdW5kID8gY29kZSA6IGl0ZW07XG59XG5cbi8qKlxuKiBpbnNlcnRBc3luYyAtIEFkZHMga2V5d29yZCBhc3luYyB0byBmdW5jdGlvbiBkZWNlbGVyYXRpb24uXG4qIFdpbGwgY2F0Y2ggYWxsIG5hbWVkIGZ1bmN0aW9uIGRlY2VsZXJhdGlvbnMgd2l0aCBhIHNwYWNlIGFmdGVyIHRoZSBrZXl3b3JkICdmdW5jdGlvbidcbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydEFzeW5jKGl0ZW0pIHtcbiAgY29uc3QgZXhpc3QgPSBpdGVtLmluZGV4T2YoJ2FzeW5jICcpO1xuICBjb25zdCByZWdFeHAgPSAvZnVuY3Rpb24gfGZ1bmN0aW9uXFwofGZ1bmN0aW9uKCB8XFx0KVxcKC87XG4gIGNvbnN0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhpdGVtKTtcblxuICByZXR1cm4gZXhpc3QgPT09IC0xICYmIG1hdGNoZXMgPyBgJHtpdGVtLnN1YnN0cmluZygwLCBtYXRjaGVzLmluZGV4KX0gYXN5bmMgJHtpdGVtLnN1YnN0cmluZyhtYXRjaGVzLmluZGV4LCBpdGVtLmxlbmd0aCl9YCA6IGl0ZW07XG59XG5cbi8qKlxuKiBlbXB0eUxvb3BQcm90ZWN0aW9uIC0gZXhhbWluZXMgdGhlIGNvZGUgZm9yIHdoaWxlIGFuZCBmb3Igc3RhdGVtZW50cyB0aGF0IGFyZSBlbXB0eS5cbiogTm90ZTogc2luY2Ugd2hpbGUodHJ1ZSl7fSBpcyBsaWtlbHkgdG8gYmUgY29kZWQgYnkgdGhlIHVzZXIgdGhpcyBwcmV2ZW50cyBpbmZpbml0ZSBsb29wcy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGVtcHR5TG9vcFByb3RlY3Rpb24oZnVuY1MpIHtcbiAgY29uc3QgY2hlY2sgPSBmdW5jUy5yZXBsYWNlKC9cXHMrL2csICcnKS5yZXBsYWNlKC9cXHI/XFxufFxcci9nLCAnJyk7XG5cbiAgY29uc3QgcmVnRXhwID0gL3doaWxlXFwoW1xcc1xcU10qXFwpe318Zm9yXFwoW1xcc1xcU10qXFwpe318ZG97fXdoaWxlXFwoW1xcc1xcU10qXFwpLztcbiAgY29uc3QgbWF0Y2hlcyA9IHJlZ0V4cC5leGVjKGNoZWNrKTtcblxuICByZXR1cm4gISFtYXRjaGVzO1xufVxuXG4vKipcbiogcmVtb3ZlT3V0ZXIgLSBSZW1vdmVzIHRoZSBvdXRlciBmdW5jdGlvbiBkZWZpbml0aW9uIGFuZCByZXR1cm5zIHRoZSBmdW5jdGlvbiBjb2RlIGJvZHkuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBmdW5jUyAtIHRoZSBmdW5jdGlvbiBiZWluZyByZXdyaXR0ZW4uXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgYm9keSBvZiB0aGUgZnVuY3Rpb24uXG4qL1xuZnVuY3Rpb24gcmVtb3ZlT3V0ZXIoZnVuY1MpIHtcbiAgcmV0dXJuIGZ1bmNTLnN1YnN0cmluZyhmdW5jUy5pbmRleE9mKCd7JykgKyAxLCBmdW5jUy5sYXN0SW5kZXhPZignfScpKTtcbn1cblxuLyoqXG4qIHJlbW92ZUNvbW1lbnRzIC0gUmVtb3ZlcyBjb21tZW50cyBmcm9tIGNvZGUuXG4qIGZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xNTEyMzc3N1xuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGZ1bmN0aW9uIHdpdGhvdXQgY29tbWVudHMuXG4qL1xuZnVuY3Rpb24gcmVtb3ZlQ29tbWVudHMoZnVuY1MpIHtcbiAgcmV0dXJuIGZ1bmNTLnJlcGxhY2UoL1xcL1xcKltcXHNcXFNdKj9cXCpcXC98KFteXFxcXDpdfF4pXFwvXFwvLiokL2dtLCAnJyk7XG59XG5cbi8qKlxuKiBnZXRFdmVudE9iamVjdFZhck5hbWUgLSBleHRyYWN0cyB0aGUgdmFyaWFibGUgbmFtZSB0aGF0IGhvbGRzIHRoZSBldmVudCBvYmplY3QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBmdW5jUyAtIHRoZSBmdW5jdGlvbiBiZWluZyByZXdyaXR0ZW4uXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgdmFyaWFibGUgbmFtZS5cbiovXG5mdW5jdGlvbiBnZXRFdmVudE9iamVjdFZhck5hbWUoZnVuY1MpIHtcbiAgcmV0dXJuIGZ1bmNTLnN1YnN0cmluZyhmdW5jUy5pbmRleE9mKCcoJykgKyAxLCBmdW5jUy5pbmRleE9mKCcpJykpO1xufVxuXG4vKipcbiogcmV3cml0ZSAtIHJld3JpdGVzIGEgZnVuY3Rpb24gdG8gYW4gYXN5bmMgdmVyc2lvbiB0aGF0IGlzIFwicGFjZWRcIiB1c2luZyBhd2FpdGluZyBmb3IgcHJvbWlzZXMuXG4qIFRoaXMgYWxsb3dzIHRoZSB1c2VyIHRvIHdyaXRlIHNlcXVlbnRpYWwgc2ltcGxlIGNvZGUgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIGluIGEgcGFjZWQgbWFubmVyLlxuKlxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlXG4qIEBwYXJhbSAtIHtPYmplY3R9IGVudGl0eSAtIGEgc3ByaXRlIG9yIHN0YWdlIG9iamVjdCB0byB3aGljaCB0aGUgZnVuY3Rpb24gYXBwbGllcy5cbiogQHJldHVybiB7ZnVuY3Rpb259IC0gYW4gYXN5bmMgbW9kaWZpZWQgZnVuY3Rpb24uXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcmV3cml0ZShmdW5jLCBlbnRpdHkpIHtcbiAgbGV0IGNvZGUgPSBmdW5jLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHRoZVZhciA9IGdldEV2ZW50T2JqZWN0VmFyTmFtZShjb2RlKTtcblxuICAvLyByZXdyaXRlIHRoZSBjb2RlXG4gIGlmIChlbXB0eUxvb3BQcm90ZWN0aW9uKGNvZGUpKSB7XG4gICAgY29kZSA9ICd0aHJvdyBcXCdCbG9ja0xpa2UuanMgRXJyb3I6IEVtcHR5IGxvb3AgZGV0ZWN0ZWRcXCc7JztcbiAgfSBlbHNlIHtcbiAgICBjb2RlID0gcmVtb3ZlQ29tbWVudHMocmVtb3ZlT3V0ZXIoY29kZSkpO1xuXG4gICAgY29kZSA9IGNvZGUuc3BsaXQoJ1xcbicpLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09ICcnKTtcblxuICAgIGNvZGUgPSBjb2RlLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdGVtcCA9IGl0ZW07XG4gICAgICBsZXQgcmVzdWx0ID0gdGVtcDtcblxuICAgICAgLy8gYSBtZXRob2QgY2FuIGJlIG9uZSBvZiB0aGUgZm9sbG93aW5nIGJ1dCBub3QgbW9yZSB0aGFuIG9uZVxuICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0UGFjZWQodGVtcCwgZW50aXR5KSA6IG51bGw7IC8vIG1vcmUgbGlrZWx5XG4gICAgICByZXN1bHQgPT09IHRlbXAgPyByZXN1bHQgPSBpbnNlcnRXYWl0ZWQodGVtcCwgZW50aXR5KSA6IG51bGw7IC8vIGxlc3MgbGlrZWx5XG5cbiAgICAgIC8vIGFuZCBvbmx5IGlmIG5vdCBhIG1ldGhvZCB3aWxsIGFkZCBhc3luYyB0byBmdW5jdGlvbnNcbiAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydEFzeW5jKHRlbXApIDogbnVsbDtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgICBjb2RlID0gY29kZS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8vIHRyYW5zZm9ybSB0aGUgdGV4dCBpbnRvIGEgZnVuY3Rpb25cbiAgY29uc3QgQXN5bmNGdW5jdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyAoKSA9PiB7fSkuY29uc3RydWN0b3I7XG4gIGxldCBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKGNvZGUpO1xuXG4gIC8vIHBhc3MgdGhlIGV2ZW50IG9iamVjdCB0byB0aGUgZnVuY3Rpb24gaWYgZXhpc3RzLlxuICB0aGVWYXIgPyBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKHRoZVZhciwgY29kZSkgOiBudWxsO1xuXG4gIHdpbmRvdy5ibG9ja0xpa2UgJiYgd2luZG93LmJsb2NrTGlrZS5kZWJ1ZyA/IGNvbnNvbGUubG9nKGFmKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gIHJldHVybiBhZjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Jld3JpdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBVSSBFbGVtZW50IG9mIHRoZSBzdGFnZS5cbiAqIEVhY2ggU3RhZ2UgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFN0YWdlIEVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIHRoZSBzdGFnZSBmb3Igd2hpY2ggdGhlIGVsZW1lbnQgaXMgY3JlYXRlZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgY3JlYXRlZC5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgKiBjcmVhdGVEaXYgLSBjcmVhdGVzIGEgZGl2IGF0IHNwZWNpZmllZCB6SW5kZXguXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHpJbmRleCAtIGRlc2lyZWQgcGxhY2UgaW4gXCJzdGFja1wiXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gYSBzdGFnZSB3aWRlL2hpZ2ggRE9NIGVsZW1lbnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVEaXYoekluZGV4KSB7XG4gICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgc2VsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgICBzZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgICAgc2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleDtcbiAgICAgIHNlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBzZWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnbWFuaXB1bGF0aW9uJztcblxuICAgICAgcmV0dXJuIHNlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZUNhbnZhcyAtIGNyZWF0ZXMgYSBjYW52YXMgYXQgc3BlY2lmaWVkIHpJbmRleC5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gekluZGV4IC0gZGVzaXJlZCBwbGFjZSBpbiBcInN0YWNrXCJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyh6SW5kZXgpIHtcbiAgICAgIGNvbnN0IGNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICBjZWwud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgY2VsLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgICAgY2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleDtcbiAgICAgIGNlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBjZWwuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgY2VsLnN0eWxlLnRvcCA9ICcwcHgnO1xuXG4gICAgICByZXR1cm4gY2VsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogY3JlYXRlRmxhZyAtIGNyZWF0ZXMgYSBcImZsYWdcIiBkaXYuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50IHdpdGggZmxhZyBhdCBjZW50ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRmxhZygpIHtcbiAgICAgIGNvbnN0IGZsYWdTaXplID0gMTMwO1xuICAgICAgY29uc3QgZmVsID0gY3JlYXRlRGl2KC0xKTtcblxuICAgICAgY29uc3QgZmVsaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgICBjb25zdCB4ID0gLShmbGFnU2l6ZSAvIDIpO1xuICAgICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgICAgY29uc3QgeSA9IC0oZmxhZ1NpemUgLyAyKTtcblxuICAgICAgLy8gbG9va3NcbiAgICAgIGZlbGl0ZW0uc3R5bGUud2lkdGggPSBgJHtmbGFnU2l6ZX1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLmhlaWdodCA9IGAke2ZsYWdTaXplfXB4YDtcbiAgICAgIGZlbGl0ZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZmVsaXRlbS5pbm5lckhUTUwgPSAnJiM5ODczOyc7XG5cbiAgICAgIGZlbGl0ZW0uc3R5bGUubGVmdCA9IGAkeyhvcHRpb25zLndpZHRoIC8gMikgKyB4fXB4YDtcbiAgICAgIGZlbGl0ZW0uc3R5bGUudG9wID0gYCR7KG9wdGlvbnMuaGVpZ2h0IC8gMikgKyB5fXB4YDtcbiAgICAgIGZlbGl0ZW0uY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1mbGFnJztcblxuICAgICAgZmVsLmFwcGVuZENoaWxkKGZlbGl0ZW0pO1xuICAgICAgZmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIHJldHVybiBmZWw7XG4gICAgfVxuXG4gICAgZWwuaWQgPSBgJHtzdGFnZS5pZH1gO1xuXG4gICAgZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtvcHRpb25zLmhlaWdodH1weGA7XG5cbiAgICBlbC5zdHlsZS5tYXJnaW4gPSBgJHtvcHRpb25zLm1hcmdpblRCfXB4IGF1dG9gO1xuXG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgIGVsLnN0eWxlLmJveFNpemluZyA9ICdib3JkZXItYm94JztcbiAgICBlbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuXG4gICAgb3B0aW9ucy5wYXJlbnQuYXBwZW5kQ2hpbGQoZWwpO1xuXG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lciA9IGNyZWF0ZUNhbnZhcygwKTtcbiAgICB0aGlzLmJhY2tkcm9wQ29udGFpbmVyLmlkID0gYCR7c3RhZ2UuaWR9LWJhY2tkcm9wYDtcbiAgICB0aGlzLmJhY2tkcm9wQ29udGFpbmVyLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtYmFja2Ryb3AnO1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuYmFja2Ryb3BDb250YWluZXIpO1xuXG4gICAgdGhpcy5jYW52YXMgPSBjcmVhdGVDYW52YXMoMCk7XG4gICAgdGhpcy5jYW52YXMuaWQgPSBgJHtzdGFnZS5pZH0tc3VyZmFjZWA7XG4gICAgdGhpcy5jYW52YXMuY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1wYW5lbC1zdXJmYWNlJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG5cbiAgICB0aGlzLmVsID0gY3JlYXRlRGl2KDApO1xuICAgIHRoaXMuZWwuaWQgPSBgJHtzdGFnZS5pZH0tY29udGFpbmVyYDtcbiAgICB0aGlzLmVsLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtY29udGFpbmVyJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmVsKTtcblxuICAgIHRoaXMuZmxhZyA9IGNyZWF0ZUZsYWcoKTtcbiAgICB0aGlzLmZsYWcuaWQgPSBgJHtzdGFnZS5pZH0tZmxhZ2A7XG4gICAgdGhpcy5mbGFnLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtZmxhZyc7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5mbGFnKTtcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0byB1cGRhdGUuXG4gICovXG4gIHVwZGF0ZShzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbDtcbiAgICBjb25zdCBiYWNrZHJvcENvbnRleHQgPSBzdGFnZS5lbGVtZW50LmJhY2tkcm9wQ29udGFpbmVyLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAvLyBJZiBjb2xvciAtIGZpbGwgdGhlIGNhbnZhcyB3aXRoIHRoZSBjb2xvciBzZXQsIG9yIGNsZWFyIGl0XG4gICAgaWYgKHN0YWdlLmJhY2tkcm9wICYmIHN0YWdlLmJhY2tkcm9wLmNvbG9yKSB7XG4gICAgICBiYWNrZHJvcENvbnRleHQucmVjdCgwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KTtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5maWxsU3R5bGUgPSBzdGFnZS5iYWNrZHJvcC5jb2xvcjtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJhY2tkcm9wQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCk7XG4gICAgfVxuXG4gICAgLy8gSWYgaW1hZ2UgLSBkcmF3IHRoZSBpbWFnZSBvbiBjYW52YXNcbiAgICBpZiAoc3RhZ2UuYmFja2Ryb3AgJiYgc3RhZ2UuYmFja2Ryb3AuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgaW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgYmFja2Ryb3BDb250ZXh0LmRyYXdJbWFnZShpbWcsIDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpO1xuICAgICAgfTtcbiAgICAgIGltZy5zcmMgPSBzdGFnZS5iYWNrZHJvcC5pbWFnZTtcbiAgICB9XG5cbiAgICAvLyBjc3MgcnVsZXNcbiAgICBjc3MuYXBwbHkoc3RhZ2UpO1xuXG4gICAgLy8gY3NzIGNsYXNzZXNcbiAgICBzdGFnZS5iYWNrZHJvcCA/IGVsLmNsYXNzTmFtZSA9IHN0YWdlLmJhY2tkcm9wLmNsYXNzZXMuY29uY2F0KHN0YWdlLmNsYXNzZXMpLmpvaW4oJyAnKSA6IGVsLmNsYXNzTmFtZSA9IHN0YWdlLmNsYXNzZXMuam9pbignICcpO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnRcbiAgKi9cbiAgZGVsZXRlKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuXG4gIC8qKlxuICAqIGFkZEZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBpbmZyb250IG9mIGV2ZXJ5dGhpbmcgKHNob3dzIGl0KVxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRoYXQgXCJyZXF1ZXN0ZWRcIiB0aGUgZmxhZy5cbiAgKi9cbiAgYWRkRmxhZyhzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gMTAwMDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmZsYWc7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAtMTtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS1lbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTG9vayBmcm9tICcuL2xvb2snO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIEJhY2tkcm9wLlxuICogQmFja2Ryb3BzIGNhbiBiZSBhZGRlZCB0byB0aGUgU3RhZ2UuXG4gKiBAZXh0ZW5kcyBMb29rXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7XG4gKiAgIGltYWdlOiAnaHR0cHM6Ly93d3cuYmxvY2tsaWtlLm9yZy9pbWFnZXMvYmFja2Ryb3Auc3ZnJ1xuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe1xuICogICBjb2xvcjogJyNBMkRBRkYnXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFja2Ryb3AgZXh0ZW5kcyBMb29rIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgQmFja2Ryb3AgdG8gYmUgdXNlZCBieSBTdGFnZSBvYmplY3RzLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciB0aGUgYmFja2Ryb3AuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaW1hZ2UgLSBhIFVSSSAob3IgZGF0YSBVUkkpIGZvciB0aGUgYmFja2Ryb3AgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge307XG4gICAgY29uc3QgYWN0dWFsID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuaW1hZ2UgPSBhY3R1YWwuaW1hZ2U7XG4gICAgdGhpcy5jb2xvciA9IGFjdHVhbC5jb2xvcjtcblxuICAgIC8vIHByZWxvYWRcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRUbyAtIEFkZHMgdGhlIGJhY2tkcm9wIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gd2hpY2ggc3RhZ2UgdG8gYWRkIHRoZSBiYWNrZHJvcCB0b28uXG4gICovXG4gIGFkZFRvKHN0YWdlKSB7XG4gICAgY29uc3QgY3VyU3RhZ2UgPSBzdGFnZTtcbiAgICBzdGFnZS5iYWNrZHJvcHMucHVzaCh0aGlzKTtcbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZVxuICAgICFzdGFnZS5iYWNrZHJvcCA/IGN1clN0YWdlLmJhY2tkcm9wID0gc3RhZ2UuYmFja2Ryb3BzWzBdIDogbnVsbDtcbiAgICBzdGFnZS5lbGVtZW50ID8gc3RhZ2UuZWxlbWVudC51cGRhdGUoc3RhZ2UpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZyb20gLSBSZW1vdmVzIHRoZSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZFRvKHN0YWdlKTtcbiAgKiBiYWNrZHJvcC5yZW1vdmVGcm9tKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIHJlbW92ZSB0aGUgYmFja2Ryb3AgZnJvbS5cbiAgKi9cbiAgcmVtb3ZlRnJvbShzdGFnZSkge1xuICAgIHN0YWdlLnJlbW92ZUJhY2tkcm9wKHRoaXMpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9iYWNrZHJvcC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJztcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnO1xuaW1wb3J0IENvc3R1bWUgZnJvbSAnLi9jb3N0dW1lJztcbmltcG9ydCBUZXh0VWlFbGVtZW50IGZyb20gJy4vdGV4dC11aS1lbGVtZW50JztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBTcHJpdGUuXG4gKiBTcHJpdGVzIGNhbiBiZSBhZGRlZCB0byB0aGUgU3RhZ2UuXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSh7XG4gKiAgIGNvc3R1bWU6IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gKiAgICAgd2lkdGg6IDUwLFxuICogICAgIGhlaWdodDogNTAsXG4gKiAgICAgY29sb3I6ICcjQTJEQUZGJyxcbiAqICAgICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogICB9KVxuICogfSk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb25mZXR0aSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9jb25mZXR0aS5zdmcnKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhcmVaZXJvU2l6ZWRTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3ByaXRlIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIHRvIGJlIGFkZGVkIHRvIFN0YWdlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBvcHRpb25zIGZvciB0aGUgc3ByaXRlLlxuICAqIEFsdGVybmF0aXZlbHkgYW4gaW1hZ2UgdXJsLiBJZiBhIHVybCBpcyBwcm92aWRlZCBkZWZhdWx0IGNvc3R1bWUgd2lsbCBiZSBzaXplZCB0byBpbWFnZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuY29zdHVtZSAtIEEgZGVmYXVsdCBDb3N0dW1lLlxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBzaGVlcHkgPSAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFGOEFBQUJlQ0FZQUFBQkZFTWhRQUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBUnNrbEVRVlI0MnUxZEIxUlUxeFpGUVpvVUVSVkZSYkZqVndRTEtvcWdCanZnVnhHajJHTXZzV3VJMFVSaTc3MlhiemYyWG1KdjJGdnN4dDRWWVJvRGMvNCtUM1R4RVdiZU5KcXoxN3BybUpuM0htLzJ1L2ZjYzArN1ptWW1tR0JDMWtReEt5dXJSWFoyZGsvd0tzSHJNMnRyNjJYNHZKU0pHaU1pUjQ0Y0hVQzRyRStmUG9xb3FDaTZmLzgrWGJ4NGtRWU9IQmlIQnlERDk5MlRIRzZGMWlaWHJsekxIUjBkZCtGMUNkNEg4V1ZNVEdxUHBnNE9EakltUFNWY3ZYcVZuSnljcERndUJNM0gxdGIyVmZueTVTV1RKazJpQlFzVzBJUUpFNmhreVpJU2ZQNEUzMWN4MFNrZWxpRHQ5YjU5KzBnZERodzRRSmFXbHAvUTVLdFdyVklsLzE2bFV0SGN1WE1UV0Z4OVQySXFOMXBiYzNQeitUbHo1andMT1gwVDdUcEV4UzU4L2dlYUg1cUZtdk1iQlFZR1NrZ0RFaElTdVBjbnpKbzFTNlh1dUxGang4WmpGSjNQNnFTWFJTL2JuRDE3OW9UQ2hRdkxPbmJzbURCeDRrUkJES0FIMHJCaHc2aFJvMFlLOU9vNEd4dWI5eFlXRnIvaG5GekpybEU5Yjk2OHg5NjhlYU9KZTRxSmlhR3laY3NLRDBFZEZBckZGeEZWTVN1U2JnMGlmMGRUZ3ZDNHk1Y3ZheVJqMjdadFZLTkdEUW1MRFp3ZnhnOEJvMk0veS9tbFM1ZXFTQ1MyYnQwcTZyaVFrSkJZL0krZnNocnhCU0JPN3BRb1VVSjYrdlJwMGhhYk4yOG1lM3Q3QlloL0V4d2NMSk5LcGZUcDB5ZlI1My84K0ZIVWNhTkdqVXJBdlk3TFNzUzdRWHc4UnE5U2NHL1dGWU1IRHladmIyOVNLcFZrTEVSSFIxT2VQSG00OTFmS0NzVGJvOGMvYnQrK3ZTSStQbDVuVWxnaktWU29FSjA3ZDQ2TWpZTUhENm93Mzd6RHZlZkoxTXhEaTFudDYrc3IxelRaYWNLalI0OG9kKzdjbEZibzBLR0RIQTlnZG1ibXZqbklsejk5K2xSdk1xNWR1MFpGaXhaTk0vSlpHUUQ1N3pNcjhkbEEvSU5seTVZWmhJejM3OThUeEJmRnhzYW1DZmtzSWxrVlpyR1orSHVjZVUyQ05nWXRNckVOUUd1QjVvWG1pbVp1bEpVa1drdmN6QUlRZWdFOTRqbFV2MWk4dm9COTVBQytHOFY2ZC9KbHY0dUxpOVNRazJQTm1qVUo2bVdha00rS1FiWnMyVlQ0SGVWdGJLelg0KzhFMS96NXBFSE5Ha2s2aDRYSXcwT0Q1ZlZxVjQ5eEsrUWFZMjFsRllmaitQZ0VHMnZyTjFaV2x0dnh2cjYrcER2QktEVVRSRWZEQUNYdjJiT25jc21TSmJScDB5Wmh5YjVod3dZYVAzNDgrZnY3UzNHY0VnL2pRYUl1bmgxcTRlbnAwNmVMMHNNbEVnbFBjalJpeEFpcVc3Y09aTHNUOFkvQmVvQktGQzlPNGVIaGRQandZZHE3ZHkvbHo1K2ZIajU4bU9xMWVHUzhmUG1TV0JYVkIwZU9IT0dSRm0xaFlSNFgxS3loOHR5aHpVUWY3cWJhWXA5ZHBWdm45dEhlVFV0cFVPL09Ta3ZMSEhIb3JFTjBKYjRWcnk0OVBUMFZHemR1cExpNE9MVTMrKzdkTzRxTWpDUThKQVhPdXd5VFFUeUxpdFNHTkpNNWZQaHdxb1hlakFkSHVSd2RxVVdUQUpvMThSYzZzWGNkM2I5MG1DNGUzVWFiVnN5bXptR3R5Y0hlbmp3OXExS1BIajBJSzF0aDBaUjBFbWM5bmxmR0x2bnk0c2Qzb1hKbFBlang0OGZmL0crZWYwNmVQS2wydGN2ZlFiTlNPdGpieGUvZXVGZ3Q2YW0xUFp1V2NPZVJhaTJyUWQ0TUxHWVVDeGN1RkZROGJmWGtidDI2S2RGclZLZE9uZnJtKzdObnoxTHAwcVhJR2IyN1UyZ3dMWncrbnE2ZjNrMEo3MjZyL1RFZkhsMmdVWU43a1NVZWxMVzFGUlV1VkJBUElRLzVZcVI0VmZNa21DdW9hV00vZW5UMWIxSzl2ME8vRHU4bmpDQitJUHYzNzZjelo4N1FpaFVyeUs5K1BjcnQ1RVR0MnJXbGxOWWMvSHNiTkdoQTluWTVWVmRQN3RTSmVHNlhqKzhnYy9Qc1NtM21BWjRrRjhQZUltZlZUaDlNbXphTjhBQnB6NTQ5WHo5NysvWXRSb2FqUUl6c3hYV2RmdFRmTzllUVhVNWJtajBwUWhnWlcxYk5vWjNyRjlIemYwNTljeXlMZ2FIOXU1TnY3UnJrNVZtWmdsc0UwcEpaRStqMTNiUFUyTDhlbGZYd0lPNWdiSGErZWZNbXJWbXpoaXBYcWtRVzV1YTBmZTBDbllubk5yaDNsNFNjTmpaSHhSdGVySzBqb2M1SkRhRWFNbGF2WGsyWWtPbjI3ZHZDZTdiVEZIY3ZvdGVQK2pLa01jblJQK2YyNjN3TkhoMnJGMDZoZ1BwMXFFQitGMEZjMWE3cFJZRUI5Y2k3YWtXOTdvODdCZHV2UUdsTnNkd0hRTnpJMVUxbXVtRGt5SkZVcWxRcFFSeGR1blNKb0RuUXV3ZFJlaitBOXEyYlUzajdZTDJ2azd6VjhxNUtjeWIvcXZQNUwyNmZvbng1bldVV0Z0a25pRFlCZ1BqWGl4WXRVaGxhWmVPSm1sWEUwYU5IQys5OWZldFNtNkFtUXMvVGh5UVdQNDRPOW5wZkoza3I1SnFmRG01ZG9kTzVMRXFyVmlvbmh3VFp3eHFmS09ZeFJBYUJJSm14ZE9iejU4OEw0b2Mxb2djUEhwQ0xTejdxM1RWTUwrSjQ5TEE2K3ZMMmFZT1NYN0o0VWZwcjlWeWR4RmpiNEtaS2pPeTdTUlptbXJuSEpQc3E2Y1JvRERSdjNwekdqQmtqL0gzcjFpMHFXTkFWWWlPRTR0LytveE5KejI2ZEZNai85T1N5UWNudkZCcEVQY0xiYW4zZStGRURWTkR0b3ptS1FodlZNZ2dPNUZodFZVcHR3UXVmcEhvL2o0Qmk3dTZDQ0lwN2ZVdnJIOHVUWlhGM040UEwvS2dqZndtVCtiVlR1MFNmTSsyUGtTcElEem00cksyZHZkZmVmaFVXUnlwS0J6eDc5Z3p1UFE5cTBxZytTWjVmRmYxaitkaXlwVXZRaElpZkRVNCt0Nkg5dTFIQkFpNTBiUGRhdGNjOXVYR2MvdE15VUpIWTQrdHBiMnkzdDMvR0s3NzBBdnRndmIyOXFFSzVNcUo2R3krMi9PdlY0b21ORks5dUdvVjhsdC84WUdHbklWOGZiMkVoeU9ZRkhoVW45NjJuVlFzbVU2dW1EZVdzVHRyYTJteGxMNTB1SmdSWDJHM2lOSmtPakEyWlRDYVlEWEF2MUsxakd6cXlZL1UzeEw2NWQ0NW1SSTZCUHA1SElOOFE2cXFtOXZqNk1XRmRZbWRuR3dNN1RUelBNVENid0xGdmN4ZnZKK0o5QlgwTVozNmxTNWVPcGd5QzY5ZXZVL2Z1M1JCQmtFc3dxaFYxSzB5d0pGSitFQTZMSVhsN1ZxVGxjLzgwdUhxcHJ2MDJzajlaV1ZwZU1JYXBPTlRQeis4VFpURHdTR1NOYU8zYXRaVFQxcGFPNzFtbnRxZXpJYTV5QlErcVhhTWEzWWs2b0JmWlBMb2FONmhMRThjT0U5N3YzN0tjMXhNdmpVRitlTk9tVFdNb2cyTFhybDNrNSt1amtURFdlbGdrY0d2U3NKN094UE1FKytVNjNOaU04ZjVoRk9Xd3NJZ1h2V2pTQW0zcTE2OGZuVkhKbnpkdkh1WUF6VHAzNFlJRnZoSVdVTjlIWi9KNWNaV1VmSjVZK1hPWWxsbU5kRE0wK2JXS0ZTdjJLYU9TenlZSnRvQnFJdTNBWHl1b1RNbGk1QVdEbURiNmVmTEdrM3d6bUtYaFFLR0dmclZKK3VLYThIbkY4cVUvNnFSS2FvcW5nZmRKbmxISkQrL1VrUmJQL0NQTkp0ZlVXdXVXUDhTQXF5NkdKdDhDWGlTOWJmZkdRc01BZjBIdXBqZjVFY1A2SmxoYVdrUWFmTVpGek9PdUdUTm1xRElpK2RXeCtEcHpZRk82azgrTExDZEhoLzhhUmVPcFU2ZE9ocFQ3TmFwNzAra0RHOU9kL0xWTHBzRWw2YmpiR09UbjRhUUJkcU5sTk5TcVdVTll6cWMzK2V4U2RNcmx5QnBQWTJQa05FMkJ5VGMybzVGZnA3YVBZR3BJYi9KM2JWaEVWU3BYZ2hmT0pnNEt5akpENTI5eDc1ZXloejg1T1A2RkoyUzJ2NlExd3RxSDB0TFprZWxPL3NyNWs0UjdZUmNyWEtJeW04K09jUWVEc1E5RFVWOEVKRWsrZlBnZ0xPMDVISnQ5ci9pY3MvclNwZWRIUkVRSTRTTHBUZjZVOFNOb3dJRCtYME5qRVBncnd3aTRZdlk1czlGQWFTUFcxc2NLRkNpUUFNc2RCUVFFQ0dFVmJPd3l0cU1sTmF4Y3VSS3V1V1lHSVhEOTBobFV3Q1V2YkVVMmdyMWVtM09IOU9zbVJPWWxEU1dzVXFXS0JIek5Nd2p2a1B1VDJUN2RyMTgvZXZMa1NZYVErUndwWE1TdGtFSElieEhvLzlWc29LM2p2VkVEWDlxeVpjdi8zZHUvLy80clpNb2tCc3JxSGtLUElYUUNJa2FlRm9rSDJvQkhYRDZFQm5KRW03N2tzNk1kaXlVYTJDdWNMaDNiTHZvOGRuRTZPamdJWHJma1dMZHVIY0gvL1V4RHhtVHFqaXljSE9YajR5UFhKcjhwTGRHcjEwODB1RThYblFoZk1HMmNFTUQ2eFc2emNma3NRZng4Y2RyenE2WXdFWTdWckZTeFFxcjNWNkZDaFZqTWl6MjBaaDdoZkZzUVlTeFBEMDFHTEM1Y3VDQUV5YkluUzF2eVEwT2FVZlZxbFlRVktvZUUrRlQzRk96K2JLOW4wdXZVckNZRVNhbTdSZ09ZdEtkTW1aTHEvWEVVSGpyd1U2Mkl4NlFhaW1oZldXcVJ4QmtKVFpzMG9WQkVxR2xMUHZkc2p1bnMyQzVJaU9uOEV0akVJNGtmUW1URUVMV1JFMXZYekVOeW5MUGFURWFPYUlic2wzRWN2MWp1blJIVkc4c3g4WmtCWE1qQzBkR0IvdngxYUpxcGx4d0hpbFV0TFY2OFdPUDlJZGxQQnRFelVxeEtPYlpGaXhaeXlrVFlzV09INEdCZk5PTjNveFAvOXY1NWlDbDMrSk83aTdvM2RuY2lMK0dzR081dE9PT0M0K1F6R3pnaGdoTXBXR3N4RnZFc2xtcGhibWplckJtSlRWM2xFSFBNbjYvRmtCK0diSk1ZeXFSWXYzNjlrQWd4cEY5WGpRa1YyamFXL3lFdGZoQUN1WGlsTHhhc0tTWW16NWxyc3Qrdm56eDVzb295TVE0ZE9pVE1BWnlKRXYzNGtrR0laNWNoTDhUYzNZdVNMczRsZEFpRnh1QXBESTlYbVZIa0pBY25YSEFQTFZiVWpRNXRXNmtYOFJ6MjUxbTVBcFVvVVR6RlBDNHhTRXlHY0ZZYm9ZWW5GR2ZNMmdWcENSN3V5UDhTakg4L3RtMGw1R05wU3p5cm9IbWNjNU9QVHkwU1V6NG1KYkRsRjl5cU5LMTA2eUJhSVpxeUdEZ3RsWlBza1A5S1AzVU9GWkxSeENTc0lhZFdlSEJzejlKbm9mbjgrWFBXeE9TYUp0dVdxRjJUNWNobjhHam1PSjhpUlQ0SFVGVkU0QzB2cG5paHhBR3U5eTRlRWh3elUzOGZDVzJtcWhCKzZPVlZqWTRlUGFyMy8rYmNCaVIvM05aRWZnajh0Vm1TL0tRcnpwMDdkL0xDUjBqQVNCb0V4WTFMQ0tCZWp4QU5aeWdNR2pSSUNYRStSV05nTE1wZGlTSS92V3o0aGdablZySzFsa1VUK3lhTVljZnk4UERnK1B4QVRlU1h4RXBNS3FiM21DQU9WNjVjb2NTcWhEazFrVy9MeFJ6a2N2V1dCWDJxUVgxdmdBaVRZcktORkd0R2ZzcEZIZFFac1V6UVBMbHpqNzl6NXc2Yk83amlTRUZSNUdPSVRPM2J0MitLcVNpOHdEQ0pITTFnOTJaWVdCajdjYVhnYzVvMnBueGZWMWZYMkpSSVpyZVlDWnJCbVpSY1Z3SWhKTGNTYXhHSjk2T3c1NFZyNVNURnZYdjNCT3VjQ2VLQTRpQ3N1bmJTeFhmN283dTd1eVNweVpScjMyUVY5VEl0Z0lybDhWZ2RqOWNwTkp4N1A4cXlmR1c3WGJ0MkprYTF3Snc1YzNoVnUxblhrQkV2ek5TS0V5ZE9DQm9PVm1rbVJyWEE5dTNidWU3eVJkMHpJeXdzaGlKQ1RUcDE2dFEwS3h5WFZjQlJGWENjUDllci9DSjYveExNM0VwREdKaStKM0FKTTFnTEh1cGQveEt5Nno1dmMyR0NlTEJoRGhWdUwra2RxSW1Mbk1wb29ZSVpIZGlCZ21YK1lVT1FmM0wzN3QwbVJyVlROVkU3MDNLaS9tVytVZmFGSjEwVHhBTWVRVTRQOVRkRWlIakVnQUVEbENaS3hlSFZxMWRjZlVRcHhvd3NCaDFSQUNQR1JLczRqQnMzTGdFaE9BY05sWlRpeXFaUnJtbHNnbnB3cEFMdjF3TE92QTJXRWdSMTh5NzdQazFRajltelo2c3dSMTQxYkkxMlM4dXhyVnExa3Bub1RSMmNxd3dIUEVlbTFUSjBPbTV1VGdmVnRIM1M5d291RFYrbVRCa0pielZsbEswZTRCeVlhdXI5MzRJajQxRDBWYzRwVkdaRzNNQXlMNGVQY3pWdEV6N2p4WXNYWDlJK1QybFRLVlpYK0xOYzR4aVg3eG5zV09KZE10RGJGZUNEaTE3WXBzbE9NNXk1Z28yNjVGbkZyY2lCVXB4WXdkdC9jRmE3dW83MSt2VnJ3bllqTE4rbDRJSDN5bXFUNWx2OVlQSWRoL3hjaGJvd2s4d0dqcWxFUVQ5ZW5mTGVLeXBrMlV2d1FGU2MvdE82ZFdzbHlseEtPY2tCcXVSMVVOQ2JOWEN6OUFKdXBDY3ZveEZxRXA4WnNoYkZnQVBHWUpmaENMTTVhSnpFTmhkdEFkcFVOTjR4dXFSWkJrSWxqSUFvbG4zOEVJNGZQNTVpUkJ0L3hwYlJ6cDA3RXlvV0VxcFhDVnVoNmdvT1NNTC9GR0lzRFd5TmpNTjF6NXNaYVU4cm8wM0U4SGh0NDJyWmFQRWMvWUNJWnlrM1ZDR1hjUVZZWjJkbjZ0Ky9QK25ybUdHNWkrQlRybTBUZi9mdVhZTVJ6N3NlOFZvR3Y4WGRMSk9DeTV4d3FmS09pY09VRys4di9qTW5DQ1NQQjlKRnRXT3hnRWl3M1pqd3hrRTJ5MjdjdUdFUTRua3ZMOXhuc0ZrV1JXTitBTmhUVm1Nd2JrcmdWSHJPaWdmeFc3NHNabkM5WDFqazZTcCtPREp2NXN5WnFzU1l5aUN6TEk2cXZGT2NtNXViak1NUHhWUW9aMmQweTVZdEZTQ0lSVUxmNVBJWWszNFhUampyMnJXcmtqZEJFQXNlTVY1ZVhqS01vTGU0VENPejd3UXNtdnJCWFBFVzFsSUYxTGw0TGx6RWFtdFVWSlN3WVJqdjdNdzdDV0h1NFBsQ2ptTlhhNGoyOWNBSU9NWUpmYmlla2pjZVMybDA4VjVjdkJrWktxbHdTbjRDanArZnJpcGpPb0o3Y0NCNjdueE0xcmNUZS9ibkRSenhZS0JQNzBtY08reTB1R1lObkxzS3BIN0M5ZUo1ODh0eTVjcEprSEVqd2NLUTdleXNKVDBCOGFQeGQyRXpFNHl6RERIN3ZIbEFVSktKUHlnamFqTC9BMTVFeHkrTTQ0TGZBQUFBQUVsRlRrU3VRbUNDJztcbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHBhY2U6IDMzLFxuICAgICAgY29zdHVtZTogbnVsbCxcbiAgICB9O1xuXG4gICAgY29uc3QgYWN0dWFsID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgc3VwZXIoYWN0dWFsLnBhY2UpO1xuXG4gICAgLy8gY29zdHVtZXNcbiAgICB0aGlzLmNvc3R1bWVzID0gW107XG5cbiAgICAvKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgIC0gaW1hZ2UgdXJsLlxuICAgICogdXNlciBjYW4gc2VuZCBhIHVybCBpbnN0ZWFkIG9mIGFuIG9wdGlvbiBvYmplY3QuXG4gICAgKiB0aGlzIHdpbGwgYmUgdHJlYXRlZCBhcyBhIGNvc3R1bWUgaW1hZ2UgdXJsLlxuICAgICogdGhlIGltYWdlIHdpbGwgYmUgc2V0IHRoZSBzcHJpdGUgY29zdHVtZS5cbiAgICAqIHdoZW4gdGhlIGltYWdlIGlzIGxvYWRlZCwgY29zdHVtZSB3aWR0aCBhbmQgaGVpZ2h0IHdpbGwgYmUgc2V0IHRvIGFjdHVhbCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICogc3ByaXRlIHdpbGwgYmUgcmVmcmVzaGVkLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgYWN0dWFsLmNvc3R1bWUgPSBuZXcgQ29zdHVtZSh7IGltYWdlOiBvcHRpb25zLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG5cbiAgICAgIGNvbnN0IG1lID0gYWN0dWFsLmNvc3R1bWU7XG4gICAgICBpbWFnZS5zcmMgPSBvcHRpb25zO1xuXG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBtZS5vcmlnaW5hbFdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIG1lLm9yaWdpbmFsSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS53aWR0aCA9IG1lLm9yaWdpbmFsV2lkdGg7XG4gICAgICAgIG1lLmhlaWdodCA9IG1lLm9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zIC0gbnVsbC5cbiAgICAqIHVzZXIgY2FuIG51bGwgaW5zdGVhZCBvZiBhbiBvcHRpb24gb2JqZWN0LlxuICAgICogdGhpcyBpcyBzYW1lIGFzIHNldHRpbmcgYSBjb3N0dW1lIHdpdGggbm8gaW1hZ2Ugb3IgY29sb3IgYW5kIHdpZHRoL2hlaWdodCBvZiAwLlxuICAgICogdGhlIHNwcml0ZSB3aWxsIGhhdmUgbm8gY29zdHVtZXMgYW5kIG5vIHNpemUuXG4gICAgKi9cblxuICAgIC8vIHNldCBjb3N0dW1lcyBiYXNlZCBvbiBzZXR0aW5nc1xuICAgICFhY3R1YWwuY29zdHVtZSAmJiBvcHRpb25zID8gdGhpcy5jb3N0dW1lID0gbmV3IENvc3R1bWUoeyBpbWFnZTogc2hlZXB5IH0pIDogdGhpcy5jb3N0dW1lID0gYWN0dWFsLmNvc3R1bWU7XG5cbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLmNvc3R1bWVzLnB1c2godGhpcy5jb3N0dW1lKTtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy53aWR0aCA9IDA7XG4gICAgICB0aGlzLmhlaWdodCA9IDA7XG4gICAgfVxuXG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMueiA9IDA7XG5cbiAgICB0aGlzLnByZXZYID0gMDtcbiAgICB0aGlzLnByZXZZID0gMDtcblxuICAgIHRoaXMuc2hvd2luZyA9IHRydWU7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSA5MDtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSAxMDA7XG5cbiAgICB0aGlzLnJvdGF0aW9uU3R5bGUgPSAwO1xuXG4gICAgdGhpcy50ZXh0dWkgPSBudWxsO1xuXG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wZW5Db2xvciA9ICcjMjIyMjIyJztcbiAgICB0aGlzLnBlblNpemUgPSAxO1xuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdO1xuICAgIHRoaXMuY2xhc3NlcyA9IFtdO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gd2hpY2ggc3RhZ2UgdG8gYWRkIHRoZSBzcHJpdGUgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2VXaWR0aCA9IHN0YWdlLndpZHRoO1xuICAgIHRoaXMuc3RhZ2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgU3ByaXRlRWxlbWVudCh0aGlzLCBzdGFnZSk7XG4gICAgdGhpcy5zdXJmYWNlID0gbmV3IFN0YWdlU3VyZmFjZShzdGFnZSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZmxhZyA9IHN0YWdlLmVsZW1lbnQuZmxhZztcbiAgICB0aGlzLmFnYWluc3RCYWNrZHJvcCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXI7XG5cbiAgICBzdGFnZS5zcHJpdGVzLnB1c2godGhpcyk7XG4gICAgdGhpcy56ID0gc3RhZ2Uuc3ByaXRlcy5sZW5ndGg7XG5cbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogY2xvbmUgLSBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIHNwcml0ZSBhbmQgdHJpZ2dlcnMgYW4gZXZlbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCBjbG9uZSA9IHRoaXMuY2xvbmUoKTtcbiAgKiAgIGNsb25lLm1vdmUoMTAwKTtcbiAgKiAgIGNsb25lLmFkZFRvKHN0YWdlKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBjbG9uZSgpIHtcbiAgICAvLyBtYWtlIGEgbmV3IHNwcml0ZS5cbiAgICBjb25zdCBzcHJpdGUgPSBuZXcgU3ByaXRlKCk7XG4gICAgLy8gc2F2ZSBpZC5cbiAgICBjb25zdCBpZCA9IHNwcml0ZS5pZDtcbiAgICAvLyBhbmQgYXNzaWduIHByb3BlcnRpZXMuXG4gICAgY29uc3QgY2xvbmUgPSBPYmplY3QuYXNzaWduKHNwcml0ZSwgdGhpcyk7XG4gICAgLy8gcmVhc3NpZ24gdGhlIHVuaXF1ZSBpZC5cbiAgICBjbG9uZS5pZCA9IGlkO1xuXG4gICAgLy8gcmVtb3ZlIERPTSBlbGVtZW50c1xuICAgIGNsb25lLmVsZW1lbnQgPSBudWxsO1xuICAgIGNsb25lLnN1cmZhY2UgPSBudWxsO1xuXG4gICAgLy8gZGV0YWNoIGFycmF5c1xuICAgIGNsb25lLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNzc1J1bGVzKSk7XG4gICAgY2xvbmUuY2xhc3NlcyA9IHRoaXMuY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgLy8gZmlndXJlIG91dCB3aGF0IHRoZSBjdXJyZW50IGNvc3R1bWUgaXMuXG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpO1xuXG4gICAgLy8gZmlsbCB0aGUgY29zdHVtZXMgYXJyYXkgd2l0aCBuZXcgY29zdHVtZXMgYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNsb25lLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNvc3R1bWUgPSBuZXcgQ29zdHVtZSgpO1xuICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbihjb3N0dW1lLCBpdGVtKTtcblxuICAgICAgLy8gZGV0YWNoIGFycmF5c1xuICAgICAgb2JqLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLmNzc1J1bGVzKSk7XG4gICAgICBvYmouY2xhc3NlcyA9IGl0ZW0uY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IGNvc3R1bWUuXG4gICAgY2xvbmUuY29zdHVtZSA9IGNsb25lLmNvc3R1bWVzW2N1cnJlbnRDb3N0dW1lSW5kZXhdO1xuXG4gICAgLy8gYW5ub3VuY2UgYSBjbG9uZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLnNwcml0ZWNsb25lZC4ke3RoaXMuaWR9YCwgeyBkZXRhaWw6IGNsb25lIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRnJvbSAtIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnJlbW92ZUZyb20oc3RhZ2UpO1xuICAqXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlO1xuXG4gICAgY3VyU3RhZ2Uuc3ByaXRlcyA9IHN0YWdlLnNwcml0ZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcyk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKiogRXZlbnRzICogKi9cblxuICAvKipcbiAgKiB3aGVuQ2xvbmVkIC0gQWRkcyBhIGRvY3VtZW50IGxldmVsIGV2ZW50IGxpc3RlbmVyIHRyaWdnZXJlZCBieSBhIGN1c3RvbSBldmVudC5cbiAgKiBUaGUgY3VzdG9tIGV2ZW50IGlzIHRyaWdnZXJlZCBieSB0aGUgY2xvbmUoKSBtZXRob2QuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jbG9uZSgpO1xuICAqIH0pO1xuICAqXG4gICogc3ByaXRlLndoZW5DbG9uZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5hZGRUbyhzdGFnZSk7XG4gICogICB0aGlzLmdsaWRlKDUsIDEwMCwgMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuQ2xvbmVkKGZ1bmMpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBibG9ja0xpa2Uuc3ByaXRlY2xvbmVkLiR7dGhpcy5pZH1gLCAoZSkgPT4ge1xuICAgICAgZS5kZXRhaWwuX2V4ZWMoZnVuYywgW10pO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBNb3Rpb24gKiAqL1xuXG4gIC8qKlxuICAqIF9tb3Rpb24gLSBNb3ZlcyB0aGUgc3ByaXRlIHRvIHNwZWNpZmllZCBsb2NhdGlvbiAoeCwgeSkuXG4gICogQWxsIHVzZXIgbW90aW9uIG1ldGhvZHMgdHJhbnNsYXRlZCB0byB0aGlzIG1vdGlvbi5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICovXG4gIF9tb3Rpb24oeCwgeSkge1xuICAgIHRoaXMucHJldlggPSB0aGlzLng7XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gICAgdGhpcy5zdXJmYWNlID8gdGhpcy5zdXJmYWNlLmRyYXcodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogZ2xpZGUgLSBNb3ZlcyB0aGUgc3ByaXRlIGZvciB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzIHNvIGl0IGFycml2ZXMgYXQgc3BlY2lmaWVkIGxvY2F0aW9uIHdoZW4gdGltZSBpcyB1cC5cbiAgKiBQcm92aWRlcyBzbW9vdGggbW92ZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdsaWRlKDMsIDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCB0aW1lID0gNTtcbiAgKiAgIHRoaXMuZ2xpZGUodGltZSwgMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0aGUgd2hvbGUgbW92ZW1lbnQgd2lsbCBsYXN0IChhbmQgd2lsbCBoYWx0IGZ1cnRoZXIgZXhlY3V0aW9uIGZvcikuXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgZ2xpZGUoc2VjLCB4LCB5LCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAvLyBkaXZpZGUgdGhlIHggYW5kIHkgZGlmZmVyZW5jZSBpbnRvIHN0ZXBzXG4gICAgY29uc3QgZnJhbWVzUGVyU2Vjb25kID0gMTAwMCAvIHRoaXMucGFjZTtcbiAgICBjb25zdCBzdGVwWCA9ICh4IC0gdGhpcy54KSAvIChzZWMgKiBmcmFtZXNQZXJTZWNvbmQpO1xuICAgIGNvbnN0IHN0ZXBZID0gKHkgLSB0aGlzLnkpIC8gKHNlYyAqIGZyYW1lc1BlclNlY29uZCk7XG4gICAgY29uc3QgaW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaSArPSAxO1xuICAgICAgbWUuX21vdGlvbihtZS54ICsgc3RlcFgsIG1lLnkgKyBzdGVwWSk7XG4gICAgICBpZiAoaSAvIGZyYW1lc1BlclNlY29uZCA+PSBzZWMpIHtcbiAgICAgICAgLy8gIGNsZWFyIHRoZSBpbnRlcnZhbCBhbmQgZml4IGFueSBcImRyaWZ0XCJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnQpO1xuICAgICAgICBtZS5fbW90aW9uKHgsIHkpO1xuICAgICAgICBtZS5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgfVxuICAgIH0sIHRoaXMucGFjZSk7XG4gIH1cblxuICAvKipcbiAgKiBtb3ZlIC0gTW92ZXMgdGhlIHNwcml0ZSBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzIGluIHRoZSBkaXJlY3Rpb24gaXQgaXMgcG9pbnRpbmcuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBtb3ZlKHBpeGVscykge1xuICAgIC8qKlxuICAgICogdG9SYWQgLSBjb252ZXJ0cyBhIGRlZ3JlZSB0byByYWRpYW5zLlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcy5cbiAgICAqIEByZXR1cm4ge251bWJlcn0gLSBkZWdyZWVzIGNvbnZlcnRlZCB0byByYWRpYW5zLlxuICAgICovXG4gICAgZnVuY3Rpb24gdG9SYWQoZGVnKSB7XG4gICAgICByZXR1cm4gZGVnICogKE1hdGguUEkgLyAxODApO1xuICAgIH1cblxuICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZChNYXRoLmNvcyh0b1JhZCh0aGlzLmRpcmVjdGlvbiAtIDkwKSkgKiBwaXhlbHMpO1xuICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZChNYXRoLnNpbih0b1JhZCh0aGlzLmRpcmVjdGlvbiArIDkwKSkgKiBwaXhlbHMpO1xuXG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSk7XG4gIH1cblxuICAvKipcbiAgKiBnb1RvIC0gTW92ZXMgdGhlIHNwcml0ZSB0byBzcGVjaWZpZWQgbG9jYXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuZ29UbygxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqL1xuICBnb1RvKHgsIHkpIHtcbiAgICB0aGlzLl9tb3Rpb24oeCwgeSk7XG4gIH1cblxuICAvKipcbiAgKiBnb1Rvd2FyZHMgLSBNb3ZlcyB0aGUgc3ByaXRlIHRvd2FyZHMgYW5vdGhlciBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgxMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdvVG93YXJkcyhvdGhlclNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlIHRvLlxuICAqL1xuICBnb1Rvd2FyZHMoc3ByaXRlKSB7XG4gICAgdGhpcy5fbW90aW9uKHNwcml0ZS54LCBzcHJpdGUueSk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRYIC0gUGxhY2VzIHRoZSBzcHJpdGUgYXQgdGhlIHNwZWNpZmllZCB4IHBvc2l0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNldFgoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZVxuICAqL1xuICBzZXRYKHgpIHtcbiAgICB0aGlzLl9tb3Rpb24oeCwgdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFkgLSBQbGFjZXMgdGhlIHNwcml0ZSBhdCB0aGUgc3BlY2lmaWVkIHkgcG9zaXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2V0WSgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqL1xuICBzZXRZKHkpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVggLSBNb3ZlcyB0aGUgc3ByaXRlIG9uIHRoZSB4IGF4aXMgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHBpeGVscy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VYKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBjaGFuZ2VYKHBpeGVscykge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLnggKyBwaXhlbHMsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VZIC0gTW92ZXMgdGhlIHNwcml0ZSBvbiB0aGUgeSBheGlzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlWSgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgY2hhbmdlWShwaXhlbHMpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54LCB0aGlzLnkgKyBwaXhlbHMpO1xuICB9XG5cbiAgLyoqXG4gICogcG9pbnRJbkRpcmVjdGlvbiAtIFBvaW50cyB0aGUgc3ByaXRlIGluIGEgc3BlY2lmaWVkIGRpcmVjdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wb2ludEluRGlyZWN0aW9uKDQ1KTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBkaXJlY3Rpb24gdG8gcG9pbnQgdG8uXG4gICovXG4gIHBvaW50SW5EaXJlY3Rpb24oZGVnKSB7XG4gICAgZGVnID4gMCA/IHRoaXMuZGlyZWN0aW9uID0gZGVnICUgMzYwIDogdGhpcy5kaXJlY3Rpb24gPSAoZGVnICsgKDM2MCAqIDEwKSkgJSAzNjA7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBwb2ludFRvd2FyZHMgLSBQb2ludCB0aGUgc3ByaXRlIHRvd2FyZHMgYW5vdGhlciBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuZ29UbygxMDAsIDEwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRUb3dhcmRzKG90aGVyU3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUgdG8uXG4gICovXG4gIHBvaW50VG93YXJkcyhzcHJpdGUpIHtcbiAgICAvKipcbiAgICAqIGNvbXB1dGVEaXJlY3Rpb25UbyAtIGZpbmRzIHRoZSBkaXJlY3Rpb24gZnJvbSBzcHJpdGUncyBjdXJyZW50IGxvY2F0aW9uIHRvIGEgc3BlY2lmaWVkIHNldCBvZiBjb29yZGluYXRlcy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVggLSB0aGUgeCBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVkgLSB0aGUgeSBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdG9YIC0gdGhlIHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvWSAtIHRoZSB5IGNvb3JkaW5hdGVcbiAgICAqIEByZXR1cm4ge251bWJlcn0gLSBkaXJlY3Rpb24gaW4gZGVncmVlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVEaXJlY3Rpb25Ubyhmcm9tWCwgZnJvbVksIHRvWCwgdG9ZKSB7XG4gICAgICAvKipcbiAgICAgICogdG9EZWcgLSBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXMuXG4gICAgICAqXG4gICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgLSBudW1iZXIgb2YgcmFkaWFucy5cbiAgICAgICogQHJldHVybiB7bnVtYmVyfSAtIHJhZGlhbnMgY29udmVydGVkIHRvIGRlZ3JlZXMuXG4gICAgICAqL1xuICAgICAgZnVuY3Rpb24gdG9EZWcocmFkKSB7XG4gICAgICAgIHJldHVybiByYWQgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgICB9XG5cbiAgICAgIC8vIDEpIEZpbmQgdGhlIGFuZ2xlIGluIHJhZCwgY29udmVydCB0byBkZWcgKDkwIHRvIC05MCkuXG4gICAgICAvLyAyKSBGaW5kIHRoZSBzaWduIG9mIHRoZSBkZWx0YSBvbiB5IGF4aXMgKDEsIC0xKS4gU2hpZnQgdG8gKDAsIC0yKS4gTXVsdGlwbHkgYnkgOTAuICgwLCAxODApXG4gICAgICAvLyBBZGQgMSkgYW5kIDIpXG4gICAgICAvLyBOb3JtYWxpemUgdG8gMzYwXG5cbiAgICAgIGxldCByZXN1bHQgPSAodG9EZWcoTWF0aC5hdGFuKChmcm9tWCAtIHRvWCkgLyAoZnJvbVkgLSB0b1kpKSkgKyAoOTAgKiAoTWF0aC5zaWduKGZyb21ZIC0gdG9ZKSArIDEpKSArIDM2MCkgJSAzNjA7XG4gICAgICAoZnJvbVkgLSB0b1kpID09PSAwID8gcmVzdWx0ICs9IDkwIDogbnVsbDsgLy8gbWFrZSBzdXJlIHdlIGZpeCBhdGFuIGxpbSAoZGl2aXNpb24gYnkgemVybykuXG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBjb21wdXRlRGlyZWN0aW9uVG8odGhpcy54LCB0aGlzLnksIHNwcml0ZS54LCBzcHJpdGUueSk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiB0dXJuUmlnaHQgLSBUdXJucyB0aGUgc3ByaXRlIGluIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkZWdyZWVzIHRvIHRoZSByaWdodCAoY2xvY2t3aXNlKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnR1cm5SaWdodCg0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdHVybi5cbiAgKi9cbiAgdHVyblJpZ2h0KGRlZykge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKHRoaXMuZGlyZWN0aW9uICsgZGVnKSAlIDM2MDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHR1cm5MZWZ0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgbGVmdCAoY291bnRlci1jbG9ja3dpc2UpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMudHVybkxlZnQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5MZWZ0KGRlZykge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKCh0aGlzLmRpcmVjdGlvbiArIDM2MCkgLSBkZWcpICUgMzYwO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc2V0Um90YXRpb25TdHlsZSAtIFNldHMgb25lIG9mIHRocmVlIHBvc3NpYmxlIHJvdGF0aW9uIHN0eWxlczpcbiAgKiAgIC0gJ25vJyAvIDIgLSB0aGUgc3ByaXRlcyBjaGFuZ2VzIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggaXQgcG9pbnRzIHdpdGhvdXQgY2hhbmdpbmcgdGhlIHNwcml0ZXMgYXBwZWFyYW5jZS5cbiAgKiAgIC0gJ2xlZnQtcmlnaHQnIC8gMSAtIHRoZSBzcHJpdGUgd2lsbCBmbGlwIGhvcml6b250YWxseSB3aGVuIGRpcmVjdGlvbiBpcyBiZXR3ZWVuIDE4MCBhbmQgMzYwLlxuICAqICAgLSAnYWxsJyAvIDAgLSB0aGUgc3ByaXRlIHdpbGwgcm90YXRlIGFyb3VuZCBpdHMgY2VudGVyXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFJvdGF0aW9uU3R5bGUoJ2xlZnQtcmlnaHQnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLnNldFJvdGF0aW9uU3R5bGUoMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdHVybi5cbiAgKi9cbiAgc2V0Um90YXRpb25TdHlsZShzdHlsZSkge1xuICAgIGxldCBjdXJTdHlsZSA9IHN0eWxlO1xuXG4gICAgc3R5bGUgPT09ICdubycgPyBjdXJTdHlsZSA9IDIgOiBudWxsO1xuICAgIHN0eWxlID09PSAnbGVmdC1yaWdodCcgPyBjdXJTdHlsZSA9IDEgOiBudWxsO1xuICAgIHN0eWxlID09PSAnYWxsJyA/IGN1clN0eWxlID0gMCA6IG51bGw7XG5cbiAgICB0aGlzLnJvdGF0aW9uU3R5bGUgPSBjdXJTdHlsZTtcbiAgfVxuXG4gIC8qKiBMb29rcyAqICovXG5cbiAgLyoqXG4gICogX3JlZnJlc2hDb3N0dW1lIC0gU2V0cyB0aGUgY29zdHVtZSBhbmQgc3ByaXRlIHdpZHRoIGFuZCBoaWdodCB0aGVuIHJlZnJlc2hlcyBlbGVtZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKi9cbiAgX3JlZnJlc2hDb3N0dW1lKCkge1xuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENvc3R1bWUgLSBBZGRzIGEgY29zdHVtZSB0byB0aGUgc3ByaXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb3N0dW1lIC0gdGhlIGNvc3R1bWUgdG8gYWRkLlxuICAqL1xuICBhZGRDb3N0dW1lKGNvc3R1bWUpIHtcbiAgICB0aGlzLmNvc3R1bWVzLnB1c2goY29zdHVtZSk7XG5cbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZS5cbiAgICBpZiAoIXRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1swXTtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaENvc3R1bWVUbyAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBjb3N0dW1lLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUuc3dpdGNoQ29zdHVtZVRvKGNvc3R1bWUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGNvc3R1bWUgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQ29zdHVtZVRvKGNvc3R1bWUpIHtcbiAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKGNvc3R1bWUpO1xuICAgIGN1cnJlbnRDb3N0dW1lSW5kZXggIT09IC0xID8gdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1tjdXJyZW50Q29zdHVtZUluZGV4XSA6IG51bGw7XG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQ29zdHVtZVRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGNvc3R1bWUgYnkgbnVtYmVyIG9mIGN1cnJlbnQgKDAgaXMgZmlyc3QpLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUuc3dpdGNoQ29zdHVtZVRvTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGNvc3R1bWUgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQ29zdHVtZVRvTnVtKGluZGV4KSB7XG4gICAgdGhpcy5zd2l0Y2hDb3N0dW1lVG8odGhpcy5jb3N0dW1lc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogbmV4dENvc3R1bWUgLSBTd2l0Y2hlcyB0byB0aGUgbmV4dCBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLm5leHRDb3N0dW1lKCk7XG4gICpcbiAgKi9cbiAgbmV4dENvc3R1bWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpO1xuICAgIHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbKGN1cnJlbnRDb3N0dW1lSW5kZXggKyAxKSAlIHRoaXMuY29zdHVtZXMubGVuZ3RoXTtcblxuICAgIHRoaXMuX3JlZnJlc2hDb3N0dW1lKCk7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDb3N0dW1lIC0gUmVtb3ZlcyBhIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZShjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb3N0dW1lIC0gdGhlIGNvc3R1bWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDb3N0dW1lKGNvc3R1bWUpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKGNvc3R1bWUpO1xuICAgICAgdGhpcy5jb3N0dW1lID09PSBjb3N0dW1lID8gdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1soY3VycmVudENvc3R1bWVJbmRleCArIDEpICUgdGhpcy5jb3N0dW1lcy5sZW5ndGhdIDogbnVsbDtcbiAgICAgIHRoaXMuY29zdHVtZXMgPSB0aGlzLmNvc3R1bWVzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGNvc3R1bWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gW107XG4gICAgICB0aGlzLmNvc3R1bWUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZU51bSAtIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjb3N0dW1lLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZU51bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZU51bShpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQ29zdHVtZSh0aGlzLmNvc3R1bWVzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiBzaG93IC0gU2hvd3MgdGhlIHNwcml0ZS4gQnkgZGVmYXVsdCBzcHJpdGVzIGFyZSBzaG93bi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaGlkZSgpO1xuICAqIHNwcml0ZS5zaG93KCk7XG4gICpcbiAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaGlkZSAtIEhpZGVzIHRoZSBzcHJpdGUuIEJ5IGRlZmF1bHQgc3ByaXRlcyBhcmUgc2hvd24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmhpZGUoKTtcbiAgKlxuICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVmcmVzaCAtIEZvcmNlcyBhIHNwcml0ZSByZWZyZXNoLlxuICAqIE5vdGU6IHNlcnZpY2UgbWV0aG9kIHRvIGJlIHVzZWQgaWYgY29zdHVtZSB3YXMgbWFuaXB1bGF0ZWQgZGlyZWN0bHkuXG4gICovXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIC8vIHdhaXQgYSBzZWMuLi5cbiAgICAvLyBUT0RPOiBUaGlzIGlzIHRvIGFjY29tb2RhdGUgZHluYW1pYyBpbWFnZSByZXNpemUuIE5vdCBpZGVhbC4gU2hvdWxkIGJlIGV2ZW50IGRyaXZlbi5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGluIGNhc2UgY29zdHVtZSB3YXMgcmVzaXplZCBmb3JjZSBhIHJlc2V0IG9mIHNpemUuXG4gICAgICBtZS5zZXRTaXplKG1lLm1hZ25pZmljYXRpb24pO1xuICAgICAgLy8gdGhlbiByZWZyZXNoIHRoZSBET00uXG4gICAgICBtZS5lbGVtZW50ID8gbWUuZWxlbWVudC51cGRhdGUobWUpIDogbnVsbDtcbiAgICB9LCB0aGlzLnBhY2UpO1xuICB9XG5cbiAgLyoqXG4gICogcmVzaXplVG9JbWFnZSAtIHNldHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHNwcml0ZSB0byB0aGF0IG9mIHRoZSBpbWFnZSBmaWxlIG9mIGN1cnJlbnQgY29zdHVtZS5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZC4gU2ltaWxhciB0byBjYWxsaW5nIHJlc2l6ZVRvSW1hZ2UoKSBvbiBjb3N0dW1lIGFuZCB0aGVuIHJlZnJlc2goKSBvbiBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvbnN0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKG51bGwpO1xuICAqXG4gICogY29uc3QgYW5ncnlTaGVlcCA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gICogICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvZC9kYi9FbW9qaW9uZV8xRjQxMS5zdmcvMjAwcHgtRW1vamlvbmVfMUY0MTEuc3ZnLnBuZycsXG4gICogfSk7XG4gICogYW5ncnlTaGVlcC5hZGRUbyhzcHJpdGUpO1xuICAqXG4gICogc3ByaXRlLnJlc2l6ZVRvSW1hZ2UoKTtcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqL1xuICByZXNpemVUb0ltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMuY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgKiBpbm5lciAtIFBsYWNlcyBodG1sIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLmlubmVyKCdJIGxpa2UgdGV4dCBvbmx5Jyk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGlubmVyKGh0bWwpIHtcbiAgICB0aGlzLmNvc3R1bWUuaW5uZXIoaHRtbCk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBQbGFjZXMgYSBET00gZWxlbWVudCBpbnNpZGUgdGhlIGN1cnJlbnQgY29zdHVtZSBvZiB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5pbnNlcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWh0bWwtY3JlYXRpb24nKSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGluc2VydChlbCkge1xuICAgIHRoaXMuY29zdHVtZS5pbnNlcnQoZWwpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogX3JlZnJlc2hTaXplIC0gU2V0cyB0aGUgc3ByaXRlIHdpZHRoIGFuZCBoaWdodCBpbiByZWxhdGlvbiB0byBvcmlnaW5hbCB0aGVuIHJlZnJlc2hlcyBlbGVtZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIGFkZC5cbiAgKi9cbiAgX3JlZnJlc2hTaXplKCkge1xuICAgIC8qKlxuICAgICogZGVjaW1hbFJvdW5kIC0gcm91bmRzIGEgbnVtYmVyIHRvbyBkZWNpbWFsIHBvaW50cy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gcm91bmQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gcG9pbnRzIC0gaG93IG1hbnkgZGVjaW1hbCBwb2ludHMgdG8gbGVhdmUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBkZWNpbWFsUm91bmQodmFsdWUsIHBvaW50cykge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAoMTAgKiogcG9pbnRzKSkgLyAoMTAgKiogcG9pbnRzKTtcbiAgICB9XG5cbiAgICB0aGlzLndpZHRoID0gZGVjaW1hbFJvdW5kKHRoaXMuY29zdHVtZS53aWR0aCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICB0aGlzLmhlaWdodCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpO1xuXG4gICAgdGhpcy5jb3N0dW1lcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBjb3N0dW1lID0gaXRlbTtcbiAgICAgIGNvc3R1bWUudmlzaWJsZVdpZHRoID0gZGVjaW1hbFJvdW5kKGNvc3R1bWUud2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgICBjb3N0dW1lLnZpc2libGVIZWlnaHQgPSBkZWNpbWFsUm91bmQoY29zdHVtZS5oZWlnaHQgKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgfSk7XG5cbiAgICB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodCA9IHRoaXMuaGVpZ2h0O1xuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VTaXplIC0gQ2hhbmdlcyB0aGUgc2l6ZSBvZiB0aGUgc3ByaXRlIGJ5IHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuY2hhbmdlU2l6ZSg1MCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gY2hhbmdlIC0gdGhlIHBlcmNlbnRhZ2UgY2hhbmdlLlxuICAqL1xuICBjaGFuZ2VTaXplKGNoYW5nZSkge1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IHRoaXMubWFnbmlmaWNhdGlvbiArIGNoYW5nZTtcblxuICAgIHRoaXMuX3JlZnJlc2hTaXplKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRTaXplIC0gU2V0cyB0aGUgc2l6ZSBvZiB0aGUgc3ByaXRlIHRvIHRoZSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFNpemUoMTUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwZXJjZW50IC0gdGhlIHBlcmNlbnRhZ2UgdG8gc2V0LlxuICAqL1xuICBzZXRTaXplKHBlcmNlbnQpIHtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSBwZXJjZW50O1xuXG4gICAgdGhpcy5fcmVmcmVzaFNpemUoKTtcbiAgfVxuXG4gIC8qKiBUZXh0IFVJICogKi9cblxuICAvKipcbiAgKiB0aGluayAtIENyZWF0ZXMgYSBcInRoaW5rIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUudGhpbmsoJ0kgdGhpbmsgdGhlcmVmb3JlIEkgYW0uJyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqL1xuICB0aGluayh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudCh0aGlzLCAndGhpbmsnLCB0ZXh0KSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogdGhpbmtXYWl0IC0gQ3JlYXRlcyBhIFwidGhpbmsgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUudGhpbmtXYWl0KCdJIHRoaW5rIHRoZXJlZm9yZSBJIGFtLicsIDMpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gdGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXG4gICovXG4gIHRoaW5rV2FpdCh0ZXh0LCBzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2F5KCcnKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgICB0aGlzLnRoaW5rKHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICogc2F5IC0gQ3JlYXRlcyBhIFwic3BlZWNoIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5KCdJdCBpcyBub3QgdGhlIGNvbnNjaW91c25lc3Mgb2YgbWVuIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBiZWluZywgYnV0LCBvbiB0aGUgY29udHJhcnksIHRoZWlyIHNvY2lhbCBiZWluZyB0aGF0IGRldGVybWluZXMgdGhlaXIgY29uc2Npb3VzbmVzcy4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHNheSh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudCh0aGlzLCAnc2F5JywgdGV4dCkgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHNheVdhaXQgLSBDcmVhdGVzIGEgXCJzcGVlY2ggYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5V2FpdCgnSXQgaXMgbm90IHRoZSBjb25zY2lvdXNuZXNzIG9mIG1lbiB0aGF0IGRldGVybWluZXMgdGhlaXIgYmVpbmcsIGJ1dCwgb24gdGhlIGNvbnRyYXJ5LCB0aGVpciBzb2NpYWwgYmVpbmcgdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGNvbnNjaW91c25lc3MuJywgMyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC5cbiAgKi9cbiAgc2F5V2FpdCh0ZXh0LCBzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNheSgnJyk7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSwgc2VjICogMTAwMCk7XG4gICAgdGhpcy5zYXkodGV4dCk7XG4gIH1cblxuICAvKipcbiAgKiBhc2sgLSBDcmVhdGVzIGFuIFwiYXNrIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKiBBbGxvd3MgZm9yIGFuIGlucHV0IGJveCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIgYW5kXG4gICogY2FwdHVyZSB1c2VyIGlucHV0IGludG8gdGhlIHZhcmlhYmxlIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgKiBOb3RlIC0gdmFyaWFibGUgZm9yIGFuc3dlciBtdXN0IGJlIGRlY2xhcmVkIGluIGdsb2JhbCBzY29wZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogLy9nb29kOlxuICAqIGxldCBhbnN3ZXI7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGFuc3dlciA9IHRoaXMuYXNrKCdJcyB0aGUgZGVzdGlueSBvZiBtYW5raW5kIGRlY2lkZWQgYnkgbWF0ZXJpYWwgY29tcHV0YXRpb24/Jyk7XG4gICogICB0aGlzLnNheShhbnN3ZXIpO1xuICAqIH0pO1xuICAqXG4gICogLy8gYmFkOlxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgYW5zd2VyO1xuICAqICAgYW5zd2VyID0gdGhpcy5hc2soJ0lzIHRoZSBkZXN0aW55IG9mIG1hbmtpbmQgZGVjaWRlZCBieSBtYXRlcmlhbCBjb21wdXRhdGlvbj8nKTtcbiAgKiAgIHRoaXMuc2F5KGFuc3dlcik7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IG9mIHRoZSBxdWVzdGlvblxuICAqXG4gICovXG4gIGFzayh0ZXh0LCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIG1lLmFza0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHR1aSA/IHRoaXMudGV4dHVpID0gdGhpcy50ZXh0dWkuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KG1lLCAnYXNrJywgdGV4dCkgOiBudWxsO1xuXG4gICAgICAvLyB0aGlzIHdpbGwgd2FpdCBmb3IgdXNlciBpbnB1dFxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgYmxvY2tMaWtlLmFzay4ke3RoaXMuaWR9LiR7bWUuYXNrSWR9YCwgZnVuY3Rpb24gYXNrTGlzdGVuZXIoZSkge1xuICAgICAgICAvLyByZW1vdmUgaXQuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5hc2suJHttZS5pZH0uJHttZS5hc2tJZH1gLCBhc2tMaXN0ZW5lcik7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHdhaXRlZCBtZXRob2QgbGlzdGVuZXIuIHJlbGVhc2UgaXQuXG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgICAgdGhlVmFyID8gbWUuX3NldFRvVmFyKHRoZVZhciwgZS5kZXRhaWwudmFsdWUpIDogbnVsbDtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBVSS5cbiAgICAgICAgbWUudGV4dHVpID8gbWUudGV4dHVpID0gbWUudGV4dHVpLmRlbGV0ZShtZSkgOiBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFBlbiAqICovXG5cbiAgLyoqXG4gICogcGVuQ2xlYXIgLSBDbGVhcnMgdGhlIGRyYXdpbmcgc3VyZmFjZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wZW5DbGVhcigpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlbkNsZWFyKCkge1xuICAgIHRoaXMuc3VyZmFjZS5jbGVhcih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBlbkRvd24gLSBcIkFjdGl2YXRlc1wiIGRyYXdpbmcgYnkgc2V0dGluZyByZXF1aXJlZCB2YWx1ZXMuXG4gICogV2hlbiBhY3RpdmF0ZWQgc3ByaXRlIG1vdGlvbiB3aWxsIGNyZWF0ZSB0aGUgZHJhd2luZyBvbiB0aGUgc3RhZ2UncyBjYW52YXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuRG93bigpO1xuICAqICAgdGhpcy5tb3ZlKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgcGVuRG93bigpIHtcbiAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgIHRoaXMucHJldlggPSB0aGlzLng7XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueTtcbiAgICB0aGlzLnN1cmZhY2UuZHJhdyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBlblVwIC0gXCJEZWFjdGl2YXRlc1wiIGRyYXdpbmcgYnkgc2V0dGluZyByZXF1aXJlZCB2YWx1ZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuRG93bigpO1xuICAqICAgdGhpcy5tb3ZlKDEwMCk7XG4gICogICB0aGlzLnBlblVwKCk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgcGVuVXAoKSB7XG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgdGhpcy5zdXJmYWNlLmRyYXcodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRQZW5Db2xvciAtIFNldHMgdGhlIGNvbG9yIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCcjZmYwMDAwJylcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCdyZWQnKVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yU3RyaW5nIC0gYSB2YWxpZCBjb2xvciBkZWZpbml0aW9uIGZvciBjYW52YXMgc3Ryb2tlU3R5bGUuXG4gICovXG4gIHNldFBlbkNvbG9yKGNvbG9yU3RyaW5nKSB7XG4gICAgdGhpcy5wZW5Db2xvciA9IGNvbG9yU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICogc2V0UGVuU2l6ZSAtIFNldHMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0UGVuU2l6ZSgxMCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gYSBudW1iZXIgZm9yIGNhbnZhcyBsaW5lV2lkdGguXG4gICovXG4gIHNldFBlblNpemUocGl4ZWxzKSB7XG4gICAgdGhpcy5wZW5TaXplID0gcGl4ZWxzO1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlUGVuU2l6ZSAtIENoYW5nZXMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VQZW5TaXplKDEwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2UgLSB0aGUgY2hhbmdlIGluIHBpeGVscy5cbiAgKi9cbiAgY2hhbmdlUGVuU2l6ZShjaGFuZ2UpIHtcbiAgICB0aGlzLnBlblNpemUgPSB0aGlzLnBlblNpemUgKyBjaGFuZ2U7XG4gIH1cblxuICAvKiBTZW5zaW5nICovXG5cbiAgLyoqXG4gICogZGlzdGFuY2VUbyAtIFJldHVybnMgdGhlIGRpc3RhbmNlIHRvIGEgcG9pbnQgb24gdGhlIHNjcmVlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7c2Vuc2luZzogdHJ1ZX0pO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8odGhpcy5tb3VzZVgsIHRoaXMubW91c2VZKSlcbiAgKiB9KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLm90aGVyU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8ob3RoZXJTcHJpdGUueCwgb3RoZXJTcHJpdGUueSkpXG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqIEByZXR1cm4ge251bWJlcn0gLSBkaXN0YW5jZSBpbiBwaXhlbHMgdG8gcG9zaXRpb24gb24gc2NyZWVuIChub3Qgcm91bmRlZCkuXG4gICovXG4gIGRpc3RhbmNlVG8oeCwgeSkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0geDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0VkZ2UgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyB0aGUgZWRnZSBvZiB0aGUgc3RhZ2UgYW5kIHJldHVybnMgdGhlIGVkZ2UgdG91Y2hlZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiB0aGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUodGhpcy54IDwgc3RhZ2Uud2lkdGggLyAyKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKVxuICAqICAgIHRoaXMuc2F5KHRoaXMudG91Y2hpbmdFZGdlKCkpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzaWRlIG9mIHRoZSBzdGFnZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmdFZGdlKCkge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLngpICsgKHRoaXMud2lkdGggLyAyKSA+IHRoaXMuc3RhZ2VXaWR0aCAvIDIpIHtcbiAgICAgIHJlc3VsdCA9ICdyaWdodCc7XG4gICAgfVxuICAgIGlmICgodGhpcy54KSAtICh0aGlzLndpZHRoIC8gMikgPCAtMSAqICh0aGlzLnN0YWdlV2lkdGggLyAyKSkge1xuICAgICAgcmVzdWx0ID0gJ2xlZnQnO1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgKyAodGhpcy5oZWlnaHQgLyAyKSA+IHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSB7XG4gICAgICByZXN1bHQgPSAndG9wJztcbiAgICB9XG4gICAgaWYgKCh0aGlzLnkpIC0gKHRoaXMuaGVpZ2h0IC8gMikgPCAtMSAqICh0aGlzLnN0YWdlSGVpZ2h0IC8gMikpIHtcbiAgICAgIHJlc3VsdCA9ICdib3R0b20nO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy5pc1RvdWNoaW5nRWRnZSgpKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgZWRnZS5cbiAgKi9cbiAgaXNUb3VjaGluZ0VkZ2UoKSB7XG4gICAgcmV0dXJuICEhdGhpcy50b3VjaGluZ0VkZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgYW5vdGhlciBhbmQgcmV0dXJucyBhdCB3aGF0IHNpZGUgaXQgdG91Y2hlcy5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAyLiBpZiB0aGUgc3ByaXRlIGhhcyBnb25lIFwiaW50b1wiIHRoZSBvdGhlciB0aGUgc2lkZSBcInBlbmV0cmF0ZWQgbW9yZVwiIHdpbGwgYmUgcmV0dXJuZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLnRvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZyhvdGhlclNwcml0ZSkpXG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHNwcml0ZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmcoc3ByaXRlKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpID4gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMikgJiZcbiAgICAgIHRoaXMueCAtICh0aGlzLndpZHRoIC8gMikgPCBzcHJpdGUueCArIChzcHJpdGUud2lkdGggLyAyKSAmJlxuICAgICAgdGhpcy55ICsgKHRoaXMuaGVpZ2h0IC8gMikgPiBzcHJpdGUueSAtIChzcHJpdGUuaGVpZ2h0IC8gMikgJiZcbiAgICAgIHRoaXMueSAtICh0aGlzLmhlaWdodCAvIDIpIDwgc3ByaXRlLnkgKyAoc3ByaXRlLmhlaWdodCAvIDIpXG4gICAgKSB7XG4gICAgICB0aGlzLnggPj0gc3ByaXRlLnggPyByZXN1bHQgPSAnbGVmdCcgOiBudWxsO1xuICAgICAgdGhpcy54IDwgc3ByaXRlLnggPyByZXN1bHQgPSAncmlnaHQnIDogbnVsbDtcbiAgICAgIHRoaXMueSA+IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICdib3R0b20nIDogbnVsbDtcbiAgICAgIHRoaXMueSA8IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICd0b3AnIDogbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZyAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIGFub3RoZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLmlzVG91Y2hpbmcob3RoZXJTcHJpdGUpKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGNoZWNrIGlmIHRvdWNoaW5nLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgc3BlY2lmaWVkIHNwcml0ZS5cbiAgKi9cbiAgaXNUb3VjaGluZyhzcHJpdGUpIHtcbiAgICByZXR1cm4gISF0aGlzLnRvdWNoaW5nKHNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBSZXR1cm5zIHRoZSBoZXggdmFsdWUgdG8gYWxsIHBpeGVscyBpbiBiYWNrZHJvcCBhcmVhIGNvdmVyZWQgYnkgdGhlIHNwcml0ZSByZWN0YW5nbGUuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gVGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqIDMuIFRoZSBiYWNrZHJvcCBpbWFnZSBtdXN0IGJlIGEgbG9jYWwgaW1hZ2Ugc2VydmVkIGZyb20gc2FtZSBvcmlnaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHdoaWxlKHRydWUpe1xuICAqICAgICBsZXQgdG91Y2hlZENvbG9ycyA9IHRoaXMudG91Y2hpbmdCYWNrZHJvcENvbG9yKCk7XG4gICogICAgIHRoaXMuc2F5KHRvdWNoZWRDb2xvcnMpO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHthcnJheX0gLSBjb2xvcnMgKHN0cmluZ3MpIHRvdWNoZWQuXG4gICovXG4gIHRvdWNoaW5nQmFja2Ryb3BDb2xvcigpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8qKlxuICAgICogcmdiVG9IZXggLSBjb252ZXJ0cyBhIGNvbG9yIGRlZmluZWQgYnkgUkdCIHZhbHVlcyBpbnRvIGEgb24gZGVmaW5lZCBhcyBhIGhleCBzdHJpbmcuXG4gICAgKlxuICAgICogRnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYyMzgzOC9yZ2ItdG8taGV4LWFuZC1oZXgtdG8tcmdiXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHIgLSB0aGUgcmVkIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZyAtIHRoZSBncmVlbiB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGIgLSAgdGhlIGJsdWUgdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBoZXggY29sb3Igc3RyaW5nLlxuICAgICovXG4gICAgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xuICAgICAgcmV0dXJuIGAjJHsoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSl9YDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1iaXR3aXNlXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhY2tkcm9wQ29udGV4dCA9IHRoaXMuYWdhaW5zdEJhY2tkcm9wLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjb25zdCBkYXRhID0gYmFja2Ryb3BDb250ZXh0LmdldEltYWdlRGF0YSgoKHRoaXMuc3RhZ2VXaWR0aCAvIDIpIC0gKHRoaXMud2lkdGggLyAyKSkgKyB0aGlzLngsICgodGhpcy5zdGFnZUhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMikpIC0gdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHJnYlRvSGV4KGRhdGFbaV0sIGRhdGFbaSArIDFdLCBkYXRhW2kgKyAyXSkpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvcigpIGluZ25vcmVkLiBCYWNrZHJvcCBpbWFnZSBjYW4gbm90IGJlIGxvY2F0ZWQgYXQgYSByZW1vdGUgb3JpZ2luLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHJlc3VsdCkpO1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBjb21wYXJlcyBhIGdpdmVuIGhleCB2YWx1ZSB0byBhbGwgcGl4ZWxzIGluIGJhY2tkcm9wIGFyZWEgY292ZXJlZCBieSB0aGUgc3ByaXRlIHJlY3RhbmdsZS5cbiAgKiBJZiBhIG1hdGNoIGlzIGZvdW5kIHRoZSBjb2xvciBpcyByZXR1cm5lZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiBUaGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICogMy4gVGhlIGJhY2tkcm9wIGltYWdlIG11c3QgYmUgYSBsb2NhbCBpbWFnZSBzZXJ2ZWQgZnJvbSBzYW1lIG9yaWdpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBsZXQgbW92aW5nID0gdHJ1ZTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgd2hpbGUobW92aW5nKXtcbiAgKiAgICAgdGhpcy5pc1RvdWNoaW5nQmFja2Ryb3BDb2xvcignI2ZmMDAwMCcpID8gbW92aW5nID0gZmFsc2UgOiBtb3ZpbmcgPSB0cnVlO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gYmFja2Ryb3BDb2xvciAtIHRoZSBjb2xvciB0byBldmFsdWF0ZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGRvZXMgdGhlIHNwcml0ZSB0b3VjaCB0aGUgY29sb3IuXG4gICovXG4gIGlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKGJhY2tkcm9wQ29sb3IpIHtcbiAgICBjb25zdCBoZXhBcnIgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcihiYWNrZHJvcENvbG9yKTtcblxuICAgIHJldHVybiBoZXhBcnIuaW5jbHVkZXMoYmFja2Ryb3BDb2xvcik7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnRzIGF0dGFjaGVkIHRvIGEgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgbWF5IGhhdmUgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFVpRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIHVpIGVsZW1lbnQgdGhhdCBcImF0dGFoY2VzXCIgdG8gYSBzcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB3aGF0IHVpIHRvIGNyZWF0ZSAoc2F5IGJ1YmJsZSwgdGhpbmsgYnViYmxlIG9yIGFzayBib3gpXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSAgd2hhdCB0aGUgdGV4dCBzYWlkL3Rob3VnaHQvYXNrIHdpbGwgYmUuXG4gICogQHBhcmFtIHtvYmplY3R9IGFza0lkIC0gdGhlIGFzayBib3ggaWRlbnRpZmllciAodXNlZCB0byBtYW5hZ2UgZXZlbnRzKS5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCB0eXBlLCB0ZXh0KSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvKipcbiAgICAqIGFza0lucHV0IC0gZW5jYXBzdWxhdGUgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIGlucHV0IGZpZWxkIHVzZWQgdG8gY2FwdHVyZSB1c2VyIGlucHV0IHdpdGggYXNrKCkuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoZSBpbnB1dCBkb20gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFza0lucHV0KCkge1xuICAgICAgLyoqXG4gICAgICAqIHNlbmRBbnN3ZXIgLSBkaXNwYXRjaGVzIGFuIGV2ZW50IHdoZW4gdGhlIHVzZXIgaGFzIHN1Ym1pdHRlZCB0aGUgaW5wdXQuXG4gICAgICAqL1xuICAgICAgZnVuY3Rpb24gc2VuZEFuc3dlcih2YWx1ZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS5hc2suJHtzcHJpdGUuaWR9LiR7c3ByaXRlLmFza0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlLCBhc2tJZDogc3ByaXRlLmFza0lkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBzdWJtaXQuaW5uZXJIVE1MID0gJyYjeDI3MTMnO1xuICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIH0pO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoc3VibWl0KTtcblxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuaW5uZXJIVE1MID0gYCR7dGV4dH08YnIgLz5gO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcbiAgICBlbC5jbGFzc05hbWUgPSBgYmxvY2tsaWtlLSR7dHlwZX1gO1xuXG4gICAgbGV0IGllbCA9IG51bGw7XG4gICAgaWYgKHR5cGUgPT09ICdhc2snKSB7XG4gICAgICBpZWwgPSBhc2tJbnB1dChzcHJpdGUsIGVsKTtcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDExMCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuICAgIH1cblxuICAgIHNwcml0ZS5lbGVtZW50LmVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBzcHJpdGUuZWxlbWVudC5lbCk7XG4gICAgaWVsID8gaWVsLmZvY3VzKCkgOiBudWxsO1xuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlZCB0aGUgRE9NIGVsZW1lbnQgKG1vdmVzIHdpdGggc3ByaXRlKS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMik7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBpZiAoc3ByaXRlLnRleHR1aS50eXBlID09PSAnYXNrJykge1xuICAgICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gMTEwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG4gICAgfVxuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQgKGhpZGVzIGl0KS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgZGVsZXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXh0LXVpLWVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=