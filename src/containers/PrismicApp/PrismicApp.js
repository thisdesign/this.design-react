import React from 'react';
import 'whatwg-fetch';
import Prismic from 'prismic-javascript';
import PrismicConfig from './config/prismic-configuration';
import PreviewRouter from './PreviewRouter/PreviewRouter';

export default class PrismicApp extends React.Component {
  state = {
    prismicCtx: null,
    caseStudyList: [],
  };

  componentWillMount() {
    console.log('Component Will Mount');
    this.buildContext()
      .then((prismicCtx) => {
        this.setState({ prismicCtx });
        this.getCaseStudyList(prismicCtx);
        console.log('prismicCtx ', prismicCtx);
      })
      .catch((e) => {
        console.error(`Cannot contact the API, check your prismic configuration:\n${e}`);
      });
  }
  componentDidMount = () => {
    console.log('Component Did Mount');
    // this.setState({ caseStudyList: this.getCaseStudyList() });
  };
  componentDidUpdate = (prevProps, prevState) => {
    console.log('this.state ', this.state);
  };

  getCaseStudyList = (prismicCtx) => {
    // const { prismicCtx } = this.state;
    if (!prismicCtx) {
      console.log('no prismit ctx');
    }
    console.log('prismicCtx ', prismicCtx);

    const fetchLinks = ['casestudy.title', 'casestudy.thumbnail', 'casestudy.svg'];

    prismicCtx.api
      .getByUID('context', 'home', { fetchLinks })
      .then(doc => (doc ? doc.data.case_study_list : null));
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
    return <PreviewRouter prismicCtx={this.state.prismicCtx} />;
  }
}
