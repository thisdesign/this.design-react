import React, { useContext } from 'react'
import { CaseStudyCtx } from 'structure/CaseStudy'
import { RichText } from 'prismic-reactjs'
import Styled from './Styled'

function useParsedData() {
  const { data } = useContext(CaseStudyCtx)
  const header = data.header[0]

  console.log(header)
  return {
    title: RichText.asText(header.title),
    bgColor: data.background_color,
    intro: RichText.asText(header.copy),
    mobileImage: header.mobileImage.url,
    mainImage: header.image1.url,
    auxWidth: header.floating_media_width,
    auxVideo: header.video2.url,
    auxImage: header.image2.url,
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
  } = useParsedData()

  return (
    <Styled.HeroWrapper bgColor={bgColor}>
      <Styled.Info>
        <h1>{title}</h1>
        <h2>{intro}</h2>
      </Styled.Info>
      <Styled.MainItem image={mainImage} />
      <Styled.AuxItem auxWidth={auxWidth}>
        <Styled.Video autoPlay muted>
          <source src={auxVideo} />
        </Styled.Video>
      </Styled.AuxItem>
    </Styled.HeroWrapper>
  )
}

// CaseStudyHero.propTypes = {}

export default CaseStudyHero
