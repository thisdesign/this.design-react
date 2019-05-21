import React, { useState } from "react";
import PropTypes from "prop-types";
import { ThemeProvider } from "styled-components/macro";

import Nav from "components/Nav/Nav";
import Work from "components/Work/Work";
import View from "components/View/View";
import About from "containers/About/About";
import config from "util/config";
import theme from "styles/theme";
import delay from "util/delay";
import Root from "containers/Root/Root";
import useWindowSize from "hooks/useWindowSize";

import LayoutContext from "./LayoutContext";

function Layout({ view, currentUid, siteInfo, currentIndex }) {
  const [navInverted, setNavInvertState] = useState(false);
  const [projectLaunchStatus, setProjectLaunchStatus] = useState("ready");

  const revertNav = () => setNavInvertState(false);
  const invertNav = () => setNavInvertState(true);

  const launchProject = nextUid => {
    // const isNew = nextUid !== csData.currentUid;
    const isNew = true;
    const update = setProjectLaunchStatus;
    if (isNew) {
      update("transitioning");
      delay(config.projectLaunchDur)
        .then(() => {
          update("afterload");
          return delay(config.afterLaunchDur);
        })
        .then(() => {
          update("ready");
        });
    }
  };

  document.documentElement.style.setProperty(
    "--windowHeight",
    `${useWindowSize().height}px`
  );

  return (
    <ThemeProvider theme={theme}>
      <LayoutContext.Provider
        value={{
          ...{
            view,
            currentUid,
            currentIndex
            // siteInfo
          },
          launchProject,
          navInverted,
          invertNav,
          revertNav
        }}
      >
        <Nav />
        <main className={`views -view-is-${view}`}>
          <View aside viewName="work" view={view}>
            {/* <Work /> */}
          </View>
          <View viewName="root" view={view}>
            currentUid: {currentUid}
            {/* <Root projectLaunchStatus={projectLaunchStatus} /> */}
          </View>
          <View aside viewName="about" view={view}>
            {/* <About prismicCtx={prismicCtx} /> */}
          </View>
        </main>
      </LayoutContext.Provider>
    </ThemeProvider>
  );
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
    unselected: PropTypes.bool
  }).isRequired,
  notFound: PropTypes.bool.isRequired, //eslint-disable-line
  siteInfo: PropTypes.object, //eslint-disable-line
  prismicCtx: PropTypes.object, //eslint-disable-line
  view: PropTypes.string.isRequired
};
export default React.memo(Layout);
