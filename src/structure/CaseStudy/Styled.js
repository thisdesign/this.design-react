import styled from 'styled-components/macro'

const Shim = styled.div`
  width: 100%;
  height: 400px;
`

const ColorBg = styled.div`
  background: ${props =>
    props.theme.bgColor || props.theme.colors.csBackground};
  color: ${props => props.theme.textColor || 'inherit'};
  padding-bottom: 1px;
`
export default { Shim, ColorBg }
