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
    dataNotFound: false,
  };

  componentDidMount() {
    this._setCaseStudy();
  }

  componentDidUpdate(prevProps) {
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;
    const isNewUid = (this.props.uid !== prevProps.uid) && this.props.uid !== undefined;

    if (hasLoadedCtx) {
      this._loadSiteContext(this.props);
      this._loadSiteInfo(this.props);
      this.props.prismicCtx.toolbar();
    }
    if (isNewUid) { this._setCaseStudy(); }
  }

  _setCaseStudy = () => {
    this.setState({ currentCaseStudy: this.props.uid });
  }

  _getImages = doc => flatten(doc.results.map((item) => {
    const header = item.data.header[0];
    return [
      header.image1.url,
      header.image2.url,
      header.mobileImage.url,
    ];
  })).filter(el => el !== undefined)

  _preloadImages = (doc) => {
    const imgs = this._getImages(doc);
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

  _loadSiteContext = (props = this.props) => props.prismicCtx.api.getByUID('context', 'home').then((doc) => {
    if (doc) {
      const ids = doc.data.case_study_list.map(cs => cs.case_study_item.id);
      this._loadCaseStudies(ids);
    } else {
      this.setState({ dataNotFound: true });
    }
  })


  _loadCaseStudies = (ids) => {
    this.props.prismicCtx.api.getByIDs(ids).then((doc) => {
      this.setState({ caseStudies: doc.results });
      this._preloadImages(doc);
    });
  }

  _loadSiteInfo = (props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ siteInfo: doc });
      } else {
        this.setState({
          dataNotFound: !doc,
        });
      }
    });
  }

  _getContextUids = () => this.state.caseStudies.map(cs => cs.uid)

  _getCurrentCsDoc = () => this.state.caseStudies[this._getCsIndex()]

  _getCsDarkState = () => this._getCurrentCsDoc().data.preserve_white_nav === 'true'

  _getCurrentCaseStudies = () => this.state.caseStudies

  _getNextUsableIndex = () => (this._isLastCaseStudy() ? 0 : this._getNextIndex());

  _getNextUid = () => this.state.caseStudies[this._getNextUsableIndex()].uid

  _getNextIndex = () => this._getCsIndex() + 1

  _getCsIndex = () => this._getContextUids().indexOf(this.state.currentCaseStudy)

  _isLastCaseStudy = () => this._getNextIndex() === this._getCurrentCaseStudies().length

  _csIsUnselected = () => this._getCsIndex() === -1

  _csIsNotFound = () => this._getContextUids().indexOf(this.props.uid) === -1

  _hasCurrentData = () => !this._csIsNotFound() && !this._csIsUnselected()

  render() {
    const {
      siteInfo,
      dataNotFound,
      caseStudies,
    } = this.state;

    if (siteInfo && caseStudies) {
      return (
        <Layout
          notFound={dataNotFound || this._csIsNotFound()}
          caseStudies={caseStudies}
          siteInfo={siteInfo}
          view={this.props.view}
          prismicCtx={this.props.prismicCtx}
          currentCaseStudy={this.state.currentCaseStudy} // rm
          handleNotFound={this.handleNotFound}
          csIndex={this._getCsIndex()}
          csData={{
            unselected: this._csIsUnselected(),
            currentIndex: this._getCsIndex(),
            currentUid: this.state.currentCaseStudy,
            nextIndex: this._getNextUsableIndex(),
            nextUid: this._getNextUid(),
            caseStudies: this.state.caseStudies,
            isDark: this._hasCurrentData() ? this._getCsDarkState() : null,
          }}
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
