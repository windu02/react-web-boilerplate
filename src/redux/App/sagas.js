import { all, put } from 'redux-saga/effects'

import { actions as AppActions } from './redux'

export function* init() {
  yield put(AppActions.init())
}

export function* loop() {
  yield all([])
}
