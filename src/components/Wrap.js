import styled from 'styled-components/macro'

const Wrap = styled.div``

Wrap.Nav = styled(Wrap)`
  padding: 0 ${props => props.theme.margins.navDesktop};
  padding-top: ${props => props.padTop && props.theme.margins.navDesktop};
`

export default Wrap
