import { useState } from 'react'
import theme from 'style/theme'

export default function useTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false)

  const triggerTransition = () => {
    setIsTransitioning(true)

    setTimeout(() => {
      setIsTransitioning(false)
    }, theme.routeTransition.duration)
  }

  return { isTransitioning, triggerTransition }
}
