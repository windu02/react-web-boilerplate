import React, { Component, Fragment } from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import { PersistGate } from 'redux-persist/integration/react'

import { persist as persistConfig } from '../config'

import { store, persistor } from '../redux'

import Loading from '../components/common/Loading'
import NavigationRouter from '../navigation/NavigationRouter'

class App extends Component {
  static propTypes = {
    store: PropTypes.objectOf(PropTypes.any).isRequired,
  }

  render() {
    let rootNode = (
      <Fragment>
        <NavigationRouter />
      </Fragment>
    )

    if (persistConfig.VERSION !== 'false' && persistConfig.VERSION !== null) {
      const loadingNode = (<Loading />)

      rootNode = (
        <PersistGate loading={loadingNode} persistor={persistor}>
          {rootNode}
        </PersistGate>
      )
    }

    return (
      <Provider store={this.props.store}>
        {rootNode}
      </Provider>
    )
  }
}

export default props => (
  <App {...props} store={store} />
)
