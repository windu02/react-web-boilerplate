import React, { PureComponent } from 'react'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import withI18N from '../../hoc/withI18N'

import styles from './not-found-page.scss'

@withI18N
class NotFoundPage extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <Grid container justify="center" spacing={16} className={styles.wrapper}>
        <Grid item xs={6}>
          <Paper className={styles.messageWrapper}>
            <FontAwesomeIcon icon="exclamation-triangle" className={styles.icon} />
            <span className={styles.message}>
              { t('not_found.content') }
            </span>
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default NotFoundPage
