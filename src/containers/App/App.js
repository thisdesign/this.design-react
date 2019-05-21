import "styles/reset.scss";
import "styles/fonts.scss";
import "styles/typography.scss";
import "styles/layout.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import React, { createContext } from "react";
import Layout from "../Layout/Layout";
import useApi from "./useApi";
import "./App.scss";

export const ApiDataCtx = createContext();

function App() {
  const data = useApi();

  if (data) {
    return (
      <ApiDataCtx.Provider value={data}>
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
            <Route
              exact
              path="/about/"
              render={() => <Layout view="about" />}
            />
          </Switch>
        </BrowserRouter>
      </ApiDataCtx.Provider>
    );
  }
  return <div>Loading</div>;
}

export default React.memo(App);
