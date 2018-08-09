import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

//
// Initial state
//
const initialState = Immutable({
  started: false,
})

//
// Actions
//
export const actions = {
  init: createAction('init'),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.init]: state => state.merge({ started: true }),
}, initialState)

//
// Selectors
//
const root = state => state.app
const started = state => root(state).started

export const selectors = {
  started,
}
