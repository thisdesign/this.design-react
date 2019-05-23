import { useContext } from 'react';
import { LayoutContext } from 'containers/Layout/Layout';
import { ApiDataCtx } from 'containers/App/App';

export default function useCsTrack() {
  const { contextUids } = useContext(ApiDataCtx);

  const {
    inContext,
    currentUid,
    caseStudySelected,
    nextIndex,
    currentIndex,
  } = useContext(LayoutContext).csState;

  const csTrack = (() => {
    if (inContext) {
      return [currentIndex, nextIndex];
    } else if (!caseStudySelected) {
      return [0, null];
    }
    return [currentUid, contextUids[0]];
  })();

  return csTrack;
}
