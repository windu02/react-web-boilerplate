import { createAction } from 'redux-act'
import queryString from 'query-string'

//
// Actions
//
export const actions = {
  isInit: createAction('isInit'),

  push: createAction('push', path => ({ path })),
  pop: createAction('pop', (n = 1) => ({ n })),
  replace: createAction('replace', path => ({ path })),
  redirect: createAction('redirect', path => ({ path })),
  open: createAction('open', url => ({ url })),
  back: createAction('back'),
}

//
// Selectors
//
const root = state => state.router

const location = state => root(state).location || window.location
const qs = state => (location(state).search ? queryString.parse(location(state).search) : {})
const pathname = state => location(state).pathname
const hash = state => (location(state).hash ? queryString.parse(location(state).hash) : {})

export const selectors = {
  location,
  qs,
  pathname,
  hash,
}
