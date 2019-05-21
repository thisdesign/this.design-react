import 'styles/reset.scss';
import 'styles/fonts.scss';
import 'styles/typography.scss';
import 'styles/layout.scss';
import Prismic from 'prismic-javascript';

import React from 'react';
import PropTypes from 'prop-types';

import './App.scss';

async function useApiData() {
  const api = await Prismic.api('https://thisstaging.prismic.io/api/v2');
  const caseStudies = await api
    .query([Prismic.Predicates.at('document.type', 'casestudy')], {
      pageSize: 100,
    })
    .then(res => res.results);

  const contextUids = await api
    .getByUID('context', 'home')
    .then(doc => doc)
    .then(res => res.data.case_study_list.map(cs => cs.case_study_item.uid));

  const contextCaseStudies = contextUids.map(uid => caseStudies[caseStudies.map(data => data.uid).indexOf(uid)]);

  console.log(contextCaseStudies);
  return { api };
}

function App({ prismicCtx, uid, view }) {
  const { api } = useApiData();

  return null;
}

App.defaultProps = {
  uid: null,
};

App.propTypes = {
  uid: PropTypes.string,
  view: PropTypes.string.isRequired,
  prismicCtx: PropTypes.object //eslint-disable-line
};

export default React.memo(App);
