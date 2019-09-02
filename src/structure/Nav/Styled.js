import styled from 'styled-components/macro'
import Wrap from 'components/Wrap'

const Nav = styled(Wrap.Nav)`
  position: fixed;
  z-index: 20;
  width: 100%;
`

const Wrapper = styled.ul`
  display: flex;
  justify-content: space-between;
`

export default { Nav, Wrapper }
