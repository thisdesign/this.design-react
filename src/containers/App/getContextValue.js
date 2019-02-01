export default function getContextValue({ caseStudies, uid }) {
  const contextUids = caseStudies.map(cs => cs.uid);

  const csIndex = contextUids.indexOf(uid);
  const unselected = csIndex === -1;

  let csData = {
    caseStudies,
    unselected,
    currentIndex: unselected ? null : csIndex,
  };

  if (!unselected) {
    const currentCsDoc = caseStudies[csIndex];
    const csDarkState = currentCsDoc.data.preserve_white_nav === 'true';
    const nextIndex = csIndex + 1;
    const isLastCaseStudy = nextIndex === caseStudies.length;
    const nextUsableIndex = isLastCaseStudy ? 0 : nextIndex;
    const nextUid = caseStudies[nextUsableIndex].uid;
    const csIsNotFound = contextUids.indexOf(uid) === -1;
    const hasCurrentData = csIsNotFound && unselected;

    csData = {
      ...csData,
      csIndex,
      currentCsDoc,
      csDarkState,
      nextIndex,
      isLastCaseStudy,
      nextUsableIndex,
      nextUid,
      csIsNotFound,
      hasCurrentData,
    };
  }

  const data = {
    contextUids,
    csData,
  };

  return data;
}
