import React, { useContext } from 'react'
import { CaseStudyCtx } from 'structure/CaseStudy'
import { RichText } from 'prismic-reactjs'
import formatAlt from 'util/formatAlt'
import Styled from './Styled'

function useParsedData() {
  const { data } = useContext(CaseStudyCtx)
  const header = data.header[0]

  return {
    title: RichText.asText(header.title),
    bgColor: data.background_color,
    intro: RichText.asText(header.copy),
    mobileImage: header.mobileImage.url,
    mainImage: header.image1.url,
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
    mobileImage,
    auxImage,
    auxVideo,
    auxWidth,
    mainImage,
    services,
  } = useParsedData()

  return (
    <Styled.HeroWrapper bgColor={bgColor}>
      <Styled.Info>
        <h1>{title}</h1>
        <h2>{intro}</h2>
        {RichText.render(services)}
      </Styled.Info>
      <AuxItem />
      <Styled.MainItem image={mainImage} />
    </Styled.HeroWrapper>
  )
}

function AuxItem() {
  const { data } = useContext(CaseStudyCtx)

  const { auxImage, auxVideo, auxWidth } = useParsedData()
  return (
    <Styled.AuxItem auxWidth={auxWidth}>
      {auxVideo ? (
        <Styled.Video autoPlay muted>
          <source src={auxVideo} />
        </Styled.Video>
      ) : (
        <img src={auxImage} alt={formatAlt(data.title)} />
      )}
    </Styled.AuxItem>
  )
}
// CaseStudyHero.propTypes = {}

export default CaseStudyHero
