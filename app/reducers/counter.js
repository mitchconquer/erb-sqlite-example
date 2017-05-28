// @flow

export type counterStateType = {
  counter: number
};

type actionType = {
  type: string
};

export default function counter(state: number = 0, action: actionType) {
  switch (action.type) {
    default:
      return state;
  }
}
