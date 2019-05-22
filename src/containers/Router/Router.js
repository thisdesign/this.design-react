import React, { useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ApiDataCtx } from "../App/App";
import Layout from "../Layout/Layout";

function Router() {
  const { contextCaseStudies, caseStudies } = useContext(ApiDataCtx);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <Layout view="root" />} />
        {contextCaseStudies.map((cs, i) => (
          <Route
            exact
            key={cs.uid}
            path={`/work/${cs.uid}`}
            render={() => (
              <Layout view="root" currentUid={cs.uid} currentIndex={i} />
            )}
          />
        ))}
        {caseStudies.map(cs => (
          <Route
            exact
            key={cs.uid}
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

export default React.memo(Router);
