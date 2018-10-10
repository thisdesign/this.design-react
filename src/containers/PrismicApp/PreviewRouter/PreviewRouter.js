import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';
// import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Preview from '../Preview/Preview';
import App from '../../App/App';
import About from '../../About/About';
import Nav from '../../../components/Nav/Nav';
import CaseStudy from '../../CaseStudy/CaseStudy';
import Work from '../../../components/Work/Work';

import './PreviewRouter.css';

// once the transitions work, this should get the 3-panel slide to work
const routeFromWork = (history, workPath) => {
  history.push('/');
  setTimeout(() => {
    history.push(`/work/${workPath}`);
  }, 500);
};

const PreviewRouter = (props) => {
  const { prismicCtx, caseStudyList } = props;
  return (
    <Router>
      <Route
        render={({ location }) => (
          <div className={`view -is-active ${location.pathname}`}>
            <Nav />
            <About prismicCtx={prismicCtx} />
            <Work
              prismicCtx={prismicCtx}
              caseStudyList={caseStudyList}
              routeFromWork={routeFromWork}
            />
            <Switch location={location}>
              <Route
                exact
                path="/preview"
                render={routeProps => <Preview {...routeProps} prismicCtx={prismicCtx} />}
              />
              <Route
                path="/work/:id"
                render={({ match }) => (
                  <CaseStudy route={match.params.id} prismicCtx={prismicCtx} />
                    )}
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
