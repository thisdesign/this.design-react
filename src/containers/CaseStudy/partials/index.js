import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CursorAnchor from 'components/CursorDot/CursorAnchor';
import Waypoint from 'react-waypoint';
import LayoutContext from 'containers/Layout/LayoutContext';
import Slices from '../slices/Slices';
import Cover from './CaseStudyCover/Cover';
import Styled from '../styled';

const Partials = {};

Partials.Shim = ({ isHome, initCsChange }) => ( // make one elem
  <CursorAnchor onClick={!isHome ? initCsChange : null} detached textId="launch">
    <Styled.Shim home={isHome} />
  </CursorAnchor>
);

Partials.Shim.propTypes = {
  isHome: PropTypes.bool.isRequired,
  initCsChange: PropTypes.func.isRequired,
};


const NavChanger = () => {
  const {
    invertNav,
    revertNav,
    csData: { csDarkState },
  } = useContext(LayoutContext);

  return (
    <Waypoint onPositionChange={({ currentPosition }) => {
        if (currentPosition === 'above' && !csDarkState) {
          invertNav();
        } else {
          revertNav();
        }
      }}
    />
  );
};

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

Partials.NavChanger = NavChanger;
Partials.Cover = Cover;

export default Partials;
