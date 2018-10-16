import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  matchPath,
  Redirect,
} from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Homepage from '../../components/Homepage/Homepage';
import Nav from '../../components/Nav/Nav';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';
import About from '../About/About';
import Preview from '../PrismicApp/Preview/Preview';
import './App.css';
import './viewPositions.css';

class App extends React.Component {
  state = {
    caseStudyList: null,
    siteInfo: null,
    notFound: false,
    view: 'root',
    currentCaseStudy: null,
  };

  componentDidUpdate(prevProps) {
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

  isActive = view => (this.state.view === view ? `view ${view} -is-active` : `view ${view}`)

  render() {
    console.log('app rendered', this.state.currentCaseStudy);
    const {
      caseStudyList, notFound, view, siteInfo, currentCaseStudy,
    } = this.state;
    const {
      isActive, changeView, openCaseStudy,
    } = this;

    if (caseStudyList && siteInfo) {
      return (
        <Switch>
          <Route
            exact
            path="/preview"
            render={routeProps => <Preview {...routeProps} prismicCtx={this.props.prismicCtx} />}
          />
          <Route
            path="/@:ctx"
            render={({ match }) => (
              <Redirect to={`/?=${match.params.ctx}`} />
              )}
          />
          <Route
            path="/"
            render={() => (
              <React.Fragment>
                <Nav view={view} changeView={changeView} currentCaseStudy={currentCaseStudy} />
                <main className={`views -view-is-${view}`}>
                  <section className={`${isActive('work')} view--aside`}>
                    <Work caseStudyList={caseStudyList} openCaseStudy={openCaseStudy} />
                  </section>
                  <section className={isActive('root')}>
                    { currentCaseStudy ? (
                      <CaseStudy
                        prismicCtx={this.props.prismicCtx}
                        route={currentCaseStudy}
                      />) : (
                        <Homepage data={siteInfo} />
                      )}
                  </section>
                  <section className={`${isActive('about')} view--aside`}>
                    <About prismicCtx={this.props.prismicCtx} />
                  </section>
                </main>
              </React.Fragment>
              )}
          />
          <Route component={NotFound} />
        </Switch>
      );
    }
    if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}

export default withRouter(App);
