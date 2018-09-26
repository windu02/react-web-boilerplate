import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

import withI18N from '../../hoc/withI18N'

import { menu as menuConfig } from '../../config'

import styles from './menu.scss'

import { selectors as NavigationSelectors, actions as NavigationActions } from '../../redux/Navigation/redux'

const mapStateToProps = state => ({
  pathnameWithoutLocale: NavigationSelectors.pathnameWithoutLocale(state),
})

const mapDispatchToProps = dispatch => ({
  navigationPush: route => dispatch(NavigationActions.push(route)),
})

@withI18N
@connect(mapStateToProps, mapDispatchToProps)
class Menu extends PureComponent {
  static propTypes = {
    pathnameWithoutLocale: PropTypes.string.isRequired,

    navigationPush: PropTypes.func.isRequired,

    className: PropTypes.string,
  }

  static defaultProps = {
    className: '',
  }

  handleItemClick = (route) => {
    const { navigationPush } = this.props
    navigationPush(route)
  }

  render() {
    const { t, pathnameWithoutLocale, className } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        {
          Object.values(menuConfig).map(item => (
            <div
              key={item.route}
              role="button"
              tabIndex="-1"
              className={classnames(styles.item, item.route === pathnameWithoutLocale && styles.active)}
              onClick={() => this.handleItemClick(item.route)}
              onKeyDown={() => this.handleItemClick(item.route)}
            >
              {t(item.labelId)}
            </div>
          ))
        }
      </div>
    )
  }
}

export default Menu
