// @flow
import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import files from './files'
import filter from './filter'
import subtitles from './subtitles'

const rootReducer = combineReducers({
  files,
  filter,
  subtitles,
  router
})

export default rootReducer
