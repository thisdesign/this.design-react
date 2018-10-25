import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  Redirect,
} from 'react-router-dom';
import Preview from 'containers/PrismicApp/Preview/Preview';


const PreviewRouter = ({ children, prismicCtx }) => (
  <Switch>
    <Route
      exact
      path="/preview"
      render={routeProps => <Preview {...routeProps} prismicCtx={prismicCtx} />}
    />
    <Route
      path="/@:ctx"
      render={({ match }) => (
        <Redirect to={`/?=${match.params.ctx}`} />
        )}
    />
    <Route
      path="/"
      render={() => children}
    />
  </Switch>
);

export default withRouter(PreviewRouter);
