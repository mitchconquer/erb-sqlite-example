// @flow
import { SET_FILES, PROCESSING, SET_EMBEDDED_SUBS, SET_SUBS_FILE } from '../actions/files'

export const initialState = {
  processing: false,
  embeddedSubs: [],
  subtitlesFile: '',
  videoFile: ''
}

export default function files(state = initialState, action = {}) {
  switch (action.type) {
    case PROCESSING:
      return {
        ...state,
        processing: action.value
      }
    case SET_FILES:
      const newState = {
        ...state
      }
      action.files.forEach(fileData => {
        newState[fileData.basicType] = fileData
      })
      return newState
    case SET_EMBEDDED_SUBS:
      return {
        ...state,
        embeddedSubs: action.embeddedSubs
      }
    case SET_SUBS_FILE:
      return {
        ...state,
        subtitlesFile: action.subsFile
      }
    default:
      return state
  }
}
