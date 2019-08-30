import modularScale from 'util/modularScale'

const scale = modularScale(1.2, { limit: 20, negatives: 2 })

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

const ease = {
  standard: 'cubic-bezier(0, 0, 0.2, 1)',
}

const duration = {
  standard: 500,
}

const margins = {
  standard: '1rem',
  navDesktop: '4rem',
  section: { md: '8rem' },
}

export default {
  colors,
  ease,
  duration,
  margins,
  fontSizes,
  fontFamilies,
}
