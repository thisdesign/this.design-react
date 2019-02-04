import styled, { css } from 'styled-components';
import theme from 'styles/theme';

const Styled = {};

Styled.Homepage = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 40;
  overflow: hidden;

  ${props => props.animating && css`
    transition: transform ${theme.ease.standard} 600ms;
    transform: translate3d(0, calc(-100vh + 400px), 0);
  `}
`;

Styled.Inner = styled.div`
  height: calc(100vh - ${theme.margin.navMobile});
  width: calc(100vw - ${theme.margin.navMobile});
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  overflow: hidden;

  ${theme.media.tablet`
    height: calc(100vh - ${theme.margin.nav});
    width: calc(100vw - ${theme.margin.nav});
  `}
`;

Styled.Media = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

Styled.Image = styled.image(Styled.Media);
Styled.Video = styled.video(Styled.Media);

export default Styled;
