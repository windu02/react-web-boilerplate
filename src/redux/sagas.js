import { all, call, fork, take } from 'redux-saga/effects'

import * as ReduxPersistConstants from 'redux-persist/lib/constants'

import { persist as persistConfig } from '../config'

import * as AppSagas from './App/sagas'
import * as I18NSagas from './I18N/sagas'
import * as NavigationSagas from './Navigation/sagas'

import { actions as I18NActions } from './I18N/redux'
import { actions as NavigationActions } from './Navigation/redux'

import pagesSagas from '../pages/sagas'

function* loop() {
  yield all([
    AppSagas.loop(),
    I18NSagas.loop(),
    NavigationSagas.loop(),

    ...pagesSagas,
  ])
}

export default function* rootSaga() {
  if (persistConfig.VERSION !== 'false' && persistConfig.VERSION !== null) {
    yield take(ReduxPersistConstants.REHYDRATE)
  }
  yield fork(loop)
  yield fork(I18NSagas.init)
  yield take(I18NActions.isInit)
  yield fork(NavigationSagas.init)
  yield take(NavigationActions.isInit)
  yield call(AppSagas.init)
}
