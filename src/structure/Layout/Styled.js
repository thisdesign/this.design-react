import styled from 'styled-components/macro'

const View = styled.aside`
  position: fixed;
  width: 100%;
  min-height: 100vh;
  top: 0;
  left: 0;
`

View.Root = styled(View)`
  background: tan;
  color: orange;
  z-index: 10;
`

View.Work = styled(View)`
  background: purple;
  color: orange;
  transform: translate3d(-50%, 0, 0);
`

View.About = styled(View)`
  background: green;
  color: orange;
  transform: translate3d(50%, 0, 0);
`

export default { View }
