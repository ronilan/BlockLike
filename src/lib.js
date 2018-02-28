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

import * as styles from './document-css';
import platforms from './platforms';

import Stage from './stage'; // eslint-disable-line no-unused-vars
import Backdrop from './backdrop'; // eslint-disable-line no-unused-vars
import Sprite from './sprite'; // eslint-disable-line no-unused-vars
import Costume from './costume'; // eslint-disable-line no-unused-vars

export { Stage };
export { Backdrop };
export { Sprite };
export { Costume };

(function init() {
  const style = document.createElement('style');

  style.type = 'text/css';
  style.innerHTML = `
    ${styles.defaultCSS}\n\n 
    ${styles.uiCSS}\n\n 
    ${styles.thinkCSS}\n\n 
    ${styles.sayCSS} \n\n 
    ${styles.askCSS}`;

  document.getElementsByTagName('head')[0].appendChild(style);

  platforms();
}());
