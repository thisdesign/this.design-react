import React from 'react'
import getImgIxUrl from 'util/getImgIxUrl'
import qs from 'util/qs'
import removeEmpty from 'util/removeEmpty'

export default function Img({
  src,
  alt,
  quality: q,
  format: fm,
  width: w,
  height: h,
  ...props
}) {
  const newUrl = getImgIxUrl(src)
  const possibleOptions = { w, fm, q, h }
  const declaredOptions = removeEmpty(possibleOptions)
  const queryString = qs(declaredOptions)
  const source = `${newUrl}?${queryString}`

  return (
    <img
      src={source}
      alt={alt}
      {...props}
      srcSet={`
        ${source}&dpr=1 1x,
        ${source}&dpr=2 2x,
        ${source}&dpr=3 3x,
      `}
    />
  )
}
