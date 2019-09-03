import styled from 'styled-components/macro'

const CaseStudy = styled.article`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: scroll;
  z-index: ${props => (props.theme.isNext ? 0 : 10)};
`

export default { CaseStudy }
