/**
* Encapsulates the stage sensing functionality.
*/

/**
* enable - Enables sensing of document level events (keydown, mousemove, mousedown, touchmove)
*/
export default function enable(stage) {
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
