import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

export const headingStyles = [
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[4]};
    font-family: ${props => props.theme.fontFamilies.serif};
    font-weight: 900;
  `,

  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[5]};
    font-weight: 300;
  `,
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[3]};
    font-weight: 400;
  `,
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[2]};
  `,
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[0]};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
  `,
]

const type = css`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  html {
    font-size: 20px;
  }

  html,
  body {
    font-family: ${props => props.theme.fontFamilies.sansSerif};
    font-weight: 300;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-bottom: 1rem;
  }

  h1 {
    ${headingStyles[1]}
  }

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 400;
  }
  img {
    width: 100%;
    display: block;
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${type}
`

export default GlobalStyle
