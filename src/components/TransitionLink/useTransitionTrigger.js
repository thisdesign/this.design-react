import { useDispatch } from 'react-redux'
import theme from 'style/theme'

export default function useTransitionTrigger() {
  const dispatch = useDispatch()

  const triggerTransition = (
    transitionName,
    duration = theme.routeTransition.duration + 100,
    cb = () => {}
  ) => {
    dispatch({ type: 'START_TRANSITION', payload: { name: transitionName } })
    setTimeout(() => {
      dispatch({ type: 'STOP_TRANSITION' })
      cb()
    }, duration)
  }

  return triggerTransition
}
