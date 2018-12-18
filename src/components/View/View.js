import React from 'react';
import propTypes from 'prop-types';
import './View.css';

const View = ({
  view, viewName, children, aside,
}) => {
  const className = [
    'view',
    viewName,
    view === viewName ? '-is-active' : '',
    aside ? 'view--aside' : '',
  ].join(' ');

  return (
    <div className={className}>
      {children}
    </div>
  );
};

View.defaultProps = {
  aside: false,
};

View.propTypes = {
  // current app view
  view: propTypes.string.isRequired,
  // what to call the current view
  viewName: propTypes.string.isRequired,
  aside: propTypes.bool,
};
export default View;
