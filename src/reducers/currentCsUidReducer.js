const currentCsUidReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_CS':
      return action.payload
    case 'CHANGE_VIEW':
      return action.currentCsUid || state
    default:
      return state
  }
}

export default currentCsUidReducer
