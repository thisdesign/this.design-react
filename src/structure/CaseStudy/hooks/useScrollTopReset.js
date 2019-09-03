import { useContext } from 'react'
import { LayoutCtx } from 'structure/Layout'
import { useSelector } from 'react-redux'

export default function useScrollTopReset() {
  const { mainRef } = useContext(LayoutCtx)
  const transitionName = useSelector(state => state.transition.transitionName)
  const isTransitioningFromWork = transitionName === 'FROM_WORK'

  if (isTransitioningFromWork) {
    mainRef.current.scrollTop = 0
  }
}
