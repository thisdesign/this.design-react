import React from 'react'
import propTypes from 'prop-types'
import './VideoControls.scss'
import ControlBar from './_ControlBar'
import Progress from './_Progress'
import Play from '../icons/Play'

const VideoControls = ({ hasPlayed, isPaused }) => {
  const enabled = hasPlayed && !isPaused ? '-enabled' : ''
  const pauseFlag = isPaused ? '-isPaused' : ''

  const PlayButton = () => (
    <div className={`videoNode__controls__play ${pauseFlag}`}>
      <Play />
    </div>
  )

  return (
    <div className={`videoNode__controls ${enabled}`}>
      <PlayButton />
      <div className="videoNode__controls--wrapper">
        <Progress />
        <ControlBar />
      </div>
    </div>
  )
}

VideoControls.propTypes = {
  hasPlayed: propTypes.bool.isRequired,
}

export default React.memo(VideoControls)
