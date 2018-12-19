import React, { Component } from 'react';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import About from 'containers/About/About';
import Root from 'containers/Root/Root';

class Layout extends Component {
  state = {
    scrolledPastCsCover: null,
    transitioningToCs: false,
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
            <Root
              notFound={notFound}
              currentCaseStudy={currentCaseStudy}
              caseStudies={caseStudies}
              siteInfo={siteInfo}
              isHome={!(!notFound && currentCaseStudy)}
              loading={false}
            />
          </View>
          <View aside viewName="about" view={view}>
            <About prismicCtx={this.props.prismicCtx} />
          </View>
        </main>
      </React.Fragment>);
  }
}

export default Layout;
