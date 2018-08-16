import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import ButtonBase from '@material-ui/core/ButtonBase'

import RatioPicture from '../../common/RatioPicture/RatioPicture'

import styles from './drawer-menu-item.scss'

class DrawerMenuItem extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
    activeSource: PropTypes.string.isRequired,
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
    const { isActive, source, activeSource, title, className } = this.props

    return (
      <ButtonBase
        className={classnames(styles.wrapper, className)}
        onClick={this.handleClick}
      >
        {
          !isActive
          && (
            <div className={styles.iconWrapper}>
              <RatioPicture source={source} />
            </div>
          )
        }
        {
          isActive
          && (
            <div className={styles.iconWrapper}>
              <RatioPicture source={activeSource} />
            </div>
          )
        }
        <div className={classnames(styles.title, isActive && styles.active)}>
          {title}
        </div>
      </ButtonBase>
    )
  }
}

export default DrawerMenuItem
