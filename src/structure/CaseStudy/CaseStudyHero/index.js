import React, { useContext } from 'react'
import { CaseStudyCtx } from 'structure/CaseStudy'
import { RichText } from 'prismic-reactjs'
import formatAlt from 'util/formatAlt'
import Styled from './Styled'

function useParsedData() {
  const { data } = useContext(CaseStudyCtx)
  const header = data.header[0]
  console.log(data)

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

function CaseStudyHero() {
  const {
    title,
    bgColor,
    intro,
    mainImage,
    services,
    mainVideo,
  } = useParsedData()

  return (
    <Styled.HeroWrapper bgColor={bgColor}>
      <Styled.Info>
        <h1>{title}</h1>
        <h2>{intro}</h2>
        {RichText.render(services)}
      </Styled.Info>
      <AuxItem />
      <Styled.MainItem image={mainImage}>
        <Video src={mainVideo} />
      </Styled.MainItem>
    </Styled.HeroWrapper>
  )
}

function AuxItem() {
  const { data } = useContext(CaseStudyCtx)

  const { auxImage, auxVideo, auxWidth } = useParsedData()
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

function Video({ src }) {
  return (
    <Styled.Video autoPlay muted playsInline loop>
      <source src={src} />
    </Styled.Video>
  )
}
// CaseStudyHero.propTypes = {}

export default CaseStudyHero
