import React, { Fragment, PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import ReactLogo from '../../components/common/ReactLogo'
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
            <IconButton onClick={() => toggleDrawerMenu()}>
              <FontAwesomeIcon icon="bars" className={styles.menuIcon} />
            </IconButton>
            <div className={styles.logoWrapper}>
              <ReactLogo className={styles.logo} onClick={() => navigationPush(routes.home)} />
            </div>
          </Toolbar>
        </AppBar>
        <DrawerMenu />
      </Fragment>
    )
  }
}

export default MobileHeader
