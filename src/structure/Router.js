import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './Layout'

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/about/" render={() => <Layout view="about" />} />
        <Route path="/work/" render={() => <Layout view="work" />} />
        <Route exact path="/" render={() => <Layout view="root" />} />
      </Switch>
    </BrowserRouter>
  )
}

// Router.propTypes = {}

export default Router
