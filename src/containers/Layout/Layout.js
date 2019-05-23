import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components/macro';

import Nav from 'components/Nav/Nav';
import Work from 'components/Work/Work';
import View from 'components/View/View';
import About from 'containers/About/About';
import Root from 'containers/Root/Root';
import CursorDotProvider from 'components/CursorDot/CursorDotProvider';
import theme from 'styles/theme';
import config from 'util/config';
import delay from 'util/delay';
import useWindowSize from 'hooks/useWindowSize';
import useRouterData from './useRouterData';

export const LayoutContext = React.createContext();

function Layout({ view, pathUid }) {
  const [navInverted, setNavInvertState] = useState(false);
  const [projectLaunchStatus, setProjectLaunchStatus] = useState('ready');

  const revertNav = () => setNavInvertState(false);
  const invertNav = () => setNavInvertState(true);

  const csState = useRouterData({ pathUid });

  const launchProject = nextUid => {
    // const isNew = nextUid !== csData.currentUid;
    const isNew = true;
    const update = setProjectLaunchStatus;
    if (isNew) {
      update('transitioning');
      delay(config.projectLaunchDur)
        .then(() => {
          update('afterload');
          return delay(config.afterLaunchDur);
        })
        .then(() => {
          update('ready');
        });
    }
  };

  console.log(csState);

  document.documentElement.style.setProperty(
    '--windowHeight',
    `${useWindowSize().height}px`
  );

  return (
    <CursorDotProvider>
      <ThemeProvider theme={theme}>
        <LayoutContext.Provider
          value={{
            ...{ view },
            ...{ csState },
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
              <Root projectLaunchStatus={projectLaunchStatus} />
            </View>
            <View aside viewName="about" view={view}>
              <About />
            </View>
          </main>
        </LayoutContext.Provider>
      </ThemeProvider>
    </CursorDotProvider>
  );
}

Layout.propTypes = {
  view: PropTypes.string.isRequired,
};

export default Layout;
