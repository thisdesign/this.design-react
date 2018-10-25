import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import {
  withRouter,
  matchPath,
} from 'react-router-dom';
import PreviewRouter from 'containers/PrismicApp/PreviewRouter/PreviewRouter';
import Loading from 'components/Loading/Loading';
import Homepage from 'components/Homepage/Homepage';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import NotFound from 'components/NotFound/NotFound';
import CaseStudy from 'containers/CaseStudy/CaseStudy';
import About from 'containers/About/About';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.VIEW_CHANGE_DURATION = 600;
    this.aboutNode = React.createRef();
  }

  state = {
    caseStudyList: null,
    siteInfo: null,
    notFound: false,
    view: 'root',
    /**
     * Once set, should never be 'null' again
     * @type {String}
     */
    currentCaseStudy: null,
    /**
     * while animating, show <Loading /> until animation
     * finishes to reduce animation jank due to DOM changes
     * @type {Boolean}
     */
    isAnimatingToCs: false,
    scrolledPastCsCover: null,
  };

  componentDidUpdate(prevProps) {
    /**
     * Can't do anything without prismicCtx so make
     * sure it has loaded before going any further
     */
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;
    if (hasLoadedCtx) {
      this.loadData();
      this.props.prismicCtx.toolbar();
      this.setViewFromUrl();
      this.setCsFromUrl();
    }
    window.onpopstate = () => {
      this.setViewFromUrl();
      this.setCsFromUrl();
    };
  }

  setCsFromUrl() {
    const location = this.props.location.pathname;
    if (this.isCaseStudy(location)) {
      this.setState({ currentCaseStudy: this.returnCsFromPath(location) });
    }
  }

  setViewFromUrl = () => {
    const path = this.props.location.pathname;
    const isCaseStudy = this.isCaseStudy(path);
    let view = 'root';
    if (path !== '/') {
      view = !isCaseStudy
        ? matchPath(path, { path: '/:view/' }).params.view
        : 'root';
    }
    this.setState({ view });
  }

  openCaseStudy = (uid) => {
    this.setState({
      currentCaseStudy: uid,
      view: 'root',
      isAnimatingToCs: true,
      scrolledPastCsCover: false,
    }, () => {
      setTimeout(() => {
        this.setState({ isAnimatingToCs: false });
      }, this.VIEW_CHANGE_DURATION);
    });
  }

  returnCsFromPath = (path) => {
    const match = matchPath(path, { path: '/work/:id' });
    return match ? match.params.id : null;
  }

  isCaseStudy = path => this.returnCsFromPath(path) !== null;

  changeView = (view) => {
    this.setState({ view });
  }

  loadData = () => {
    this.loadCaseStudyList(this.props);
    this.loadSiteInfo(this.props);
  }

  loadCaseStudyList = (props = this.props) => {
    const fetchLinks = ['casestudy.title', 'casestudy.thumbnail', 'casestudy.svg'];

    props.prismicCtx.api.getByUID('context', 'home', { fetchLinks }).then((doc) => {
      if (doc) {
        this.setState({ caseStudyList: doc.data.case_study_list });
      } else {
        this.setState({ notFound: true });
      }
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

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }

  render() {
    const {
      caseStudyList,
      notFound,
      view,
      siteInfo,
      currentCaseStudy,
      isAnimatingToCs,
      scrolledPastCsCover,
    } = this.state;
    const {
      changeView,
      openCaseStudy,
      updateCsScrollPos,
    } = this;

    if (caseStudyList && siteInfo) {
      return (
        <React.Fragment>
          <Nav
            view={view}
            scrolledPastCsCover={scrolledPastCsCover}
            changeView={changeView}
            currentCaseStudy={currentCaseStudy}
          />
          <main className={`views -view-is-${view}`}>
            <View aside name="work" view={view}>
              <Work caseStudyList={caseStudyList} openCaseStudy={openCaseStudy} />
            </View>
            <View name="root" view={view}>
              {
                currentCaseStudy ? (
                  <CaseStudy
                    prismicCtx={this.props.prismicCtx}
                    route={currentCaseStudy}
                    isAnimatingToCs={isAnimatingToCs}
                    updateCsScrollPos={updateCsScrollPos}
                  />
                ) : (<Homepage data={siteInfo} />)
              }
            </View>
            <View aside name="about" view={view} >
              <About prismicCtx={this.props.prismicCtx} />
            </View>
          </main>
        </React.Fragment>
      );
    }
    if (notFound) {
      return <NotFound />;
    }
    return (
      <PreviewRouter prismicCtx={this.props.prismicCtx}>
        <Loading />
      </PreviewRouter>);
  }
}

export default withRouter(App);
