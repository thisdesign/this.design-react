import React, { createContext, useState } from 'react'
import Nav from 'structure/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'
import useSaved from 'hooks/useSaved'
import TransitionProvider, { TransitionCtx } from './TransitionProvider'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

export const LayoutCtx = createContext()
export { TransitionCtx }

function Layout({ view, workUid }) {
  const mainRef = React.useRef()
  const currentCsUid = useSaved(workUid)
  const [hoveredCsUID, setHoveredCsUID] = useState()

  return (
    <TransitionProvider>
      <TransitionCtx.Consumer>
        {({ isTransitioning }) => (
          <>
            <LayoutCtx.Provider
              value={{
                view,
                currentCsUid,
                hoveredCsUID,
                setHoveredCsUID,
                mainRef,
              }}
            >
              <Nav />
              <ThemeProvider theme={{ view, isTransitioning }}>
                <Structure />
              </ThemeProvider>
            </LayoutCtx.Provider>
          </>
        )}
      </TransitionCtx.Consumer>
    </TransitionProvider>
  )
}

const Structure = () => {
  return (
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
  )
}

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
