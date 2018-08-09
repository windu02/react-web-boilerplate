import storage from 'redux-persist/lib/storage'
import { seamlessImmutableReconciler, seamlessImmutableTransformCreator } from 'redux-persist-seamless-immutable'

const persist = {
  VERSION: process.env.REACT_APP_PERSIST_VERSION || null,
  ROOT_CONFIG: {
    key: 'root',
    storage,
    version: process.env.REACT_APP_PERSIST_VERSION !== 'false' ? process.env.REACT_APP_PERSIST_VERSION : -1,
    stateReconciler: seamlessImmutableReconciler,
    transforms: [seamlessImmutableTransformCreator({})],
    whitelist: ['i18n'],
  },
}

export default persist
