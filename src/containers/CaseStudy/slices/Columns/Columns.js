/* eslint react/no-unused-prop-types: 0 */

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import WebsiteFrame from 'components/WebsiteFrame/WebsiteFrame';
import MobileFrame from 'components/MobileFrame/MobileFrame';
import WaypointVideo from 'components/WaypointVideo/WaypointVideo';
import Styled from './styled';


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
  console.log(size);
  const columnItems = [
    <Styled.Media speed={-90} key="media">
      <MediaWrapper layout={layout}>
        { videoUrl
            ? <WaypointVideo muteToggle={hasMute} url={videoUrl} />
            : <img src={imageUrl} alt={title} />
          }
      </MediaWrapper>
    </Styled.Media>,
    <Styled.Text key="text">
      {text}
    </Styled.Text>,
  ];

  return (
    <ThemeProvider theme={{ size }}>
      <Styled.Columns>
        { isRight ? columnItems.reverse() : columnItems }
      </Styled.Columns>
    </ThemeProvider>
  );
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
  title: PropTypes.string.isRequired,
};

export default React.memo(Columns);
