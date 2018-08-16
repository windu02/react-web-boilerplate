import { all, call, put, take, select } from 'redux-saga/effects'
import moment from 'moment'

import { actions as AuthActions, selectors as AuthSelectors } from '../Auth/redux'
import { actions as WSActions } from './redux'

function* getAccessToken() {
  const token = yield select(AuthSelectors.token)
  const isExpired = token !== null
    ? moment(token.expiresAt).isBefore(moment())
    : true

  if (token === null || !isExpired) {
    return token
  }

  yield put(AuthActions.refreshToken(token.token))
  yield take(AuthActions.setToken.getType())

  return yield getAccessToken()
}

function* preparePayload(params) {
  const token = yield getAccessToken()
  const payload = params || {}
  const tokenValue = token && token.token

  return { ...payload, token: tokenValue }
}

export function* request(handler, id, params) {
  yield put(WSActions.start(id))

  const payload = yield preparePayload(params)
  const result = yield call(handler, payload)
  const { ok, data } = result

  if (ok) {
    yield put(WSActions.resolve(id, data))
  } else {
    yield put(WSActions.reject(id, data.errors && data.errors[0]))
  }

  return result
}

export function* loop() {
  yield all([])
}
