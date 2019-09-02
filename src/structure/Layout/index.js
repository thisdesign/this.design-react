import React, { createContext, useState, createRef } from 'react'
import GlobalStyle from 'style/GlobalStyle'
import Nav from 'components/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import theme from 'style/theme'
import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'
import useSaved from 'hooks/useSaved'
import useTransition from './hooks/useTransition'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

export const LayoutCtx = createContext()
export const TransitionCtx = createContext()

function Layout({ view, workUid }) {
  const mainRef = React.useRef()
  const currentCsUid = useSaved(workUid)
  const [hoveredCsUID, setHoveredCsUID] = useState()
  const { isTransitioning } = useTransition()

  return (
    <ThemeProvider theme={theme}>
      <TransitionProvider>
        <LayoutCtx.Provider
          value={{ view, currentCsUid, hoveredCsUID, setHoveredCsUID, mainRef }}
        >
          <>
            <GlobalStyle />
            <Nav />
            <ThemeProvider theme={{ view, isTransitioning }}>
              <>
                <View.Root as="main" ref={mainRef}>
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
        </LayoutCtx.Provider>
      </TransitionProvider>
    </ThemeProvider>
  )
}

function TransitionProvider({ children }) {
  const ctx = useTransition()
  return (
    <TransitionCtx.Provider value={{ ...ctx }}>
      {children}
    </TransitionCtx.Provider>
  )
}

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
