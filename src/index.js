import React from 'react'
import { hydrate, render } from 'react-dom'
import Layout from './structure'

const rootElement = document.getElementById('root')

if (rootElement.hasChildNodes()) {
  hydrate(<Layout />, rootElement)
} else {
  render(<Layout />, rootElement)
}
