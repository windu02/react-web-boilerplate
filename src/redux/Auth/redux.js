import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'
import moment from 'moment'
import { app as appConfig } from '../../config'

//
// Initial state
//
const initialState = Immutable({
  token: null,
})

//
// Actions
//
export const actions = {
  setToken: createAction('setToken', token => ({ token, expiresAt: moment().add(appConfig.TOKEN_TTL, 's').format() })),
  refreshToken: createAction('refreshToken', refreshToken => ({ refreshToken })),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.setToken]: (state, token) => state.merge({ token }),
}, initialState)

//
// Selectors
//
const root = state => state.auth
const token = state => root(state).token

export const selectors = {
  token,
}
