import { css }                  from  'styled-components'
import { _ as __ } 							from  'lodash'
// ----helpers----------------------
// ----collections------------------
// ----components-------------------

// ====================================================================
// these sizes are arbitrary and you can set them to whatever you wish
const pixelSizes = {
  isMobileMedium:  360,
  isMobileLarge:   736,
  isTablet:        980,
  isDesktopSmall: 1280,
  isDesktopLarge: 1690
}

// iterate through the sizes and create a media template
const psArray = __.toPairs(pixelSizes)
const breakpoints = {}
__.forEach(psArray, (pair, index) => {
  const key = pair[0]
  const value = pair[1]
  const emSize = value / 16
  breakpoints[key] = (...args) => {
    return index===0 
      ? css`@media (max-width: ${emSize}em) {
          ${css(...args)}
        }`
      : css`@media (min-width: ${emSize}em) {
          ${css(...args)}
        }`
  }
})
// ====================================================================

export default breakpoints
export { pixelSizes }