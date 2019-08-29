import React, { useContext, memo } from 'react'
import { CaseStudyCtx } from 'structure/CaseStudy'
import { RichText } from 'prismic-reactjs'
import formatAlt from 'util/formatAlt'
import resizeImg from 'util/resizeImg'
import Styled from './Styled'

function useParsedData() {
  const { data } = useContext(CaseStudyCtx)
  const header = data.header[0]

  return {
    title: RichText.asText(header.title),
    bgColor: data.color,
    preloadColor: header.background_color,
    intro: RichText.asText(header.copy),
    mobileImage: header.mobileImage.url,
    mainImage: header.image1.url,
    mainVideo: header.video1.url,
    auxWidth: header.floating_media_width,
    auxVideo: header.video2.url,
    auxImage: header.image2.url,
    services: header.services,
  }
}

const CaseStudyHero = memo(() => {
  const {
    title,
    bgColor,
    intro,
    mainImage,
    services,
    mainVideo,
  } = useParsedData()

  const resizedMainImg = resizeImg(mainImage, {
    w: 1600,
    fm: 'jpeg',
    q: 75,
  })

  return (
    <Styled.HeroWrapper bgColor={bgColor}>
      <Styled.Info>
        <h1>{title}</h1>
        <h2>{intro}</h2>
        {RichText.render(services)}
      </Styled.Info>
      <AuxItem />
      <Styled.MainItem image={resizedMainImg}>
        <Video src={mainVideo} />
      </Styled.MainItem>
    </Styled.HeroWrapper>
  )
})

function AuxItem() {
  const { data } = useContext(CaseStudyCtx)
  const { auxImage, auxVideo, auxWidth } = useParsedData()
  const hasAux = auxVideo || auxImage

  if (hasAux) {
    return (
      <Styled.AuxItem auxWidth={auxWidth}>
        {auxVideo ? (
          <Video src={auxVideo} />
        ) : (
          <img src={auxImage} alt={formatAlt(data.title)} />
        )}
      </Styled.AuxItem>
    )
  }
  return null
}

function Video({ src }) {
  return (
    <Styled.Video autoPlay muted playsInline loop>
      <source src={src} />
    </Styled.Video>
  )
}
// CaseStudyHero.propTypes = {}

export default CaseStudyHero
