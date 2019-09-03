import React from 'react'
import { createStore } from 'redux'
import reducers from 'reducers'
import { Provider } from 'react-redux'
import DataProvider, { useData } from './DataProvider'
import Router from './Router'

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

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
    <Provider store={store}>
      <App />
    </Provider>
  </DataProvider>
)
