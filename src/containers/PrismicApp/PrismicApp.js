import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicConfig from './config/prismic-configuration';
import App from '../App/App';

export default class PrismicApp extends React.Component {
  state = {
    prismicCtx: null,
    caseStudyList: [],
  };

  componentWillMount() {
    this.buildContext()
      .then((prismicCtx) => {
        this.setState({ prismicCtx });
        this.getCaseStudyList(prismicCtx);
      })
      .catch((e) => {
        console.error(`Cannot contact the API, check your prismic configuration:\n${e}`);
      });
  }

  getCaseStudyList = (prismicCtx) => {
    const fetchLinks = ['casestudy.title', 'casestudy.thumbnail', 'casestudy.svg'];

    prismicCtx.api.getByUID('context', 'home', { fetchLinks }).then(doc =>
      (doc
        ? this.setState({
          caseStudyList: doc.data.case_study_list,
          notFound: false,
        })
        : this.setState({ notFound: true, caseStudyList: [] })));
  };

  refreshToolbar() {
    const maybeCurrentExperiment = this.api.currentExperiment();
    if (maybeCurrentExperiment) {
      window.PrismicToolbar.startExperiment(maybeCurrentExperiment.googleId());
    }
    window.PrismicToolbar.setup(PrismicConfig.apiEndpoint);
  }

  buildContext() {
    const { accessToken } = PrismicConfig;
    return Prismic.api(PrismicConfig.apiEndpoint, { accessToken }).then(api => ({
      api,
      endpoint: PrismicConfig.apiEndpoint,
      accessToken,
      linkResolver: PrismicConfig.linkResolver,
      toolbar: this.refreshToolbar,
    }));
  }

  render() {
    const { caseStudyList, prismicCtx, notFound } = this.state;
    return (
      <App prismicCtx={prismicCtx} caseStudyList={notFound ? null : caseStudyList} />
    );
  }
}
