import styled from 'styled-components/macro'
import Wrap from 'components/Wrap'
import ResponsiveImg from 'components/Img'

/*
Z-INDEX GUIDE:

  -10...COLOR BLEED
  0.....MAIN ITEM
  10....AUX ITEM
  20....INFO

*/

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
    height: 120%;
    background: ${props => props.bgColor};
    z-index: -1;
  }
`

const Info = styled.div`
  position: relative;
  z-index: 20;
`

const AuxItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${props => props.auxWidth}vw;
  z-index: 10;
`

const MainItem = styled.div`
  position: absolute;
  z-index: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Video = styled.video`
  width: 100%;
`

const Img = styled(ResponsiveImg)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  user-select: none;
`

export default { HeroWrapper, Video, AuxItem, Info, MainItem, Img }
