import React from 'react';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import Waypoint from 'react-waypoint';
import LayoutContext from 'containers/Layout/LayoutContext';
import Slices from '../slices/Slices';
import CaseStudyCover from './CaseStudyCover/CaseStudyCover';

const Partials = {};

Partials.Shim = ({ isHome, advanceQueue }) => (
  <CursorAnchor
    className={`casestudy__shim ${isHome ? '-isHome' : ''}`}
    onClick={advanceQueue}
    detached
    textId="launch"
  />
);

Partials.NavChanger = () => (
  <LayoutContext.Consumer>
    {({ invertNav, revertNav, csData }) => (
      <Waypoint onPositionChange={({ currentPosition }) => {
        if (currentPosition === 'above' && !csData.isDark) {
          invertNav();
        } else {
          revertNav();
        }
      }}
      />
    )}
  </LayoutContext.Consumer>
);

Partials.Body = ({ next, isHome, doc }) => (!next && !isHome) && (
<LayoutContext.Consumer>
  {({ csData }) => (
    <>
      <Partials.NavChanger />
      <Slices sliceData={doc.data.content} title={csData.alt} />
    </>
  )}
</LayoutContext.Consumer>
);

Partials.Cover = CaseStudyCover;

export default Partials;
