import { useState, useEffect } from 'react';
import Prismic from 'prismic-javascript';

export default function useData({ prismicCtx, uid }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [caseStudies, setCaseStudies] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentCs, setCurrentCs] = useState(undefined);

  const fetchSite = async () =>
    prismicCtx.api.getSingle('site').then(doc => doc);

  const fetchContext = async () =>
    prismicCtx.api.getByUID('context', 'home').then(doc => doc);

  const getPublishedCaseStudies = async () => {
    const api = async () =>
      prismicCtx.api.query(Prismic.Predicates.at('document.type', 'casestudy'));

    return api();
  };

  const ContextCaseStudies = async () => {
    const context = await fetchContext();
    console.log(getPublishedCaseStudies());

    const ids = context.data.case_study_list.map(cs => cs.case_study_item.id);
    return prismicCtx.api.getByIDs(ids).then(doc => doc.results);
  };

  function checkNotFound(item) {
    if (item) return item;
    setNotFound(true);
    return null;
  }

  async function getSiteData() {
    setSiteInfo(checkNotFound(await fetchSite()));
    setCaseStudies(checkNotFound(await ContextCaseStudies()));
  }

  async function awaitLoad() {
    await getSiteData();
    setLoaded(true);
  }

  useEffect(
    () => {
      if (prismicCtx) {
        getSiteData();
        awaitLoad();
      }
    },
    [prismicCtx],
  );

  useEffect(
    () => {
      if (uid) setCurrentCs(uid);
    },
    [uid],
  );

  return {
    siteInfo,
    caseStudies,
    notFound,
    loaded,
    currentCs,
  };
}
