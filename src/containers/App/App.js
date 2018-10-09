import 'styles/reset.css';
import 'styles/fonts.css';
import 'styles/typography.css';
import 'styles/layout.css';

import React from 'react';
import Loading from '../../components/Loading/Loading';
import Homepage from '../../components/Homepage/Homepage';
// import Nav from '../../components/Nav/Nav';
// import Work from '../../components/Work/Work';
import NotFound from '../../components/NotFound/NotFound';
// import CaseStudy from '../CaseStudy/CaseStudy';
// import About from '../About/About';

import './App.css';
import './viewPositions.css';

export default class App extends React.Component {
  state = {
    /*
    contains array of info & links to case studies
    */
    caseStudyList: null,
    /*
    contains high-level site information
    (title, desc, homepage vids, etc)
    */
    siteData: null,
    /*
    Error catching
    */
    notFound: false,
    // view: 'root', // rm. if needed when implimenting RR
    // route: null, // rm. if needed when implimenting RR
  };

  // componentWillMount() {
  //   this.parseRoute(); // remove
  // }

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
   Loads API data for the "context doc"
   which is just the list of case studies
  */

  getCaseStudyList = (props = this.props) => {
    const fetchLinks = ['casestudy.title', 'casestudy.thumbnail', 'casestudy.svg'];

    props.prismicCtx.api.getByUID('context', 'home', { fetchLinks }).then((doc) => {
      if (doc) {
        this.setState({ caseStudyList: doc.data.case_study_list });
      } else {
        this.setState({ notFound: true });
      }
    });
  };

  /*
  Loads API data for the "site" single which is
  the page that handles all the top-level site info
  */

  getSiteData = (props) => {
    console.log('getting site data');
    props.prismicCtx.api.getSingle('site').then((doc) => {
      if (doc) {
        this.setState({ siteData: doc });
      } else {
        this.setState({ notFound: !doc });
      }
    });
  };

  /*
  Temporary hash router.
  Remove when implimenting ReactRouter
  */

  // parseRoute = () => {
  //   const { hash } = window.location;
  //   const string = hash.substring(1);
  //   const uid = string !== '' ? string : null;
  //   this.setState({ route: uid });
  // };

  /*
  -is-active refers to the currently
  active route (root/work/about)
  */

  isActive = name => (this.state.view === name ? '-is-active' : '');

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
  };

  render() {
    const {
      // caseStudyList,
      notFound,
      // view,
      // route,
      siteData,
    } = this.state;
    if (siteData) {
      return <Homepage data={siteData} />;
      // return (
      //   <React.Fragment>
      //     <Nav handleViewChange={this.handleViewChange} view={view} />
      //     <main className={`views -view-is-${view}`}>
      //       <section className={`view work view--aside ${this.isActive('work')}`}>
      //         <Work
      //           caseStudyList={caseStudyList}
      //           handleViewChange={this.handleViewChange}
      //         />
      //       </section>
      //       <section className={`view root ${this.isActive('root')}`}>
      //         {
      //           route
      //           ? <CaseStudy prismicCtx={this.props.prismicCtx} route={route} />
      //           : <Homepage data={siteData} />
      //         }
      //       </section>
      //       <section className={`view about view--aside ${this.isActive('about')}`}>
      //         <About
      //           prismicCtx={this.props.prismicCtx}
      //           view={view}
      //         />
      //       </section>
      //     </main>
      //   </React.Fragment>);
    } else if (notFound) {
      return <NotFound />;
    }
    return <Loading />;
  }
}
