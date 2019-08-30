import styled from 'styled-components/macro'
import { mq, sizes } from 'style/theme'
import GlobalWrap from 'components/Wrap'

const BE_A_COL = mq.xs
const OFFSET_LG = mq.xl
const OFFSET_SM = mq.md

const FULL_WRAPPER = `${mq.sm} and (max-width: ${sizes.md}px)`
const LARGE_MARGIN = mq.xl
const SM_MARGIN = mq.md

const Wrap = styled(GlobalWrap)`
  @media ${FULL_WRAPPER} {
    width: 90%;
  }
`

const ColWrapper = styled.div`
  @media ${BE_A_COL} {
    display: flex;
    flex-direction: ${props => (props.reverseDir ? 'row-reverse' : 'row')};
    margin: 0 -${props => props.theme.margins.standard};
  }

  @media ${SM_MARGIN} {
    margin: 0 -2rem;
  }
  @media ${LARGE_MARGIN} {
    margin: 0 -${props => props.theme.margins.navDesktop};
  }
`

const Col = styled.div`
  @media ${BE_A_COL} {
    flex: 1;
    margin: 0 ${props => props.theme.margins.standard};
  }

  @media ${SM_MARGIN} {
    margin: 0 2rem;
  }

  @media ${LARGE_MARGIN} {
    margin: 0 ${props => props.theme.margins.navDesktop};
  }
  @media ${FULL_WRAPPER} {
  }
`

const Media = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media ${OFFSET_SM}{
    flex: ${props => {
      switch (props.size) {
        case 'LARGE':
          return 1.5
        case 'SMALL':
          return 0.75
        default:
          return 1
      }
    }};
  }
  }
  @media ${OFFSET_LG} {
    flex: ${props => {
      switch (props.size) {
        case 'LARGE':
          return 2
        case 'SMALL':
          return 0.5
        default:
          return 1
      }
    }};
  }
`
const Text = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export default { Col, ColWrapper, Media, Text, Wrap }
