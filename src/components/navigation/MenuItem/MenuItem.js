import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import styles from './menu-item.scss'
import OnHoverPicture from '../../common/OnHoverPicture/OnHoverPicture'

class MenuItem extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
    hoverSource: PropTypes.string.isRequired,
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
    const { isActive, source, hoverSource, title, className } = this.props

    return (
      <div
        role="button"
        tabIndex="-1"
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
        className={classnames(styles.wrapper, className)}
      >
        <OnHoverPicture className={styles.hoverPicture} source={source} hoverSource={hoverSource} forceHover={isActive} />
        <div className={classnames(styles.title, isActive && styles.active)}>
          {title}
        </div>
      </div>
    )
  }
}

export default MenuItem
