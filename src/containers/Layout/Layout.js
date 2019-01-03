import React, { Component } from 'react';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import About from 'containers/About/About';
import config from 'util/config';
import delay from 'util/delay';
import Root from 'containers/Root/Root';
import LayoutContext from './LayoutContext';

class Layout extends Component {
  state = {
    scrolledPastCsCover: null,
    projectLaunchStatus: 'ready',
    navInverted: false,
  };

  updateCsScrollPos = (scrolledPastCsCover) => {
    this.setState({ scrolledPastCsCover });
  }

  invertNav = () => {
    this.setState({ navInverted: true });
  }

  revertNav = () => {
    this.setState({ navInverted: false });
  }

  launchProject = (nextUid) => {
    const update = statusName =>
      this.setState({ projectLaunchStatus: statusName });

    if (nextUid !== this.props.currentCaseStudy) {
      update('transitioning');
      delay(config.projectLaunchDur).then(() => {
        update('afterload');
        return delay(config.afterLaunchDur);
      }).then(() => {
        update('ready');
      });
    }
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
          navInverted: this.state.navInverted,
          invertNav: this.invertNav,
          revertNav: this.revertNav,
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
