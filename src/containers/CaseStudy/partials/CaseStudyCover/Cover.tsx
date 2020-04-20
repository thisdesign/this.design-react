import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import isMobile from 'util/isMobile'
import Styled from './styled'
import { CsContext } from '../../CaseStudy'

const mobile = isMobile()

const Cover = () => {
  const { header, next, csTransitioning, isHome } = useContext(CsContext)

  return (
    <Styled.Cover>
      <Styled.Fill backgroundColor={header.backgroundColor} />
      <Styled.Header>
        <Styled.Title itemTitle {...{ csTransitioning, next }} className="h2">
          {header.title}
        </Styled.Title>
        <Styled.Desc {...{ next, isHome }}>{header.description}</Styled.Desc>
        <Styled.Services {...{ next, isHome }}>
          {header.services}
        </Styled.Services>
      </Styled.Header>
      <Splash />
    </Styled.Cover>
  )
}

const Splash = () => {
  const { header } = useContext(CsContext)
  const { videoUrl, imageUrl, mobileImage } = header.background

  if (!mobile) {
    return (
      <Styled.Splash image={!videoUrl && imageUrl}>
        {videoUrl && <Video src={videoUrl} />}
        <AuxiliaryItem />
      </Styled.Splash>
    )
  }
  return <Styled.Splash image={mobileImage} />
}

const AuxiliaryItem = () => {
  const { header, alt } = useContext(CsContext)
  const { width, videoUrl, position, imageUrl } = header.auxItem
  return (
    <Styled.AuxWrapper
      width={width}
      position={position}
      data-name="Aux Item Container"
    >
      {imageUrl && <Styled.AuxImg src={imageUrl} alt={alt} />}
      {videoUrl && <Video src={videoUrl} />}
    </Styled.AuxWrapper>
  )
}

interface VideoProps {
  src: string
}

const Video: React.FC<VideoProps> = ({ src }) =>
  src ? (
    <Styled.Video autoPlay muted loop playsinline>
      <source src={src} />
    </Styled.Video>
  ) : null

Video.defaultProps = {
  src: null,
}

Video.propTypes = {
  src: PropTypes.string,
}

export default React.memo(Cover)
