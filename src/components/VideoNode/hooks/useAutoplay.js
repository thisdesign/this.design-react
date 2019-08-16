import { useEffect, useContext } from 'react'
import { VideoCtx } from 'react-video-controls'

export default function useAutoplay(shouldPlay) {
  const { controls } = useContext(VideoCtx)
  useEffect(
    () => {
      if (shouldPlay) {
        controls.play()
      } else {
        controls.pause()
      }
    },
    [shouldPlay]
  )
}
