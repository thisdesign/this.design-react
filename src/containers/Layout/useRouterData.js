import { useContext } from "react";
import { ApiDataCtx } from "containers/App/App";

export default function useRouterData({ pathUid }) {
  const { contextUids, caseStudies } = useContext(ApiDataCtx);
  const caseStudyUids = caseStudies.map(cs => cs.uid);

  const notFound = pathUid && caseStudyUids.indexOf(pathUid) === -1;
  const inContext = contextUids.indexOf(pathUid) === -1;

  return {
    notFound,
    caseStudySelected: !!pathUid,
    inContext,
    currentUid: null,
    nextUid: null,
    nextIndex: null
  };
}
