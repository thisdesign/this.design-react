const currentCsUidReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return 'state has been set'
    default:
      return null
  }
}

export default currentCsUidReducer
