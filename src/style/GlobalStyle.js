import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

const resetSupliment = css`
  * {
    box-sizing: border-box;
  }
`

const type = css`
  html,
  body {
    font-family: sans-serif;
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${resetSupliment}
  ${type}
`

export default GlobalStyle
