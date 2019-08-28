import React from 'react'
import { Link } from 'react-router-dom'
import Styled from './Styled'

function Nav() {
  return (
    <Styled.Nav as="nav" padTop>
      <Styled.Wrapper>
        <li>
          <Link to="/work">Work</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </Styled.Wrapper>
    </Styled.Nav>
  )
}

// Nav.propTypes = {}

export default Nav
