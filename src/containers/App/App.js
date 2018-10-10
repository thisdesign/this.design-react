import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // Redirect
} from 'react-router-dom';

import React from 'react';
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

export default class App extends React.Component {
  state = {
    /*
    contains high-level site information
    (title, desc, homepage vids, etc)
    */
    siteData: null,
    /*
    Error catching
    */
    notFound: false,
    view: 'root',
    route: null,
  };


  componentWillReceiveProps(props) {
    const { siteData, caseStudyList } = this.state;
    if (siteData === null) {
      this.getSiteData(props);
    }
    if (caseStudyList === null) {
      this.getCaseStudyList(props);
    }
    // this.parseRoute(); // remove
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  /*
  Loads API data for the "site" single which is
  the page that handles all the top-level site info
  */

  getSiteData = (props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ siteData: doc });
      } else {
        this.setState({ notFound: !doc });
      }
    });
  };

  getViewFromLocation = (location) => {
    const urlItems = location.pathname.split('/').filter(v => v !== '');
    const isSingleItem = urlItems.length === 1;

    if (isSingleItem && urlItems.includes('work')) {
      return 'work';
    } else if (isSingleItem && urlItems.includes('about')) {
      return 'about';
    }
    return 'root';
  }

  isViewActive = (path, location) => {
    const isActive = this.getViewFromLocation(location) === path;
    return isActive ? '-is-active' : '';
  }

  render() {
    const {
      notFound,
      siteData,
    } = this.state;
    const { prismicCtx, caseStudyList } = this.props;
    if (siteData) {
      return (
        <Router>
          <Route
            render={({ location }) => (
              <React.Fragment>
                <Nav />
                <main className={`views -view-is-${this.getViewFromLocation(location)}`}>
                  <section className={`view work view--aside ${this.isViewActive('work', location)}`} >
                    <Work
                      prismicCtx={prismicCtx}
                      caseStudyList={caseStudyList}
                    />
                  </section>
                  <section className={`view about view--aside ${this.isViewActive('about', location)}`} >
                    {null}
                  </section>
                  <section className="view root">
                    <Switch location={location}>
                      <Route
                        exact
                        path="/preview"
                        render={routeProps => <Preview {...routeProps} prismicCtx={prismicCtx} />}
                      />
                      <Route
                        exact
                        path="/work/:id"
                        render={({ match }) => (
                          <CaseStudy route={match.params.id} prismicCtx={prismicCtx} />
                        )}
                      />
                      <Route
                        path="/"
                        render={routeProps => <Homepage data={siteData} {...routeProps} prismicCtx={prismicCtx} />}
                      />
                    </Switch>
                  </section>
                </main>
              </React.Fragment>

            )}
          />
        </Router>


      );
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
