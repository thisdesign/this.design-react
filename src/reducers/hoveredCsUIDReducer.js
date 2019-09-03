const hoveredCsUIDReducer = (state = null, action) => {
  switch (action.type) {
    case 'HOVER_ITEM':
      return action.payload.uid

    case 'UNHOVER_ITEM':
      return null
    default:
      return state
  }
}

export default hoveredCsUIDReducer
