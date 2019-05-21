import "styles/reset.scss";
import "styles/fonts.scss";
import "styles/typography.scss";
import "styles/layout.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Prismic from "prismic-javascript";
import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";
import "./App.scss";

function useApiData() {
  const [state, setState] = useState();

  async function getData() {
    const api = await Prismic.api("https://thisstaging.prismic.io/api/v2");

    const caseStudies = await api
      .query([Prismic.Predicates.at("document.type", "casestudy")], {
        pageSize: 100
      })
      .then(res => res.results);

    const contextUids = await api
      .getByUID("context", "home")
      .then(doc => doc)
      .then(res => res.data.case_study_list.map(cs => cs.case_study_item.uid));

    const contextCaseStudies = contextUids.map(
      uid => caseStudies[caseStudies.map(data => data.uid).indexOf(uid)]
    );

    setState({ contextCaseStudies, contextUids, caseStudies });
  }

  useEffect(() => {
    getData();
  }, []);

  return state;
}

function App() {
  const data = useApiData();

  if (data) {
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
        </Switch>
      </BrowserRouter>
    );
  }
  return <div>Loading</div>;
}

export default React.memo(App);
