import { useContext, useState, useEffect } from 'react';
import { ApiDataCtx } from 'containers/App/App';

export default function useRouterData({ pathUid }) {
  const { contextUids } = useContext(ApiDataCtx);
  const [currentUid, setCurrentUid] = useState(pathUid);

  const currentIndex = (() => {
    const index = contextUids.indexOf(currentUid);
    return index > -1 ? index : null;
  })();

  useEffect(
    () => {
      if (pathUid !== undefined) {
        setCurrentUid(pathUid);
      }
    },
    [pathUid]
  );

  return {
    caseStudySelected: !!currentUid,
    inContext: !!currentIndex,
    currentUid,
    currentIndex,
    // nextUid: null,
    // nextIndex: null,
  };
}
