import round from './round'

const modularScale = (ratio = 1.2, options) => {
  const limit = options.limit || 10
  const negatives = options.negatives || 0

  // prettier-ignore
  const startNum = Array.from({ length: negatives })
    .reduce(acc => acc / ratio, 1)

  // prettier-ignore
  const scale = Array.from({ length: limit })
    .reduce((acc, cur, i) =>
      [...acc, i > 0 ? acc[i - 1] * ratio : startNum], [])
    .map(val => round(val, 2))

  return scale
}

export default modularScale
