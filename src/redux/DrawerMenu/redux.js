import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

//
// Initial state
//
const initialState = Immutable({
  isOpen: false,
  openedSubMenu: null,
})

//
// Actions
//
export const actions = {
  toggle: createAction('toggle'),
  open: createAction('open'),
  close: createAction('close'),
  setOpenedSubMenu: createAction('setOpenedSubMenu', openedSubMenu => ({ openedSubMenu })),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.toggle]: state => state.merge({ isOpen: !state.isOpen }),
  [actions.open]: state => state.merge({ isOpen: true }),
  [actions.close]: state => state.merge({ isOpen: false }),
  [actions.setOpenedSubMenu]: (state, { openedSubMenu }) => state.merge({ openedSubMenu }),
}, initialState)

//
// Selectors
//
const root = state => state.drawerMenu
const isOpen = state => root(state).isOpen
const openedSubMenu = state => root(state).openedSubMenu

export const selectors = {
  isOpen,
  openedSubMenu,
}
