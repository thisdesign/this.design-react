import React from 'react';
import ScrollContainer from '../../containers/ScrollContainer/ScrollContainer';
import './View.css';

const Section = (props) => {
  const className = [
    'view',
    props.name,
    props.view === props.name ? '-is-active' : '',
    props.aside ? 'view--aside' : '',
  ].join(' ');
  return (
    <section className={className}>
      <ScrollContainer className="view__inner" viewName={props.name} view={props.view}>
        {props.children}
      </ScrollContainer>
    </section>
  );
};

export default Section;
