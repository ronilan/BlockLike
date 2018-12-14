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

    // CSS rules classes and the background color.
    // The costume color setting overrides any CSS setting.

    // There is no color property to current costume - so reset the background-color property of the element.
    !sprite.costume || !sprite.costume.color ? el.style.backgroundColor = '' : null;

    // apply CSS rules (may include background color)
    __WEBPACK_IMPORTED_MODULE_0__element_css__["a" /* apply */](sprite);

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
      color: null,
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__backdrop__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprite__ = __webpack_require__(14);
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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__stage_sensing__ = __webpack_require__(12);








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
    const actual = Object.assign({}, defaults, options);

    super(actual.pace);

    // backdrops
    this.backdrops = [];

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

    this.sprites = [];

    this.magnification = 100;

    this.cssRules = [];
    this.classes = [];

    this.mouseDown = null;
    this.mouseX = null;
    this.mouseY = null;

    actual.sensing ? Object(__WEBPACK_IMPORTED_MODULE_4__stage_sensing__["a" /* default */])(this) : null;

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
* countChar - count how many time a given character (or string) appears in another string.
* helper for evented skipping.
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
* removeStrings - Removes strings from a line of code.
* helper for evented skipping.
*
* @param {string} line - a line of code.
* @return {string} - the line without strings.
*/
function removeStrings(line) {
  return line.replace(/"(.*?)"|'(.*?)'|`(.*?)`/g, '');
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
  return (arr.some(method => str.indexOf(`.${method}(`) !== -1));
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
  return entity.waitedReturned.find(method => (item.indexOf(`.${method}(`) !== -1 ? method : false));
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
  return isPaced(item, entity) ? code : item;
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
  found = isWaited(item, entity);

  // not a normal "waited". look for waitedReturned.
  if (!found) {
    let theVar = null;

    found = whichWaitedReturn(item, entity);

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
  let regExp = /function |function\(|function( |\t)\(/;
  let matches = regExp.exec(item);

  // or arrow
  if (!matches) {
    regExp = /([a-zA-Z]\w*|\([a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\)) =>/;
    matches = regExp.exec(item);
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
    code = code.split('\n').filter(item => item.trim().length !== 0);

    // counter for open parentheses.
    let eventedOpenParen = 0;

    code = code.map((item) => {
      const temp = item;
      let result = temp;

      // internal evented methods are skipped
      if (isEvented(temp, entity) || eventedOpenParen) {
        eventedOpenParen += (countChar(removeStrings(temp), '(') - countChar(removeStrings(temp), ')'));
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
/* harmony export (immutable) */ __webpack_exports__["a"] = enable;
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
    e.key ? me.keysKey = me.keysKey.filter(item => item !== e.key.toLowerCase()) : null;
    e.code ? me.keysCode = me.keysCode.filter(item => item !== e.code.toLowerCase()) : null;
    me.keysKeyCode = me.keysKeyCode.filter(item => item !== e.keyCode);
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
/* 13 */
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
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__stage_surface__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__sprite_element__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__costume__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__text_ui_element__ = __webpack_require__(15);







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
class Sprite extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
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
    typeof options === 'object' ? actual = Object.assign({}, defaults, options) : actual = defaults;

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

      actual.costume = new __WEBPACK_IMPORTED_MODULE_3__costume__["a" /* default */](costumeOptions);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;



/***/ }),
/* 15 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGNiNTBmMTgwNDg4ODI3NmY1OTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQtY3NzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLXN1cmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3N0dW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvY3VtZW50LWNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmV3cml0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLXNlbnNpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tkcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtE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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFD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Q0E7O0FBRUE7QUFDQSxzQkFBc0IsS0FBSzs7QUFFM0I7QUFDQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUUsc0JBQXNCLCtFQUErRTs7QUFFckc7QUFDQSxnQ0FBZ0MsS0FBSzs7QUFFckM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdGQUFnRjtBQUN4Rzs7QUFFQTtBQUNBOztBQUVBLDZCQUE2Qix3Q0FBd0M7O0FBRXJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRSxzQkFBc0IsK0VBQStFOztBQUVyRztBQUNBLHdCQUF3QixnRkFBZ0Y7QUFDeEc7O0FBRUEsNkJBQTZCLHdDQUF3QztBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiJibG9ja2xpa2UtMC45LjExLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOGNiNTBmMTgwNDg4ODI3NmY1OTAiLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIG1hbmFnaW5nIGVsZW1lbnQgc3R5bGUgcHJvcGVydGllcyBmb3IgdGhlIGVudGl0aWVzLlxuKi9cblxuLyoqXG4qIGFwcGx5IC0gYXBwbHkgY3NzUnVsZXMgb2YgYW4gZW50aXR5IHRvIGl0cyBET00gZWxlbWVudC5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFwcGx5KGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG4gIGNvbnN0IGVsID0gZW50aXR5LmVsZW1lbnQuZWw7XG5cbiAgLy8gU3ByaXRlcyBoYXZlIENvc3R1bWVzLCBTdGFnZSBoYXMgQmFja2Ryb3AsIGZpZ3VyZSBvdXQgd2hpY2ggZW50aXR5IGl0IGlzLlxuICBlbnRpdHkuYmFja2Ryb3AgPyBjdXJFbnRpdHkubG9vayA9IGVudGl0eS5iYWNrZHJvcCA6IGN1ckVudGl0eS5sb29rID0gZW50aXR5LmNvc3R1bWU7XG4gIGVudGl0eS5iYWNrZHJvcHMgPyBjdXJFbnRpdHkubG9va3MgPSBlbnRpdHkuYmFja2Ryb3BzIDogY3VyRW50aXR5Lmxvb2tzID0gZW50aXR5LmNvc3R1bWVzO1xuXG4gIC8vIHJlbW92ZSBhbnkgc3R5bGUgYXBwbGllZCBieSBhbnkgbG9va1xuICBpZiAoY3VyRW50aXR5Lmxvb2tzKSB7XG4gICAgY3VyRW50aXR5Lmxvb2tzLmZvckVhY2goKGIpID0+IHtcbiAgICAgIGIuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjYW1lbENhc2VkID0gaXRlbS5wcm9wLnJlcGxhY2UoLy0oW2Etel0pL2csIGcgPT4gZ1sxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSAnJztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gYWRkIGN1cnJlbnQgbG9vayBzdHlsZXNcbiAgaWYgKGN1ckVudGl0eS5sb29rKSB7XG4gICAgY3VyRW50aXR5Lmxvb2suY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgY2FtZWxDYXNlZCA9IGl0ZW0ucHJvcC5yZXBsYWNlKC8tKFthLXpdKS9nLCBnID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9IGl0ZW0udmFsdWU7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBZGQgY3VyRW50aXR5IHN0eWxlcy4gTXVzdCBiZSBkb25lIGFmdGVyIGxvb2sgc3R5bGVzLlxuICBjdXJFbnRpdHkuY3NzUnVsZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgZyA9PiBnWzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgIGVsLnN0eWxlW2NhbWVsQ2FzZWRdID0gaXRlbS52YWx1ZTtcbiAgfSk7XG59XG5cbi8qKlxuKiByZWdpc3RlciAtIHJlZ2lzdGVyIGNzc1J1bGVzIG9mIGZvciBhbiBlbnRpdHkgYmFzZWQgb24gdXNlciBpbnB1dC5cbiogTm90ZTogQWxsIHJ1bGVzIGFyZSByZWdpc3RlcmVkIGRhc2gtY2FzZSBhLWxhIGNzcy5cbiogVGhpcyBpcyByZWdhcmRsZXNzIG9mIGhvdyB0aGV5IGFyZSBzZXQgYW5kIHRob3VnaCB0aGV5IGFyZSB1c2VkIGNhbWVsQ2FzZS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB0aGUgdmFsdWUgZm9yIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gI2ZmODgzMylcbiogQHBhcmFtIHtmdW5jdGlvbn0gZW50aXR5IC0gYSBTcHJpdGUgb3IgU3RhZ2UuXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHByb3AsIHZhbHVlLCBlbnRpdHkpIHtcbiAgY29uc3QgY3VyRW50aXR5ID0gZW50aXR5O1xuXG4gIGlmICh0eXBlb2YgcHJvcCA9PT0gJ3N0cmluZycgJiYgdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGRhc2hlZCA9IHByb3AucmVwbGFjZSgvKFtBLVpdKS9nLCAkMSA9PiBgLSR7JDEudG9Mb3dlckNhc2UoKX1gKTtcbiAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWUgfSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHByb3AgPT09ICdvYmplY3QnICYmICF2YWx1ZSkge1xuICAgIE9iamVjdC5rZXlzKHByb3ApLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgY29uc3QgZGFzaGVkID0ga2V5LnJlcGxhY2UoLyhbQS1aXSkvZywgJDEgPT4gYC0keyQxLnRvTG93ZXJDYXNlKCl9YCk7XG4gICAgICBjdXJFbnRpdHkuY3NzUnVsZXMucHVzaCh7IHByb3A6IGRhc2hlZCwgdmFsdWU6IHByb3Bba2V5XSB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZWxlbWVudC1jc3MuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHJld3JpdGUgZnJvbSAnLi9yZXdyaXRlcic7XG5pbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGFuIGVudGl0eS5cbiAqIEFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gRW50aXR5IGlzIGFic3RyYWN0IGZvciBTdGFnZSBhbmQgU3ByaXRlLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBhY2UgLSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBwYWNlIHBhY2VkIG1ldGhvZHMuXG4gICovXG4gIGNvbnN0cnVjdG9yKHBhY2UpIHtcbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycyA9IFtdO1xuICAgIHRoaXMuaWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICB0aGlzLnBhY2UgPSBwYWNlO1xuICAgIHRoaXMuc291bmRzID0gW107IC8vIHdpbGwgaG9sZCBhbGwgc291bmRzIGN1cnJlbnRseSBwbGF5ZWQgYnkgZW50aXR5LCBpZiBhbnkuXG4gICAgLypcbiAgICAqIFBhY2VkIG1ldGhvZHMgd29yayBpbiB0aGUgZm9sbG93aW5nIG1hbm5lcjpcbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciBwYWNlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgcGFjZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSB3aWxsIHJlc29sdmUgYWZ0ZXIge3BhY2V9IG1pbGxpc2Vjb25kcy5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgcGFjZWQgbWV0aG9kIHRvIGhhbHQgZXhlY3V0aW9uIG9mIGFueSBjb2RlIGZvbGxvd2luZyBpdCB1bnRpbCBpdCBpcyBkb25lLlxuICAgICovXG4gICAgdGhpcy5wYWNlZCA9IFtcbiAgICAgICdnb1RvJyxcbiAgICAgICdtb3ZlJyxcbiAgICAgICdjaGFuZ2VYJyxcbiAgICAgICdjaGFuZ2VZJyxcbiAgICAgICdzZXRYJyxcbiAgICAgICdzZXRZJyxcbiAgICAgICdnb1Rvd2FyZHMnLFxuICAgICAgJ3R1cm5SaWdodCcsXG4gICAgICAndHVybkxlZnQnLFxuICAgICAgJ3BvaW50SW5EaXJlY3Rpb24nLFxuICAgICAgJ3BvaW50VG93YXJkcycsXG4gICAgICAnY2hhbmdlU2l6ZScsXG4gICAgICAnc2V0U2l6ZScsXG4gICAgICAnc2F5JyxcbiAgICAgICd0aGluaycsXG4gICAgICAncmVmcmVzaCcsXG4gICAgXTtcblxuICAgIC8qXG4gICAgKiBXYWl0ZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZyBhIHRyaWdnZXJpbmdJZCBwYXJhbWV0ZXIuXG4gICAgKiA0LiBUaGUgZXZlbnQgbGlzdGVuZXIgaXMgdW5pcXVlIHRvIHRoZSB0cmlnZ2VyaW5nSWQuXG4gICAgKiA1LiBXaGVuIHRoZSBtZXRob2QgY29tcGxldGVzIHJ1bm5pbmcgYW4gZXZlbnQgaXMgZGlzcGF0Y2hlZCByZXNvbHZpbmcgdGhlIHByb21pc2UuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZCA9IFtcbiAgICAgICd3YWl0JyxcbiAgICAgICdnbGlkZScsXG4gICAgICAnc2F5V2FpdCcsXG4gICAgICAndGhpbmtXYWl0JyxcbiAgICAgICdwbGF5U291bmRVbnRpbERvbmUnLFxuICAgICAgJ2Jyb2FkY2FzdE1lc3NhZ2VXYWl0JyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIHdhaXRlZFJldHVucmVkIG1ldGhvZHMgd29yayBzaW1pbGFybHkgdG8gd2FpdGVkIG1ldGhvZHMgb25seSB0aGF0IHRoZXkgZW5hYmxlIGNhcHR1cmluZyBhIHZhbHVlXG4gICAgKiBpbnRvIGEgZ2xvYmFsbHkgZGVjbGFyZWQgdmFyaWFibGUgKG9yIGFuIHVuZGVjbGFyZWQgb25lKS5cbiAgICAqIDEuIEV2ZW50IE1ldGhvZCBmdW5jdGlvbnMgYXJlIHJld3JpdHRlbi5cbiAgICAqIDIuIEZvciB3YWl0ZWRSZXR1cm5lZCBtZXRob2RzIHJld3JpdGVyIHdpbGwgYWRkIGFuIGF3YWl0IHRvIGEgcHJvbWlzZSBhZnRlciB0aGUgd2FpdGVkIG1ldGhvZCBjYWxsLlxuICAgICogMy4gVGhlIHByb21pc2UgaW5jbHVkZXMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lci5cbiAgICAqIDQuIHJld3JpdGVyIG1vZGlmaWVzIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwsIGluc2VydGluZzpcbiAgICAqICAgLSB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgaW50byB3aGljaCBhIHZhbHVlIGlzIHJldHVybmVkLlxuICAgICogICAtIGEgdHJpZ2dlcmluZ0lkIHBhcmFtZXRlci5cbiAgICAqIDQuIFRoZSBldmVudCBsaXN0ZW5lciBpcyB1bmlxdWUgdG8gdGhlIHRyaWdnZXJpbmdJZC5cbiAgICAqIDUuIFdoZW4gdGhlIG1ldGhvZCBjb21wbGV0ZXMgcnVubmluZyBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHJlc29sdmluZyB0aGUgcHJvbWlzZS5cbiAgICAqIDYuIFRoZSB2YWx1ZSByZXR1cm5lZCBpcyB0cmFuc2ZlcmVkIGludG8gdGhlIHZhcmlhYmxlIHVzaW5nIGV2YWwuXG4gICAgKlxuICAgICogVGhpcyBhbGxvd3MgdGhlIHdhaXRlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKiBBdCB3aGljaCBwb2ludCB0aGUgdmFyaWFibGUgaGFzIFwiY2FwdHVyZWRcIiB0aGUgdmFsdWUuXG4gICAgKi9cbiAgICB0aGlzLndhaXRlZFJldHVybmVkID0gW1xuICAgICAgJ2ludm9rZScsXG4gICAgICAnYXNrJyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIEV2ZW50IG1ldGhvZHMgKGV2ZW50ZWQpIGFyZSBjb250YWluZXJzIGZvciBmdW5jdGlvbnMgdG8gYmUgcmV3cml0dGVuLlxuICAgICogV2hlbiBhbiBldmVudCBtZXRob2QgaXMgbmVzdGVkIGluc2lkZSBhbm90aGVyIHRoZSBjb2RlIG9mIHRoZSBpbm5lciBtZXRob2QgaXMgTk9UIHJld3JpdHRlbi5cbiAgICAqL1xuICAgIHRoaXMuZXZlbnRlZCA9IFtcbiAgICAgICd3aGVuRmxhZycsXG4gICAgICAnd2hlbkxvYWRlZCcsXG4gICAgICAnd2hlbkNsaWNrZWQnLFxuICAgICAgJ3doZW5LZXlQcmVzc2VkJyxcbiAgICAgICd3aGVuRXZlbnQnLFxuICAgICAgJ3doZW5SZWNlaXZlTWVzc2FnZScsXG4gICAgICAnd2hlbkNsb25lZCcsXG4gICAgXTtcbiAgfVxuXG4gIC8qKlxuICAqIF9nZW5lcmF0ZVVVSUQgLSBnZW5lcmF0ZXMgYSB1bmlxdWUgSUQuXG4gICogU291cmNlOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwNTAzNC9jcmVhdGUtZ3VpZC11dWlkLWluLWphdmFzY3JpcHRcbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHJldHVybiB7c3RyaW5nfSAtIGEgdW5pcXVlIGlkLlxuICAqL1xuICBfZ2VuZXJhdGVVVUlEKCkge1xuICAgIGxldCBkO1xuICAgIGxldCByO1xuXG4gICAgZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgaWYgKHdpbmRvdy5wZXJmb3JtYW5jZSAmJiB0eXBlb2Ygd2luZG93LnBlcmZvcm1hbmNlLm5vdyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZCArPSB3aW5kb3cucGVyZm9ybWFuY2Uubm93KCk7IC8vIHVzZSBoaWdoLXByZWNpc2lvbiB0aW1lciBpZiBhdmFpbGFibGVcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gJ3h4eHh4eHh4LXh4eHgtNHh4eC15eHh4LXh4eHh4eHh4eHh4eCcucmVwbGFjZSgvW3h5XS9nLCAoYykgPT4ge1xuICAgICAgciA9IChkICsgTWF0aC5yYW5kb20oKSAqIDE2KSAlIDE2IHwgMDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICAgIGQgPSBNYXRoLmZsb29yKGQgLyAxNik7XG4gICAgICByZXR1cm4gKGMgPT09ICd4JyA/IHIgOiAociAmIDB4MyB8IDB4OCkpLnRvU3RyaW5nKDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1taXhlZC1vcGVyYXRvcnMsIG5vLWJpdHdpc2VcbiAgICB9KTtcblxuICAgIHJldHVybiB1dWlkO1xuICB9XG5cbiAgLyoqXG4gICogX3JlbGVhc2VXYWl0ZWQgLSByZWxlYXNlcyBhIHdhaXRlZCBwcm9taXNlIGJ5IGRpc3BhdGNoaW5nIGFuIGV2ZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge3N0cmluZ30gdHJpZ2dlcmluZ0lkIC0gdGhlIG5hbWUgb2YgdGhlIGV2ZW50IHRoYXQgaW52b2tlZCB0aGUgY29kZSB0aGF0IHJlcXVlc3RlZCB0aGUgd2FpdC5cbiAgKi9cbiAgX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKSB7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2Uud2FpdGVkLiR7dHJpZ2dlcmluZ0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlOiAwIH0gfSk7XG4gICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICAvKipcbiAgKiBfc2V0VG9WYXIgLSBzZXRzIGEgZ2xvYmFsbHkgc2NvcGVkIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB3aG8ncyBuYW1lIGlzIHNwZWNpZmllZCBhcyBhIGEgc3RyaW5nXG4gICogd2l0aCB0aGUgdmFsdWUgcHJvdmlkZWQuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7dmFyU3RyaW5nfSB0ZXh0IC0gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIHRvIHdoaWNoIHZhbHVlIHNob3VsZCBiZSBzZXQuXG4gICogQHBhcmFtIHthbnl9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHNldC5cbiAgKi9cbiAgX3NldFRvVmFyKHZhclN0cmluZywgdmFsdWUpIHtcbiAgICB0cnkge1xuICAgICAgZXZhbChgJHt2YXJTdHJpbmd9ID0gJyR7dmFsdWV9J2ApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhyb3cgKCdCbG9ja0xpa2UuanMgRXJyb3I6IFZhcmlhYmxlcyBhY2NlcHRpbmcgYSB2YWx1ZSBtdXN0IGJlIGRlY2xhcmVkIGluIHRoZSBnbG9iYWwgc2NvcGUuJyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdGhyb3ctbGl0ZXJhbFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIF9leGVjIC0gYXN5bmNocm9ub3VzIGZ1bmN0aW9uIGV4ZWN1dGlvbi5cbiAgKiBUaGlzIGlzIHdoYXQgY3JlYXRlcyB0aGUgXCJwYWNlZFwiIGV4ZWN1dGlvbiBvZiB0aGUgdXNlciBzdXBwbGllZCBmdW5jdGlvbnMuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICogQHBhcmFtIHthcnJheX0gYXJnc0FyciAtIGFuIGFycmF5IG9mIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBmdW5jdGlvbi5cbiAgKi9cbiAgX2V4ZWMoZnVuYywgYXJnc0Fycikge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBtZS50cmlnZ2VyaW5nSWQgPSB0aGlzLl9nZW5lcmF0ZVVVSUQoKTtcbiAgICBjb25zdCBmID0gcmV3cml0ZShmdW5jLCBtZSk7XG4gICAgcmV0dXJuIGYuYXBwbHkobWUsIGFyZ3NBcnIpO1xuICB9XG5cbiAgLyoqXG4gICogaW52b2tlIC0gaW52b2tlIGEgZnVuY3Rpb24uIEFsbG93cyBwYXNzaW5nIGFuIGFyZ3VtZW50IG9yIGFycmF5IG9mIGFyZ3VtZW50cy5cbiAgKiBGdW5jdGlvbiB3aWxsIGJlIFwicGFjZWRcIiBhbmQgY29kZSBleGVjdXRpb24gd2lsbCBiZSBcIndhaXRlZFwiIHVudGlsIGl0IGlzIGNvbXBsZXRlZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5GbGFnKCgpID0+IHtcbiAgKiAgIHRoaXMuaW52b2tlKGp1bXApO1xuICAqICAgdGhpcy5pbnZva2UodGFsaywgJ2hpJyk7XG4gICogICB0aGlzLmludm9rZShwYXR0ZXJuLCBbNSwgNTAsIDEyXSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NBcnIgLSBhbiBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24uIEEgc2luZ2xlIHZhcmlhYmxlIGFsc28gYWNjZXB0ZWQuXG4gICovXG4gIGludm9rZShmdW5jLCBhcmdzQXJyLCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdGhlVmFyIGFuZCB0cmlnZ2VyaW5nSWQgYXJlIG5vdCB1c2VyIHN1cHBsaWVkLCB0aGV5IGFyZSBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBsZXQgYXJncyA9IGFyZ3NBcnI7XG4gICAgIShhcmdzQXJyIGluc3RhbmNlb2YgQXJyYXkpID8gYXJncyA9IFthcmdzQXJyXSA6IG51bGw7XG5cbiAgICB0aGlzLl9leGVjKGZ1bmMsIGFyZ3MpLnRoZW4oKHJlc3VsdCkgPT4ge1xuICAgICAgLy8gdGhpcyBpcyB0aGUgd2FpdGVkIG1ldGhvZCBsaXN0ZW5lci4gcmVsZWFzZSBpdC5cbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgIHRoZVZhciA/IHRoaXMuX3NldFRvVmFyKHRoZVZhciwgcmVzdWx0KSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiB3YWl0IC0gY3JlYXRlcyBhIHBhdXNlIGluIGV4ZWN1dGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogdGhpcy53YWl0KDUpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgdGltZSA9IDU7XG4gICogdGhpcy53YWl0KHRpbWUgKiAwLjk1KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LiBNdXN0IGJlIGFuIGFjdHVhbCBudW1iZXIuXG4gICovXG4gIHdhaXQoc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgfVxuICAvKiogRXZlbnRzICogKi9cblxuICAvKipcbiAgKiB3aGVuTG9hZGVkIC0gaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICogVG8gYmUgdXNlZCB3aXRoIGNvZGUgdGhhdCBuZWVkcyB0byBydW4gb25sb2FkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuTG9hZGVkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdJIGFtIGFsaXZlJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuTG9hZGVkKGZ1bmMpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuX2V4ZWMoZnVuYywgW10pO1xuICAgIH0sIDApO1xuICB9XG5cbiAgLyoqXG4gICogd2hlbkZsYWcgLSBhZGRzIGEgZmxhZyB0byBjb3ZlciB0aGUgc3RhZ2Ugd2l0aCBhbiBldmVudCBsaXN0ZW5lciBhdHRhY2hlZC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIHJlbW92ZSB0aGUgZmxhZyBkaXYgYW5kIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuRmxhZyggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkZsYWcoZnVuYykge1xuICAgIGNvbnN0IG1lID0gdGhpcztcblxuICAgIGlmIChtZS5lbGVtZW50KSB7XG4gICAgICBtZS5lbGVtZW50LmFkZEZsYWcodGhpcyk7XG5cbiAgICAgIHRoaXMuZWxlbWVudC5mbGFnLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgbWUuZWxlbWVudC5yZW1vdmVGbGFnKG1lKTtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5DbGlja2VkIC0gYWRkcyBhIGNsaWNrIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBzcHJpdGUgb3Igc3RhZ2UuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5DbGlja2VkKGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5LZXlQcmVzc2VkIC0gYWRkcyBhIGtleXByZXNzIGV2ZW50IGxpc3RlbmVyIHRvIGRvY3VtZW50LlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5LZXlQcmVzc2VkKCcgJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnU3BhY2VwcmVzc2VkJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXNlcktleSAtIHRoZSBrZXkgcHJlc3NlZC4gbWF5IGJlIHRoZSBjb2RlIG9yIHRoZSBjaGFyYWN0ZXIgaXRzZWxmIChBIG9yIDY1KVxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5LZXlQcmVzc2VkKHVzZXJLZXksIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgbGV0IGNoZWNrO1xuICAgIHR5cGVvZiB1c2VyS2V5ID09PSAnc3RyaW5nJyA/IGNoZWNrID0gdXNlcktleS50b0xvd2VyQ2FzZSgpIDogY2hlY2sgPSB1c2VyS2V5O1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICBsZXQgbWF0Y2ggPSBmYWxzZTtcbiAgICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAgIC8vIE5vdGU6IHVzZXIgbWF5IHdyaXRlIGluY29tcGF0aWJsZSBjb2RlLlxuICAgICAgZS5jb2RlICYmIGUuY29kZS50b0xvd2VyQ2FzZSgpID09PSBjaGVjayA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgICBlLmtleSAmJiBlLmtleS50b0xvd2VyQ2FzZSgpID09PSBjaGVjayA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgICBlLmtleUNvZGUgPT09IGNoZWNrID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBtZS5fZXhlYyhmdW5jLCBbZV0pO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiB3aGVuRXZlbnQgLSBhZGRzIHRoZSBzcGVjaWZpZWQgZXZlbnQgbGlzdGVuZXIgdG8gc3ByaXRlL3N0YWdlLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5FdmVudCgnbW91c2VvdmVyJywgKGUpID0+IHtcbiAgKiAgIGNvbnNvbGUubG9nKGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50U3RyIC0gdGhlIG5hbWVkIGV2ZW50IChtb3NlbW92ZSBldGMuKS5cbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuRXZlbnQoZXZlbnRTdHIsIGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgbGV0IGF0dGFjaFRvID0gdGhpcy5lbGVtZW50LmVsO1xuICAgICAgbGV0IG9wdGlvbnMgPSB7fTtcbiAgICAgICdrZXlkb3dufGtleXVwfGtleXByZXNzJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBhdHRhY2hUbyA9IGRvY3VtZW50IDogbnVsbDtcbiAgICAgICd0b3VjaHN0YXJ0fHRvdWNobW92ZScuaW5kZXhPZihldmVudFN0cikgIT09IC0xID8gb3B0aW9ucyA9IHsgcGFzc2l2ZTogdHJ1ZSB9IDogbnVsbDtcblxuICAgICAgYXR0YWNoVG8uYWRkRXZlbnRMaXN0ZW5lcihldmVudFN0ciwgKGUpID0+IHtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0sIG9wdGlvbnMpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5SZWNlaXZlTWVzc2FnZSAtIGFkZHMgdGhlIHNwZWNpZmllZCBldmVudCBsaXN0ZW5lciB0byBkb2N1bWVudC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuUmVjZWl2ZU1lc3NhZ2UoJ21vdmUnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgtMTApO1xuICAqIH0pXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KTtcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuUmVjZWl2ZU1lc3NhZ2UobXNnLCBmdW5jKSB7XG4gICAgY29uc3QgbGlzdGVuZXJJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIC8vIHJlZ2lzdGVyIGFzIGEgbWVzc2FnZSBsaXN0ZW5lci5cbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVySWQpO1xuXG4gICAgLy8gbGlzdGVuIHRvIHNwZWNpZmllZCBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtc2csIChlKSA9PiB7XG4gICAgICAvLyBleGVjdXRlIHRoZSBmdW5jIGFuZCB0aGVuXG4gICAgICB0aGlzLl9leGVjKGZ1bmMsIFtlXSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGRpc3BhdGNoIGFuIGV2ZW50IHRoYXQgaXMgdW5pcXVlIHRvIHRoZSBsaXN0ZW5lciBhbmQgbWVzc2FnZSByZWNlaXZlZC5cbiAgICAgICAgY29uc3QgbXNnSWQgPSBlLmRldGFpbC5tc2dJZDtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIHsgZGV0YWlsOiB7IG1zZ0lkLCBsaXN0ZW5lcklkIH0gfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIGJyb2FkY2FzdE1lc3NhZ2UgLSBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50IHRoYXQgYWN0cyBhcyBhIGdsb2JhbCBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZChmdW5jdGlvbigpIHtcbiAgKiAgc3RhZ2UuYnJvYWRjYXN0TWVzc2FnZSgnbW92ZScpXG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KVxuICAqL1xuICBicm9hZGNhc3RNZXNzYWdlKG1zZykge1xuICAgIGNvbnN0IG1zZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KG1zZywgeyBkZXRhaWw6IHsgbXNnSWQgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAqIGJyb2FkY2FzdE1lc3NhZ2VXYWl0IC0gZGlzcGF0Y2hlcyBhIGN1c3RvbSBldmVudCB0aGF0IGFjdHMgYXMgYSBnbG9iYWwgbWVzc2FnZS5cbiAgKiBXYWl0cyBmb3IgYWxsIHdoZW5SZWNlaXZlTWVzc2FnZSBsaXN0ZW5lcnMgdG8gY29tcGxldGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzcHJpdGUud2hlblJlY2VpdmVNZXNzYWdlKCdtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoLTEwKTtcbiAgKiAgIHRoaXMud2FpdCg1KTtcbiAgKiB9KVxuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoZnVuY3Rpb24oKSB7XG4gICogIHN0YWdlLmJyb2FkY2FzdE1lc3NhZ2VXYWl0KCdtb3ZlJyk7XG4gICogIHNwcml0ZS5zYXkoJ0FsbCBkb25lJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KVxuICAqL1xuICBicm9hZGNhc3RNZXNzYWdlV2FpdChtc2csIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0cmlnZ2VyaW5nSWQgaXMgbm90IHVzZXIgc3VwcGxpZWQsIGl0IGlzIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBjb25zdCBtc2dJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIC8vIHNhdmUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMgZm9yIHRoaXMgYnJvYWRjYXN0LlxuICAgIGxldCBteUxpc3RlbmVycyA9IEVudGl0eS5tZXNzYWdlTGlzdGVuZXJzO1xuICAgIC8vIGRpc3BhdGNoIHRoZSBtZXNzYWdlXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KG1zZywgeyBkZXRhaWw6IHsgbXNnSWQgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgIC8vIGxpc3RlbiB0byB0aG9zZSB3aG8gcmVjZWl2ZWQgdGhlIG1lc3NhZ2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIGZ1bmN0aW9uIGJyb2FkY2FzdE1lc3NhZ2VXYWl0TGlzdGVuZXIoZSkge1xuICAgICAgLy8gaWYgZXZlbnQgaXMgZm9yIHRoaXMgbWVzc2FnZSByZW1vdmUgbGlzdGVuZXJJZCBmcm9tIGxpc3Qgb2YgbGlzdGVuZXJzLlxuICAgICAgKGUuZGV0YWlsLm1zZ0lkID09PSBtc2dJZCkgPyBteUxpc3RlbmVycyA9IG15TGlzdGVuZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUuZGV0YWlsLmxpc3RlbmVySWQpIDogbnVsbDtcbiAgICAgIC8vIGFsbCBsaXN0ZW5lcnMgcmVzcG9uZGVkLlxuICAgICAgaWYgKCFteUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIGJyb2FkY2FzdE1lc3NhZ2VXYWl0TGlzdGVuZXIpO1xuICAgICAgICAvLyByZWxlYXNlIHRoZSB3YWl0XG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU291bmQgKiAqL1xuXG4gIC8qKlxuICAqIHBsYXlTb3VuZCAtIHBsYXlzIGEgc291bmQgZmlsZSAobXAzLCB3YXYpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmQodXJsKSB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBhdWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBwbGF5U291bmRMb29wIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdikgYWdhaW4gYW5kIGFnYWluXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kTG9vcCgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kTG9vcCh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBwbGF5U291bmRVbnRpbERvbmUgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KSB1bnRpbCBkb25lLlxuICAqIFRoaXMgaXMgc2ltaWxhciB0byBwbGF5U291bmQgYW5kIHdhaXQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgc291bmQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kVW50aWxEb25lKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmRVbnRpbERvbmUodXJsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNvdW5kcyA9IHRoaXMuc291bmRzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGF1ZGlvKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHN0b3BTb3VuZHMgLSBzdG9wcyBhbGwgc291bmRzIHBsYXllZCBieSBzcHJpdGUgb3Igc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBzdGFnZS53aGVuS2V5UHJlc3NlZCgnRXNjYXBlJywgKCkgPT4ge1xuICAqICAgdGhpcy5zdG9wU291bmRzKCk7XG4gICogfSk7XG4gICovXG4gIHN0b3BTb3VuZHMoKSB7XG4gICAgdGhpcy5zb3VuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5wYXVzZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc291bmRzID0gW107XG4gIH1cblxuICAvKiBjc3MgKi9cblxuICAvKipcbiAgKiBjc3MgLSBhcHBsaWVzIGEgQ1NTIHJ1bGUgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5jc3MoJ2JhY2tncm91bmQnLCAnIzAwMDBmZicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MobmFtZSkge1xuICAgICF0aGlzLmhhc0NsYXNzKG5hbWUpID8gdGhpcy5jbGFzc2VzLnB1c2gobmFtZSkgOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ2xhc3MgLSByZW1vdmVzIGEgY3NzIGNsYXNzIGZyb20gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqIHNwcml0ZS5yZW1vdmVDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG5hbWUpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmhhc0NsYXNzKCdyYWluYm93JykgPyB0aGlzLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiB0aGlzLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBjc3MgY2xhc3MgbmFtZSBvbiB0aGUgbGlzdC5cbiAgKi9cbiAgaGFzQ2xhc3MobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzZXMuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2VudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgc3RhZ2Ugc3VyZmFjZSBvbiB3aGljaCBzcHJpdGVzIGRyYXcuXG4gKiBFYWNoIFN0YWdlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZVN1cmZhY2Uge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSBvbiB3aGljaCB0aGUgc3ByaXRlIGlzIGRyYXdpbmcuXG4gICovXG4gIGNvbnN0cnVjdG9yKHN0YWdlKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gc3RhZ2UuZWxlbWVudC5jb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICogZHJhdyAtIGRyYXdzIGEgbGluZSBcImJlaGluZFwiIGEgbW92aW5nIHNwcml0ZS5cbiAgKiBOb3RlOiBzcHJpdGUgYWx3YXlzIGhhcyBjdXJyZW50IGFuZCBwcmV2aW91cyB4LHkgdmFsdWVzIHRvIGFsbG93IGRyYXdpbmcgdG8gcHJldmlvdXMgbG9jYXRpb24uXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSBkcmF3aW5nIHRoZSBsaW5lLlxuICAqL1xuICBkcmF3KHNwcml0ZSkge1xuICAgIGlmIChzcHJpdGUuZHJhd2luZykge1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHNwcml0ZS54LCAoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyAoc3ByaXRlLnkgKiAtMSkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHNwcml0ZS5wcmV2WCwgKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgKHNwcml0ZS5wcmV2WSAqIC0xKSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gc3ByaXRlLnBlblNpemU7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzcHJpdGUucGVuQ29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogY2xlYXIgLSBjbGVhcnMgdGhlIGNhbnZhc1xuICAqL1xuICBjbGVhcihzcHJpdGUpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHNwcml0ZS5zdGFnZVdpZHRoLCBzcHJpdGUuc3RhZ2VIZWlnaHQpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS1zdXJmYWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnQgb2YgdGhlIHNwcml0ZS5cbiAqIEVhY2ggU3ByaXRlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIEVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSBmb3Igd2hpY2ggdGhlIGVsZW1lbnQgaXMgY3JlYXRlZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdG8gd2hpY2ggdGhlIHNwcml0ZSBpcyBhZGRlZC5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCBzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbC5pZCA9IGAke3Nwcml0ZS5pZH1gO1xuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBlbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdtYW5pcHVsYXRpb24nO1xuXG4gICAgc3RhZ2UuZWxlbWVudC5lbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC4gVGhpcyBpcyBhbHdheXMgY2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3Rvci5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZWw7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICAvLyBDb3N0dW1lXG4gICAgaWYgKHNwcml0ZS5jb3N0dW1lKSB7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IGAke3Nwcml0ZS5jb3N0dW1lLnZpc2libGVXaWR0aH1weGA7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlSGVpZ2h0fXB4YDtcbiAgICB9XG5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4fXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5fXB4YDtcbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcblxuICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBgJHsoc3ByaXRlLnNob3dpbmcgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9YDtcblxuICAgIC8vIExlZnQgb3IgcmlnaHQgcm90YXRpb25cbiAgICAvLyBEaXJlY3Rpb24gZGl2aWRlZCBieSAxODAgYW5kIGZsb29yZWQgLT4gMSBvciAyLlxuICAgIC8vIFN1YnRyYWN0IDEgLT4gMCBvciAxLlxuICAgIC8vIE11bHRpcGx5IGJ5IC0xIC0+IDAgb3IgLTEuXG4gICAgLy8gQ3NzIHRyYW5zZm9ybSAtPiBOb25lIG9yIGZ1bGwgWC5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMSA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHsoKE1hdGguZmxvb3Ioc3ByaXRlLmRpcmVjdGlvbiAvIDE4MCkgKiAyKSAtIDEpICogLTF9KWAgOiBudWxsO1xuXG4gICAgLy8gRnVsbCByb3RhdGlvblxuICAgIC8vIFNwcml0ZSBcIm5ldXRyYWwgcG9zaXRpb25cIiBpcyA5MC4gQ1NTIGlzIDAuIFN1YnRyYWN0IDkwLlxuICAgIC8vIE5vcm1hbGl6ZSB0byAzNjAuXG4gICAgLy8gQ3NzIHJvdGF0ZSAtPiBOdW1iZXIgb2YgZGVncmVlcy5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMCA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHsoKHNwcml0ZS5kaXJlY3Rpb24gLSA5MCkgKyAzNjApICUgMzYwfWRlZylgIDogbnVsbDtcblxuICAgIC8vIENTUyBydWxlcyBjbGFzc2VzIGFuZCB0aGUgYmFja2dyb3VuZCBjb2xvci5cbiAgICAvLyBUaGUgY29zdHVtZSBjb2xvciBzZXR0aW5nIG92ZXJyaWRlcyBhbnkgQ1NTIHNldHRpbmcuXG5cbiAgICAvLyBUaGVyZSBpcyBubyBjb2xvciBwcm9wZXJ0eSB0byBjdXJyZW50IGNvc3R1bWUgLSBzbyByZXNldCB0aGUgYmFja2dyb3VuZC1jb2xvciBwcm9wZXJ0eSBvZiB0aGUgZWxlbWVudC5cbiAgICAhc3ByaXRlLmNvc3R1bWUgfHwgIXNwcml0ZS5jb3N0dW1lLmNvbG9yID8gZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJycgOiBudWxsO1xuXG4gICAgLy8gYXBwbHkgQ1NTIHJ1bGVzIChtYXkgaW5jbHVkZSBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgIGNzcy5hcHBseShzcHJpdGUpO1xuXG4gICAgLy8gYXBwbHkgQ1NTIGNsYXNzZXNcbiAgICBzcHJpdGUuY29zdHVtZSA/IGVsLmNsYXNzTmFtZSA9IHNwcml0ZS5jb3N0dW1lLmNsYXNzZXMuY29uY2F0KHNwcml0ZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzcHJpdGUuY2xhc3Nlcy5qb2luKCcgJyk7XG5cbiAgICAvLyBUaGVyZSBpcyBhIGNvbG9yIHByb3BlcnR5IHRvIGN1cnJlbnQgY29zdHVtZSAtIHNvIGFwcGx5IGl0IGFuZCBvdmVycmlkZSBDU1MgcnVsZXMuXG4gICAgc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzcHJpdGUuY29zdHVtZS5jb2xvciA6IG51bGw7XG5cbiAgICAvLyBJbWFnZS5cbiAgICBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgZWwuZmlyc3RDaGlsZCkgeyAvLyBoYXMgaW1hZ2UgZnJvbSBwcmV2aW91cyBjb3N0dW1lXG4gICAgICBpZiAoIXNwcml0ZS5jb3N0dW1lLmltYWdlKSB7IC8vIG5lZWRzIHJlbW92ZWQgYXMgdGhlcmUgaXMgbm8gaW1hZ2UgaW4gY3VycmVudCBjb3N0dW1lLlxuICAgICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUuaW1hZ2UgIT09IHRoaXMuZWwuZmlyc3RDaGlsZC5zcmMpIHsgLy8gbmVlZHMgcmVwbGFjZWRcbiAgICAgICAgdGhpcy5lbC5maXJzdENoaWxkLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuaW1hZ2UpIHsgLy8gbmVlZHMgYW4gaW1hZ2UgaW5zZXJ0ZWQuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblxuICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBpbWFnZS5zcmMgPSBzcHJpdGUuY29zdHVtZS5pbWFnZTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB9XG5cbiAgICBlbC5maXJzdENoaWxkID8gZWwuZmlyc3RDaGlsZC5kcmFnZ2FibGUgPSBmYWxzZSA6IG51bGw7XG5cbiAgICAvLyBJbm5lci4gTXVzdCBieSBkb25lIGFmdGVyIHRoZSBpbWFnZVxuICAgIHNwcml0ZS5jb3N0dW1lICYmIHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA/IGVsLmlubmVySFRNTCA9IHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA6IG51bGw7XG5cbiAgICAvLyBUZXh0IFVJIGdvZXMgd2hlcmUgc3ByaXRlIGdvZXMuXG4gICAgc3ByaXRlLnRleHR1aSA/IHNwcml0ZS50ZXh0dWkudXBkYXRlKHNwcml0ZSkgOiBudWxsO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBkZWxldGUuXG4gICovXG4gIGRlbGV0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gMTAwMDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb29rLlxuICogQWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb2sge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIExvb2sgaXMgYWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGNzcyAtIGFwcGxpZXMgYSBDU1MgcnVsZSB0byBhIENvc3R1bWUgb3IgQmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmNzcygnZm9udC1zaXplJywgJzE2cHgnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKVxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gYWRkLlxuICAqL1xuICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgIXRoaXMuaGFzQ2xhc3MobmFtZSkgPyB0aGlzLmNsYXNzZXMucHVzaChuYW1lKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDbGFzcyAtIHJlbW92ZXMgYSBjc3MgY2xhc3MgZnJvbSB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGNvc3R1bWUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmhhc0NsYXNzKCdyYWluYm93JykgPyBjb3N0dW1lLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmhhc0NsYXNzKCdyYWluYm93JykgPyBiYWNrZHJvcC5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbG9vay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTG9vayBmcm9tICcuL2xvb2snO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIENvc3R1bWUuXG4gKiBDb3N0dW1lcyBjYW4gYmUgYWRkZWQgdG8gYSBTcHJpdGUuXG4gKiBAZXh0ZW5kcyBMb29rXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAqICAgd2lkdGg6IDUwLFxuICogICBoZWlnaHQ6IDUwLFxuICogICBjb2xvcjogJyNBMkRBRkYnLFxuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvc3R1bWUgZXh0ZW5kcyBMb29rIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgQ29zdHVtZSB0byBiZSB1c2VkIGJ5IFNwcml0ZSBvYmplY3RzLi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGNvc3R1bWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGggLSB0aGUgY29zdHVtZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIHRoZSBjb3N0dW1lIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgY29sb3I6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IGFjdHVhbC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG4gICAgdGhpcy52aXNpYmxlV2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy52aXNpYmxlSGVpZ2h0ID0gYWN0dWFsLmhlaWdodDtcblxuICAgIHRoaXMuaW1hZ2UgPSBhY3R1YWwuaW1hZ2U7XG4gICAgdGhpcy5jb2xvciA9IGFjdHVhbC5jb2xvcjtcblxuICAgIC8vIHByZWxvYWRcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgIH1cblxuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBjb3N0dW1lIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gYWRkIHRoZSBjb3N0dW1lIHRvby5cbiAgKi9cbiAgYWRkVG8oc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuICAgIHNwcml0ZS5jb3N0dW1lcy5wdXNoKHRoaXMpO1xuXG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmUuXG4gICAgaWYgKCFzcHJpdGUuY29zdHVtZSkge1xuICAgICAgY3VyU3ByaXRlLmNvc3R1bWUgPSBzcHJpdGUuY29zdHVtZXNbMF07XG4gICAgICBjdXJTcHJpdGUud2lkdGggPSBzcHJpdGUuY29zdHVtZS52aXNpYmxlV2lkdGg7XG4gICAgICBjdXJTcHJpdGUuaGVpZ2h0ID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICBzcHJpdGUuZWxlbWVudCA/IHNwcml0ZS5lbGVtZW50LnVwZGF0ZShzcHJpdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZyb20gLSBSZW1vdmVzIHRoZSBjb3N0dW1lIGZyb20gdG8gdGhlIHNwcml0ZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRUbyhzcHJpdGUpO1xuICAqIGNvc3R1bWUucmVtb3ZlRnJvbShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHdoaWNoIHNwcml0ZSB0byByZW1vdmUgdGhlIGNvc3R1bWUgZnJvbS5cbiAgKi9cbiAgcmVtb3ZlRnJvbShzcHJpdGUpIHtcbiAgICBzcHJpdGUucmVtb3ZlQ29zdHVtZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBMb29rcyAqICovXG5cbiAgLyoqXG4gICogcmVzaXplVG9JbWFnZSAtIHNldHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNvc3R1bWUgdG8gdGhhdCBvZiB0aGUgaW1hZ2UgZmlsZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICAqICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZDMvU2hlZXBfaW5fZ3JheS5zdmcnXG4gICogfSk7XG4gICpcbiAgKiBjb3N0dW1lLnJlc2l6ZVRvSW1hZ2UoKTtcbiAgKi9cbiAgcmVzaXplVG9JbWFnZSgpIHtcbiAgICAvLyByZWdpc3RlciB0aGUgaW1hZ2Ugc2l6ZSBmcm9tIHRoZSBmaWxlXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuXG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBtZS53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBtZS5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIG1lLnZpc2libGVXaWR0aCA9IG1lLndpZHRoO1xuICAgICAgICBtZS52aXNpYmxlSGVpZ2h0ID0gbWUuaGVpZ2h0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogaW5uZXIgLSBpbnNlcnRzIGh0bWwgaW50byB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogY29zdHVtZS5pbm5lcignSSBsaWtlIHRleHQgb25seScpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGh0bWwgLSB0aGUgaHRtbCB0byBpbnNlcnQuXG4gICovXG4gIGlubmVyKGh0bWwpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IGh0bWw7XG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBwbGFjZXMgYSBkb20gZWxlbWVudCBpbnNpZGUgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaW5zZXJ0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1odG1sLWNyZWF0aW9uJykpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbnNlcnQoZWwpIHtcbiAgICBjb25zdCBpZWwgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgaWVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGllbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgdGhpcy5pbWFnZSA9IG51bGw7XG4gICAgdGhpcy5jb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBpZWwub3V0ZXJIVE1MO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3N0dW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBCbG9ja0xpa2UuanNcbipcbiogQmxvY2tMaWtlLmpzIGlzIGFuIGVkdWNhdGlvbmFsIEphdmFTY3JpcHQgbGlicmFyeS5cbiogSXQgYnJpZGdlcyB0aGUgZ2FwIGJldHdlZW4gYmxvY2stYmFzZWQgYW5kIHRleHQtYmFzZWQgcHJvZ3JhbW1pbmcuXG4qXG4qIEJsb2NrTGlrZS5qcyBpcyBkZXNpZ25lZCBmb2xsb3dpbmcgU2NyYXRjaCBjb25jZXB0cywgbWV0aG9kcyBhbmQgcGF0dGVybnMuXG4qIFRoZSBzY3JlZW4gaXMgYSBjZW50ZXJlZCBzdGFnZS4gSW50ZXJhY3Rpb24gaXMgd2l0aCBTcHJpdGVzLlxuKiBDb2RlIGlzIGV4ZWN1dGVkIGluIGEgXCJwYWNlZFwiIG1hbm5lci5cbiogU2NyYXRjaCBibG9jayBjb2RlIGFuZCBCbG9ja0xpa2UuanMgdGV4dCBjb2RlIGFyZSBtZWFudCB0byBiZVxuKiBhcyBsaXRlcmFsbHkgc2ltaWxhciBhcyBwb3NzaWJsZS5cbipcbiogQmxvY2tMaWtlLmpzIGlzIHdyaXR0ZW4gaW4gRVM2L0VTNyBmbGF2b3JlZCBKYXZhU2NyaXB0LlxuKiBJdCBpcyBlbnZpcm9ubWVudCBpbmRlcGVuZGVudC5cbiogSXQgY2FuIGJlIHVzZWQgYW55d2hlcmUgbW9kZXJuIEphdmFTY3JpcHQgcnVucy5cbipcbiogQGF1dGhvciBZYXJvbiAoUm9uKSBJbGFuXG4qIEBlbWFpbCBibG9ja2xpa2VAcm9uaWxhbi5jb21cbipcbiogQ29weXJpZ2h0IDIwMThcbiogRmFicmlxdcOpIGF1IENhbmFkYSA6IE1hZGUgaW4gQ2FuYWRhXG4qL1xuXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9kb2N1bWVudC1jc3MnO1xuaW1wb3J0IHBsYXRmb3JtcyBmcm9tICcuL3BsYXRmb3Jtcyc7XG5cbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vYmFja2Ryb3AnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IENvc3R1bWUgZnJvbSAnLi9jb3N0dW1lJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5leHBvcnQgeyBTdGFnZSB9O1xuZXhwb3J0IHsgQmFja2Ryb3AgfTtcbmV4cG9ydCB7IFNwcml0ZSB9O1xuZXhwb3J0IHsgQ29zdHVtZSB9O1xuXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICBzdHlsZS5pbm5lckhUTUwgPSBgXG4gICAgJHtzdHlsZXMuZGVmYXVsdENTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMudWlDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnRoaW5rQ1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy5zYXlDU1N9IFxcblxcbiBcbiAgICAke3N0eWxlcy5hc2tDU1N9YDtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICBwbGF0Zm9ybXMoKTtcbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4qIENvbGxlY3Rpb24gb2YgY3NzIHN0cmluZ3MgdG8gYmUgaW5qZWN0ZWQgdG8gdGhlIGhlYWQgc2VjdGlvbiBvZiBhIHBhZ2UuXG4qIEBwcml2YXRlXG4qL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDU1MgPSBgXG4qIHsgXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7ICAgICAgICAgICAgICAgIC8qIHByZXZlbnQgY2FsbG91dCB0byBjb3B5IGltYWdlLCBldGMgd2hlbiB0YXAgdG8gaG9sZCAqL1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTsgLyogcHJldmVudCB0YXAgaGlnaGxpZ2h0IGNvbG9yIC8gc2hhZG93ICovXG59XG5odG1sLCBib2R5e1xuICBtYXJnaW46MDtcbiAgcGFkZGluZzowO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHVpQ1NTID0gYFxuLmJsb2NrbGlrZS1mbGFnIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiA2NXB4O1xuICBsaW5lLWhlaWdodDogNjVweDtcbiAgcGFkZGluZzogMzJweDtcbiAgY29sb3I6ICMyMjI7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XG4gIGJvcmRlci1yYWRpdXM6IDY1cHg7XG59XG5gO1xuXG5leHBvcnQgY29uc3QgdGhpbmtDU1MgPSBgXG4uYmxvY2tsaWtlLXRoaW5rIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtaW4td2lkdGg6IDYwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIGxlZnQ6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICMyMjI7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG4uYmxvY2tsaWtlLXRoaW5rOmJlZm9yZSB7XG4gIHBvc2l0aW9uOmFic29sdXRlO1xuICBib3R0b206IC0zMHB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG4uYmxvY2tsaWtlLXRoaW5rOmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC00NXB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiAxNXB4O1xuICBoZWlnaHQ6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG5gO1xuXG5leHBvcnQgY29uc3Qgc2F5Q1NTID0gYFxuLmJsb2NrbGlrZS1hc2ssXG4uYmxvY2tsaWtlLXNheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtaW4td2lkdGg6IDYwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1pbi1oZWlnaHQ6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuLmJsb2NrbGlrZS1hc2s6YmVmb3JlLFxuLmJsb2NrbGlrZS1zYXk6YmVmb3JlIHtcbiAgY29udGVudDogJyAnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG4gIGxlZnQ6IDEzcHg7XG4gIHJpZ2h0OiBhdXRvO1xuICB0b3A6IGF1dG87XG4gIGJvdHRvbTogLTMzcHg7XG4gIGJvcmRlcjogMTZweCBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjNDQ0IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICM0NDQ7XG59XG4uYmxvY2tsaWtlLWFzazphZnRlcixcbi5ibG9ja2xpa2Utc2F5OmFmdGVyIHtcbiAgY29udGVudDogJyAnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG4gIGxlZnQ6IDE1cHg7XG4gIHJpZ2h0OiBhdXRvO1xuICB0b3A6IGF1dG87XG4gIGJvdHRvbTogLTI4cHg7XG4gIGJvcmRlcjogMTZweCBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjZmFmYWZhIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmYWZhZmE7XG59XG5gO1xuXG5leHBvcnQgY29uc3QgYXNrQ1NTID0gYFxuLmJsb2NrbGlrZS1hc2sgaW5wdXQge1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBwYWRkaW5nOiAycHg7XG4gIG1hcmdpbjogMnB4O1xuICB3aWR0aDogNzUlO1xufVxuLmJsb2NrbGlrZS1hc2sgYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgbWFyZ2luOiAwO1xufVxuYDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RvY3VtZW50LWNzcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogcGxhdGZvcm1zIC0gY29sbGVjdGlvbiBvZiB0aGluZ3MgdG8gZW5zdXJlIGl0IHBsYXlzIG5pY2VseSB3aXRoIGNvZGluZyBwbGF0Zm9ybXMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxhdGZvcm1zKCkge1xuICAvKipcbiAgKiBjb2RlcGVuLmlvXG4gICogUGFjZWQgYW5kIFdhaXRlZCBtZXRob2RzIHRyaWdnZXIgdGhlIHByb3RlY3Rpb24gLSBoZW5jZSB3ZSBwcm9sb25nIGl0LlxuICAqIGh0dHBzOi8vYmxvZy5jb2RlcGVuLmlvLzIwMTYvMDYvMDgvY2FuLWFkanVzdC1pbmZpbml0ZS1sb29wLXByb3RlY3Rpb24tdGltaW5nL1xuICAqL1xuICBpZiAod2luZG93LkNQKSB7XG4gICAgd2luZG93LkNQLlBlblRpbWVyLk1BWF9USU1FX0lOX0xPT1BfV09fRVhJVCA9IDYwMDAwO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wbGF0Zm9ybXMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmltcG9ydCBTdGFnZUVsZW1lbnQgZnJvbSAnLi9zdGFnZS1lbGVtZW50JztcbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJztcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnO1xuXG5pbXBvcnQgc2Vuc2luZyBmcm9tICcuL3N0YWdlLXNlbnNpbmcnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7XG4gKiAgIHdpZHRoOiA2MDAsXG4gKiAgIGhlaWdodDogNDAwLFxuICogICBwYWNlOiAxNixcbiAqICAgc2Vuc2luZzogdHJ1ZSxcbiAqICAgcGFyZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2Utd3JhcCcpLFxuICogICBiYWNrZHJvcDogbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7Y29sb3I6ICcjRkZCNkMxJ30pXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFN0YWdlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHN0YWdlIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBUaGUgc3RhZ2UgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyZW50IC0gVGhlIERPTSBlbGVtZW50IGludG8gd2hpY2ggdGhlIHN0YWdlIHdpbGwgYmUgaW5zZXJ0ZWQuIERlZmF1bHQgaXMgdGhlIGJvZHkuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuYmFja2Ryb3AgLSBBIGRlZmF1bHQgQmFja2Ryb3AuXG4gICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNlbnNpbmcgLSBFbmFibGVzIHNlbnNpbmcgb2YgbW91c2UgbG9jYXRpb24gYW5kIHdoYXQga2V5cyBwcmVzc2VkLlxuICAqIElmIHRydWUsIHdpbGwgY29uc3RhbnRseSB1cGRhdGUgc3RhZ2UgcHJvcGVydGllczogbW91c2VYLCBtb3VzZVksIGtleXNLZXlDb2RlLCBrZXlzS2V5Q29kZSBhbmQga2V5c0NvZGUgYmFzZWQgb24gdXNlciBpbnB1dC5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICB3aWR0aDogd2luZG93LmlubmVyV2lkdGgsXG4gICAgICBoZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICAgIHBhcmVudDogZG9jdW1lbnQuYm9keSxcbiAgICAgIHBhY2U6IDMzLFxuICAgICAgYmFja2Ryb3A6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBzdXBlcihhY3R1YWwucGFjZSk7XG5cbiAgICAvLyBiYWNrZHJvcHNcbiAgICB0aGlzLmJhY2tkcm9wcyA9IFtdO1xuXG4gICAgaWYgKGFjdHVhbC5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IGFjdHVhbC5iYWNrZHJvcDtcbiAgICAgIHRoaXMuYmFja2Ryb3BzLnB1c2godGhpcy5iYWNrZHJvcCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IFN0YWdlRWxlbWVudChhY3R1YWwsIHRoaXMpO1xuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuXG4gICAgdGhpcy5rZXlzQ29kZSA9IFtdO1xuICAgIHRoaXMua2V5c0tleSA9IFtdO1xuICAgIHRoaXMua2V5c0tleUNvZGUgPSBbXTtcblxuICAgIHRoaXMuc3ByaXRlcyA9IFtdO1xuXG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gMTAwO1xuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdO1xuICAgIHRoaXMuY2xhc3NlcyA9IFtdO1xuXG4gICAgdGhpcy5tb3VzZURvd24gPSBudWxsO1xuICAgIHRoaXMubW91c2VYID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlWSA9IG51bGw7XG5cbiAgICBhY3R1YWwuc2Vuc2luZyA/IHNlbnNpbmcodGhpcykgOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIERlbGV0ZXMgdGhlIHN0YWdlIGVsZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLmRlbGV0ZSgpO1xuICAqL1xuICBkZWxldGUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRTcHJpdGUgLSBBZGRzIGEgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGFkZC5cbiAgKi9cbiAgYWRkU3ByaXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcblxuICAgIGN1clNwcml0ZS5lbGVtZW50ID0gbmV3IFNwcml0ZUVsZW1lbnQoc3ByaXRlLCB0aGlzKTtcbiAgICBjdXJTcHJpdGUuc3VyZmFjZSA9IG5ldyBTdGFnZVN1cmZhY2UodGhpcyk7XG5cbiAgICBjdXJTcHJpdGUuZWxlbWVudC5mbGFnID0gdGhpcy5lbGVtZW50LmZsYWc7XG4gICAgY3VyU3ByaXRlLmFnYWluc3RCYWNrZHJvcCA9IHRoaXMuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lcjtcblxuICAgIGN1clNwcml0ZS5zdGFnZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBjdXJTcHJpdGUuc3RhZ2VIZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuc3ByaXRlcy5wdXNoKGN1clNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLnogPSB0aGlzLnNwcml0ZXMubGVuZ3RoO1xuXG4gICAgc3ByaXRlLmVsZW1lbnQudXBkYXRlKGN1clNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVTcHJpdGUgLSBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLnJlbW92ZVNwcml0ZShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gYWRkLlxuICAqL1xuICByZW1vdmVTcHJpdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuXG4gICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLmVsZW1lbnQgPyBjdXJTcHJpdGUuZWxlbWVudCA9IGN1clNwcml0ZS5lbGVtZW50LmRlbGV0ZShjdXJTcHJpdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBsb29rcyAqICovXG5cbiAgLyoqXG4gICogYWRkQmFja2Ryb3AgLSBBZGRzIGEgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gYWRkLlxuICAqL1xuICBhZGRCYWNrZHJvcChiYWNrZHJvcCkge1xuICAgIHRoaXMuYmFja2Ryb3BzLnB1c2goYmFja2Ryb3ApO1xuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlXG4gICAgIXRoaXMuYmFja2Ryb3AgPyB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbMF0gOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQmFja2Ryb3BUbyAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBiYWNrZHJvcC4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApO1xuICAgIGN1cnJlbnRCYWNrZHJvcEluZGV4ICE9PSAtMSA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1tjdXJyZW50QmFja2Ryb3BJbmRleF0gOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUb051bShpbmRleCkge1xuICAgIHRoaXMuc3dpdGNoQmFja2Ryb3BUbyh0aGlzLmJhY2tkcm9wc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogbmV4dEJhY2tkcm9wIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UubmV4dEJhY2tkcm9wKCk7XG4gICovXG4gIG5leHRCYWNrZHJvcCgpIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YodGhpcy5iYWNrZHJvcCk7XG4gICAgdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXTtcblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQmFja2Ryb3AgLSBSZW1vdmVzIGEgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UucmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApIHtcbiAgICBpZiAodGhpcy5iYWNrZHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKGJhY2tkcm9wKTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPT09IGJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXSA6IG51bGw7XG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IHRoaXMuYmFja2Ryb3BzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGJhY2tkcm9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYWNrZHJvcHMgPSBbXTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUJhY2tkcm9wTnVtIC0gUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBiYWNrZHJvcCwgd2lsbCBmYWlsIGFuZCBlbWl0IGEgY29uc29sZSBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnJlbW92ZUJhY2tkcm9wTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3BOdW0oaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKHRoaXMuYmFja2Ryb3BzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiByZWZyZXNoIC0gRm9yY2VzIGEgc3ByaXRlIHJlZnJlc2guXG4gICogTm90ZTogc2VydmljZSBtZXRob2QgdG8gYmUgdXNlZCBpZiBjb3N0dW1lIHdhcyBtYW5pcHVsYXRlZCBkaXJlY3RseS5cbiAgKi9cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHpvb20gLSB6b29tcyB0aGUgc3RhZ2UgdG8gdGhlIHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqXG4gICogc3RhZ2Uuem9vbSgxNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgLSB0aGUgcGVyY2VudGFnZSB0byBzZXQuXG4gICovXG4gIHpvb20ocGVyY2VudCkge1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IHBlcmNlbnQ7XG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBTcHJpdGVzICogKi9cblxuICAvKipcbiAgKiBfcmVmcmVzaFNwcml0ZXMgLSBSZWZyZXNoIHRoZSBET00gZWxlbWVudCBvZiBhbGwgc3ByaXRlcyBjdXJyZW50bHkgb24gc3RhZ2UuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBfcmVmcmVzaFNwcml0ZXMoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIHRoaXMuc3ByaXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBzcHJpdGUgPSBpdGVtO1xuICAgICAgaSArPSAxO1xuICAgICAgc3ByaXRlLnogPSBpO1xuICAgICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlQmFja3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSBvbmUgcGxhY2UgZG93biB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3ByaXRlcy5pbmRleE9mKHNwcml0ZSk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCAtIDFdOyAvLyBtb3ZlIG9uZSB1cFxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4IC0gMV0gPSBzcHJpdGU7IC8vIG1lIHN1YmplY3QgZG93blxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZUZvcndhcmQgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uZSBwbGFjZSB1cCBpbiB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUZvcndhcmQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVGb3J3YXJkKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNwcml0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCArIDFdOyAvLyBtb3ZlIG9uZSBkb3duXG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXggKyAxXSA9IHNwcml0ZTsgLy8gbWUgc3ViamVjdCB1cFxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZVRvRnJvbnQgLSBCcmluZ3MgdGhlIHNwcml0ZSB0byB0aGUgZnJvbnQgb2YgdGhlIFwicGlsZVwiXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZVRvRnJvbnQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVUb0Zyb250KHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpO1xuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlVG9CYWNrIC0gU2VuZHMgdGhlIHNwcml0ZSB0byB0aGUgYmFjayBvZiB0aGUgXCJwaWxlXCJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNwcml0ZXMudW5zaGlmdChzcHJpdGUpO1xuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKiBzZW5zaW5nICovXG5cbiAgLyoqXG4gICogaXNLZXlQcmVzc2VkIC0gQ2hlY2tzIGlmIGEga2V5IGlzIHByZXNzZWQuIFN0YWdlIHNlbnNpbmcgbXVzdCBiZSBlbmFibGVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXkoc3RhZ2UuaXNLZXlQcmVzc2VkKCdhJykpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJLZXkgLSB0aGUga2V5IHByZXNzZWQuIE1heSBiZSB0aGUgY29kZSBvciB0aGUgY2hhcmFjdGVyIGl0c2VsZiAoQSBvciA2NSlcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICBpc0tleVByZXNzZWQodXNlcktleSkge1xuICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuICAgIGxldCBjaGVjaztcblxuICAgIHR5cGVvZiB1c2VyS2V5ID09PSAnc3RyaW5nJyA/IGNoZWNrID0gdXNlcktleS50b0xvd2VyQ2FzZSgpIDogY2hlY2sgPSB1c2VyS2V5O1xuICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAvLyBOb3RlOiB1c2VyIG1heSB3cml0ZSBpbmNvbXBhdGlibGUgY29kZS5cbiAgICB0aGlzLmtleXNLZXkuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICB0aGlzLmtleXNDb2RlLmluZGV4T2YoY2hlY2spICE9PSAtMSA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgdGhpcy5rZXlzS2V5Q29kZS5pbmRleE9mKGNoZWNrKSAhPT0gLTEgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuXG4gICAgIXRoaXMuc2Vuc2luZyA/IGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc0tleVByZXNzZWQoKSBpbmdub3JlZC4gU3RhZ2Ugc2Vuc2luZyBub3QgZW5hYmxlZC4nKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHJld3JpdGluZyB1c2VyIGNvZGUgdG8gYWxsb3cgZm9yIEJsb2NrTGlrZS5qcyBmZWF0dXJlcy5cbiovXG5cbi8qKlxuKiBjb3VudENoYXIgLSBjb3VudCBob3cgbWFueSB0aW1lIGEgZ2l2ZW4gY2hhcmFjdGVyIChvciBzdHJpbmcpIGFwcGVhcnMgaW4gYW5vdGhlciBzdHJpbmcuXG4qIGhlbHBlciBmb3IgZXZlbnRlZCBza2lwcGluZy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge3N0cmluZ30gY2hhciAtIGEgc3RyaW5nIHRvIGxvb2sgZm9yLlxuKlxuKiBAcmV0dXJuIHtudW1iZXJ9IC0gdGhlIG51bWJlciBvZiB0aW1lcyBmb3VuZC5cbiovXG5mdW5jdGlvbiBjb3VudENoYXIoc3RyLCBjaGFyKSB7XG4gIGNvbnN0IHJlZ0V4cCA9IG5ldyBSZWdFeHAoYFxcXFwke2NoYXJ9YCwgJ2cnKTtcbiAgcmV0dXJuIChzdHIubWF0Y2gocmVnRXhwKSB8fCBbXSkubGVuZ3RoO1xufVxuXG4vKipcbiogcmVtb3ZlU3RyaW5ncyAtIFJlbW92ZXMgc3RyaW5ncyBmcm9tIGEgbGluZSBvZiBjb2RlLlxuKiBoZWxwZXIgZm9yIGV2ZW50ZWQgc2tpcHBpbmcuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBsaW5lIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgbGluZSB3aXRob3V0IHN0cmluZ3MuXG4qL1xuZnVuY3Rpb24gcmVtb3ZlU3RyaW5ncyhsaW5lKSB7XG4gIHJldHVybiBsaW5lLnJlcGxhY2UoL1wiKC4qPylcInwnKC4qPyknfGAoLio/KWAvZywgJycpO1xufVxuXG4vKipcbiogaXNNZXRob2RJblN0cmluZyAtIGNoZWNrcyBhIHN0cmluZyBhZ2FpbnN0IGFuIGFycmF5IG9mIG1ldGhvZCBuYW1lcy5cbipcbiogQHBhcmFtIHtzdHJpbmd9IHN0ciAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge0FycmF5fSBhcnIgLSBhbiBhcnJheSBvZiBtZXRob2QgbmFtZXMuXG4qXG4qIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIG1ldGhvZCBpbiB0aGUgc3RyaW5nLlxuKi9cbmZ1bmN0aW9uIGlzTWV0aG9kSW5TdHJpbmcoYXJyLCBzdHIpIHtcbiAgcmV0dXJuIChhcnIuc29tZShtZXRob2QgPT4gc3RyLmluZGV4T2YoYC4ke21ldGhvZH0oYCkgIT09IC0xKSk7XG59XG5cbi8qKlxuKiBpc1BhY2VkIC0gY2hlY2tzIGlmIGEgbGluZSBvZiBjb2RlIGluY2x1ZGVzIGEgcGFjZWQgbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBpcyBwYWNlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzUGFjZWQoaXRlbSwgZW50aXR5KSB7XG4gIHJldHVybiBpc01ldGhvZEluU3RyaW5nKGVudGl0eS5wYWNlZCwgaXRlbSk7XG59XG5cbi8qKlxuKiBpc1dhaXRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhIHdhaXRlZCBtZXRob2QuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGlzIHdhaXRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzV2FpdGVkKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gaXNNZXRob2RJblN0cmluZyhlbnRpdHkud2FpdGVkLCBpdGVtKTtcbn1cblxuLyoqXG4qIGlzRXZlbnRlZCAtIGNoZWNrcyBpZiBhIGxpbmUgb2YgY29kZSBpbmNsdWRlcyBhbiBldmVudGVkIG1ldGhvZC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gaXMgZXZlbnRlZCBpbiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGlzRXZlbnRlZChpdGVtLCBlbnRpdHkpIHtcbiAgcmV0dXJuIGlzTWV0aG9kSW5TdHJpbmcoZW50aXR5LmV2ZW50ZWQsIGl0ZW0pO1xufVxuXG4vKipcbiogd2hpY2hXYWl0ZWRSZXR1cm4gLSBjaGVja3MgaWYgYSBsaW5lIG9mIGNvZGUgaW5jbHVkZXMgYSB3YWl0ZWRSZXR1cm4gbWV0aG9kLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgd2FpdGVkUmV0dXJuIG1ldGhvZCBmb3VuZCBvciBudWxsLlxuKi9cbmZ1bmN0aW9uIHdoaWNoV2FpdGVkUmV0dXJuKGl0ZW0sIGVudGl0eSkge1xuICByZXR1cm4gZW50aXR5LndhaXRlZFJldHVybmVkLmZpbmQobWV0aG9kID0+IChpdGVtLmluZGV4T2YoYC4ke21ldGhvZH0oYCkgIT09IC0xID8gbWV0aG9kIDogZmFsc2UpKTtcbn1cblxuLyoqXG4qIGluc2VydFBhY2VkIC0gaW5zZXJ0cyBhIHRpbWVkIGF3YWl0IGxpbmUgYWZ0ZXIgYW55IG1ldGhvZCB0aGF0IGlzIG9uIHRoZSBsaXN0IG9mIHBhY2VkIG1ldGhvZHMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEBwYXJhbSB7ZW50aXR5fSBlbnRpdHkgLSB0aGUgZW50aXR5IHRyaWdnZXJpbmcgdGhlIG1ldGhvZC5cbipcbiogQHJldHVybiB7c3RyaW5nfSAtIGEgbW9kaWZpZWQgbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydFBhY2VkKGl0ZW0sIGVudGl0eSkge1xuICBjb25zdCBjb2RlID0gYCR7aXRlbX1cXG4gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsICR7ZW50aXR5LnBhY2V9KSk7YDtcbiAgcmV0dXJuIGlzUGFjZWQoaXRlbSwgZW50aXR5KSA/IGNvZGUgOiBpdGVtO1xufVxuXG4vKipcbiogaW5zZXJ0V2FpdGVkIC0gaW5zZXJ0cyB0aGUgXCJtZWNoYW5pc21cIiB0aGF0IHN0b3BzIGV4ZWN1dGlvbiBhbmQgYXdhaXRzIGZvciB0aGUgbWV0aG9kIHRvIGZpbmlzaC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGl0ZW0gLSBhIGxpbmUgb2YgY29kZS5cbiogQHBhcmFtIHtlbnRpdHl9IGVudGl0eSAtIHRoZSBlbnRpdHkgdHJpZ2dlcmluZyB0aGUgbWV0aG9kLlxuKlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCAobXVsdGkpbGluZSBvZiBjb2RlLlxuKi9cbmZ1bmN0aW9uIGluc2VydFdhaXRlZChpdGVtLCBlbnRpdHkpIHtcbiAgbGV0IGZvdW5kID0gbnVsbDtcbiAgbGV0IGNvZGU7XG5cbiAgLy8gbG9vayBmb3Igd2FpdGVkIG1ldGhvZHMuXG4gIGZvdW5kID0gaXNXYWl0ZWQoaXRlbSwgZW50aXR5KTtcblxuICAvLyBub3QgYSBub3JtYWwgXCJ3YWl0ZWRcIi4gbG9vayBmb3Igd2FpdGVkUmV0dXJuZWQuXG4gIGlmICghZm91bmQpIHtcbiAgICBsZXQgdGhlVmFyID0gbnVsbDtcblxuICAgIGZvdW5kID0gd2hpY2hXYWl0ZWRSZXR1cm4oaXRlbSwgZW50aXR5KTtcblxuICAgIC8vIGNvZGUgZm9yIHdhaXRlZFJldHVyblxuICAgIHRoZVZhciA9IGl0ZW0uc3Vic3RyKDAsIGl0ZW0uaW5kZXhPZignPScpKVxuICAgICAgLnJlcGxhY2UoJ2xldCcsICcnKVxuICAgICAgLnJlcGxhY2UoJ3ZhcicsICcnKVxuICAgICAgLnJlcGxhY2UoJ2NvbnN0JywgJycpXG4gICAgICAudHJpbSgpO1xuXG4gICAgY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCAnJHt0aGVWYXJ9JywgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWA7XG5cbiAgICAvLyBpbnZva2UgaXMgXCJmb3JnaXZpbmdcIi4gbWF5LCBvciBtYXkgbm90LCBoYXZlIHZhcmlhYmxlcy5cbiAgICBmb3VuZCA9PT0gJ2ludm9rZScgJiYgKGl0ZW0uaW5kZXhPZignLCcpID09PSAtMSkgPyBjb2RlID0gYCR7aXRlbS5zdWJzdHJpbmcoMCwgaXRlbS5sYXN0SW5kZXhPZignKScpKX0sIFtdLCAnJHt0aGVWYXJ9JywgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWAgOiBudWxsO1xuICB9IGVsc2Uge1xuICAgIC8vIGNvZGUgZm9yIFwibm9ybWFsXCIgd2FpdGVkXG4gICAgY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCAnJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScpYDtcbiAgfVxuXG4gIC8vIGVudGl0eS50cmlnZ2VyaW5nSWQgY3JlYXRlcyBhIHVuaXF1ZSBjb250ZXh0IHRvIGNoYWluIHRoZSB3YWl0ZWQgbWV0aG9kcy5cbiAgY29kZSA9IGAke2NvZGV9XFxuIGF3YWl0IG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLndhaXRlZC4ke2VudGl0eS50cmlnZ2VyaW5nSWR9JywgZnVuY3Rpb24gd2FpdGVkTGlzdGVuZXIoZSkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibG9ja0xpa2Uud2FpdGVkLiR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nLCB3YWl0ZWRMaXN0ZW5lcik7XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO2A7XG5cbiAgcmV0dXJuIGZvdW5kID8gY29kZSA6IGl0ZW07XG59XG5cbi8qKlxuKiBpbnNlcnRBc3luYyAtIEFkZHMga2V5d29yZCBhc3luYyB0byBmdW5jdGlvbiBkZWNlbGVyYXRpb24gaWYgbm90IHByZXNlbnRcbiogV2lsbCBjYXRjaDpcbiogLSBhbGwgbmFtZWQgZnVuY3Rpb24gZGVjZWxlcmF0aW9ucyB3aXRoIGEgc3BhY2UgYWZ0ZXIgdGhlIGtleXdvcmQgJ2Z1bmN0aW9uJ1xuKiAtIGFueXRoaW5nIHRoYXQgaGFzIGEgZmF0IGFycm93IHdpdGggYW55IG9mIHNldmVyYWwgdmFyaWFibGUgcGF0dGVybnMgYmVmb3JlIGl0LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gaW5zZXJ0QXN5bmMoaXRlbSkge1xuICBjb25zdCBleGlzdCA9IGl0ZW0uaW5kZXhPZignYXN5bmMgJyk7XG5cbiAgLy8gZnVuY3Rpb24gZGVjbGFyYXRpb25cbiAgbGV0IHJlZ0V4cCA9IC9mdW5jdGlvbiB8ZnVuY3Rpb25cXCh8ZnVuY3Rpb24oIHxcXHQpXFwoLztcbiAgbGV0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhpdGVtKTtcblxuICAvLyBvciBhcnJvd1xuICBpZiAoIW1hdGNoZXMpIHtcbiAgICByZWdFeHAgPSAvKFthLXpBLVpdXFx3KnxcXChbYS16QS1aXVxcdyooLFxccypbYS16QS1aXVxcdyopKlxcKSkgPT4vO1xuICAgIG1hdGNoZXMgPSByZWdFeHAuZXhlYyhpdGVtKTtcbiAgfVxuICByZXR1cm4gZXhpc3QgPT09IC0xICYmIG1hdGNoZXMgPyBgJHtpdGVtLnN1YnN0cmluZygwLCBtYXRjaGVzLmluZGV4KX1hc3luYyAke2l0ZW0uc3Vic3RyaW5nKG1hdGNoZXMuaW5kZXgsIGl0ZW0ubGVuZ3RoKX1gIDogaXRlbTtcbn1cblxuLyoqXG4qIGVtcHR5TG9vcFByb3RlY3Rpb24gLSBleGFtaW5lcyB0aGUgY29kZSBmb3Igd2hpbGUgYW5kIGZvciBzdGF0ZW1lbnRzIHRoYXQgYXJlIGVtcHR5LlxuKiBOb3RlOiBzaW5jZSB3aGlsZSh0cnVlKXt9IGlzIGxpa2VseSB0byBiZSBjb2RlZCBieSB0aGUgdXNlciB0aGlzIHByZXZlbnRzIGluZmluaXRlIGxvb3BzLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gYSBtb2RpZmllZCBsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gZW1wdHlMb29wUHJvdGVjdGlvbihmdW5jUykge1xuICBjb25zdCBjaGVjayA9IGZ1bmNTLnJlcGxhY2UoL1xccysvZywgJycpLnJlcGxhY2UoL1xccj9cXG58XFxyL2csICcnKTtcblxuICBjb25zdCByZWdFeHAgPSAvd2hpbGVcXChbXFxzXFxTXSpcXCl7fXxmb3JcXChbXFxzXFxTXSpcXCl7fXxkb3t9d2hpbGVcXChbXFxzXFxTXSpcXCkvO1xuICBjb25zdCBtYXRjaGVzID0gcmVnRXhwLmV4ZWMoY2hlY2spO1xuXG4gIHJldHVybiAhIW1hdGNoZXM7XG59XG5cbi8qKlxuKiByZW1vdmVPdXRlciAtIFJlbW92ZXMgdGhlIG91dGVyIGZ1bmN0aW9uIGRlZmluaXRpb24gYW5kIHJldHVybnMgdGhlIGZ1bmN0aW9uIGNvZGUgYm9keS5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBib2R5IG9mIHRoZSBmdW5jdGlvbi5cbiovXG5mdW5jdGlvbiByZW1vdmVPdXRlcihmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJ3snKSArIDEsIGZ1bmNTLmxhc3RJbmRleE9mKCd9JykpO1xufVxuXG4vKipcbiogcmVtb3ZlQ29tbWVudHMgLSBSZW1vdmVzIGNvbW1lbnRzIGZyb20gY29kZS5cbiogZnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzE1MTIzNzc3XG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBmdW5jUyAtIHRoZSBmdW5jdGlvbiBiZWluZyByZXdyaXR0ZW4uXG4qIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgZnVuY3Rpb24gd2l0aG91dCBjb21tZW50cy5cbiovXG5mdW5jdGlvbiByZW1vdmVDb21tZW50cyhmdW5jUykge1xuICByZXR1cm4gZnVuY1MucmVwbGFjZSgvXFwvXFwqW1xcc1xcU10qP1xcKlxcL3woW15cXFxcOl18XilcXC9cXC8uKiQvZ20sICcnKTtcbn1cblxuLyoqXG4qIGdldEV2ZW50T2JqZWN0VmFyTmFtZSAtIGV4dHJhY3RzIHRoZSB2YXJpYWJsZSBuYW1lIHRoYXQgaG9sZHMgdGhlIGV2ZW50IG9iamVjdC5cbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSB2YXJpYWJsZSBuYW1lLlxuKi9cbmZ1bmN0aW9uIGdldEV2ZW50T2JqZWN0VmFyTmFtZShmdW5jUykge1xuICByZXR1cm4gZnVuY1Muc3Vic3RyaW5nKGZ1bmNTLmluZGV4T2YoJygnKSArIDEsIGZ1bmNTLmluZGV4T2YoJyknKSk7XG59XG5cbi8qKlxuKiByZXdyaXRlIC0gcmV3cml0ZXMgYSBmdW5jdGlvbiB0byBhbiBhc3luYyB2ZXJzaW9uIHRoYXQgaXMgXCJwYWNlZFwiIHVzaW5nIGF3YWl0aW5nIGZvciBwcm9taXNlcy5cbiogVGhpcyBhbGxvd3MgdGhlIHVzZXIgdG8gd3JpdGUgc2VxdWVudGlhbCBzaW1wbGUgY29kZSB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgaW4gYSBwYWNlZCBtYW5uZXIuXG4qXG4qIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGVcbiogQHBhcmFtIC0ge09iamVjdH0gZW50aXR5IC0gYSBzcHJpdGUgb3Igc3RhZ2Ugb2JqZWN0IHRvIHdoaWNoIHRoZSBmdW5jdGlvbiBhcHBsaWVzLlxuKiBAcmV0dXJuIHtmdW5jdGlvbn0gLSBhbiBhc3luYyBtb2RpZmllZCBmdW5jdGlvbi5cbiovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXdyaXRlKGZ1bmMsIGVudGl0eSkge1xuICBsZXQgY29kZSA9IGZ1bmMudG9TdHJpbmcoKTtcbiAgY29uc3QgdGhlVmFyID0gZ2V0RXZlbnRPYmplY3RWYXJOYW1lKGNvZGUpO1xuXG4gIC8vIHJld3JpdGUgdGhlIGNvZGVcbiAgaWYgKGVtcHR5TG9vcFByb3RlY3Rpb24oY29kZSkpIHtcbiAgICBjb2RlID0gJ3Rocm93IFxcJ0Jsb2NrTGlrZS5qcyBFcnJvcjogRW1wdHkgbG9vcCBkZXRlY3RlZFxcJzsnO1xuICB9IGVsc2Uge1xuICAgIGNvZGUgPSByZW1vdmVDb21tZW50cyhyZW1vdmVPdXRlcihjb2RlKSk7XG4gICAgY29kZSA9IGNvZGUuc3BsaXQoJ1xcbicpLmZpbHRlcihpdGVtID0+IGl0ZW0udHJpbSgpLmxlbmd0aCAhPT0gMCk7XG5cbiAgICAvLyBjb3VudGVyIGZvciBvcGVuIHBhcmVudGhlc2VzLlxuICAgIGxldCBldmVudGVkT3BlblBhcmVuID0gMDtcblxuICAgIGNvZGUgPSBjb2RlLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgdGVtcCA9IGl0ZW07XG4gICAgICBsZXQgcmVzdWx0ID0gdGVtcDtcblxuICAgICAgLy8gaW50ZXJuYWwgZXZlbnRlZCBtZXRob2RzIGFyZSBza2lwcGVkXG4gICAgICBpZiAoaXNFdmVudGVkKHRlbXAsIGVudGl0eSkgfHwgZXZlbnRlZE9wZW5QYXJlbikge1xuICAgICAgICBldmVudGVkT3BlblBhcmVuICs9IChjb3VudENoYXIocmVtb3ZlU3RyaW5ncyh0ZW1wKSwgJygnKSAtIGNvdW50Q2hhcihyZW1vdmVTdHJpbmdzKHRlbXApLCAnKScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGEgbWV0aG9kIGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyBidXQgbm90IG1vcmUgdGhhbiBvbmVcbiAgICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0UGFjZWQodGVtcCwgZW50aXR5KSA6IG51bGw7IC8vIG1vcmUgbGlrZWx5XG4gICAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydFdhaXRlZCh0ZW1wLCBlbnRpdHkpIDogbnVsbDsgLy8gbGVzcyBsaWtlbHlcblxuICAgICAgICAvLyBhbmQgb25seSBpZiBub3QgYSBtZXRob2Qgd2lsbCBhZGQgYXN5bmMgdG8gZnVuY3Rpb25zXG4gICAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydEFzeW5jKHRlbXApIDogbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcbiAgICBjb2RlID0gY29kZS5qb2luKCdcXG4nKTtcbiAgfVxuXG4gIC8vIHRyYW5zZm9ybSB0aGUgdGV4dCBpbnRvIGEgZnVuY3Rpb25cbiAgY29uc3QgQXN5bmNGdW5jdGlvbiA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihhc3luYyAoKSA9PiB7fSkuY29uc3RydWN0b3I7XG4gIGxldCBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKGNvZGUpO1xuXG4gIC8vIHBhc3MgdGhlIGV2ZW50IG9iamVjdCB0byB0aGUgZnVuY3Rpb24gaWYgZXhpc3RzLlxuICB0aGVWYXIgPyBhZiA9IG5ldyBBc3luY0Z1bmN0aW9uKHRoZVZhciwgY29kZSkgOiBudWxsO1xuXG4gIHdpbmRvdy5ibG9ja0xpa2UgJiYgd2luZG93LmJsb2NrTGlrZS5kZWJ1ZyA/IGNvbnNvbGUubG9nKGFmKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gIHJldHVybiBhZjtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Jld3JpdGVyLmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgKiBhcyBjc3MgZnJvbSAnLi9lbGVtZW50LWNzcyc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBVSSBFbGVtZW50IG9mIHRoZSBzdGFnZS5cbiAqIEVhY2ggU3RhZ2UgaGFzIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0YWdlRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFN0YWdlIEVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIHRoZSBzdGFnZSBmb3Igd2hpY2ggdGhlIGVsZW1lbnQgaXMgY3JlYXRlZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgY3JlYXRlZC5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucywgc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLyoqXG4gICAgKiBjcmVhdGVEaXYgLSBjcmVhdGVzIGEgZGl2IGF0IHNwZWNpZmllZCB6SW5kZXguXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHpJbmRleCAtIGRlc2lyZWQgcGxhY2UgaW4gXCJzdGFja1wiXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gYSBzdGFnZSB3aWRlL2hpZ2ggRE9NIGVsZW1lbnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVEaXYoekluZGV4KSB7XG4gICAgICBjb25zdCBzZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgc2VsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgICBzZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuICAgICAgc2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleDtcbiAgICAgIHNlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBzZWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnbWFuaXB1bGF0aW9uJztcblxuICAgICAgcmV0dXJuIHNlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZUNhbnZhcyAtIGNyZWF0ZXMgYSBjYW52YXMgYXQgc3BlY2lmaWVkIHpJbmRleC5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gekluZGV4IC0gZGVzaXJlZCBwbGFjZSBpbiBcInN0YWNrXCJcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyh6SW5kZXgpIHtcbiAgICAgIGNvbnN0IGNlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gICAgICBjZWwud2lkdGggPSBvcHRpb25zLndpZHRoO1xuICAgICAgY2VsLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0O1xuICAgICAgY2VsLnN0eWxlLnpJbmRleCA9IHpJbmRleDtcbiAgICAgIGNlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBjZWwuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgY2VsLnN0eWxlLnRvcCA9ICcwcHgnO1xuXG4gICAgICByZXR1cm4gY2VsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogY3JlYXRlRmxhZyAtIGNyZWF0ZXMgYSBcImZsYWdcIiBkaXYuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50IHdpdGggZmxhZyBhdCBjZW50ZXJzLlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRmxhZygpIHtcbiAgICAgIGNvbnN0IGZsYWdTaXplID0gMTMwO1xuICAgICAgY29uc3QgZmVsID0gY3JlYXRlRGl2KC0xKTtcblxuICAgICAgY29uc3QgZmVsaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgICBjb25zdCB4ID0gLShmbGFnU2l6ZSAvIDIpO1xuICAgICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgICAgY29uc3QgeSA9IC0oZmxhZ1NpemUgLyAyKTtcblxuICAgICAgLy8gbG9va3NcbiAgICAgIGZlbGl0ZW0uc3R5bGUud2lkdGggPSBgJHtmbGFnU2l6ZX1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLmhlaWdodCA9IGAke2ZsYWdTaXplfXB4YDtcbiAgICAgIGZlbGl0ZW0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZmVsaXRlbS5pbm5lckhUTUwgPSAnJiM5ODczOyc7XG5cbiAgICAgIGZlbGl0ZW0uc3R5bGUubGVmdCA9IGAkeyhvcHRpb25zLndpZHRoIC8gMikgKyB4fXB4YDtcbiAgICAgIGZlbGl0ZW0uc3R5bGUudG9wID0gYCR7KG9wdGlvbnMuaGVpZ2h0IC8gMikgKyB5fXB4YDtcbiAgICAgIGZlbGl0ZW0uY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1mbGFnJztcblxuICAgICAgZmVsLmFwcGVuZENoaWxkKGZlbGl0ZW0pO1xuICAgICAgZmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgIHJldHVybiBmZWw7XG4gICAgfVxuXG4gICAgZWwuaWQgPSBgJHtzdGFnZS5pZH1gO1xuXG4gICAgZWwuc3R5bGUud2lkdGggPSBgJHtvcHRpb25zLndpZHRofXB4YDtcbiAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtvcHRpb25zLmhlaWdodH1weGA7XG5cbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSc7XG4gICAgZWwuc3R5bGUuYm94U2l6aW5nID0gJ2JvcmRlci1ib3gnO1xuICAgIGVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgICBvcHRpb25zLnBhcmVudC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICB0aGlzLmJhY2tkcm9wQ29udGFpbmVyID0gY3JlYXRlQ2FudmFzKDApO1xuICAgIHRoaXMuYmFja2Ryb3BDb250YWluZXIuaWQgPSBgJHtzdGFnZS5pZH0tYmFja2Ryb3BgO1xuICAgIHRoaXMuYmFja2Ryb3BDb250YWluZXIuY2xhc3NOYW1lID0gJ2Jsb2NrbGlrZS1wYW5lbC1iYWNrZHJvcCc7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5iYWNrZHJvcENvbnRhaW5lcik7XG5cbiAgICB0aGlzLmNhbnZhcyA9IGNyZWF0ZUNhbnZhcygwKTtcbiAgICB0aGlzLmNhbnZhcy5pZCA9IGAke3N0YWdlLmlkfS1zdXJmYWNlYDtcbiAgICB0aGlzLmNhbnZhcy5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLXN1cmZhY2UnO1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcblxuICAgIHRoaXMuZmxhZyA9IGNyZWF0ZUZsYWcoKTtcbiAgICB0aGlzLmZsYWcuaWQgPSBgJHtzdGFnZS5pZH0tZmxhZ2A7XG4gICAgdGhpcy5mbGFnLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtZmxhZyc7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5mbGFnKTtcblxuICAgIHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0byB1cGRhdGUuXG4gICovXG4gIHVwZGF0ZShzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbDtcbiAgICBjb25zdCBiYWNrZHJvcENvbnRleHQgPSBzdGFnZS5lbGVtZW50LmJhY2tkcm9wQ29udGFpbmVyLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBsZXQgbWFyZ2luVEIgPSAwO1xuICAgIGlmIChzdGFnZS5lbGVtZW50LmVsLnBhcmVudEVsZW1lbnQudGFnTmFtZSA9PT0gJ0JPRFknKSB7XG4gICAgICBtYXJnaW5UQiA9IE1hdGguZmxvb3IoKHdpbmRvdy5pbm5lckhlaWdodCAtIHN0YWdlLmhlaWdodCkgLyAyKTtcbiAgICAgIG1hcmdpblRCIDwgMCA/IG1hcmdpblRCID0gMCA6IG51bGw7XG4gICAgfVxuXG4gICAgLy8gSWYgY29sb3IgLSBmaWxsIHRoZSBjYW52YXMgd2l0aCB0aGUgY29sb3Igc2V0LCBvciBjbGVhciBpdFxuICAgIGlmIChzdGFnZS5iYWNrZHJvcCAmJiBzdGFnZS5iYWNrZHJvcC5jb2xvcikge1xuICAgICAgYmFja2Ryb3BDb250ZXh0LnJlY3QoMCwgMCwgc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCk7XG4gICAgICBiYWNrZHJvcENvbnRleHQuZmlsbFN0eWxlID0gc3RhZ2UuYmFja2Ryb3AuY29sb3I7XG4gICAgICBiYWNrZHJvcENvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWNrZHJvcENvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8vIElmIGltYWdlIC0gZHJhdyB0aGUgaW1hZ2Ugb24gY2FudmFzXG4gICAgaWYgKHN0YWdlLmJhY2tkcm9wICYmIHN0YWdlLmJhY2tkcm9wLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGJhY2tkcm9wQ29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KTtcbiAgICAgIH07XG4gICAgICBpbWcuc3JjID0gc3RhZ2UuYmFja2Ryb3AuaW1hZ2U7XG4gICAgfVxuXG4gICAgLy8gem9vbSBhbmQgcGxhY2VtZW50XG4gICAgZWwuc3R5bGUudHJhbnNmb3JtID0gYHNjYWxlKCR7c3RhZ2UubWFnbmlmaWNhdGlvbiAvIDEwMH0pYDtcbiAgICBlbC5zdHlsZS5tYXJnaW4gPSBgJHttYXJnaW5UQn1weCBhdXRvYDtcblxuICAgIC8vIGNzcyBydWxlc1xuICAgIGNzcy5hcHBseShzdGFnZSk7XG5cbiAgICAvLyBjc3MgY2xhc3Nlc1xuICAgIHN0YWdlLmJhY2tkcm9wID8gZWwuY2xhc3NOYW1lID0gc3RhZ2UuYmFja2Ryb3AuY2xhc3Nlcy5jb25jYXQoc3RhZ2UuY2xhc3Nlcykuam9pbignICcpIDogZWwuY2xhc3NOYW1lID0gc3RhZ2UuY2xhc3Nlcy5qb2luKCcgJyk7XG4gIH1cblxuICAvKipcbiAgKiBkZWxldGUgLSBkZWxldGVzIHRoZSBET00gZWxlbWVudFxuICAqL1xuICBkZWxldGUoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZWw7XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG5cbiAgLyoqXG4gICogYWRkRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGluZnJvbnQgb2YgZXZlcnl0aGluZyAoc2hvd3MgaXQpXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICBhZGRGbGFnKHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBzdGFnZS5lbGVtZW50LmZsYWc7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSAxMDAwO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRmxhZyAtIHB1dHMgdGhlIGZsYWcgZGl2IGF0IHRoZSBiYWNrIChoaWRlcyBpdClcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIHJlbW92ZUZsYWcoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YWdlLWVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBFbmNhcHN1bGF0ZXMgdGhlIHN0YWdlIHNlbnNpbmcgZnVuY3Rpb25hbGl0eS5cbiovXG5cbi8qKlxuKiBlbmFibGUgLSBFbmFibGVzIHNlbnNpbmcgb2YgZG9jdW1lbnQgbGV2ZWwgZXZlbnRzIChrZXlkb3duLCBtb3VzZW1vdmUsIG1vdXNlZG93biwgdG91Y2htb3ZlKVxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVuYWJsZShzdGFnZSkge1xuICBjb25zdCBtZSA9IHN0YWdlO1xuICBtZS5zZW5zaW5nID0gdHJ1ZTtcblxuICAvKipcbiAgKiBkZWNpbWFsUm91bmQgLSByb3VuZHMgYSBudW1iZXIgdG9vIGRlY2ltYWwgcG9pbnRzLlxuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHJvdW5kLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwb2ludHMgLSBob3cgbWFueSBkZWNpbWFsIHBvaW50cyB0byBsZWF2ZS5cbiAgKi9cbiAgZnVuY3Rpb24gZGVjaW1hbFJvdW5kKHZhbHVlLCBwb2ludHMpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCh2YWx1ZSAqICgxMCAqKiBwb2ludHMpKSAvICgxMCAqKiBwb2ludHMpO1xuICB9XG5cbiAgLyoqXG4gICogY29tcHV0ZVggLSBDb21wdXRlcyBjZW50ZXJlZCB4IGJhc2VkIG9uIHggZXh0cmFjdGVkIGZyb20gZXZlbnQuXG4gICovXG4gIGZ1bmN0aW9uIGNvbXB1dGVYKHgpIHtcbiAgICBjb25zdCBtYWcgPSBtZS5tYWduaWZpY2F0aW9uIC8gMTAwO1xuICAgIHJldHVybiBkZWNpbWFsUm91bmQoKHggLSAobWUuZWxlbWVudC5lbC5vZmZzZXRMZWZ0KSAtIChtZS53aWR0aCAvIDIpKSAvIG1hZywgMik7XG4gIH1cblxuICAvKipcbiAgKiBjb21wdXRlWSAtIENvbXB1dGVzIGNlbnRlcmVkIHkgYmFzZWQgb24geSBleHRyYWN0ZWQgZnJvbSBldmVudC5cbiAgKi9cbiAgZnVuY3Rpb24gY29tcHV0ZVkoeSkge1xuICAgIGNvbnN0IG1hZyA9IG1lLm1hZ25pZmljYXRpb24gLyAxMDA7XG4gICAgcmV0dXJuIGRlY2ltYWxSb3VuZCgoLXkgKyBtZS5lbGVtZW50LmVsLm9mZnNldFRvcCArIChtZS5oZWlnaHQgLyAyKSkgLyBtYWcsIDIpO1xuICB9XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgZS5rZXkgJiYgbWUua2V5c0tleS5pbmRleE9mKGUua2V5LnRvTG93ZXJDYXNlKCkpID09PSAtMSA/IG1lLmtleXNLZXkucHVzaChlLmtleS50b0xvd2VyQ2FzZSgpKSA6IG51bGw7XG4gICAgZS5jb2RlICYmIG1lLmtleXNDb2RlLmluZGV4T2YoZS5jb2RlLnRvTG93ZXJDYXNlKCkpID09PSAtMSA/IG1lLmtleXNDb2RlLnB1c2goZS5jb2RlLnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBtZS5rZXlzS2V5Q29kZS5pbmRleE9mKGUua2V5Q29kZSkgPT09IC0xID8gbWUua2V5c0tleUNvZGUucHVzaChlLmtleUNvZGUpIDogbnVsbDtcbiAgfSk7XG5cbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgIGUua2V5ID8gbWUua2V5c0tleSA9IG1lLmtleXNLZXkuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZS5rZXkudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgIGUuY29kZSA/IG1lLmtleXNDb2RlID0gbWUua2V5c0NvZGUuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gZS5jb2RlLnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICBtZS5rZXlzS2V5Q29kZSA9IG1lLmtleXNLZXlDb2RlLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUua2V5Q29kZSk7XG4gIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNsaWVudFgpO1xuICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUuY2xpZW50WSk7XG4gIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFgpO1xuICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSk7XG4gIH0sIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICBtZS5tb3VzZURvd24gPSB0cnVlO1xuICB9KTtcbiAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgIG1lLm1vdXNlRG93biA9IGZhbHNlO1xuICB9KTtcblxuICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgIG1lLm1vdXNlWCA9IGNvbXB1dGVYKGUudG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICBtZS5tb3VzZVkgPSBjb21wdXRlWShlLnRvdWNoZXNbMF0uY2xpZW50WSk7XG4gICAgbWUubW91c2VEb3duID0gdHJ1ZTtcbiAgfSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCAoKSA9PiB7XG4gICAgbWUubW91c2VEb3duID0gZmFsc2U7XG4gICAgbWUubW91c2VYID0gbnVsbDtcbiAgICBtZS5tb3VzZVkgPSBudWxsO1xuICB9KTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3N0YWdlLXNlbnNpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBMb29rIGZyb20gJy4vbG9vayc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgQmFja2Ryb3AuXG4gKiBCYWNrZHJvcHMgY2FuIGJlIGFkZGVkIHRvIHRoZSBTdGFnZS5cbiAqIEBleHRlbmRzIExvb2tcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKHtcbiAqICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9iYWNrZHJvcC5zdmcnXG4gKiB9KTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7XG4gKiAgIGNvbG9yOiAnI0EyREFGRidcbiAqIH0pO1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCYWNrZHJvcCBleHRlbmRzIExvb2sge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBCYWNrZHJvcCB0byBiZSB1c2VkIGJ5IFN0YWdlIG9iamVjdHMuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgZm9yIHRoZSBiYWNrZHJvcC5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pbWFnZSAtIGEgVVJJIChvciBkYXRhIFVSSSkgZm9yIHRoZSBiYWNrZHJvcCBpbWFnZS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb2xvciAtIGEgY3NzIGNvbG9yIHN0cmluZyAoJyNmZjAwMDAnLCAncmVkJylcbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7fTtcbiAgICBjb25zdCBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5pbWFnZSA9IGFjdHVhbC5pbWFnZTtcbiAgICB0aGlzLmNvbG9yID0gYWN0dWFsLmNvbG9yO1xuXG4gICAgLy8gcHJlbG9hZFxuICAgIGlmICh0aGlzLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1hZ2U7XG4gICAgfVxuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byBhZGQgdGhlIGJhY2tkcm9wIHRvby5cbiAgKi9cbiAgYWRkVG8oc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlO1xuICAgIHN0YWdlLmJhY2tkcm9wcy5wdXNoKHRoaXMpO1xuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlXG4gICAgIXN0YWdlLmJhY2tkcm9wID8gY3VyU3RhZ2UuYmFja2Ryb3AgPSBzdGFnZS5iYWNrZHJvcHNbMF0gOiBudWxsO1xuICAgIHN0YWdlLmVsZW1lbnQgPyBzdGFnZS5lbGVtZW50LnVwZGF0ZShzdGFnZSkgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRnJvbSAtIFJlbW92ZXMgdGhlIGJhY2tkcm9wIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuYWRkVG8oc3RhZ2UpO1xuICAqIGJhY2tkcm9wLnJlbW92ZUZyb20oc3RhZ2UpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gd2hpY2ggc3RhZ2UgdG8gcmVtb3ZlIHRoZSBiYWNrZHJvcCBmcm9tLlxuICAqL1xuICByZW1vdmVGcm9tKHN0YWdlKSB7XG4gICAgc3RhZ2UucmVtb3ZlQmFja2Ryb3AodGhpcyk7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2JhY2tkcm9wLmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW50aXR5IGZyb20gJy4vZW50aXR5JztcblxuaW1wb3J0IFN0YWdlU3VyZmFjZSBmcm9tICcuL3N0YWdlLXN1cmZhY2UnO1xuaW1wb3J0IFNwcml0ZUVsZW1lbnQgZnJvbSAnLi9zcHJpdGUtZWxlbWVudCc7XG5pbXBvcnQgQ29zdHVtZSBmcm9tICcuL2Nvc3R1bWUnO1xuaW1wb3J0IFRleHRVaUVsZW1lbnQgZnJvbSAnLi90ZXh0LXVpLWVsZW1lbnQnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFNwcml0ZS5cbiAqIFNwcml0ZXMgY2FuIGJlIGFkZGVkIHRvIHRoZSBTdGFnZS5cbiAqIEBleHRlbmRzIEVudGl0eVxuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKHtcbiAqICAgY29zdHVtZTogbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAqICAgICB3aWR0aDogNTAsXG4gKiAgICAgaGVpZ2h0OiA1MCxcbiAqICAgICBjb2xvcjogJyNBMkRBRkYnLFxuICogICAgIGltYWdlOiAnaHR0cHM6Ly93d3cuYmxvY2tsaWtlLm9yZy9pbWFnZXMvc2hlZXBfc3RlcC5wbmcnXG4gKiAgIH0pXG4gKiB9KTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKHtcbiAqICAgICB3aWR0aDogNTAsXG4gKiAgICAgaGVpZ2h0OiA1MCxcbiAqICAgICBjb2xvcjogJyNBMkRBRkYnLFxuICogICAgIGltYWdlOiAnaHR0cHM6Ly93d3cuYmxvY2tsaWtlLm9yZy9pbWFnZXMvc2hlZXBfc3RlcC5wbmcnXG4gKiB9KTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IGNvbmZldHRpID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL2NvbmZldHRpLnN2ZycpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFyZVplcm9TaXplZFNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKG51bGwpO1xuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGUgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTcHJpdGUgdG8gYmUgYWRkZWQgdG8gU3RhZ2UuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgZm9yIHRoZSBzcHJpdGUgYW5kL29yIG9wdGlvbnMgcGFzc2VkIHRvIGNvc3R1bWUuXG4gICogQWx0ZXJuYXRpdmVseSBhbiBpbWFnZSBVUkwuIElmIGEgVVJMIGlzIHByb3ZpZGVkIGRlZmF1bHQgY29zdHVtZSB3aWxsIGJlIHNpemVkIHRvIGltYWdlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhY2UgLSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB3YWl0IGZvciBlYWNoIHBhY2VkIG1ldGhvZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5jb3N0dW1lIC0gQSBkZWZhdWx0IENvc3R1bWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGggLSB0aGUgY29zdHVtZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIHRoZSBjb3N0dW1lIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkwgKG9yIGRhdGEgVVJMKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zIC0gYSBVUkwgKG9yIGRhdGEgVVJMKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IHNoZWVweSA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUY4QUFBQmVDQVlBQUFCRkVNaFFBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFSc2tsRVFWUjQydTFkQjFSVTF4WkZRWm9VRVJWRlJiRmpWd1FMS29xZ0JqdmdWeEdqMkdNdnNXdUkwVVJpNzcyWGJ6ZjJYbUp2MkZ2c3h0NFZZUm9EYy80K1QzVHhFV2JlTkpxejE3cHJtSm4zSG0vMnUvZmNjMCs3Wm1ZbW1HQkMxa1F4S3l1clJYWjJkay93S3NIck0ydHI2Mlg0dkpTSkdpTWlSNDRjSFVDNHJFK2ZQb3FvcUNpNmYvOCtYYng0a1FZT0hCaUhCeUREOTkyVEhHNkYxaVpYcmx6TEhSMGRkK0YxQ2Q0SDhXVk1UR3FQcGc0T0RqSW1QU1ZjdlhxVm5KeWNwRGd1Qk0zSDF0YjJWZm55NVNXVEprMmlCUXNXMElRSkU2aGt5WklTZlA0RTMxY3gwU2tlbGlEdDliNTkrMGdkRGh3NFFKYVdscC9RNUt0V3JWSWwvMTZsVXRIY3VYTVRXRng5VDJJcU4xcGJjM1B6K1RsejVqd0xPWDBUN1RwRXhTNTgvZ2VhSDVxRm12TWJCUVlHU2tnREVoSVN1UGNuekpvMVM2WHV1TEZqeDhaakZKM1A2cVNYUlMvYm5EMTc5b1RDaFF2TE9uYnNtREJ4NGtSQkRLQUgwckJodzZoUm8wWUs5T280R3h1Yjl4WVdGci9obkZ6SnJsRTliOTY4eDk2OGVhT0plNHFKaWFHeVpjc0tEMEVkRkFyRkZ4RlZNU3VTYmcwaWYwZFRndkM0eTVjdmF5UmoyN1p0VktOR0RRbUxEWndmeGc4Qm8yTS95L21sUzVlcVNDUzJidDBxNnJpUWtKQlkvSStmc2hyeEJTQk83cFFvVVVKNit2UnAwaGFiTjI4bWUzdDdCWWgvRXh3Y0xKTktwZlRwMHlmUjUzLzgrRkhVY2FOR2pVckF2WTdMU3NTN1FYdzhScTlTY0cvV0ZZTUhEeVp2YjI5U0twVmtMRVJIUjFPZVBIbTQ5MWZLQ3NUYm84Yy9idCsrdlNJK1BsNW5VbGdqS1ZTb0VKMDdkNDZNallNSEQ2b3czN3pEdmVmSjFNeERpMW50NitzcjF6VFphY0tqUjQ4b2QrN2NsRmJvMEtHREhBOWdkbWJtdmpuSWx6OTkrbFJ2TXE1ZHUwWkZpeFpOTS9KWkdRRDU3ek1yOGRsQS9JTmx5NVlaaEl6Mzc5OFR4QmZGeHNhbUNma3NJbGtWWnJHWitIdWNlVTJDTmdZdE1yRU5RR3VCNW9YbWltWnVsSlVrV2t2Y3pBSVFlZ0U5NGpsVXYxaTh2b0I5NUFDK0c4VjZkL0psdjR1TGk5U1FrMlBObWpVSjZtV2FrTStLUWJaczJWVDRIZVZ0Ykt6WDQrOEUxL3o1cEVITkdrazZoNFhJdzBPRDVmVnFWNDl4SytRYVkyMWxGWWZqK1BnRUcydnJOMVpXbHR2eHZyNitwRHZCS0RVVFJFZkRBQ1h2MmJPbmNzbVNKYlJwMHlaaHliNWh3d1lhUDM0OCtmdjdTM0djRWcvalFhSXVuaDFxNGVucDA2ZUwwc01sRWdsUGNqUml4QWlxVzdjT1pMc1Q4WS9CZW9CS0ZDOU80ZUhoZFBqd1lkcTdkeS9sejUrZkhqNThtT3ExZUdTOGZQbVNXQlhWQjBlT0hPR1JGbTFoWVI0WDFLeWg4dHloelVRZjdxYmFZcDlkcFZ2bjl0SGVUVXRwVU8vT1NrdkxISEhvckVOMEpiNFZyeTQ5UFQwVkd6ZHVwTGk0T0xVMysrN2RPNHFNakNROEpBWE91d3lUUVR5TGl0U0dOSk01ZlBod3FvWGVqQWRIdVJ3ZHFVV1RBSm8xOFJjNnNYY2QzYjkwbUM0ZTNVYWJWc3ltem1HdHljSGVuanc5cTFLUEhqMElLMXRoMFpSMEVtYzlubGZHTHZueTRzZDNvWEpsUGVqeDQ4ZmYvRytlZjA2ZVBLbDJ0Y3ZmUWJOU090amJ4ZS9ldUZndDZhbTFQWnVXY09lUmFpMnJRZDRNTEdZVUN4Y3VGRlE4YmZYa2J0MjZLZEZyVktkT25mcm0rN05uejFMcDBxWElHYjI3VTJnd0xadytucTZmM2swSjcyNnIvVEVmSGwyZ1VZTjdrU1VlbExXMUZSVXVWQkFQSVEvNVlxUjRWZk1rbUN1b2FXTS9lblQxYjFLOXYwTy9EdThuakNCK0lQdjM3NmN6Wjg3UWloVXJ5SzkrUGNydDVFVHQycldsbE5ZYy9Ic2JOR2hBOW5ZNVZWZFA3dFNKZUc2WGorOGdjL1BzU20zbUFaNGtGOFBlSW1mVlRoOU1temFOOEFCcHo1NDlYejk3Ky9ZdFJvYWpRSXpzeFhXZGZ0VGZPOWVRWFU1Ym1qMHBRaGdaVzFiTm9aM3JGOUh6ZjA1OWN5eUxnYUg5dTVOdjdScms1Vm1aZ2xzRTBwSlpFK2oxM2JQVTJMOGVsZlh3SU81Z2JIYStlZk1tclZtemhpcFhxa1FXNXVhMGZlMENuWW5uTnJoM2w0U2NOalpIeFJ0ZXJLMGpvYzVKRGFFYU1sYXZYazJZa09uMjdkdkNlN2JURkhjdm90ZVAraktrTWNuUlArZjI2M3dOSGgyckYwNmhnUHAxcUVCK0YwRmMxYTdwUllFQjljaTdha1c5N284N0JkdXZRR2xOc2R3SFFOekkxVTFtdW1Ea3lKRlVxbFFwUVJ4ZHVuU0pvRG5RdXdkUmVqK0E5cTJiVTNqN1lMMnZrN3pWOHE1S2N5Yi9xdlA1TDI2Zm9ueDVuV1VXRnRrbmlEWUJnUGpYaXhZdFVobGFaZU9KbWxYRTBhTkhDKzk5ZmV0U202QW1Rcy9UaHlRV1A0NE85bnBmSjNrcjVKcWZEbTVkb2RPNUxFcXJWaW9uaHdUWnd4cWZLT1l4UkFhQklKbXhkT2J6NTg4TDRvYzFvZ2NQSHBDTFN6N3EzVFZNTCtKNDlMQTYrdkwyYVlPU1g3SjRVZnByOVZ5ZHhGamI0S1pLak95N1NSWm1tcm5ISlBzcTZjUm9ERFJ2M3B6R2pCa2ovSDNyMWkwcVdOQVZZaU9FNHQvK294Tkp6MjZkRk1qLzlPU3lRY252RkJwRVBjTGJhbjNlK0ZFRFZORHRvem1LUWh2Vk1nZ081Rmh0VlVwdHdRdWZwSG8vajRCaTd1NkNDSXA3ZlV2ckg4dVRaWEYzTjRQTC9LZ2pmd21UK2JWVHUwU2ZNKzJQa1NwSUR6bTRySzJkdmRmZWZoVVdSeXBLQnp4NzlnenVQUTlxMHFnK1NaNWZGZjFqK2RpeXBVdlFoSWlmRFU0K3Q2SDl1MUhCQWk1MGJQZGF0Y2M5dVhHYy90TXlVSkhZNCt0cGIyeTN0My9HSzc3MEF2dGd2YjI5cUVLNU1xSjZHeSsyL092VjRvbU5GSzl1R29WOGx0LzhZR0duSVY4ZmIyRWh5T1lGSGhVbjk2Mm5WUXNtVTZ1bURlV3NUdHJhMm14bEw1MHVKZ1JYMkczaU5Ka09qQTJaVENhWURYQXYxSzFqR3pxeVkvVTN4TDY1ZDQ1bVJJNkJQcDVISU44UTZxcW05dmo2TVdGZFltZG5Hd003VFR6UE1UQ2J3TEZ2Y3hmdkorSjlCWDBNWjM2bFM1ZU9wZ3lDNjlldlUvZnUzUkJCa0Vzd3FoVjFLMHl3SkZKK0VBNkxJWGw3VnFUbGMvODB1SHFwcnYwMnNqOVpXVnBlTUlhcE9OVFB6KzhUWlREd1NHU05hTzNhdFpUVDFwYU83MW1udHFleklhNXlCUStxWGFNYTNZazZvQmZaUExvYU42aExFOGNPRTk3djM3S2MxeE12alVGK2VOT21UV01vZzJMWHJsM2s1K3Vqa1REV2VsZ2tjR3ZTc0o3T3hQTUUrK1U2M05pTThmNWhGT1d3c0lnWHZXalNBbTNxMTY4Zm5WSEpuemR2SHVZQXpUcDM0WUlGdmhJV1VOOUhaL0o1Y1pXVWZKNVkrWE9ZbGxtTmRETTArYldLRlN2MkthT1N6eVlKdG9CcUl1M0FYeXVvVE1saTVBV0RtRGI2ZWZMR2szd3ptS1hoUUtHR2ZyVkordUthOEhuRjhxVS82cVJLYW9xbmdmZEpubEhKRCsvVWtSYlAvQ1BOSnRmVVd1dVdQOFNBcXk2R0p0OENYaVM5YmZmR1FzTUFmMEh1cGpmNUVjUDZKbGhhV2tRYWZNWkZ6T091R1RObXFESWkrZFd4K0RwellGTzZrOCtMTENkSGgvOGFSZU9wVTZkT2hwVDdOYXA3MCtrREc5T2QvTFZMcHNFbDZiamJHT1RuNGFRQmRxTmxOTlNxV1VOWXpxYzMrZXhTZE1ybHlCcFBZMlBrTkUyQnlUYzJvNUZmcDdhUFlHcEliL0ozYlZoRVZTcFhnaGZPSmc0S3lqSkQ1Mjl4NzVleWh6ODVPUDZGSjJTMnY2UTF3dHFIMHRMWmtlbE8vc3I1azRSN1lSY3JYS0l5bTgrT2NRZURzUTlEVVY4RUpFaytmUGdnTE8wNUhKdDlyL2ljcy9yU3BlZEhSRVFJNFNMcFRmNlU4U05vd0lEK1gwTmpFUGdyd3dpNFl2WTVzOUZBYVNQVzFzY0tGQ2lRQU1zZEJRUUVDR0VWYk93eXRxTWxOYXhjdVJLdXVXWUdJWEQ5MGhsVXdDVXZiRVUyZ3IxZW0zT0g5T3NtUk9ZbERTV3NVcVdLQkh6Tk13anZrUHVUMlQ3ZHIxOC9ldkxrU1lhUStSd3BYTVN0a0VISWJ4SG8vOVZzb0szanZWRURYOXF5WmN2LzNkdS8vLzRyWk1va0JzcnFIa0tQSVhRQ0lrYWVGb2tIMm9CSFhENkVCbkpFbTc3a3M2TWRpeVVhMkN1Y0xoM2JMdm84ZG5FNk9qZ0lYcmZrV0xkdUhjSC8vVXhEeG1UcWppeWNIT1hqNHlQWEpyOHBMZEdyMTA4MHVFOFhuUWhmTUcyY0VNRDZ4VzZ6Y2Zrc1FmeDhjZHJ6cTZZd0VZN1ZyRlN4UXFyM1Y2RkNoVmpNaXoyMFpoN2hmRnNRWVN4UEQwMUdMQzVjdUNBRXliSW5TMXZ5UTBPYVVmVnFsWVFWS29lRStGVDNGT3orYks5bjB1dlVyQ1lFU2FtN1JnT1l0S2RNbVpMcS9YRVVIanJ3VTYySXg2UWFpbWhmV1dxUnhCa0pUWnMwb1ZCRXFHbExQdmRzanVuczJDNUlpT244RXRqRUk0a2ZRbVRFRUxXUkUxdlh6RU55bkxQYVRFYU9hSWJzbDNFY3YxanVuUkhWRzhzeDhaa0JYTWpDMGRHQi92eDFhSnFwbHh3SGlsVXRMVjY4V09QOUlkbFBCdEV6VXF4S09iWkZpeFp5eWtUWXNXT0g0R0JmTk9OM294UC85djU1aUNsMytKTzdpN28zZG5jaUwrR3NHTzV0T09PQzQrUXpHemdoZ2hNcFdHc3hGdkVzbG1waGJtamVyQm1KVFYzbEVIUE1uNi9Ga0IrR2JKTVl5cVJZdjM2OWtBZ3hwRjlYalFrVjJqYVcveUV0ZmhBQ3VYaWxMeGFzS1NZbXo1bHJzdCt2bnp4NXNvb3lNUTRkT2lUTUFaeUpFdjM0a2tHSVo1Y2hMOFRjM1l1U0xzNGxkQWlGeHVBcERJOVhtVkhrSkFjblhIQVBMVmJValE1dFc2a1g4UnoyNTFtNUFwVW9VVHpGUEM0eFNFeUdjRllib1lZbkZHZk0yZ1ZwQ1I3dXlQOFNqSDgvdG0wbDVHTnBTenlyb0htY2M1T1BUeTBTVXo0bUpiRGxGOXlxTksxMDZ5QmFJWnF5R0RndGxaUHNrUDlLUDNVT0ZaTFJ4Q1NzSWFkV2VIQnN6OUpub2ZuOCtYUFd4T1NhSnR1V3FGMlQ1Y2huOEdqbU9KOGlSVDRIVUZWRTRDMHZwbmloeEFHdTl5NGVFaHd6VTM4ZkNXMm1xaEIrNk9WVmpZNGVQYXIzLytiY0JpUi8zTlpFZmdqOHRWbVMvS1FyenAwN2QvTENSMGpBU0JvRXhZMUxDS0JlanhBTlp5Z01HalJJQ1hFK1JXTmdMTXBkaVNJL3ZXejRoZ1puVnJLMWxrVVQreWFNWWNmeThQRGcrUHhBVGVTWHhFcE1LcWIzbUNBT1Y2NWNvY1NxaERrMWtXL0x4UnprY3ZXV0JYMnFRWDF2Z0FpVFlyS05GR3RHZnNwRkhkUVpzVXpRUExsemo3OXo1dzZiTzdqaVNFRlI1R09JVE8zYnQyK0txU2k4d0RDSkhNMWc5MlpZV0JqN2NhWGdjNW8ycG54ZlYxZlgySlJJWnJlWUNackJtWlJjVndJaEpMY1NheEdKOTZPdzU0VnI1U1RGdlh2M0JPdWNDZUtBNGlDc3VuYlN4WGY3bzd1N3V5U3B5WlJyMzJRVjlUSXRnSXJsOFZnZGo5Y3BOSng3UDhxeWZHVzdYYnQySmthMXdKdzVjM2hWdTFuWGtCRXZ6TlNLRXlkT0NCb09WbWttUnJYQTl1M2J1ZTd5UmQwekl5d3NoaUpDVFRwMTZ0UTBLeHlYVmNCUkZYQ2NQOWVyL0NKNi94TE0zRXBER0ppK0ozQUpNMWdMSHVwZC94S3k2ejV2YzJHQ2VMQmhEaFZ1TCtrZHFJbUxuTXBvb1lJWkhkaUJnbVgrWVVPUWYzTDM3dDBtUnJWVE5WRTcwM0tpL21XK1VmYUZKMTBUeEFNZVFVNFA5VGRFaUhqRWdBRURsQ1pLeGVIVnExZGNmVVFweG93c0JoMVJBQ1BHUktzNGpCczNMZ0VoT0FjTmxaVGl5cVpScm1sc2ducHdwQUx2MXdMT3ZBMldFZ1IxOHk3N1BrMVFqOW16WjZzd1IxNDFiSTEyUzh1eHJWcTFrcG5vVFIyY3F3d0hQRWVtMVRKME9tNXVUZ2ZWdEgzUzl3b3VEVittVEJrSmJ6VmxsSzBlNEJ5WWF1cjkzNElqNDFEMFZjNHBWR1pHM01BeUw0ZVBjelZ0RXo3anhZc1hYOUkrVDJsVEtWWlgrTE5jNHhpWDd4bnNXT0pkTXREYkZlQ0RpMTdZcHNsT001eTVnbzI2NUZuRnJjaUJVcHhZd2R0L2NGYTd1bzcxK3ZWcnduWWpMTitsNElIM3ltcVQ1bHY5WVBJZGgveGNoYm93azh3R2pxbEVRVDllbmZMZUt5cGsyVXZ3UUZTYy90TzZkV3NseWx4S09ja0JxdVIxVU5DYk5YQ3o5QUp1cENjdm94RnFFcDhac2hiRmdBUEdZSmZoQ0xNNWFKekVOaGR0QWRwVU5ONHh1cVJaQmtJbGpJQW9sbjM4RUk0ZlA1NWlSQnQveHBiUnpwMDdFeW9XRXFwWENWdWg2Z29PU01ML0ZHSXNEV3lOak1OMXo1c1phVThybzAzRThIaHQ0MnJaYVBFYy9ZQ0laeWszVkNHWGNRVllaMmRuNnQrL1ArbnJtR0c1aStCVHJtMFRmL2Z1WFlNUno3c2U4Vm9HdjhYZExKT0N5NXh3cWZLT2ljT1VHKzh2L2pNbkNDU1BCOUpGdFdPeGdFaXczWmp3eGtFMnkyN2N1R0VRNG5rdkw5eG5zRmtXUldOK0FOaFRWbU13YmtyZ1ZIck9pZ2Z4Vzc0c1puQzlYMWprNlNwK09ESnY1c3lacXNTWXlpQ3pMSTZxdkZPY201dWJqTU1QeFZRb1oyZDB5NVl0RlNDSVJVTGY1UElZazM0WFRqanIycldya2pkQkVBc2VNVjVlWGpLTW9MZTRUQ096N3dRc212ckJYUEVXMWxJRjFMbDRMbHpFYW10VVZKU3dZUmp2N013N0NXSHU0UGxDam1OWGE0ajI5Y0FJT01ZSmZiaWVramNlUzJsMDhWNWN2QmtaS3Fsd1NuNENqcCtmcmlwak9vSjdjQ0I2N254TTFyY1RlL2JuRFJ6eFlLQlA3MG1jTyt5MHVHWU5uTHNLcEg3QzllSjU4OHR5NWNwSmtIRWp3Y0tRN2V5c0pUMEI4YVB4ZDJFekU0eXpEREg3dkhsQVVKS0pQeWdqYWpML0ExNUV4eStNNDRMZkFBQUFBRWxGVGtTdVFtQ0MnO1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgcGFjZTogMzMsXG4gICAgfTtcblxuICAgIGxldCBhY3R1YWwgPSB7fTtcbiAgICB0eXBlb2Ygb3B0aW9ucyA9PT0gJ29iamVjdCcgPyBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucykgOiBhY3R1YWwgPSBkZWZhdWx0cztcblxuICAgIHN1cGVyKGFjdHVhbC5wYWNlKTtcblxuICAgIC8vIGNvc3R1bWVzXG4gICAgdGhpcy5jb3N0dW1lcyA9IFtdO1xuXG4gICAgLypcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zICAtIGltYWdlIHVybC5cbiAgICAqIHVzZXIgY2FuIHNlbmQgYSB1cmwgaW5zdGVhZCBvZiBhbiBvcHRpb24gb2JqZWN0LlxuICAgICogdGhpcyB3aWxsIGJlIHRyZWF0ZWQgYXMgYSBjb3N0dW1lIGltYWdlIHVybC5cbiAgICAqIHRoZSBpbWFnZSB3aWxsIGJlIHNldCB0aGUgc3ByaXRlIGNvc3R1bWUuXG4gICAgKiB3aGVuIHRoZSBpbWFnZSBpcyBsb2FkZWQsIGNvc3R1bWUgd2lkdGggYW5kIGhlaWdodCB3aWxsIGJlIHNldCB0byBhY3R1YWwgaW1hZ2Ugd2lkdGggYW5kIGhlaWdodC5cbiAgICAqIHNwcml0ZSB3aWxsIGJlIHJlZnJlc2hlZC5cbiAgICAqL1xuICAgIGlmICh0eXBlb2Ygb3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGFjdHVhbC5jb3N0dW1lID0gbmV3IENvc3R1bWUoeyBpbWFnZTogb3B0aW9ucywgd2lkdGg6IDAsIGhlaWdodDogMCB9KTtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuXG4gICAgICBjb25zdCBtZSA9IGFjdHVhbC5jb3N0dW1lO1xuICAgICAgaW1hZ2Uuc3JjID0gb3B0aW9ucztcblxuICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgICAgbWUub3JpZ2luYWxXaWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBtZS5vcmlnaW5hbEhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgbWUud2lkdGggPSBtZS5vcmlnaW5hbFdpZHRoO1xuICAgICAgICBtZS5oZWlnaHQgPSBtZS5vcmlnaW5hbEhlaWdodDtcblxuICAgICAgICB0aGlzLnJlZnJlc2goKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qXG4gICAgKiBhbHRlcm5hdGUgb3B0aW9ucyAtIHBhc3NpbmcgY3VzdG9tZSBvcHRpb25zIHRvIHNwcml0ZS5cbiAgICAqIGlmIGNvc3R1bWUgaXMgbm90IGRlZmluZWQgYnkgdXNlciwgaXQgd2lsbCBiZSBjcmVhdGVkLlxuICAgICogd2hlbiBubyBpbWFnZSBpcyBzZXQsIHNoZWVweSBpcyBkZWZhdWx0LlxuICAgICpcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zIC0gbnVsbC5cbiAgICAqIHVzZXIgY2FuIHBhc3MgbnVsbCBpbnN0ZWFkIG9mIGFuIG9wdGlvbiBvYmplY3QuXG4gICAgKiB0aGlzIGlzIHNhbWUgYXMgc2V0dGluZyBhIGNvc3R1bWUgYXMgbnVsbC5cbiAgICAqIHRoZSBzcHJpdGUgd2lsbCBoYXZlIG5vIGNvc3R1bWVzIGFuZCBubyBzaXplLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiBhY3R1YWwuY29zdHVtZSA9PT0gJ3VuZGVmaW5lZCcgJiYgb3B0aW9ucyAhPT0gbnVsbCkge1xuICAgICAgY29uc3QgY29zdHVtZU9wdGlvbnMgPSB7fTtcbiAgICAgIGFjdHVhbC53aWR0aCA/IGNvc3R1bWVPcHRpb25zLndpZHRoID0gYWN0dWFsLndpZHRoIDogbnVsbDtcbiAgICAgIGFjdHVhbC5oZWlnaHQgPyBjb3N0dW1lT3B0aW9ucy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0IDogbnVsbDtcbiAgICAgIGFjdHVhbC5jb2xvciA/IGNvc3R1bWVPcHRpb25zLmNvbG9yID0gYWN0dWFsLmNvbG9yIDogbnVsbDtcbiAgICAgICh0eXBlb2YgYWN0dWFsLmltYWdlICE9PSAndW5kZWZpbmVkJykgPyBjb3N0dW1lT3B0aW9ucy5pbWFnZSA9IGFjdHVhbC5pbWFnZSA6IGNvc3R1bWVPcHRpb25zLmltYWdlID0gc2hlZXB5O1xuXG4gICAgICBhY3R1YWwuY29zdHVtZSA9IG5ldyBDb3N0dW1lKGNvc3R1bWVPcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBzZXQgY29zdHVtZVxuICAgIGFjdHVhbC5jb3N0dW1lID8gdGhpcy5jb3N0dW1lID0gYWN0dWFsLmNvc3R1bWUgOiBudWxsO1xuICAgIHRoaXMuY29zdHVtZSA/IHRoaXMuY29zdHVtZXMucHVzaCh0aGlzLmNvc3R1bWUpIDogbnVsbDtcblxuICAgIC8vIHNldCB3aWR0aFxuICAgIHRoaXMuY29zdHVtZSA/IHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoIDogdGhpcy53aWR0aCA9IDA7XG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodCA6IHRoaXMuaGVpZ2h0ID0gMDtcblxuICAgIHRoaXMueCA9IDA7XG4gICAgdGhpcy55ID0gMDtcbiAgICB0aGlzLnogPSAwO1xuXG4gICAgdGhpcy5wcmV2WCA9IDA7XG4gICAgdGhpcy5wcmV2WSA9IDA7XG5cbiAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gOTA7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gMTAwO1xuXG4gICAgdGhpcy5yb3RhdGlvblN0eWxlID0gMDtcblxuICAgIHRoaXMudGV4dHVpID0gbnVsbDtcblxuICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgIHRoaXMucGVuQ29sb3IgPSAnIzIyMjIyMic7XG4gICAgdGhpcy5wZW5TaXplID0gMTtcblxuICAgIHRoaXMuY3NzUnVsZXMgPSBbXTtcbiAgICB0aGlzLmNsYXNzZXMgPSBbXTtcbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRUbyAtIEFkZHMgdGhlIHNwcml0ZSB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgc3ByaXRlIHRvby5cbiAgKi9cbiAgYWRkVG8oc3RhZ2UpIHtcbiAgICB0aGlzLnN0YWdlV2lkdGggPSBzdGFnZS53aWR0aDtcbiAgICB0aGlzLnN0YWdlSGVpZ2h0ID0gc3RhZ2UuaGVpZ2h0O1xuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IFNwcml0ZUVsZW1lbnQodGhpcywgc3RhZ2UpO1xuICAgIHRoaXMuc3VyZmFjZSA9IG5ldyBTdGFnZVN1cmZhY2Uoc3RhZ2UpO1xuXG4gICAgdGhpcy5lbGVtZW50LmZsYWcgPSBzdGFnZS5lbGVtZW50LmZsYWc7XG4gICAgdGhpcy5hZ2FpbnN0QmFja2Ryb3AgPSBzdGFnZS5lbGVtZW50LmJhY2tkcm9wQ29udGFpbmVyO1xuXG4gICAgc3RhZ2Uuc3ByaXRlcy5wdXNoKHRoaXMpO1xuICAgIHRoaXMueiA9IHN0YWdlLnNwcml0ZXMubGVuZ3RoO1xuXG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGNsb25lIC0gQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBzcHJpdGUgYW5kIHRyaWdnZXJzIGFuIGV2ZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgY2xvbmUgPSB0aGlzLmNsb25lKCk7XG4gICogICBjbG9uZS5tb3ZlKDEwMCk7XG4gICogICBjbG9uZS5hZGRUbyhzdGFnZSk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgY2xvbmUoKSB7XG4gICAgLy8gbWFrZSBhIG5ldyBzcHJpdGUuXG4gICAgY29uc3Qgc3ByaXRlID0gbmV3IFNwcml0ZSgpO1xuICAgIC8vIHNhdmUgaWQuXG4gICAgY29uc3QgaWQgPSBzcHJpdGUuaWQ7XG4gICAgLy8gYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNvbnN0IGNsb25lID0gT2JqZWN0LmFzc2lnbihzcHJpdGUsIHRoaXMpO1xuICAgIC8vIHJlYXNzaWduIHRoZSB1bmlxdWUgaWQuXG4gICAgY2xvbmUuaWQgPSBpZDtcblxuICAgIC8vIHJlbW92ZSBET00gZWxlbWVudHNcbiAgICBjbG9uZS5lbGVtZW50ID0gbnVsbDtcbiAgICBjbG9uZS5zdXJmYWNlID0gbnVsbDtcblxuICAgIC8vIGRldGFjaCBhcnJheXNcbiAgICBjbG9uZS5jc3NSdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodGhpcy5jc3NSdWxlcykpO1xuICAgIGNsb25lLmNsYXNzZXMgPSB0aGlzLmNsYXNzZXMuc2xpY2UoKTtcblxuICAgIC8vIGZpZ3VyZSBvdXQgd2hhdCB0aGUgY3VycmVudCBjb3N0dW1lIGlzLlxuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YodGhpcy5jb3N0dW1lKTtcblxuICAgIC8vIGZpbGwgdGhlIGNvc3R1bWVzIGFycmF5IHdpdGggbmV3IGNvc3R1bWVzIGFuZCBhc3NpZ24gcHJvcGVydGllcy5cbiAgICBjbG9uZS5jb3N0dW1lcyA9IHRoaXMuY29zdHVtZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBjb3N0dW1lID0gbmV3IENvc3R1bWUoKTtcbiAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5hc3NpZ24oY29zdHVtZSwgaXRlbSk7XG5cbiAgICAgIC8vIGRldGFjaCBhcnJheXNcbiAgICAgIG9iai5jc3NSdWxlcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoaXRlbS5jc3NSdWxlcykpO1xuICAgICAgb2JqLmNsYXNzZXMgPSBpdGVtLmNsYXNzZXMuc2xpY2UoKTtcblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9KTtcblxuICAgIC8vIHNldCB0aGUgY3VycmVudCBjb3N0dW1lLlxuICAgIGNsb25lLmNvc3R1bWUgPSBjbG9uZS5jb3N0dW1lc1tjdXJyZW50Q29zdHVtZUluZGV4XTtcblxuICAgIC8vIGFubm91bmNlIGEgY2xvbmVcbiAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS5zcHJpdGVjbG9uZWQuJHt0aGlzLmlkfWAsIHsgZGV0YWlsOiBjbG9uZSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgIHJldHVybiBjbG9uZTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZyb20gLSBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHN0YWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5yZW1vdmVGcm9tKHN0YWdlKTtcbiAgKlxuICAqL1xuICByZW1vdmVGcm9tKHN0YWdlKSB7XG4gICAgY29uc3QgY3VyU3RhZ2UgPSBzdGFnZTtcblxuICAgIGN1clN0YWdlLnNwcml0ZXMgPSBzdGFnZS5zcHJpdGVzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHRoaXMpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudCA9IHRoaXMuZWxlbWVudC5kZWxldGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqIEV2ZW50cyAqICovXG5cbiAgLyoqXG4gICogd2hlbkNsb25lZCAtIEFkZHMgYSBkb2N1bWVudCBsZXZlbCBldmVudCBsaXN0ZW5lciB0cmlnZ2VyZWQgYnkgYSBjdXN0b20gZXZlbnQuXG4gICogVGhlIGN1c3RvbSBldmVudCBpcyB0cmlnZ2VyZWQgYnkgdGhlIGNsb25lKCkgbWV0aG9kLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2xvbmUoKTtcbiAgKiB9KTtcbiAgKlxuICAqIHNwcml0ZS53aGVuQ2xvbmVkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuYWRkVG8oc3RhZ2UpO1xuICAqICAgdGhpcy5nbGlkZSg1LCAxMDAsIDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkNsb25lZChmdW5jKSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgYmxvY2tMaWtlLnNwcml0ZWNsb25lZC4ke3RoaXMuaWR9YCwgKGUpID0+IHtcbiAgICAgIGUuZGV0YWlsLl9leGVjKGZ1bmMsIFtdKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKiogTW90aW9uICogKi9cblxuICAvKipcbiAgKiBfbW90aW9uIC0gTW92ZXMgdGhlIHNwcml0ZSB0byBzcGVjaWZpZWQgbG9jYXRpb24gKHgsIHkpLlxuICAqIEFsbCB1c2VyIG1vdGlvbiBtZXRob2RzIHRyYW5zbGF0ZWQgdG8gdGhpcyBtb3Rpb24uXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBvZiB0aGUgc3ByaXRlICgwIGlzIGNlbnRlciBzY3JlZW4pLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZSBmb3IgdGhlIGNlbnRlciBvZiB0aGUgc3ByaXRlICgwIGlzIGNlbnRlciBzY3JlZW4pLlxuICAqL1xuICBfbW90aW9uKHgsIHkpIHtcbiAgICB0aGlzLnByZXZYID0gdGhpcy54O1xuICAgIHRoaXMucHJldlkgPSB0aGlzLnk7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICAgIHRoaXMuc3VyZmFjZSA/IHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGdsaWRlIC0gTW92ZXMgdGhlIHNwcml0ZSBmb3IgdGhlIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcyBzbyBpdCBhcnJpdmVzIGF0IHNwZWNpZmllZCBsb2NhdGlvbiB3aGVuIHRpbWUgaXMgdXAuXG4gICogUHJvdmlkZXMgc21vb3RoIG1vdmVtZW50LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nbGlkZSgzLCAxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgdGltZSA9IDU7XG4gICogICB0aGlzLmdsaWRlKHRpbWUsIDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdGhlIHdob2xlIG1vdmVtZW50IHdpbGwgbGFzdCAoYW5kIHdpbGwgaGFsdCBmdXJ0aGVyIGV4ZWN1dGlvbiBmb3IpLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZS5cbiAgKiBAcGFyYW0ge251bWJlcn0geSAtIHRoZSB5IGNvb3JkaW5hdGUuXG4gICovXG4gIGdsaWRlKHNlYywgeCwgeSwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIGxldCBpID0gMDtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgLy8gZGl2aWRlIHRoZSB4IGFuZCB5IGRpZmZlcmVuY2UgaW50byBzdGVwc1xuICAgIGNvbnN0IGZyYW1lc1BlclNlY29uZCA9IDEwMDAgLyB0aGlzLnBhY2U7XG4gICAgY29uc3Qgc3RlcFggPSAoeCAtIHRoaXMueCkgLyAoc2VjICogZnJhbWVzUGVyU2Vjb25kKTtcbiAgICBjb25zdCBzdGVwWSA9ICh5IC0gdGhpcy55KSAvIChzZWMgKiBmcmFtZXNQZXJTZWNvbmQpO1xuICAgIGNvbnN0IGludCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGkgKz0gMTtcbiAgICAgIG1lLl9tb3Rpb24obWUueCArIHN0ZXBYLCBtZS55ICsgc3RlcFkpO1xuICAgICAgaWYgKGkgLyBmcmFtZXNQZXJTZWNvbmQgPj0gc2VjKSB7XG4gICAgICAgIC8vICBjbGVhciB0aGUgaW50ZXJ2YWwgYW5kIGZpeCBhbnkgXCJkcmlmdFwiXG4gICAgICAgIGNsZWFySW50ZXJ2YWwoaW50KTtcbiAgICAgICAgbWUuX21vdGlvbih4LCB5KTtcbiAgICAgICAgbWUuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICAgIH1cbiAgICB9LCB0aGlzLnBhY2UpO1xuICB9XG5cbiAgLyoqXG4gICogbW92ZSAtIE1vdmVzIHRoZSBzcHJpdGUgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHBpeGVscyBpbiB0aGUgZGlyZWN0aW9uIGl0IGlzIHBvaW50aW5nLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgbW92ZShwaXhlbHMpIHtcbiAgICAvKipcbiAgICAqIHRvUmFkIC0gY29udmVydHMgYSBkZWdyZWUgdG8gcmFkaWFucy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMuXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGVncmVlcyBjb252ZXJ0ZWQgdG8gcmFkaWFucy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHRvUmFkKGRlZykge1xuICAgICAgcmV0dXJuIGRlZyAqIChNYXRoLlBJIC8gMTgwKTtcbiAgICB9XG5cbiAgICBjb25zdCBkeCA9IE1hdGgucm91bmQoTWF0aC5jb3ModG9SYWQodGhpcy5kaXJlY3Rpb24gLSA5MCkpICogcGl4ZWxzKTtcbiAgICBjb25zdCBkeSA9IE1hdGgucm91bmQoTWF0aC5zaW4odG9SYWQodGhpcy5kaXJlY3Rpb24gKyA5MCkpICogcGl4ZWxzKTtcblxuICAgIHRoaXMuX21vdGlvbih0aGlzLnggKyBkeCwgdGhpcy55ICsgZHkpO1xuICB9XG5cbiAgLyoqXG4gICogZ29UbyAtIE1vdmVzIHRoZSBzcHJpdGUgdG8gc3BlY2lmaWVkIGxvY2F0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdvVG8oMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgZ29Ubyh4LCB5KSB7XG4gICAgdGhpcy5fbW90aW9uKHgsIHkpO1xuICB9XG5cbiAgLyoqXG4gICogZ29Ub3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSB0b3dhcmRzIGFub3RoZXIgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMTAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5nb1Rvd2FyZHMob3RoZXJTcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZSB0by5cbiAgKi9cbiAgZ29Ub3dhcmRzKHNwcml0ZSkge1xuICAgIHRoaXMuX21vdGlvbihzcHJpdGUueCwgc3ByaXRlLnkpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0WCAtIFBsYWNlcyB0aGUgc3ByaXRlIGF0IHRoZSBzcGVjaWZpZWQgeCBwb3NpdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZXRYKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgKi9cbiAgc2V0WCh4KSB7XG4gICAgdGhpcy5fbW90aW9uKHgsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRZIC0gUGxhY2VzIHRoZSBzcHJpdGUgYXQgdGhlIHNwZWNpZmllZCB5IHBvc2l0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNldFkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgc2V0WSh5KSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCwgeSk7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VYIC0gTW92ZXMgdGhlIHNwcml0ZSBvbiB0aGUgeCBheGlzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlWCgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgY2hhbmdlWChwaXhlbHMpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54ICsgcGl4ZWxzLCB0aGlzLnkpO1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlWSAtIE1vdmVzIHRoZSBzcHJpdGUgb24gdGhlIHkgYXhpcyBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmNoYW5nZVkoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHMgLSBudW1iZXIgb2YgcGl4ZWxzIHRvIG1vdmUuXG4gICovXG4gIGNoYW5nZVkocGl4ZWxzKSB7XG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCwgdGhpcy55ICsgcGl4ZWxzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBvaW50SW5EaXJlY3Rpb24gLSBQb2ludHMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBkaXJlY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRJbkRpcmVjdGlvbig0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gZGlyZWN0aW9uIHRvIHBvaW50IHRvLlxuICAqL1xuICBwb2ludEluRGlyZWN0aW9uKGRlZykge1xuICAgIGRlZyA+IDAgPyB0aGlzLmRpcmVjdGlvbiA9IGRlZyAlIDM2MCA6IHRoaXMuZGlyZWN0aW9uID0gKGRlZyArICgzNjAgKiAxMCkpICUgMzYwO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcG9pbnRUb3dhcmRzIC0gUG9pbnQgdGhlIHNwcml0ZSB0b3dhcmRzIGFub3RoZXIgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmdvVG8oMTAwLCAxMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBvaW50VG93YXJkcyhvdGhlclNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlIHRvLlxuICAqL1xuICBwb2ludFRvd2FyZHMoc3ByaXRlKSB7XG4gICAgLyoqXG4gICAgKiBjb21wdXRlRGlyZWN0aW9uVG8gLSBmaW5kcyB0aGUgZGlyZWN0aW9uIGZyb20gc3ByaXRlJ3MgY3VycmVudCBsb2NhdGlvbiB0byBhIHNwZWNpZmllZCBzZXQgb2YgY29vcmRpbmF0ZXMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21YIC0gdGhlIHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZyb21ZIC0gdGhlIHkgY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvWCAtIHRoZSB4IGNvb3JkaW5hdGVcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB0b1kgLSB0aGUgeSBjb29yZGluYXRlXG4gICAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGlyZWN0aW9uIGluIGRlZ3JlZXMuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjb21wdXRlRGlyZWN0aW9uVG8oZnJvbVgsIGZyb21ZLCB0b1gsIHRvWSkge1xuICAgICAgLyoqXG4gICAgICAqIHRvRGVnIC0gQ29udmVydHMgcmFkaWFucyB0byBkZWdyZWVzLlxuICAgICAgKlxuICAgICAgKiBAcGFyYW0ge251bWJlcn0gcmFkIC0gbnVtYmVyIG9mIHJhZGlhbnMuXG4gICAgICAqIEByZXR1cm4ge251bWJlcn0gLSByYWRpYW5zIGNvbnZlcnRlZCB0byBkZWdyZWVzLlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHRvRGVnKHJhZCkge1xuICAgICAgICByZXR1cm4gcmFkICogKDE4MCAvIE1hdGguUEkpO1xuICAgICAgfVxuXG4gICAgICAvLyAxKSBGaW5kIHRoZSBhbmdsZSBpbiByYWQsIGNvbnZlcnQgdG8gZGVnICg5MCB0byAtOTApLlxuICAgICAgLy8gMikgRmluZCB0aGUgc2lnbiBvZiB0aGUgZGVsdGEgb24geSBheGlzICgxLCAtMSkuIFNoaWZ0IHRvICgwLCAtMikuIE11bHRpcGx5IGJ5IDkwLiAoMCwgMTgwKVxuICAgICAgLy8gQWRkIDEpIGFuZCAyKVxuICAgICAgLy8gTm9ybWFsaXplIHRvIDM2MFxuXG4gICAgICBsZXQgcmVzdWx0ID0gKHRvRGVnKE1hdGguYXRhbigoZnJvbVggLSB0b1gpIC8gKGZyb21ZIC0gdG9ZKSkpICsgKDkwICogKE1hdGguc2lnbihmcm9tWSAtIHRvWSkgKyAxKSkgKyAzNjApICUgMzYwO1xuICAgICAgKGZyb21ZIC0gdG9ZKSA9PT0gMCA/IHJlc3VsdCArPSA5MCA6IG51bGw7IC8vIG1ha2Ugc3VyZSB3ZSBmaXggYXRhbiBsaW0gKGRpdmlzaW9uIGJ5IHplcm8pLlxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIHRoaXMuZGlyZWN0aW9uID0gY29tcHV0ZURpcmVjdGlvblRvKHRoaXMueCwgdGhpcy55LCBzcHJpdGUueCwgc3ByaXRlLnkpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogdHVyblJpZ2h0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgcmlnaHQgKGNsb2Nrd2lzZSlcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy50dXJuUmlnaHQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5SaWdodChkZWcpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICh0aGlzLmRpcmVjdGlvbiArIGRlZykgJSAzNjA7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiB0dXJuTGVmdCAtIFR1cm5zIHRoZSBzcHJpdGUgaW4gYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdGhlIGxlZnQgKGNvdW50ZXItY2xvY2t3aXNlKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnR1cm5MZWZ0KDQ1KTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcyB0byB0dXJuLlxuICAqL1xuICB0dXJuTGVmdChkZWcpIHtcbiAgICB0aGlzLmRpcmVjdGlvbiA9ICgodGhpcy5kaXJlY3Rpb24gKyAzNjApIC0gZGVnKSAlIDM2MDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFJvdGF0aW9uU3R5bGUgLSBTZXRzIG9uZSBvZiB0aHJlZSBwb3NzaWJsZSByb3RhdGlvbiBzdHlsZXM6XG4gICogICAtICdubycgLyAyIC0gdGhlIHNwcml0ZXMgY2hhbmdlcyB0aGUgZGlyZWN0aW9uIGluIHdoaWNoIGl0IHBvaW50cyB3aXRob3V0IGNoYW5naW5nIHRoZSBzcHJpdGVzIGFwcGVhcmFuY2UuXG4gICogICAtICdsZWZ0LXJpZ2h0JyAvIDEgLSB0aGUgc3ByaXRlIHdpbGwgZmxpcCBob3Jpem9udGFsbHkgd2hlbiBkaXJlY3Rpb24gaXMgYmV0d2VlbiAxODAgYW5kIDM2MC5cbiAgKiAgIC0gJ2FsbCcgLyAwIC0gdGhlIHNwcml0ZSB3aWxsIHJvdGF0ZSBhcm91bmQgaXRzIGNlbnRlclxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRSb3RhdGlvblN0eWxlKCdsZWZ0LXJpZ2h0Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5zZXRSb3RhdGlvblN0eWxlKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHNldFJvdGF0aW9uU3R5bGUoc3R5bGUpIHtcbiAgICBsZXQgY3VyU3R5bGUgPSBzdHlsZTtcblxuICAgIHN0eWxlID09PSAnbm8nID8gY3VyU3R5bGUgPSAyIDogbnVsbDtcbiAgICBzdHlsZSA9PT0gJ2xlZnQtcmlnaHQnID8gY3VyU3R5bGUgPSAxIDogbnVsbDtcbiAgICBzdHlsZSA9PT0gJ2FsbCcgPyBjdXJTdHlsZSA9IDAgOiBudWxsO1xuXG4gICAgdGhpcy5yb3RhdGlvblN0eWxlID0gY3VyU3R5bGU7XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIF9yZWZyZXNoQ29zdHVtZSAtIFNldHMgdGhlIGNvc3R1bWUgYW5kIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICovXG4gIF9yZWZyZXNoQ29zdHVtZSgpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRDb3N0dW1lIC0gQWRkcyBhIGNvc3R1bWUgdG8gdGhlIHNwcml0ZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ29zdHVtZShjb3N0dW1lKSB7XG4gICAgdGhpcy5jb3N0dW1lcy5wdXNoKGNvc3R1bWUpO1xuXG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmUuXG4gICAgaWYgKCF0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbMF07XG4gICAgICB0aGlzLndpZHRoID0gdGhpcy5jb3N0dW1lLnZpc2libGVXaWR0aDtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQ7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hDb3N0dW1lVG8gLSBTd2l0Y2hlcyB0byBzcGVjaWZpZWQgY29zdHVtZS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnN3aXRjaENvc3R1bWVUbyhjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBiYWNrZHJvcCAtIHRoZSBjb3N0dW1lIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaENvc3R1bWVUbyhjb3N0dW1lKSB7XG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZihjb3N0dW1lKTtcbiAgICBjdXJyZW50Q29zdHVtZUluZGV4ICE9PSAtMSA/IHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbY3VycmVudENvc3R1bWVJbmRleF0gOiBudWxsO1xuXG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaENvc3R1bWVUb051bSAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnN3aXRjaENvc3R1bWVUb051bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaENvc3R1bWVUb051bShpbmRleCkge1xuICAgIHRoaXMuc3dpdGNoQ29zdHVtZVRvKHRoaXMuY29zdHVtZXNbaW5kZXhdKTtcbiAgfVxuXG4gIC8qKlxuICAqIG5leHRDb3N0dW1lIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5hZGRDb3N0dW1lKGNvc3R1bWUpO1xuICAqIHNwcml0ZS5uZXh0Q29zdHVtZSgpO1xuICAqXG4gICovXG4gIG5leHRDb3N0dW1lKCkge1xuICAgIGNvbnN0IGN1cnJlbnRDb3N0dW1lSW5kZXggPSB0aGlzLmNvc3R1bWVzLmluZGV4T2YodGhpcy5jb3N0dW1lKTtcbiAgICB0aGlzLmNvc3R1bWUgPSB0aGlzLmNvc3R1bWVzWyhjdXJyZW50Q29zdHVtZUluZGV4ICsgMSkgJSB0aGlzLmNvc3R1bWVzLmxlbmd0aF07XG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZSAtIFJlbW92ZXMgYSBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnJlbW92ZUNvc3R1bWUoY29zdHVtZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZShjb3N0dW1lKSB7XG4gICAgaWYgKHRoaXMuY29zdHVtZXMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZihjb3N0dW1lKTtcbiAgICAgIHRoaXMuY29zdHVtZSA9PT0gY29zdHVtZSA/IHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbKGN1cnJlbnRDb3N0dW1lSW5kZXggKyAxKSAlIHRoaXMuY29zdHVtZXMubGVuZ3RoXSA6IG51bGw7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBjb3N0dW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb3N0dW1lcyA9IFtdO1xuICAgICAgdGhpcy5jb3N0dW1lID0gbnVsbDtcbiAgICB9XG4gICAgdGhpcy5fcmVmcmVzaENvc3R1bWUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUNvc3R1bWVOdW0gLSBSZW1vdmVzIHRoZSBzcGVjaWZpZWQgY29zdHVtZSBieSBudW1iZXIgb2YgY3VycmVudCAoMCBpcyBmaXJzdCkuXG4gICogSWYgdGhlcmUgaXMgb25seSBvbmUgY29zdHVtZSwgd2lsbCBmYWlsIGFuZCBlbWl0IGEgY29uc29sZSBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLnJlbW92ZUNvc3R1bWVOdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgY29zdHVtZSB0byByZW1vdmUuXG4gICovXG4gIHJlbW92ZUNvc3R1bWVOdW0oaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUNvc3R1bWUodGhpcy5jb3N0dW1lc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogc2hvdyAtIFNob3dzIHRoZSBzcHJpdGUuIEJ5IGRlZmF1bHQgc3ByaXRlcyBhcmUgc2hvd24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmhpZGUoKTtcbiAgKiBzcHJpdGUuc2hvdygpO1xuICAqXG4gICovXG4gIHNob3coKSB7XG4gICAgdGhpcy5zaG93aW5nID0gdHJ1ZTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGhpZGUgLSBIaWRlcyB0aGUgc3ByaXRlLiBCeSBkZWZhdWx0IHNwcml0ZXMgYXJlIHNob3duLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5oaWRlKCk7XG4gICpcbiAgKi9cbiAgaGlkZSgpIHtcbiAgICB0aGlzLnNob3dpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlZnJlc2ggLSBGb3JjZXMgYSBzcHJpdGUgcmVmcmVzaC5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZCB0byBiZSB1c2VkIGlmIGNvc3R1bWUgd2FzIG1hbmlwdWxhdGVkIGRpcmVjdGx5LlxuICAqL1xuICByZWZyZXNoKCkge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAvLyB3YWl0IGEgc2VjLi4uXG4gICAgLy8gVE9ETzogVGhpcyBpcyB0byBhY2NvbW9kYXRlIGR5bmFtaWMgaW1hZ2UgcmVzaXplLiBOb3QgaWRlYWwuIFNob3VsZCBiZSBldmVudCBkcml2ZW4uXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBpbiBjYXNlIGNvc3R1bWUgd2FzIHJlc2l6ZWQgZm9yY2UgYSByZXNldCBvZiBzaXplLlxuICAgICAgbWUuc2V0U2l6ZShtZS5tYWduaWZpY2F0aW9uKTtcbiAgICAgIC8vIHRoZW4gcmVmcmVzaCB0aGUgRE9NLlxuICAgICAgbWUuZWxlbWVudCA/IG1lLmVsZW1lbnQudXBkYXRlKG1lKSA6IG51bGw7XG4gICAgfSwgdGhpcy5wYWNlKTtcbiAgfVxuXG4gIC8qKlxuICAqIHJlc2l6ZVRvSW1hZ2UgLSBzZXRzIHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBzcHJpdGUgdG8gdGhhdCBvZiB0aGUgaW1hZ2UgZmlsZSBvZiBjdXJyZW50IGNvc3R1bWUuXG4gICogTm90ZTogc2VydmljZSBtZXRob2QuIFNpbWlsYXIgdG8gY2FsbGluZyByZXNpemVUb0ltYWdlKCkgb24gY29zdHVtZSBhbmQgdGhlbiByZWZyZXNoKCkgb24gc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBjb25zdCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZShudWxsKTtcbiAgKlxuICAqIGNvbnN0IGFuZ3J5U2hlZXAgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICAqICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL3RodW1iL2QvZGIvRW1vamlvbmVfMUY0MTEuc3ZnLzIwMHB4LUVtb2ppb25lXzFGNDExLnN2Zy5wbmcnLFxuICAqIH0pO1xuICAqIGFuZ3J5U2hlZXAuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIHNwcml0ZS5yZXNpemVUb0ltYWdlKCk7XG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKi9cbiAgcmVzaXplVG9JbWFnZSgpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLmNvc3R1bWUucmVzaXplVG9JbWFnZSgpO1xuICAgIH1cblxuICAgIHRoaXMucmVmcmVzaCgpO1xuICB9XG5cbiAgLyoqXG4gICogaW5uZXIgLSBQbGFjZXMgaHRtbCBlbGVtZW50IGluc2lkZSB0aGUgY3VycmVudCBjb3N0dW1lIG9mIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmlubmVyKCc8cCBjbGFzcz1cImJpZyBjZW50ZXJlZCByYWluYm93XCI+Oik8L3A+Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5pbm5lcignSSBsaWtlIHRleHQgb25seScpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbm5lcihodG1sKSB7XG4gICAgdGhpcy5jb3N0dW1lLmlubmVyKGh0bWwpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaW5zZXJ0IC0gUGxhY2VzIGEgRE9NIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5zZXJ0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1odG1sLWNyZWF0aW9uJykpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbnNlcnQoZWwpIHtcbiAgICB0aGlzLmNvc3R1bWUuaW5zZXJ0KGVsKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIF9yZWZyZXNoU2l6ZSAtIFNldHMgdGhlIHNwcml0ZSB3aWR0aCBhbmQgaGlnaHQgaW4gcmVsYXRpb24gdG8gb3JpZ2luYWwgdGhlbiByZWZyZXNoZXMgZWxlbWVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtvYmplY3R9IGNvc3R1bWUgLSB0aGUgY29zdHVtZSB0byBhZGQuXG4gICovXG4gIF9yZWZyZXNoU2l6ZSgpIHtcbiAgICAvKipcbiAgICAqIGRlY2ltYWxSb3VuZCAtIHJvdW5kcyBhIG51bWJlciB0b28gZGVjaW1hbCBwb2ludHMuXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlIC0gdGhlIHZhbHVlIHRvIHJvdW5kLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50cyAtIGhvdyBtYW55IGRlY2ltYWwgcG9pbnRzIHRvIGxlYXZlLlxuICAgICovXG4gICAgZnVuY3Rpb24gZGVjaW1hbFJvdW5kKHZhbHVlLCBwb2ludHMpIHtcbiAgICAgIHJldHVybiBNYXRoLnJvdW5kKHZhbHVlICogKDEwICoqIHBvaW50cykpIC8gKDEwICoqIHBvaW50cyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy53aWR0aCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUud2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgICB0aGlzLmhlaWdodCA9IGRlY2ltYWxSb3VuZCh0aGlzLmNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpO1xuXG4gICAgICB0aGlzLmNvc3R1bWVzLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgY29uc3QgY29zdHVtZSA9IGl0ZW07XG4gICAgICAgIGNvc3R1bWUudmlzaWJsZVdpZHRoID0gZGVjaW1hbFJvdW5kKGNvc3R1bWUud2lkdGggKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG4gICAgICAgIGNvc3R1bWUudmlzaWJsZUhlaWdodCA9IGRlY2ltYWxSb3VuZChjb3N0dW1lLmhlaWdodCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICAgIHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XG5cbiAgICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVNpemUgLSBDaGFuZ2VzIHRoZSBzaXplIG9mIHRoZSBzcHJpdGUgYnkgc3BlY2lmaWVkIHBlcmNlbnRhZ2UgbnVtYmVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5jaGFuZ2VTaXplKDUwKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2UgLSB0aGUgcGVyY2VudGFnZSBjaGFuZ2UuXG4gICovXG4gIGNoYW5nZVNpemUoY2hhbmdlKSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gdGhpcy5tYWduaWZpY2F0aW9uICsgY2hhbmdlO1xuXG4gICAgdGhpcy5fcmVmcmVzaFNpemUoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFNpemUgLSBTZXRzIHRoZSBzaXplIG9mIHRoZSBzcHJpdGUgdG8gdGhlIHNwZWNpZmllZCBwZXJjZW50YWdlIG51bWJlci5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0U2l6ZSgxNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBlcmNlbnQgLSB0aGUgcGVyY2VudGFnZSB0byBzZXQuXG4gICovXG4gIHNldFNpemUocGVyY2VudCkge1xuICAgIHRoaXMubWFnbmlmaWNhdGlvbiA9IHBlcmNlbnQ7XG5cbiAgICB0aGlzLl9yZWZyZXNoU2l6ZSgpO1xuICB9XG5cbiAgLyoqIFRleHQgVUkgKiAqL1xuXG4gIC8qKlxuICAqIHRoaW5rIC0gQ3JlYXRlcyBhIFwidGhpbmsgYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS50aGluaygnSSB0aGluayB0aGVyZWZvcmUgSSBhbS4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHRoaW5rKHRleHQpIHtcbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHR1aSA/IHRoaXMudGV4dHVpID0gdGhpcy50ZXh0dWkuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KHRoaXMsICd0aGluaycsIHRleHQpIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB0aGlua1dhaXQgLSBDcmVhdGVzIGEgXCJ0aGluayBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUgZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS50aGlua1dhaXQoJ0kgdGhpbmsgdGhlcmVmb3JlIEkgYW0uJywgMyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC5cbiAgKi9cbiAgdGhpbmtXYWl0KHRleHQsIHNlYywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy50aGluaygnJyk7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSwgc2VjICogMTAwMCk7XG4gICAgdGhpcy50aGluayh0ZXh0KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNheSAtIENyZWF0ZXMgYSBcInNwZWVjaCBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheSgnSXQgaXMgbm90IHRoZSBjb25zY2lvdXNuZXNzIG9mIG1lbiB0aGF0IGRldGVybWluZXMgdGhlaXIgYmVpbmcsIGJ1dCwgb24gdGhlIGNvbnRyYXJ5LCB0aGVpciBzb2NpYWwgYmVpbmcgdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGNvbnNjaW91c25lc3MuJyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqL1xuICBzYXkodGV4dCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGV4dHVpID8gdGhpcy50ZXh0dWkgPSB0aGlzLnRleHR1aS5kZWxldGUodGhpcykgOiBudWxsO1xuICAgICAgdHlwZW9mIHRleHQgIT09ICd1bmRlZmluZWQnICYmIHRleHQudG9TdHJpbmcoKSA/IHRoaXMudGV4dHVpID0gbmV3IFRleHRVaUVsZW1lbnQodGhpcywgJ3NheScsIHRleHQpIDogbnVsbDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBzYXlXYWl0IC0gQ3JlYXRlcyBhIFwic3BlZWNoIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZSBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNheVdhaXQoJ0l0IGlzIG5vdCB0aGUgY29uc2Npb3VzbmVzcyBvZiBtZW4gdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGJlaW5nLCBidXQsIG9uIHRoZSBjb250cmFyeSwgdGhlaXIgc29jaWFsIGJlaW5nIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBjb25zY2lvdXNuZXNzLicsIDMpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gdGhlIG51bWJlciBvZiBzZWNvbmRzIHRvIHdhaXQuXG4gICovXG4gIHNheVdhaXQodGV4dCwgc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY2xhc3MtbWV0aG9kcy11c2UtdGhpc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zYXkoJycpO1xuICAgICAgdGhpcy5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgIH0sIHNlYyAqIDEwMDApO1xuICAgIHRoaXMuc2F5KHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICogYXNrIC0gQ3JlYXRlcyBhbiBcImFzayBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUuXG4gICogQWxsb3dzIGZvciBhbiBpbnB1dCBib3ggdG8gYmUgZGlzcGxheWVkIHRvIHRoZSB1c2VyIGFuZFxuICAqIGNhcHR1cmUgdXNlciBpbnB1dCBpbnRvIHRoZSB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgdGhlIHVzZXIuXG4gICogTm90ZSAtIHZhcmlhYmxlIGZvciBhbnN3ZXIgbXVzdCBiZSBkZWNsYXJlZCBpbiBnbG9iYWwgc2NvcGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIC8vZ29vZDpcbiAgKiBsZXQgYW5zd2VyO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBhbnN3ZXIgPSB0aGlzLmFzaygnSXMgdGhlIGRlc3Rpbnkgb2YgbWFua2luZCBkZWNpZGVkIGJ5IG1hdGVyaWFsIGNvbXB1dGF0aW9uPycpO1xuICAqICAgdGhpcy5zYXkoYW5zd2VyKTtcbiAgKiB9KTtcbiAgKlxuICAqIC8vIGJhZDpcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgbGV0IGFuc3dlcjtcbiAgKiAgIGFuc3dlciA9IHRoaXMuYXNrKCdJcyB0aGUgZGVzdGlueSBvZiBtYW5raW5kIGRlY2lkZWQgYnkgbWF0ZXJpYWwgY29tcHV0YXRpb24/Jyk7XG4gICogICB0aGlzLnNheShhbnN3ZXIpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBvZiB0aGUgcXVlc3Rpb25cbiAgKlxuICAqL1xuICBhc2sodGV4dCwgdGhlVmFyID0gbnVsbCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBtZS5hc2tJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuXG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudChtZSwgJ2FzaycsIHRleHQpIDogbnVsbDtcblxuICAgICAgLy8gdGhpcyB3aWxsIHdhaXQgZm9yIHVzZXIgaW5wdXRcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5hc2suJHt0aGlzLmlkfS4ke21lLmFza0lkfWAsIGZ1bmN0aW9uIGFza0xpc3RlbmVyKGUpIHtcbiAgICAgICAgLy8gcmVtb3ZlIGl0LlxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGBibG9ja0xpa2UuYXNrLiR7bWUuaWR9LiR7bWUuYXNrSWR9YCwgYXNrTGlzdGVuZXIpO1xuICAgICAgICAvLyB0aGlzIGlzIHRoZSB3YWl0ZWQgbWV0aG9kIGxpc3RlbmVyLiByZWxlYXNlIGl0LlxuICAgICAgICBtZS5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgICAvLyBzZXQgdGhlIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB0byB0aGUgY2FwdHVyZWQgdmFsdWUuXG4gICAgICAgIHRoZVZhciA/IG1lLl9zZXRUb1Zhcih0aGVWYXIsIGUuZGV0YWlsLnZhbHVlKSA6IG51bGw7XG4gICAgICAgIC8vIHJlbW92ZSB0aGUgVUkuXG4gICAgICAgIG1lLnRleHR1aSA/IG1lLnRleHR1aSA9IG1lLnRleHR1aS5kZWxldGUobWUpIDogbnVsbDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKiBQZW4gKiAqL1xuXG4gIC8qKlxuICAqIHBlbkNsZWFyIC0gQ2xlYXJzIHRoZSBkcmF3aW5nIHN1cmZhY2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuQ2xlYXIoKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBwZW5DbGVhcigpIHtcbiAgICB0aGlzLnN1cmZhY2UuY2xlYXIodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBwZW5Eb3duIC0gXCJBY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqIFdoZW4gYWN0aXZhdGVkIHNwcml0ZSBtb3Rpb24gd2lsbCBjcmVhdGUgdGhlIGRyYXdpbmcgb24gdGhlIHN0YWdlJ3MgY2FudmFzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlbkRvd24oKSB7XG4gICAgdGhpcy5kcmF3aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnByZXZYID0gdGhpcy54O1xuICAgIHRoaXMucHJldlkgPSB0aGlzLnk7XG4gICAgdGhpcy5zdXJmYWNlLmRyYXcodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBwZW5VcCAtIFwiRGVhY3RpdmF0ZXNcIiBkcmF3aW5nIGJ5IHNldHRpbmcgcmVxdWlyZWQgdmFsdWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnBlbkRvd24oKTtcbiAgKiAgIHRoaXMubW92ZSgxMDApO1xuICAqICAgdGhpcy5wZW5VcCgpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlblVwKCkge1xuICAgIHRoaXMuZHJhd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc3VyZmFjZS5kcmF3KHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0UGVuQ29sb3IgLSBTZXRzIHRoZSBjb2xvciBvZiB0aGUgcGVuLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRQZW5Db2xvcignI2ZmMDAwMCcpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS5zZXRQZW5Db2xvcigncmVkJylcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBjb2xvclN0cmluZyAtIGEgdmFsaWQgY29sb3IgZGVmaW5pdGlvbiBmb3IgY2FudmFzIHN0cm9rZVN0eWxlLlxuICAqL1xuICBzZXRQZW5Db2xvcihjb2xvclN0cmluZykge1xuICAgIHRoaXMucGVuQ29sb3IgPSBjb2xvclN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAqIHNldFBlblNpemUgLSBTZXRzIHRoZSBzaXplIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFBlblNpemUoMTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIGEgbnVtYmVyIGZvciBjYW52YXMgbGluZVdpZHRoLlxuICAqL1xuICBzZXRQZW5TaXplKHBpeGVscykge1xuICAgIHRoaXMucGVuU2l6ZSA9IHBpeGVscztcbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVBlblNpemUgLSBDaGFuZ2VzIHRoZSBzaXplIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlUGVuU2l6ZSgxMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gY2hhbmdlIC0gdGhlIGNoYW5nZSBpbiBwaXhlbHMuXG4gICovXG4gIGNoYW5nZVBlblNpemUoY2hhbmdlKSB7XG4gICAgdGhpcy5wZW5TaXplID0gdGhpcy5wZW5TaXplICsgY2hhbmdlO1xuICB9XG5cbiAgLyogU2Vuc2luZyAqL1xuXG4gIC8qKlxuICAqIGRpc3RhbmNlVG8gLSBSZXR1cm5zIHRoZSBkaXN0YW5jZSB0byBhIHBvaW50IG9uIHRoZSBzY3JlZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2Uoe3NlbnNpbmc6IHRydWV9KTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHNwcml0ZS5zYXkodGhpcy5kaXN0YW5jZVRvKHRoaXMubW91c2VYLCB0aGlzLm1vdXNlWSkpXG4gICogfSk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5vdGhlclNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHNwcml0ZS5zYXkodGhpcy5kaXN0YW5jZVRvKG90aGVyU3ByaXRlLngsIG90aGVyU3ByaXRlLnkpKVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKiBAcmV0dXJuIHtudW1iZXJ9IC0gZGlzdGFuY2UgaW4gcGl4ZWxzIHRvIHBvc2l0aW9uIG9uIHNjcmVlbiAobm90IHJvdW5kZWQpLlxuICAqL1xuICBkaXN0YW5jZVRvKHgsIHkpIHtcbiAgICBjb25zdCBkeCA9IHRoaXMueCAtIHg7XG4gICAgY29uc3QgZHkgPSB0aGlzLnkgLSB5O1xuXG4gICAgcmV0dXJuIE1hdGguc3FydCgoZHggKiBkeCkgKyAoZHkgKiBkeSkpO1xuICB9XG5cbiAgLyoqXG4gICogdG91Y2hpbmdFZGdlIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgdGhlIGVkZ2Ugb2YgdGhlIHN0YWdlIGFuZCByZXR1cm5zIHRoZSBlZGdlIHRvdWNoZWQuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gdGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKHRoaXMueCA8IHN0YWdlLndpZHRoIC8gMikge1xuICAqICAgIHRoaXMubW92ZSgxMClcbiAgKiAgICB0aGlzLnNheSh0aGlzLnRvdWNoaW5nRWRnZSgpKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge3N0cmluZ30gLSB0aGUgc2lkZSBvZiB0aGUgc3RhZ2UgdGhhdCBpcyB0b3VjaGVkIChudWxsLCB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQpXG4gICovXG4gIHRvdWNoaW5nRWRnZSgpIHtcbiAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgIGlmICgodGhpcy54KSArICh0aGlzLndpZHRoIC8gMikgPiB0aGlzLnN0YWdlV2lkdGggLyAyKSB7XG4gICAgICByZXN1bHQgPSAncmlnaHQnO1xuICAgIH1cbiAgICBpZiAoKHRoaXMueCkgLSAodGhpcy53aWR0aCAvIDIpIDwgLTEgKiAodGhpcy5zdGFnZVdpZHRoIC8gMikpIHtcbiAgICAgIHJlc3VsdCA9ICdsZWZ0JztcbiAgICB9XG4gICAgaWYgKCh0aGlzLnkpICsgKHRoaXMuaGVpZ2h0IC8gMikgPiB0aGlzLnN0YWdlSGVpZ2h0IC8gMikge1xuICAgICAgcmVzdWx0ID0gJ3RvcCc7XG4gICAgfVxuICAgIGlmICgodGhpcy55KSAtICh0aGlzLmhlaWdodCAvIDIpIDwgLTEgKiAodGhpcy5zdGFnZUhlaWdodCAvIDIpKSB7XG4gICAgICByZXN1bHQgPSAnYm90dG9tJztcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZ0VkZ2UgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyB0aGUgZWRnZS5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiB0aGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUodGhpcy54IDwgc3RhZ2Uud2lkdGggLyAyKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKVxuICAqICAgIHRoaXMuc2F5KHRoaXMuaXNUb3VjaGluZ0VkZ2UoKSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBzcHJpdGUgdG91Y2hpbmcgdGhlIGVkZ2UuXG4gICovXG4gIGlzVG91Y2hpbmdFZGdlKCkge1xuICAgIHJldHVybiAhIXRoaXMudG91Y2hpbmdFZGdlKCk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZyAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIGFub3RoZXIgYW5kIHJldHVybnMgYXQgd2hhdCBzaWRlIGl0IHRvdWNoZXMuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiB0aGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICogMi4gaWYgdGhlIHNwcml0ZSBoYXMgZ29uZSBcImludG9cIiB0aGUgb3RoZXIgdGhlIHNpZGUgXCJwZW5ldHJhdGVkIG1vcmVcIiB3aWxsIGJlIHJldHVybmVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMjAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSghdGhpcy50b3VjaGluZyhvdGhlclNwcml0ZSkpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApO1xuICAqICAgIHRoaXMuc2F5KHRoaXMudG91Y2hpbmcob3RoZXJTcHJpdGUpKVxuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gY2hlY2sgaWYgdG91Y2hpbmcuXG4gICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzaWRlIG9mIHRoZSBzcHJpdGUgdGhhdCBpcyB0b3VjaGVkIChudWxsLCB0b3AsIGJvdHRvbSwgbGVmdCwgcmlnaHQpXG4gICovXG4gIHRvdWNoaW5nKHNwcml0ZSkge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKFxuICAgICAgdGhpcy54ICsgKHRoaXMud2lkdGggLyAyKSA+IHNwcml0ZS54IC0gKHNwcml0ZS53aWR0aCAvIDIpICYmXG4gICAgICB0aGlzLnggLSAodGhpcy53aWR0aCAvIDIpIDwgc3ByaXRlLnggKyAoc3ByaXRlLndpZHRoIC8gMikgJiZcbiAgICAgIHRoaXMueSArICh0aGlzLmhlaWdodCAvIDIpID4gc3ByaXRlLnkgLSAoc3ByaXRlLmhlaWdodCAvIDIpICYmXG4gICAgICB0aGlzLnkgLSAodGhpcy5oZWlnaHQgLyAyKSA8IHNwcml0ZS55ICsgKHNwcml0ZS5oZWlnaHQgLyAyKVxuICAgICkge1xuICAgICAgdGhpcy54ID49IHNwcml0ZS54ID8gcmVzdWx0ID0gJ2xlZnQnIDogbnVsbDtcbiAgICAgIHRoaXMueCA8IHNwcml0ZS54ID8gcmVzdWx0ID0gJ3JpZ2h0JyA6IG51bGw7XG4gICAgICB0aGlzLnkgPiBzcHJpdGUueSAmJiBNYXRoLmFicyh0aGlzLnkgLSBzcHJpdGUueSkgPiBNYXRoLmFicyh0aGlzLnggLSBzcHJpdGUueCkgPyByZXN1bHQgPSAnYm90dG9tJyA6IG51bGw7XG4gICAgICB0aGlzLnkgPCBzcHJpdGUueSAmJiBNYXRoLmFicyh0aGlzLnkgLSBzcHJpdGUueSkgPiBNYXRoLmFicyh0aGlzLnggLSBzcHJpdGUueCkgPyByZXN1bHQgPSAndG9wJyA6IG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAqIGlzVG91Y2hpbmcgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyBhbm90aGVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IG90aGVyU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLm1vdmUoMjAwKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSghdGhpcy5pc1RvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBzcHJpdGUgdG91Y2hpbmcgdGhlIHNwZWNpZmllZCBzcHJpdGUuXG4gICovXG4gIGlzVG91Y2hpbmcoc3ByaXRlKSB7XG4gICAgcmV0dXJuICEhdGhpcy50b3VjaGluZyhzcHJpdGUpO1xuICB9XG5cbiAgLyoqXG4gICogdG91Y2hpbmdCYWNrZHJvcENvbG9yIC0gUmV0dXJucyB0aGUgaGV4IHZhbHVlIHRvIGFsbCBwaXhlbHMgaW4gYmFja2Ryb3AgYXJlYSBjb3ZlcmVkIGJ5IHRoZSBzcHJpdGUgcmVjdGFuZ2xlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIFRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAzLiBUaGUgYmFja2Ryb3AgaW1hZ2UgbXVzdCBiZSBhIGxvY2FsIGltYWdlIHNlcnZlZCBmcm9tIHNhbWUgb3JpZ2luLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB3aGlsZSh0cnVlKXtcbiAgKiAgICAgbGV0IHRvdWNoZWRDb2xvcnMgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcigpO1xuICAqICAgICB0aGlzLnNheSh0b3VjaGVkQ29sb3JzKTtcbiAgKiAgICAgdGhpcy5tb3ZlKDUpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7YXJyYXl9IC0gY29sb3JzIChzdHJpbmdzKSB0b3VjaGVkLlxuICAqL1xuICB0b3VjaGluZ0JhY2tkcm9wQ29sb3IoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG5cbiAgICAvKipcbiAgICAqIHJnYlRvSGV4IC0gY29udmVydHMgYSBjb2xvciBkZWZpbmVkIGJ5IFJHQiB2YWx1ZXMgaW50byBhIG9uIGRlZmluZWQgYXMgYSBoZXggc3RyaW5nLlxuICAgICpcbiAgICAqIEZyb206IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU2MjM4MzgvcmdiLXRvLWhleC1hbmQtaGV4LXRvLXJnYlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSByIC0gdGhlIHJlZCB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGcgLSB0aGUgZ3JlZW4gdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBiIC0gIHRoZSBibHVlIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gaGV4IGNvbG9yIHN0cmluZy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIpIHtcbiAgICAgIHJldHVybiBgIyR7KCgxIDw8IDI0KSArIChyIDw8IDE2KSArIChnIDw8IDgpICsgYikudG9TdHJpbmcoMTYpLnNsaWNlKDEpfWA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tYml0d2lzZVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBiYWNrZHJvcENvbnRleHQgPSB0aGlzLmFnYWluc3RCYWNrZHJvcC5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgY29uc3QgZGF0YSA9IGJhY2tkcm9wQ29udGV4dC5nZXRJbWFnZURhdGEoKCh0aGlzLnN0YWdlV2lkdGggLyAyKSAtICh0aGlzLndpZHRoIC8gMikpICsgdGhpcy54LCAoKHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSAtICh0aGlzLmhlaWdodCAvIDIpKSAtIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpLmRhdGE7XG5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkgKz0gNCkge1xuICAgICAgICBkYXRhW2kgKyAzXSAhPT0gMCA/IHJlc3VsdC5wdXNoKHJnYlRvSGV4KGRhdGFbaV0sIGRhdGFbaSArIDFdLCBkYXRhW2kgKyAyXSkpIDogbnVsbDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmxvZygnQmxvY2tMaWtlLmpzIE5vdGljZTogaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IoKSBpbmdub3JlZC4gQmFja2Ryb3AgaW1hZ2UgY2FuIG5vdCBiZSBsb2NhdGVkIGF0IGEgcmVtb3RlIG9yaWdpbi4nKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgfVxuXG4gICAgcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChyZXN1bHQpKTtcbiAgfVxuXG4gIC8qKlxuICAqIGlzVG91Y2hpbmdCYWNrZHJvcENvbG9yIC0gY29tcGFyZXMgYSBnaXZlbiBoZXggdmFsdWUgdG8gYWxsIHBpeGVscyBpbiBiYWNrZHJvcCBhcmVhIGNvdmVyZWQgYnkgdGhlIHNwcml0ZSByZWN0YW5nbGUuXG4gICogSWYgYSBtYXRjaCBpcyBmb3VuZCB0aGUgY29sb3IgaXMgcmV0dXJuZWQuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gVGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqIDMuIFRoZSBiYWNrZHJvcCBpbWFnZSBtdXN0IGJlIGEgbG9jYWwgaW1hZ2Ugc2VydmVkIGZyb20gc2FtZSBvcmlnaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogbGV0IG1vdmluZyA9IHRydWU7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHdoaWxlKG1vdmluZyl7XG4gICogICAgIHRoaXMuaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IoJyNmZjAwMDAnKSA/IG1vdmluZyA9IGZhbHNlIDogbW92aW5nID0gdHJ1ZTtcbiAgKiAgICAgdGhpcy5tb3ZlKDUpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGJhY2tkcm9wQ29sb3IgLSB0aGUgY29sb3IgdG8gZXZhbHVhdGUuXG4gICogQHJldHVybiB7Ym9vbGVhbn0gLSBkb2VzIHRoZSBzcHJpdGUgdG91Y2ggdGhlIGNvbG9yLlxuICAqL1xuICBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvcihiYWNrZHJvcENvbG9yKSB7XG4gICAgY29uc3QgaGV4QXJyID0gdGhpcy50b3VjaGluZ0JhY2tkcm9wQ29sb3IoYmFja2Ryb3BDb2xvcik7XG5cbiAgICByZXR1cm4gaGV4QXJyLmluY2x1ZGVzKGJhY2tkcm9wQ29sb3IpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zcHJpdGUuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBVSSBFbGVtZW50cyBhdHRhY2hlZCB0byBhIHNwcml0ZS5cbiAqIEVhY2ggU3ByaXRlIG1heSBoYXZlIG9uZS5cbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHRVaUVsZW1lbnQge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSB1aSBlbGVtZW50IHRoYXQgXCJhdHRhaGNlc1wiIHRvIGEgc3ByaXRlLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gd2hpY2ggdGhlIHVpIGlzIGF0dGFjaGVkLlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gd2hhdCB1aSB0byBjcmVhdGUgKHNheSBidWJibGUsIHRoaW5rIGJ1YmJsZSBvciBhc2sgYm94KVxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gIHdoYXQgdGhlIHRleHQgc2FpZC90aG91Z2h0L2FzayB3aWxsIGJlLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBhc2tJZCAtIHRoZSBhc2sgYm94IGlkZW50aWZpZXIgKHVzZWQgdG8gbWFuYWdlIGV2ZW50cykuXG4gICovXG4gIGNvbnN0cnVjdG9yKHNwcml0ZSwgdHlwZSwgdGV4dCkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgLyoqXG4gICAgKiBhc2tJbnB1dCAtIGVuY2Fwc3VsYXRlIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHRoZSBpbnB1dCBmaWVsZCB1c2VkIHRvIGNhcHR1cmUgdXNlciBpbnB1dCB3aXRoIGFzaygpLlxuICAgICpcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSB0aGUgaW5wdXQgZG9tIGVsZW1lbnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBhc2tJbnB1dCgpIHtcbiAgICAgIC8qKlxuICAgICAgKiBzZW5kQW5zd2VyIC0gZGlzcGF0Y2hlcyBhbiBldmVudCB3aGVuIHRoZSB1c2VyIGhhcyBzdWJtaXR0ZWQgdGhlIGlucHV0LlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHNlbmRBbnN3ZXIodmFsdWUpIHtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGBibG9ja0xpa2UuYXNrLiR7c3ByaXRlLmlkfS4ke3Nwcml0ZS5hc2tJZH1gLCB7IGRldGFpbDogeyB2YWx1ZSwgYXNrSWQ6IHNwcml0ZS5hc2tJZCB9IH0pO1xuICAgICAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XG4gICAgICAgICAgc2VuZEFuc3dlcihpbnB1dC52YWx1ZSk7XG4gICAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBlbC5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgICAgIGNvbnN0IHN1Ym1pdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgc3VibWl0LmlubmVySFRNTCA9ICcmI3gyNzEzJztcbiAgICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2VuZEFuc3dlcihpbnB1dC52YWx1ZSk7XG4gICAgICAgIGlucHV0LnZhbHVlID0gJyc7XG4gICAgICB9KTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKHN1Ym1pdCk7XG5cbiAgICAgIHJldHVybiBpbnB1dDtcbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSB0ZXh0LnRvU3RyaW5nKCk7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcblxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMik7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpO1xuXG4gICAgZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIGVsLmlubmVySFRNTCA9IGAke3RleHR9PGJyIC8+YDtcblxuICAgIC8vIGxvb2tzXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIG5pY2VyLi4uXG4gICAgZWwuc3R5bGUubGVmdCA9IGAkeyhzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgeCArIChzcHJpdGUud2lkdGggKiAwLjYpfXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeSkgLSA4MCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gc3ByaXRlLno7XG4gICAgZWwuY2xhc3NOYW1lID0gYGJsb2NrbGlrZS0ke3R5cGV9YDtcblxuICAgIGxldCBpZWwgPSBudWxsO1xuICAgIGlmICh0eXBlID09PSAnYXNrJykge1xuICAgICAgaWVsID0gYXNrSW5wdXQoc3ByaXRlLCBlbCk7XG4gICAgICBlbC5zdHlsZS50b3AgPSBgJHsoKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeSkgLSAxMTAgLSAoTWF0aC5mbG9vcih0aGlzLnRleHQubGVuZ3RoIC8gMzApICogMTYpfXB4YDtcbiAgICB9XG5cbiAgICBzcHJpdGUuZWxlbWVudC5lbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgc3ByaXRlLmVsZW1lbnQuZWwpO1xuICAgIGllbCA/IGllbC5mb2N1cygpIDogbnVsbDtcblxuICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBgJHsoc3ByaXRlLnNob3dpbmcgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9YDtcblxuICAgIHRoaXMuZWwgPSBlbDtcbiAgfVxuXG4gIC8qKlxuICAqIHVwZGF0ZSAtIHVwZGF0ZWQgdGhlIERPTSBlbGVtZW50IChtb3ZlcyB3aXRoIHNwcml0ZSkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICovXG4gIHVwZGF0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS50ZXh0dWkuZWw7XG5cbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeCBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeCA9IHNwcml0ZS54IC0gKHNwcml0ZS53aWR0aCAvIDIpO1xuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB5ID0gKHNwcml0ZS55ICogLTEpIC0gKHNwcml0ZS5oZWlnaHQgLyAyKTtcblxuICAgIC8vIGxvb2tzXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIG5pY2VyLi4uXG4gICAgZWwuc3R5bGUubGVmdCA9IGAkeyhzcHJpdGUuc3RhZ2VXaWR0aCAvIDIpICsgeCArIChzcHJpdGUud2lkdGggKiAwLjYpfXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgeSkgLSA4MCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuXG4gICAgaWYgKHNwcml0ZS50ZXh0dWkudHlwZSA9PT0gJ2FzaycpIHtcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDExMCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuICAgIH1cblxuICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBgJHsoc3ByaXRlLnNob3dpbmcgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9YDtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIGRlbGV0ZXMgdGhlIERPTSBlbGVtZW50IChoaWRlcyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICovXG4gIGRlbGV0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS50ZXh0dWkuZWw7XG5cbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdGV4dC11aS1lbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9