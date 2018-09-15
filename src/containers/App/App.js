import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import Loading from '../../components/Loading/Loading';
import Homepage from '../../components/Homepage/Homepage';
import Nav from '../../components/Nav/Nav';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';
import About from '../About/About';
import getByUID from '../../util/getByUID';

import './App.css';
import './viewPositions.css';

export default class App extends React.Component {
  state = {
    doc: null,
    site: null,
    notFound: false,
    view: 'root', // rm. if needed when implimenting RR
    route: null, // rm. if needed when implimenting RR
  };

  componentWillMount() {
    this.parseRoute();
  }

  componentWillReceiveProps(props) {
    this.getContextDoc(props);
    this.getSiteDoc(props);
    this.parseRoute();
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  /*
   Loads API data for the "context doc"
   which is just the list of case studies
  */

  getContextDoc = (props = this.props) => {
    getByUID({
      props,
      component: this,
      pageType: 'context',
      uid: 'home',
      fetchLinks: ['casestudy.title', 'casestudy.thumbnail'],
    });
  }

  /*
  Loads API data for the "site" single which is
  the page that handles all the top-level site info
  */

  getSiteDoc =(props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ site: doc });
      } else {
        this.setState({ notFound: !doc });
      }
    });
  }

  /*
  Temporary hash router.
  Remove when implimenting ReactRouter
  */

  parseRoute = () => {
    const { hash } = window.location;
    const string = hash.substring(1);
    const uid = string !== '' ? string : null;
    this.setState({ route: uid });
  }

  /*
  -is-active refers to the currently
  active route (root/work/about)
  */

  isActive = name => (
    this.state.view === name
      ? '-is-active'
      : ''
  )

  /*
  Temporary routing for root/work/about.
  */

  handleViewChange = (updatedView) => {
    const asideIsOpen = this.state.view !== 'root';
    if (asideIsOpen) {
      this.setState({ view: 'root' });
    } else {
      this.setState({ view: updatedView });
    }
  }


  render() {
    const {
      doc, notFound, view, route, site,
    } = this.state;

    if (doc && site) {
      return (
        <React.Fragment>
          <Nav handleViewChange={this.handleViewChange} view={view} />
          <main className={`views -view-is-${view}`}>
            <section className={`view work view--aside ${this.isActive('work')}`}>
              <Work
                caseStudyList={doc.data.case_study_list}
                handleViewChange={this.handleViewChange}
              />
            </section>
            <section className={`view root ${this.isActive('root')}`}>
              {
                route
                ? <CaseStudy prismicCtx={this.props.prismicCtx} route={route} />
                : <Homepage data={site} />
              }
            </section>
            <section className={`view about view--aside ${this.isActive('about')}`}>
              <About
                prismicCtx={this.props.prismicCtx}
                view={view}
              />
            </section>
          </main>
        </React.Fragment>);
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
