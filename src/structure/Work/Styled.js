import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${props => props.theme.margins.navDesktop};
`

const WorkItem = styled(Link)``

const Image = styled.div`
  background-image: url(${props => props.image});
  background-size: cover;
  width: 100%;
  height: 0;
  padding-top: 66.67%;
`

export default { Wrapper, Image, WorkItem }
