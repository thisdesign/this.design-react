import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

const type = css`
  body {
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${type}
`

export default GlobalStyle
