import styled, { css } from 'styled-components/macro';
import _setPositionStyles from '../../util/_setPositionStyles';

const Styled = {};

Styled.Cover = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  color: white;
  z-index: 0;
`;

Styled.Fill = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor || '#161616'};
  height: calc(100vh + 30vw);
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 10;
`;

Styled.Header = styled.div`
  ${css(({ theme }) => theme._wrapNav)}
  position: absolute;
  left: 0;
  padding-top: 160px;
  top: 0;
  z-index: 40;
  max-width: 15em;
`;

const Item = styled.div`
  margin-bottom: 3.5vh;
  transition:
    opacity 600ms ${({ theme }) => theme.ease.standard},
    transform 600ms ${({ theme }) => theme.ease.standard};

  ${({
    itemTitle, next, isAnimating, isHome,
  }) => {
    if ((!itemTitle && next) || isHome) {
      return css`opacity: 0`;
    } if (itemTitle && next && !isAnimating) {
      return css`transform: translateY(calc(100vh - 400px))`;
    }
    return null;
  }}
`;

Styled.Title = styled(Item)`
`;

Styled.Desc = styled(Item)`
`;

Styled.Services = styled(Item)`
  ${css(({ theme }) => theme._h3)}
`;

Styled.Splash = styled.div`
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  background-image: ${({ image }) => image && `url(${image})`} ;
  background-size: cover;
  background-position: center center;
  z-index: 10;
`;

Styled.Video = styled.video`
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
  z-index: 0;
`;

Styled.AuxWrapper = styled.div`
  position: absolute;
  width: auto;
  max-width: 100%;
  z-index: 10;
  width: ${props => props.width}vw;
  ${({ position }) => _setPositionStyles(position)};
`;

Styled.AuxImg = styled.img`
  width: 100%;
`;

export default Styled;
