import { createAction, createReducer } from 'redux-act'
import Immutable from 'seamless-immutable'
import { createSelector } from 'reselect'

//
// Initial state
//
const initialState = Immutable({
  actions: {},
})

//
// Actions
//
export const actions = {
  start: createAction('startWSRequest', id => ({ id })),
  resolve: createAction('resolveWSRequest', id => ({ id })),
  reject: createAction('rejectWSRequest', (id, error) => ({ id, error })),
  reset: createAction('resetWSRequest', id => ({ id })),
}

//
// Reducer
//
export const reducer = createReducer({
  [actions.reset]: (state, { id }) => state.setIn(['actions', id], {}),
  [actions.start]: (state, { id }) => state.setIn(['actions', id], { pending: true, done: false }),
  [actions.resolve]: (state, { id }) => state.setIn(['actions', id], { resolved: true, done: true }),
  [actions.reject]: (state, { id, error }) => state.setIn(['actions', id], { error, done: true }),
}, initialState)

//
// Selectors
//
const root = state => state.ws
const getAction = (state, id) => root(state).actions[id] || {}
const getError = createSelector(getAction, action => action.error)
const isPending = createSelector(getAction, action => !!action.pending)
const isResolved = createSelector(getAction, action => !!action.resolved)

export const selectors = {
  getAction,
  getError,
  isPending,
  isResolved,
}
