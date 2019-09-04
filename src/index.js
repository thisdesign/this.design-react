import React from 'react'
import { hydrate, render } from 'react-dom'
import Layout from './structure'

const rootElement = document.getElementById('root')

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

if (rootElement.hasChildNodes()) {
  hydrate(<Layout />, rootElement)
} else {
  render(<Layout />, rootElement)
}
