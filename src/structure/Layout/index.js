import React, { createContext } from 'react'
import { useData } from 'structure/DataProvider'
import GlobalStyle from 'style/GlobalStyle'
import Nav from 'components/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from 'style/theme'
import Wrap from 'components/Wrap'
import Section from 'components/Section'
import Styled from './Styled'

export const LayoutCtx = createContext()

function Layout({ view }) {
  const data = useData()

  return (
    <LayoutCtx.Provider value={{ view }}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Nav />
          <ThemeProvider theme={{ view }}>
            <>
              <Styled.View.Root as="main">
                <Section>
                  <Wrap>
                    <h3>root</h3>
                  </Wrap>
                </Section>
              </Styled.View.Root>
              <Styled.View.About>
                <Section>
                  <Wrap>
                    <h3>About</h3>
                  </Wrap>
                </Section>
              </Styled.View.About>
              <Styled.View.Work>
                <Section>
                  <Wrap>
                    {data.allCaseStudies.map(item => (
                      <div key={item.uid}>{item.uid}</div>
                    ))}
                  </Wrap>
                </Section>
              </Styled.View.Work>
            </>
          </ThemeProvider>
        </>
      </ThemeProvider>
    </LayoutCtx.Provider>
  )
}

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
