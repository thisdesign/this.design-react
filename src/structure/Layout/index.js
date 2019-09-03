import React, { createContext, useState, useContext } from 'react'
import { TransitionCtx } from 'structure/TransitionProvider'
import Nav from 'structure/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'
import useSaved from 'hooks/useSaved'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

export const LayoutCtx = createContext()
export { TransitionCtx }

function Layout({ view, workUid }) {
  const mainRef = React.useRef()
  const currentCsUid = useSaved(workUid)
  const [hoveredCsUID, setHoveredCsUID] = useState()
  const { isTransitioning } = useContext(TransitionCtx)

  return (
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
  )
}

const Structure = () => {
  console.log('structure rendered')
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
