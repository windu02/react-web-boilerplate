import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import Menu from '../../../containers/Menu'

import styles from './page.scss'

class Page extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <div className={styles.wrapper}>
        <Menu />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}

export default Page
