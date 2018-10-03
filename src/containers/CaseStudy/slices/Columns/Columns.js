import React from 'react';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import MobileFrame from 'components/MobileFrame/MobileFrame';
import { RichText } from 'prismic-reactjs';
import VideoNode from '../../../../components/VideoNode/VideoNode';
import sizeCheck from '../../../../util/sizeCheck';

import './Columns.css';

const Columns = (props) => {
  const data = props.data.value
    ? props.data.value[0] // v1 structure
    : props.data.primary; // v2 structure
  const imageIsRight = data.right != null;

  const classes = [
    'caseStudy__colBlock', '-grid', '-wrap', imageIsRight
      ? 'caseStudy__colBlock--right'
      : null,
    data.layout === '-column--2of3'
      ? 'caseStudy__colBlock--largeImage' : null,
    data.layout === '-column--1of3' || '-mobile'
      ? 'caseStudy__colBlock--smallImage' : null,
  ].join(' ');

  sizeCheck({
    ...data.video,
  }, 10);

  const columnMedia = (
    data.video.url
      ? <VideoNode muteToggle={data.audio === 'true'} url={data.video.url} />
      : <img src={data.image.url} alt={props.title} />);

  const columnText = (
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--text -padding" key="col-img">
      {RichText.render(data.text)}
    </div>
  );

  const columnItems = [
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--media -padding" key="col-media">
      {(() => {
        if (data.layout === '-website') {
          return <WebsiteFrame render={columnMedia} />;
        } else if (data.layout === '-mobile') {
          return <MobileFrame render={columnMedia} />;
        }
        return columnMedia;
      })()}
    </div>,
    columnText,
  ];

  return (
    <div className={classes}>
      { imageIsRight ? columnItems.reverse() : columnItems }
    </div>);
};

export default Columns;
