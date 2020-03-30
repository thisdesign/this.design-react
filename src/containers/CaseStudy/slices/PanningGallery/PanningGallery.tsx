import React, { useEffect, useRef } from 'react'
import { PrismicImage } from 'types/prismic'
import S from './PanningGallery.Styled'
import Flickity from 'flickity-imagesloaded'

type PanningGallery = {
  items: { image: PrismicImage }[]
}

const PanningGallery: React.FC<{ data: PanningGallery }> = ({ data }) => {
  const galleryRef = useRef()

  useEffect(() => {
    if (galleryRef.current) {
      const flkty = new Flickity(galleryRef.current, {
        imagesLoaded: true,
        wrapAround: true,
        prevNextButtons: false,
        pageDots: false,
      })
    }
  }, [])
  return (
    <S.Wrapper ref={galleryRef} className="flexy-carousel ">
      {data.items.map(
        item =>
          item.image.url && (
            <S.ImageWrapper>
              <img src={item.image.url} />
            </S.ImageWrapper>
          )
      )}
    </S.Wrapper>
  )
}

export default PanningGallery
