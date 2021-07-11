/**
* Encapsulates the functionality of managing element style properties for the entities.
*/

/**
* apply - apply cssRules of an entity to its DOM element.
*
* @param {function} entity - a Sprite or Stage.
*/
export function apply (entity) {
  const curEntity = entity
  // Sprites have Costumes, Stage has Backdrop, figure out which entity it is.
  const curLook = entity.backdrop || entity.costume
  const curLooks = entity.backdrops || entity.costumes

  const el = entity.element.el

  // remove any style applied by any look
  if (curLooks) {
    curLooks.forEach((b) => {
      b.cssRules.forEach((item) => {
        const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
        el.style[camelCased] = ''
      })
    })
  }

  // add current look styles
  if (curLook) {
    curLook.cssRules.forEach((item) => {
      const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      el.style[camelCased] = item.value
    })
  }

  // Add curEntity styles. Must be done after look styles.
  curEntity.cssRules.forEach((item) => {
    const camelCased = item.prop.replace(/-([a-z])/g, (g) => g[1].toUpperCase())
    el.style[camelCased] = item.value
  })
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
export function register (prop, value, entity) {
  const curEntity = entity

  if (typeof prop === 'string' && typeof value === 'string') {
    const dashed = prop.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
    curEntity.cssRules.push({ prop: dashed, value })
  } else if (typeof prop === 'object' && !value) {
    Object.keys(prop).forEach((key) => {
      const dashed = key.replace(/([A-Z])/g, ($1) => `-${$1.toLowerCase()}`)
      curEntity.cssRules.push({ prop: dashed, value: prop[key] })
    })
  }
}
