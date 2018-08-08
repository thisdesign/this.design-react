import React from 'react';
import Loading from '../../components/Loading/Loading';
import Nav from '../../components/Nav/Nav';
import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
import CaseStudy from '../CaseStudy/CaseStudy';

import '../../styles/reset.css';
import '../../styles/fonts.css';
import '../../styles/typography.css';
import './App.css';
import './viewPositions.css';

export default class App extends React.Component {
  state = {
    doc: null,
    notFound: false,
    view: 'root',
  };

  componentWillMount() {
    this.fetchPage(this.props);
  }

  componentWillReceiveProps(props) {
    this.fetchPage(props);
  }

  componentDidUpdate() {
    this.props.prismicCtx.toolbar();
  }

  asideIsOpen = () => this.state.view !== 'root'

  handleViewChange = (view) => {
    if (this.asideIsOpen()) {
      this.setState({ view: 'root' });
    } else {
      this.setState({ view });
    }
  }

  isActive = name => (
    this.state.view === name
      ? '-is-active'
      : ''
  )

  fetchPage(props) {
    if (props.prismicCtx) {
      return props.prismicCtx.api.getByUID('context', 'home', {
        fetchLinks: ['casestudy.title', 'casestudy.thumbnail'],
      }).then((doc) => {
        if (doc) {
          this.setState({ doc });
        } else {
          this.fetchPage(props);
        }
      });
    }
    return null;
  }

  render() {
    const { doc, notFound, view } = this.state;
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
              <CaseStudy prismicCtx={this.props.prismicCtx} />
            </section>
            <section className={`view about view--aside ${this.isActive('about')}`}>
              About
            </section>
          </main>
        </React.Fragment>);
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
