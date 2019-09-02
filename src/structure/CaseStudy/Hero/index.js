import React, { useContext, createContext } from 'react'
import useCsData from 'structure/CaseStudy/hooks/useCsData'
import { RichText } from 'prismic-reactjs'
import formatAlt from 'util/formatAlt'
import { sizes } from 'style/theme'
import Heading from 'components/Heading'
import Styled from './Styled'

function parseCSHeaderData(data) {
  const header = data.data.header[0]

  return {
    title: RichText.asText(header.title),
    bgColor: data.data.color,
    preloadColor: header.background_color,
    intro: RichText.asText(header.copy),
    mobileImage: header.mobileImage.url,
    mainImage: header.image1.url,
    mainVideo: header.video1.url,
    auxWidth: header.floating_media_width,
    auxVideo: header.video2.url,
    auxImage: header.image2.url,
    auxLayout: header.layout2,
    services: header.services,
  }
}

const HeroCtx = createContext()
const Hero = ({ uid }) => {
  const heroDataRaw = useCsData(uid)
  const heroDataParsed = parseCSHeaderData(heroDataRaw)

  return (
    <HeroCtx.Provider value={heroDataParsed}>
      <Styled.HeroWrapper bgColor={heroDataParsed.bgColor}>
        <Info />
        <AuxItem />
        <Background />
      </Styled.HeroWrapper>
    </HeroCtx.Provider>
  )
}

function Info() {
  const { title, intro, services } = useContext(HeroCtx)
  return (
    <Styled.Info>
      <Styled.InfoItem>
        <Heading as="h1" headingStyle={0}>
          {title}
        </Heading>
      </Styled.InfoItem>
      <Styled.InfoItem>
        <Heading as="h2" headingStyle={3}>
          {intro}
        </Heading>
      </Styled.InfoItem>
      <Styled.InfoItem>
        <Styled.ServicesWraper>
          {RichText.render(services)}
        </Styled.ServicesWraper>
      </Styled.InfoItem>
    </Styled.Info>
  )
}

function Background() {
  const { mainImage, mobileImage, mainVideo, title } = useContext(HeroCtx)
  const hasBackground = !!(mobileImage || mainVideo)

  if (hasBackground) {
    return (
      <Styled.MainItem>
        {mainVideo ? (
          <Video src={mainVideo} />
        ) : (
          <picture>
            <source srcSet={mobileImage} media={`(max-width: ${sizes.xs}px)`} />
            <Styled.Img src={mainImage} alt={formatAlt(title)} />
          </picture>
        )}
      </Styled.MainItem>
    )
  }
  return null
}

function AuxItem() {
  const { auxImage, auxVideo, auxWidth, auxLayout, title } = useContext(HeroCtx)
  const hasAux = auxVideo || auxImage

  if (hasAux) {
    return (
      <Styled.AuxItem auxWidth={auxWidth} layout={auxLayout}>
        {auxVideo ? (
          <Video src={auxVideo} />
        ) : (
          <img src={auxImage} alt={formatAlt(title)} />
        )}
      </Styled.AuxItem>
    )
  }
  return null
}

function Video({ src }) {
  return (
    <Styled.Video autoPlay muted="muted" playsInline loop>
      <source src={src} />
    </Styled.Video>
  )
}

export default Hero
