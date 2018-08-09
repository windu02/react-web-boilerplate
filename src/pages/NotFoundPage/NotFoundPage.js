import React, { PureComponent } from 'react'

import { withI18N } from '../../hoc/withI18N'

import styles from './not-found-page.scss'

@withI18N
class NotFoundPage extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <div className={styles.wrapper}>
        { t('not_found.content') }
      </div>
    )
  }
}

export default NotFoundPage
