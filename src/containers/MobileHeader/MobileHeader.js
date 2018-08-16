import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/es/AppBar/AppBar'
import Toolbar from '@material-ui/core/es/Toolbar/Toolbar'

import DrawerMenu from '../DrawerMenu/DrawerMenu'

import routes from '../../navigation/routes'

import styles from './mobile-header.scss'

import { actions as NavigationActions } from '../../redux/Navigation/redux'
import { actions as DrawerMenuActions } from '../../redux/DrawerMenu/redux'

const mapDispatchToProps = dispatch => ({
  navigationPush: pathname => dispatch(NavigationActions.push(pathname)),
  toggleDrawerMenu: () => dispatch(DrawerMenuActions.toggle()),
})

@connect(null, mapDispatchToProps)
class MobileHeader extends PureComponent {
  static propTypes = {
    navigationPush: PropTypes.func.isRequired,
    toggleDrawerMenu: PropTypes.func.isRequired,
  }

  render() {
    const { navigationPush, toggleDrawerMenu } = this.props

    return (
      <Fragment>
        <AppBar position="static" className={styles.wrapper}>
          <Toolbar>
            <div>TODO</div>
          </Toolbar>
        </AppBar>
        <DrawerMenu />
      </Fragment>
    )
  }
}

export default MobileHeader
