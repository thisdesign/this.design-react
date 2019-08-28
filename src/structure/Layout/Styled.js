import styled from 'styled-components/macro'

const View = styled.aside`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
  transition: ${props => props.theme.duration.standard}ms transform
    ${props => props.theme.ease.standard};
  will-change: transform;
`

View.Root = styled(View)`
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
  background: ${props => props.theme.colors.white};
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
  background: ${props => props.theme.colors.black};
  color: ${props => props.theme.colors.midGrey};
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
