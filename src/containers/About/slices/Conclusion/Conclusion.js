import React from 'react';
import { RichText } from 'prismic-reactjs';
import ScrollContext from '../../../ScrollContainer/ScrollContext/ScrollContext';
import './Conclusion.css';

const Conclusion = (props) => {
  const data = props.data.primary;
  return (
    <div className="about__conclusion about__text -grid -full-height -keepBreak">
      <div className="about__conclusion__inner">
        {RichText.render(data.large_text)}
        {RichText.render(data.contact)}
        {RichText.render(data.address)}
        <ScrollContext.Consumer>
          {context => (
            <div onClick={() => context.scrollToTop(data.scroll_speed)}>
              <div className="about__conclusion__scrollUp" />
            </div>
          )}
        </ScrollContext.Consumer>
      </div>
    </div>
  );
};

Conclusion.defaultProps = {
  scrollSpeed: 50,
};

export default Conclusion;
