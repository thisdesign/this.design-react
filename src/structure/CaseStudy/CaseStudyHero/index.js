import React, { useContext } from 'react'
import { CaseStudyCtx } from 'structure/CaseStudy'
import { RichText } from 'prismic-reactjs'
import formatAlt from 'util/formatAlt'
import { sizes } from 'style/theme'
import Heading from 'components/Heading'
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

const CaseStudyHero = () => {
  const {
    title,
    bgColor,
    intro,
    mainImage,
    services,
    mobileImage,
    mainVideo,
  } = useParsedData()

  return (
    <Styled.HeroWrapper bgColor={bgColor}>
      <Styled.Info>
        <Heading as="h1" headingStyle={0}>
          {title}
        </Heading>
        <Heading as="h2" headingStyle={2}>
          {intro}
        </Heading>
        <Styled.ServicesWraper>
          {RichText.render(services)}
        </Styled.ServicesWraper>
      </Styled.Info>
      <AuxItem />
      <Styled.MainItem>
        <Styled.Img
          src={mainImage}
          sizes={['xs', 'sm', 'md', 'lg', 'xl']}
          width={sizes.sm}
          density={1.5}
          quality={70}
        />
        <Video src={mainVideo} />
      </Styled.MainItem>
    </Styled.HeroWrapper>
  )
}

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
