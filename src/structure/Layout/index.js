import React from 'react'
import { useData } from 'structure/DataProvider'
import GlobalStyle from 'style/GlobalStyle'
import Nav from 'components/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from 'style/theme'
import Wrap from 'components/Wrap'
import Styled from './Styled'

function Layout({ view }) {
  const data = useData()

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Nav />
        <ThemeProvider theme={{ view }}>
          <>
            <Styled.View.Root as="main">
              <Wrap>
                <h3>root</h3>
              </Wrap>
            </Styled.View.Root>
            <Styled.View.About>
              <Wrap>
                <h3>About</h3>
              </Wrap>
            </Styled.View.About>
            <Styled.View.Work>
              <Wrap>
                {data.allCaseStudies.map(item => (
                  <div key={item.uid}>{item.uid}</div>
                ))}
              </Wrap>
            </Styled.View.Work>
          </>
        </ThemeProvider>
      </>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
