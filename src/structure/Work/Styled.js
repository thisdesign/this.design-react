import styled from 'styled-components/macro'
import { mq } from 'style/theme'
import TransitionLink from 'components/TransitionLink'

const Wrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.margins.standard};

  @media ${mq.xs} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.margins.navDesktop};
  }

  @media ${mq.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const WorkItem = styled(TransitionLink)``

export default { Wrapper, Image, WorkItem }
