const currentCsUidReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_CS':
      return 'state has been set'
    default:
      return null
  }
}

export default currentCsUidReducer
