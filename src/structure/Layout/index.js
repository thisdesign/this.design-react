import React from 'react'
import { useData } from 'structure/DataProvider'

function Layout() {
  const data = useData()

  return (
    <>
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
        <main>
          <h3>root</h3>
        </main>
        <aside>
          <h3>About</h3>
        </aside>
        <aside>
          {data.allCaseStudies.map(item => (
            <div key={item.uid}>{item.uid}</div>
          ))}
        </aside>
      </>
    </>
  )
}

// Layout.propTypes = {}

export default Layout
