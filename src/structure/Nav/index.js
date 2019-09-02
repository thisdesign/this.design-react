import React, { useContext } from 'react'
import { LayoutCtx } from 'structure/Layout'
import TransitionLink from 'components/TransitionLink'
import { ThemeProvider } from 'styled-components'
import Styled from './Styled'

function Nav() {
  const { view, currentCsUid } = useContext(LayoutCtx)
  const isRoot = view === 'root'
  const isAbout = view === 'about'
  const closeRoute = currentCsUid ? `/work/${currentCsUid}` : '/'

  const csIsScrolled = false // change
  const isNavWhite = isAbout || (isRoot && !csIsScrolled)

  return (
    <ThemeProvider theme={{ isNavWhite }}>
      <Styled.Nav as="nav" padTop>
        <Styled.Wrapper>
          <li>
            <TransitionLink to={isRoot ? '/work' : closeRoute}>
              {isRoot ? 'work' : 'close'}
            </TransitionLink>
          </li>
          <li>
            <TransitionLink to={isRoot ? '/about' : closeRoute}>
              {isRoot ? 'about' : 'close'}
            </TransitionLink>
          </li>
        </Styled.Wrapper>
      </Styled.Nav>
    </ThemeProvider>
  )
}

// Nav.propTypes = {}

export default Nav
