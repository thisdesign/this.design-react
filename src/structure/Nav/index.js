import React, { useContext } from 'react'
import { LayoutCtx } from 'structure/Layout'
import TransitionLink from 'components/TransitionLink'
import Styled from './Styled'

function Nav() {
  const { view, currentCsUid } = useContext(LayoutCtx)
  const isRoot = view === 'root'
  const closeRoute = currentCsUid ? `/work/${currentCsUid}` : '/'

  return (
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
  )
}

// Nav.propTypes = {}

export default Nav
