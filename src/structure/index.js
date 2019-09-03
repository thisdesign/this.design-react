import React from 'react'
import { createStore } from 'redux'
import reducers from 'reducers'
import { Provider } from 'react-redux'
import DataProvider, { useData } from './DataProvider'
import Router from './Router'

function App() {
  const data = useData()

  const store = createStore(
    reducers,
    { view: 'asasdfadsasdf' },
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  if (data.loaded) {
    return (
      <Provider store={store}>
        <Router />{' '}
      </Provider>
    )
  }
  return 'loading...'
}

// App.propTypes = {}

export default () => (
  <DataProvider>
    <App />
  </DataProvider>
)
