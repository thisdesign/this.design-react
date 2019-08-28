import React from 'react'
import Styled from './Styled'

function Nav() {
  return (
    <Styled.Nav>
      <ul>
        <li>
          <a href="/work">Work</a>
        </li>
        <li>
          <a href="/">root</a>
        </li>
        <li>
          <a href="/root">about</a>
        </li>
      </ul>
    </Styled.Nav>
  )
}

// Nav.propTypes = {}

export default Nav
