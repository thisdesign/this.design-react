import { useEffect, useState } from "react";

export default function useRouterData({ currentIndex: routeDerrivedIndex }) {
  const [currentIndex, setCurrentIndex] = useState(routeDerrivedIndex);

  console.log(routeDerrivedIndex);
  useEffect(
    () => {
      if (routeDerrivedIndex !== undefined) {
        setCurrentIndex(routeDerrivedIndex);
      }

      return () => {
        console.log("unmounted");
      };
    },
    [routeDerrivedIndex]
  );
  return {
    caseStudySelected: null,
    inContext: null,
    nextUid: null,
    currentUid: null,
    nextIndex: null,
    currentIndex
  };
}
