import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './menu-item.scss'

class MenuItem extends PureComponent {
  static propTypes = {
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool,

    onClick: PropTypes.func,

    className: PropTypes.string,
  }

  static defaultProps = {
    isActive: false,

    onClick: null,

    className: '',
  }

  handleClick = () => {
    const { onClick } = this.props

    if (onClick !== null) {
      onClick()
    }
  }

  render() {
    const { isActive, title, className } = this.props

    return (
      <div
        role="button"
        tabIndex="-1"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        className={classnames(styles.wrapper, className)}
      >
        <div className={classnames(styles.title, isActive && styles.active)}>
          {title}
        </div>
      </div>
    )
  }
}

export default MenuItem
