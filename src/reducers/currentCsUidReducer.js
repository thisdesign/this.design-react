const currentCsUidReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_CS':
      return action.payload
    default:
      return state
  }
}

export default currentCsUidReducer
