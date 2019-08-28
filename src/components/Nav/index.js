import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LayoutCtx } from 'structure/Layout'
import Styled from './Styled'

function Nav() {
  const { view, currentCsUid } = useContext(LayoutCtx)
  const isRoot = view === 'root'
  const closeRoute = currentCsUid ? `/work/${currentCsUid}` : '/'

  return (
    <Styled.Nav as="nav" padTop>
      <Styled.Wrapper>
        <li>
          <Link to={isRoot ? '/work' : closeRoute}>
            {isRoot ? 'work' : 'close'}
          </Link>
        </li>
        <li>
          <Link to={isRoot ? '/about' : closeRoute}>
            {isRoot ? 'about' : 'close'}
          </Link>
        </li>
      </Styled.Wrapper>
    </Styled.Nav>
  )
}

// Nav.propTypes = {}

export default Nav
