import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './ratio-picture.scss'

class RatioPicture extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
    ratio: PropTypes.number,

    className: PropTypes.string,
  }

  static defaultProps = {
    ratio: 1,

    className: '',
  }

  render() {
    const { source, ratio, className } = this.props

    return (
      <div
        className={classnames(styles.wrapper, className)}
        style={{ paddingBottom: `${100 / ratio}%` }}
      >
        <div
          className={styles.picture}
          style={{ backgroundImage: `url(${source})` }}
        />
      </div>
    )
  }
}

export default RatioPicture
