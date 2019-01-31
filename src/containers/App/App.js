import 'styles/reset.scss';
import 'styles/fonts.scss';
import 'styles/typography.scss';
import 'styles/layout.scss';

import React from 'react';
import PropTypes from 'prop-types';
// import PreviewRouter from 'containers/PrismicApp/PreviewRouter/PreviewRouter';
// import Loading from 'components/Loading/Loading';
import Layout from 'containers/Layout/Layout';
// import flatten from 'array-flatten';

import getContextValue from './getContextValue';
import useSiteData from './useSiteData';
import './App.scss';

const AppContext = React.createContext();


function App({
  prismicCtx, uid, view,
}) {
  const { siteInfo, caseStudies, notFound } = useSiteData({ prismicCtx });

  if (siteInfo && caseStudies) {
    const appContext = getContextValue({ caseStudies, uid, notFound });
    return (
      <AppContext.Provider value={appContext}>
        <Layout view={view} />
      </AppContext.Provider>
    );
  }
  return null;
}

App.propTypes = {
  uid: PropTypes.string,
  view: PropTypes.string.isRequired,
  prismicCtx: PropTypes.object, //eslint-disable-line
};

export default App;
