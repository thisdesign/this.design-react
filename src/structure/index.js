import React from 'react'
import theme from 'style/theme'
import { ThemeProvider } from 'styled-components/macro'
import GlobalStyle from 'style/GlobalStyle'
import DataProvider, { useData } from './DataProvider'
import Router from './Router'

function App() {
  const data = useData()

  if (data.loaded) {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Router />
        </>
      </ThemeProvider>
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
