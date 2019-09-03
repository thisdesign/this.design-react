const INITIAL_STATE = {
  isTransitioning: false,
  transitionName: null,
}

const currentCsUidReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'START_TRANSITION':
      return {
        isTransitioning: true,
        transitionName: action.name,
      }
    default:
      return state
  }
}

export default currentCsUidReducer
