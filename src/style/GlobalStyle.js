import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'

export const headingStyles = [
  css`
    font-size: ${props => props.theme.fontSizes[4]};
    font-family: ${props => props.theme.fontFamilies.serif};
    font-weight: 900;
  `,

  css`
    font-size: ${props => props.theme.fontSizes[5]};
    font-weight: 400;
  `,
  css`
    font-size: ${props => props.theme.fontSizes[3]};
    font-weight: 400;
  `,
  css`
    font-size: ${props => props.theme.fontSizes[1]};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
  `,
]

const resetSupliment = css`
  * {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
const domaine =
  'https://prismic-io.s3.amazonaws.com/thisstaging%2F12855606-5254-41ca-8832-a6ad659c0643_domainedisplayweb-black.woff'

const calibrewebReg =
  'https://prismic-io.s3.amazonaws.com/thisstaging/1af5ff39-503a-4dd7-927b-0bf77ca4e075_calibreweb-light.woff'

const calibrewebLt =
  'https://prismic-io.s3.amazonaws.com/thisstaging/1af5ff39-503a-4dd7-927b-0bf77ca4e075_calibreweb-light.woff'

const fontFace = css`
  @font-face {
    font-family: 'Calibre';
    src: url(${calibrewebReg});
    font-weight: 400;
    font-display: swap;
  }
  @font-face {
    font-family: 'Calibre';
    src: url(${calibrewebLt});
    font-weight: 300;
    font-display: swap;
  }

  @font-face {
    font-family: 'Domaine';
    src: url(${domaine});
    font-weight: 900;
    font-display: swap;
  }
`

const type = css`
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
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${fontFace}
  ${resetSupliment}
  ${type}
`

export default GlobalStyle
