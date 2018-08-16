import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { ConnectedRouter } from 'connected-react-router'

import _map from 'lodash/map'
import _flattenDeep from 'lodash/flattenDeep'

import { selectors as I18NSelectors } from '../redux/I18N/redux'
import { selectors as AppSelectors } from '../redux/App/redux'

import { app as appConfig } from '../config'
import locales from '../locales'

import { history } from './History'

import NotFoundPage from '../pages/NotFoundPage/NotFoundPage'
import Loading from '../components/common/Loading/Loading'

import routes from './routesConfig'

const mapStateToProps = state => ({
  locale: I18NSelectors.locale(state),

  started: AppSelectors.started(state),
})

@connect(mapStateToProps)
export default class NavigationRouter extends Component {
  static propTypes = {
    started: PropTypes.bool.isRequired,
  }

  renderPrefixedRoute = (key, path, component, prefix = '') => (
    <Route key={`${prefix}${key}`} exact path={`${prefix}${path}`} component={component} />
  )

  renderPrefixedRedirection = (key, from, to, prefix = '') => (
    <Redirect key={`${prefix}${key}`} exact from={`${prefix}${from}`} to={`${prefix}${to}`} />
  )

  renderPrefixedRoutes = (prefix = '') => (
    _map(routes, (route, routeKey) => {
      if (route.redirection === true) {
        return this.renderPrefixedRedirection(routeKey, route.from, route.to, prefix)
      }

      return this.renderPrefixedRoute(routeKey, route.pathname, route.component, prefix)
    })
  )

  renderRoutes = () => {
    const langInPath = appConfig.LANG_IN_PATH

    let routeList = this.renderPrefixedRoutes()

    if (langInPath) {
      routeList = _map(Object.keys(locales), localeKey => this.renderPrefixedRoutes(`/${localeKey}`))
    }

    return _flattenDeep(routeList)
  }

  renderPrefixedNotFoundRoutes = (prefix = '') => this.renderPrefixedRoute('NotFound', '/404', NotFoundPage, prefix)

  renderNotFoundRoutes = () => {
    const langInPath = appConfig.LANG_IN_PATH

    let notFoundRoutes = this.renderPrefixedNotFoundRoutes()

    if (langInPath) {
      notFoundRoutes = _map(Object.keys(locales), localeKey => this.renderPrefixedNotFoundRoutes(`/${localeKey}`))
    }

    return notFoundRoutes
  }

  render() {
    const { locale, started } = this.props

    if (!started) {
      return (
        <Loading />
      )
    }

    const langInPath = appConfig.LANG_IN_PATH

    let prefix = ''

    if (langInPath) {
      prefix = `/${locale}`
    }

    return (
      <ConnectedRouter history={history}>
        <Switch>
          { this.renderRoutes() }

          { this.renderNotFoundRoutes() }

          <Redirect to={`${prefix}/404`} />
        </Switch>
      </ConnectedRouter>
    )
  }
}
