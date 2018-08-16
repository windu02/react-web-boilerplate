import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux'

import _map from 'lodash/map'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import Collapse from '@material-ui/core/Collapse'

import withI18N from '../../hoc/withI18N'

import DrawerMenuItemHeader from '../../components/navigation/DrawerMenuItemHeader/DrawerMenuItemHeader'
import DrawerMenuItem from '../../components/navigation/DrawerMenuItem'

import config from './config'

import styles from './drawer-menu.scss'

import { actions as NavigationActions, selectors as NavigationSelectors } from '../../redux/Navigation/redux'
import { actions as DrawerMenuActions, selectors as DrawerMenuSelectors } from '../../redux/DrawerMenu/redux'

const mapStateToProps = state => ({
  pathname: NavigationSelectors.pathnameWithoutLocale(state),
  drawerMenuIsOpen: DrawerMenuSelectors.isOpen(state),
  drawerMenuOpenedSubMenu: DrawerMenuSelectors.openedSubMenu(state),
})

const mapDispatchToProps = dispatch => ({
  navigationPush: pathname => dispatch(NavigationActions.push(pathname)),
  toggleDrawerMenu: () => dispatch(DrawerMenuActions.toggle()),
  setOpenedSubMenu: subMenu => dispatch(DrawerMenuActions.setOpenedSubMenu(subMenu)),
})

@withI18N
@connect(mapStateToProps, mapDispatchToProps)
class DrawerMenu extends PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    drawerMenuIsOpen: PropTypes.bool.isRequired,
    drawerMenuOpenedSubMenu: PropTypes.string,

    navigationPush: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
    setOpenedSubMenu: PropTypes.func.isRequired,
  }

  static defaultProps = {
    drawerMenuOpenedSubMenu: null,
  }

  /*
  renderMenuItems = (themeKey) => {
    const { pathname, t, navigationPush, setOpenedSubMenu } = this.props
    return _map(config[themeKey].submenu, (menuItem, menuItemKey) => {
      const isActive = pathname === menuItem.pathname
      return (
        <DrawerMenuItem
          key={menuItemKey}
          className={classnames(isActive && styles[themeKey])}
          onClick={() => {
            navigationPush(menuItem.pathname)
            setOpenedSubMenu(themeKey)
          }}
          title={t(menuItem.titleId)}
          source={menuItem.picture}
          activeSource={menuItem.hoverPicture}
          isActive={isActive}
        />
      )
    })
  }
  */

  renderMenu = () => {
    /*
    const { pathname, t, navigationPush, drawerMenuOpenedSubMenu, setOpenedSubMenu } = this.props

    return _map(config, (theme, themeKey) => {
      const isActive = pathname.startsWith(theme.home.pathname)
      return (
        <List key={themeKey} className={styles.section}>
          <DrawerMenuItemHeader
            className={classnames(isActive && styles[themeKey])}
            onClick={() => {
              navigationPush(theme.home.pathname)
              setOpenedSubMenu(themeKey)
            }}
            title={t(theme.home.titleId)}
            source={theme.home.picture}
            activeSource={theme.home.hoverPicture}
            isActive={isActive}
            onToggle={() => (drawerMenuOpenedSubMenu === themeKey ? setOpenedSubMenu(null) : setOpenedSubMenu(themeKey))}
          />
          <Collapse in={drawerMenuOpenedSubMenu === themeKey} timeout="auto" unmountOnExit>
            <List component="div" disablePadding className={styles.subMenu}>
              {this.renderMenuItems(themeKey)}
            </List>
          </Collapse>
        </List>
      )
    })
    */
    return null
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
