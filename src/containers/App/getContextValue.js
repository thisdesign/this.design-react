export default function getContextValue({ caseStudies, uid }) {
  const contextUids = caseStudies.map(cs => cs.uid);

  let csIndex;
  let csData;


  if (uid) {
    csIndex = contextUids.indexOf(uid);

    if (csIndex !== '-1') {
      const currentCsDoc = caseStudies[csIndex];
      const csDarkState = currentCsDoc.data.preserve_white_nav === 'true';
      const nextIndex = csIndex + 1;
      const isLastCaseStudy = nextIndex === caseStudies.length;
      const nextUsableIndex = isLastCaseStudy ? 0 : nextIndex;
      const nextUid = caseStudies[nextUsableIndex].uid;
      const csIsUnselected = csIndex === -1;
      const csIsNotFound = contextUids.indexOf(uid) === -1;
      const hasCurrentData = csIsNotFound && csIsUnselected;

      csData = {
        csIndex,
        currentCsDoc,
        csDarkState,
        nextIndex,
        isLastCaseStudy,
        nextUsableIndex,
        nextUid,
        csIsUnselected,
        csIsNotFound,
        hasCurrentData,
      };
    }
  }

  const data = {
    contextUids,
    csData,
  };

  return data;
}
