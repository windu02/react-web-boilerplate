import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import styles from './centered-page-section.scss'

class CenteredPageSection extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    const { children } = this.props

    return (
      <section className={styles.wrapper}>
        <div className={styles.content}>
          {children}
        </div>
      </section>
    )
  }
}

export default CenteredPageSection
