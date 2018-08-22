import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

//
// Initial state
//
const initialState = Immutable({
  isOpen: false,
})

//
// Actions
//
export const actions = {
  toggle: createAction('toggle'),
  open: createAction('open'),
  close: createAction('close'),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.toggle]: state => state.merge({ isOpen: !state.isOpen }),
  [actions.open]: state => state.merge({ isOpen: true }),
  [actions.close]: state => state.merge({ isOpen: false }),
}, initialState)

//
// Selectors
//
const root = state => state.drawerMenu
const isOpen = state => root(state).isOpen

export const selectors = {
  isOpen,
}
