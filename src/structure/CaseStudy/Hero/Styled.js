import styled from 'styled-components/macro'
import Wrap from 'components/Wrap'
import { headingStyles } from 'style/GlobalStyle'
import { mq } from 'style/theme'
import getAuxLayout from './getAuxLayout'

const HeroWrapper = styled(Wrap.Nav)`
  height: 100vh;
  padding-top: 8rem;
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
    z-index: 0;
  }
`

const Info = styled.div`
  position: relative;
  z-index: 30;
  transform: translate3d(0, 0, 0);
`

const InfoItem = styled.div`
  margin-bottom: 2rem;
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
  z-index: 20;

  ${props => getAuxLayout(props.layout)}
`

const MainItem = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
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
    line-height: ${props => props.theme.lineHeights.paragraph};
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
  InfoItem,
}
