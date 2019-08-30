import styled from 'styled-components/macro'
import { mq, sizes } from 'style/theme'
import GlobalWrap from 'components/Wrap'

const ABANDON_50 = mq.lg
const FULL_WRAPPER = `max-width: ${sizes.md}px`

const Wrap = styled(GlobalWrap)`
  @media (${FULL_WRAPPER}) {
    width: 90%;
  }
`

const ColWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: ${props =>
    props.mediaRight ? '"text media"' : '"media text"'};
  grid-gap: ${props => props.theme.margins.navDesktop};

  @media ${ABANDON_50} {
    grid-template-columns: ${props =>
      props.mediaRight ? '3fr 4fr' : '4fr 3fr'};
  }
`

const Col = styled.div``

const Media = styled(Col)`
  grid-area: media;
`
const Text = styled(Col)`
  grid-area: text;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default { Col, ColWrapper, Media, Text, Wrap }
