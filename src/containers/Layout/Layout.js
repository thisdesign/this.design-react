import React, { Component } from 'react';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import About from 'containers/About/About';
import Root from 'containers/Root/Root';
import LayoutContext from './LayoutContext';

class Layout extends Component {
  state = {
    scrolledPastCsCover: null,
  };

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }

  render() {
    const {
      scrolledPastCsCover,
    } = this.state;
    const {
      view,
      caseStudies,
      notFound,
      siteInfo,
      currentCaseStudy,
    } = this.props;
    return (
      <LayoutContext.Provider
        value={{
          scrolledPastCsCover,
          notFound,
          siteInfo,
          caseStudies,
          currentCaseStudy,
          view,
        }}
      >
        <Nav />
        <main className={`views -view-is-${view}`}>
          <View aside viewName="work" view={view}>
            <Work />
          </View>
          <View viewName="root" view={view}>
            <Root
              isHome={!(!notFound && currentCaseStudy)}
            />
          </View>
          <View aside viewName="about" view={view}>
            <About prismicCtx={this.props.prismicCtx} />
          </View>
        </main>
      </LayoutContext.Provider>);
  }
}

export default Layout;
