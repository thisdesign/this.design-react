import React from 'react'
import DataProvider, { useData } from './DataProvider'
import Router from './Router'

function App() {
  const data = useData()

  if (data.loaded) {
    return <Router />
  }
  return 'loading...'
}

// App.propTypes = {}

export default () => (
  <DataProvider>
    <App />
  </DataProvider>
)
