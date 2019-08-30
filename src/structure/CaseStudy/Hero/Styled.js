import styled from 'styled-components/macro'
import Wrap from 'components/Wrap'
import { headingStyles } from 'style/GlobalStyle'
import { mq } from 'style/theme'
import getAuxLayout from './getAuxLayout'

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
  /*
   Videos cover up sometimes.
   Think this fixes it
 */
  position: absolute;
  z-index: 20;
`

const AuxItem = styled.div`
  /* Hide at small size */
  display: none;
  @media ${mq.xs} {
    display: block;
  }

  position: absolute;

  /* CMS width */
  width: ${props => (props.auxWidth ? `${props.auxWidth}vw` : 'auto')};
  z-index: 10;

  ${props => getAuxLayout(props.layout)}
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

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center center;
  user-select: none;
`

const ServicesWraper = styled.div`
  li {
    ${headingStyles[4]}
  }
`

export default {
  HeroWrapper,
  Video,
  AuxItem,
  Info,
  MainItem,
  Img,
  ServicesWraper,
}
