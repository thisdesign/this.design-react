import React, { createContext } from 'react'
import GlobalStyle from 'style/GlobalStyle'
import Nav from 'components/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from 'style/theme'
import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'
import useSaved from 'hooks/useSaved'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

export const LayoutCtx = createContext()

function Layout({ view, workUid }) {
  const currentCsUid = useSaved(workUid)
  const [hoveredCs, setHoveredCs] = React.useState(null)

  return (
    <LayoutCtx.Provider value={{ view, currentCsUid, hoveredCs, setHoveredCs }}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Nav />
          <ThemeProvider theme={{ view }}>
            <>
              <View.Root as="main">
                <Root />
              </View.Root>
              <View.About>
                <ViewInner.About>
                  <About />
                </ViewInner.About>
              </View.About>
              <View.Work>
                <ViewInner.Work>
                  <Work />
                </ViewInner.Work>
              </View.Work>
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
