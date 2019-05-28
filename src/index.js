import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App/App'

require('viewport-units-buggyfill').init()
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks,
})

ReactDOM.render(<App />, document.getElementById('root'))
