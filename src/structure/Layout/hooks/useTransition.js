import { useState } from 'react'
import theme from 'style/theme'

export default function useTransition() {
  const [state, setState] = useState({
    isTransitioning: false,
    transitionName: null,
  })

  const triggerTransition = name => {
    setState({ isTransitioning: true, transitionName: name })

    setTimeout(() => {
      setState({ isTransitioning: false, transitionName: null })
    }, theme.routeTransition.duration)
  }

  return {
    isTransitioning: state.isTransitioning,
    transitionName: state.transitionName,
    triggerTransition,
  }
}
