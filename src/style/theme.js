import modularScale from 'util/modularScale'

const scale = modularScale(1.2, { limit: 20, negatives: 3 })

const fontSizes = scale.map(item => `${item}rem`)

const fontFamilies = {
  sansSerif: 'Calibre, arial, sans-serif',
  serif: 'Domaine, times, "times new roman", serif',
}

const colors = {
  text: '#111111',
  csBackground: '#f9f9f9',
  black: '#000000',
  white: '#ffffff',
  midGrey: '#7d7d7d',
}

export const sizes = {
  xl: 1900,
  lg: 1440,
  md: 1024,
  sm: 768,
  xs: 576,
}

export const mq = Object.keys(sizes).reduce(
  (acc, current) => ({
    ...acc,
    [current]: `(min-width: ${sizes[current]}px)`,
  }),
  {}
)

const lineHeights = {
  paragraph: 1.7,
  heading: 1.2,
  headingLg: 1.4,
}
const ease = {
  standard: 'cubic-bezier(0, 0, 0.2, 1)',
}

const duration = {
  standard: 500,
}

const margins = {
  standard: '1rem',
  navDesktop: '4rem',
  section: { md: '4rem' },
}

const routeTransition = {
  duration: duration.standard + 4000,
}

export default {
  colors,
  ease,
  duration,
  lineHeights,
  margins,
  fontSizes,
  fontFamilies,
  routeTransition,
}
