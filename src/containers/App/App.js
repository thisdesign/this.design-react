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
  constructor(props) {
    super(props);
    this.VIEW_TRANSITION_DURATION = 600;
  }

  state = {
    caseStudyList: null,
    siteInfo: null,
    notFound: false,
    view: 'root',
  };

  componentDidUpdate(prevProps) {
    const hasLoadedCtx = prevProps.prismicCtx !== this.props.prismicCtx;
    if (hasLoadedCtx) {
      this.loadData();
      this.props.prismicCtx.toolbar();
      this.setView();
      this.setCurrentCaseStudy();
    }
    window.onpopstate = () => {
      this.setView();
    };
    this.setCurrentCaseStudy();
  }

  setCurrentCaseStudy() {
    const location = this.props.location.pathname;
    if (this.isCaseStudy(location)) {
      this.currentCaseStudy = this.returnCsFromPath(location);
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
    const match = matchPath(path, { path: '/work/:id' });
    return match ? match.params.id : null;
  }

  isCaseStudy = path => this.returnCsFromPath(path) !== null;

  returnViewFromPath = (path) => {
    const isCaseStudy = this.isCaseStudy(path);
    let view = 'root';
    if (path !== '/') {
      view = !isCaseStudy
        ? matchPath(path, { path: '/:view/' }).params.view
        : 'root';
    }
    return view;
  }


  changeView = (view) => {
    if (view !== 'root') {
      setTimeout(() => {
        this.props.history.push(`/${view}/`);
      }, this.VIEW_TRANSITION_DURATION);
    } if (this.currentCaseStudy) {
      this.props.history.push(`/work/${this.currentCaseStudy}`);
    } else {
      this.props.history.push('/');
    }

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
    const {
      caseStudyList, notFound, view, siteInfo,
    } = this.state;
    const { isActive, changeView } = this;

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
                <Nav view={view} changeView={changeView} />
                <main className={`views -view-is-${view}`}>
                  <section className={`${isActive('work')} view--aside`}>
                    <Work caseStudyList={caseStudyList} changeView={changeView} />
                  </section>
                  <section className={isActive('root')}>
                    <Switch>
                      <Route
                        exact
                        path="/work/:uid"
                        render={({ match }) => (
                          <CaseStudy prismicCtx={this.props.prismicCtx} route={match.params.uid} />
                      )}
                      />
                      <Route
                        path="/"
                        render={() => <Homepage data={siteInfo} />}
                      />
                    </Switch>
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
