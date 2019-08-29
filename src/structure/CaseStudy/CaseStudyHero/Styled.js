import styled, { css } from 'styled-components/macro'
import Wrap from 'components/Wrap'
import { headingStyles } from 'style/GlobalStyle'
import { mq } from 'style/theme'

/*
Z-INDEX GUIDE:

  -10...COLOR BLEED
  0.....MAIN ITEM
  10....AUX ITEM
  20....INFO

*/

const getLayout = layout => {
  switch (layout) {
    case 'top-left':
      return css`
        top: 0;
        left: 0;
      `
    case 'top-center':
      return css`
        top: 0;
        left: 50%;
        transform: translateX(-50%);
      `
    case 'top-right':
      return css`
        top: 0;
        right: 0;
      `
    case 'middle-left':
      return css`
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      `
    case 'middle-center':
      return css`
        top: 50%;
        right: 50%;
        transform: translate3d(-50%, -50%);
      `
    case 'middle-right':
      return css`
        top: 50%;
        right: 0;
        transform: translateY(-50%);
      `
    case 'bottom-left':
      return css`
        bottom: 0;
        left: 0;
      `
    case 'bottom-center':
      return css`
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      `
    case 'bottom-right':
      return css`
        bottom: 0;
        right: 0;
      `
    default:
      return null
  }
}

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
  /* Hide at small size */
  display: none;
  @media ${mq.xs} {
    display: block;
  }

  position: absolute;

  /* CMS width */
  width: ${props => props.auxWidth}vw;
  z-index: 10;

  ${props => getLayout(props.layout)}
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
    ${headingStyles[3]}
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
