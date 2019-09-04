import React from 'react'
import { useSelector } from 'react-redux'
import TransitionLink from 'components/TransitionLink'
import Styled from './Styled'

function Nav() {
  const currentCsUid = useSelector(state => state.currentCsUid)
  const view = useSelector(state => state.view)
  const isRoot = view === 'root'
  const isAbout = view === 'about'
  const closeRoute = currentCsUid ? `/work/${currentCsUid}` : '/'

  const csIsScrolled = false // change
  const isNavWhite = isAbout || (isRoot && !csIsScrolled)

  return (
    <Styled.Nav as="nav" padTop isNavWhite={isNavWhite}>
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
  )
}

// Nav.propTypes = {}

export default Nav
