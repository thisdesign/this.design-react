import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import {
  BrowserRouter,
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
    const isNewUrl = prevProps.location.pathname !== this.props.location.pathname;
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;

    if (hasLoadedCtx) {
      this.loadData();
      this.props.prismicCtx.toolbar();
      this.setView();
    }
    if (isNewUrl) {
      this.setView();
    }
  }

  setView = (forcedView) => {
    if (forcedView) {
      this.setState({ view: forcedView });
    } else {
      this.setState({ view: this.returnViewFromPath(this.props.location.pathname) });
    }
  }

  returnCsFromPath = (path) => {
    matchPath(path, { path: '/work/:id' });
  }

  returnViewFromPath = (path) => {
    const isCaseStudy = matchPath(path, { path: '/work/:id' }) !== null;
    let view = 'root';
    if (path !== '/') {
      view = !isCaseStudy
        ? matchPath(path, { path: '/:view/' }).params.view
        : 'root';
    }
    return view;
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

  render() {
    const {
      caseStudyList, notFound, view, route, siteInfo,
    } = this.state;


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
                <Nav view={view} history={this.props.history} />
                <main className={`views -view-is-${view}`}>
                  <section className={`view work view--aside ${view === 'work'
                      ? '-is-active'
                      : ''}`}
                  >
                    <Work caseStudyList={caseStudyList} />
                  </section>
                  <section className={`view root ${view === 'root'
                      ? '-is-active'
                      : ''}`}
                  >
                    { route
                        ? <CaseStudy prismicCtx={this.props.prismicCtx} route={route} />
                        : <Homepage data={siteInfo} /> }
                  </section>
                  <section className={`view about view--aside ${view === 'about'
                      ? '-is-active'
                      : ''}`}
                  >
                    {/* <About prismicCtx={this.props.prismicCtx} view={view} /> */}
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
