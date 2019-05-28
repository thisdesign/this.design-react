import React from 'react'
import ReactDOM from 'react-dom'
import PrismicApp from './containers/PrismicApp/PrismicApp'

require('viewport-units-buggyfill').init()
const hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks,
})

ReactDOM.render(<PrismicApp />, document.getElementById('root'))
