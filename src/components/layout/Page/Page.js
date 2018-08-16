import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import Header from '../Header'

import styles from './page.scss'

class Page extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  static defaultProps ={
    className: '',
  }

  render() {
    const { children, className } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <Header />
        <div className={styles.content}>
          {children}
        </div>
      </div>
    )
  }
}

export default Page
