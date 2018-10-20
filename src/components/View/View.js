import React from 'react';
import ScrollContainer from '../../containers/ScrollContainer/ScrollContainer';

const Section = (props) => {
  const className = [
    'view',
    props.name,
    props.view === props.name ? '-is-active' : '',
    props.aside ? 'view--aside' : '',
  ].join(' ');
  return (
    <ScrollContainer className={className}>
      {props.children}
    </ScrollContainer>
  );
};

export default Section;
