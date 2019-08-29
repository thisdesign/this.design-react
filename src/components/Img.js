import React from 'react'
import getImgIxUrl from 'util/getImgIxUrl'
import qs from 'util/qs'
import removeEmpty from 'util/removeEmpty'
import { sizes as themeSizes } from 'style/theme'

export default function Img({
  src: rawSrc,
  alt,
  quality: q,
  format: fm,
  width: w,
  density: dpr,
  sizes,
  ...props
}) {
  const imgBaseUrl = getImgIxUrl(rawSrc)
  const constantProps = qs(removeEmpty({ q, dpr }))

  const baseSrc = `${imgBaseUrl}?${constantProps}`

  const format = fm ? qs({ fm }) : ''
  const width = w ? qs({ w }) : ''

  const fallBackSrc = `${baseSrc}&${format}&${width}`

  const getSrcSet = declaredFmt =>
    sizes
      ? sizes
          .map(size => {
            const curSize = themeSizes[size]
            const options = qs({
              w: curSize,
              ...(declaredFmt && { fm: declaredFmt }),
            })
            return `${baseSrc}&${options} ${curSize}w`
          })
          .join(', ')
      : `${baseSrc}&fm=${declaredFmt}&w=${w}`

  return (
    <picture>
      <source type="image/webp" srcSet={getSrcSet('webp')} />
      <source type="image/jpeg2000" srcSet={getSrcSet('jpg2')} />
      <img src={fallBackSrc} srcSet={getSrcSet(fm)} alt={alt} {...props} />
    </picture>
  )
}

Img.defaultProps = {
  density: 2,
}
