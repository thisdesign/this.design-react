import styled from 'styled-components/macro'

const TextWrapper = styled.div`
  max-width: 30rem;

  p {
    line-height: ${props => props.theme.lineHeights.paragraph};
  }
`

export default TextWrapper
