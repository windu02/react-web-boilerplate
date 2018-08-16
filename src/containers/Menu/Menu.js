import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _map from 'lodash/map'

import Grid from '@material-ui/core/Grid'

import withI18N from '../../hoc/withI18N'

import MenuItem from '../../components/navigation/MenuItem'

import styles from './menu.scss'

import { actions as NavigationActions, selectors as NavigationSelectors } from '../../redux/Navigation/redux'

import config from './config'

const mapStateToProps = state => ({
  pathname: NavigationSelectors.pathnameWithoutLocale(state),
})

const mapDispatchToProps = dispatch => ({
  navigationPush: pathname => dispatch(NavigationActions.push(pathname)),
})

@withI18N
@connect(mapStateToProps, mapDispatchToProps)
class Menu extends PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,

    navigationPush: PropTypes.func.isRequired,
  }

  renderMenuItems = () => {
    const { pathname, t, navigationPush } = this.props
    return _map(config, (menuItem, menuItemKey) => (
      <Grid key={menuItemKey} item xs={2}>
        <MenuItem
          onClick={() => navigationPush(menuItem.pathname)}
          title={t(menuItem.titleId)}
          source={menuItem.picture}
          hoverSource={menuItem.hoverPicture}
          isActive={pathname.startsWith(menuItem.pathname)}
        />
      </Grid>
    ))
  }

  render() {
    return (
      <Grid container alignItems="center" justify="space-around" className={styles.wrapper}>
        {this.renderMenuItems()}
      </Grid>
    )
  }
}

export default Menu
