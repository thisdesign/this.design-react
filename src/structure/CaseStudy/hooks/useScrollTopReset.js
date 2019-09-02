import { useContext } from 'react'
import { TransitionCtx, LayoutCtx } from 'structure/Layout'

export default function useScrollTopReset() {
  const { mainRef } = useContext(LayoutCtx)
  const { transitionName } = useContext(TransitionCtx)
  const isTransitioningFromWork = transitionName === 'FROM_WORK'

  if (isTransitioningFromWork) {
    mainRef.current.scrollTop = 0
  }
}
