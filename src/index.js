import React from 'react'
import ReactDOM, { hydrate, render } from 'react-dom'
import App from './containers/App/App'

const rootElement = document.getElementById('root')
if (rootElement.hasChildNodes()) {
  hydrate(<App />, rootElement)
} else {
  render(<App />, rootElement)
}

require('viewport-units-buggyfill').init()
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks,
})

ReactDOM.render(<App />, document.getElementById('root'))
