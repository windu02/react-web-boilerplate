import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { I18n } from 'react-i18nify'

import { getDisplayName } from '../helpers/HOCHelper'

import { actions as I18NActions, selectors as I18NSelectors } from '../redux/I18N/redux'

const mapStateToProps = state => ({
  locale: I18NSelectors.locale(state),
})

const mapDispatchToProps = dispatch => ({
  setLocale: locale => dispatch(I18NActions.setLocale(locale)),
})

export default (WrappedComponent) => {
  class WithI18N extends PureComponent {
    static propTypes = {
      locale: PropTypes.string.isRequired,
      setLocale: PropTypes.func.isRequired,
    }

    translate = (key, replacements = {}) => I18n.t(key, replacements)

    render() {
      const { locale, setLocale } = this.props

      return (
        <WrappedComponent
          {...this.props}
          t={this.translate}
          locale={locale}
          setLocale={setLocale}
        />
      )
    }
  }

  WithI18N.displayName = `WithI18N(${getDisplayName(WrappedComponent)})`

  hoistNonReactStatic(WithI18N, WrappedComponent)

  return (
    connect(mapStateToProps, mapDispatchToProps)(WithI18N)
  )
}
