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
    projectLaunchStatus: 'ready',
  };

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }

  launchProject = () => {
    const TRANSITION_DURATION = 600;
    const AFTERLOAD_DURATION = 600;

    function delay(time) {
      return new Promise((resolve) => {
        setTimeout(resolve, time);
      });
    }

    this.setState({ projectLaunchStatus: 'transitioning' });

    delay(TRANSITION_DURATION).then(() => {
      this.setState({ projectLaunchStatus: 'afterload' });
      return delay(AFTERLOAD_DURATION);
    }).then(() => {
      this.setState({ projectLaunchStatus: 'ready' });
    });
  }

  render() {
    const { view, notFound, currentCaseStudy } = this.props;
    const { projectLaunchStatus } = this.state;
    return (
      <LayoutContext.Provider
        value={{
          notFound,
          currentCaseStudy,
          view,
          projectLaunchStatus,
          scrolledPastCsCover: this.state.scrolledPastCsCover,
          siteInfo: this.props.siteInfo,
          caseStudies: this.props.caseStudies,
          launchProject: this.launchProject,
        }}
      >
        <Nav />
        <main className={`views -view-is-${view}`}>
          <View aside viewName="work" view={view}>
            <Work />
          </View>
          <View viewName="root" view={view}>
            <Root
              projectLaunchStatus={projectLaunchStatus}
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
