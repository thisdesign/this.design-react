import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApiDataCtx } from "../App/App";
import Layout from "../Layout/Layout";

function Router() {
  const { contextUids, caseStudies } = useContext(ApiDataCtx);
  const caseStudyUids = caseStudies.map(cs => cs.uid);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact
          path="/work/:uid"
          render={({ match }) => (
            <Layout view="root" isWorkView pathUid={match.params.uid} />
          )}
        />
        <Route path="/work/" render={() => <Layout view="work" />} />
        <Route path="/about/" render={() => <Layout view="about" />} />
        <Route path="/" render={() => <Layout view="root" />} />
      </Switch>
    </BrowserRouter>
  );
}

export default React.memo(Router);
