import React from 'react';
import uuidv1 from 'uuid/v1';
import isMobile from 'util/isMobile';
import './Diptych.css';

const Diptych = (props) => {
  const dataSource = props.data.value
    ? props.data.value[0] // v1
    : props.data.primary; // v2

  const {
    image1,
    image2,
    offset1,
    offset2,
  } = dataSource;

  const diptychData = [
    { ...image1, offset: offset1 },
    { ...image2, offset: offset2 }];

  return (
    <div className="-grid -wrap casestudy__diptych">
      { diptychData.map(({ url, title, offset }) => {
        const condOffset = !isMobile() ? offset : null;
        return (
          <div className="casestudy__diptych__item -padding" key={uuidv1()}>
            {url &&
              <img
                src={url}
                alt={title}
                style={{ transform: `translateX(${condOffset}%)` }}
              />
            } {
              // If no image, put a spacer in except on mobile
              !url && !isMobile() && <div className="casestudy__diptych__spacer" />
            }
          </div>
        );
      }) }
    </div>
  );
};

export default React.memo(Diptych);
