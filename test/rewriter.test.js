/* global describe, it */
/* eslint func-names: ["error", "as-needed"] */

import * as blockLike from '../src/lib';
import rewrite from '../src/rewriter';

const assert = require('assert');

describe('rewriter', () => {
  const sprite = new blockLike.Sprite();
  const otherSprite = new blockLike.Sprite();

  describe('function creation', () => {
    it('should create an async function', () => {
      const func = function () {
        this.say('I am a function');
      };

      const f = rewrite(func, sprite);
      assert(f.constructor.name === 'AsyncFunction');
    });

    it('should work with arrow function', () => {
      const func = () => {
        this.say('I am a function');
      };

      const f = rewrite(func, sprite);
      assert(f.constructor.name === 'AsyncFunction');
    });

    it('should detect and mainatin a single variable if passed', () => {
      let func;
      let f;

      func = (passedIn) => {
        sprite.say(passedIn);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('async function anonymous(passedIn') !== -1);

      func = (passedIn, anotherPassed) => { // eslint-disable-line no-unused-vars
        sprite.say(passedIn);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('async function anonymous(passedIn') !== -1);

      func = () => {
        sprite.say();
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('async function anonymous(') !== -1);
    });
  });

  describe('loop protection', () => {
    /* eslint-disable no-constant-condition, no-empty, for-direction */
    it('should add an error throw after any empty while statment', () => {
      let func;
      let f;

      func = function () {
        while (true) {}
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);

      func = function () {
        while (true) {

        }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);
    });

    it('should not add an error throw after non-empty while statment', () => {
      let func;
      let f;

      func = function () {
        while (true) { this.say('I run'); }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);

      func = function () {
        while (true) {
          this.say('I run');
        }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);
    });

    it('should add an error throw after any empty for statment', () => {
      let func;
      let f;

      func = function () {
        for (let i = 0; i > -1; i += 1) {}
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);

      func = function () {
        for (let i = 0; i > -1; i += 1) {

        }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);
    });

    it('should not add an error throw after non-empty for statment', () => {
      let func;
      let f;

      func = function () {
        for (let i = 0; i > -1; i += 1) { this.say('I run'); }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);

      func = function () {
        for (let i = 0; i > -1; i += 1) {
          this.say('I run');
        }
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);
    });

    it('should add an error throw after any empty do statment', () => {
      let func;
      let f;

      func = function () {
        do {} while (true);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);

      func = function () {
        do {

        } while (true);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') !== -1);
    });

    it('should not add an error throw after non-empty do statment', () => {
      let func;
      let f;

      func = function () {
        do { this.say('I run'); } while (true);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);

      func = function () {
        do {
          this.say('I run');
        } while (true);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('throw \'BlockLike.js Error: Empty loop detected\'') === -1);
    });

    /* eslint-enable no-constant-condition, no-empty, for-direction */
  });

  describe('paced methods', () => {
    it('should add a timed out await statment after goTo', () => {
      const func = function () {
        this.goTo(100, 100);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after move', () => {
      const func = function () {
        this.move(100);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after changeX', () => {
      const func = function () {
        this.changeX(100);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after changeY', () => {
      const func = function () {
        this.changeY(100);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after goTowards', () => {
      const func = function () {
        this.goTowards(otherSprite);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after turnRight', () => {
      const func = function () {
        this.turnRight(90);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after turnLeft', () => {
      const func = function () {
        this.turnLeft(90);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after pointInDirection', () => {
      const func = function () {
        this.pointInDirection(90);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after pointTowards', () => {
      const func = function () {
        this.pointTowards(otherSprite);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after say', () => {
      const func = function () {
        this.say('slow down');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should add a timed out await statment after think', () => {
      const func = function () {
        this.think('slow down');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 33))') !== -1);
    });

    it('should change pace based on entity settings', () => {
      sprite.pace = 16;

      const func = function () {
        this.pointTowards(otherSprite);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout(resolve, 16))') !== -1);
    });

    it('should not rewrite paced methods when pace is zero or null', () => {
      let func;
      let f;

      sprite.pace = 0;

      func = function () {
        this.pointTowards(otherSprite);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout') === -1);

      sprite.pace = null;

      func = function () {
        this.pointTowards(otherSprite);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('await new Promise(resolve => setTimeout') === -1);
      sprite.pace = 33;
    });
  });

  describe('waited methods', () => {
    it('should add a timed out await statment after wait', () => {
      let func;
      let f;
      let time;

      func = function () {
        this.wait(9);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);

      time = 9;
      func = function () {
        this.wait(time);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);

      time = 0.9;
      func = function () {
        this.wait(time * 10);
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify wait and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const time = 0.9;
      const func = function () {
        this.wait(time * 10);
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.wait(time * 10, \'just-random-string\')') !== -1);
    });

    it('should add a timed out await statment after glide', () => {
      const func = function () {
        this.glide(9, 100, 100);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify glide and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const func = function () {
        this.glide(9, 100, 100);
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.glide(9, 100, 100, \'just-random-string\')') !== -1);
    });

    it('should add a timed out await statment after sayWait', () => {
      const func = function () {
        this.sayWait('hello', 3);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify sayWait and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const func = function () {
        this.sayWait('hello', 3);
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.sayWait(\'hello\', 3, \'just-random-string\')') !== -1);
    });

    it('should add a timed out await statment after thinkWait', () => {
      const func = function () {
        this.thinkWait('hello', 3);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify thinkWait and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const func = function () {
        this.thinkWait('hello', 3);
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.thinkWait(\'hello\', 3, \'just-random-string\')') !== -1);
    });

    it('should add a timed out await statment after playSoundUntilDone', () => {
      const func = function () {
        this.playSoundUntilDone('../../sounds/bleat.wav');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify broadcastMessageWait and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const func = function () {
        this.playSoundUntilDone('../../sounds/bleat.wav');
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.playSoundUntilDone(\'../../sounds/bleat.wav\', \'just-random-string\')') !== -1);
    });
    it('should add a timed out await statment after broadcastMessageWait', () => {
      const func = function () {
        this.broadcastMessageWait('go');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify broadcastMessageWait and add triggeringId', () => {
      sprite.triggeringId = 'just-random-string';

      const func = function () {
        this.broadcastMessageWait('go');
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.broadcastMessageWait(\'go\', \'just-random-string\')') !== -1);
    });
  });

  describe('waitedReturned methods', () => {
    it('should add a timed out await statment after invoke', () => {
      let returned; // eslint-disable-line no-unused-vars
      function myFunc() { // eslint-disable-line require-jsdoc
        return 'yay';
      }

      const func = function () {
        returned = this.invoke(myFunc);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify invoke and add variable and triggeringId', () => {
      let func;
      let f;

      let returned; // eslint-disable-line no-unused-vars
      function myFunc(a, b, c) { // eslint-disable-line require-jsdoc, no-unused-vars
        return 'yay';
      }
      sprite.triggeringId = 'just-random-string';

      func = function () {
        this.invoke(myFunc);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.invoke(myFunc, [], \'\', \'just-random-string\')') !== -1);

      func = function () {
        returned = this.invoke(myFunc);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.invoke(myFunc, [], \'returned\', \'just-random-string\')') !== -1);

      func = function () {
        returned = this.invoke(myFunc, [1, 2, 3]);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.invoke(myFunc, [1, 2, 3], \'returned\', \'just-random-string\')') !== -1);

      func = function () {
        returned = this.invoke(myFunc, 'value');
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('this.invoke(myFunc, \'value\', \'returned\', \'just-random-string\')') !== -1);
    });

    it('should add a timed out await statment after ask', () => {
      let answer; // eslint-disable-line no-unused-vars

      const func = function () {
        answer = this.ask('How are you');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('document.addEventListener(\'blockLike.waited') !== -1);
    });
    it('should modify ask and add variable and triggeringId', () => {
      let returned; // eslint-disable-line no-unused-vars

      sprite.triggeringId = 'just-random-string';

      const func = function () {
        returned = this.ask('How are you?');
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('ask(\'How are you?\', \'returned\', \'just-random-string\')') !== -1);
    });
  });

  describe('evented methods', () => {
    it('should not rewrite whenLoaded inside function', () => {
      const func = function () {
        this.whenLoaded(function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenLoaded inside function', () => {
      const func = function () {
        this.whenFlag(function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenClicked inside function', () => {
      const func = function () {
        this.whenClicked(function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenKeyPressed inside function', () => {
      const func = function () {
        this.whenKeyPressed(function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenEvent inside function', () => {
      const func = function () {
        this.whenEvent('mouseover', function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenReceiveMessage inside function', () => {
      const func = function () {
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should not rewrite whenCloned inside function', () => {
      const func = function () {
        this.whenCloned(function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
      };
      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should rewrite before and after evented', () => {
      const func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          this.say('inside', 1);
        });
        this.say('after');
      };
      const f = rewrite(func, sprite);
      const lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[6].indexOf('await') === -1);
      assert(lines[8].indexOf('await') !== -1);
    });

    it('should be forgiving for method closing format', () => {
      const func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          this.say('inside', 1);
        },
        /*eslint-disable */
        );
        /* eslint-enable */
        this.say('after');
      };
      const f = rewrite(func, sprite);
      const lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[6].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);
    });

    it('should not be influenced by strings', () => {
      let func;
      let f;
      let lines;

      func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          const j = 'junk (';
          this.say(j, 1);
        });
        this.say('after');
      };
      f = rewrite(func, sprite);
      lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[7].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);

      func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          const j = 'junk )';
          this.say(j, 1);
        });
        this.say('after');
      };
      f = rewrite(func, sprite);
      lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[7].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);

      func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          const j = 'junk "(" (';
          this.say(j, 1);
        });
        this.say('after');
      };
      f = rewrite(func, sprite);
      lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[7].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);

      func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          const j = 'junk ") ()';
          this.say(j, 1);
        });
        this.say('after');
      };
      f = rewrite(func, sprite);
      lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[7].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);

      const x = `
        x\n
        xx
      `;
      func = function () {
        this.say('before');
        this.whenReceiveMessage('go fish', function () { // eslint-disable-line func-names
          const j = `junk ")${x} ()`;
          this.say(j, 1);
        });
        this.say('after');
      };
      f = rewrite(func, sprite);
      lines = f.toString().split('\n');
      assert(lines[3].indexOf('await') !== -1);
      assert(lines[7].indexOf('await') === -1);
      assert(lines[9].indexOf('await') !== -1);
    });
  });

  /* eslint-disable */
  describe('adding async in function body', () => {
    it('should add async to named functions', () => {
      let func;
      let f;

      func = function () {
        function named() {
          this.wait(1);
        }
        this.wait(9);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('async function named() {') !== -1);

      func = function () {
        function  named (){ // multi space
          this.wait(1);
        }
        this.wait(9);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf('async function  named (){') !== -1);

      func = function () {
        function	named (){ // tab
          this.wait(1);
        }
        this.wait(9);
      };
      f = rewrite(func, sprite);
      assert(f.toString().indexOf( 'async function	named (){') !== -1); // tab

    });

    it('should add async to anonymous functions', () => {
      let func;
      let f;

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach(function(item) {
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach(async function(item) {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach(function  (item) {  // multi space
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach(async function  (item) {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach(function	(item) {  // tab
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf( 'arr.forEach(async function	(item) {') !== -1); // tab

    });

    it('should add async to arrow functions', () => {
      let func;
      let f;

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach( (item) => { // spaced
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach( async (item) => {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach((item) => { // no space before paren
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach(async (item) => {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach((item) =>{ // no space before curly
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach(async (item) =>{') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach((item)=> { // no space before arrow
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach(async (item)=> {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach( (item, index) => { // multiple params
          item.wait(index);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach( async (item, index) => {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach( (item, index)=> { // multiple params no space before arrow
          item.wait(index);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach( async (item, index)=> {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach( ( item, index )=> { // space in paran
          item.wait(index);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach( async ( item, index )=> {') !== -1);

      func = function (){
        let arr = ['a', 'b', 'c'];
        arr.forEach( item => { // no paren
          item.wait(9);
        })
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.forEach( async item => {') !== -1);

      func = function (){
        let arr = [1, 2, 3];
        const mult = arr.map(item => item * 2) // one line returner
      };

      f = rewrite(func, sprite);
      assert(f.toString().indexOf('arr.map(async item => item * 2)') !== -1);
    });

  });
  /* eslint-enable */

  describe('ignoring user created string in code', () => {
    it('should skip (and not rewrite) any string with paced method name', () => {
      const func = function () {
        const pacedMethodStrings = [
          'this.goTo(5, 10)',
          'this.move(5)',
          'this.changeX(5)',
          'this.changeY(10)',
          'this.setX(5)',
          'this.setY(10)',
          'this.goTowards(sprite)',
          'this.turnRight(90)',
          'this.turnLeft(90)',
          'this.pointInDirection(90)',
          'this.pointTowards(sprite)',
          'this.changeSize(10)',
          'this.setSize(110)',
          'this.say("hi")',
          'this.think(`wow`)',
          'this.refresh()',
        ];
        pacedMethodStrings.pop();
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should skip (and not rewrite) any string with waited method name', () => {
      const func = function () {
        const waitedMethodStrings = [
          'this.wait(5)',
          'glide(5, 10, 20)',
          'sayWait("hi", 5)',
          'thinkWait(`wow`, 10)',
          'playSoundUntilDone(`../../sounds/bleat.wav`)',
          'broadcastMessageWait("move")',
        ];
        waitedMethodStrings.pop();
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should skip (and not rewrite) any string with waited returned method name', () => {
      const func = function () {
        const waitedReturnedMethodStrings = [
          'this.invoke(func, [arg, anotherArg])',
          'this.answer = ask("how doin?")',
        ];
        waitedReturnedMethodStrings.pop();
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should skip (and not rewrite) strings regardless of the way user created them', () => {
      const value = 10;
      const func = function () {
        const exampleStrings = [
          'this.wait(5)',
          'this.wait(5)',
          'this.wait(5)',
          `this.wait(${value})`,
          'this.say("yay")',
          'this.say(\'yay\')',
          'this.say(\'yay\')',
        ];
        exampleStrings.pop();
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') === -1);
    });

    it('should skip (and not rewrite) strings while rewriting for methods on same line', () => {
      const func = function () {
        this.say('this.say(\'yay\')');
      };

      const f = rewrite(func, sprite);
      assert(f.toString().indexOf('await') !== -1);
    });

    it('should skip (and not rewrite) strings with anonymous function() in them', () => {
      const func = function () {
        const x = 'function()';
        this.say(x);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().split('\n').slice(1, -1).indexOf('async') === -1);
    });

    it('should skip (and not rewrite) strings with name function() in them', () => {
      const func = function () {
        const x = 'function name()';
        this.say(x);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().split('\n').slice(1, -1).indexOf('async') === -1);
    });

    it('should skip (and not rewrite) strings with fat arrow function in them in them', () => {
      const func = function () {
        const a = '(a => b)';
        const b = '((a) => b)';
        const c = '((c) => {return `yay`})';
        const d = '((d1, d2) => {return \'wow\'})';
        this.say(`${a} ${b} ${c} ${d}`);
      };

      const f = rewrite(func, sprite);
      assert(f.toString().split('\n').slice(1, -1).indexOf('async') === -1);
    });
  });
});
