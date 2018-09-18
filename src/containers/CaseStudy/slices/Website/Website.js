import React from 'react';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import './Website.css';

const Website = (props) => {
  const { data } = props;
  const {
    frame_color: frameColor,
    dot_color: dotColor,
    background,
    screenshot,
    layout,
  } = data.primary;

  const classes = [
    'website__inner',
    layout === 'small' ? '-wrap--dub' : '-wrap',
    background ? '-backgroundEnabled' : '-centered',
  ].join(' ');

  return (
    <div className="website -padding" style={{ backgroundColor: background }}>
      <div className={classes}>
        <WebsiteFrame
          frameColor={frameColor}
          dotColor={dotColor}
          render={
            <img src={screenshot.url} alt={screenshot.alt} />
          }
        />
      </div>
    </div>
  );
};

export default Website;
