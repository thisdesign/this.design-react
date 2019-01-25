import React from 'react';
import PropTypes from 'prop-types';
// import CaseStudySplash from './CaseStudySplash/CaseStudySplash';
import Styled from './styled';

const Cover = ({
  description, title, backgroundColor, services,
}) => (
  <Styled.Cover>
    <Styled.Fill backgroundColor={backgroundColor} />
    <Styled.Header>
      <Styled.Title>
        {title}
      </Styled.Title>
      <Styled.Desc>
        {description}
      </Styled.Desc>
      <Styled.Services>
        {services}
      </Styled.Services>
    </Styled.Header>
    {/* <CaseStudySplash data={header} /> */}
  </Styled.Cover>
);

Cover.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  // videoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.element.isRequired,
  description: PropTypes.element.isRequired,
  services: PropTypes.element.isRequired,
};

export default React.memo(Cover);
