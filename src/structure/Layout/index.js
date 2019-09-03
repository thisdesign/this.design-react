import React, { createContext, useState } from 'react'
import Nav from 'structure/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import About from 'structure/About'
import Work from 'structure/Work'
import Root from 'structure/Root'

import useSaved from 'hooks/useSaved'
import Styled from './Styled'
import 'style/fontFamilies.css'

const { ViewInner, View } = Styled

export const LayoutCtx = createContext()

function Layout({ view: viewProp, workUid }) {
  const dispatch = useDispatch()
  const currentCsUid = useSaved(workUid)
  const isTransitioning = useSelector(state => state.transition.isTransitioning)

  React.useEffect(() => {
    dispatch({
      type: 'CHANGE_VIEW',
      view: viewProp,
      currentCsUid,
    })
  }, [currentCsUid, dispatch, viewProp])

  const view = useSelector(state => state.view)

  const mainRef = React.useRef()
  const [hoveredCsUID, setHoveredCsUID] = useState()

  return (
    <LayoutCtx.Provider value={{ hoveredCsUID, setHoveredCsUID, mainRef }}>
      <Nav />
      <ThemeProvider theme={{ view, isTransitioning }}>
        <Structure />
      </ThemeProvider>
    </LayoutCtx.Provider>
  )
}

const Structure = React.memo(() => {
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
})

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default Layout
