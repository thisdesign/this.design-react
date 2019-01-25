import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import About from 'containers/About/About';
import config from 'util/config';
import delay from 'util/delay';
import Root from 'containers/Root/Root';
import LayoutContext from './LayoutContext';
import theme from './theme';

class Layout extends Component {
  state = {
    scrolledPastCsCover: null,
    projectLaunchStatus: 'ready',
    navInverted: false,
  };

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
    const { view } = this.props;
    const { projectLaunchStatus } = this.state;
    return (
      <ThemeProvider theme={theme}>
        <LayoutContext.Provider
          value={{
          ...this.props,
          scrolledPastCsCover: this.state.scrolledPastCsCover,
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
                isHome={this.props.csData.unselected}
              />
            </View>
            <View aside viewName="about" view={view}>
              <About prismicCtx={this.props.prismicCtx} />
            </View>
          </main>
        </LayoutContext.Provider>
      </ThemeProvider>);
  }
}

export default Layout;
