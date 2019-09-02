import styled from 'styled-components/macro'
import { mq } from 'style/theme'
import TransitionLink from 'components/TransitionLink'

const IS_GRID = mq.xs
const Wrapper = styled.div`
  display: grid;
  grid-gap: ${props => props.theme.margins.standard};
  max-width: none;

  @media ${IS_GRID} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${props => props.theme.margins.navDesktop};
  }

  @media ${mq.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const Title = styled.h4`
  text-align: center;
  margin-top: ${props => props.theme.margins.standard};
  color: ${props => props.theme.colors.midGrey};
  height: 0;
  margin-bottom: -${props => props.theme.margins.standard};

  @media ${IS_GRID} {
    transition: ${props => props.theme.duration.standard}ms opacity
      ${props => props.theme.ease.standard};
    opacity: ${props => (props.isHovered ? 1 : 0)};
  }
`

const WorkItem = styled(TransitionLink)``

export default { Wrapper, Image, WorkItem, Title }
