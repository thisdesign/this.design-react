import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { useData } from './DataProvider'

import Layout from './Layout'

function Router() {
  const data = useData()

  return (
    <BrowserRouter>
      <Switch>
        <Route
          path={data.ctxCaseStudies.map(item => `/work/${item.uid}`)}
          render={({ match }) => (
            <Layout view="root" workUid={match.path.split('/')[2]} />
          )}
        />
        <Route path="/about/" render={() => <Layout view="about" />} />
        <Route path="/work/" render={() => <Layout view="work" />} />
        <Route exact path="/" render={() => <Layout view="root" />} />
        <Route path="/" render={() => <Layout view="root" notFound />} />
      </Switch>
    </BrowserRouter>
  )
}

// Router.propTypes = {}

export default Router
