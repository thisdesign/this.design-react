import React, { useState } from 'react';
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

function Layout(props) {
  const { view } = props;

  const [navInverted, setNavInvertState] = useState(false);
  const [projectLaunchStatus, setProjectLaunchStatus] = useState('ready');

  const revertNav = () => setNavInvertState(false);
  const invertNav = () => setNavInvertState(true);

  const launchProject = (nextUid) => {
    const isNew = nextUid !== props.csData.currentUid;
    const update = setProjectLaunchStatus;
    if (isNew) {
      update('transitioning');
      delay(config.projectLaunchDur).then(() => {
        update('afterload');
        return delay(config.afterLaunchDur);
      }).then(() => {
        update('ready');
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <LayoutContext.Provider
        value={{
          ...props,
          launchProject,
          navInverted,
          invertNav,
          revertNav,
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
              isHome={props.csData.unselected}
            />
          </View>
          <View aside viewName="about" view={view}>
            <About prismicCtx={props.prismicCtx} />
          </View>
        </main>
      </LayoutContext.Provider>
    </ThemeProvider>);
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
export default React.memo(Layout);
