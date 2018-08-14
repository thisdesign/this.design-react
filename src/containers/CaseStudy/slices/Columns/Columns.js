import React from 'react';
import { RichText } from 'prismic-reactjs';
import VideoNode from '../../../../components/VideoNode/VideoNode';
import './Columns.css';

const Columns = (props) => {
  const data = props.data.value[0];
  const text = RichText.render(data.text);
  const imageIsRight = data.right != null;
  const imageIsLarge = data.layout === '-column--2of3';
  const videoHasAudio = data.audio === 'true';

  const classes = [
    'caseStudy__colBlock',
    '-grid',
    '-wrap',
    imageIsRight ? 'caseStudy__colBlock--right' : null,
    imageIsLarge ? 'caseStudy__colBlock--largeImage' : null,
  ].join(' ');

  const columnItems = [
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--media -padding" key="col-media">
      { data.video.url
          ? (
            <VideoNode muteToggle={videoHasAudio} url={data.video.url} />
          )
          : <img src={data.image.url} alt={data.image.alt} />}
    </div>,
    <div className="caseStudy__colBlock__col caseStudy__colBlock__col--text -padding" key="col-img">
      {text}
    </div>,
  ];

  return (
    <div className={classes}>
      {imageIsRight ? columnItems.reverse() : columnItems}
    </div>
  );
};

export default Columns;
