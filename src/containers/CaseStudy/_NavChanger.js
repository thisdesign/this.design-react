import React from 'react';
import Waypoint from 'react-waypoint';
import LayoutContext from 'containers/Layout/LayoutContext';

const NavChanger = () => (
  <LayoutContext.Consumer>
    {({ invertNav, revertNav }) => (
      <Waypoint onPositionChange={({ currentPosition }) => {
        if (currentPosition === 'above') {
          invertNav();
        } else {
          revertNav();
        }
      }}
      />
    )}
  </LayoutContext.Consumer>
);

export default NavChanger;
