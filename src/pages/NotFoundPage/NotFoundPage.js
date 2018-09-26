import React, { PureComponent } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import withI18N from '../../hoc/withI18N'

import styles from './not-found-page.scss'

@withI18N
class NotFoundPage extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <div className={styles.wrapper}>
        <FontAwesomeIcon icon="exclamation-triangle" className={styles.icon} />
        <span className={styles.message}>
          { t('not_found.content') }
        </span>
      </div>
    )
  }
}

export default NotFoundPage
