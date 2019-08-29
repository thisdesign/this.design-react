import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

export const headingStyles = [
  css`
    font-size: 26px;
    font-family: serif;
    font-weight: bold;
  `,
  css`
    font-size: 28px;
  `,
  css`
    font-size: 20px;
  `,
  css`
    font-size: 12px;
    letter-spacing: 0.25em;
  `,
]

const resetSupliment = css`
  * {
    box-sizing: border-box;
  }
  a {
    color: inherit;
    text-decoration: none;
    font-weight: 600;
  }
  img {
    width: 100%;
    display: block;
  }
`

const type = css`
  html,
  body {
    font-family: sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${resetSupliment}
  ${type}
`

export default GlobalStyle
