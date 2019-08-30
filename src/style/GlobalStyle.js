import { createGlobalStyle, css } from 'styled-components'
import reset from 'styled-reset'
import { mq } from './theme'

export const headingStyles = [
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[5]};
    font-family: ${props => props.theme.fontFamilies.serif};
    font-weight: 900;
  `,

  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[6]};
    font-weight: 300;
  `,
  css`
    line-height: ${props => props.theme.lineHeights.heading};
    font-size: ${props => props.theme.fontSizes[4]};
    font-weight: 400;
  `,
  css`
    line-height: ${props => props.theme.lineHeights.headingLg};
    font-size: ${props => props.theme.fontSizes[3]};
    font-weight: 400;
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
    font-size: 18px;

    @media ${mq.sm} {
      font-size: 19px;
    }
    @media ${mq.md} {
      font-size: 20px;
    }
    @media ${mq.lg} {
      font-size: 22px;
    }
    @media ${mq.xl} {
      font-size: 22px;
    }
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
  h6,
  p {
    margin-bottom: 1rem;
  }

  h1 {
    ${headingStyles[1]}
  }

  h4 {
    ${headingStyles[3]}
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

  p {
    line-height: ${props => props.theme.lineHeights.paragraph};
  }
`

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${type}

  body {
    overflow: hidden;
  }
`

export default GlobalStyle
