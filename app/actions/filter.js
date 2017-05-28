export const UPDATE_FILTER = 'UPDATE_FILTER'

// ACTION CREATORS

export function updateFilter(newFilter) {
  return {
    type: UPDATE_FILTER,
    newFilter
  }
}
