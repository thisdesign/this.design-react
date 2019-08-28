import React from 'react'
import DataProvider, { useData } from './DataProvider'
import Layout from './Layout'

function App() {
  const data = useData()

  if (data.loaded) {
    return <Layout />
  }
  return null
}

// App.propTypes = {}

export default () => (
  <DataProvider>
    <App />
  </DataProvider>
)
