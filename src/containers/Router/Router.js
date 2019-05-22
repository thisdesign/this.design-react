import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApiDataCtx } from "../App/App";
import Layout from "../Layout/Layout";
// import PropTypes from 'prop-types'

function Router() {
  const data = useContext(ApiDataCtx);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Layout view="root" />} />
        {data.contextCaseStudies.map((cs, i) => (
          <Route
            exact
            path={`/work/${cs.uid}`}
            render={() => (
              <Layout view="root" currentUid={cs.uid} currentIndex={i} />
            )}
          />
        ))}
        {data.caseStudies.map(cs => (
          <Route
            exact
            path={`/work/${cs.uid}`}
            render={() => <Layout view="root" currentUid={cs.uid} />}
          />
        ))}
        <Route exact path="/work/" render={() => <Layout view="work" />} />
        <Route exact path="/about/" render={() => <Layout view="about" />} />
      </Switch>
    </BrowserRouter>
  );
}

// Router.propTypes = {}

export default Router;
