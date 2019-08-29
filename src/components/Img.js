import React from 'react'
import getImgIxUrl from 'util/getImgIxUrl'
import qs from 'util/qs'
import removeEmpty from 'util/removeEmpty'
import { mq } from 'style/theme'

function ImgIxProvider({
  tagName,
  src,
  alt,
  quality: q,
  format: fm,
  width: w,
  height: h,
  ...props
}) {
  const CustomTag = tagName

  const newUrl = getImgIxUrl(src)
  const possibleOptions = { w, fm, q, h }
  const declaredOptions = removeEmpty(possibleOptions)
  const queryString = qs(declaredOptions)
  const source = `${newUrl}?${queryString}`

  return (
    <CustomTag
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

export default function Img({ ...props }) {
  return <ImgIxProvider tagName="img" {...props} />
}

export function Source({ size, webP, format, jpeg200, ...props }) {
  const media = size ? mq[size] : `(min-width: 0px)`
  return (
    <>
      {jpeg200 && (
        <ImgIxProvider
          {...{ media }}
          tagName="source"
          format="webp"
          {...props}
        />
      )}
      {webP && (
        <ImgIxProvider
          {...{ media }}
          tagName="source"
          format="webp"
          {...props}
        />
      )}
      <ImgIxProvider
        {...{ media }}
        tagName="source"
        format={format}
        {...props}
      />
    </>
  )
}
