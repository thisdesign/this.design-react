import styled from 'styled-components/macro'

const Shim = styled.div`
  width: 100%;
  height: 400px;
`

const ColorBg = styled.div`
  background: ${props =>
    props.theme.bgColor || props.theme.colors.csBackground};
  color: ${props => props.theme.textColor || 'inherit'};
  padding-bottom: 1px;
  transition: ${props => props.theme.csTransition.duration}ms transform
    ${props => props.theme.csTransition.ease};
  transform: translate3d(
    0,
    ${props =>
      !props.theme.isNext && props.theme.transitioningNext
        ? 'calc(-100vh + 400px)'
        : '0'},
    0
  );
  will-change: transform;
`
export default { Shim, ColorBg }
