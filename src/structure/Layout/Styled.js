import styled from 'styled-components/macro'

const View = styled.aside`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  transition: 500ms transform ease-out;
  will-change: transform;
  opacity: 0.5;
`

View.Root = styled(View)`
  background: tan;
  color: orange;
  z-index: 10;
  transform: translate3d(
    ${props => {
      switch (props.theme.view) {
        case 'about':
          return -100
        case 'work':
          return 100
        default:
          return 0
      }
    }}%,
    0,
    0
  );
`

View.Work = styled(View)`
  background: purple;
  color: orange;
  transform: translate3d(
    ${props => {
      switch (props.theme.view) {
        case 'about':
          return -100
        case 'work':
          return 0
        default:
          return -50
      }
    }}%,
    0,
    0
  );
`

View.About = styled(View)`
  background: green;
  color: orange;
  transform: translate3d(
    ${props => {
      switch (props.theme.view) {
        case 'about':
          return 0
        case 'work':
          return 100
        default:
          return 50
      }
    }}%,
    0,
    0
  );
`

export default { View }
