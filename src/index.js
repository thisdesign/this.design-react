import React from 'react'
import { hydrate, render } from 'react-dom'
import Layout from './structure'

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render')
  whyDidYouRender(React)
}

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrate(<Layout />, rootElement)
} else {
  render(<Layout />, rootElement)
}
