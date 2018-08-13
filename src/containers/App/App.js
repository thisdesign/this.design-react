import React from 'react';
import Loading from '../../components/Loading/Loading';
import Homepage from '../../components/Homepage/Homepage';
import Nav from '../../components/Nav/Nav';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';
import About from '../About/About';
import getByUID from '../../util/getByUID';

import '../../styles/reset.css';
import '../../styles/fonts.css';
import '../../styles/typography.css';
import '../../styles/columns.css';
import '../../styles/layout.css';
import './App.css';
import './viewPositions.css';

export default class App extends React.Component {
  state = {
    doc: null,
    site: null,
    notFound: false,
    view: 'root',
    route: null,
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

  getContextDoc = (props = this.props) => {
    getByUID({
      props,
      component: this,
      pageType: 'context',
      uid: 'home',
      fetchLinks: ['casestudy.title', 'casestudy.thumbnail'],
    });
  }

  getSiteDoc =(props) => {
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ site: doc });
      } else {
        this.setState({ notFound: !doc });
      }
    });
  }

  parseRoute = () => {
    const { hash } = window.location;
    const string = hash.substring(1);
    const uid = string !== '' ? string : null;
    this.setState({ route: uid });
  }

  isActive = name => (
    this.state.view === name
      ? '-is-active'
      : ''
  )

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
