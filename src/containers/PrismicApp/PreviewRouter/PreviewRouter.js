import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Preview from '../Preview/Preview';
import App from '../../App/App';
import About from '../../About/About';

const PreviewRouter = props => (
  <Router>
    <Switch>
      <Route
        exact
        path="/about"
        render={routeProps => <About {...routeProps} prismicCtx={props.prismicCtx} />}
      />
      <Route
        exact
        path="/preview"
        render={routeProps => <Preview {...routeProps} prismicCtx={props.prismicCtx} />}
      />
      <Route path="/@:ctx" render={({ match }) => <Redirect to={`/?=${match.params.ctx}`} />} />
      {/* Will render the id in a div  */}
      <Route path="/work/:id" render={({ match }) => <div>{match.params.id}</div>} />
      <Route
        path="/"
        render={routeProps => <App {...routeProps} prismicCtx={props.prismicCtx} />}
      />
    </Switch>
  </Router>
);

export default PreviewRouter;
