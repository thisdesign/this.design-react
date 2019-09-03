const viewReducer = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return action.payload
    default:
      return state
  }
}

export default viewReducer
