import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import { Route, withRouter, matchPath } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import Homepage from '../../components/Homepage/Homepage';
import Nav from '../../components/Nav/Nav';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';
import About from '../About/About';
import './App.css';
import './viewPositions.css';

class App extends React.Component {
  state = {
    /*
    contains array of info & links to case studies
    */
    caseStudyList: null,
    /*
    contains high-level site information
    (title, desc, homepage vids, etc)
    */
    siteInfo: null,
    /*
    Error catching
    */
    notFound: false,
    view: 'root', // rm. if needed when implimenting RR
    route: null, // rm. if needed when implimenting RR
  };

  componentDidUpdate(prevProps) {
    if (prevProps.prismicCtx !== this.props.prismicCtx) {
      this.loadData();
      this.props.prismicCtx.toolbar();
      this.setView();
    }
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setView('work');
    }
  }

  getViewFromRoute() {
    const path = this.props.location.pathname;
    const isCaseStudy = matchPath(path, { path: '/work/:id' }) !== null;
    let view = 'root';
    if (path !== '/') {
      ({ view } = !isCaseStudy ? matchPath(path, { path: '/:view/' }).params : view);
    }
    return view;
  }

  setView = (nextView) => {
    if (nextView) {
      this.setState({ view: nextView });
    } else {
      const route = this.getViewFromRoute();
      this.setState({ view: route });
    }
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
    console.log('RENDER');
    const {
      caseStudyList, notFound, view, route, siteInfo,
    } = this.state;

    if (caseStudyList && siteInfo) {
      return (<React.Fragment>
        <Nav handleViewChange={this.handleViewChange} view={view} />
        <main className={`views -view-is-${view}`}>
          <section className={`view work view--aside ${view === 'work'
              ? '-is-active'
              : ''}`}
          >
            <Work caseStudyList={caseStudyList} handleViewChange={this.handleViewChange} />
          </section>
          <section className={`view root ${view === 'root'
              ? '-is-active'
              : ''}`}
          >
            {
              route
                ? <CaseStudy prismicCtx={this.props.prismicCtx} route={route} />
                : <Homepage data={siteInfo} />
            }
          </section>
          <section className={`view about view--aside ${view === 'about'
              ? '-is-active'
              : ''}`}
          >
            <Route path="/about" render={() => (<About prismicCtx={this.props.prismicCtx} view={view} />)} />
          </section>
        </main>
      </React.Fragment>);
    }
    if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}

export default withRouter(App);
