import styled from 'styled-components/macro'

const CaseStudy = styled.div`
  background: ${props => props.bg || props.theme.colors.csBackground};
  color: ${props => props.text || 'inherit'};
`

export default { CaseStudy }
