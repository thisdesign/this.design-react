import { useContext } from 'react';
import { LayoutContext } from 'containers/Layout/Layout';
import { ApiDataCtx } from 'containers/App/App';

export default function useCtx() {
  const { csState } = useContext(LayoutContext);
  const { contextUids } = useContext(ApiDataCtx);
  const { caseStudySelected } = csState;

  const currentIndex = 1;
  const nextIndex = 2;

  const nextUid = 'loraf';

  const csTrack = caseStudySelected ? [currentIndex, nextIndex] : [0, null];

  return { csTrack, nextUid };
}
