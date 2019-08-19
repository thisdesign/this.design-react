import styled from 'styled-components/macro'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;
  margin: -0.5em;
`

const ASPECT = 66.67

const Item = styled.div`
  background: url(${props => props.imageUrl});
  background-size: cover;
  background-position: 50% 50%;
  grid-column: ${props => props.theme.large && 'auto / span 2'};
  padding-top: ${props => (props.theme.large ? ASPECT : ASPECT * 2)}%;
  position: relative;
  height: 0;
  margin: 0.5em;

  img {
    width: 100%;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background: rgba(0, 0, 0, 0.75);
  padding: 2rem;

  box-sizing: border-box;

  display: grid;
  justify-content: center;
  align-items: center;
  height: 100%;

  opacity: ${props => (props.theme.hovered ? 1 : 0)};
  transition: 300ms opacity ${props => props.theme.ease.standard};
`

const TextWrap = styled.div`
  width: ${props => (props.theme.large ? 50 : 100)}%;
  margin: 0 auto;

  transform: translateY(${props => (props.theme.hovered ? 0 : 0.5)}em);
  transition: 300ms transform ${props => props.theme.ease.standard};
`

export default { Wrapper, Item, Overlay, TextWrap }
