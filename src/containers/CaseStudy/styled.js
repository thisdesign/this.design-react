import styled, { css, keyframes } from 'styled-components/macro';

const Styled = {};

const slideUp = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, -100vh, 0); }
`;

const slideUpHome = keyframes`
  from { transform: translate3d(0, 0, 0); }
  to { transform: translate3d(0, calc(-100vh + 400px), 0); }
`;

Styled.CaseStudy = styled.article`
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: 30;
  position: relative;
  overflow: auto;
  transform: translate3d(0, 0, 0);

  ${({ isHome, isAnimating }) => isHome && css`
    height: ${isAnimating ? '100vh' : '400px'};
    overflow: hidden;
  `}

  ${({ next }) => next && css`
    z-index: 10;
    pointer-events: none;
    position: fixed;
  `}

  ${({ isAnimating, next, isHome }) => (isAnimating && !next) && css`
    animation: ${({ theme }) => {
    const time = theme.timing.csTransition;
    const ease = theme.ease.standard;
    const animName = isHome ? slideUpHome : slideUp;
    return css`${time}ms ${animName} ${ease}`;
  }};
  `}
`;

Styled.Inner = styled.div`
  color: ${({ textColor }) => textColor};
  background-color: ${({ background, theme }) => (background || theme.color.caseStudyBg)};
  transform: translateZ(0);
  position: relative;
  padding-bottom: ${({ theme }) => theme.margin.lg};
`;

Styled.Shim = styled.div`
  position: ${props => (props.home ? 'fixed' : 'relative')};
  top: 0;
  left: 0;
  display: block;
  height: 400px;
  width: 100%;
  z-index: 100;
  cursor: pointer;
`;

export default Styled;
