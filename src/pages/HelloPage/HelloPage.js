import React, { PureComponent } from 'react'

import withI18N from '../../hoc/withI18N'
import page from '../../hoc/page'

import CenteredPageSection from '../../components/layout/CenteredPageSection/CenteredPageSection'

import styles from './hello-page.scss'

@page
@withI18N
class HelloPage extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <CenteredPageSection contentClassName={styles.wrapper}>
        {t('hello.welcome')}
      </CenteredPageSection>
    )
  }
}

export default HelloPage
