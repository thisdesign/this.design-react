import { useContext } from 'react';
import { LayoutContext } from 'containers/Layout/Layout';
import { ApiDataCtx } from 'containers/App/App';

export default function useCtx() {
  const { csState } = useContext(LayoutContext);
  const { contextUids, contextCaseStudies } = useContext(ApiDataCtx);

  const { caseStudySelected } = csState;

  console.log(contextUids, contextCaseStudies);

  const currentIndex = 0;
  const nextIndex = 1;

  const nextUid = 'loraf';
  const csTrack = caseStudySelected ? [0, null] : [currentIndex, nextIndex];

  return { csTrack, nextUid };
}
