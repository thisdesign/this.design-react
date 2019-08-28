import styled from 'styled-components/macro'
import Wrap from 'components/Wrap'

const HeroWrapper = styled(Wrap.Nav)`
  height: 100vh;
  padding-top: 10rem;
  position: relative;
  color: ${props => props.theme.colors.white};

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    background: ${props => props.bgColor};
    z-index: -1;
  }
`

const Info = styled.div`
  position: relative;
  z-index: 30;
`

const BackgroundMedia = styled.div``

const AuxItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.auxWidth}vw;
`

const MainItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center center;
`

const Video = styled.video`
  width: 100%;
`

export default { HeroWrapper, Video, BackgroundMedia, AuxItem, Info, MainItem }
