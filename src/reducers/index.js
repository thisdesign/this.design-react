import { combineReducers } from 'redux'
import viewReducer from './viewReducer'
import currentCsUidReducer from './currentCsUidReducer'
import transitionReducer from './transitionReducer'
import hoveredCsUIDReducer from './hoveredCsUIDReducer'

const reducers = combineReducers({
  view: viewReducer,
  currentCsUid: currentCsUidReducer,
  transition: transitionReducer,
  hoveredCsUID: hoveredCsUIDReducer,
})

export default reducers
