import React from 'react'
import { Link } from 'react-router-dom'
import Styled from './Styled'

function Nav() {
  return (
    <Styled.Nav>
      <ul>
        <li>
          <Link to="/work">Work</Link>
        </li>
        <li>
          <Link to="/about">about</Link>
        </li>
      </ul>
    </Styled.Nav>
  )
}

// Nav.propTypes = {}

export default Nav
