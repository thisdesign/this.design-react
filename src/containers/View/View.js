import React from 'react';
import ScrollProvider from '../ScrollProvider/ScrollProvider';

const Section = (props) => {
  const className = [
    'view',
    props.name,
    props.view === props.name ? '-is-active' : '',
    props.aside ? 'view--aside' : '',
  ].join(' ');
  return (
    <ScrollProvider className={className}>
      {props.children}
    </ScrollProvider>
  );
};

export default Section;
