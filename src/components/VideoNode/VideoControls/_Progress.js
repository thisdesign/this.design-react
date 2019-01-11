import React from 'react';
import { VideoContext } from '../VideoNode';

const Progress = () => (
  <VideoContext.Consumer>
    {({ percentComplete }) => (
      <div className="videoNode__controls--progress" >
        <div className="videoNode__controls--progress__fill" style={{ width: `${percentComplete * 100}%` }} />
      </div>
    )}
  </VideoContext.Consumer>
);

export default Progress;
