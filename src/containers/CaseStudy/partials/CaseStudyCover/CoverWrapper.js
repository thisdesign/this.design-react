import React from 'react';
import PropTypes from 'prop-types';
import { RichText } from 'prismic-reactjs';
import Cover from './Cover';
/* eslint-disable react/prop-types */

Cover.Wrapper = ({ data }) => {
  console.log(data);
  const { title, copy, services } = data.header[0];
  return (
    <Cover
      backgroundColor={data.color}
      title={RichText.render(title)}
      description={RichText.render(copy)}
      services={RichText.render(services)}
    />
  );
};

Cover.Wrapper.propTypes = {
  data: PropTypes.object, //eslint-disable-line
};

export default Cover;
