import styled, { keyframes } from 'styled-components/macro'

const spin = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`

const Words = styled.div`
  border: 1px solid blue;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);

  svg {
    fill: #fff;
    width: 60px;
    height: 60px;
    animation: ${spin} 7s linear infinite;
    position: relative;
    display: block;
    transform: scale(${props => (props.enabled ? 1 : 0.85)});
    opacity: ${props => (props.enabled ? 1 : 0)};
  }
`

export default { Words }
