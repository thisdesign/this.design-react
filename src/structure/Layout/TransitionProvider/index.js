import React, { useState, createContext } from 'react'

import theme from 'style/theme'

export const TransitionCtx = createContext()

function useTransition() {
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

export default function TransitionProvider({ children }) {
  const ctx = useTransition()

  return (
    <TransitionCtx.Provider value={{ ...ctx }}>
      {children}
    </TransitionCtx.Provider>
  )
}
