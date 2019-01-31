import { useState, useEffect } from 'react';

export default function useData({ prismicCtx }) {
  const [siteInfo, setSiteInfo] = useState(null);
  const [caseStudies, setCaseStudies] = useState(null);
  const [notFound, setNotFound] = useState(false);


  const fetchSite = async () => prismicCtx.api.getSingle('site').then(doc => doc);
  const fetchContext = async () => prismicCtx.api.getByUID('context', 'home').then(doc => doc);
  const fetchCaseStudies = async () => {
    const context = await fetchContext();
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
    setCaseStudies(checkNotFound(await fetchCaseStudies()));
  }

  useEffect(() => {
    if (prismicCtx) {
      getSiteData();
    }
  }, [prismicCtx]);

  return {
    siteInfo,
    caseStudies,
    notFound,
  };
}
