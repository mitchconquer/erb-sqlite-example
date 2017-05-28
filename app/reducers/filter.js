// @flow
import { UPDATE_FILTER } from '../actions/filter'

export const initialState = ''

export default function files(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_FILTER:
      return `${action.newFilter}`
    default:
      return state
  }
}
