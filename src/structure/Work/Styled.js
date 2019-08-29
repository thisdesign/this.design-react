import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { mq } from 'style/theme'
import ResImg from 'components/Img'

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

const WorkItem = styled(Link)``

const Img = styled(ResImg)`
  width: 100%;
`

export default { Wrapper, Image, WorkItem, Img }
