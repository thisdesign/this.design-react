import styled from 'styled-components/macro'

const Wrap = styled.div`
  margin: 0px auto;
  width: 80%;
  max-width: 1500px;
`

Wrap.Nav = styled.div`
  padding: 0 ${props => props.theme.margins.navDesktop};
  padding-top: ${props => props.padTop && props.theme.margins.navDesktop};
`

export default Wrap
