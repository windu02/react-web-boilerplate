import { all, put, select, takeLatest } from 'redux-saga/effects'

import * as RouterActions from 'connected-react-router'

import { app as appConfig } from '../../config'

import locales from '../../locales'

import { actions as NavigationActions, selectors as NavigationSelectors } from './redux'
import { actions as I18NActions, selectors as I18NSelectors } from '../I18N/redux'

export function* init() {
  const langInPath = appConfig.LANG_IN_PATH

  if (langInPath) {
    const pathname = yield select(NavigationSelectors.pathname)

    const beginByALocale = Object.keys(locales).reduce((res, localeKey) => {
      let newRes = res

      if (res === null && pathname.startsWith(`/${localeKey}`)) {
        newRes = localeKey
      }

      return newRes
    }, null)

    const locale = yield select(I18NSelectors.locale)

    if (beginByALocale !== null) {
      if (beginByALocale !== locale) {
        yield put(I18NActions.setLocale(beginByALocale))
      }
    } else {
      yield put(NavigationActions.replace(`/${locale}${pathname}`))
    }
  }

  yield put(NavigationActions.isInit())
}

export function* push({ payload }) {
  const { path } = payload
  yield put(RouterActions.push(path))
}

export function* pop({ payload }) {
  const { n } = payload
  yield put(RouterActions.go(n * (-1)))
}

export function* replace({ payload }) {
  const { path } = payload
  yield put(RouterActions.replace(path))
}

export function redirect({ payload }) {
  const { path } = payload
  window.location.assign(path)
}

export function open({ payload }) {
  const { url } = payload
  window.open(url)
}

export function* back() {
  yield put(RouterActions.goBack())
}

export function* loop() {
  yield all([
    takeLatest(NavigationActions.push.getType(), push),
    takeLatest(NavigationActions.pop.getType(), pop),
    takeLatest(NavigationActions.replace.getType(), replace),
    takeLatest(NavigationActions.redirect.getType(), redirect),
    takeLatest(NavigationActions.open.getType(), open),
    takeLatest(NavigationActions.back.getType(), back),
  ])
}
