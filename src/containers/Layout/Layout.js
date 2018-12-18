import React, { Component } from 'react';
import Homepage from 'containers/Homepage/Homepage';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import CaseStudyQueue from 'containers/CaseStudyQueue/CaseStudyQueue';
import About from 'containers/About/About';

class Layout extends Component {
  // constructor(props) {
  //   super(props);
  //   this.VIEW_CHANGE_DURATION = 600;
  // }

  state = {
    scrolledPastCsCover: null,
  };

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }

  render() {
    const { scrolledPastCsCover } = this.state;
    const {
      view, caseStudies, notFound, siteInfo, currentCaseStudy,
    } = this.props;
    return (
      <React.Fragment>
        <Nav
          view={view}
          scrolledPastCsCover={scrolledPastCsCover}
          currentCaseStudy={currentCaseStudy}
        />
        <main className={`views -view-is-${view}`}>
          <View aside viewName="work" view={view}>
            <Work caseStudies={caseStudies} />
          </View>
          <View viewName="root" view={view}>
            {
            (!notFound && currentCaseStudy)
              ? <CaseStudyQueue
                caseStudies={caseStudies}
                currentCaseStudy={currentCaseStudy}
                changeProj={this.changeProj}
              />
              : <Homepage data={siteInfo} notFound={notFound} />
          }
          </View>
          <View aside viewName="about" view={view}>
            <About prismicCtx={this.props.prismicCtx} />
          </View>
        </main>
      </React.Fragment>);
  }
}

export default Layout;
