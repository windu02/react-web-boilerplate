import React, { PureComponent } from 'react'

import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'

import StickyHeader from '../../../containers/StickyHeader'
import DesktopHeader from '../../../containers/DesktopHeader'
import MobileHeader from '../../../containers/MobileHeader'

import styles from './header.scss'

class Header extends PureComponent {
  render() {
    return (
      <Paper square className={styles.wrapper}>
        <Hidden smUp>
          <MobileHeader />
        </Hidden>
        <Hidden xsDown>
          <StickyHeader className={styles.desktopHeader}>
            <DesktopHeader />
          </StickyHeader>
        </Hidden>
      </Paper>
    )
  }
}

export default Header
