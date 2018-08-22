import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'

import CenteredPageSection from '../../components/layout/CenteredPageSection'
import ReactLogo from '../../components/common/ReactLogo'
import Menu from '../Menu'

import styles from './desktop-header.scss'

import { actions as NavigationActions } from '../../redux/Navigation/redux'

import routes from '../../navigation/routes'

const mapDispatchToProps = dispatch => ({
  navigationPush: pathname => dispatch(NavigationActions.push(pathname)),
})

@connect(null, mapDispatchToProps)
class DesktopHeader extends PureComponent {
  static propTypes = {
    navigationPush: PropTypes.func.isRequired,
  }

  render() {
    const { navigationPush } = this.props
    return (
      <CenteredPageSection className={styles.wrapper}>
        <Grid container alignItems="center" justify="space-between" className={styles.content}>
          <Grid item xs={2} md={1} className={styles.item}>
            <ReactLogo onClick={() => navigationPush(routes.home)} />
          </Grid>
          <Grid item xs={9} md={7} lg={6} xl={5} className={styles.item}>
            <Menu />
          </Grid>
          <Grid item xs={1} className={styles.item}>
            {/* TODO: Avatar here */}
            A
          </Grid>
        </Grid>
      </CenteredPageSection>
    )
  }
}

export default DesktopHeader
