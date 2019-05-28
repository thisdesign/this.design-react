import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../../containers/App/App'

const Router = ({ prismicCtx }) => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/work/"
        render={() => <App view="work" prismicCtx={prismicCtx} />}
      />
      <Route
        exact
        path="/work/:uid"
        render={({ match }) => (
          <App view="root" uid={match.params.uid} prismicCtx={prismicCtx} />
        )}
      />
      <Route
        exact
        path="/about"
        render={() => <App view="about" prismicCtx={prismicCtx} />}
      />
      <Route
        path="/"
        render={() => <App view="root" prismicCtx={prismicCtx} />}
      />
    </Switch>
  </BrowserRouter>
)

export default Router
