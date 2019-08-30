import styled from 'styled-components/macro'
import { mq } from 'style/theme'

const Wrap = styled.div`
  margin: 0px auto;

  max-width: 1500px;
  padding: 0 ${props => props.theme.margins.standard};

  @media ${mq.sm} {
    width: 80%;
  }
`

Wrap.Nav = styled.div`
  padding: 0 ${props => props.theme.margins.navDesktop};
  padding-top: ${props => props.padTop && props.theme.margins.navDesktop};
`

export default Wrap
