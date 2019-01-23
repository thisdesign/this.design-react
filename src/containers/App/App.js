import 'styles/reset.scss';
import 'styles/fonts.scss';
import 'styles/typography.scss';
import 'styles/layout.scss';

import React from 'react';
import PreviewRouter from 'containers/PrismicApp/PreviewRouter/PreviewRouter';
import Loading from 'components/Loading/Loading';
import Layout from 'containers/Layout/Layout';
import flatten from 'array-flatten';

import './App.scss';

class App extends React.Component {
  state = {
    siteInfo: null,
    notFound: false,
  };

  componentDidMount() {
    this.setCaseStudy();
  }

  componentDidUpdate(prevProps) {
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;
    const isNewUid = (this.props.uid !== prevProps.uid) && this.props.uid !== undefined;

    if (hasLoadedCtx) {
      this.loadSiteContext(this.props);
      this.loadSiteInfo(this.props);
      this.props.prismicCtx.toolbar();
    }
    if (isNewUid) { this.setCaseStudy(); }
  }

  setCaseStudy = () => {
    this.setState({ currentCaseStudy: this.props.uid });
  }

  setNotFound = () => {
    this.setState({ notFound: true });
  }

  getImages = doc => flatten(doc.results.map((item) => {
    const header = item.data.header[0];
    return [
      header.image1.url,
      header.image2.url,
      header.mobileImage.url,
    ];
  })).filter(el => el !== undefined)

  loadImages = (doc) => {
    const imgs = this.getImages(doc);
    const imgStatuses = [];
    imgs.forEach((url, i) => {
      imgStatuses[i] = new Promise((resolve) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve({ status: 'ok' });
        img.onerror = () => resolve({ status: 'error' });
      });
    });

    return imgStatuses;
  }

  loadSiteContext = (props = this.props) => props.prismicCtx.api.getByUID('context', 'home').then((doc) => {
    if (doc) {
      const ids = doc.data.case_study_list.map(cs => cs.case_study_item.id);
      this.loadCaseStudies(ids);
    } else {
      this.setState({ notFound: true });
    }
  })


  loadCaseStudies = (ids) => {
    this.props.prismicCtx.api.getByIDs(ids).then((doc) => {
      this.setState({ caseStudies: doc.results });
      this.loadImages(doc);
    });
  }

  loadSiteInfo = (props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ siteInfo: doc });
      } else {
        this.setState({
          notFound: !doc,
        });
      }
    });
  }

  handleNotFound = (cond) => {
    this.setState({ notFound: cond });
  }

  render() {
    const {
      siteInfo,
      notFound,
      caseStudies,
    } = this.state;

    if (siteInfo && caseStudies) {
      return (
        <Layout
          notFound={notFound}
          caseStudies={caseStudies}
          siteInfo={siteInfo}
          view={this.props.view}
          prismicCtx={this.props.prismicCtx}
          currentCaseStudy={this.state.currentCaseStudy}
          handleNotFound={this.handleNotFound}
        />
      );
    }
    return (
      <PreviewRouter prismicCtx={this.props.prismicCtx}>
        <Loading />
      </PreviewRouter>);
  }
}

export default App;
