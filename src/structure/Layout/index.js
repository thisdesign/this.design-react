import React, { createContext, useState, useContext } from 'react'
import GlobalStyle from 'style/GlobalStyle'
import Nav from 'structure/Nav'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { changeViewName } from 'actions'
import theme from 'style/theme'
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

function Layout({ view: viewProp, workUid }) {
  const dispatch = useDispatch()
  dispatch(changeViewName(viewProp))
  const view = useSelector(state => state.view)

  const mainRef = React.useRef()
  const currentCsUid = useSaved(workUid)
  const [hoveredCsUID, setHoveredCsUID] = useState()
  const { isTransitioning } = useContext(TransitionCtx)

  return (
    <LayoutCtx.Provider
      value={{ view, currentCsUid, hoveredCsUID, setHoveredCsUID, mainRef }}
    >
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
    </LayoutCtx.Provider>
  )
}

Layout.propTypes = {
  view: PropTypes.oneOf(['root', 'work', 'about']).isRequired,
}

export default props => (
  <ThemeProvider theme={theme}>
    <TransitionProvider>
      <GlobalStyle />
      <Layout {...props} />
    </TransitionProvider>
  </ThemeProvider>
)
