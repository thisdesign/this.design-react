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
      if (pathUid !== null) {
        setCurrentUid(pathUid);
      }
    },
    [pathUid]
  );

  const next =
    currentIndex !== null
      ? (() => {
          const nextIndex = (currentIndex + 1) % contextUids.length;
          const nextUid = contextUids[nextIndex];
          return {
            currentIndex,
            nextIndex,
            nextUid,
          };
        })()
      : null;

  return {
    caseStudySelected: !!currentUid,
    inContext: currentIndex !== null,
    currentUid,
    ...next,
  };
}
