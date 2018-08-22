import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

//
// Initial state
//
const initialState = Immutable({
  started: false,
  headerIsSticky: false,
})

//
// Actions
//
export const actions = {
  init: createAction('init'),
  setHeaderIsSticky: createAction('setHeaderIsSticky', headerIsSticky => ({ headerIsSticky })),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.init]: state => state.merge({ started: true }),
  [actions.setHeaderIsSticky]: (state, { headerIsSticky }) => state.merge({ headerIsSticky }),
}, initialState)

//
// Selectors
//
const root = state => state.app
const started = state => root(state).started
const headerIsSticky = state => root(state).headerIsSticky

export const selectors = {
  started,
  headerIsSticky,
}
