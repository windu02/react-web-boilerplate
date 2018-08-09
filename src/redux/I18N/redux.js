import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'

//
// Initial state
//
const initialState = Immutable({
  locale: '',
})

//
// Actions
//
export const actions = {
  isInit: createAction('isInit'),

  setLocale: createAction('setLocale', locale => ({ locale })),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.setLocale]: (state, { locale }) => state.merge({ locale }),
}, initialState)

//
// Selectors
//
const root = state => state.i18n
const locale = state => root(state).locale

export const selectors = {
  locale,
}
