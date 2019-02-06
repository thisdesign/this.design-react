import { useEffect, useState } from 'react';
import useWindowSize from './useWindowSize';

export default function useDOMWidth(ref) {
  const [width, setWidth] = useState(0);
  const windowWidth = useWindowSize();

  useEffect(() => {
    setWidth(ref.current.offsetWidth);
  }, [windowWidth]);

  return width;
}
