import React from 'react';
import PropTypes from 'prop-types';
// import CaseStudySplash from './CaseStudySplash/CaseStudySplash';
import './CaseStudyCover.scss';

const Cover = ({
  description, title, backgroundColor, services,
}) => (
  <div className="casestudy__cover" >
    <div className="casestudy__fill" style={{ background: backgroundColor }} />
    <div className="casestudy__header -wrap-nav">
      <div className="casestudy__header__item casestudy__header__item--title">
        {title}
      </div>
      <div className="casestudy__header__item casestudy__header__item--description">
        {description}
      </div>
      <div className="casestudy__header__item casestudy__header__item--services h3">
        {services}
      </div>
    </div>
    {/* <CaseStudySplash data={header} /> */}
  </div>
);

Cover.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
  // videoUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.element.isRequired,
  description: PropTypes.element.isRequired,
  services: PropTypes.element.isRequired,
};

export default React.memo(Cover);
