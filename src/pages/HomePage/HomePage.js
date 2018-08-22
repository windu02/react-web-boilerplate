import React, { PureComponent } from 'react'

import withI18N from '../../hoc/withI18N'
import page from '../../hoc/page'

@page
@withI18N
class HomePage extends PureComponent {
  render() {
    const { t } = this.props

    return (
      <div>
        {t('home.hi')}
      </div>
    )
  }
}

export default HomePage
