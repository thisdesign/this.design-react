import { combineReducers } from 'redux'
import viewReducer from './viewReducer'
import currentCsUidReducer from './currentCsUidReducer'

const reducers = combineReducers({
  view: viewReducer,
  currentCsUid: currentCsUidReducer,
})

export default reducers
