import React from 'react';
import PropTypes from 'prop-types';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import Waypoint from 'react-waypoint';
import LayoutContext from 'containers/Layout/LayoutContext';
import Slices from '../slices/Slices';
import Cover from './CaseStudyCover/Cover';
import Styled from '../styled';

const Partials = {};

Partials.Shim = ({ isHome, advanceQueue }) => ( // make one elem
  <CursorAnchor onClick={advanceQueue} detached textId="launch">
    <Styled.Shim home={isHome} />
  </CursorAnchor>
);

Partials.Shim.propTypes = {
  isHome: PropTypes.bool.isRequired,
  advanceQueue: PropTypes.func.isRequired,
};


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

Partials.Cover = Cover;

export default Partials;
