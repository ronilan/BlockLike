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
      'keydown|keyup|keypress'.indexOf(eventStr) !== -1 ? attachTo = document : null;

      attachTo.addEventListener(eventStr, (e) => {
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
    /**
    * enableSensing - Enables sensing of document level events (keydown, mousemove, mousedown, touchmove)
    */
    function enableSensing(stage) {
      const me = stage;
      me.sensing = true;

      /**
      * computeX - Computes centered x based on x extracted from event.
      */
      function computeX(x) {
        return x - me.element.el.offsetLeft - (me.width / 2);
      }

      /**
      * computeY - Computes centered y based on y extracted from event.
      */
      function computeY(y) {
        return -y + me.element.el.offsetTop + (me.height / 2);
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
        me.mouseX = computeX(e.x);
        me.mouseY = computeY(e.y);
      });

      me.element.el.addEventListener('touchmove', (e) => {
        me.mouseX = computeX(e.changedTouches[0].clientX);
        me.mouseY = computeY(e.changedTouches[0].clientY);
      });

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
      });
      me.element.el.addEventListener('touchend', () => {
        me.mouseDown = false;
        delete me.mouseX;
        delete me.mouseY;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQ1Njk0ZTQxY2Q3NDYxOThkNjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VsZW1lbnQtY3NzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLXN1cmZhY2UuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9sb29rLmpzIiwid2VicGFjazovLy8uL3NyYy9jb3N0dW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9saWIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RvY3VtZW50LWNzcy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGxhdGZvcm1zLmpzIiwid2VicGFjazovLy8uL3NyYy9zdGFnZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmV3cml0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N0YWdlLWVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2JhY2tkcm9wLmpzIiwid2VicGFjazovLy8uL3NyYy9zcHJpdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHQtdWktZWxlbWVudC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7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QTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsVUFBVSxRQUFRLEVBQUU7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFVBQVUsUUFBUSxFQUFFO0FBQ25FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7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QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DOztBQUVuQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGNBQWMsT0FBTztBQUNyQixjQUFjLE9BQU87QUFDckIsY0FBYyxPQUFPO0FBQ3JCLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE9BQU87QUFDdkIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7O0FBRWhEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsS0FBSzs7QUFFM0I7QUFDQTtBQUNBLHVCQUF1QixtREFBbUQ7QUFDMUUsc0JBQXNCLCtFQUErRTs7QUFFckc7QUFDQSxnQ0FBZ0MsS0FBSzs7QUFFckM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdGQUFnRjtBQUN4Rzs7QUFFQTtBQUNBOztBQUVBLDZCQUE2Qix3Q0FBd0M7O0FBRXJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG1EQUFtRDtBQUMxRSxzQkFBc0IsK0VBQStFOztBQUVyRztBQUNBLHdCQUF3QixnRkFBZ0Y7QUFDeEc7O0FBRUEsNkJBQTZCLHdDQUF3QztBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQSIsImZpbGUiOiJibG9ja2xpa2UtMC45LjguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2KTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmZDU2OTRlNDFjZDc0NjE5OGQ2MiIsIi8qKlxuKiBFbmNhcHN1bGF0ZXMgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgbWFuYWdpbmcgZWxlbWVudCBzdHlsZSBwcm9wZXJ0aWVzIGZvciB0aGUgZW50aXRpZXMuXG4qL1xuXG4vKipcbiogYXBwbHkgLSBhcHBseSBjc3NSdWxlcyBvZiBhbiBlbnRpdHkgdG8gaXRzIERPTSBlbGVtZW50LlxuKlxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBlbnRpdHkgLSBhIFNwcml0ZSBvciBTdGFnZS5cbiovXG5leHBvcnQgZnVuY3Rpb24gYXBwbHkoZW50aXR5KSB7XG4gIGNvbnN0IGN1ckVudGl0eSA9IGVudGl0eTtcbiAgY29uc3QgZWwgPSBlbnRpdHkuZWxlbWVudC5lbDtcblxuICAvLyBTcHJpdGVzIGhhdmUgQ29zdHVtZXMsIFN0YWdlIGhhcyBCYWNrZHJvcCwgZmlndXJlIG91dCB3aGljaCBlbnRpdHkgaXQgaXMuXG4gIGVudGl0eS5iYWNrZHJvcCA/IGN1ckVudGl0eS5sb29rID0gZW50aXR5LmJhY2tkcm9wIDogY3VyRW50aXR5Lmxvb2sgPSBlbnRpdHkuY29zdHVtZTtcbiAgZW50aXR5LmJhY2tkcm9wcyA/IGN1ckVudGl0eS5sb29rcyA9IGVudGl0eS5iYWNrZHJvcHMgOiBjdXJFbnRpdHkubG9va3MgPSBlbnRpdHkuY29zdHVtZXM7XG5cbiAgLy8gcmVtb3ZlIGFueSBzdHlsZSBhcHBsaWVkIGJ5IGFueSBsb29rXG4gIGlmIChjdXJFbnRpdHkubG9va3MpIHtcbiAgICBjdXJFbnRpdHkubG9va3MuZm9yRWFjaCgoYikgPT4ge1xuICAgICAgYi5jc3NSdWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IGNhbWVsQ2FzZWQgPSBpdGVtLnByb3AucmVwbGFjZSgvLShbYS16XSkvZywgZyA9PiBnWzFdLnRvVXBwZXJDYXNlKCkpO1xuICAgICAgICBlbC5zdHlsZVtjYW1lbENhc2VkXSA9ICcnO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBhZGQgY3VycmVudCBsb29rIHN0eWxlc1xuICBpZiAoY3VyRW50aXR5Lmxvb2spIHtcbiAgICBjdXJFbnRpdHkubG9vay5jc3NSdWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBjYW1lbENhc2VkID0gaXRlbS5wcm9wLnJlcGxhY2UoLy0oW2Etel0pL2csIGcgPT4gZ1sxXS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgIGVsLnN0eWxlW2NhbWVsQ2FzZWRdID0gaXRlbS52YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFkZCBjdXJFbnRpdHkgc3R5bGVzLiBNdXN0IGJlIGRvbmUgYWZ0ZXIgbG9vayBzdHlsZXMuXG4gIGN1ckVudGl0eS5jc3NSdWxlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgY29uc3QgY2FtZWxDYXNlZCA9IGl0ZW0ucHJvcC5yZXBsYWNlKC8tKFthLXpdKS9nLCBnID0+IGdbMV0udG9VcHBlckNhc2UoKSk7XG4gICAgZWwuc3R5bGVbY2FtZWxDYXNlZF0gPSBpdGVtLnZhbHVlO1xuICB9KTtcbn1cblxuLyoqXG4qIHJlZ2lzdGVyIC0gcmVnaXN0ZXIgY3NzUnVsZXMgb2YgZm9yIGFuIGVudGl0eSBiYXNlZCBvbiB1c2VyIGlucHV0LlxuKiBOb3RlOiBBbGwgcnVsZXMgYXJlIHJlZ2lzdGVyZWQgZGFzaC1jYXNlIGEtbGEgY3NzLlxuKiBUaGlzIGlzIHJlZ2FyZGxlc3Mgb2YgaG93IHRoZXkgYXJlIHNldCBhbmQgdGhvdWdoIHRoZXkgYXJlIHVzZWQgY2FtZWxDYXNlLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAtIHRoZSBjc3MgcHJvcGVydHkgKGUuZy4gY29sb3IpLiBBbHRlcm5hdGl2ZWx5IGFuIG9iamVjdCB3aXRoIGtleTogdmFsdWUgcGFpcnMuXG4qIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuKiBAcGFyYW0ge2Z1bmN0aW9ufSBlbnRpdHkgLSBhIFNwcml0ZSBvciBTdGFnZS5cbiovXG5leHBvcnQgZnVuY3Rpb24gcmVnaXN0ZXIocHJvcCwgdmFsdWUsIGVudGl0eSkge1xuICBjb25zdCBjdXJFbnRpdHkgPSBlbnRpdHk7XG5cbiAgaWYgKHR5cGVvZiBwcm9wID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZGFzaGVkID0gcHJvcC5yZXBsYWNlKC8oW0EtWl0pL2csICQxID0+IGAtJHskMS50b0xvd2VyQ2FzZSgpfWApO1xuICAgIGN1ckVudGl0eS5jc3NSdWxlcy5wdXNoKHsgcHJvcDogZGFzaGVkLCB2YWx1ZSB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcgJiYgIXZhbHVlKSB7XG4gICAgT2JqZWN0LmtleXMocHJvcCkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb25zdCBkYXNoZWQgPSBrZXkucmVwbGFjZSgvKFtBLVpdKS9nLCAkMSA9PiBgLSR7JDEudG9Mb3dlckNhc2UoKX1gKTtcbiAgICAgIGN1ckVudGl0eS5jc3NSdWxlcy5wdXNoKHsgcHJvcDogZGFzaGVkLCB2YWx1ZTogcHJvcFtrZXldIH0pO1xuICAgIH0pO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9lbGVtZW50LWNzcy5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgcmV3cml0ZSBmcm9tICcuL3Jld3JpdGVyJztcbmltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW4gZW50aXR5LlxuICogQWJzdHJhY3QgZm9yIFN0YWdlIGFuZCBTcHJpdGUuXG4gKiBEbyBub3QgaW5zdGFudGlhdGUgb2JqZWN0cyBkaXJlY3RseSBmcm9tIHRoaXMgY2xhc3MuXG4gKlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRW50aXR5IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBFbnRpdHkgaXMgYWJzdHJhY3QgZm9yIFN0YWdlIGFuZCBTcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGFjZSAtIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHBhY2UgcGFjZWQgbWV0aG9kcy5cbiAgKi9cbiAgY29uc3RydWN0b3IocGFjZSkge1xuICAgIEVudGl0eS5tZXNzYWdlTGlzdGVuZXJzID0gW107XG4gICAgdGhpcy5pZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIHRoaXMucGFjZSA9IHBhY2U7XG4gICAgdGhpcy5zb3VuZHMgPSBbXTsgLy8gd2lsbCBob2xkIGFsbCBzb3VuZHMgY3VycmVudGx5IHBsYXllZCBieSBlbnRpdHksIGlmIGFueS5cbiAgICAvKlxuICAgICogUGFjZWQgbWV0aG9kcyB3b3JrIGluIHRoZSBmb2xsb3dpbmcgbWFubmVyOlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHBhY2VkIG1ldGhvZHMgcmV3cml0ZXIgd2lsbCBhZGQgYW4gYXdhaXQgdG8gYSBwcm9taXNlIGFmdGVyIHRoZSBwYWNlZCBtZXRob2QgY2FsbC5cbiAgICAqIDMuIFRoZSBwcm9taXNlIHdpbGwgcmVzb2x2ZSBhZnRlciB7cGFjZX0gbWlsbGlzZWNvbmRzLlxuICAgICpcbiAgICAqIFRoaXMgYWxsb3dzIHRoZSBwYWNlZCBtZXRob2QgdG8gaGFsdCBleGVjdXRpb24gb2YgYW55IGNvZGUgZm9sbG93aW5nIGl0IHVudGlsIGl0IGlzIGRvbmUuXG4gICAgKi9cbiAgICB0aGlzLnBhY2VkID0gW1xuICAgICAgJ2dvVG8nLFxuICAgICAgJ21vdmUnLFxuICAgICAgJ2NoYW5nZVgnLFxuICAgICAgJ2NoYW5nZVknLFxuICAgICAgJ3NldFgnLFxuICAgICAgJ3NldFknLFxuICAgICAgJ2dvVG93YXJkcycsXG4gICAgICAndHVyblJpZ2h0JyxcbiAgICAgICd0dXJuTGVmdCcsXG4gICAgICAncG9pbnRJbkRpcmVjdGlvbicsXG4gICAgICAncG9pbnRUb3dhcmRzJyxcbiAgICAgICdjaGFuZ2VTaXplJyxcbiAgICAgICdzZXRTaXplJyxcbiAgICAgICdzYXknLFxuICAgICAgJ3RoaW5rJyxcbiAgICAgICdyZWZyZXNoJyxcbiAgICBdO1xuXG4gICAgLypcbiAgICAqIFdhaXRlZCBtZXRob2RzIHdvcmsgaW4gdGhlIGZvbGxvd2luZyBtYW5uZXI6XG4gICAgKiAxLiBFdmVudCBNZXRob2QgZnVuY3Rpb25zIGFyZSByZXdyaXR0ZW4uXG4gICAgKiAyLiBGb3Igd2FpdGVkIG1ldGhvZHMgcmV3cml0ZXIgd2lsbCBhZGQgYW4gYXdhaXQgdG8gYSBwcm9taXNlIGFmdGVyIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSBpbmNsdWRlcyBhIGRvY3VtZW50IGxldmVsIGV2ZW50IGxpc3RlbmVyLlxuICAgICogNC4gcmV3cml0ZXIgbW9kaWZpZXMgdGhlIHdhaXRlZCBtZXRob2QgY2FsbCwgaW5zZXJ0aW5nIGEgdHJpZ2dlcmluZ0lkIHBhcmFtZXRlci5cbiAgICAqIDQuIFRoZSBldmVudCBsaXN0ZW5lciBpcyB1bmlxdWUgdG8gdGhlIHRyaWdnZXJpbmdJZC5cbiAgICAqIDUuIFdoZW4gdGhlIG1ldGhvZCBjb21wbGV0ZXMgcnVubmluZyBhbiBldmVudCBpcyBkaXNwYXRjaGVkIHJlc29sdmluZyB0aGUgcHJvbWlzZS5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgd2FpdGVkIG1ldGhvZCB0byBoYWx0IGV4ZWN1dGlvbiBvZiBhbnkgY29kZSBmb2xsb3dpbmcgaXQgdW50aWwgaXQgaXMgZG9uZS5cbiAgICAqL1xuICAgIHRoaXMud2FpdGVkID0gW1xuICAgICAgJ3dhaXQnLFxuICAgICAgJ2dsaWRlJyxcbiAgICAgICdzYXlXYWl0JyxcbiAgICAgICd0aGlua1dhaXQnLFxuICAgICAgJ3BsYXlTb3VuZFVudGlsRG9uZScsXG4gICAgICAnYnJvYWRjYXN0TWVzc2FnZVdhaXQnLFxuICAgIF07XG5cbiAgICAvKlxuICAgICogd2FpdGVkUmV0dW5yZWQgbWV0aG9kcyB3b3JrIHNpbWlsYXJseSB0byB3YWl0ZWQgbWV0aG9kcyBvbmx5IHRoYXQgdGhleSBlbmFibGUgY2FwdHVyaW5nIGEgdmFsdWVcbiAgICAqIGludG8gYSBnbG9iYWxseSBkZWNsYXJlZCB2YXJpYWJsZSAob3IgYW4gdW5kZWNsYXJlZCBvbmUpLlxuICAgICogMS4gRXZlbnQgTWV0aG9kIGZ1bmN0aW9ucyBhcmUgcmV3cml0dGVuLlxuICAgICogMi4gRm9yIHdhaXRlZFJldHVybmVkIG1ldGhvZHMgcmV3cml0ZXIgd2lsbCBhZGQgYW4gYXdhaXQgdG8gYSBwcm9taXNlIGFmdGVyIHRoZSB3YWl0ZWQgbWV0aG9kIGNhbGwuXG4gICAgKiAzLiBUaGUgcHJvbWlzZSBpbmNsdWRlcyBhIGRvY3VtZW50IGxldmVsIGV2ZW50IGxpc3RlbmVyLlxuICAgICogNC4gcmV3cml0ZXIgbW9kaWZpZXMgdGhlIHdhaXRlZCBtZXRob2QgY2FsbCwgaW5zZXJ0aW5nOlxuICAgICogICAtIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSBpbnRvIHdoaWNoIGEgdmFsdWUgaXMgcmV0dXJuZWQuXG4gICAgKiAgIC0gYSB0cmlnZ2VyaW5nSWQgcGFyYW1ldGVyLlxuICAgICogNC4gVGhlIGV2ZW50IGxpc3RlbmVyIGlzIHVuaXF1ZSB0byB0aGUgdHJpZ2dlcmluZ0lkLlxuICAgICogNS4gV2hlbiB0aGUgbWV0aG9kIGNvbXBsZXRlcyBydW5uaW5nIGFuIGV2ZW50IGlzIGRpc3BhdGNoZWQgcmVzb2x2aW5nIHRoZSBwcm9taXNlLlxuICAgICogNi4gVGhlIHZhbHVlIHJldHVybmVkIGlzIHRyYW5zZmVyZWQgaW50byB0aGUgdmFyaWFibGUgdXNpbmcgZXZhbC5cbiAgICAqXG4gICAgKiBUaGlzIGFsbG93cyB0aGUgd2FpdGVkIG1ldGhvZCB0byBoYWx0IGV4ZWN1dGlvbiBvZiBhbnkgY29kZSBmb2xsb3dpbmcgaXQgdW50aWwgaXQgaXMgZG9uZS5cbiAgICAqIEF0IHdoaWNoIHBvaW50IHRoZSB2YXJpYWJsZSBoYXMgXCJjYXB0dXJlZFwiIHRoZSB2YWx1ZS5cbiAgICAqL1xuICAgIHRoaXMud2FpdGVkUmV0dXJuZWQgPSBbXG4gICAgICAnaW52b2tlJyxcbiAgICAgICdhc2snLFxuICAgIF07XG4gIH1cblxuICAvKipcbiAgKiBfZ2VuZXJhdGVVVUlEIC0gZ2VuZXJhdGVzIGEgdW5pcXVlIElELlxuICAqIFNvdXJjZTogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDUwMzQvY3JlYXRlLWd1aWQtdXVpZC1pbi1qYXZhc2NyaXB0XG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEByZXR1cm4ge3N0cmluZ30gLSBhIHVuaXF1ZSBpZC5cbiAgKi9cbiAgX2dlbmVyYXRlVVVJRCgpIHtcbiAgICBsZXQgZDtcbiAgICBsZXQgcjtcblxuICAgIGQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIGlmICh3aW5kb3cucGVyZm9ybWFuY2UgJiYgdHlwZW9mIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGQgKz0gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpOyAvLyB1c2UgaGlnaC1wcmVjaXNpb24gdGltZXIgaWYgYXZhaWxhYmxlXG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9ICd4eHh4eHh4eC14eHh4LTR4eHgteXh4eC14eHh4eHh4eHh4eHgnLnJlcGxhY2UoL1t4eV0vZywgKGMpID0+IHtcbiAgICAgIHIgPSAoZCArIE1hdGgucmFuZG9tKCkgKiAxNikgJSAxNiB8IDA7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzLCBuby1iaXR3aXNlXG4gICAgICBkID0gTWF0aC5mbG9vcihkIC8gMTYpO1xuICAgICAgcmV0dXJuIChjID09PSAneCcgPyByIDogKHIgJiAweDMgfCAweDgpKS50b1N0cmluZygxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbWl4ZWQtb3BlcmF0b3JzLCBuby1iaXR3aXNlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gdXVpZDtcbiAgfVxuXG4gIC8qKlxuICAqIF9yZWxlYXNlV2FpdGVkIC0gcmVsZWFzZXMgYSB3YWl0ZWQgcHJvbWlzZSBieSBkaXNwYXRjaGluZyBhbiBldmVudC5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtzdHJpbmd9IHRyaWdnZXJpbmdJZCAtIHRoZSBuYW1lIG9mIHRoZSBldmVudCB0aGF0IGludm9rZWQgdGhlIGNvZGUgdGhhdCByZXF1ZXN0ZWQgdGhlIHdhaXQuXG4gICovXG4gIF9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCkge1xuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLndhaXRlZC4ke3RyaWdnZXJpbmdJZH1gLCB7IGRldGFpbDogeyB2YWx1ZTogMCB9IH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICB9XG5cbiAgLyoqXG4gICogX3NldFRvVmFyIC0gc2V0cyBhIGdsb2JhbGx5IHNjb3BlZCB1c2VyIGRlZmluZWQgdmFyaWFibGUgd2hvJ3MgbmFtZSBpcyBzcGVjaWZpZWQgYXMgYSBhIHN0cmluZ1xuICAqIHdpdGggdGhlIHZhbHVlIHByb3ZpZGVkLlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge3ZhclN0cmluZ30gdGV4dCAtIHRoZSBuYW1lIG9mIHRoZSB2YXJpYWJsZSB0byB3aGljaCB2YWx1ZSBzaG91bGQgYmUgc2V0LlxuICAqIEBwYXJhbSB7YW55fSB2YWx1ZSAtIHRoZSB2YWx1ZSB0byBzZXQuXG4gICovXG4gIF9zZXRUb1Zhcih2YXJTdHJpbmcsIHZhbHVlKSB7XG4gICAgdHJ5IHtcbiAgICAgIGV2YWwoYCR7dmFyU3RyaW5nfSA9ICcke3ZhbHVlfSdgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1ldmFsXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRocm93ICgnQmxvY2tMaWtlLmpzIEVycm9yOiBWYXJpYWJsZXMgYWNjZXB0aW5nIGEgdmFsdWUgbXVzdCBiZSBkZWNsYXJlZCBpbiB0aGUgZ2xvYmFsIHNjb3BlLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXRocm93LWxpdGVyYWxcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiBfZXhlYyAtIGFzeW5jaHJvbm91cyBmdW5jdGlvbiBleGVjdXRpb24uXG4gICogVGhpcyBpcyB3aGF0IGNyZWF0ZXMgdGhlIFwicGFjZWRcIiBleGVjdXRpb24gb2YgdGhlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb25zLlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqIEBwYXJhbSB7YXJyYXl9IGFyZ3NBcnIgLSBhbiBhcnJheSBvZiBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgZnVuY3Rpb24uXG4gICovXG4gIF9leGVjKGZ1bmMsIGFyZ3NBcnIpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG4gICAgbWUudHJpZ2dlcmluZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgY29uc3QgZiA9IHJld3JpdGUoZnVuYywgbWUpO1xuICAgIHJldHVybiBmLmFwcGx5KG1lLCBhcmdzQXJyKTtcbiAgfVxuXG4gIC8qKlxuICAqIGludm9rZSAtIGludm9rZSBhIGZ1bmN0aW9uLiBBbGxvd3MgcGFzc2luZyBhbiBhcmd1bWVudCBvciBhcnJheSBvZiBhcmd1bWVudHMuXG4gICogRnVuY3Rpb24gd2lsbCBiZSBcInBhY2VkXCIgYW5kIGNvZGUgZXhlY3V0aW9uIHdpbGwgYmUgXCJ3YWl0ZWRcIiB1bnRpbCBpdCBpcyBjb21wbGV0ZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuRmxhZygoKSA9PiB7XG4gICogICB0aGlzLmludm9rZShqdW1wKTtcbiAgKiAgIHRoaXMuaW52b2tlKHRhbGssICdoaScpO1xuICAqICAgdGhpcy5pbnZva2UocGF0dGVybiwgWzUsIDUwLCAxMl0pO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKiBAcGFyYW0ge2FycmF5fSBhcmdzQXJyIC0gYW4gYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGZ1bmN0aW9uLiBBIHNpbmdsZSB2YXJpYWJsZSBhbHNvIGFjY2VwdGVkLlxuICAqL1xuICBpbnZva2UoZnVuYywgYXJnc0FyciwgdGhlVmFyID0gbnVsbCwgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRoZVZhciBhbmQgdHJpZ2dlcmluZ0lkIGFyZSBub3QgdXNlciBzdXBwbGllZCwgdGhleSBhcmUgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgbGV0IGFyZ3MgPSBhcmdzQXJyO1xuICAgICEoYXJnc0FyciBpbnN0YW5jZW9mIEFycmF5KSA/IGFyZ3MgPSBbYXJnc0Fycl0gOiBudWxsO1xuXG4gICAgdGhpcy5fZXhlYyhmdW5jLCBhcmdzKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgIC8vIHRoaXMgaXMgdGhlIHdhaXRlZCBtZXRob2QgbGlzdGVuZXIuIHJlbGVhc2UgaXQuXG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICAvLyBzZXQgdGhlIHVzZXIgZGVmaW5lZCB2YXJpYWJsZSB0byB0aGUgY2FwdHVyZWQgdmFsdWUuXG4gICAgICB0aGVWYXIgPyB0aGlzLl9zZXRUb1Zhcih0aGVWYXIsIHJlc3VsdCkgOiBudWxsO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogd2FpdCAtIGNyZWF0ZXMgYSBwYXVzZSBpbiBleGVjdXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHRoaXMud2FpdCg1KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHRpbWUgPSA1O1xuICAqIHRoaXMud2FpdCh0aW1lICogMC45NSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gc2VjIC0gbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC4gTXVzdCBiZSBhbiBhY3R1YWwgbnVtYmVyLlxuICAqL1xuICB3YWl0KHNlYywgdHJpZ2dlcmluZ0lkID0gbnVsbCkge1xuICAgIC8vIHRyaWdnZXJpbmdJZCBpcyBub3QgdXNlciBzdXBwbGllZCwgaXQgaXMgaW5zZXJ0ZWQgYnkgcmV3cml0ZXIuXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSwgc2VjICogMTAwMCk7XG4gIH1cbiAgLyoqIEV2ZW50cyAqICovXG5cbiAgLyoqXG4gICogd2hlbkxvYWRlZCAtIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqIFRvIGJlIHVzZWQgd2l0aCBjb2RlIHRoYXQgbmVlZHMgdG8gcnVuIG9ubG9hZC5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkxvYWRlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNheSgnSSBhbSBhbGl2ZScpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkxvYWRlZChmdW5jKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLl9leGVjKGZ1bmMsIFtdKTtcbiAgICB9LCAwKTtcbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5GbGFnIC0gYWRkcyBhIGZsYWcgdG8gY292ZXIgdGhlIHN0YWdlIHdpdGggYW4gZXZlbnQgbGlzdGVuZXIgYXR0YWNoZWQuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCByZW1vdmUgdGhlIGZsYWcgZGl2IGFuZCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ0kgYW0gYWxpdmUnKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmMgLSBhIGZ1bmN0aW9uIHRvIHJld3JpdGUgYW5kIGV4ZWN1dGUuXG4gICovXG4gIHdoZW5GbGFnKGZ1bmMpIHtcbiAgICBjb25zdCBtZSA9IHRoaXM7XG5cbiAgICBpZiAobWUuZWxlbWVudCkge1xuICAgICAgbWUuZWxlbWVudC5hZGRGbGFnKHRoaXMpO1xuXG4gICAgICB0aGlzLmVsZW1lbnQuZmxhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIG1lLmVsZW1lbnQucmVtb3ZlRmxhZyhtZSk7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB3aGVuQ2xpY2tlZCAtIGFkZHMgYSBjbGljayBldmVudCBsaXN0ZW5lciB0byB0aGUgc3ByaXRlIG9yIHN0YWdlLlxuICAqIFdoZW4gdHJpZ2dlcmVkIHdpbGwgaW52b2tlIHVzZXIgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2F5KCdJIGFtIGFsaXZlJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuQ2xpY2tlZChmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgaWYgKG1lLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgIG1lLl9leGVjKGZ1bmMsIFtlXSk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgKiB3aGVuS2V5UHJlc3NlZCAtIGFkZHMgYSBrZXlwcmVzcyBldmVudCBsaXN0ZW5lciB0byBkb2N1bWVudC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuS2V5UHJlc3NlZCgnICcsIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zYXkoJ1NwYWNlcHJlc3NlZCcpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJLZXkgLSB0aGUga2V5IHByZXNzZWQuIG1heSBiZSB0aGUgY29kZSBvciB0aGUgY2hhcmFjdGVyIGl0c2VsZiAoQSBvciA2NSlcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuS2V5UHJlc3NlZCh1c2VyS2V5LCBmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIGxldCBjaGVjaztcbiAgICB0eXBlb2YgdXNlcktleSA9PT0gJ3N0cmluZycgPyBjaGVjayA9IHVzZXJLZXkudG9Mb3dlckNhc2UoKSA6IGNoZWNrID0gdXNlcktleTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgbGV0IG1hdGNoID0gZmFsc2U7XG4gICAgICAvLyBNYWtlIHN1cmUgZWFjaCBwcm9wZXJ0eSBpcyBzdXBwb3J0ZWQgYnkgYnJvd3NlcnMuXG4gICAgICAvLyBOb3RlOiB1c2VyIG1heSB3cml0ZSBpbmNvbXBhdGlibGUgY29kZS5cbiAgICAgIGUuY29kZSAmJiBlLmNvZGUudG9Mb3dlckNhc2UoKSA9PT0gY2hlY2sgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgICAgZS5rZXkgJiYgZS5rZXkudG9Mb3dlckNhc2UoKSA9PT0gY2hlY2sgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuICAgICAgZS5rZXlDb2RlID09PSBjaGVjayA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICogd2hlbkV2ZW50IC0gYWRkcyB0aGUgc3BlY2lmaWVkIGV2ZW50IGxpc3RlbmVyIHRvIHNwcml0ZS9zdGFnZS5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuRXZlbnQoJ21vdXNlb3ZlcicsIChlKSA9PiB7XG4gICogICBjb25zb2xlLmxvZyhlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudFN0ciAtIHRoZSBuYW1lZCBldmVudCAobW9zZW1vdmUgZXRjLikuXG4gICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZSBhbmQgZXhlY3V0ZS5cbiAgKi9cbiAgd2hlbkV2ZW50KGV2ZW50U3RyLCBmdW5jKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgaWYgKG1lLmVsZW1lbnQpIHtcbiAgICAgIGxldCBhdHRhY2hUbyA9IHRoaXMuZWxlbWVudC5lbDtcbiAgICAgICdrZXlkb3dufGtleXVwfGtleXByZXNzJy5pbmRleE9mKGV2ZW50U3RyKSAhPT0gLTEgPyBhdHRhY2hUbyA9IGRvY3VtZW50IDogbnVsbDtcblxuICAgICAgYXR0YWNoVG8uYWRkRXZlbnRMaXN0ZW5lcihldmVudFN0ciwgKGUpID0+IHtcbiAgICAgICAgbWUuX2V4ZWMoZnVuYywgW2VdKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHdoZW5SZWNlaXZlTWVzc2FnZSAtIGFkZHMgdGhlIHNwZWNpZmllZCBldmVudCBsaXN0ZW5lciB0byBkb2N1bWVudC5cbiAgKiBXaGVuIHRyaWdnZXJlZCB3aWxsIGludm9rZSB1c2VyIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuUmVjZWl2ZU1lc3NhZ2UoJ21vdmUnLCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgtMTApO1xuICAqIH0pXG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KTtcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuUmVjZWl2ZU1lc3NhZ2UobXNnLCBmdW5jKSB7XG4gICAgY29uc3QgbGlzdGVuZXJJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIC8vIHJlZ2lzdGVyIGFzIGEgbWVzc2FnZSBsaXN0ZW5lci5cbiAgICBFbnRpdHkubWVzc2FnZUxpc3RlbmVycy5wdXNoKGxpc3RlbmVySWQpO1xuXG4gICAgLy8gbGlzdGVuIHRvIHNwZWNpZmllZCBtZXNzYWdlXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihtc2csIChlKSA9PiB7XG4gICAgICAvLyBleGVjdXRlIHRoZSBmdW5jIGFuZCB0aGVuXG4gICAgICB0aGlzLl9leGVjKGZ1bmMsIFtlXSkudGhlbigoKSA9PiB7XG4gICAgICAgIC8vIGRpc3BhdGNoIGFuIGV2ZW50IHRoYXQgaXMgdW5pcXVlIHRvIHRoZSBsaXN0ZW5lciBhbmQgbWVzc2FnZSByZWNlaXZlZC5cbiAgICAgICAgY29uc3QgbXNnSWQgPSBlLmRldGFpbC5tc2dJZDtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIHsgZGV0YWlsOiB7IG1zZ0lkLCBsaXN0ZW5lcklkIH0gfSk7XG5cbiAgICAgICAgZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIGJyb2FkY2FzdE1lc3NhZ2UgLSBkaXNwYXRjaGVzIGEgY3VzdG9tIGV2ZW50IHRoYXQgYWN0cyBhcyBhIGdsb2JhbCBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICpcbiAgKiBzdGFnZS53aGVuQ2xpY2tlZChmdW5jdGlvbigpIHtcbiAgKiAgc3RhZ2UuYnJvYWRjYXN0TWVzc2FnZSgnbW92ZScpXG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KVxuICAqL1xuICBicm9hZGNhc3RNZXNzYWdlKG1zZykge1xuICAgIGNvbnN0IG1zZ0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KG1zZywgeyBkZXRhaWw6IHsgbXNnSWQgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcbiAgfVxuXG4gIC8qKlxuICAqIGJyb2FkY2FzdE1lc3NhZ2VXYWl0IC0gZGlzcGF0Y2hlcyBhIGN1c3RvbSBldmVudCB0aGF0IGFjdHMgYXMgYSBnbG9iYWwgbWVzc2FnZS5cbiAgKiBXYWl0cyBmb3IgYWxsIHdoZW5SZWNlaXZlTWVzc2FnZSBsaXN0ZW5lcnMgdG8gY29tcGxldGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICpcbiAgKiBzcHJpdGUud2hlblJlY2VpdmVNZXNzYWdlKCdtb3ZlJywgZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLm1vdmUoLTEwKTtcbiAgKiAgIHRoaXMud2FpdCg1KTtcbiAgKiB9KVxuICAqXG4gICogc3RhZ2Uud2hlbkNsaWNrZWQoZnVuY3Rpb24oKSB7XG4gICogIHN0YWdlLmJyb2FkY2FzdE1lc3NhZ2VXYWl0KCdtb3ZlJyk7XG4gICogIHNwcml0ZS5zYXkoJ0FsbCBkb25lJyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbXNnIC0gdGhlIG5hbWVkIG1lc3NhZ2UgKGV2ZW50KVxuICAqL1xuICBicm9hZGNhc3RNZXNzYWdlV2FpdChtc2csIHRyaWdnZXJpbmdJZCA9IG51bGwpIHtcbiAgICAvLyB0cmlnZ2VyaW5nSWQgaXMgbm90IHVzZXIgc3VwcGxpZWQsIGl0IGlzIGluc2VydGVkIGJ5IHJld3JpdGVyLlxuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICBjb25zdCBtc2dJZCA9IHRoaXMuX2dlbmVyYXRlVVVJRCgpO1xuICAgIC8vIHNhdmUgcmVnaXN0ZXJlZCBsaXN0ZW5lcnMgZm9yIHRoaXMgYnJvYWRjYXN0LlxuICAgIGxldCBteUxpc3RlbmVycyA9IEVudGl0eS5tZXNzYWdlTGlzdGVuZXJzO1xuICAgIC8vIGRpc3BhdGNoIHRoZSBtZXNzYWdlXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KG1zZywgeyBkZXRhaWw6IHsgbXNnSWQgfSB9KTtcbiAgICBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGV2ZW50KTtcblxuICAgIC8vIGxpc3RlbiB0byB0aG9zZSB3aG8gcmVjZWl2ZWQgdGhlIG1lc3NhZ2VcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIGZ1bmN0aW9uIGJyb2FkY2FzdE1lc3NhZ2VXYWl0TGlzdGVuZXIoZSkge1xuICAgICAgLy8gaWYgZXZlbnQgaXMgZm9yIHRoaXMgbWVzc2FnZSByZW1vdmUgbGlzdGVuZXJJZCBmcm9tIGxpc3Qgb2YgbGlzdGVuZXJzLlxuICAgICAgKGUuZGV0YWlsLm1zZ0lkID09PSBtc2dJZCkgPyBteUxpc3RlbmVycyA9IG15TGlzdGVuZXJzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUuZGV0YWlsLmxpc3RlbmVySWQpIDogbnVsbDtcbiAgICAgIC8vIGFsbCBsaXN0ZW5lcnMgcmVzcG9uZGVkLlxuICAgICAgaWYgKCFteUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBldmVudCBsaXN0ZW5lclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdibG9ja0xpa2UuZG9uZXdoZW5lZWNlaXZlbWVzc2FnZScsIGJyb2FkY2FzdE1lc3NhZ2VXYWl0TGlzdGVuZXIpO1xuICAgICAgICAvLyByZWxlYXNlIHRoZSB3YWl0XG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKiogU291bmQgKiAqL1xuXG4gIC8qKlxuICAqIHBsYXlTb3VuZCAtIHBsYXlzIGEgc291bmQgZmlsZSAobXAzLCB3YXYpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmQodXJsKSB7XG4gICAgY29uc3QgYXVkaW8gPSBuZXcgd2luZG93LkF1ZGlvKHVybCk7XG4gICAgYXVkaW8ucGxheSgpO1xuICAgIHRoaXMuc291bmRzLnB1c2goYXVkaW8pO1xuICAgIGF1ZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgKCkgPT4ge1xuICAgICAgdGhpcy5zb3VuZHMgPSB0aGlzLnNvdW5kcy5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBhdWRpbyk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBwbGF5U291bmRMb29wIC0gcGxheXMgYSBzb3VuZCBmaWxlIChtcDMsIHdhdikgYWdhaW4gYW5kIGFnYWluXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kTG9vcCgnLi4vLi4vc291bmRzL2JsZWF0LndhdicpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIHRoZSB1cmwgb2YgdGhlIGZpbGUgdG8gcGxheS5cbiAgKi9cbiAgcGxheVNvdW5kTG9vcCh1cmwpIHtcbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICBhdWRpby5jdXJyZW50VGltZSA9IDA7XG4gICAgICBhdWRpby5wbGF5KCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBwbGF5U291bmRVbnRpbERvbmUgLSBwbGF5cyBhIHNvdW5kIGZpbGUgKG1wMywgd2F2KSB1bnRpbCBkb25lLlxuICAqIFRoaXMgaXMgc2ltaWxhciB0byBwbGF5U291bmQgYW5kIHdhaXQgZm9yIHRoZSBkdXJhdGlvbiBvZiB0aGUgc291bmQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kVW50aWxEb25lKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdXJsIC0gdGhlIHVybCBvZiB0aGUgZmlsZSB0byBwbGF5LlxuICAqL1xuICBwbGF5U291bmRVbnRpbERvbmUodXJsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgLy8gdHJpZ2dlcmluZ0lkIGlzIG5vdCB1c2VyIHN1cHBsaWVkLCBpdCBpcyBpbnNlcnRlZCBieSByZXdyaXRlci5cbiAgICBjb25zdCBhdWRpbyA9IG5ldyB3aW5kb3cuQXVkaW8odXJsKTtcbiAgICBhdWRpby5wbGF5KCk7XG4gICAgdGhpcy5zb3VuZHMucHVzaChhdWRpbyk7XG4gICAgYXVkaW8uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB7XG4gICAgICB0aGlzLnNvdW5kcyA9IHRoaXMuc291bmRzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGF1ZGlvKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAqIHN0b3BTb3VuZHMgLSBzdG9wcyBhbGwgc291bmRzIHBsYXllZCBieSBzcHJpdGUgb3Igc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGxheVNvdW5kKCcuLi8uLi9zb3VuZHMvYmxlYXQud2F2Jyk7XG4gICogfSk7XG4gICpcbiAgKiBzdGFnZS53aGVuS2V5UHJlc3NlZCgnRXNjYXBlJywgKCkgPT4ge1xuICAqICAgdGhpcy5zdG9wU291bmRzKCk7XG4gICogfSk7XG4gICovXG4gIHN0b3BTb3VuZHMoKSB7XG4gICAgdGhpcy5zb3VuZHMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgaXRlbS5wYXVzZSgpO1xuICAgIH0pO1xuICAgIHRoaXMuc291bmRzID0gW107XG4gIH1cblxuICAvKiBjc3MgKi9cblxuICAvKipcbiAgKiBjc3MgLSBhcHBsaWVzIGEgQ1NTIHJ1bGUgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5jc3MoJ2JhY2tncm91bmQnLCAnIzAwMDBmZicpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5jc3Moe2JhY2tncm91bmQ6ICcjMDAwMGZmJ30pO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKS4gQWx0ZXJuYXRpdmVseSBhbiBvYmplY3Qgd2l0aCBrZXk6IHZhbHVlIHBhaXJzLlxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBzcHJpdGUgYW5kIGFsbCBjb3N0dW1lcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lIHRvIGFkZC5cbiAgKi9cbiAgYWRkQ2xhc3MobmFtZSkge1xuICAgICF0aGlzLmhhc0NsYXNzKG5hbWUpID8gdGhpcy5jbGFzc2VzLnB1c2gobmFtZSkgOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ2xhc3MgLSByZW1vdmVzIGEgY3NzIGNsYXNzIGZyb20gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqIHNwcml0ZS5yZW1vdmVDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG5hbWUpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIHNwcml0ZSBhbmQgYWxsIGNvc3R1bWVzLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmhhc0NsYXNzKCdyYWluYm93JykgPyB0aGlzLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiB0aGlzLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSAtIHRoZSBjc3MgY2xhc3MgbmFtZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGlzIHRoZSBjc3MgY2xhc3MgbmFtZSBvbiB0aGUgbGlzdC5cbiAgKi9cbiAgaGFzQ2xhc3MobmFtZSkge1xuICAgIHJldHVybiB0aGlzLmNsYXNzZXMuaW5kZXhPZihuYW1lKSAhPT0gLTE7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2VudGl0eS5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgc3RhZ2Ugc3VyZmFjZSBvbiB3aGljaCBzcHJpdGVzIGRyYXcuXG4gKiBFYWNoIFN0YWdlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZVN1cmZhY2Uge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSBvbiB3aGljaCB0aGUgc3ByaXRlIGlzIGRyYXdpbmcuXG4gICovXG4gIGNvbnN0cnVjdG9yKHN0YWdlKSB7XG4gICAgdGhpcy5jb250ZXh0ID0gc3RhZ2UuZWxlbWVudC5jb250ZXh0O1xuICB9XG5cbiAgLyoqXG4gICogZHJhdyAtIGRyYXdzIGEgbGluZSBcImJlaGluZFwiIGEgbW92aW5nIHNwcml0ZS5cbiAgKiBOb3RlOiBzcHJpdGUgYWx3YXlzIGhhcyBjdXJyZW50IGFuZCBwcmV2aW91cyB4LHkgdmFsdWVzIHRvIGFsbG93IGRyYXdpbmcgdG8gcHJldmlvdXMgbG9jYXRpb24uXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSBkcmF3aW5nIHRoZSBsaW5lLlxuICAqL1xuICBkcmF3KHNwcml0ZSkge1xuICAgIGlmIChzcHJpdGUuZHJhd2luZykge1xuICAgICAgdGhpcy5jb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jb250ZXh0Lm1vdmVUbygoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHNwcml0ZS54LCAoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyAoc3ByaXRlLnkgKiAtMSkpO1xuICAgICAgdGhpcy5jb250ZXh0LmxpbmVUbygoc3ByaXRlLnN0YWdlV2lkdGggLyAyKSArIHNwcml0ZS5wcmV2WCwgKHNwcml0ZS5zdGFnZUhlaWdodCAvIDIpICsgKHNwcml0ZS5wcmV2WSAqIC0xKSk7XG4gICAgICB0aGlzLmNvbnRleHQubGluZVdpZHRoID0gc3ByaXRlLnBlblNpemU7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlU3R5bGUgPSBzcHJpdGUucGVuQ29sb3I7XG4gICAgICB0aGlzLmNvbnRleHQuc3Ryb2tlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogY2xlYXIgLSBjbGVhcnMgdGhlIGNhbnZhc1xuICAqL1xuICBjbGVhcihzcHJpdGUpIHtcbiAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHNwcml0ZS5zdGFnZVdpZHRoLCBzcHJpdGUuc3RhZ2VIZWlnaHQpO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS1zdXJmYWNlLmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnQgb2YgdGhlIHNwcml0ZS5cbiAqIEVhY2ggU3ByaXRlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTcHJpdGVFbGVtZW50IHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgU3ByaXRlIEVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSBmb3Igd2hpY2ggdGhlIGVsZW1lbnQgaXMgY3JlYXRlZC5cbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdG8gd2hpY2ggdGhlIHNwcml0ZSBpcyBhZGRlZC5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCBzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBlbC5pZCA9IGAke3Nwcml0ZS5pZH1gO1xuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBlbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdtYW5pcHVsYXRpb24nO1xuXG4gICAgc3RhZ2UuZWxlbWVudC5lbC5hcHBlbmRDaGlsZChlbCk7XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gIH1cblxuICAvKipcbiAgKiB1cGRhdGUgLSB1cGRhdGVzIHRoZSBET00gZWxlbWVudC4gVGhpcyBpcyBhbHdheXMgY2FsbGVkIGFmdGVyIHRoZSBjb25zdHJ1Y3Rvci5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHVwZGF0ZS5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZWw7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICAvLyBDb3N0dW1lXG4gICAgaWYgKHNwcml0ZS5jb3N0dW1lKSB7XG4gICAgICBlbC5zdHlsZS53aWR0aCA9IGAke3Nwcml0ZS5jb3N0dW1lLnZpc2libGVXaWR0aH1weGA7XG4gICAgICBlbC5zdHlsZS5oZWlnaHQgPSBgJHtzcHJpdGUuY29zdHVtZS52aXNpYmxlSGVpZ2h0fXB4YDtcbiAgICB9XG5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4fXB4YDtcbiAgICBlbC5zdHlsZS50b3AgPSBgJHsoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5fXB4YDtcbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcblxuICAgIGVsLnN0eWxlLnZpc2liaWxpdHkgPSBgJHsoc3ByaXRlLnNob3dpbmcgPyAndmlzaWJsZScgOiAnaGlkZGVuJyl9YDtcblxuICAgIC8vIExlZnQgb3IgcmlnaHQgcm90YXRpb25cbiAgICAvLyBEaXJlY3Rpb24gZGl2aWRlZCBieSAxODAgYW5kIGZsb29yZWQgLT4gMSBvciAyLlxuICAgIC8vIFN1YnRyYWN0IDEgLT4gMCBvciAxLlxuICAgIC8vIE11bHRpcGx5IGJ5IC0xIC0+IDAgb3IgLTEuXG4gICAgLy8gQ3NzIHRyYW5zZm9ybSAtPiBOb25lIG9yIGZ1bGwgWC5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMSA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGBzY2FsZVgoJHsoKE1hdGguZmxvb3Ioc3ByaXRlLmRpcmVjdGlvbiAvIDE4MCkgKiAyKSAtIDEpICogLTF9KWAgOiBudWxsO1xuXG4gICAgLy8gRnVsbCByb3RhdGlvblxuICAgIC8vIFNwcml0ZSBcIm5ldXRyYWwgcG9zaXRpb25cIiBpcyA5MC4gQ1NTIGlzIDAuIFN1YnRyYWN0IDkwLlxuICAgIC8vIE5vcm1hbGl6ZSB0byAzNjAuXG4gICAgLy8gQ3NzIHJvdGF0ZSAtPiBOdW1iZXIgb2YgZGVncmVlcy5cbiAgICBzcHJpdGUucm90YXRpb25TdHlsZSA9PT0gMCA/IGVsLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHsoKHNwcml0ZS5kaXJlY3Rpb24gLSA5MCkgKyAzNjApICUgMzYwfWRlZylgIDogbnVsbDtcblxuICAgIC8vIENTUyBydWxlcyBjbGFzc2VzIGFuZCB0aGUgYmFja2dyb3VuZCBjb2xvci5cbiAgICAvLyBUaGUgY29zdHVtZSBjb2xvciBzZXR0aW5nIG92ZXJyaWRlcyBhbnkgQ1NTIHNldHRpbmcuXG5cbiAgICAvLyBUaGVyZSBpcyBubyBjb2xvciBwcm9wZXJ0eSB0byBjdXJyZW50IGNvc3R1bWUgLSBzbyByZXNldCB0aGUgYmFja2dyb3VuZC1jb2xvciBwcm9wZXJ0eSBvZiB0aGUgZWxlbWVudC5cbiAgICAhc3ByaXRlLmNvc3R1bWUgfHwgIXNwcml0ZS5jb3N0dW1lLmNvbG9yID8gZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJycgOiBudWxsO1xuXG4gICAgLy8gYXBwbHkgQ1NTIHJ1bGVzIChtYXkgaW5jbHVkZSBiYWNrZ3JvdW5kIGNvbG9yKVxuICAgIGNzcy5hcHBseShzcHJpdGUpO1xuXG4gICAgLy8gYXBwbHkgQ1NTIGNsYXNzZXNcbiAgICBzcHJpdGUuY29zdHVtZSA/IGVsLmNsYXNzTmFtZSA9IHNwcml0ZS5jb3N0dW1lLmNsYXNzZXMuY29uY2F0KHNwcml0ZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzcHJpdGUuY2xhc3Nlcy5qb2luKCcgJyk7XG5cbiAgICAvLyBUaGVyZSBpcyBhIGNvbG9yIHByb3BlcnR5IHRvIGN1cnJlbnQgY29zdHVtZSAtIHNvIGFwcGx5IGl0IGFuZCBvdmVycmlkZSBDU1MgcnVsZXMuXG4gICAgc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuY29sb3IgPyBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBzcHJpdGUuY29zdHVtZS5jb2xvciA6IG51bGw7XG5cbiAgICAvLyBJbWFnZS5cbiAgICBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgZWwuZmlyc3RDaGlsZCkgeyAvLyBoYXMgaW1hZ2UgZnJvbSBwcmV2aW91cyBjb3N0dW1lXG4gICAgICBpZiAoIXNwcml0ZS5jb3N0dW1lLmltYWdlKSB7IC8vIG5lZWRzIHJlbW92ZWQgYXMgdGhlcmUgaXMgbm8gaW1hZ2UgaW4gY3VycmVudCBjb3N0dW1lLlxuICAgICAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcbiAgICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUuaW1hZ2UgIT09IHRoaXMuZWwuZmlyc3RDaGlsZC5zcmMpIHsgLy8gbmVlZHMgcmVwbGFjZWRcbiAgICAgICAgdGhpcy5lbC5maXJzdENoaWxkLnNyYyA9IHNwcml0ZS5jb3N0dW1lLmltYWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc3ByaXRlLmNvc3R1bWUgJiYgc3ByaXRlLmNvc3R1bWUuaW1hZ2UpIHsgLy8gbmVlZHMgYW4gaW1hZ2UgaW5zZXJ0ZWQuXG4gICAgICBjb25zdCBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcblxuICAgICAgaW1hZ2Uuc3R5bGUud2lkdGggPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgICBpbWFnZS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgICBpbWFnZS5zcmMgPSBzcHJpdGUuY29zdHVtZS5pbWFnZTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGltYWdlKTtcbiAgICB9XG5cbiAgICBlbC5maXJzdENoaWxkID8gZWwuZmlyc3RDaGlsZC5kcmFnZ2FibGUgPSBmYWxzZSA6IG51bGw7XG5cbiAgICAvLyBJbm5lci4gTXVzdCBieSBkb25lIGFmdGVyIHRoZSBpbWFnZVxuICAgIHNwcml0ZS5jb3N0dW1lICYmIHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA/IGVsLmlubmVySFRNTCA9IHNwcml0ZS5jb3N0dW1lLmlubmVySFRNTCA6IG51bGw7XG5cbiAgICAvLyBUZXh0IFVJIGdvZXMgd2hlcmUgc3ByaXRlIGdvZXMuXG4gICAgc3ByaXRlLnRleHR1aSA/IHNwcml0ZS50ZXh0dWkudXBkYXRlKHNwcml0ZSkgOiBudWxsO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBkZWxldGUuXG4gICovXG4gIGRlbGV0ZShzcHJpdGUpIHtcbiAgICBjb25zdCBlbCA9IHNwcml0ZS5lbGVtZW50LmVsO1xuXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdCkuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3ByaXRlKSB7XG4gICAgY29uc3QgZWwgPSBzcHJpdGUuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gMTAwMDtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZsYWcgLSBwdXRzIHRoZSBmbGFnIGRpdiBhdCB0aGUgYmFjayAoaGlkZXMgaXQpLlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdGhhdCBcInJlcXVlc3RlZFwiIHRoZSBmbGFnLlxuICAqL1xuICByZW1vdmVGbGFnKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IC0xO1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nwcml0ZS1lbGVtZW50LmpzXG4vLyBtb2R1bGUgaWQgPSAzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCAqIGFzIGNzcyBmcm9tICcuL2VsZW1lbnQtY3NzJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBsb29rLlxuICogQWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICogRG8gbm90IGluc3RhbnRpYXRlIG9iamVjdHMgZGlyZWN0bHkgZnJvbSB0aGlzIGNsYXNzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIExvb2sge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIExvb2sgaXMgYWJzdHJhY3QgZm9yIENvc3R1bWUgYW5kIEJhY2tkcm9wLlxuICAqL1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG4gIH1cblxuICAvKiogTG9va3MgKiAqL1xuXG4gIC8qKlxuICAqIGNzcyAtIGFwcGxpZXMgYSBDU1MgcnVsZSB0byBhIENvc3R1bWUgb3IgQmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmNzcygnZm9udC1zaXplJywgJzE2cHgnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuY3NzKCdjdXJzb3InLCAncG9pbnRlcicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSB0aGUgY3NzIHByb3BlcnR5IChlLmcuIGNvbG9yKVxuICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHRoZSB2YWx1ZSBmb3IgdGhlIGNzcyBwcm9wZXJ0eSAoZS5nLiAjZmY4ODMzKVxuICAqL1xuICBjc3MocHJvcCwgdmFsdWUgPSBudWxsKSB7XG4gICAgY3NzLnJlZ2lzdGVyKHByb3AsIHZhbHVlLCB0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENsYXNzIC0gYWRkcyBhIGNzcyBjbGFzcyB0byBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gYWRkLlxuICAqL1xuICBhZGRDbGFzcyhuYW1lKSB7XG4gICAgIXRoaXMuaGFzQ2xhc3MobmFtZSkgPyB0aGlzLmNsYXNzZXMucHVzaChuYW1lKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDbGFzcyAtIHJlbW92ZXMgYSBjc3MgY2xhc3MgZnJvbSB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGNvc3R1bWUucmVtb3ZlQ2xhc3MoJ3JhaW5ib3cnKSA6IGNvc3R1bWUuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogYmFja2Ryb3AuaGFzQ2xhc3MoJ3JhaW5ib3cnKSA/IGJhY2tkcm9wLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBiYWNrZHJvcC5hZGRDbGFzcygncmFpbmJvdycpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgLSB0aGUgY3NzIGNsYXNzIG5hbWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDbGFzcyhuYW1lKSB7XG4gICAgdGhpcy5jbGFzc2VzID0gdGhpcy5jbGFzc2VzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IG5hbWUpO1xuICB9XG5cbiAgLyoqXG4gICogaGFzQ2xhc3MgLSBpcyB0aGUgY3NzIGNsYXNzIGFwcGxpZWQgdG8gdGhlIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gICpcbiAgKiBjb3N0dW1lLmhhc0NsYXNzKCdyYWluYm93JykgPyBjb3N0dW1lLnJlbW92ZUNsYXNzKCdyYWluYm93JykgOiBjb3N0dW1lLmFkZENsYXNzKCdyYWluYm93Jyk7XG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmhhc0NsYXNzKCdyYWluYm93JykgPyBiYWNrZHJvcC5yZW1vdmVDbGFzcygncmFpbmJvdycpIDogYmFja2Ryb3AuYWRkQ2xhc3MoJ3JhaW5ib3cnKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gdGhlIGNzcyBjbGFzcyBuYW1lLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIGNzcyBjbGFzcyBuYW1lIG9uIHRoZSBsaXN0LlxuICAqL1xuICBoYXNDbGFzcyhuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuY2xhc3Nlcy5pbmRleE9mKG5hbWUpICE9PSAtMTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvbG9vay5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgTG9vayBmcm9tICcuL2xvb2snO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIENvc3R1bWUuXG4gKiBDb3N0dW1lcyBjYW4gYmUgYWRkZWQgdG8gYSBTcHJpdGUuXG4gKiBAZXh0ZW5kcyBMb29rXG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBjb3N0dW1lID0gbmV3IGJsb2NrTGlrZS5Db3N0dW1lKHtcbiAqICAgd2lkdGg6IDUwLFxuICogICBoZWlnaHQ6IDUwLFxuICogICBjb2xvcjogJyNBMkRBRkYnLFxuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL3NoZWVwX3N0ZXAucG5nJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvc3R1bWUgZXh0ZW5kcyBMb29rIHtcbiAgLyoqXG4gICogY29uc3RydWN0b3IgLSBDcmVhdGVzIGEgQ29zdHVtZSB0byBiZSB1c2VkIGJ5IFNwcml0ZSBvYmplY3RzLi5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGNvc3R1bWUuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMud2lkdGggLSB0aGUgY29zdHVtZSB3aWR0aCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmhlaWdodCAtIHRoZSBjb3N0dW1lIGhlaWdodCBpbiBwaXhlbHMuIERlZmF1bHQgaXMgMTAwLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGNvc3R1bWUgaW1hZ2UuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29sb3IgLSBhIGNzcyBjb2xvciBzdHJpbmcgKCcjZmYwMDAwJywgJ3JlZCcpXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMgPSB7fSkge1xuICAgIGNvbnN0IGRlZmF1bHRzID0ge1xuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIGhlaWdodDogMTAwLFxuICAgICAgY29sb3I6IG51bGwsXG4gICAgfTtcbiAgICBjb25zdCBhY3R1YWwgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0cywgb3B0aW9ucyk7XG5cbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy53aWR0aCA9IGFjdHVhbC53aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGFjdHVhbC5oZWlnaHQ7XG4gICAgdGhpcy52aXNpYmxlV2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy52aXNpYmxlSGVpZ2h0ID0gYWN0dWFsLmhlaWdodDtcblxuICAgIHRoaXMuaW1hZ2UgPSBhY3R1YWwuaW1hZ2U7XG4gICAgdGhpcy5jb2xvciA9IGFjdHVhbC5jb2xvcjtcblxuICAgIC8vIHByZWxvYWRcbiAgICBpZiAodGhpcy5pbWFnZSkge1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuICAgIH1cblxuICAgIHRoaXMuaW5uZXJIVE1MID0gJyc7XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBjb3N0dW1lIHRvIHRoZSBzcHJpdGVcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuYWRkVG8oc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB3aGljaCBzcHJpdGUgdG8gYWRkIHRoZSBjb3N0dW1lIHRvby5cbiAgKi9cbiAgYWRkVG8oc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuICAgIHNwcml0ZS5jb3N0dW1lcy5wdXNoKHRoaXMpO1xuXG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmUuXG4gICAgaWYgKCFzcHJpdGUuY29zdHVtZSkge1xuICAgICAgY3VyU3ByaXRlLmNvc3R1bWUgPSBzcHJpdGUuY29zdHVtZXNbMF07XG4gICAgICBjdXJTcHJpdGUud2lkdGggPSBzcHJpdGUuY29zdHVtZS52aXNpYmxlV2lkdGg7XG4gICAgICBjdXJTcHJpdGUuaGVpZ2h0ID0gc3ByaXRlLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICBzcHJpdGUuZWxlbWVudCA/IHNwcml0ZS5lbGVtZW50LnVwZGF0ZShzcHJpdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUZyb20gLSBSZW1vdmVzIHRoZSBjb3N0dW1lIGZyb20gdG8gdGhlIHNwcml0ZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogY29zdHVtZS5hZGRUbyhzcHJpdGUpO1xuICAqIGNvc3R1bWUucmVtb3ZlRnJvbShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHdoaWNoIHNwcml0ZSB0byByZW1vdmUgdGhlIGNvc3R1bWUgZnJvbS5cbiAgKi9cbiAgcmVtb3ZlRnJvbShzcHJpdGUpIHtcbiAgICBzcHJpdGUucmVtb3ZlQ29zdHVtZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBMb29rcyAqICovXG5cbiAgLyoqXG4gICogcmVzaXplVG9JbWFnZSAtIHNldHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNvc3R1bWUgdG8gdGhhdCBvZiB0aGUgaW1hZ2UgZmlsZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICAqICAgaW1hZ2U6ICdodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zL2QvZDMvU2hlZXBfaW5fZ3JheS5zdmcnXG4gICogfSk7XG4gICpcbiAgKiBjb3N0dW1lLnJlc2l6ZVRvSW1hZ2UoKTtcbiAgKi9cbiAgcmVzaXplVG9JbWFnZSgpIHtcbiAgICAvLyByZWdpc3RlciB0aGUgaW1hZ2Ugc2l6ZSBmcm9tIHRoZSBmaWxlXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgY29uc3QgbWUgPSB0aGlzO1xuXG4gICAgICBpbWFnZS5zcmMgPSB0aGlzLmltYWdlO1xuXG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBtZS53aWR0aCA9IGltYWdlLndpZHRoO1xuICAgICAgICBtZS5oZWlnaHQgPSBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIG1lLnZpc2libGVXaWR0aCA9IG1lLndpZHRoO1xuICAgICAgICBtZS52aXNpYmxlSGVpZ2h0ID0gbWUuaGVpZ2h0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogaW5uZXIgLSBpbnNlcnRzIGh0bWwgaW50byB0aGUgY29zdHVtZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogY29zdHVtZS5pbm5lcignSSBsaWtlIHRleHQgb25seScpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGh0bWwgLSB0aGUgaHRtbCB0byBpbnNlcnQuXG4gICovXG4gIGlubmVyKGh0bWwpIHtcbiAgICB0aGlzLmlubmVySFRNTCA9IGh0bWw7XG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBwbGFjZXMgYSBkb20gZWxlbWVudCBpbnNpZGUgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIGNvc3R1bWUuaW5zZXJ0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdteS1odG1sLWNyZWF0aW9uJykpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGVsIC0gdGhlIERPTSBlbGVtZW50LlxuICAqL1xuICBpbnNlcnQoZWwpIHtcbiAgICBjb25zdCBpZWwgPSBlbC5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgaWVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIGllbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuXG4gICAgdGhpcy5pbWFnZSA9IG51bGw7XG4gICAgdGhpcy5jb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgdGhpcy5pbm5lckhUTUwgPSBpZWwub3V0ZXJIVE1MO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9jb3N0dW1lLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qKlxuKiBCbG9ja0xpa2UuanNcbipcbiogQmxvY2tMaWtlLmpzIGlzIGFuIGVkdWNhdGlvbmFsIEphdmFTY3JpcHQgbGlicmFyeS5cbiogSXQgYnJpZGdlcyB0aGUgZ2FwIGJldHdlZW4gYmxvY2stYmFzZWQgYW5kIHRleHQtYmFzZWQgcHJvZ3JhbW1pbmcuXG4qXG4qIEJsb2NrTGlrZS5qcyBpcyBkZXNpZ25lZCBmb2xsb3dpbmcgU2NyYXRjaCBjb25jZXB0cywgbWV0aG9kcyBhbmQgcGF0dGVybnMuXG4qIFRoZSBzY3JlZW4gaXMgYSBjZW50ZXJlZCBzdGFnZS4gSW50ZXJhY3Rpb24gaXMgd2l0aCBTcHJpdGVzLlxuKiBDb2RlIGlzIGV4ZWN1dGVkIGluIGEgXCJwYWNlZFwiIG1hbm5lci5cbiogU2NyYXRjaCBibG9jayBjb2RlIGFuZCBCbG9ja0xpa2UuanMgdGV4dCBjb2RlIGFyZSBtZWFudCB0byBiZVxuKiBhcyBsaXRlcmFsbHkgc2ltaWxhciBhcyBwb3NzaWJsZS5cbipcbiogQmxvY2tMaWtlLmpzIGlzIHdyaXR0ZW4gaW4gRVM2L0VTNyBmbGF2b3JlZCBKYXZhU2NyaXB0LlxuKiBJdCBpcyBlbnZpcm9ubWVudCBpbmRlcGVuZGVudC5cbiogSXQgY2FuIGJlIHVzZWQgYW55d2hlcmUgbW9kZXJuIEphdmFTY3JpcHQgcnVucy5cbipcbiogQGF1dGhvciBZYXJvbiAoUm9uKSBJbGFuXG4qIEBlbWFpbCBibG9ja2xpa2VAcm9uaWxhbi5jb21cbipcbiogQ29weXJpZ2h0IDIwMThcbiogRmFicmlxdcOpIGF1IENhbmFkYSA6IE1hZGUgaW4gQ2FuYWRhXG4qL1xuXG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi9kb2N1bWVudC1jc3MnO1xuaW1wb3J0IHBsYXRmb3JtcyBmcm9tICcuL3BsYXRmb3Jtcyc7XG5cbmltcG9ydCBTdGFnZSBmcm9tICcuL3N0YWdlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IEJhY2tkcm9wIGZyb20gJy4vYmFja2Ryb3AnOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4vc3ByaXRlJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuaW1wb3J0IENvc3R1bWUgZnJvbSAnLi9jb3N0dW1lJzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuXG5leHBvcnQgeyBTdGFnZSB9O1xuZXhwb3J0IHsgQmFja2Ryb3AgfTtcbmV4cG9ydCB7IFNwcml0ZSB9O1xuZXhwb3J0IHsgQ29zdHVtZSB9O1xuXG4oZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIHN0eWxlLnR5cGUgPSAndGV4dC9jc3MnO1xuICBzdHlsZS5pbm5lckhUTUwgPSBgXG4gICAgJHtzdHlsZXMuZGVmYXVsdENTU31cXG5cXG4gXG4gICAgJHtzdHlsZXMudWlDU1N9XFxuXFxuIFxuICAgICR7c3R5bGVzLnRoaW5rQ1NTfVxcblxcbiBcbiAgICAke3N0eWxlcy5zYXlDU1N9IFxcblxcbiBcbiAgICAke3N0eWxlcy5hc2tDU1N9YDtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcblxuICBwbGF0Zm9ybXMoKTtcbn0oKSk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9saWIuanNcbi8vIG1vZHVsZSBpZCA9IDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4qIENvbGxlY3Rpb24gb2YgY3NzIHN0cmluZ3MgdG8gYmUgaW5qZWN0ZWQgdG8gdGhlIGhlYWQgc2VjdGlvbiBvZiBhIHBhZ2UuXG4qIEBwcml2YXRlXG4qL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRDU1MgPSBgXG4qIHsgXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgwLCAwLCAwKTtcbiAgLXdlYmtpdC10b3VjaC1jYWxsb3V0Om5vbmU7ICAgICAgICAgICAgICAgIC8qIHByZXZlbnQgY2FsbG91dCB0byBjb3B5IGltYWdlLCBldGMgd2hlbiB0YXAgdG8gaG9sZCAqL1xuICAtd2Via2l0LXRhcC1oaWdobGlnaHQtY29sb3I6cmdiYSgwLDAsMCwwKTsgLyogcHJldmVudCB0YXAgaGlnaGxpZ2h0IGNvbG9yIC8gc2hhZG93ICovXG59XG5odG1sLCBib2R5e1xuICBtYXJnaW46MDtcbiAgcGFkZGluZzowO1xufVxuYDtcblxuZXhwb3J0IGNvbnN0IHVpQ1NTID0gYFxuLmJsb2NrbGlrZS1mbGFnIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiA2NXB4O1xuICBsaW5lLWhlaWdodDogNjVweDtcbiAgcGFkZGluZzogMzJweDtcbiAgY29sb3I6ICMyMjI7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM2NjY7XG4gIGJvcmRlci1yYWRpdXM6IDY1cHg7XG59XG5gO1xuXG5leHBvcnQgY29uc3QgdGhpbmtDU1MgPSBgXG4uYmxvY2tsaWtlLXRoaW5rIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBtaW4td2lkdGg6IDYwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIGxlZnQ6IDIwMHB4O1xuICBwYWRkaW5nOiAxMHB4O1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBtaW4taGVpZ2h0OiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgY29sb3I6ICMyMjI7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG59XG4uYmxvY2tsaWtlLXRoaW5rOmJlZm9yZSB7XG4gIHBvc2l0aW9uOmFic29sdXRlO1xuICBib3R0b206IC0zMHB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiAzMHB4O1xuICBoZWlnaHQ6IDMwcHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG4uYmxvY2tsaWtlLXRoaW5rOmFmdGVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC00NXB4O1xuICBsZWZ0OiAwcHg7XG4gIHdpZHRoOiAxNXB4O1xuICBoZWlnaHQ6IDE1cHg7XG4gIGJhY2tncm91bmQ6ICNmYWZhZmE7XG4gIGJvcmRlcjogMnB4IHNvbGlkICM0NDQ7XG4gIGJvcmRlci1yYWRpdXM6IDE1cHg7XG4gIGNvbnRlbnQ6IFwiXCI7XG59XG5gO1xuXG5leHBvcnQgY29uc3Qgc2F5Q1NTID0gYFxuLmJsb2NrbGlrZS1hc2ssXG4uYmxvY2tsaWtlLXNheSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBtaW4td2lkdGg6IDYwcHg7XG4gIG1heC13aWR0aDogMjAwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG4gIGZvbnQtZmFtaWx5OiBBcmlhbCwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE2cHg7XG4gIG1pbi1oZWlnaHQ6IDE2cHg7XG4gIGxpbmUtaGVpZ2h0OiAxNnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmFmYWZhO1xuICBib3JkZXI6IDJweCBzb2xpZCAjNDQ0O1xuICBib3JkZXItcmFkaXVzOiAyMHB4O1xufVxuLmJsb2NrbGlrZS1hc2s6YmVmb3JlLFxuLmJsb2NrbGlrZS1zYXk6YmVmb3JlIHtcbiAgY29udGVudDogJyAnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG4gIGxlZnQ6IDEzcHg7XG4gIHJpZ2h0OiBhdXRvO1xuICB0b3A6IGF1dG87XG4gIGJvdHRvbTogLTMzcHg7XG4gIGJvcmRlcjogMTZweCBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjNDQ0IHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICM0NDQ7XG59XG4uYmxvY2tsaWtlLWFzazphZnRlcixcbi5ibG9ja2xpa2Utc2F5OmFmdGVyIHtcbiAgY29udGVudDogJyAnO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAwO1xuICBoZWlnaHQ6IDA7XG4gIGxlZnQ6IDE1cHg7XG4gIHJpZ2h0OiBhdXRvO1xuICB0b3A6IGF1dG87XG4gIGJvdHRvbTogLTI4cHg7XG4gIGJvcmRlcjogMTZweCBzb2xpZDtcbiAgYm9yZGVyLWNvbG9yOiAjZmFmYWZhIHRyYW5zcGFyZW50IHRyYW5zcGFyZW50ICNmYWZhZmE7XG59XG5gO1xuXG5leHBvcnQgY29uc3QgYXNrQ1NTID0gYFxuLmJsb2NrbGlrZS1hc2sgaW5wdXQge1xuICBmb250LWZhbWlseTogQXJpYWwsIEhlbHZldGljYSwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBwYWRkaW5nOiAycHg7XG4gIG1hcmdpbjogMnB4O1xuICB3aWR0aDogNzUlO1xufVxuLmJsb2NrbGlrZS1hc2sgYnV0dG9uIHtcbiAgZm9udC1zaXplOiAxNnB4O1xuICBsaW5lLWhlaWdodDogMTZweDtcbiAgaGVpZ2h0OiAyNnB4O1xuICBwYWRkaW5nOiAwIDVweDtcbiAgbWFyZ2luOiAwO1xufVxuYDtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2RvY3VtZW50LWNzcy5qc1xuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogcGxhdGZvcm1zIC0gY29sbGVjdGlvbiBvZiB0aGluZ3MgdG8gZW5zdXJlIGl0IHBsYXlzIG5pY2VseSB3aXRoIGNvZGluZyBwbGF0Zm9ybXMuXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcGxhdGZvcm1zKCkge1xuICAvKipcbiAgKiBjb2RlcGVuLmlvXG4gICogUGFjZWQgYW5kIFdhaXRlZCBtZXRob2RzIHRyaWdnZXIgdGhlIHByb3RlY3Rpb24gLSBoZW5jZSB3ZSBwcm9sb25nIGl0LlxuICAqIGh0dHBzOi8vYmxvZy5jb2RlcGVuLmlvLzIwMTYvMDYvMDgvY2FuLWFkanVzdC1pbmZpbml0ZS1sb29wLXByb3RlY3Rpb24tdGltaW5nL1xuICAqL1xuICBpZiAod2luZG93LkNQKSB7XG4gICAgd2luZG93LkNQLlBlblRpbWVyLk1BWF9USU1FX0lOX0xPT1BfV09fRVhJVCA9IDYwMDAwO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9wbGF0Zm9ybXMuanNcbi8vIG1vZHVsZSBpZCA9IDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IEVudGl0eSBmcm9tICcuL2VudGl0eSc7XG5cbmltcG9ydCBTdGFnZUVsZW1lbnQgZnJvbSAnLi9zdGFnZS1lbGVtZW50JztcbmltcG9ydCBTdGFnZVN1cmZhY2UgZnJvbSAnLi9zdGFnZS1zdXJmYWNlJztcbmltcG9ydCBTcHJpdGVFbGVtZW50IGZyb20gJy4vc3ByaXRlLWVsZW1lbnQnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyBhIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAqXG4gKiBAZXhhbXBsZVxuICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7XG4gKiAgIHdpZHRoOiA2MDAsXG4gKiAgIGhlaWdodDogNDAwLFxuICogICBwYWNlOiAxNixcbiAqICAgc2Vuc2luZzogdHJ1ZSxcbiAqICAgcGFyZW50OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhZ2Utd3JhcCcpLFxuICogICBiYWNrZHJvcDogbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCh7Y29sb3I6ICcjRkZCNkMxJ30pXG4gKiB9KTtcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3RhZ2UgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgdGhlIFN0YWdlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLndpZHRoIC0gVGhlIHN0YWdlIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5oZWlnaHQgLSBUaGUgc3RhZ2UgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyBmdWxsIHdpbmRvdy5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYWNlIC0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gd2FpdCBmb3IgZWFjaCBwYWNlZCBtZXRob2QuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyZW50IC0gVGhlIERPTSBlbGVtZW50IGludG8gd2hpY2ggdGhlIHN0YWdlIHdpbGwgYmUgaW5zZXJ0ZWQuIERlZmF1bHQgaXMgdGhlIGJvZHkuXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuYmFja2Ryb3AgLSBBIGRlZmF1bHQgQmFja2Ryb3AuXG4gICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnNlbnNpbmcgLSBFbmFibGVzIHNlbnNpbmcgb2YgbW91c2UgbG9jYXRpb24gYW5kIHdoYXQga2V5cyBwcmVzc2VkLlxuICAqIElmIHRydWUsIHdpbGwgY29uc3RhbnRseSB1cGRhdGUgc3RhZ2UgcHJvcGVydGllczogbW91c2VYLCBtb3VzZVksIGtleXNLZXlDb2RlLCBrZXlzS2V5Q29kZSBhbmQga2V5c0NvZGUgYmFzZWQgb24gdXNlciBpbnB1dC5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgLyoqXG4gICAgKiBlbmFibGVTZW5zaW5nIC0gRW5hYmxlcyBzZW5zaW5nIG9mIGRvY3VtZW50IGxldmVsIGV2ZW50cyAoa2V5ZG93biwgbW91c2Vtb3ZlLCBtb3VzZWRvd24sIHRvdWNobW92ZSlcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGVuYWJsZVNlbnNpbmcoc3RhZ2UpIHtcbiAgICAgIGNvbnN0IG1lID0gc3RhZ2U7XG4gICAgICBtZS5zZW5zaW5nID0gdHJ1ZTtcblxuICAgICAgLyoqXG4gICAgICAqIGNvbXB1dGVYIC0gQ29tcHV0ZXMgY2VudGVyZWQgeCBiYXNlZCBvbiB4IGV4dHJhY3RlZCBmcm9tIGV2ZW50LlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGNvbXB1dGVYKHgpIHtcbiAgICAgICAgcmV0dXJuIHggLSBtZS5lbGVtZW50LmVsLm9mZnNldExlZnQgLSAobWUud2lkdGggLyAyKTtcbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAqIGNvbXB1dGVZIC0gQ29tcHV0ZXMgY2VudGVyZWQgeSBiYXNlZCBvbiB5IGV4dHJhY3RlZCBmcm9tIGV2ZW50LlxuICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGNvbXB1dGVZKHkpIHtcbiAgICAgICAgcmV0dXJuIC15ICsgbWUuZWxlbWVudC5lbC5vZmZzZXRUb3AgKyAobWUuaGVpZ2h0IC8gMik7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xuICAgICAgICBlLmtleSAmJiBtZS5rZXlzS2V5LmluZGV4T2YoZS5rZXkudG9Mb3dlckNhc2UoKSkgPT09IC0xID8gbWUua2V5c0tleS5wdXNoKGUua2V5LnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICAgICAgZS5jb2RlICYmIG1lLmtleXNDb2RlLmluZGV4T2YoZS5jb2RlLnRvTG93ZXJDYXNlKCkpID09PSAtMSA/IG1lLmtleXNDb2RlLnB1c2goZS5jb2RlLnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICAgICAgbWUua2V5c0tleUNvZGUuaW5kZXhPZihlLmtleUNvZGUpID09PSAtMSA/IG1lLmtleXNLZXlDb2RlLnB1c2goZS5rZXlDb2RlKSA6IG51bGw7XG4gICAgICB9KTtcblxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4ge1xuICAgICAgICBlLmtleSA/IG1lLmtleXNLZXkgPSBtZS5rZXlzS2V5LmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUua2V5LnRvTG93ZXJDYXNlKCkpIDogbnVsbDtcbiAgICAgICAgZS5jb2RlID8gbWUua2V5c0NvZGUgPSBtZS5rZXlzQ29kZS5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSBlLmNvZGUudG9Mb3dlckNhc2UoKSkgOiBudWxsO1xuICAgICAgICBtZS5rZXlzS2V5Q29kZSA9IG1lLmtleXNLZXlDb2RlLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGUua2V5Q29kZSk7XG4gICAgICB9KTtcblxuICAgICAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCAoZSkgPT4ge1xuICAgICAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLngpO1xuICAgICAgICBtZS5tb3VzZVkgPSBjb21wdXRlWShlLnkpO1xuICAgICAgfSk7XG5cbiAgICAgIG1lLmVsZW1lbnQuZWwuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgKGUpID0+IHtcbiAgICAgICAgbWUubW91c2VYID0gY29tcHV0ZVgoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRYKTtcbiAgICAgICAgbWUubW91c2VZID0gY29tcHV0ZVkoZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZKTtcbiAgICAgIH0pO1xuXG4gICAgICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgICAgbWUubW91c2VEb3duID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgICBtZS5tb3VzZURvd24gPSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBtZS5lbGVtZW50LmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCAoZSkgPT4ge1xuICAgICAgICBtZS5tb3VzZVggPSBjb21wdXRlWChlLnRvdWNoZXNbMF0uY2xpZW50WCk7XG4gICAgICAgIG1lLm1vdXNlWSA9IGNvbXB1dGVZKGUudG91Y2hlc1swXS5jbGllbnRZKTtcbiAgICAgICAgbWUubW91c2VEb3duID0gdHJ1ZTtcbiAgICAgIH0pO1xuICAgICAgbWUuZWxlbWVudC5lbC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsICgpID0+IHtcbiAgICAgICAgbWUubW91c2VEb3duID0gZmFsc2U7XG4gICAgICAgIGRlbGV0ZSBtZS5tb3VzZVg7XG4gICAgICAgIGRlbGV0ZSBtZS5tb3VzZVk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWZhdWx0cyA9IHtcbiAgICAgIHdpZHRoOiB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgIGhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgcGFyZW50OiBkb2N1bWVudC5ib2R5LFxuICAgICAgcGFjZTogMzMsXG4gICAgICBiYWNrZHJvcDogbnVsbCxcbiAgICAgIG1hcmdpblRCOiAwLFxuICAgIH07XG4gICAgY29uc3QgYWN0dWFsID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIG9wdGlvbnMpO1xuXG4gICAgaWYgKGFjdHVhbC5wYXJlbnQgPT09IGRlZmF1bHRzLnBhcmVudCkge1xuICAgICAgYWN0dWFsLm1hcmdpblRCID0gTWF0aC5mbG9vcigod2luZG93LmlubmVySGVpZ2h0IC0gYWN0dWFsLmhlaWdodCkgLyAyKTtcbiAgICB9XG5cbiAgICBzdXBlcihhY3R1YWwucGFjZSk7XG5cbiAgICAvLyBiYWNrZHJvcHNcbiAgICB0aGlzLmJhY2tkcm9wcyA9IFtdO1xuXG4gICAgLy8hIGFjdHVhbC5iYWNrZHJvcCA/IHRoaXMuYmFja2Ryb3AgPSBuZXcgQmFja2Ryb3AoKSA6IHRoaXMuYmFja2Ryb3AgPSBhY3R1YWwuYmFja2Ryb3A7XG4gICAgaWYgKGFjdHVhbC5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5iYWNrZHJvcCA9IGFjdHVhbC5iYWNrZHJvcDtcbiAgICAgIHRoaXMuYmFja2Ryb3BzLnB1c2godGhpcy5iYWNrZHJvcCk7XG4gICAgfVxuXG4gICAgdGhpcy5lbGVtZW50ID0gbmV3IFN0YWdlRWxlbWVudChhY3R1YWwsIHRoaXMpO1xuICAgIHRoaXMud2lkdGggPSBhY3R1YWwud2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBhY3R1YWwuaGVpZ2h0O1xuXG4gICAgdGhpcy5rZXlzQ29kZSA9IFtdO1xuICAgIHRoaXMua2V5c0tleSA9IFtdO1xuICAgIHRoaXMua2V5c0tleUNvZGUgPSBbXTtcblxuICAgIHRoaXMubW91c2VEb3duID0gbnVsbDtcbiAgICB0aGlzLm1vdXNlWCA9IG51bGw7XG4gICAgdGhpcy5tb3VzZVkgPSBudWxsO1xuXG4gICAgdGhpcy5zcHJpdGVzID0gW107XG5cbiAgICB0aGlzLmNzc1J1bGVzID0gW107XG4gICAgdGhpcy5jbGFzc2VzID0gW107XG5cbiAgICBhY3R1YWwuc2Vuc2luZyA/IGVuYWJsZVNlbnNpbmcodGhpcykgOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIERlbGV0ZXMgdGhlIHN0YWdlIGVsZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKlxuICAqIHN0YWdlLmRlbGV0ZSgpO1xuICAqL1xuICBkZWxldGUoKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKTtcbiAgfVxuXG4gIC8qKiBTZXR1cCBBY3Rpb25zICogKi9cblxuICAvKipcbiAgKiBhZGRTcHJpdGUgLSBBZGRzIGEgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRTcHJpdGUoc3ByaXRlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGFkZC5cbiAgKi9cbiAgYWRkU3ByaXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGN1clNwcml0ZSA9IHNwcml0ZTtcblxuICAgIGN1clNwcml0ZS5lbGVtZW50ID0gbmV3IFNwcml0ZUVsZW1lbnQoc3ByaXRlLCB0aGlzKTtcbiAgICBjdXJTcHJpdGUuc3VyZmFjZSA9IG5ldyBTdGFnZVN1cmZhY2UodGhpcyk7XG5cbiAgICBjdXJTcHJpdGUuZWxlbWVudC5mbGFnID0gdGhpcy5lbGVtZW50LmZsYWc7XG4gICAgY3VyU3ByaXRlLmFnYWluc3RCYWNrZHJvcCA9IHRoaXMuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lcjtcblxuICAgIGN1clNwcml0ZS5zdGFnZVdpZHRoID0gdGhpcy53aWR0aDtcbiAgICBjdXJTcHJpdGUuc3RhZ2VIZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgIHRoaXMuc3ByaXRlcy5wdXNoKGN1clNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLnogPSB0aGlzLnNwcml0ZXMubGVuZ3RoO1xuXG4gICAgc3ByaXRlLmVsZW1lbnQudXBkYXRlKGN1clNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVTcHJpdGUgLSBSZW1vdmVzIGEgc3ByaXRlIGZyb20gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLnJlbW92ZVNwcml0ZShzcHJpdGUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gYWRkLlxuICAqL1xuICByZW1vdmVTcHJpdGUoc3ByaXRlKSB7XG4gICAgY29uc3QgY3VyU3ByaXRlID0gc3ByaXRlO1xuXG4gICAgdGhpcy5zcHJpdGVzID0gdGhpcy5zcHJpdGVzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IHNwcml0ZSk7XG4gICAgY3VyU3ByaXRlLmVsZW1lbnQgPyBjdXJTcHJpdGUuZWxlbWVudCA9IGN1clNwcml0ZS5lbGVtZW50LmRlbGV0ZShjdXJTcHJpdGUpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBsb29rcyAqICovXG5cbiAgLyoqXG4gICogYWRkQmFja2Ryb3AgLSBBZGRzIGEgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gYmFja2Ryb3AgLSB0aGUgYmFja2Ryb3AgdG8gYWRkLlxuICAqL1xuICBhZGRCYWNrZHJvcChiYWNrZHJvcCkge1xuICAgIHRoaXMuYmFja2Ryb3BzLnB1c2goYmFja2Ryb3ApO1xuICAgIC8vIGlmIFwiYmFyZVwiIHNldCB0aGUgYWRkZWQgYXMgYWN0aXZlXG4gICAgIXRoaXMuYmFja2Ryb3AgPyB0aGlzLmJhY2tkcm9wID0gdGhpcy5iYWNrZHJvcHNbMF0gOiBudWxsO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQmFja2Ryb3BUbyAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBiYWNrZHJvcC4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHN3aXRjaCB0b28uXG4gICovXG4gIHN3aXRjaEJhY2tkcm9wVG8oYmFja2Ryb3ApIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YoYmFja2Ryb3ApO1xuICAgIGN1cnJlbnRCYWNrZHJvcEluZGV4ICE9PSAtMSA/IHRoaXMuYmFja2Ryb3AgPSB0aGlzLmJhY2tkcm9wc1tjdXJyZW50QmFja2Ryb3BJbmRleF0gOiBudWxsO1xuXG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBzd2l0Y2hCYWNrZHJvcFRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS4gSWYgbm90IGZvdW5kIGZhaWxzIHNpbGVudGx5LlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnN3aXRjaEJhY2tkcm9wVG9OdW0oMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSB0aGUgYmFja2Ryb3AgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQmFja2Ryb3BUb051bShpbmRleCkge1xuICAgIHRoaXMuc3dpdGNoQmFja2Ryb3BUbyh0aGlzLmJhY2tkcm9wc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogbmV4dEJhY2tkcm9wIC0gU3dpdGNoZXMgdG8gdGhlIG5leHQgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UubmV4dEJhY2tkcm9wKCk7XG4gICovXG4gIG5leHRCYWNrZHJvcCgpIHtcbiAgICBjb25zdCBjdXJyZW50QmFja2Ryb3BJbmRleCA9IHRoaXMuYmFja2Ryb3BzLmluZGV4T2YodGhpcy5iYWNrZHJvcCk7XG4gICAgdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXTtcblxuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQmFja2Ryb3AgLSBSZW1vdmVzIGEgYmFja2Ryb3AuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBzdGFnZS5hZGRCYWNrZHJvcChiYWNrZHJvcCk7XG4gICogc3RhZ2UucmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3AoYmFja2Ryb3ApIHtcbiAgICBpZiAodGhpcy5iYWNrZHJvcHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgY3VycmVudEJhY2tkcm9wSW5kZXggPSB0aGlzLmJhY2tkcm9wcy5pbmRleE9mKGJhY2tkcm9wKTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPT09IGJhY2tkcm9wID8gdGhpcy5iYWNrZHJvcCA9IHRoaXMuYmFja2Ryb3BzWyhjdXJyZW50QmFja2Ryb3BJbmRleCArIDEpICUgdGhpcy5iYWNrZHJvcHMubGVuZ3RoXSA6IG51bGw7XG4gICAgICB0aGlzLmJhY2tkcm9wcyA9IHRoaXMuYmFja2Ryb3BzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGJhY2tkcm9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5iYWNrZHJvcHMgPSBbXTtcbiAgICAgIHRoaXMuYmFja2Ryb3AgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHJlbW92ZUJhY2tkcm9wTnVtIC0gUmVtb3ZlcyB0aGUgc3BlY2lmaWVkIGJhY2tkcm9wIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBiYWNrZHJvcCwgd2lsbCBmYWlsIGFuZCBlbWl0IGEgY29uc29sZSBtZXNzYWdlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IGJhY2tkcm9wID0gbmV3IGJsb2NrTGlrZS5CYWNrZHJvcCgpO1xuICAqXG4gICogc3RhZ2UuYWRkQmFja2Ryb3AoYmFja2Ryb3ApO1xuICAqIHN0YWdlLnJlbW92ZUJhY2tkcm9wTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGJhY2tkcm9wIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQmFja2Ryb3BOdW0oaW5kZXgpIHtcbiAgICB0aGlzLnJlbW92ZUJhY2tkcm9wKHRoaXMuYmFja2Ryb3BzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiByZWZyZXNoIC0gRm9yY2VzIGEgc3ByaXRlIHJlZnJlc2guXG4gICogTm90ZTogc2VydmljZSBtZXRob2QgdG8gYmUgdXNlZCBpZiBjb3N0dW1lIHdhcyBtYW5pcHVsYXRlZCBkaXJlY3RseS5cbiAgKi9cbiAgcmVmcmVzaCgpIHtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKiBTcHJpdGVzICogKi9cblxuICAvKipcbiAgKiBfcmVmcmVzaFNwcml0ZXMgLSBSZWZyZXNoIHRoZSBET00gZWxlbWVudCBvZiBhbGwgc3ByaXRlcyBjdXJyZW50bHkgb24gc3RhZ2UuXG4gICpcbiAgKiBAcHJpdmF0ZVxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBiYWNrZHJvcCB0byBzd2l0Y2ggdG9vLlxuICAqL1xuICBfcmVmcmVzaFNwcml0ZXMoKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIHRoaXMuc3ByaXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICBjb25zdCBzcHJpdGUgPSBpdGVtO1xuICAgICAgaSArPSAxO1xuICAgICAgc3ByaXRlLnogPSBpO1xuICAgICAgc3ByaXRlLmVsZW1lbnQgPyBzcHJpdGUuZWxlbWVudC51cGRhdGUoc3ByaXRlKSA6IG51bGw7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlQmFja3dhcmRzIC0gTW92ZXMgdGhlIHNwcml0ZSBvbmUgcGxhY2UgZG93biB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHNwcml0ZSAtIHRoZSBzcHJpdGUgdG8gbW92ZS5cbiAgKi9cbiAgc2VuZFNwcml0ZUJhY2t3YXJkcyhzcHJpdGUpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3ByaXRlcy5pbmRleE9mKHNwcml0ZSk7XG4gICAgaWYgKGluZGV4ID4gMCkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCAtIDFdOyAvLyBtb3ZlIG9uZSB1cFxuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4IC0gMV0gPSBzcHJpdGU7IC8vIG1lIHN1YmplY3QgZG93blxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZUZvcndhcmQgLSBNb3ZlcyB0aGUgc3ByaXRlIG9uZSBwbGFjZSB1cCBpbiB0aGUgXCJwaWxlXCIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZUZvcndhcmQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVGb3J3YXJkKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICBpZiAoaW5kZXggPCB0aGlzLnNwcml0ZXMubGVuZ3RoIC0gMSkge1xuICAgICAgdGhpcy5zcHJpdGVzW2luZGV4XSA9IHRoaXMuc3ByaXRlc1tpbmRleCArIDFdOyAvLyBtb3ZlIG9uZSBkb3duXG4gICAgICB0aGlzLnNwcml0ZXNbaW5kZXggKyAxXSA9IHNwcml0ZTsgLy8gbWUgc3ViamVjdCB1cFxuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoU3ByaXRlcygpO1xuICB9XG5cbiAgLyoqXG4gICogc2VuZFNwcml0ZVRvRnJvbnQgLSBCcmluZ3MgdGhlIHNwcml0ZSB0byB0aGUgZnJvbnQgb2YgdGhlIFwicGlsZVwiXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHN0YWdlLmFkZFNwcml0ZShzcHJpdGUpO1xuICAqIHN0YWdlLndoZW5GbGFnKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2VuZFNwcml0ZVRvRnJvbnQoc3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUuXG4gICovXG4gIHNlbmRTcHJpdGVUb0Zyb250KHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNwcml0ZXMucHVzaChzcHJpdGUpO1xuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKipcbiAgKiBzZW5kU3ByaXRlVG9CYWNrIC0gU2VuZHMgdGhlIHNwcml0ZSB0byB0aGUgYmFjayBvZiB0aGUgXCJwaWxlXCJcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3RhZ2UuYWRkU3ByaXRlKHNwcml0ZSk7XG4gICogc3RhZ2Uud2hlbkZsYWcoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5zZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlLlxuICAqL1xuICBzZW5kU3ByaXRlVG9CYWNrKHNwcml0ZSkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zcHJpdGVzLmluZGV4T2Yoc3ByaXRlKTtcbiAgICB0aGlzLnNwcml0ZXMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB0aGlzLnNwcml0ZXMudW5zaGlmdChzcHJpdGUpO1xuICAgIHRoaXMuX3JlZnJlc2hTcHJpdGVzKCk7XG4gIH1cblxuICAvKiBzZW5zaW5nICovXG5cbiAgLyoqXG4gICogaXNLZXlQcmVzc2VkIC0gQ2hlY2tzIGlmIGEga2V5IGlzIHByZXNzZWQuIFN0YWdlIHNlbnNpbmcgbXVzdCBiZSBlbmFibGVkLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zYXkoc3RhZ2UuaXNLZXlQcmVzc2VkKCdhJykpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHVzZXJLZXkgLSB0aGUga2V5IHByZXNzZWQuIE1heSBiZSB0aGUgY29kZSBvciB0aGUgY2hhcmFjdGVyIGl0c2VsZiAoQSBvciA2NSlcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICBpc0tleVByZXNzZWQodXNlcktleSkge1xuICAgIGxldCBtYXRjaCA9IGZhbHNlO1xuICAgIGxldCBjaGVjaztcblxuICAgIHR5cGVvZiB1c2VyS2V5ID09PSAnc3RyaW5nJyA/IGNoZWNrID0gdXNlcktleS50b0xvd2VyQ2FzZSgpIDogY2hlY2sgPSB1c2VyS2V5O1xuICAgIC8vIE1ha2Ugc3VyZSBlYWNoIHByb3BlcnR5IGlzIHN1cHBvcnRlZCBieSBicm93c2Vycy5cbiAgICAvLyBOb3RlOiB1c2VyIG1heSB3cml0ZSBpbmNvbXBhdGlibGUgY29kZS5cbiAgICB0aGlzLmtleXNLZXkuaW5kZXhPZihjaGVjaykgIT09IC0xID8gbWF0Y2ggPSB0cnVlIDogbnVsbDtcbiAgICB0aGlzLmtleXNDb2RlLmluZGV4T2YoY2hlY2spICE9PSAtMSA/IG1hdGNoID0gdHJ1ZSA6IG51bGw7XG4gICAgdGhpcy5rZXlzS2V5Q29kZS5pbmRleE9mKGNoZWNrKSAhPT0gLTEgPyBtYXRjaCA9IHRydWUgOiBudWxsO1xuXG4gICAgIXRoaXMuc2Vuc2luZyA/IGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc0tleVByZXNzZWQoKSBpbmdub3JlZC4gU3RhZ2Ugc2Vuc2luZyBub3QgZW5hYmxlZC4nKSA6IG51bGw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tY29uc29sZVxuXG4gICAgcmV0dXJuIG1hdGNoO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9zdGFnZS5qc1xuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiogRW5jYXBzdWxhdGVzIHRoZSBmdW5jdGlvbmFsaXR5IG9mIHJld3JpdGluZyB1c2VyIGNvZGUgdG8gYWxsb3cgZm9yIEJsb2NrTGlrZS5qcyBmZWF0dXJlcy5cbiovXG5cbi8qKlxuKiBpbnNlcnRQYWNlZCAtIGluc2VydHMgYSB0aW1lZCBhd2FpdCBsaW5lIGFmdGVyIGFueSBtZXRob2QgdGhhdCBpcyBvbiB0aGUgbGlzdCBvZiBwYWNlZCBtZXRob2RzLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRQYWNlZChpdGVtLCBlbnRpdHkpIHtcbiAgbGV0IGZvdW5kID0gZmFsc2U7XG4gIGxldCBpID0gZW50aXR5LnBhY2VkLmxlbmd0aDtcblxuICB3aGlsZSAoaSkge1xuICAgIGkgLT0gMTtcbiAgICBpdGVtLmluZGV4T2YoYC4ke2VudGl0eS5wYWNlZFtpXX0oYCkgIT09IC0xID8gKGZvdW5kID0gdHJ1ZSkgOiBudWxsO1xuICAgIGlmIChmb3VuZCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZvdW5kID8gYCR7aXRlbX1cXG4gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsICR7ZW50aXR5LnBhY2V9KSk7YCA6IGl0ZW07XG59XG5cbi8qKlxuKiBpbnNlcnRXYWl0ZWQgLSBpbnNlcnRzIHRoZSBcIm1lY2hhbmlzbVwiIHRoYXQgc3RvcHMgZXhlY3V0aW9uIGFuZCBhd2FpdHMgZm9yIHRoZSBtZXRob2QgdG8gZmluaXNoLlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gaXRlbSAtIGEgbGluZSBvZiBjb2RlLlxuKiBAcGFyYW0ge2VudGl0eX0gZW50aXR5IC0gdGhlIGVudGl0eSB0cmlnZ2VyaW5nIHRoZSBtZXRob2QuXG4qXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIChtdWx0aSlsaW5lIG9mIGNvZGUuXG4qL1xuZnVuY3Rpb24gaW5zZXJ0V2FpdGVkKGl0ZW0sIGVudGl0eSkge1xuICBsZXQgZm91bmQgPSBudWxsO1xuICBsZXQgY29kZTtcbiAgbGV0IGk7XG5cbiAgLy8gbG9vayBmb3Igd2FpdGVkIG1ldGhvZHMuXG4gIGkgPSBlbnRpdHkud2FpdGVkLmxlbmd0aDtcbiAgd2hpbGUgKGkpIHtcbiAgICBpIC09IDE7XG4gICAgaXRlbS5pbmRleE9mKGAuJHtlbnRpdHkud2FpdGVkW2ldfShgKSAhPT0gLTEgPyAoZm91bmQgPSBlbnRpdHkud2FpdGVkW2ldKSA6IG51bGw7XG4gICAgaWYgKGZvdW5kKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICAvLyBub3QgYSBub3JtYWwgXCJ3YWl0ZWRcIi4gbG9vayBmb3Igd2FpdGVkUmV0dXJuZWQuXG4gIGlmICghZm91bmQpIHtcbiAgICBsZXQgdGhlVmFyID0gbnVsbDtcblxuICAgIGkgPSBlbnRpdHkud2FpdGVkUmV0dXJuZWQubGVuZ3RoO1xuICAgIHdoaWxlIChpKSB7XG4gICAgICBpIC09IDE7XG4gICAgICBpdGVtLmluZGV4T2YoYC4ke2VudGl0eS53YWl0ZWRSZXR1cm5lZFtpXX0oYCkgIT09IC0xID8gKGZvdW5kID0gZW50aXR5LndhaXRlZFJldHVybmVkW2ldKSA6IG51bGw7XG4gICAgICBpZiAoZm91bmQpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29kZSBmb3Igd2FpdGVkUmV0dXJuXG4gICAgdGhlVmFyID0gaXRlbS5zdWJzdHIoMCwgaXRlbS5pbmRleE9mKCc9JykpLnJlcGxhY2UoJ2xldCcsICcnKS5yZXBsYWNlKCd2YXInLCAnJykudHJpbSgpO1xuICAgIGNvZGUgPSBgJHtpdGVtLnN1YnN0cmluZygwLCBpdGVtLmxhc3RJbmRleE9mKCcpJykpfSwgJyR7dGhlVmFyfScsICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgO1xuXG4gICAgLy8gaW52b2tlIGlzIFwiZm9yZ2l2aW5nXCIuIG1heSwgb3IgbWF5IG5vdCwgaGF2ZSB2YXJpYWJsZXMuXG4gICAgZm91bmQgPT09ICdpbnZva2UnICYmIChpdGVtLmluZGV4T2YoJywnKSA9PT0gLTEpID8gY29kZSA9IGAke2l0ZW0uc3Vic3RyaW5nKDAsIGl0ZW0ubGFzdEluZGV4T2YoJyknKSl9LCBbXSwgJyR7dGhlVmFyfScsICcke2VudGl0eS50cmlnZ2VyaW5nSWR9JylgIDogbnVsbDtcbiAgfSBlbHNlIHtcbiAgICAvLyBjb2RlIGZvciBcIm5vcm1hbFwiIHdhaXRlZFxuICAgIGNvZGUgPSBgJHtpdGVtLnN1YnN0cmluZygwLCBpdGVtLmxhc3RJbmRleE9mKCcpJykpfSwgJyR7ZW50aXR5LnRyaWdnZXJpbmdJZH0nKWA7XG4gIH1cblxuICAvLyBlbnRpdHkudHJpZ2dlcmluZ0lkIGNyZWF0ZXMgYSB1bmlxdWUgY29udGV4dCB0byBjaGFpbiB0aGUgd2FpdGVkIG1ldGhvZHMuXG4gIGNvZGUgPSBgXG4gICAgJHtjb2RlfVxcbiBcbiAgICBhd2FpdCBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Jsb2NrTGlrZS53YWl0ZWQuJHtlbnRpdHkudHJpZ2dlcmluZ0lkfScsIGZ1bmN0aW9uIHdhaXRlZExpc3RlbmVyKGUpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmxvY2tMaWtlLndhaXRlZC4ke2VudGl0eS50cmlnZ2VyaW5nSWR9Jywgd2FpdGVkTGlzdGVuZXIpO1xuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBgO1xuXG4gIHJldHVybiBmb3VuZCA/IGNvZGUgOiBpdGVtO1xufVxuXG4vKipcbiogaW5zZXJ0QXN5bmMgLSBBZGRzIGtleXdvcmQgYXN5bmMgdG8gZnVuY3Rpb24gZGVjZWxlcmF0aW9uLlxuKiBXaWxsIGNhdGNoIGFsbCBuYW1lZCBmdW5jdGlvbiBkZWNlbGVyYXRpb25zIHdpdGggYSBzcGFjZSBhZnRlciB0aGUga2V5d29yZCAnZnVuY3Rpb24nXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBpbnNlcnRBc3luYyhpdGVtKSB7XG4gIGNvbnN0IGV4aXN0ID0gaXRlbS5pbmRleE9mKCdhc3luYyAnKTtcbiAgY29uc3QgcmVnRXhwID0gL2Z1bmN0aW9uIHxmdW5jdGlvblxcKHxmdW5jdGlvbiggfFxcdClcXCgvO1xuICBjb25zdCBtYXRjaGVzID0gcmVnRXhwLmV4ZWMoaXRlbSk7XG5cbiAgcmV0dXJuIGV4aXN0ID09PSAtMSAmJiBtYXRjaGVzID8gYCR7aXRlbS5zdWJzdHJpbmcoMCwgbWF0Y2hlcy5pbmRleCl9IGFzeW5jICR7aXRlbS5zdWJzdHJpbmcobWF0Y2hlcy5pbmRleCwgaXRlbS5sZW5ndGgpfWAgOiBpdGVtO1xufVxuXG4vKipcbiogZW1wdHlMb29wUHJvdGVjdGlvbiAtIGV4YW1pbmVzIHRoZSBjb2RlIGZvciB3aGlsZSBhbmQgZm9yIHN0YXRlbWVudHMgdGhhdCBhcmUgZW1wdHkuXG4qIE5vdGU6IHNpbmNlIHdoaWxlKHRydWUpe30gaXMgbGlrZWx5IHRvIGJlIGNvZGVkIGJ5IHRoZSB1c2VyIHRoaXMgcHJldmVudHMgaW5maW5pdGUgbG9vcHMuXG4qXG4qIEBwYXJhbSB7c3RyaW5nfSBpdGVtIC0gYSBsaW5lIG9mIGNvZGUuXG4qIEByZXR1cm4ge3N0cmluZ30gLSBhIG1vZGlmaWVkIGxpbmUgb2YgY29kZS5cbiovXG5mdW5jdGlvbiBlbXB0eUxvb3BQcm90ZWN0aW9uKGZ1bmNTKSB7XG4gIGNvbnN0IGNoZWNrID0gZnVuY1MucmVwbGFjZSgvXFxzKy9nLCAnJykucmVwbGFjZSgvXFxyP1xcbnxcXHIvZywgJycpO1xuXG4gIGNvbnN0IHJlZ0V4cCA9IC93aGlsZVxcKFtcXHNcXFNdKlxcKXt9fGZvclxcKFtcXHNcXFNdKlxcKXt9fGRve313aGlsZVxcKFtcXHNcXFNdKlxcKS87XG4gIGNvbnN0IG1hdGNoZXMgPSByZWdFeHAuZXhlYyhjaGVjayk7XG5cbiAgcmV0dXJuICEhbWF0Y2hlcztcbn1cblxuLyoqXG4qIHJlbW92ZU91dGVyIC0gUmVtb3ZlcyB0aGUgb3V0ZXIgZnVuY3Rpb24gZGVmaW5pdGlvbiBhbmQgcmV0dXJucyB0aGUgZnVuY3Rpb24gY29kZSBib2R5LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIGJvZHkgb2YgdGhlIGZ1bmN0aW9uLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZU91dGVyKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5zdWJzdHJpbmcoZnVuY1MuaW5kZXhPZigneycpICsgMSwgZnVuY1MubGFzdEluZGV4T2YoJ30nKSk7XG59XG5cbi8qKlxuKiByZW1vdmVDb21tZW50cyAtIFJlbW92ZXMgY29tbWVudHMgZnJvbSBjb2RlLlxuKiBmcm9tOiBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTUxMjM3NzdcbipcbiogQHBhcmFtIHtzdHJpbmd9IGZ1bmNTIC0gdGhlIGZ1bmN0aW9uIGJlaW5nIHJld3JpdHRlbi5cbiogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBmdW5jdGlvbiB3aXRob3V0IGNvbW1lbnRzLlxuKi9cbmZ1bmN0aW9uIHJlbW92ZUNvbW1lbnRzKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5yZXBsYWNlKC9cXC9cXCpbXFxzXFxTXSo/XFwqXFwvfChbXlxcXFw6XXxeKVxcL1xcLy4qJC9nbSwgJycpO1xufVxuXG4vKipcbiogZ2V0RXZlbnRPYmplY3RWYXJOYW1lIC0gZXh0cmFjdHMgdGhlIHZhcmlhYmxlIG5hbWUgdGhhdCBob2xkcyB0aGUgZXZlbnQgb2JqZWN0LlxuKlxuKiBAcGFyYW0ge3N0cmluZ30gZnVuY1MgLSB0aGUgZnVuY3Rpb24gYmVpbmcgcmV3cml0dGVuLlxuKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHZhcmlhYmxlIG5hbWUuXG4qL1xuZnVuY3Rpb24gZ2V0RXZlbnRPYmplY3RWYXJOYW1lKGZ1bmNTKSB7XG4gIHJldHVybiBmdW5jUy5zdWJzdHJpbmcoZnVuY1MuaW5kZXhPZignKCcpICsgMSwgZnVuY1MuaW5kZXhPZignKScpKTtcbn1cblxuLyoqXG4qIHJld3JpdGUgLSByZXdyaXRlcyBhIGZ1bmN0aW9uIHRvIGFuIGFzeW5jIHZlcnNpb24gdGhhdCBpcyBcInBhY2VkXCIgdXNpbmcgYXdhaXRpbmcgZm9yIHByb21pc2VzLlxuKiBUaGlzIGFsbG93cyB0aGUgdXNlciB0byB3cml0ZSBzZXF1ZW50aWFsIHNpbXBsZSBjb2RlIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBpbiBhIHBhY2VkIG1hbm5lci5cbipcbiogQHBhcmFtIHtmdW5jdGlvbn0gZnVuYyAtIGEgZnVuY3Rpb24gdG8gcmV3cml0ZVxuKiBAcGFyYW0gLSB7T2JqZWN0fSBlbnRpdHkgLSBhIHNwcml0ZSBvciBzdGFnZSBvYmplY3QgdG8gd2hpY2ggdGhlIGZ1bmN0aW9uIGFwcGxpZXMuXG4qIEByZXR1cm4ge2Z1bmN0aW9ufSAtIGFuIGFzeW5jIG1vZGlmaWVkIGZ1bmN0aW9uLlxuKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJld3JpdGUoZnVuYywgZW50aXR5KSB7XG4gIGxldCBjb2RlID0gZnVuYy50b1N0cmluZygpO1xuICBjb25zdCB0aGVWYXIgPSBnZXRFdmVudE9iamVjdFZhck5hbWUoY29kZSk7XG5cbiAgLy8gcmV3cml0ZSB0aGUgY29kZVxuICBpZiAoZW1wdHlMb29wUHJvdGVjdGlvbihjb2RlKSkge1xuICAgIGNvZGUgPSAndGhyb3cgXFwnQmxvY2tMaWtlLmpzIEVycm9yOiBFbXB0eSBsb29wIGRldGVjdGVkXFwnOyc7XG4gIH0gZWxzZSB7XG4gICAgY29kZSA9IHJlbW92ZUNvbW1lbnRzKHJlbW92ZU91dGVyKGNvZGUpKTtcblxuICAgIGNvZGUgPSBjb2RlLnNwbGl0KCdcXG4nKS5maWx0ZXIoaXRlbSA9PiBpdGVtICE9PSAnJyk7XG5cbiAgICBjb2RlID0gY29kZS5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IHRlbXAgPSBpdGVtO1xuICAgICAgbGV0IHJlc3VsdCA9IHRlbXA7XG5cbiAgICAgIC8vIGEgbWV0aG9kIGNhbiBiZSBvbmUgb2YgdGhlIGZvbGxvd2luZyBidXQgbm90IG1vcmUgdGhhbiBvbmVcbiAgICAgIHJlc3VsdCA9PT0gdGVtcCA/IHJlc3VsdCA9IGluc2VydFBhY2VkKHRlbXAsIGVudGl0eSkgOiBudWxsOyAvLyBtb3JlIGxpa2VseVxuICAgICAgcmVzdWx0ID09PSB0ZW1wID8gcmVzdWx0ID0gaW5zZXJ0V2FpdGVkKHRlbXAsIGVudGl0eSkgOiBudWxsOyAvLyBsZXNzIGxpa2VseVxuXG4gICAgICAvLyBhbmQgb25seSBpZiBub3QgYSBtZXRob2Qgd2lsbCBhZGQgYXN5bmMgdG8gZnVuY3Rpb25zXG4gICAgICByZXN1bHQgPT09IHRlbXAgPyByZXN1bHQgPSBpbnNlcnRBc3luYyh0ZW1wKSA6IG51bGw7XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG4gICAgY29kZSA9IGNvZGUuam9pbignXFxuJyk7XG4gIH1cblxuICAvLyB0cmFuc2Zvcm0gdGhlIHRleHQgaW50byBhIGZ1bmN0aW9uXG4gIGNvbnN0IEFzeW5jRnVuY3Rpb24gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoYXN5bmMgKCkgPT4ge30pLmNvbnN0cnVjdG9yO1xuICBsZXQgYWYgPSBuZXcgQXN5bmNGdW5jdGlvbihjb2RlKTtcblxuICAvLyBwYXNzIHRoZSBldmVudCBvYmplY3QgdG8gdGhlIGZ1bmN0aW9uIGlmIGV4aXN0cy5cbiAgdGhlVmFyID8gYWYgPSBuZXcgQXN5bmNGdW5jdGlvbih0aGVWYXIsIGNvZGUpIDogbnVsbDtcblxuICB3aW5kb3cuYmxvY2tMaWtlICYmIHdpbmRvdy5ibG9ja0xpa2UuZGVidWcgPyBjb25zb2xlLmxvZyhhZikgOiBudWxsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcblxuICByZXR1cm4gYWY7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9yZXdyaXRlci5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0ICogYXMgY3NzIGZyb20gJy4vZWxlbWVudC1jc3MnO1xuXG4vKipcbiAqIENsYXNzIHJlcHJlc2VudGluZyB0aGUgVUkgRWxlbWVudCBvZiB0aGUgc3RhZ2UuXG4gKiBFYWNoIFN0YWdlIGhhcyBvbmUuXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdGFnZUVsZW1lbnQge1xuICAvKipcbiAgKiBjb25zdHJ1Y3RvciAtIENyZWF0ZXMgYSBTdGFnZSBFbGVtZW50LlxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSB0aGUgc3RhZ2UgZm9yIHdoaWNoIHRoZSBlbGVtZW50IGlzIGNyZWF0ZWQuXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIGNyZWF0ZWQuXG4gICovXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnMsIHN0YWdlKSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8qKlxuICAgICogY3JlYXRlRGl2IC0gY3JlYXRlcyBhIGRpdiBhdCBzcGVjaWZpZWQgekluZGV4LlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSB6SW5kZXggLSBkZXNpcmVkIHBsYWNlIGluIFwic3RhY2tcIlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIGEgc3RhZ2Ugd2lkZS9oaWdoIERPTSBlbGVtZW50LlxuICAgICovXG4gICAgZnVuY3Rpb24gY3JlYXRlRGl2KHpJbmRleCkge1xuICAgICAgY29uc3Qgc2VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICAgIHNlbC5zdHlsZS53aWR0aCA9IGAke29wdGlvbnMud2lkdGh9cHhgO1xuICAgICAgc2VsLnN0eWxlLmhlaWdodCA9IGAke29wdGlvbnMuaGVpZ2h0fXB4YDtcbiAgICAgIHNlbC5zdHlsZS56SW5kZXggPSB6SW5kZXg7XG4gICAgICBzZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgc2VsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ21hbmlwdWxhdGlvbic7XG5cbiAgICAgIHJldHVybiBzZWw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBjcmVhdGVDYW52YXMgLSBjcmVhdGVzIGEgY2FudmFzIGF0IHNwZWNpZmllZCB6SW5kZXguXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHpJbmRleCAtIGRlc2lyZWQgcGxhY2UgaW4gXCJzdGFja1wiXG4gICAgKiBAcmV0dXJuIHtvYmplY3R9IC0gYSBzdGFnZSB3aWRlL2hpZ2ggRE9NIGVsZW1lbnQuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBjcmVhdGVDYW52YXMoekluZGV4KSB7XG4gICAgICBjb25zdCBjZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgY2VsLndpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgICAgIGNlbC5oZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgICAgIGNlbC5zdHlsZS56SW5kZXggPSB6SW5kZXg7XG4gICAgICBjZWwuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgY2VsLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgIGNlbC5zdHlsZS50b3AgPSAnMHB4JztcblxuICAgICAgcmV0dXJuIGNlbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIGNyZWF0ZUZsYWcgLSBjcmVhdGVzIGEgXCJmbGFnXCIgZGl2LlxuICAgICpcbiAgICAqIEByZXR1cm4ge29iamVjdH0gLSBhIHN0YWdlIHdpZGUvaGlnaCBET00gZWxlbWVudCB3aXRoIGZsYWcgYXQgY2VudGVycy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNyZWF0ZUZsYWcoKSB7XG4gICAgICBjb25zdCBmbGFnU2l6ZSA9IDEzMDtcbiAgICAgIGNvbnN0IGZlbCA9IGNyZWF0ZURpdigtMSk7XG5cbiAgICAgIGNvbnN0IGZlbGl0ZW0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgICAgY29uc3QgeCA9IC0oZmxhZ1NpemUgLyAyKTtcbiAgICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB5IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICAgIGNvbnN0IHkgPSAtKGZsYWdTaXplIC8gMik7XG5cbiAgICAgIC8vIGxvb2tzXG4gICAgICBmZWxpdGVtLnN0eWxlLndpZHRoID0gYCR7ZmxhZ1NpemV9cHhgO1xuICAgICAgZmVsaXRlbS5zdHlsZS5oZWlnaHQgPSBgJHtmbGFnU2l6ZX1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGZlbGl0ZW0uaW5uZXJIVE1MID0gJyYjOTg3MzsnO1xuXG4gICAgICBmZWxpdGVtLnN0eWxlLmxlZnQgPSBgJHsob3B0aW9ucy53aWR0aCAvIDIpICsgeH1weGA7XG4gICAgICBmZWxpdGVtLnN0eWxlLnRvcCA9IGAkeyhvcHRpb25zLmhlaWdodCAvIDIpICsgeX1weGA7XG4gICAgICBmZWxpdGVtLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtZmxhZyc7XG5cbiAgICAgIGZlbC5hcHBlbmRDaGlsZChmZWxpdGVtKTtcbiAgICAgIGZlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gICAgICByZXR1cm4gZmVsO1xuICAgIH1cblxuICAgIGVsLmlkID0gYCR7c3RhZ2UuaWR9YDtcblxuICAgIGVsLnN0eWxlLndpZHRoID0gYCR7b3B0aW9ucy53aWR0aH1weGA7XG4gICAgZWwuc3R5bGUuaGVpZ2h0ID0gYCR7b3B0aW9ucy5oZWlnaHR9cHhgO1xuXG4gICAgZWwuc3R5bGUubWFyZ2luID0gYCR7b3B0aW9ucy5tYXJnaW5UQn1weCBhdXRvYDtcblxuICAgIGVsLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcbiAgICBlbC5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgZWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcblxuICAgIG9wdGlvbnMucGFyZW50LmFwcGVuZENoaWxkKGVsKTtcblxuICAgIHRoaXMuYmFja2Ryb3BDb250YWluZXIgPSBjcmVhdGVDYW52YXMoMCk7XG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lci5pZCA9IGAke3N0YWdlLmlkfS1iYWNrZHJvcGA7XG4gICAgdGhpcy5iYWNrZHJvcENvbnRhaW5lci5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWJhY2tkcm9wJztcbiAgICBlbC5hcHBlbmRDaGlsZCh0aGlzLmJhY2tkcm9wQ29udGFpbmVyKTtcblxuICAgIHRoaXMuY2FudmFzID0gY3JlYXRlQ2FudmFzKDApO1xuICAgIHRoaXMuY2FudmFzLmlkID0gYCR7c3RhZ2UuaWR9LXN1cmZhY2VgO1xuICAgIHRoaXMuY2FudmFzLmNsYXNzTmFtZSA9ICdibG9ja2xpa2UtcGFuZWwtc3VyZmFjZSc7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuXG4gICAgdGhpcy5lbCA9IGNyZWF0ZURpdigwKTtcbiAgICB0aGlzLmVsLmlkID0gYCR7c3RhZ2UuaWR9LWNvbnRhaW5lcmA7XG4gICAgdGhpcy5lbC5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWNvbnRhaW5lcic7XG4gICAgZWwuYXBwZW5kQ2hpbGQodGhpcy5lbCk7XG5cbiAgICB0aGlzLmZsYWcgPSBjcmVhdGVGbGFnKCk7XG4gICAgdGhpcy5mbGFnLmlkID0gYCR7c3RhZ2UuaWR9LWZsYWdgO1xuICAgIHRoaXMuZmxhZy5jbGFzc05hbWUgPSAnYmxvY2tsaWtlLXBhbmVsLWZsYWcnO1xuICAgIGVsLmFwcGVuZENoaWxkKHRoaXMuZmxhZyk7XG5cbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlcyB0aGUgRE9NIGVsZW1lbnQuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB0aGUgc3RhZ2UgdG8gdXBkYXRlLlxuICAqL1xuICB1cGRhdGUoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZWw7XG4gICAgY29uc3QgYmFja2Ryb3BDb250ZXh0ID0gc3RhZ2UuZWxlbWVudC5iYWNrZHJvcENvbnRhaW5lci5nZXRDb250ZXh0KCcyZCcpO1xuXG4gICAgLy8gSWYgY29sb3IgLSBmaWxsIHRoZSBjYW52YXMgd2l0aCB0aGUgY29sb3Igc2V0LCBvciBjbGVhciBpdFxuICAgIGlmIChzdGFnZS5iYWNrZHJvcCAmJiBzdGFnZS5iYWNrZHJvcC5jb2xvcikge1xuICAgICAgYmFja2Ryb3BDb250ZXh0LnJlY3QoMCwgMCwgc3RhZ2Uud2lkdGgsIHN0YWdlLmhlaWdodCk7XG4gICAgICBiYWNrZHJvcENvbnRleHQuZmlsbFN0eWxlID0gc3RhZ2UuYmFja2Ryb3AuY29sb3I7XG4gICAgICBiYWNrZHJvcENvbnRleHQuZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBiYWNrZHJvcENvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHN0YWdlLndpZHRoLCBzdGFnZS5oZWlnaHQpO1xuICAgIH1cblxuICAgIC8vIElmIGltYWdlIC0gZHJhdyB0aGUgaW1hZ2Ugb24gY2FudmFzXG4gICAgaWYgKHN0YWdlLmJhY2tkcm9wICYmIHN0YWdlLmJhY2tkcm9wLmltYWdlKSB7XG4gICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgIGltZy5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGJhY2tkcm9wQ29udGV4dC5kcmF3SW1hZ2UoaW1nLCAwLCAwLCBzdGFnZS53aWR0aCwgc3RhZ2UuaGVpZ2h0KTtcbiAgICAgIH07XG4gICAgICBpbWcuc3JjID0gc3RhZ2UuYmFja2Ryb3AuaW1hZ2U7XG4gICAgfVxuXG4gICAgLy8gY3NzIHJ1bGVzXG4gICAgY3NzLmFwcGx5KHN0YWdlKTtcblxuICAgIC8vIGNzcyBjbGFzc2VzXG4gICAgc3RhZ2UuYmFja2Ryb3AgPyBlbC5jbGFzc05hbWUgPSBzdGFnZS5iYWNrZHJvcC5jbGFzc2VzLmNvbmNhdChzdGFnZS5jbGFzc2VzKS5qb2luKCcgJykgOiBlbC5jbGFzc05hbWUgPSBzdGFnZS5jbGFzc2VzLmpvaW4oJyAnKTtcbiAgfVxuXG4gIC8qKlxuICAqIGRlbGV0ZSAtIGRlbGV0ZXMgdGhlIERPTSBlbGVtZW50XG4gICovXG4gIGRlbGV0ZShzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5lbDtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cblxuICAvKipcbiAgKiBhZGRGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgaW5mcm9udCBvZiBldmVyeXRoaW5nIChzaG93cyBpdClcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHRoZSBzdGFnZSB0aGF0IFwicmVxdWVzdGVkXCIgdGhlIGZsYWcuXG4gICovXG4gIGFkZEZsYWcoc3RhZ2UpIHtcbiAgICBjb25zdCBlbCA9IHN0YWdlLmVsZW1lbnQuZmxhZztcblxuICAgIGVsLnN0eWxlLnpJbmRleCA9IDEwMDA7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGbGFnIC0gcHV0cyB0aGUgZmxhZyBkaXYgYXQgdGhlIGJhY2sgKGhpZGVzIGl0KVxuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gdGhlIHN0YWdlIHRoYXQgXCJyZXF1ZXN0ZWRcIiB0aGUgZmxhZy5cbiAgKi9cbiAgcmVtb3ZlRmxhZyhzdGFnZSkge1xuICAgIGNvbnN0IGVsID0gc3RhZ2UuZWxlbWVudC5mbGFnO1xuXG4gICAgZWwuc3R5bGUuekluZGV4ID0gLTE7XG4gICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvc3RhZ2UtZWxlbWVudC5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IExvb2sgZnJvbSAnLi9sb29rJztcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYSBCYWNrZHJvcC5cbiAqIEJhY2tkcm9wcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgTG9va1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3Aoe1xuICogICBpbWFnZTogJ2h0dHBzOi8vd3d3LmJsb2NrbGlrZS5vcmcvaW1hZ2VzL2JhY2tkcm9wLnN2ZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKHtcbiAqICAgY29sb3I6ICcjQTJEQUZGJ1xuICogfSk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhY2tkcm9wIGV4dGVuZHMgTG9vayB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIEJhY2tkcm9wIHRvIGJlIHVzZWQgYnkgU3RhZ2Ugb2JqZWN0cy5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIGJhY2tkcm9wLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmltYWdlIC0gYSBVUkkgKG9yIGRhdGEgVVJJKSBmb3IgdGhlIGJhY2tkcm9wIGltYWdlLlxuICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvbG9yIC0gYSBjc3MgY29sb3Igc3RyaW5nICgnI2ZmMDAwMCcsICdyZWQnKVxuICAqL1xuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30pIHtcbiAgICBjb25zdCBkZWZhdWx0cyA9IHt9O1xuICAgIGNvbnN0IGFjdHVhbCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmltYWdlID0gYWN0dWFsLmltYWdlO1xuICAgIHRoaXMuY29sb3IgPSBhY3R1YWwuY29sb3I7XG5cbiAgICAvLyBwcmVsb2FkXG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIGNvbnN0IGltYWdlID0gbmV3IHdpbmRvdy5JbWFnZSgpO1xuICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWFnZTtcbiAgICB9XG4gIH1cblxuICAvKiogU2V0dXAgQWN0aW9ucyAqICovXG5cbiAgLyoqXG4gICogYWRkVG8gLSBBZGRzIHRoZSBiYWNrZHJvcCB0byB0aGUgc3RhZ2VcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBiYWNrZHJvcCA9IG5ldyBibG9ja0xpa2UuQmFja2Ryb3AoKTtcbiAgKlxuICAqIGJhY2tkcm9wLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzdGFnZSAtIHdoaWNoIHN0YWdlIHRvIGFkZCB0aGUgYmFja2Ryb3AgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIGNvbnN0IGN1clN0YWdlID0gc3RhZ2U7XG4gICAgc3RhZ2UuYmFja2Ryb3BzLnB1c2godGhpcyk7XG4gICAgLy8gaWYgXCJiYXJlXCIgc2V0IHRoZSBhZGRlZCBhcyBhY3RpdmVcbiAgICAhc3RhZ2UuYmFja2Ryb3AgPyBjdXJTdGFnZS5iYWNrZHJvcCA9IHN0YWdlLmJhY2tkcm9wc1swXSA6IG51bGw7XG4gICAgc3RhZ2UuZWxlbWVudCA/IHN0YWdlLmVsZW1lbnQudXBkYXRlKHN0YWdlKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVGcm9tIC0gUmVtb3ZlcyB0aGUgYmFja2Ryb3AgdG8gdGhlIHN0YWdlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgYmFja2Ryb3AgPSBuZXcgYmxvY2tMaWtlLkJhY2tkcm9wKCk7XG4gICpcbiAgKiBiYWNrZHJvcC5hZGRUbyhzdGFnZSk7XG4gICogYmFja2Ryb3AucmVtb3ZlRnJvbShzdGFnZSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3RhZ2UgLSB3aGljaCBzdGFnZSB0byByZW1vdmUgdGhlIGJhY2tkcm9wIGZyb20uXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBzdGFnZS5yZW1vdmVCYWNrZHJvcCh0aGlzKTtcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmFja2Ryb3AuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbnRpdHkgZnJvbSAnLi9lbnRpdHknO1xuXG5pbXBvcnQgU3RhZ2VTdXJmYWNlIGZyb20gJy4vc3RhZ2Utc3VyZmFjZSc7XG5pbXBvcnQgU3ByaXRlRWxlbWVudCBmcm9tICcuL3Nwcml0ZS1lbGVtZW50JztcbmltcG9ydCBDb3N0dW1lIGZyb20gJy4vY29zdHVtZSc7XG5pbXBvcnQgVGV4dFVpRWxlbWVudCBmcm9tICcuL3RleHQtdWktZWxlbWVudCc7XG5cbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIGEgU3ByaXRlLlxuICogU3ByaXRlcyBjYW4gYmUgYWRkZWQgdG8gdGhlIFN0YWdlLlxuICogQGV4dGVuZHMgRW50aXR5XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoe1xuICogICBjb3N0dW1lOiBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoe1xuICogICAgIHdpZHRoOiA1MCxcbiAqICAgICBoZWlnaHQ6IDUwLFxuICogICAgIGNvbG9yOiAnI0EyREFGRicsXG4gKiAgICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqICAgfSlcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoe1xuICogICAgIHdpZHRoOiA1MCxcbiAqICAgICBoZWlnaHQ6IDUwLFxuICogICAgIGNvbG9yOiAnI0EyREFGRicsXG4gKiAgICAgaW1hZ2U6ICdodHRwczovL3d3dy5ibG9ja2xpa2Uub3JnL2ltYWdlcy9zaGVlcF9zdGVwLnBuZydcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiBsZXQgY29uZmV0dGkgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgnaHR0cHM6Ly93d3cuYmxvY2tsaWtlLm9yZy9pbWFnZXMvY29uZmV0dGkuc3ZnJyk7XG4gKlxuICogQGV4YW1wbGVcbiAqIGxldCBiYXJlWmVyb1NpemVkU3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUobnVsbCk7XG4gKi9cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIFNwcml0ZSB0byBiZSBhZGRlZCB0byBTdGFnZS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgdGhlIHNwcml0ZSBhbmQvb3Igb3B0aW9ucyBwYXNzZWQgdG8gY29zdHVtZS5cbiAgKiBBbHRlcm5hdGl2ZWx5IGFuIGltYWdlIFVSTC4gSWYgYSBVUkwgaXMgcHJvdmlkZWQgZGVmYXVsdCBjb3N0dW1lIHdpbGwgYmUgc2l6ZWQgdG8gaW1hZ2UuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFjZSAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHdhaXQgZm9yIGVhY2ggcGFjZWQgbWV0aG9kLlxuICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmNvc3R1bWUgLSBBIGRlZmF1bHQgQ29zdHVtZS5cbiAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy53aWR0aCAtIHRoZSBjb3N0dW1lIHdpZHRoIGluIHBpeGVscy4gRGVmYXVsdCBpcyAxMDAuXG4gICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaGVpZ2h0IC0gdGhlIGNvc3R1bWUgaGVpZ2h0IGluIHBpeGVscy4gRGVmYXVsdCBpcyAxMDAuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaW1hZ2UgLSBhIFVSTCAob3IgZGF0YSBVUkwpIGZvciB0aGUgY29zdHVtZSBpbWFnZS5cbiAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb2xvciAtIGEgY3NzIGNvbG9yIHN0cmluZyAoJyNmZjAwMDAnLCAncmVkJykuXG4gICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMgLSBhIFVSTCAob3IgZGF0YSBVUkwpIGZvciB0aGUgY29zdHVtZSBpbWFnZS5cbiAgKi9cbiAgY29uc3RydWN0b3Iob3B0aW9ucyA9IHt9KSB7XG4gICAgY29uc3Qgc2hlZXB5ID0gJ2RhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRjhBQUFCZUNBWUFBQUJGRU1oUUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQVJza2xFUVZSNDJ1MWRCMVJVMXhaRlFab1VFUlZGUmJGalZ3UUxLb3FnQmp2Z1Z4R2oyR012c1d1STBVUmk3NzJYYnpmMlhtSnYyRnZzeHQ0VllSb0RjLzQrVDNUeEVXYmVOSnF6MTdwcm1KbjNIbS8ydS9mY2MwKzdabVltbUdCQzFrUXhLeXVyUlhaMmRrL3dLc0hyTTJ0cjYyWDR2SlNKR2lNaVI0NGNIVUM0ckUrZlBvcW9xQ2k2Zi84K1hieDRrUVlPSEJpSEJ5REQ5OTJUSEc2RjFpWlhybHpMSFIwZGQrRjFDZDRIOFdWTVRHcVBwZzRPRGpJbVBTVmN2WHFWbkp5Y3BEZ3VCTTNIMXRiMlZmbnk1U1dUSmsyaUJRc1cwSVFKRTZoa3laSVNmUDRFMzFjeDBTa2VsaUR0OWI1OSswZ2REaHc0UUphV2xwL1E1S3RXclZJbC8xNmxVdEhjdVhNVFdGeDlUMklxTjFwYmMzUHorVGx6NWp3TE9YMFQ3VHBFeFM1OC9nZWFINXFGbXZNYkJRWUdTa2dERWhJU3VQY256Sm8xUzZYdXVMRmp4OFpqRkozUDZxU1hSUy9ibkQxNzlvVENoUXZMT25ic21EQng0a1JCREtBSDByQmh3NmhSbzBZSzlPbzRHeHViOXhZV0ZyL2huRnpKcmxFOWI5Njh4OTY4ZWFPSmU0cUppYUd5WmNzS0QwRWRGQXJGRnhGVk1TdVNiZzBpZjBkVGd2QzR5NWN2YXlSajI3WnRWS05HRFFtTERad2Z4ZzhCbzJNL3kvbWxTNWVxU0NTMmJ0MHE2cmlRa0pCWS9JK2ZzaHJ4QlNCTzdwUW9VVUo2K3ZScDBoYWJOMjhtZTN0N0JZaC9FeHdjTEpOS3BmVHAweWZSNTMvOCtGSFVjYU5HalVyQXZZN0xTc1M3UVh3OFJxOVNjRy9XRllNSER5WnZiMjlTS3BWa0xFUkhSMU9lUEhtNDkxZktDc1RibzhjL2J0Kyt2U0krUGw1blVsZ2pLVlNvRUowN2Q0Nk1qWU1IRDZvdzM3ekR2ZWZKMU14RGkxbnQ2K3NyMXpUWmFjS2pSNDhvZCs3Y2xGYm8wS0dESEE5Z2RtYm12am5JbHo5OStsUnZNcTVkdTBaRml4Wk5NL0paR1FENTd6TXI4ZGxBL0lObHk1WVpoSXozNzk4VHhCZkZ4c2FtQ2Zrc0lsa1ZackdaK0h1Y2VVMkNOZ1l0TXJFTlFHdUI1b1htaW1adWxKVWtXa3ZjekFJUWVnRTk0amxVdjFpOHZvQjk1QUMrRzhWNmQvSmx2NHVMaTlTUWsyUE5talVKNm1XYWtNK0tRYlpzMlZUNEhlVnRiS3pYNCs4RTEvejVwRUhOR2trNmg0WEl3ME9ENWZWcVY0OXhLK1FhWTIxbEZZZmorUGdFRzJ2ck4xWldsdHZ4dnI2K3BEdkJLRFVUUkVmREFDWHYyYk9uY3NtU0piUnAweVpoeWI1aHd3WWFQMzQ4K2Z2N1MzR2NFZy9qUWFJdW5oMXE0ZW5wMDZlTDBzTWxFZ2xQY2pSaXhBaXFXN2NPWkxzVDhZL0Jlb0JLRkM5TzRlSGhkUGp3WWRxN2R5L2x6NStmSGo1OG1PcTFlR1M4ZlBtU1dCWFZCMGVPSE9HUkZtMWhZUjRYMUt5aDh0eWh6VVFmN3FiYVlwOWRwVnZuOXRIZVRVdHBVTy9PU2t2TEhISG9yRU4wSmI0VnJ5NDlQVDBWR3pkdXBMaTRPTFUzKys3ZE80cU1qQ1E4SkFYT3V3eVRRVHlMaXRTR05KTTVmUGh3cW9YZWpBZEh1UndkcVVXVEFKbzE4UmM2c1hjZDNiOTBtQzRlM1VhYlZzeW16bUd0eWNIZW5qdzlxMUtQSGowSUsxdGgwWlIwRW1jOW5sZkdMdm55NHNkM29YSmxQZWp4NDhmZi9HK2VmMDZlUEtsMnRjdmZRYk5TT3RqYnhlL2V1Rmd0NmFtMVBadVdjT2VSYWkyclFkNE1MR1lVQ3hjdUZGUThiZlhrYnQyNktkRnJWS2RPbmZybSs3Tm56MUxwMHFYSUdiMjdVMmd3TFp3K25xNmYzazBKNzI2ci9URWZIbDJnVVlON2tTVWVsTFcxRlJVdVZCQVBJUS81WXFSNFZmTWttQ3VvYVdNL2VuVDFiMUs5djBPL0R1OG5qQ0IrSVB2Mzc2Y3paODdRaWhVcnlLOStQY3J0NUVUdDJyV2xsTlljL0hzYk5HaEE5blk1VlZkUDd0U0plRzZYais4Z2MvUHNTbTNtQVo0a0Y4UGVJbWZWVGg5TW16YU44QUJwejU0OVh6OTcrL1l0Um9halFJenN4WFdkZnRUZk85ZVFYVTVibWowcFFoZ1pXMWJOb1ozckY5SHpmMDU5Y3l5TGdhSDl1NU52N1JyazVWbVpnbHNFMHBKWkUrajEzYlBVMkw4ZWxmWHdJTzVnYkhhK2VmTW1yVm16aGlwWHFrUVc1dWEwZmUwQ25Zbm5OcmgzbDRTY05qWkh4UnRlckswam9jNUpEYUVhTWxhdlhrMllrT24yN2R2Q2U3YlRGSGN2b3RlUCtqS2tNY25SUCtmMjYzd05IaDJyRjA2aGdQcDFxRUIrRjBGYzFhN3BSWUVCOWNpN2FrVzk3bzg3QmR1dlFHbE5zZHdIUU56STFVMW11bURreUpGVXFsUXBRUnhkdW5TSm9EblF1d2RSZWorQTlxMmJVM2o3WUwydms3elY4cTVLY3liL3F2UDVMMjZmb254NW5XVVdGdGtuaURZQmdQalhpeFl0VWhsYVplT0ptbFhFMGFOSEMrOTlmZXRTbTZBbVFzL1RoeVFXUDQ0TzlucGZKM2tyNUpxZkRtNWRvZE81TEVxclZpb25od1Rad3hxZktPWXhSQWFCSUpteGRPYno1ODhMNG9jMW9nY1BIcENMU3o3cTNUVk1MK0o0OUxBNit2TDJhWU9TWDdKNFVmcHI5VnlkeEZqYjRLWktqT3k3U1JabW1ybkhKUHNxNmNSb0REUnYzcHpHakJrai9IM3IxaTBxV05BVllpT0U0dC8rb3hOSnoyNmRGTWovOU9TeVFjbnZGQnBFUGNMYmFuM2UrRkVEVk5EdG96bUtRaHZWTWdnTzVGaHRWVXB0d1F1ZnBIby9qNEJpN3U2Q0NJcDdmVXZySDh1VFpYRjNONFBML0tnamZ3bVQrYlZUdTBTZk0rMlBrU3BJRHptNHJLMmR2ZGZlZmhVV1J5cEtCeng3OWd6dVBROXEwcWcrU1o1ZkZmMWorZGl5cFV2UWhJaWZEVTQrdDZIOXUxSEJBaTUwYlBkYXRjYzl1WEdjL3RNeVVKSFk0K3RwYjJ5M3QzL0dLNzcwQXZ0Z3ZiMjlxRUs1TXFKNkd5KzIvT3ZWNG9tTkZLOXVHb1Y4bHQvOFlHR25JVjhmYjJFaHlPWUZIaFVuOTYyblZRc21VNnVtRGVXc1R0cmEybXhsTDUwdUpnUlgyRzNpTkprT2pBMlpUQ2FZRFhBdjFLMWpHenF5WS9VM3hMNjVkNDVtUkk2QlBwNUhJTjhRNnFxbTl2ajZNV0ZkWW1kbkd3TTdUVHpQTVRDYndMRnZjeGZ2SitKOUJYME1aMzZsUzVlT3BneUM2OWV2VS9mdTNSQkJrRXN3cWhWMUsweXdKRkorRUE2TElYbDdWcVRsYy84MHVIcXBydjAyc2o5WldWcGVNSWFwT05UUHorOFRaVER3U0dTTmFPM2F0WlRUMXBhTzcxbW50cWV6SWE1eUJRK3FYYU1hM1lrNm9CZlpQTG9hTjZoTEU4Y09FOTd2MzdLYzF4TXZqVUYrZU5PbVRXTW9nMkxYcmwzazUrdWprVERXZWxna2NHdlNzSjdPeFBNRSsrVTYzTmlNOGY1aEZPV3dzSWdYdldqU0FtM3ExNjhmblZISm56ZHZIdVlBelRwMzRZSUZ2aElXVU45SFovSjVjWldVZko1WStYT1lsbG1OZERNMCtiV0tGU3YyS2FPU3p5WUp0b0JxSXUzQVh5dW9UTWxpNUFXRG1EYjZlZkxHazN3em1LWGhRS0dHZnJWSit1S2E4SG5GOHFVLzZxUkthb3FuZ2ZkSm5sSEpEKy9Va1JiUC9DUE5KdGZVV3V1V1A4U0FxeTZHSnQ4Q1hpUzliZmZHUXNNQWYwSHVwamY1RWNQNkpsaGFXa1FhZk1aRnpPT3VHVE5tcURJaStkV3grRHB6WUZPNms4K0xMQ2RIaC84YVJlT3BVNmRPaHBUN05hcDcwK2tERzlPZC9MVkxwc0VsNmJqYkdPVG40YVFCZHFObE5OU3FXVU5ZenFjMytleFNkTXJseUJwUFkyUGtORTJCeVRjMm81RmZwN2FQWUdwSWIvSjNiVmhFVlNwWGdoZk9KZzRLeWpKRDUyOXg3NWV5aHo4NU9QNkZKMlMydjZRMXd0cUgwdExaa2VsTy9zcjVrNFI3WVJjclhLSXltOCtPY1FlRHNROURVVjhFSkVrK2ZQZ2dMTzA1SEp0OXIvaWNzL3JTcGVkSFJFUUk0U0xwVGY2VThTTm93SUQrWDBOakVQZ3J3d2k0WXZZNXM5RkFhU1BXMXNjS0ZDaVFBTXNkQlFRRUNHRVZiT3d5dHFNbE5heGN1Ukt1dVdZR0lYRDkwaGxVd0NVdmJFVTJncjFlbTNPSDlPc21ST1lsRFNXc1VxV0tCSHpOTXdqdmtQdVQyVDdkcjE4L2V2TGtTWWFRK1J3cFhNU3RrRUhJYnhIby85VnNvSzNqdlZFRFg5cXlaY3YvM2R1Ly8vNHJaTW9rQnNycUhrS1BJWFFDSWthZUZva0gyb0JIWEQ2RUJuSkVtNzdrczZNZGl5VWEyQ3VjTGgzYkx2bzhkbkU2T2pnSVhyZmtXTGR1SGNILy9VeER4bVRxaml5Y0hPWGo0eVBYSnI4cExkR3IxMDgwdUU4WG5RaGZNRzJjRU1ENnhXNnpjZmtzUWZ4OGNkcnpxNll3RVk3VnJGU3hRcXIzVjZGQ2hWak1pejIwWmg3aGZGc1FZU3hQRDAxR0xDNWN1Q0FFeWJJblMxdnlRME9hVWZWcWxZUVZLb2VFK0ZUM0ZPeitiSzluMHV2VXJDWUVTYW03UmdPWXRLZE1tWkxxL1hFVUhqcndVNjJJeDZRYWltaGZXV3FSeEJrSlRaczBvVkJFcUdsTFB2ZHNqdW5zMkM1SWlPbjhFdGpFSTRrZlFtVEVFTFdSRTF2WHpFTnluTFBhVEVhT2FJYnNsM0VjdjFqdW5SSFZHOHN4OFprQlhNakMwZEdCL3Z4MWFKcXBseHdIaWxVdExWNjhXT1A5SWRsUEJ0RXpVcXhLT2JaRml4Wnl5a1RZc1dPSDRHQmZOT04zb3hQLzl2NTVpQ2wzK0pPN2k3bzNkbmNpTCtHc0dPNXRPT09DNCtRekd6Z2hnaE1wV0dzeEZ2RXNsbXBoYm1qZXJCbUpUVjNsRUhQTW42L0ZrQitHYkpNWXlxUll2MzY5a0FneHBGOVhqUWtWMmphVy95RXRmaEFDdVhpbEx4YXNLU1ltejVscnN0K3Zueng1c29veU1RNGRPaVRNQVp5SkV2MzRra0dJWjVjaEw4VGMzWXVTTHM0bGRBaUZ4dUFwREk5WG1WSGtKQWNuWEhBUExWYlVqUTV0VzZrWDhSejI1MW01QXBVb1VUekZQQzR4U0V5R2NGWWJvWVluRkdmTTJnVnBDUjd1eVA4U2pIOC90bTBsNUdOcFN6eXJvSG1jYzVPUFR5MFNVejRtSmJEbEY5eXFOSzEwNnlCYUlacXlHRGd0bFpQc2tQOUtQM1VPRlpMUnhDU3NJYWRXZUhCc3o5Sm5vZm44K1hQV3hPU2FKdHVXcUYyVDVjaG44R2ptT0o4aVJUNEhVRlZFNEMwdnBuaWh4QUd1OXk0ZUVod3pVMzhmQ1cybXFoQis2T1ZWalk0ZVBhcjMvK2JjQmlSLzNOWkVmZ2o4dFZtUy9LUXJ6cDA3ZC9MQ1IwakFTQm9FeFkxTENLQmVqeEFOWnlnTUdqUklDWEUrUldOZ0xNcGRpU0kvdld6NGhnWm5WcksxbGtVVCt5YU1ZY2Z5OFBEZytQeEFUZVNYeEVwTUtxYjNtQ0FPVjY1Y29jU3FoRGsxa1cvTHhSemtjdldXQlgycVFYMXZnQWlUWXJLTkZHdEdmc3BGSGRRWnNVelFQTGx6ajc5ejV3NmJPN2ppU0VGUjVHT0lUTzNidDIrS3FTaTh3RENKSE0xZzkyWllXQmo3Y2FYZ2M1bzJwbnhmVjFmWDJKUklacmVZQ1pyQm1aUmNWd0loSkxjU2F4R0o5Nk93NTRWcjVTVEZ2WHYzQk91Y0NlS0E0aUNzdW5iU3hYZjdvN3U3dXlTcHlaUnIzMlFWOVRJdGdJcmw4VmdkajljcE5KeDdQOHF5ZkdXN1hidDJKa2Exd0p3NWMzaFZ1MW5Ya0JFdnpOU0tFeWRPQ0JvT1Zta21SclhBOXUzYnVlN3lSZDB6SXl3c2hpSkNUVHAxNnRRMEt4eVhWY0JSRlhDY1A5ZXIvQ0o2L3hMTTNFcERHSmkrSjNBSk0xZ0xIdXBkL3hLeTZ6NXZjMkdDZUxCaERoVnVMK2tkcUltTG5NcG9vWUlaSGRpQmdtWCtZVU9RZjNMMzd0MG1SclZUTlZFNzAzS2kvbVcrVWZhRkoxMFR4QU1lUVU0UDlUZEVpSGpFZ0FFRGxDWkt4ZUhWcTFkY2ZVUXB4b3dzQmgxUkFDUEdSS3M0akJzM0xnRWhPQWNObFpUaXlxWlJybWxzZ25wd3BBTHYxd0xPdkEyV0VnUjE4eTc3UGsxUWo5bXpaNnN3UjE0MWJJMTJTOHV4clZxMWtwbm9UUjJjcXd3SFBFZW0xVEowT201dVRnZlZ0SDNTOXdvdURWK21UQmtKYnpWbGxLMGU0QnlZYXVyOTM0SWo0MUQwVmM0cFZHWkczTUF5TDRlUGN6VnRFejdqeFlzWFg5SStUMmxUS1ZaWCtMTmM0eGlYN3huc1dPSmRNdERiRmVDRGkxN1lwc2xPTTV5NWdvMjY1Rm5GcmNpQlVweFl3ZHQvY0ZhN3VvNzErdlZyd25ZakxOK2w0SUgzeW1xVDVsdjlZUElkaC94Y2hib3drOHdHanFsRVFUOWVuZkxlS3lwazJVdndRRlNjL3RPNmRXc2x5bHhLT2NrQnF1UjFVTkNiTlhDejlBSnVwQ2N2b3hGcUVwOFpzaGJGZ0FQR1lKZmhDTE01YUp6RU5oZHRBZHBVTk40eHVxUlpCa0lsaklBb2xuMzhFSTRmUDU1aVJCdC94cGJSenAwN0V5b1dFcXBYQ1Z1aDZnb09TTUwvRkdJc0RXeU5qTU4xejVzWmFVOHJvMDNFOEhodDQyclphUEVjL1lDSVp5azNWQ0dYY1FWWVoyZG42dCsvUCtucm1HRzVpK0JUcm0wVGYvZnVYWU1SejdzZThWb0d2OFhkTEpPQ3k1eHdxZktPaWNPVUcrOHYvak1uQ0NTUEI5SkZ0V094Z0VpdzNaand4a0UyeTI3Y3VHRVE0bmt2TDl4bnNGa1dSV04rQU5oVFZtTXdia3JnVkhyT2lnZnhXNzRzWm5DOVgxams2U3ArT0RKdjVzeVpxc1NZeWlDekxJNnF2Rk9jbTV1YmpNTVB4VlFvWjJkMHk1WXRGU0NJUlVMZjVQSVlrMzRYVGpqcjJyV3JramRCRUFzZU1WNWVYaktNb0xlNFRDT3o3d1FzbXZyQlhQRVcxbElGMUxsNExsekVhbXRVVkpTd1lSanY3TXc3Q1dIdTRQbENqbU5YYTRqMjljQUlPTVlKZmJpZWtqY2VTMmwwOFY1Y3ZCa1pLcWx3U240Q2pwK2ZyaXBqT29KN2NDQjY3bnhNMXJjVGUvYm5EUnp4WUtCUDcwbWNPK3kwdUdZTm5Mc0twSDdDOWVKNTg4dHk1Y3BKa0hFandjS1E3ZXlzSlQwQjhhUHhkMkV6RTR5ekRESDd2SGxBVUpLSlB5Z2phakwvQTE1RXh5K000NExmQUFBQUFFbEZUa1N1UW1DQyc7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7XG4gICAgICBwYWNlOiAzMyxcbiAgICB9O1xuXG4gICAgbGV0IGFjdHVhbCA9IHt9O1xuICAgIHR5cGVvZiBvcHRpb25zID09PSAnb2JqZWN0JyA/IGFjdHVhbCA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRzLCBvcHRpb25zKSA6IGFjdHVhbCA9IGRlZmF1bHRzO1xuXG4gICAgc3VwZXIoYWN0dWFsLnBhY2UpO1xuXG4gICAgLy8gY29zdHVtZXNcbiAgICB0aGlzLmNvc3R1bWVzID0gW107XG5cbiAgICAvKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgIC0gaW1hZ2UgdXJsLlxuICAgICogdXNlciBjYW4gc2VuZCBhIHVybCBpbnN0ZWFkIG9mIGFuIG9wdGlvbiBvYmplY3QuXG4gICAgKiB0aGlzIHdpbGwgYmUgdHJlYXRlZCBhcyBhIGNvc3R1bWUgaW1hZ2UgdXJsLlxuICAgICogdGhlIGltYWdlIHdpbGwgYmUgc2V0IHRoZSBzcHJpdGUgY29zdHVtZS5cbiAgICAqIHdoZW4gdGhlIGltYWdlIGlzIGxvYWRlZCwgY29zdHVtZSB3aWR0aCBhbmQgaGVpZ2h0IHdpbGwgYmUgc2V0IHRvIGFjdHVhbCBpbWFnZSB3aWR0aCBhbmQgaGVpZ2h0LlxuICAgICogc3ByaXRlIHdpbGwgYmUgcmVmcmVzaGVkLlxuICAgICovXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgYWN0dWFsLmNvc3R1bWUgPSBuZXcgQ29zdHVtZSh7IGltYWdlOiBvcHRpb25zLCB3aWR0aDogMCwgaGVpZ2h0OiAwIH0pO1xuICAgICAgY29uc3QgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG5cbiAgICAgIGNvbnN0IG1lID0gYWN0dWFsLmNvc3R1bWU7XG4gICAgICBpbWFnZS5zcmMgPSBvcHRpb25zO1xuXG4gICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgICBtZS5vcmlnaW5hbFdpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIG1lLm9yaWdpbmFsSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgICAgICBtZS53aWR0aCA9IG1lLm9yaWdpbmFsV2lkdGg7XG4gICAgICAgIG1lLmhlaWdodCA9IG1lLm9yaWdpbmFsSGVpZ2h0O1xuXG4gICAgICAgIHRoaXMucmVmcmVzaCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAqIGFsdGVybmF0ZSBvcHRpb25zIC0gcGFzc2luZyBjdXN0b21lIG9wdGlvbnMgdG8gc3ByaXRlLlxuICAgICogaWYgY29zdHVtZSBpcyBub3QgZGVmaW5lZCBieSB1c2VyLCBpdCB3aWxsIGJlIGNyZWF0ZWQuXG4gICAgKiB3aGVuIG5vIGltYWdlIGlzIHNldCwgc2hlZXB5IGlzIGRlZmF1bHQuXG4gICAgKlxuICAgICogYWx0ZXJuYXRlIG9wdGlvbnMgLSBudWxsLlxuICAgICogdXNlciBjYW4gcGFzcyBudWxsIGluc3RlYWQgb2YgYW4gb3B0aW9uIG9iamVjdC5cbiAgICAqIHRoaXMgaXMgc2FtZSBhcyBzZXR0aW5nIGEgY29zdHVtZSBhcyBudWxsLlxuICAgICogdGhlIHNwcml0ZSB3aWxsIGhhdmUgbm8gY29zdHVtZXMgYW5kIG5vIHNpemUuXG4gICAgKi9cbiAgICBpZiAodHlwZW9mIGFjdHVhbC5jb3N0dW1lID09PSAndW5kZWZpbmVkJyAmJiBvcHRpb25zICE9PSBudWxsKSB7XG4gICAgICBjb25zdCBjb3N0dW1lT3B0aW9ucyA9IHt9O1xuICAgICAgYWN0dWFsLndpZHRoID8gY29zdHVtZU9wdGlvbnMud2lkdGggPSBhY3R1YWwud2lkdGggOiBudWxsO1xuICAgICAgYWN0dWFsLmhlaWdodCA/IGNvc3R1bWVPcHRpb25zLmhlaWdodCA9IGFjdHVhbC5oZWlnaHQgOiBudWxsO1xuICAgICAgYWN0dWFsLmNvbG9yID8gY29zdHVtZU9wdGlvbnMuY29sb3IgPSBhY3R1YWwuY29sb3IgOiBudWxsO1xuICAgICAgKHR5cGVvZiBhY3R1YWwuaW1hZ2UgIT09ICd1bmRlZmluZWQnKSA/IGNvc3R1bWVPcHRpb25zLmltYWdlID0gYWN0dWFsLmltYWdlIDogY29zdHVtZU9wdGlvbnMuaW1hZ2UgPSBzaGVlcHk7XG5cbiAgICAgIGFjdHVhbC5jb3N0dW1lID0gbmV3IENvc3R1bWUoY29zdHVtZU9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIHNldCBjb3N0dW1lXG4gICAgYWN0dWFsLmNvc3R1bWUgPyB0aGlzLmNvc3R1bWUgPSBhY3R1YWwuY29zdHVtZSA6IG51bGw7XG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy5jb3N0dW1lcy5wdXNoKHRoaXMuY29zdHVtZSkgOiBudWxsO1xuXG4gICAgLy8gc2V0IHdpZHRoXG4gICAgdGhpcy5jb3N0dW1lID8gdGhpcy53aWR0aCA9IHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGggOiB0aGlzLndpZHRoID0gMDtcbiAgICB0aGlzLmNvc3R1bWUgPyB0aGlzLmhlaWdodCA9IHRoaXMuY29zdHVtZS52aXNpYmxlSGVpZ2h0IDogdGhpcy5oZWlnaHQgPSAwO1xuXG4gICAgdGhpcy54ID0gMDtcbiAgICB0aGlzLnkgPSAwO1xuICAgIHRoaXMueiA9IDA7XG5cbiAgICB0aGlzLnByZXZYID0gMDtcbiAgICB0aGlzLnByZXZZID0gMDtcblxuICAgIHRoaXMuc2hvd2luZyA9IHRydWU7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSA5MDtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSAxMDA7XG5cbiAgICB0aGlzLnJvdGF0aW9uU3R5bGUgPSAwO1xuXG4gICAgdGhpcy50ZXh0dWkgPSBudWxsO1xuXG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgdGhpcy5wZW5Db2xvciA9ICcjMjIyMjIyJztcbiAgICB0aGlzLnBlblNpemUgPSAxO1xuXG4gICAgdGhpcy5jc3NSdWxlcyA9IFtdO1xuICAgIHRoaXMuY2xhc3NlcyA9IFtdO1xuICB9XG5cbiAgLyoqIFNldHVwIEFjdGlvbnMgKiAqL1xuXG4gIC8qKlxuICAqIGFkZFRvIC0gQWRkcyB0aGUgc3ByaXRlIHRvIHRoZSBzdGFnZVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IHN0YWdlIC0gd2hpY2ggc3RhZ2UgdG8gYWRkIHRoZSBzcHJpdGUgdG9vLlxuICAqL1xuICBhZGRUbyhzdGFnZSkge1xuICAgIHRoaXMuc3RhZ2VXaWR0aCA9IHN0YWdlLndpZHRoO1xuICAgIHRoaXMuc3RhZ2VIZWlnaHQgPSBzdGFnZS5oZWlnaHQ7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBuZXcgU3ByaXRlRWxlbWVudCh0aGlzLCBzdGFnZSk7XG4gICAgdGhpcy5zdXJmYWNlID0gbmV3IFN0YWdlU3VyZmFjZShzdGFnZSk7XG5cbiAgICB0aGlzLmVsZW1lbnQuZmxhZyA9IHN0YWdlLmVsZW1lbnQuZmxhZztcbiAgICB0aGlzLmFnYWluc3RCYWNrZHJvcCA9IHN0YWdlLmVsZW1lbnQuYmFja2Ryb3BDb250YWluZXI7XG5cbiAgICBzdGFnZS5zcHJpdGVzLnB1c2godGhpcyk7XG4gICAgdGhpcy56ID0gc3RhZ2Uuc3ByaXRlcy5sZW5ndGg7XG5cbiAgICB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpO1xuICB9XG5cbiAgLyoqXG4gICogY2xvbmUgLSBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIHNwcml0ZSBhbmQgdHJpZ2dlcnMgYW4gZXZlbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCBjbG9uZSA9IHRoaXMuY2xvbmUoKTtcbiAgKiAgIGNsb25lLm1vdmUoMTAwKTtcbiAgKiAgIGNsb25lLmFkZFRvKHN0YWdlKTtcbiAgKiB9KTtcbiAgKlxuICAqL1xuICBjbG9uZSgpIHtcbiAgICAvLyBtYWtlIGEgbmV3IHNwcml0ZS5cbiAgICBjb25zdCBzcHJpdGUgPSBuZXcgU3ByaXRlKCk7XG4gICAgLy8gc2F2ZSBpZC5cbiAgICBjb25zdCBpZCA9IHNwcml0ZS5pZDtcbiAgICAvLyBhbmQgYXNzaWduIHByb3BlcnRpZXMuXG4gICAgY29uc3QgY2xvbmUgPSBPYmplY3QuYXNzaWduKHNwcml0ZSwgdGhpcyk7XG4gICAgLy8gcmVhc3NpZ24gdGhlIHVuaXF1ZSBpZC5cbiAgICBjbG9uZS5pZCA9IGlkO1xuXG4gICAgLy8gcmVtb3ZlIERPTSBlbGVtZW50c1xuICAgIGNsb25lLmVsZW1lbnQgPSBudWxsO1xuICAgIGNsb25lLnN1cmZhY2UgPSBudWxsO1xuXG4gICAgLy8gZGV0YWNoIGFycmF5c1xuICAgIGNsb25lLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmNzc1J1bGVzKSk7XG4gICAgY2xvbmUuY2xhc3NlcyA9IHRoaXMuY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgLy8gZmlndXJlIG91dCB3aGF0IHRoZSBjdXJyZW50IGNvc3R1bWUgaXMuXG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpO1xuXG4gICAgLy8gZmlsbCB0aGUgY29zdHVtZXMgYXJyYXkgd2l0aCBuZXcgY29zdHVtZXMgYW5kIGFzc2lnbiBwcm9wZXJ0aWVzLlxuICAgIGNsb25lLmNvc3R1bWVzID0gdGhpcy5jb3N0dW1lcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNvc3R1bWUgPSBuZXcgQ29zdHVtZSgpO1xuICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmFzc2lnbihjb3N0dW1lLCBpdGVtKTtcblxuICAgICAgLy8gZGV0YWNoIGFycmF5c1xuICAgICAgb2JqLmNzc1J1bGVzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShpdGVtLmNzc1J1bGVzKSk7XG4gICAgICBvYmouY2xhc3NlcyA9IGl0ZW0uY2xhc3Nlcy5zbGljZSgpO1xuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IHRoZSBjdXJyZW50IGNvc3R1bWUuXG4gICAgY2xvbmUuY29zdHVtZSA9IGNsb25lLmNvc3R1bWVzW2N1cnJlbnRDb3N0dW1lSW5kZXhdO1xuXG4gICAgLy8gYW5ub3VuY2UgYSBjbG9uZVxuICAgIGNvbnN0IGV2ZW50ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudChgYmxvY2tMaWtlLnNwcml0ZWNsb25lZC4ke3RoaXMuaWR9YCwgeyBkZXRhaWw6IGNsb25lIH0pO1xuICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuXG4gICAgcmV0dXJuIGNsb25lO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlRnJvbSAtIFJlbW92ZXMgYSBzcHJpdGUgZnJvbSB0aGUgc3RhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnJlbW92ZUZyb20oc3RhZ2UpO1xuICAqXG4gICovXG4gIHJlbW92ZUZyb20oc3RhZ2UpIHtcbiAgICBjb25zdCBjdXJTdGFnZSA9IHN0YWdlO1xuXG4gICAgY3VyU3RhZ2Uuc3ByaXRlcyA9IHN0YWdlLnNwcml0ZXMuZmlsdGVyKGl0ZW0gPT4gaXRlbSAhPT0gdGhpcyk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50ID0gdGhpcy5lbGVtZW50LmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKiogRXZlbnRzICogKi9cblxuICAvKipcbiAgKiB3aGVuQ2xvbmVkIC0gQWRkcyBhIGRvY3VtZW50IGxldmVsIGV2ZW50IGxpc3RlbmVyIHRyaWdnZXJlZCBieSBhIGN1c3RvbSBldmVudC5cbiAgKiBUaGUgY3VzdG9tIGV2ZW50IGlzIHRyaWdnZXJlZCBieSB0aGUgY2xvbmUoKSBtZXRob2QuXG4gICogV2hlbiB0cmlnZ2VyZWQgd2lsbCBpbnZva2UgdXNlciBzdXBwbGllZCBmdW5jdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jbG9uZSgpO1xuICAqIH0pO1xuICAqXG4gICogc3ByaXRlLndoZW5DbG9uZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5hZGRUbyhzdGFnZSk7XG4gICogICB0aGlzLmdsaWRlKDUsIDEwMCwgMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jIC0gYSBmdW5jdGlvbiB0byByZXdyaXRlIGFuZCBleGVjdXRlLlxuICAqL1xuICB3aGVuQ2xvbmVkKGZ1bmMpIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGBibG9ja0xpa2Uuc3ByaXRlY2xvbmVkLiR7dGhpcy5pZH1gLCAoZSkgPT4ge1xuICAgICAgZS5kZXRhaWwuX2V4ZWMoZnVuYywgW10pO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKiBNb3Rpb24gKiAqL1xuXG4gIC8qKlxuICAqIF9tb3Rpb24gLSBNb3ZlcyB0aGUgc3ByaXRlIHRvIHNwZWNpZmllZCBsb2NhdGlvbiAoeCwgeSkuXG4gICogQWxsIHVzZXIgbW90aW9uIG1ldGhvZHMgdHJhbnNsYXRlZCB0byB0aGlzIG1vdGlvbi5cbiAgKlxuICAqIEBwcml2YXRlXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlIGZvciB0aGUgY2VudGVyIG9mIHRoZSBzcHJpdGUgKDAgaXMgY2VudGVyIHNjcmVlbikuXG4gICovXG4gIF9tb3Rpb24oeCwgeSkge1xuICAgIHRoaXMucHJldlggPSB0aGlzLng7XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueTtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gICAgdGhpcy5zdXJmYWNlID8gdGhpcy5zdXJmYWNlLmRyYXcodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogZ2xpZGUgLSBNb3ZlcyB0aGUgc3ByaXRlIGZvciB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBzZWNvbmRzIHNvIGl0IGFycml2ZXMgYXQgc3BlY2lmaWVkIGxvY2F0aW9uIHdoZW4gdGltZSBpcyB1cC5cbiAgKiBQcm92aWRlcyBzbW9vdGggbW92ZW1lbnQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdsaWRlKDMsIDEwMCwgMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGxldCB0aW1lID0gNTtcbiAgKiAgIHRoaXMuZ2xpZGUodGltZSwgMTAwLCAxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0aGUgd2hvbGUgbW92ZW1lbnQgd2lsbCBsYXN0IChhbmQgd2lsbCBoYWx0IGZ1cnRoZXIgZXhlY3V0aW9uIGZvcikuXG4gICogQHBhcmFtIHtudW1iZXJ9IHggLSB0aGUgeCBjb29yZGluYXRlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSB5IC0gdGhlIHkgY29vcmRpbmF0ZS5cbiAgKi9cbiAgZ2xpZGUoc2VjLCB4LCB5LCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgbGV0IGkgPSAwO1xuICAgIGNvbnN0IG1lID0gdGhpcztcbiAgICAvLyBkaXZpZGUgdGhlIHggYW5kIHkgZGlmZmVyZW5jZSBpbnRvIHN0ZXBzXG4gICAgY29uc3QgZnJhbWVzUGVyU2Vjb25kID0gMTAwMCAvIHRoaXMucGFjZTtcbiAgICBjb25zdCBzdGVwWCA9ICh4IC0gdGhpcy54KSAvIChzZWMgKiBmcmFtZXNQZXJTZWNvbmQpO1xuICAgIGNvbnN0IHN0ZXBZID0gKHkgLSB0aGlzLnkpIC8gKHNlYyAqIGZyYW1lc1BlclNlY29uZCk7XG4gICAgY29uc3QgaW50ID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgaSArPSAxO1xuICAgICAgbWUuX21vdGlvbihtZS54ICsgc3RlcFgsIG1lLnkgKyBzdGVwWSk7XG4gICAgICBpZiAoaSAvIGZyYW1lc1BlclNlY29uZCA+PSBzZWMpIHtcbiAgICAgICAgLy8gIGNsZWFyIHRoZSBpbnRlcnZhbCBhbmQgZml4IGFueSBcImRyaWZ0XCJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChpbnQpO1xuICAgICAgICBtZS5fbW90aW9uKHgsIHkpO1xuICAgICAgICBtZS5fcmVsZWFzZVdhaXRlZCh0cmlnZ2VyaW5nSWQpO1xuICAgICAgfVxuICAgIH0sIHRoaXMucGFjZSk7XG4gIH1cblxuICAvKipcbiAgKiBtb3ZlIC0gTW92ZXMgdGhlIHNwcml0ZSBhIHNwZWNpZmllZCBudW1iZXIgb2YgcGl4ZWxzIGluIHRoZSBkaXJlY3Rpb24gaXQgaXMgcG9pbnRpbmcuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMubW92ZSgxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBtb3ZlKHBpeGVscykge1xuICAgIC8qKlxuICAgICogdG9SYWQgLSBjb252ZXJ0cyBhIGRlZ3JlZSB0byByYWRpYW5zLlxuICAgICpcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBudW1iZXIgb2YgZGVncmVlcy5cbiAgICAqIEByZXR1cm4ge251bWJlcn0gLSBkZWdyZWVzIGNvbnZlcnRlZCB0byByYWRpYW5zLlxuICAgICovXG4gICAgZnVuY3Rpb24gdG9SYWQoZGVnKSB7XG4gICAgICByZXR1cm4gZGVnICogKE1hdGguUEkgLyAxODApO1xuICAgIH1cblxuICAgIGNvbnN0IGR4ID0gTWF0aC5yb3VuZChNYXRoLmNvcyh0b1JhZCh0aGlzLmRpcmVjdGlvbiAtIDkwKSkgKiBwaXhlbHMpO1xuICAgIGNvbnN0IGR5ID0gTWF0aC5yb3VuZChNYXRoLnNpbih0b1JhZCh0aGlzLmRpcmVjdGlvbiArIDkwKSkgKiBwaXhlbHMpO1xuXG4gICAgdGhpcy5fbW90aW9uKHRoaXMueCArIGR4LCB0aGlzLnkgKyBkeSk7XG4gIH1cblxuICAvKipcbiAgKiBnb1RvIC0gTW92ZXMgdGhlIHNwcml0ZSB0byBzcGVjaWZpZWQgbG9jYXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuZ29UbygxMDAsIDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqL1xuICBnb1RvKHgsIHkpIHtcbiAgICB0aGlzLl9tb3Rpb24oeCwgeSk7XG4gIH1cblxuICAvKipcbiAgKiBnb1Rvd2FyZHMgLSBNb3ZlcyB0aGUgc3ByaXRlIHRvd2FyZHMgYW5vdGhlciBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgxMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLmdvVG93YXJkcyhvdGhlclNwcml0ZSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBtb3ZlIHRvLlxuICAqL1xuICBnb1Rvd2FyZHMoc3ByaXRlKSB7XG4gICAgdGhpcy5fbW90aW9uKHNwcml0ZS54LCBzcHJpdGUueSk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRYIC0gUGxhY2VzIHRoZSBzcHJpdGUgYXQgdGhlIHNwZWNpZmllZCB4IHBvc2l0aW9uLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnNldFgoMTAwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSB4IC0gdGhlIHggY29vcmRpbmF0ZVxuICAqL1xuICBzZXRYKHgpIHtcbiAgICB0aGlzLl9tb3Rpb24oeCwgdGhpcy55KTtcbiAgfVxuXG4gIC8qKlxuICAqIHNldFkgLSBQbGFjZXMgdGhlIHNwcml0ZSBhdCB0aGUgc3BlY2lmaWVkIHkgcG9zaXRpb24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuc2V0WSgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqL1xuICBzZXRZKHkpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54LCB5KTtcbiAgfVxuXG4gIC8qKlxuICAqIGNoYW5nZVggLSBNb3ZlcyB0aGUgc3ByaXRlIG9uIHRoZSB4IGF4aXMgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHBpeGVscy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VYKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gbnVtYmVyIG9mIHBpeGVscyB0byBtb3ZlLlxuICAqL1xuICBjaGFuZ2VYKHBpeGVscykge1xuICAgIHRoaXMuX21vdGlvbih0aGlzLnggKyBwaXhlbHMsIHRoaXMueSk7XG4gIH1cblxuICAvKipcbiAgKiBjaGFuZ2VZIC0gTW92ZXMgdGhlIHNwcml0ZSBvbiB0aGUgeSBheGlzIGEgc3BlY2lmaWVkIG51bWJlciBvZiBwaXhlbHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMuY2hhbmdlWSgxMDApO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IHBpeGVscyAtIG51bWJlciBvZiBwaXhlbHMgdG8gbW92ZS5cbiAgKi9cbiAgY2hhbmdlWShwaXhlbHMpIHtcbiAgICB0aGlzLl9tb3Rpb24odGhpcy54LCB0aGlzLnkgKyBwaXhlbHMpO1xuICB9XG5cbiAgLyoqXG4gICogcG9pbnRJbkRpcmVjdGlvbiAtIFBvaW50cyB0aGUgc3ByaXRlIGluIGEgc3BlY2lmaWVkIGRpcmVjdGlvbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wb2ludEluRGlyZWN0aW9uKDQ1KTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBkZWcgLSBkaXJlY3Rpb24gdG8gcG9pbnQgdG8uXG4gICovXG4gIHBvaW50SW5EaXJlY3Rpb24oZGVnKSB7XG4gICAgZGVnID4gMCA/IHRoaXMuZGlyZWN0aW9uID0gZGVnICUgMzYwIDogdGhpcy5kaXJlY3Rpb24gPSAoZGVnICsgKDM2MCAqIDEwKSkgJSAzNjA7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBwb2ludFRvd2FyZHMgLSBQb2ludCB0aGUgc3ByaXRlIHRvd2FyZHMgYW5vdGhlciBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUuZ29UbygxMDAsIDEwMCk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucG9pbnRUb3dhcmRzKG90aGVyU3ByaXRlKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIG1vdmUgdG8uXG4gICovXG4gIHBvaW50VG93YXJkcyhzcHJpdGUpIHtcbiAgICAvKipcbiAgICAqIGNvbXB1dGVEaXJlY3Rpb25UbyAtIGZpbmRzIHRoZSBkaXJlY3Rpb24gZnJvbSBzcHJpdGUncyBjdXJyZW50IGxvY2F0aW9uIHRvIGEgc3BlY2lmaWVkIHNldCBvZiBjb29yZGluYXRlcy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVggLSB0aGUgeCBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZnJvbVkgLSB0aGUgeSBjb29yZGluYXRlXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdG9YIC0gdGhlIHggY29vcmRpbmF0ZVxuICAgICogQHBhcmFtIHtudW1iZXJ9IHRvWSAtIHRoZSB5IGNvb3JkaW5hdGVcbiAgICAqIEByZXR1cm4ge251bWJlcn0gLSBkaXJlY3Rpb24gaW4gZGVncmVlcy5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbXB1dGVEaXJlY3Rpb25Ubyhmcm9tWCwgZnJvbVksIHRvWCwgdG9ZKSB7XG4gICAgICAvKipcbiAgICAgICogdG9EZWcgLSBDb252ZXJ0cyByYWRpYW5zIHRvIGRlZ3JlZXMuXG4gICAgICAqXG4gICAgICAqIEBwYXJhbSB7bnVtYmVyfSByYWQgLSBudW1iZXIgb2YgcmFkaWFucy5cbiAgICAgICogQHJldHVybiB7bnVtYmVyfSAtIHJhZGlhbnMgY29udmVydGVkIHRvIGRlZ3JlZXMuXG4gICAgICAqL1xuICAgICAgZnVuY3Rpb24gdG9EZWcocmFkKSB7XG4gICAgICAgIHJldHVybiByYWQgKiAoMTgwIC8gTWF0aC5QSSk7XG4gICAgICB9XG5cbiAgICAgIC8vIDEpIEZpbmQgdGhlIGFuZ2xlIGluIHJhZCwgY29udmVydCB0byBkZWcgKDkwIHRvIC05MCkuXG4gICAgICAvLyAyKSBGaW5kIHRoZSBzaWduIG9mIHRoZSBkZWx0YSBvbiB5IGF4aXMgKDEsIC0xKS4gU2hpZnQgdG8gKDAsIC0yKS4gTXVsdGlwbHkgYnkgOTAuICgwLCAxODApXG4gICAgICAvLyBBZGQgMSkgYW5kIDIpXG4gICAgICAvLyBOb3JtYWxpemUgdG8gMzYwXG5cbiAgICAgIGxldCByZXN1bHQgPSAodG9EZWcoTWF0aC5hdGFuKChmcm9tWCAtIHRvWCkgLyAoZnJvbVkgLSB0b1kpKSkgKyAoOTAgKiAoTWF0aC5zaWduKGZyb21ZIC0gdG9ZKSArIDEpKSArIDM2MCkgJSAzNjA7XG4gICAgICAoZnJvbVkgLSB0b1kpID09PSAwID8gcmVzdWx0ICs9IDkwIDogbnVsbDsgLy8gbWFrZSBzdXJlIHdlIGZpeCBhdGFuIGxpbSAoZGl2aXNpb24gYnkgemVybykuXG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgdGhpcy5kaXJlY3Rpb24gPSBjb21wdXRlRGlyZWN0aW9uVG8odGhpcy54LCB0aGlzLnksIHNwcml0ZS54LCBzcHJpdGUueSk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiB0dXJuUmlnaHQgLSBUdXJucyB0aGUgc3ByaXRlIGluIGEgc3BlY2lmaWVkIG51bWJlciBvZiBkZWdyZWVzIHRvIHRoZSByaWdodCAoY2xvY2t3aXNlKVxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICB0aGlzLnR1cm5SaWdodCg0NSk7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdHVybi5cbiAgKi9cbiAgdHVyblJpZ2h0KGRlZykge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKHRoaXMuZGlyZWN0aW9uICsgZGVnKSAlIDM2MDtcbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHR1cm5MZWZ0IC0gVHVybnMgdGhlIHNwcml0ZSBpbiBhIHNwZWNpZmllZCBudW1iZXIgb2YgZGVncmVlcyB0byB0aGUgbGVmdCAoY291bnRlci1jbG9ja3dpc2UpXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMudHVybkxlZnQoNDUpO1xuICAqIH0pO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGRlZyAtIG51bWJlciBvZiBkZWdyZWVzIHRvIHR1cm4uXG4gICovXG4gIHR1cm5MZWZ0KGRlZykge1xuICAgIHRoaXMuZGlyZWN0aW9uID0gKCh0aGlzLmRpcmVjdGlvbiArIDM2MCkgLSBkZWcpICUgMzYwO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogc2V0Um90YXRpb25TdHlsZSAtIFNldHMgb25lIG9mIHRocmVlIHBvc3NpYmxlIHJvdGF0aW9uIHN0eWxlczpcbiAgKiAgIC0gJ25vJyAvIDIgLSB0aGUgc3ByaXRlcyBjaGFuZ2VzIHRoZSBkaXJlY3Rpb24gaW4gd2hpY2ggaXQgcG9pbnRzIHdpdGhvdXQgY2hhbmdpbmcgdGhlIHNwcml0ZXMgYXBwZWFyYW5jZS5cbiAgKiAgIC0gJ2xlZnQtcmlnaHQnIC8gMSAtIHRoZSBzcHJpdGUgd2lsbCBmbGlwIGhvcml6b250YWxseSB3aGVuIGRpcmVjdGlvbiBpcyBiZXR3ZWVuIDE4MCBhbmQgMzYwLlxuICAqICAgLSAnYWxsJyAvIDAgLSB0aGUgc3ByaXRlIHdpbGwgcm90YXRlIGFyb3VuZCBpdHMgY2VudGVyXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFJvdGF0aW9uU3R5bGUoJ2xlZnQtcmlnaHQnKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLnNldFJvdGF0aW9uU3R5bGUoMSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gZGVnIC0gbnVtYmVyIG9mIGRlZ3JlZXMgdG8gdHVybi5cbiAgKi9cbiAgc2V0Um90YXRpb25TdHlsZShzdHlsZSkge1xuICAgIGxldCBjdXJTdHlsZSA9IHN0eWxlO1xuXG4gICAgc3R5bGUgPT09ICdubycgPyBjdXJTdHlsZSA9IDIgOiBudWxsO1xuICAgIHN0eWxlID09PSAnbGVmdC1yaWdodCcgPyBjdXJTdHlsZSA9IDEgOiBudWxsO1xuICAgIHN0eWxlID09PSAnYWxsJyA/IGN1clN0eWxlID0gMCA6IG51bGw7XG5cbiAgICB0aGlzLnJvdGF0aW9uU3R5bGUgPSBjdXJTdHlsZTtcbiAgfVxuXG4gIC8qKiBMb29rcyAqICovXG5cbiAgLyoqXG4gICogX3JlZnJlc2hDb3N0dW1lIC0gU2V0cyB0aGUgY29zdHVtZSBhbmQgc3ByaXRlIHdpZHRoIGFuZCBoaWdodCB0aGVuIHJlZnJlc2hlcyBlbGVtZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKi9cbiAgX3JlZnJlc2hDb3N0dW1lKCkge1xuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIGFkZENvc3R1bWUgLSBBZGRzIGEgY29zdHVtZSB0byB0aGUgc3ByaXRlXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb3N0dW1lIC0gdGhlIGNvc3R1bWUgdG8gYWRkLlxuICAqL1xuICBhZGRDb3N0dW1lKGNvc3R1bWUpIHtcbiAgICB0aGlzLmNvc3R1bWVzLnB1c2goY29zdHVtZSk7XG5cbiAgICAvLyBpZiBcImJhcmVcIiBzZXQgdGhlIGFkZGVkIGFzIGFjdGl2ZS5cbiAgICBpZiAoIXRoaXMuY29zdHVtZSkge1xuICAgICAgdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1swXTtcbiAgICAgIHRoaXMud2lkdGggPSB0aGlzLmNvc3R1bWUudmlzaWJsZVdpZHRoO1xuICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLmNvc3R1bWUudmlzaWJsZUhlaWdodDtcbiAgICB9XG5cbiAgICB0aGlzLmVsZW1lbnQgPyB0aGlzLmVsZW1lbnQudXBkYXRlKHRoaXMpIDogbnVsbDtcbiAgfVxuXG4gIC8qKlxuICAqIHN3aXRjaENvc3R1bWVUbyAtIFN3aXRjaGVzIHRvIHNwZWNpZmllZCBjb3N0dW1lLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUuc3dpdGNoQ29zdHVtZVRvKGNvc3R1bWUpO1xuICAqXG4gICogQHBhcmFtIHtvYmplY3R9IGJhY2tkcm9wIC0gdGhlIGNvc3R1bWUgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQ29zdHVtZVRvKGNvc3R1bWUpIHtcbiAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKGNvc3R1bWUpO1xuICAgIGN1cnJlbnRDb3N0dW1lSW5kZXggIT09IC0xID8gdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1tjdXJyZW50Q29zdHVtZUluZGV4XSA6IG51bGw7XG5cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogc3dpdGNoQ29zdHVtZVRvTnVtIC0gU3dpdGNoZXMgdG8gc3BlY2lmaWVkIGNvc3R1bWUgYnkgbnVtYmVyIG9mIGN1cnJlbnQgKDAgaXMgZmlyc3QpLiBJZiBub3QgZm91bmQgZmFpbHMgc2lsZW50bHkuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUuc3dpdGNoQ29zdHVtZVRvTnVtKDEpO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gdGhlIGNvc3R1bWUgdG8gc3dpdGNoIHRvby5cbiAgKi9cbiAgc3dpdGNoQ29zdHVtZVRvTnVtKGluZGV4KSB7XG4gICAgdGhpcy5zd2l0Y2hDb3N0dW1lVG8odGhpcy5jb3N0dW1lc1tpbmRleF0pO1xuICB9XG5cbiAgLyoqXG4gICogbmV4dENvc3R1bWUgLSBTd2l0Y2hlcyB0byB0aGUgbmV4dCBjb3N0dW1lLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICogbGV0IGNvc3R1bWUgPSBuZXcgYmxvY2tMaWtlLkNvc3R1bWUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmFkZENvc3R1bWUoY29zdHVtZSk7XG4gICogc3ByaXRlLm5leHRDb3N0dW1lKCk7XG4gICpcbiAgKi9cbiAgbmV4dENvc3R1bWUoKSB7XG4gICAgY29uc3QgY3VycmVudENvc3R1bWVJbmRleCA9IHRoaXMuY29zdHVtZXMuaW5kZXhPZih0aGlzLmNvc3R1bWUpO1xuICAgIHRoaXMuY29zdHVtZSA9IHRoaXMuY29zdHVtZXNbKGN1cnJlbnRDb3N0dW1lSW5kZXggKyAxKSAlIHRoaXMuY29zdHVtZXMubGVuZ3RoXTtcblxuICAgIHRoaXMuX3JlZnJlc2hDb3N0dW1lKCk7XG4gIH1cblxuICAvKipcbiAgKiByZW1vdmVDb3N0dW1lIC0gUmVtb3ZlcyBhIGNvc3R1bWUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZShjb3N0dW1lKTtcbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBjb3N0dW1lIC0gdGhlIGNvc3R1bWUgdG8gcmVtb3ZlLlxuICAqL1xuICByZW1vdmVDb3N0dW1lKGNvc3R1bWUpIHtcbiAgICBpZiAodGhpcy5jb3N0dW1lcy5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBjdXJyZW50Q29zdHVtZUluZGV4ID0gdGhpcy5jb3N0dW1lcy5pbmRleE9mKGNvc3R1bWUpO1xuICAgICAgdGhpcy5jb3N0dW1lID09PSBjb3N0dW1lID8gdGhpcy5jb3N0dW1lID0gdGhpcy5jb3N0dW1lc1soY3VycmVudENvc3R1bWVJbmRleCArIDEpICUgdGhpcy5jb3N0dW1lcy5sZW5ndGhdIDogbnVsbDtcbiAgICAgIHRoaXMuY29zdHVtZXMgPSB0aGlzLmNvc3R1bWVzLmZpbHRlcihpdGVtID0+IGl0ZW0gIT09IGNvc3R1bWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvc3R1bWVzID0gW107XG4gICAgICB0aGlzLmNvc3R1bWUgPSBudWxsO1xuICAgIH1cbiAgICB0aGlzLl9yZWZyZXNoQ29zdHVtZSgpO1xuICB9XG5cbiAgLyoqXG4gICogcmVtb3ZlQ29zdHVtZU51bSAtIFJlbW92ZXMgdGhlIHNwZWNpZmllZCBjb3N0dW1lIGJ5IG51bWJlciBvZiBjdXJyZW50ICgwIGlzIGZpcnN0KS5cbiAgKiBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjb3N0dW1lLCB3aWxsIGZhaWwgYW5kIGVtaXQgYSBjb25zb2xlIG1lc3NhZ2UuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgY29zdHVtZSA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuYWRkQ29zdHVtZShjb3N0dW1lKTtcbiAgKiBzcHJpdGUucmVtb3ZlQ29zdHVtZU51bSgxKTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCAtIHRoZSBjb3N0dW1lIHRvIHJlbW92ZS5cbiAgKi9cbiAgcmVtb3ZlQ29zdHVtZU51bShpbmRleCkge1xuICAgIHRoaXMucmVtb3ZlQ29zdHVtZSh0aGlzLmNvc3R1bWVzW2luZGV4XSk7XG4gIH1cblxuICAvKipcbiAgKiBzaG93IC0gU2hvd3MgdGhlIHNwcml0ZS4gQnkgZGVmYXVsdCBzcHJpdGVzIGFyZSBzaG93bi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaGlkZSgpO1xuICAqIHNwcml0ZS5zaG93KCk7XG4gICpcbiAgKi9cbiAgc2hvdygpIHtcbiAgICB0aGlzLnNob3dpbmcgPSB0cnVlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogaGlkZSAtIEhpZGVzIHRoZSBzcHJpdGUuIEJ5IGRlZmF1bHQgc3ByaXRlcyBhcmUgc2hvd24uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmhpZGUoKTtcbiAgKlxuICAqL1xuICBoaWRlKCkge1xuICAgIHRoaXMuc2hvd2luZyA9IGZhbHNlO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogcmVmcmVzaCAtIEZvcmNlcyBhIHNwcml0ZSByZWZyZXNoLlxuICAqIE5vdGU6IHNlcnZpY2UgbWV0aG9kIHRvIGJlIHVzZWQgaWYgY29zdHVtZSB3YXMgbWFuaXB1bGF0ZWQgZGlyZWN0bHkuXG4gICovXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIC8vIHdhaXQgYSBzZWMuLi5cbiAgICAvLyBUT0RPOiBUaGlzIGlzIHRvIGFjY29tb2RhdGUgZHluYW1pYyBpbWFnZSByZXNpemUuIE5vdCBpZGVhbC4gU2hvdWxkIGJlIGV2ZW50IGRyaXZlbi5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIC8vIGluIGNhc2UgY29zdHVtZSB3YXMgcmVzaXplZCBmb3JjZSBhIHJlc2V0IG9mIHNpemUuXG4gICAgICBtZS5zZXRTaXplKG1lLm1hZ25pZmljYXRpb24pO1xuICAgICAgLy8gdGhlbiByZWZyZXNoIHRoZSBET00uXG4gICAgICBtZS5lbGVtZW50ID8gbWUuZWxlbWVudC51cGRhdGUobWUpIDogbnVsbDtcbiAgICB9LCB0aGlzLnBhY2UpO1xuICB9XG5cbiAgLyoqXG4gICogcmVzaXplVG9JbWFnZSAtIHNldHMgdGhlIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIHNwcml0ZSB0byB0aGF0IG9mIHRoZSBpbWFnZSBmaWxlIG9mIGN1cnJlbnQgY29zdHVtZS5cbiAgKiBOb3RlOiBzZXJ2aWNlIG1ldGhvZC4gU2ltaWxhciB0byBjYWxsaW5nIHJlc2l6ZVRvSW1hZ2UoKSBvbiBjb3N0dW1lIGFuZCB0aGVuIHJlZnJlc2goKSBvbiBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGNvbnN0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKG51bGwpO1xuICAqXG4gICogY29uc3QgYW5ncnlTaGVlcCA9IG5ldyBibG9ja0xpa2UuQ29zdHVtZSh7XG4gICogICBpbWFnZTogJ2h0dHBzOi8vdXBsb2FkLndpa2ltZWRpYS5vcmcvd2lraXBlZGlhL2NvbW1vbnMvdGh1bWIvZC9kYi9FbW9qaW9uZV8xRjQxMS5zdmcvMjAwcHgtRW1vamlvbmVfMUY0MTEuc3ZnLnBuZycsXG4gICogfSk7XG4gICogYW5ncnlTaGVlcC5hZGRUbyhzcHJpdGUpO1xuICAqXG4gICogc3ByaXRlLnJlc2l6ZVRvSW1hZ2UoKTtcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqL1xuICByZXNpemVUb0ltYWdlKCkge1xuICAgIGlmICh0aGlzLmNvc3R1bWUpIHtcbiAgICAgIHRoaXMuY29zdHVtZS5yZXNpemVUb0ltYWdlKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZWZyZXNoKCk7XG4gIH1cblxuICAvKipcbiAgKiBpbm5lciAtIFBsYWNlcyBodG1sIGVsZW1lbnQgaW5zaWRlIHRoZSBjdXJyZW50IGNvc3R1bWUgb2YgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuaW5uZXIoJzxwIGNsYXNzPVwiYmlnIGNlbnRlcmVkIHJhaW5ib3dcIj46KTwvcD4nKTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLmlubmVyKCdJIGxpa2UgdGV4dCBvbmx5Jyk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGlubmVyKGh0bWwpIHtcbiAgICB0aGlzLmNvc3R1bWUuaW5uZXIoaHRtbCk7XG4gICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gIH1cblxuICAvKipcbiAgKiBpbnNlcnQgLSBQbGFjZXMgYSBET00gZWxlbWVudCBpbnNpZGUgdGhlIGN1cnJlbnQgY29zdHVtZSBvZiB0aGUgc3ByaXRlLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5pbnNlcnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ215LWh0bWwtY3JlYXRpb24nKSk7XG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gZWwgLSB0aGUgRE9NIGVsZW1lbnQuXG4gICovXG4gIGluc2VydChlbCkge1xuICAgIHRoaXMuY29zdHVtZS5pbnNlcnQoZWwpO1xuICAgIHRoaXMuZWxlbWVudCA/IHRoaXMuZWxlbWVudC51cGRhdGUodGhpcykgOiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICogX3JlZnJlc2hTaXplIC0gU2V0cyB0aGUgc3ByaXRlIHdpZHRoIGFuZCBoaWdodCBpbiByZWxhdGlvbiB0byBvcmlnaW5hbCB0aGVuIHJlZnJlc2hlcyBlbGVtZW50LlxuICAqXG4gICogQHByaXZhdGVcbiAgKiBAcGFyYW0ge29iamVjdH0gY29zdHVtZSAtIHRoZSBjb3N0dW1lIHRvIGFkZC5cbiAgKi9cbiAgX3JlZnJlc2hTaXplKCkge1xuICAgIC8qKlxuICAgICogZGVjaW1hbFJvdW5kIC0gcm91bmRzIGEgbnVtYmVyIHRvbyBkZWNpbWFsIHBvaW50cy5cbiAgICAqXG4gICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWUgLSB0aGUgdmFsdWUgdG8gcm91bmQuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gcG9pbnRzIC0gaG93IG1hbnkgZGVjaW1hbCBwb2ludHMgdG8gbGVhdmUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBkZWNpbWFsUm91bmQodmFsdWUsIHBvaW50cykge1xuICAgICAgcmV0dXJuIE1hdGgucm91bmQodmFsdWUgKiAoMTAgKiogcG9pbnRzKSkgLyAoMTAgKiogcG9pbnRzKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb3N0dW1lKSB7XG4gICAgICB0aGlzLndpZHRoID0gZGVjaW1hbFJvdW5kKHRoaXMuY29zdHVtZS53aWR0aCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgIHRoaXMuaGVpZ2h0ID0gZGVjaW1hbFJvdW5kKHRoaXMuY29zdHVtZS5oZWlnaHQgKiAodGhpcy5tYWduaWZpY2F0aW9uIC8gMTAwKSwgMik7XG5cbiAgICAgIHRoaXMuY29zdHVtZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICBjb25zdCBjb3N0dW1lID0gaXRlbTtcbiAgICAgICAgY29zdHVtZS52aXNpYmxlV2lkdGggPSBkZWNpbWFsUm91bmQoY29zdHVtZS53aWR0aCAqICh0aGlzLm1hZ25pZmljYXRpb24gLyAxMDApLCAyKTtcbiAgICAgICAgY29zdHVtZS52aXNpYmxlSGVpZ2h0ID0gZGVjaW1hbFJvdW5kKGNvc3R1bWUuaGVpZ2h0ICogKHRoaXMubWFnbmlmaWNhdGlvbiAvIDEwMCksIDIpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY29zdHVtZS52aXNpYmxlV2lkdGggPSB0aGlzLndpZHRoO1xuICAgICAgdGhpcy5jb3N0dW1lLnZpc2libGVIZWlnaHQgPSB0aGlzLmhlaWdodDtcblxuICAgICAgdGhpcy5lbGVtZW50ID8gdGhpcy5lbGVtZW50LnVwZGF0ZSh0aGlzKSA6IG51bGw7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlU2l6ZSAtIENoYW5nZXMgdGhlIHNpemUgb2YgdGhlIHNwcml0ZSBieSBzcGVjaWZpZWQgcGVyY2VudGFnZSBudW1iZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLmNoYW5nZVNpemUoNTApO1xuICAqXG4gICogQHBhcmFtIHtudW1iZXJ9IGNoYW5nZSAtIHRoZSBwZXJjZW50YWdlIGNoYW5nZS5cbiAgKi9cbiAgY2hhbmdlU2l6ZShjaGFuZ2UpIHtcbiAgICB0aGlzLm1hZ25pZmljYXRpb24gPSB0aGlzLm1hZ25pZmljYXRpb24gKyBjaGFuZ2U7XG5cbiAgICB0aGlzLl9yZWZyZXNoU2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICogc2V0U2l6ZSAtIFNldHMgdGhlIHNpemUgb2YgdGhlIHNwcml0ZSB0byB0aGUgc3BlY2lmaWVkIHBlcmNlbnRhZ2UgbnVtYmVyLlxuICAqXG4gICogQGV4YW1wbGVcbiAgKiBsZXQgc3RhZ2UgPSBuZXcgYmxvY2tMaWtlLlN0YWdlKCk7XG4gICogbGV0IHNwcml0ZSA9IG5ldyBibG9ja0xpa2UuU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIHNwcml0ZS5zZXRTaXplKDE1MCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGVyY2VudCAtIHRoZSBwZXJjZW50YWdlIHRvIHNldC5cbiAgKi9cbiAgc2V0U2l6ZShwZXJjZW50KSB7XG4gICAgdGhpcy5tYWduaWZpY2F0aW9uID0gcGVyY2VudDtcblxuICAgIHRoaXMuX3JlZnJlc2hTaXplKCk7XG4gIH1cblxuICAvKiogVGV4dCBVSSAqICovXG5cbiAgLyoqXG4gICogdGhpbmsgLSBDcmVhdGVzIGEgXCJ0aGluayBidWJibGVcIiBvdmVyIHRoZSBzcHJpdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnRoaW5rKCdJIHRoaW5rIHRoZXJlZm9yZSBJIGFtLicpO1xuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSB0aGUgdGV4dCBpbnNpZGUgdGhlIGJ1YmJsZS5cbiAgKi9cbiAgdGhpbmsodGV4dCkge1xuICAgIGlmICh0aGlzLmVsZW1lbnQpIHtcbiAgICAgIHRoaXMudGV4dHVpID8gdGhpcy50ZXh0dWkgPSB0aGlzLnRleHR1aS5kZWxldGUodGhpcykgOiBudWxsO1xuICAgICAgdHlwZW9mIHRleHQgIT09ICd1bmRlZmluZWQnICYmIHRleHQudG9TdHJpbmcoKSA/IHRoaXMudGV4dHVpID0gbmV3IFRleHRVaUVsZW1lbnQodGhpcywgJ3RoaW5rJywgdGV4dCkgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHRoaW5rV2FpdCAtIENyZWF0ZXMgYSBcInRoaW5rIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZSBmb3IgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIHNlY29uZHMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnRoaW5rV2FpdCgnSSB0aGluayB0aGVyZWZvcmUgSSBhbS4nLCAzKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHNlYyAtIHRoZSBudW1iZXIgb2Ygc2Vjb25kcyB0byB3YWl0LlxuICAqL1xuICB0aGlua1dhaXQodGV4dCwgc2VjLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRoaW5rKCcnKTtcbiAgICAgIHRoaXMuX3JlbGVhc2VXYWl0ZWQodHJpZ2dlcmluZ0lkKTtcbiAgICB9LCBzZWMgKiAxMDAwKTtcbiAgICB0aGlzLnRoaW5rKHRleHQpO1xuICB9XG5cbiAgLyoqXG4gICogc2F5IC0gQ3JlYXRlcyBhIFwic3BlZWNoIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5KCdJdCBpcyBub3QgdGhlIGNvbnNjaW91c25lc3Mgb2YgbWVuIHRoYXQgZGV0ZXJtaW5lcyB0aGVpciBiZWluZywgYnV0LCBvbiB0aGUgY29udHJhcnksIHRoZWlyIHNvY2lhbCBiZWluZyB0aGF0IGRldGVybWluZXMgdGhlaXIgY29uc2Npb3VzbmVzcy4nKTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IC0gdGhlIHRleHQgaW5zaWRlIHRoZSBidWJibGUuXG4gICovXG4gIHNheSh0ZXh0KSB7XG4gICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgdGhpcy50ZXh0dWkgPyB0aGlzLnRleHR1aSA9IHRoaXMudGV4dHVpLmRlbGV0ZSh0aGlzKSA6IG51bGw7XG4gICAgICB0eXBlb2YgdGV4dCAhPT0gJ3VuZGVmaW5lZCcgJiYgdGV4dC50b1N0cmluZygpID8gdGhpcy50ZXh0dWkgPSBuZXcgVGV4dFVpRWxlbWVudCh0aGlzLCAnc2F5JywgdGV4dCkgOiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAqIHNheVdhaXQgLSBDcmVhdGVzIGEgXCJzcGVlY2ggYnViYmxlXCIgb3ZlciB0aGUgc3ByaXRlIGZvciBhIHNwZWNpZmllZCBudW1iZXIgb2Ygc2Vjb25kcy5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2F5V2FpdCgnSXQgaXMgbm90IHRoZSBjb25zY2lvdXNuZXNzIG9mIG1lbiB0aGF0IGRldGVybWluZXMgdGhlaXIgYmVpbmcsIGJ1dCwgb24gdGhlIGNvbnRyYXJ5LCB0aGVpciBzb2NpYWwgYmVpbmcgdGhhdCBkZXRlcm1pbmVzIHRoZWlyIGNvbnNjaW91c25lc3MuJywgMyk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IGluc2lkZSB0aGUgYnViYmxlLlxuICAqIEBwYXJhbSB7bnVtYmVyfSBzZWMgLSB0aGUgbnVtYmVyIG9mIHNlY29uZHMgdG8gd2FpdC5cbiAgKi9cbiAgc2F5V2FpdCh0ZXh0LCBzZWMsIHRyaWdnZXJpbmdJZCA9IG51bGwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBjbGFzcy1tZXRob2RzLXVzZS10aGlzXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnNheSgnJyk7XG4gICAgICB0aGlzLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgfSwgc2VjICogMTAwMCk7XG4gICAgdGhpcy5zYXkodGV4dCk7XG4gIH1cblxuICAvKipcbiAgKiBhc2sgLSBDcmVhdGVzIGFuIFwiYXNrIGJ1YmJsZVwiIG92ZXIgdGhlIHNwcml0ZS5cbiAgKiBBbGxvd3MgZm9yIGFuIGlucHV0IGJveCB0byBiZSBkaXNwbGF5ZWQgdG8gdGhlIHVzZXIgYW5kXG4gICogY2FwdHVyZSB1c2VyIGlucHV0IGludG8gdGhlIHZhcmlhYmxlIHNwZWNpZmllZCBieSB0aGUgdXNlci5cbiAgKiBOb3RlIC0gdmFyaWFibGUgZm9yIGFuc3dlciBtdXN0IGJlIGRlY2xhcmVkIGluIGdsb2JhbCBzY29wZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogLy9nb29kOlxuICAqIGxldCBhbnN3ZXI7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIGFuc3dlciA9IHRoaXMuYXNrKCdJcyB0aGUgZGVzdGlueSBvZiBtYW5raW5kIGRlY2lkZWQgYnkgbWF0ZXJpYWwgY29tcHV0YXRpb24/Jyk7XG4gICogICB0aGlzLnNheShhbnN3ZXIpO1xuICAqIH0pO1xuICAqXG4gICogLy8gYmFkOlxuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogICBsZXQgYW5zd2VyO1xuICAqICAgYW5zd2VyID0gdGhpcy5hc2soJ0lzIHRoZSBkZXN0aW55IG9mIG1hbmtpbmQgZGVjaWRlZCBieSBtYXRlcmlhbCBjb21wdXRhdGlvbj8nKTtcbiAgKiAgIHRoaXMuc2F5KGFuc3dlcik7XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAtIHRoZSB0ZXh0IG9mIHRoZSBxdWVzdGlvblxuICAqXG4gICovXG4gIGFzayh0ZXh0LCB0aGVWYXIgPSBudWxsLCB0cmlnZ2VyaW5nSWQgPSBudWxsKSB7XG4gICAgY29uc3QgbWUgPSB0aGlzO1xuICAgIG1lLmFza0lkID0gdGhpcy5fZ2VuZXJhdGVVVUlEKCk7XG5cbiAgICBpZiAodGhpcy5lbGVtZW50KSB7XG4gICAgICB0aGlzLnRleHR1aSA/IHRoaXMudGV4dHVpID0gdGhpcy50ZXh0dWkuZGVsZXRlKHRoaXMpIDogbnVsbDtcbiAgICAgIHR5cGVvZiB0ZXh0ICE9PSAndW5kZWZpbmVkJyAmJiB0ZXh0LnRvU3RyaW5nKCkgPyB0aGlzLnRleHR1aSA9IG5ldyBUZXh0VWlFbGVtZW50KG1lLCAnYXNrJywgdGV4dCkgOiBudWxsO1xuXG4gICAgICAvLyB0aGlzIHdpbGwgd2FpdCBmb3IgdXNlciBpbnB1dFxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihgYmxvY2tMaWtlLmFzay4ke3RoaXMuaWR9LiR7bWUuYXNrSWR9YCwgZnVuY3Rpb24gYXNrTGlzdGVuZXIoZSkge1xuICAgICAgICAvLyByZW1vdmUgaXQuXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoYGJsb2NrTGlrZS5hc2suJHttZS5pZH0uJHttZS5hc2tJZH1gLCBhc2tMaXN0ZW5lcik7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHdhaXRlZCBtZXRob2QgbGlzdGVuZXIuIHJlbGVhc2UgaXQuXG4gICAgICAgIG1lLl9yZWxlYXNlV2FpdGVkKHRyaWdnZXJpbmdJZCk7XG4gICAgICAgIC8vIHNldCB0aGUgdXNlciBkZWZpbmVkIHZhcmlhYmxlIHRvIHRoZSBjYXB0dXJlZCB2YWx1ZS5cbiAgICAgICAgdGhlVmFyID8gbWUuX3NldFRvVmFyKHRoZVZhciwgZS5kZXRhaWwudmFsdWUpIDogbnVsbDtcbiAgICAgICAgLy8gcmVtb3ZlIHRoZSBVSS5cbiAgICAgICAgbWUudGV4dHVpID8gbWUudGV4dHVpID0gbWUudGV4dHVpLmRlbGV0ZShtZSkgOiBudWxsO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqIFBlbiAqICovXG5cbiAgLyoqXG4gICogcGVuQ2xlYXIgLSBDbGVhcnMgdGhlIGRyYXdpbmcgc3VyZmFjZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5wZW5DbGVhcigpO1xuICAqIH0pO1xuICAqXG4gICovXG4gIHBlbkNsZWFyKCkge1xuICAgIHRoaXMuc3VyZmFjZS5jbGVhcih0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBlbkRvd24gLSBcIkFjdGl2YXRlc1wiIGRyYXdpbmcgYnkgc2V0dGluZyByZXF1aXJlZCB2YWx1ZXMuXG4gICogV2hlbiBhY3RpdmF0ZWQgc3ByaXRlIG1vdGlvbiB3aWxsIGNyZWF0ZSB0aGUgZHJhd2luZyBvbiB0aGUgc3RhZ2UncyBjYW52YXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuRG93bigpO1xuICAqICAgdGhpcy5tb3ZlKDEwMCk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgcGVuRG93bigpIHtcbiAgICB0aGlzLmRyYXdpbmcgPSB0cnVlO1xuICAgIHRoaXMucHJldlggPSB0aGlzLng7XG4gICAgdGhpcy5wcmV2WSA9IHRoaXMueTtcbiAgICB0aGlzLnN1cmZhY2UuZHJhdyh0aGlzKTtcbiAgfVxuXG4gIC8qKlxuICAqIHBlblVwIC0gXCJEZWFjdGl2YXRlc1wiIGRyYXdpbmcgYnkgc2V0dGluZyByZXF1aXJlZCB2YWx1ZXMuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHRoaXMucGVuRG93bigpO1xuICAqICAgdGhpcy5tb3ZlKDEwMCk7XG4gICogICB0aGlzLnBlblVwKCk7XG4gICogfSk7XG4gICpcbiAgKi9cbiAgcGVuVXAoKSB7XG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2U7XG4gICAgdGhpcy5zdXJmYWNlLmRyYXcodGhpcyk7XG4gIH1cblxuICAvKipcbiAgKiBzZXRQZW5Db2xvciAtIFNldHMgdGhlIGNvbG9yIG9mIHRoZSBwZW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCcjZmYwMDAwJylcbiAgKlxuICAqIEBleGFtcGxlXG4gICogc3ByaXRlLnNldFBlbkNvbG9yKCdyZWQnKVxuICAqXG4gICogQHBhcmFtIHtzdHJpbmd9IGNvbG9yU3RyaW5nIC0gYSB2YWxpZCBjb2xvciBkZWZpbml0aW9uIGZvciBjYW52YXMgc3Ryb2tlU3R5bGUuXG4gICovXG4gIHNldFBlbkNvbG9yKGNvbG9yU3RyaW5nKSB7XG4gICAgdGhpcy5wZW5Db2xvciA9IGNvbG9yU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICogc2V0UGVuU2l6ZSAtIFNldHMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUuc2V0UGVuU2l6ZSgxMCk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzIC0gYSBudW1iZXIgZm9yIGNhbnZhcyBsaW5lV2lkdGguXG4gICovXG4gIHNldFBlblNpemUocGl4ZWxzKSB7XG4gICAgdGhpcy5wZW5TaXplID0gcGl4ZWxzO1xuICB9XG5cbiAgLyoqXG4gICogY2hhbmdlUGVuU2l6ZSAtIENoYW5nZXMgdGhlIHNpemUgb2YgdGhlIHBlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgdGhpcy5jaGFuZ2VQZW5TaXplKDEwKTtcbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7bnVtYmVyfSBjaGFuZ2UgLSB0aGUgY2hhbmdlIGluIHBpeGVscy5cbiAgKi9cbiAgY2hhbmdlUGVuU2l6ZShjaGFuZ2UpIHtcbiAgICB0aGlzLnBlblNpemUgPSB0aGlzLnBlblNpemUgKyBjaGFuZ2U7XG4gIH1cblxuICAvKiBTZW5zaW5nICovXG5cbiAgLyoqXG4gICogZGlzdGFuY2VUbyAtIFJldHVybnMgdGhlIGRpc3RhbmNlIHRvIGEgcG9pbnQgb24gdGhlIHNjcmVlbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSh7c2Vuc2luZzogdHJ1ZX0pO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8odGhpcy5tb3VzZVgsIHRoaXMubW91c2VZKSlcbiAgKiB9KTtcbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLm90aGVyU3ByaXRlKCk7XG4gICpcbiAgKiBzcHJpdGUuYWRkVG8oc3RhZ2UpO1xuICAqIG90aGVyU3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKlxuICAqIHN0YWdlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgc3ByaXRlLnNheSh0aGlzLmRpc3RhbmNlVG8ob3RoZXJTcHJpdGUueCwgb3RoZXJTcHJpdGUueSkpXG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge251bWJlcn0geCAtIHRoZSB4IGNvb3JkaW5hdGUuXG4gICogQHBhcmFtIHtudW1iZXJ9IHkgLSB0aGUgeSBjb29yZGluYXRlLlxuICAqIEByZXR1cm4ge251bWJlcn0gLSBkaXN0YW5jZSBpbiBwaXhlbHMgdG8gcG9zaXRpb24gb24gc2NyZWVuIChub3Qgcm91bmRlZCkuXG4gICovXG4gIGRpc3RhbmNlVG8oeCwgeSkge1xuICAgIGNvbnN0IGR4ID0gdGhpcy54IC0geDtcbiAgICBjb25zdCBkeSA9IHRoaXMueSAtIHk7XG5cbiAgICByZXR1cm4gTWF0aC5zcXJ0KChkeCAqIGR4KSArIChkeSAqIGR5KSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0VkZ2UgLSBDaGVja3MgaXMgdGhpcyBzcHJpdGUgdG91Y2hlcyB0aGUgZWRnZSBvZiB0aGUgc3RhZ2UgYW5kIHJldHVybnMgdGhlIGVkZ2UgdG91Y2hlZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiB0aGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgd2hpbGUodGhpcy54IDwgc3RhZ2Uud2lkdGggLyAyKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKVxuICAqICAgIHRoaXMuc2F5KHRoaXMudG91Y2hpbmdFZGdlKCkpO1xuICAqICAgfVxuICAqIH0pO1xuICAqXG4gICogQHJldHVybiB7c3RyaW5nfSAtIHRoZSBzaWRlIG9mIHRoZSBzdGFnZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmdFZGdlKCkge1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuXG4gICAgaWYgKCh0aGlzLngpICsgKHRoaXMud2lkdGggLyAyKSA+IHRoaXMuc3RhZ2VXaWR0aCAvIDIpIHtcbiAgICAgIHJlc3VsdCA9ICdyaWdodCc7XG4gICAgfVxuICAgIGlmICgodGhpcy54KSAtICh0aGlzLndpZHRoIC8gMikgPCAtMSAqICh0aGlzLnN0YWdlV2lkdGggLyAyKSkge1xuICAgICAgcmVzdWx0ID0gJ2xlZnQnO1xuICAgIH1cbiAgICBpZiAoKHRoaXMueSkgKyAodGhpcy5oZWlnaHQgLyAyKSA+IHRoaXMuc3RhZ2VIZWlnaHQgLyAyKSB7XG4gICAgICByZXN1bHQgPSAndG9wJztcbiAgICB9XG4gICAgaWYgKCh0aGlzLnkpIC0gKHRoaXMuaGVpZ2h0IC8gMikgPCAtMSAqICh0aGlzLnN0YWdlSGVpZ2h0IC8gMikpIHtcbiAgICAgIHJlc3VsdCA9ICdib3R0b20nO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgKiBpc1RvdWNoaW5nRWRnZSAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIHRoZSBlZGdlLlxuICAqXG4gICogTm90ZXM6XG4gICogMS4gVGhpcyBpcyBiYXNlZCBvbiByZWN0YW5ndWxhciBjb2xsaXNpb24gZGV0ZWN0aW9uLlxuICAqIDIuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICB3aGlsZSh0aGlzLnggPCBzdGFnZS53aWR0aCAvIDIpIHtcbiAgKiAgICB0aGlzLm1vdmUoMTApXG4gICogICAgdGhpcy5zYXkodGhpcy5pc1RvdWNoaW5nRWRnZSgpKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgZWRnZS5cbiAgKi9cbiAgaXNUb3VjaGluZ0VkZ2UoKSB7XG4gICAgcmV0dXJuICEhdGhpcy50b3VjaGluZ0VkZ2UoKTtcbiAgfVxuXG4gIC8qKlxuICAqIHRvdWNoaW5nIC0gQ2hlY2tzIGlzIHRoaXMgc3ByaXRlIHRvdWNoZXMgYW5vdGhlciBhbmQgcmV0dXJucyBhdCB3aGF0IHNpZGUgaXQgdG91Y2hlcy5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIHRoaXMgY29tcGFyZXMgYSBuYWl2ZSByZWN0YW5nbGUsIHNvIGlmIHRoZSBzcHJpdGUgaXMgcm90YXRlZCB0b3VjaGluZyBtaWdodCBiZSBzZW5zZWQgZWFybHkgb3IgbGF0ZS5cbiAgKiAyLiBpZiB0aGUgc3ByaXRlIGhhcyBnb25lIFwiaW50b1wiIHRoZSBvdGhlciB0aGUgc2lkZSBcInBlbmV0cmF0ZWQgbW9yZVwiIHdpbGwgYmUgcmV0dXJuZWQuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLnRvdWNoaW5nKG90aGVyU3ByaXRlKSkge1xuICAqICAgIHRoaXMubW92ZSgxMCk7XG4gICogICAgdGhpcy5zYXkodGhpcy50b3VjaGluZyhvdGhlclNwcml0ZSkpXG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byBjaGVjayBpZiB0b3VjaGluZy5cbiAgKiBAcmV0dXJuIHtzdHJpbmd9IC0gdGhlIHNpZGUgb2YgdGhlIHNwcml0ZSB0aGF0IGlzIHRvdWNoZWQgKG51bGwsIHRvcCwgYm90dG9tLCBsZWZ0LCByaWdodClcbiAgKi9cbiAgdG91Y2hpbmcoc3ByaXRlKSB7XG4gICAgbGV0IHJlc3VsdCA9IG51bGw7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnggKyAodGhpcy53aWR0aCAvIDIpID4gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMikgJiZcbiAgICAgIHRoaXMueCAtICh0aGlzLndpZHRoIC8gMikgPCBzcHJpdGUueCArIChzcHJpdGUud2lkdGggLyAyKSAmJlxuICAgICAgdGhpcy55ICsgKHRoaXMuaGVpZ2h0IC8gMikgPiBzcHJpdGUueSAtIChzcHJpdGUuaGVpZ2h0IC8gMikgJiZcbiAgICAgIHRoaXMueSAtICh0aGlzLmhlaWdodCAvIDIpIDwgc3ByaXRlLnkgKyAoc3ByaXRlLmhlaWdodCAvIDIpXG4gICAgKSB7XG4gICAgICB0aGlzLnggPj0gc3ByaXRlLnggPyByZXN1bHQgPSAnbGVmdCcgOiBudWxsO1xuICAgICAgdGhpcy54IDwgc3ByaXRlLnggPyByZXN1bHQgPSAncmlnaHQnIDogbnVsbDtcbiAgICAgIHRoaXMueSA+IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICdib3R0b20nIDogbnVsbDtcbiAgICAgIHRoaXMueSA8IHNwcml0ZS55ICYmIE1hdGguYWJzKHRoaXMueSAtIHNwcml0ZS55KSA+IE1hdGguYWJzKHRoaXMueCAtIHNwcml0ZS54KSA/IHJlc3VsdCA9ICd0b3AnIDogbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZyAtIENoZWNrcyBpcyB0aGlzIHNwcml0ZSB0b3VjaGVzIGFub3RoZXIuXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKiBsZXQgb3RoZXJTcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBvdGhlclNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogb3RoZXJTcHJpdGUubW92ZSgyMDApO1xuICAqIHNwcml0ZS53aGVuQ2xpY2tlZCggZnVuY3Rpb24oKSB7XG4gICogIHdoaWxlKCF0aGlzLmlzVG91Y2hpbmcob3RoZXJTcHJpdGUpKSB7XG4gICogICAgdGhpcy5tb3ZlKDEwKTtcbiAgKiAgIH1cbiAgKiB9KTtcbiAgKlxuICAqIEBwYXJhbSB7c3RyaW5nfSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIGNoZWNrIGlmIHRvdWNoaW5nLlxuICAqIEByZXR1cm4ge2Jvb2xlYW59IC0gaXMgdGhlIHNwcml0ZSB0b3VjaGluZyB0aGUgc3BlY2lmaWVkIHNwcml0ZS5cbiAgKi9cbiAgaXNUb3VjaGluZyhzcHJpdGUpIHtcbiAgICByZXR1cm4gISF0aGlzLnRvdWNoaW5nKHNwcml0ZSk7XG4gIH1cblxuICAvKipcbiAgKiB0b3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBSZXR1cm5zIHRoZSBoZXggdmFsdWUgdG8gYWxsIHBpeGVscyBpbiBiYWNrZHJvcCBhcmVhIGNvdmVyZWQgYnkgdGhlIHNwcml0ZSByZWN0YW5nbGUuXG4gICpcbiAgKiBOb3RlczpcbiAgKiAxLiBUaGlzIGlzIGJhc2VkIG9uIHJlY3Rhbmd1bGFyIGNvbGxpc2lvbiBkZXRlY3Rpb24uXG4gICogMi4gVGhpcyBjb21wYXJlcyBhIG5haXZlIHJlY3RhbmdsZSwgc28gaWYgdGhlIHNwcml0ZSBpcyByb3RhdGVkIHRvdWNoaW5nIG1pZ2h0IGJlIHNlbnNlZCBlYXJseSBvciBsYXRlLlxuICAqIDMuIFRoZSBiYWNrZHJvcCBpbWFnZSBtdXN0IGJlIGEgbG9jYWwgaW1hZ2Ugc2VydmVkIGZyb20gc2FtZSBvcmlnaW4uXG4gICpcbiAgKiBAZXhhbXBsZVxuICAqIGxldCBzdGFnZSA9IG5ldyBibG9ja0xpa2UuU3RhZ2UoKTtcbiAgKiBsZXQgc3ByaXRlID0gbmV3IGJsb2NrTGlrZS5TcHJpdGUoKTtcbiAgKlxuICAqIHNwcml0ZS5hZGRUbyhzdGFnZSk7XG4gICogc3ByaXRlLndoZW5DbGlja2VkKCBmdW5jdGlvbigpIHtcbiAgKiAgIHdoaWxlKHRydWUpe1xuICAqICAgICBsZXQgdG91Y2hlZENvbG9ycyA9IHRoaXMudG91Y2hpbmdCYWNrZHJvcENvbG9yKCk7XG4gICogICAgIHRoaXMuc2F5KHRvdWNoZWRDb2xvcnMpO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcmV0dXJuIHthcnJheX0gLSBjb2xvcnMgKHN0cmluZ3MpIHRvdWNoZWQuXG4gICovXG4gIHRvdWNoaW5nQmFja2Ryb3BDb2xvcigpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcblxuICAgIC8qKlxuICAgICogcmdiVG9IZXggLSBjb252ZXJ0cyBhIGNvbG9yIGRlZmluZWQgYnkgUkdCIHZhbHVlcyBpbnRvIGEgb24gZGVmaW5lZCBhcyBhIGhleCBzdHJpbmcuXG4gICAgKlxuICAgICogRnJvbTogaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTYyMzgzOC9yZ2ItdG8taGV4LWFuZC1oZXgtdG8tcmdiXG4gICAgKlxuICAgICogQHBhcmFtIHtudW1iZXJ9IHIgLSB0aGUgcmVkIHZhbHVlICgwIHRvIDI1NSkuXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZyAtIHRoZSBncmVlbiB2YWx1ZSAoMCB0byAyNTUpLlxuICAgICogQHBhcmFtIHtudW1iZXJ9IGIgLSAgdGhlIGJsdWUgdmFsdWUgKDAgdG8gMjU1KS5cbiAgICAqIEByZXR1cm4ge3N0cmluZ30gLSBoZXggY29sb3Igc3RyaW5nLlxuICAgICovXG4gICAgZnVuY3Rpb24gcmdiVG9IZXgociwgZywgYikge1xuICAgICAgcmV0dXJuIGAjJHsoKDEgPDwgMjQpICsgKHIgPDwgMTYpICsgKGcgPDwgOCkgKyBiKS50b1N0cmluZygxNikuc2xpY2UoMSl9YDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1iaXR3aXNlXG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGJhY2tkcm9wQ29udGV4dCA9IHRoaXMuYWdhaW5zdEJhY2tkcm9wLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBjb25zdCBkYXRhID0gYmFja2Ryb3BDb250ZXh0LmdldEltYWdlRGF0YSgoKHRoaXMuc3RhZ2VXaWR0aCAvIDIpIC0gKHRoaXMud2lkdGggLyAyKSkgKyB0aGlzLngsICgodGhpcy5zdGFnZUhlaWdodCAvIDIpIC0gKHRoaXMuaGVpZ2h0IC8gMikpIC0gdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCkuZGF0YTtcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSArPSA0KSB7XG4gICAgICAgIGRhdGFbaSArIDNdICE9PSAwID8gcmVzdWx0LnB1c2gocmdiVG9IZXgoZGF0YVtpXSwgZGF0YVtpICsgMV0sIGRhdGFbaSArIDJdKSkgOiBudWxsO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdCbG9ja0xpa2UuanMgTm90aWNlOiBpc1RvdWNoaW5nQmFja2Ryb3BDb2xvcigpIGluZ25vcmVkLiBCYWNrZHJvcCBpbWFnZSBjYW4gbm90IGJlIGxvY2F0ZWQgYXQgYSByZW1vdGUgb3JpZ2luLicpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICB9XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbShuZXcgU2V0KHJlc3VsdCkpO1xuICB9XG5cbiAgLyoqXG4gICogaXNUb3VjaGluZ0JhY2tkcm9wQ29sb3IgLSBjb21wYXJlcyBhIGdpdmVuIGhleCB2YWx1ZSB0byBhbGwgcGl4ZWxzIGluIGJhY2tkcm9wIGFyZWEgY292ZXJlZCBieSB0aGUgc3ByaXRlIHJlY3RhbmdsZS5cbiAgKiBJZiBhIG1hdGNoIGlzIGZvdW5kIHRoZSBjb2xvciBpcyByZXR1cm5lZC5cbiAgKlxuICAqIE5vdGVzOlxuICAqIDEuIFRoaXMgaXMgYmFzZWQgb24gcmVjdGFuZ3VsYXIgY29sbGlzaW9uIGRldGVjdGlvbi5cbiAgKiAyLiBUaGlzIGNvbXBhcmVzIGEgbmFpdmUgcmVjdGFuZ2xlLCBzbyBpZiB0aGUgc3ByaXRlIGlzIHJvdGF0ZWQgdG91Y2hpbmcgbWlnaHQgYmUgc2Vuc2VkIGVhcmx5IG9yIGxhdGUuXG4gICogMy4gVGhlIGJhY2tkcm9wIGltYWdlIG11c3QgYmUgYSBsb2NhbCBpbWFnZSBzZXJ2ZWQgZnJvbSBzYW1lIG9yaWdpbi5cbiAgKlxuICAqIEBleGFtcGxlXG4gICogbGV0IHN0YWdlID0gbmV3IGJsb2NrTGlrZS5TdGFnZSgpO1xuICAqIGxldCBzcHJpdGUgPSBuZXcgYmxvY2tMaWtlLlNwcml0ZSgpO1xuICAqXG4gICogc3ByaXRlLmFkZFRvKHN0YWdlKTtcbiAgKiBsZXQgbW92aW5nID0gdHJ1ZTtcbiAgKiBzcHJpdGUud2hlbkNsaWNrZWQoIGZ1bmN0aW9uKCkge1xuICAqICAgd2hpbGUobW92aW5nKXtcbiAgKiAgICAgdGhpcy5pc1RvdWNoaW5nQmFja2Ryb3BDb2xvcignI2ZmMDAwMCcpID8gbW92aW5nID0gZmFsc2UgOiBtb3ZpbmcgPSB0cnVlO1xuICAqICAgICB0aGlzLm1vdmUoNSk7XG4gICogICB9XG4gICogfSk7XG4gICpcbiAgKiBAcGFyYW0ge3N0cmluZ30gYmFja2Ryb3BDb2xvciAtIHRoZSBjb2xvciB0byBldmFsdWF0ZS5cbiAgKiBAcmV0dXJuIHtib29sZWFufSAtIGRvZXMgdGhlIHNwcml0ZSB0b3VjaCB0aGUgY29sb3IuXG4gICovXG4gIGlzVG91Y2hpbmdCYWNrZHJvcENvbG9yKGJhY2tkcm9wQ29sb3IpIHtcbiAgICBjb25zdCBoZXhBcnIgPSB0aGlzLnRvdWNoaW5nQmFja2Ryb3BDb2xvcihiYWNrZHJvcENvbG9yKTtcblxuICAgIHJldHVybiBoZXhBcnIuaW5jbHVkZXMoYmFja2Ryb3BDb2xvcik7XG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3Nwcml0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgdGhlIFVJIEVsZW1lbnRzIGF0dGFjaGVkIHRvIGEgc3ByaXRlLlxuICogRWFjaCBTcHJpdGUgbWF5IGhhdmUgb25lLlxuICogQHByaXZhdGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGV4dFVpRWxlbWVudCB7XG4gIC8qKlxuICAqIGNvbnN0cnVjdG9yIC0gQ3JlYXRlcyBhIHVpIGVsZW1lbnQgdGhhdCBcImF0dGFoY2VzXCIgdG8gYSBzcHJpdGUuXG4gICpcbiAgKiBAcGFyYW0ge29iamVjdH0gc3ByaXRlIC0gdGhlIHNwcml0ZSB0byB3aGljaCB0aGUgdWkgaXMgYXR0YWNoZWQuXG4gICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgLSB3aGF0IHVpIHRvIGNyZWF0ZSAoc2F5IGJ1YmJsZSwgdGhpbmsgYnViYmxlIG9yIGFzayBib3gpXG4gICogQHBhcmFtIHtzdHJpbmd9IHRleHQgLSAgd2hhdCB0aGUgdGV4dCBzYWlkL3Rob3VnaHQvYXNrIHdpbGwgYmUuXG4gICogQHBhcmFtIHtvYmplY3R9IGFza0lkIC0gdGhlIGFzayBib3ggaWRlbnRpZmllciAodXNlZCB0byBtYW5hZ2UgZXZlbnRzKS5cbiAgKi9cbiAgY29uc3RydWN0b3Ioc3ByaXRlLCB0eXBlLCB0ZXh0KSB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvKipcbiAgICAqIGFza0lucHV0IC0gZW5jYXBzdWxhdGUgdGhlIGZ1bmN0aW9uYWxpdHkgb2YgdGhlIGlucHV0IGZpZWxkIHVzZWQgdG8gY2FwdHVyZSB1c2VyIGlucHV0IHdpdGggYXNrKCkuXG4gICAgKlxuICAgICogQHJldHVybiB7b2JqZWN0fSAtIHRoZSBpbnB1dCBkb20gZWxlbWVudC5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFza0lucHV0KCkge1xuICAgICAgLyoqXG4gICAgICAqIHNlbmRBbnN3ZXIgLSBkaXNwYXRjaGVzIGFuIGV2ZW50IHdoZW4gdGhlIHVzZXIgaGFzIHN1Ym1pdHRlZCB0aGUgaW5wdXQuXG4gICAgICAqL1xuICAgICAgZnVuY3Rpb24gc2VuZEFuc3dlcih2YWx1ZSkge1xuICAgICAgICBjb25zdCBldmVudCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoYGJsb2NrTGlrZS5hc2suJHtzcHJpdGUuaWR9LiR7c3ByaXRlLmFza0lkfWAsIHsgZGV0YWlsOiB7IHZhbHVlLCBhc2tJZDogc3ByaXRlLmFza0lkIH0gfSk7XG4gICAgICAgIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICBpbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcbiAgICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgICBpbnB1dC52YWx1ZSA9ICcnO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGlucHV0KTtcblxuICAgICAgY29uc3Qgc3VibWl0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICBzdWJtaXQuaW5uZXJIVE1MID0gJyYjeDI3MTMnO1xuICAgICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBzZW5kQW5zd2VyKGlucHV0LnZhbHVlKTtcbiAgICAgICAgaW5wdXQudmFsdWUgPSAnJztcbiAgICAgIH0pO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoc3VibWl0KTtcblxuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IHRleHQudG9TdHJpbmcoKTtcbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuXG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHggY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHggPSBzcHJpdGUueCAtIChzcHJpdGUud2lkdGggLyAyKTtcbiAgICAvLyBDb252ZXJ0IHRoZSBjZW50ZXIgYmFzZWQgeSBjb29yZGluYXRlIHRvIGEgbGVmdCBiYXNlZCBvbmUuXG4gICAgY29uc3QgeSA9IChzcHJpdGUueSAqIC0xKSAtIChzcHJpdGUuaGVpZ2h0IC8gMik7XG5cbiAgICBlbC5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgZWwuaW5uZXJIVE1MID0gYCR7dGV4dH08YnIgLz5gO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBlbC5zdHlsZS56SW5kZXggPSBzcHJpdGUuejtcbiAgICBlbC5jbGFzc05hbWUgPSBgYmxvY2tsaWtlLSR7dHlwZX1gO1xuXG4gICAgbGV0IGllbCA9IG51bGw7XG4gICAgaWYgKHR5cGUgPT09ICdhc2snKSB7XG4gICAgICBpZWwgPSBhc2tJbnB1dChzcHJpdGUsIGVsKTtcbiAgICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDExMCAtIChNYXRoLmZsb29yKHRoaXMudGV4dC5sZW5ndGggLyAzMCkgKiAxNil9cHhgO1xuICAgIH1cblxuICAgIHNwcml0ZS5lbGVtZW50LmVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCBzcHJpdGUuZWxlbWVudC5lbCk7XG4gICAgaWVsID8gaWVsLmZvY3VzKCkgOiBudWxsO1xuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuXG4gICAgdGhpcy5lbCA9IGVsO1xuICB9XG5cbiAgLyoqXG4gICogdXBkYXRlIC0gdXBkYXRlZCB0aGUgRE9NIGVsZW1lbnQgKG1vdmVzIHdpdGggc3ByaXRlKS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgdXBkYXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIC8vIENvbnZlcnQgdGhlIGNlbnRlciBiYXNlZCB4IGNvb3JkaW5hdGUgdG8gYSBsZWZ0IGJhc2VkIG9uZS5cbiAgICBjb25zdCB4ID0gc3ByaXRlLnggLSAoc3ByaXRlLndpZHRoIC8gMik7XG4gICAgLy8gQ29udmVydCB0aGUgY2VudGVyIGJhc2VkIHkgY29vcmRpbmF0ZSB0byBhIGxlZnQgYmFzZWQgb25lLlxuICAgIGNvbnN0IHkgPSAoc3ByaXRlLnkgKiAtMSkgLSAoc3ByaXRlLmhlaWdodCAvIDIpO1xuXG4gICAgLy8gbG9va3NcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgbmljZXIuLi5cbiAgICBlbC5zdHlsZS5sZWZ0ID0gYCR7KHNwcml0ZS5zdGFnZVdpZHRoIC8gMikgKyB4ICsgKHNwcml0ZS53aWR0aCAqIDAuNil9cHhgO1xuICAgIGVsLnN0eWxlLnRvcCA9IGAkeygoc3ByaXRlLnN0YWdlSGVpZ2h0IC8gMikgKyB5KSAtIDgwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG5cbiAgICBpZiAoc3ByaXRlLnRleHR1aS50eXBlID09PSAnYXNrJykge1xuICAgICAgZWwuc3R5bGUudG9wID0gYCR7KChzcHJpdGUuc3RhZ2VIZWlnaHQgLyAyKSArIHkpIC0gMTEwIC0gKE1hdGguZmxvb3IodGhpcy50ZXh0Lmxlbmd0aCAvIDMwKSAqIDE2KX1weGA7XG4gICAgfVxuXG4gICAgZWwuc3R5bGUudmlzaWJpbGl0eSA9IGAkeyhzcHJpdGUuc2hvd2luZyA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nKX1gO1xuICB9XG5cbiAgLyoqXG4gICogZGVsZXRlIC0gZGVsZXRlcyB0aGUgRE9NIGVsZW1lbnQgKGhpZGVzIGl0KS5cbiAgKlxuICAqIEBwYXJhbSB7b2JqZWN0fSBzcHJpdGUgLSB0aGUgc3ByaXRlIHRvIHdoaWNoIHRoZSB1aSBpcyBhdHRhY2hlZC5cbiAgKi9cbiAgZGVsZXRlKHNwcml0ZSkge1xuICAgIGNvbnN0IGVsID0gc3ByaXRlLnRleHR1aS5lbDtcblxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy90ZXh0LXVpLWVsZW1lbnQuanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=