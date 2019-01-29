import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';

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

    if (nextUid !== this.props.csData.currentUid) {
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


Layout.propTypes = {
  csData: PropTypes.shape({
    caseStudies: PropTypes.array,
    currentDoc: PropTypes.object,
    currentIndex: PropTypes.number,
    currentUid: PropTypes.string,
    isDark: PropTypes.bool,
    nextIndex: PropTypes.number,
    nextUid: PropTypes.string,
    unselected: PropTypes.bool,
  }).isRequired,
  notFound: PropTypes.bool.isRequired, //eslint-disable-line
  siteInfo: PropTypes.object, //eslint-disable-line
  prismicCtx: PropTypes.object, //eslint-disable-line
  view: PropTypes.string.isRequired,
};
export default Layout;
