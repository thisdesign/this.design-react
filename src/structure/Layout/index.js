import React from 'react'
import { useData } from 'structure/DataProvider'
import GlobalStyle from 'style/GlobalStyle'
import Styled from './Styled'

function Layout() {
  const data = useData()

  return (
    <>
      <GlobalStyle />
      <nav>
        <ul>
          <li>
            <a href="/work">Work</a>
          </li>
          <li>
            <a href="/root">root</a>
          </li>
          <li>
            <a href="/root">about</a>
          </li>
        </ul>
      </nav>
      <>
        <Styled.View.Root as="main">
          <h3>root</h3>
        </Styled.View.Root>
        <Styled.View.About>
          <h3>About</h3>
        </Styled.View.About>
        <Styled.View.Work>
          {data.allCaseStudies.map(item => (
            <div key={item.uid}>{item.uid}</div>
          ))}
        </Styled.View.Work>
      </>
    </>
  )
}

// Layout.propTypes = {}

export default Layout
