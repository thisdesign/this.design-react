import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';

const Shim = ({ isHome, advanceQueue }) => (
  <CursorAnchor
    className={`casestudy__shim ${isHome ? '-isHome' : ''}`}
    onClick={advanceQueue}
    detached
    textId="launch"
  />
);

export default Shim;
