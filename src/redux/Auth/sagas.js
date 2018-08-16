import { all, put, takeLatest } from 'redux-saga/effects'
import uuid from 'uuid/v4'

import { actions as AuthActions } from './redux'

export function* refreshToken() {
  yield put(AuthActions.setToken(uuid()))
}

export function* loop() {
  yield all([
    takeLatest(AuthActions.refreshToken.getType(), refreshToken),
  ])
}
