/* eslint react/no-unused-prop-types: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import Parallax from 'components/Parallax/Parallax';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import MobileFrame from 'components/MobileFrame/MobileFrame';
import VideoNode from '../../../../components/VideoNode/VideoNode';
import './Columns.scss';


const Columns = ({
  size,
  isRight,
  videoUrl,
  imageUrl,
  hasMute,
  title,
  text,
  layout,
}) => {
  const classes = [
    'caseStudy__colBlock',
    '-grid',
    '-wrap',
    isRight ? 'caseStudy__colBlock--right' : '',
    size === 'large' ? 'caseStudy__colBlock--largeImage' : '',
    size === 'small' ? 'caseStudy__colBlock--smallImage' : '',
  ].join(' ');

  const colClass = (modifier) => {
    const base = 'caseStudy__colBlock__col';
    return `${base} ${base}--${modifier} -padding`;
  };

  const MediaWrapper = ({ children }) => {
    switch (layout) {
      case '-website':
        return <WebsiteFrame>{children}</WebsiteFrame>;
      case '-mobile':
        return <MobileFrame>{children}</MobileFrame>;
      default:
        return children;
    }
  };

  const MediaItem = () => (
    videoUrl
      ? <VideoNode muteToggle={hasMute} url={videoUrl} />
      : <img src={imageUrl} alt={title} />
  );

  const Media = () => (
    <Parallax speed={-70} className={colClass('media')}>
      <MediaWrapper>
        <MediaItem />
      </MediaWrapper>
    </Parallax>
  );

  const Text = () => (
    <div className={colClass('text')}>
      {text}
    </div>
  );

  const columnItems = [
    <Media key="media" />,
    <Text key="text" />,
  ];

  return (
    <div className={classes}>
      { isRight ? columnItems.reverse() : columnItems }
    </div>);
};

Columns.defaultProps = {
  isRight: false,
  size: null,
  text: <p />,
  hasMute: false,
  videoUrl: undefined,
  imageUrl: undefined,
};

Columns.propTypes = {
  text: PropTypes.node,
  isRight: PropTypes.bool,
  size: PropTypes.string,
  hasMute: PropTypes.bool,
  videoUrl: PropTypes.string,
  imageUrl: PropTypes.string,
};

export default React.memo(Columns);
