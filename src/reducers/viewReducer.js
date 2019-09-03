const viewReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return action.val
    default:
      return null
  }
}

export default viewReducer
