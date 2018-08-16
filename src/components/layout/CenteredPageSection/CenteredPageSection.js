import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './centered-page-section.scss'

class CenteredPageSection extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
  }

  static defaultProps ={
    className: '',
    contentClassName: '',
  }

  render() {
    const { className, contentClassName, children } = this.props

    return (
      <section className={classnames(styles.wrapper, className)}>
        <div className={classnames(styles.content, contentClassName)}>
          { children }
        </div>
      </section>
    )
  }
}

export default CenteredPageSection
