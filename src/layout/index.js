import React from 'react'
import DataProvider, { useData } from './DataProvider'

function App() {
  const data = useData()

  if (data.loaded) {
    return data.allCaseStudies.map(item => <div key={item.uid}>{item.uid}</div>)
  }
  return null
}

// App.propTypes = {}

export default () => (
  <DataProvider>
    <App />
  </DataProvider>
)
