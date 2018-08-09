import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { connectRouter, routerMiddleware } from 'connected-react-router'

import { persistStore, persistReducer } from 'redux-persist'

import { app as appConfig, persist as persistConfig } from '../config'

import { history } from '../navigation/History'

import rootSaga from './sagas'

import * as AppRedux from './App/redux'
import * as I18NRedux from './I18N/redux'

import pagesEntities from '../pages/redux'

/* *********************************** *
 *  /!\  All Redux entities here  /!\  *
 * *********************************** */

const entities = {
  app: AppRedux,
  i18n: I18NRedux,

  ...pagesEntities,
}

const sagaMiddleware = createSagaMiddleware()
export const actions = {}
export const selectors = {}
const reducers = {}

Object.keys(entities)
  .forEach((name) => {
    actions[name] = entities[name].actions
    reducers[name] = entities[name].reducer
    selectors[name] = entities[name].selectors
  })

const middlewares = [
  routerMiddleware(history),
  sagaMiddleware,
]

const enhancers = [
  applyMiddleware(...middlewares),
]

if (appConfig.ENV === 'local' || appConfig.ENV === 'development') {
  /* eslint-disable no-underscore-dangle */
  if (window.__REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__())
  }
  /* eslint-enable no-underscore-dangle */
}

const rootReducer = connectRouter(history)(combineReducers(reducers))

let persistedReducer = rootReducer
if (persistConfig.VERSION !== 'false' && persistConfig.VERSION !== null) {
  persistedReducer = persistReducer(persistConfig.ROOT_CONFIG, rootReducer)
}

export const store = createStore(
  persistedReducer,
  compose(...enhancers),
)

let persistedStore = null
if (persistConfig.VERSION !== 'false' && persistConfig.VERSION !== null) {
  persistedStore = persistStore(store)
}

export const persistor = persistedStore

sagaMiddleware.run(rootSaga)
