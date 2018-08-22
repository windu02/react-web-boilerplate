import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ReactPicture from '../../../assets/images/react_logo.png'

import styles from './react-logo.scss'

class ReactLogo extends PureComponent {
  static propTypes = {
    onClick: PropTypes.func,

    className: PropTypes.string,
  }

  static defaultProps = {
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
    const { className, onClick } = this.props

    return (
      <div
        role="button"
        tabIndex="-1"
        className={classnames(styles.wrapper, onClick !== null && styles.clickable, className)}
        onClick={this.handleClick}
        onKeyDown={this.handleClick}
      >
        <div
          className={styles.logo}
          style={{ backgroundImage: `url(${ReactPicture})` }}
        />
      </div>
    )
  }
}

export default ReactLogo
