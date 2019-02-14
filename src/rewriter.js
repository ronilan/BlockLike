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
  return entity.pace && isPaced(item, entity) ? code : item;
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
    regExp = /([a-zA-Z]\w*|\(\s*?[a-zA-Z]\w*(,\s*[a-zA-Z]\w*)*\s*?\))\s*?=>/;
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
export default function rewrite(func, entity) {
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
