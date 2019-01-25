import styled, { css } from 'styled-components';

const Styled = {};

Styled.Cover = styled.div`
  height: 100vh;
  width: 100%;
  position: relative;
  color: white;
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
`;

const Item = styled.div`
  margin-bottom: 3.5vh;
  transition:
    opacity 600ms ${({ theme }) => theme.ease.standard},
    transform 600ms ${({ theme }) => theme.ease.standard};

  ${({ itemTitle, next, isAnimating }) => {
    if (!itemTitle && next) {
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
  z-index: 10;
`;


export default Styled;
