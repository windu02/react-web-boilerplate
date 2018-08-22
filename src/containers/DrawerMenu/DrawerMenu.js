import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import _map from 'lodash/map'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'

import withI18N from '../../hoc/withI18N'

import DrawerMenuItem from '../../components/navigation/DrawerMenuItem'

import config from './config'

import styles from './drawer-menu.scss'

import { actions as NavigationActions, selectors as NavigationSelectors } from '../../redux/Navigation/redux'
import { actions as DrawerMenuActions, selectors as DrawerMenuSelectors } from '../../redux/DrawerMenu/redux'

const mapStateToProps = state => ({
  pathname: NavigationSelectors.pathnameWithoutLocale(state),
  drawerMenuIsOpen: DrawerMenuSelectors.isOpen(state),
})

const mapDispatchToProps = dispatch => ({
  navigationPush: pathname => dispatch(NavigationActions.push(pathname)),
  toggleDrawerMenu: () => dispatch(DrawerMenuActions.toggle()),
})

@withI18N
@connect(mapStateToProps, mapDispatchToProps)
class DrawerMenu extends PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    drawerMenuIsOpen: PropTypes.bool.isRequired,

    navigationPush: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
  }

  renderMenu = () => {
    const { pathname, t, navigationPush } = this.props

    const itemsNodes = _map(config, (menuItem, menuItemKey) => {
      const isActive = pathname === menuItem.pathname
      return (
        <DrawerMenuItem
          key={menuItemKey}
          onClick={() => { navigationPush(menuItem.pathname) }}
          title={t(menuItem.titleId)}
          isActive={isActive}
        />
      )
    })

    return (
      <List component="div" disablePadding className={styles.section}>
        {itemsNodes}
      </List>
    )
  }

  render() {
    const { drawerMenuIsOpen, toggleDrawerMenu } = this.props
    return (
      <SwipeableDrawer
        className={styles.wrapper}
        open={drawerMenuIsOpen}
        onClose={() => toggleDrawerMenu()}
        onOpen={() => toggleDrawerMenu()}
      >
        {this.renderMenu()}
      </SwipeableDrawer>
    )
  }
}

export default DrawerMenu
