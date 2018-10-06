import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';

import Preview from '../Preview/Preview';
import App from '../../App/App';
import About from '../../About/About';
import Nav from '../../../components/Nav/Nav';
import Work from '../../../components/Work/Work';

const PreviewRouter = (props) => {
  const { prismicCtx } = props;
  return (
    <Router>
      <Route
        render={({ location }) => (
          <div>
            <Nav />
            <Switch>
              <Route
                exact
                path="/about"
                render={routeProps => <About {...routeProps} prismicCtx={prismicCtx} />}
              />
              <Route
                exact
                path="/preview"
                render={routeProps => <Preview {...routeProps} prismicCtx={prismicCtx} />}
              />
              {/* <Route path="/@:ctx" render={({ match }) => <Redirect to={`/?=${match.params.ctx}`} />} /> */}
              {/* Will render the id in a div  */}
              <Route path="/work/:id" render={({ match }) => <div>{match.params.id}</div>} />
              <Route
                path="/work"
                render={routeProps => <Work {...routeProps} prismicCtx={prismicCtx} />}
              />
              <Route
                path="/"
                render={routeProps => <App {...routeProps} prismicCtx={prismicCtx} />}
              />
            </Switch>
          </div>
        )}
      />
    </Router>
  );
};

export default PreviewRouter;
