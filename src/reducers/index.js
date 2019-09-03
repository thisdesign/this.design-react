import { combineReducers } from 'redux'
import viewReducer from './viewReducer'
import currentCsUidReducer from './currentCsUidReducer'
import transitionReducer from './transitionReducer'

const reducers = combineReducers({
  view: viewReducer,
  currentCsUid: currentCsUidReducer,
  transition: transitionReducer,
})

export default reducers
