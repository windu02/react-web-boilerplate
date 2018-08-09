import { all, put, takeLatest, select } from 'redux-saga/effects'

import { I18n } from 'react-i18nify'

import { app as appConfig } from '../../config'

import locales from '../../locales'

import { actions as I18NActions, selectors as I18NSelectors } from './redux'

export function* init() {
  I18n.setTranslations(locales)

  const myHandleMissingTranslation = (key, replacements = {}) => {
    /* eslint-disable-next-line no-underscore-dangle */
    if (replacements._failback) return `Missing translation: ${key}`

    /* eslint-disable-next-line no-underscore-dangle */
    const currentLocale = I18n._locale

    I18n.setLocale(appConfig.FAILBACK_LOCALE)
    const failbackTranslation = I18n.t(key, { ...replacements, _failback: true })
    I18n.setLocale(currentLocale)

    return failbackTranslation
  }

  I18n.setHandleMissingTranslation(myHandleMissingTranslation)

  let initialLocale = appConfig.INITIAL_LOCALE
  if (navigator) {
    if (navigator.browserLanguage) {
      initialLocale = navigator.browserLanguage
    } else {
      initialLocale = navigator.language
    }
  }

  const initialLocaleWithoutRegionCode = initialLocale.toLowerCase().split(/[_-]+/)[0]

  const locale = yield select(I18NSelectors.locale)

  yield put(I18NActions.setLocale(locale !== '' ? locale : initialLocaleWithoutRegionCode))

  yield put(I18NActions.isInit())
}

export function* setLocale() {
  const locale = yield select(I18NSelectors.locale)
  I18n.setLocale(locale)
}

export function* loop() {
  yield all([
    takeLatest(I18NActions.setLocale.getType(), setLocale),
  ])
}
