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
import '../../styles/grid.css';
import './App.css';
import './viewPositions.css';

export default class App extends React.Component {
  state = {
    doc: null,
    notFound: false,
    view: 'root',
    route: null,
  };

  componentWillMount() {
    this.parseRoute();
  }

  componentWillReceiveProps(props) {
    this.getContextDoc(props);
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
      fetchLinks: ['casestudy.title', 'casestudy.thumbnail', 'site.image'],
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

  handleViewChange = (view) => {
    if (this.asideIsOpen()) {
      this.setState({ view: 'root' });
    } else {
      this.setState({ view });
    }
  }

  asideIsOpen = () => this.state.view !== 'root'


  render() {
    const {
      doc, notFound, view, route,
    } = this.state;
    if (doc) {
      return (
        <React.Fragment>
          <Nav handleViewChange={this.handleViewChange} asideIsOpen={this.asideIsOpen} />
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
                : <Homepage data={doc.data.site} />
              }
            </section>
            <section className={`view about view--aside ${this.isActive('about')}`}>
              <About prismicCtx={this.props.prismicCtx} />
            </section>
          </main>
        </React.Fragment>);
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
