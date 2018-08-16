import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import IconButton from '@material-ui/core/IconButton'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import HomeIcons from '../../../styles/icons'

import styles from './drawer-menu-item-header.scss'
import DrawerMenuItem from '../DrawerMenuItem/DrawerMenuItem'

class DrawerMenuItemHeader extends PureComponent {
  static propTypes = {
    source: PropTypes.string.isRequired,
    activeSource: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    isOpen: PropTypes.bool,

    onClick: PropTypes.func,
    onToggle: PropTypes.func,

    className: PropTypes.string,
  }

  static defaultProps = {
    isActive: false,
    isOpen: false,

    onClick: null,
    onToggle: null,

    className: '',
  }

  handleToggle = () => {
    const { onToggle } = this.props

    if (onToggle !== null) {
      onToggle()
    }
  }

  render() {
    const {
      isActive,
      source,
      activeSource,
      title,
      isOpen,
      className,
      onClick,
    } = this.props

    return (
      <div className={classnames(styles.wrapper, className)}>
        <DrawerMenuItem source={source} activeSource={activeSource} title={title} onClick={onClick} isActive={isActive} />
        <div className={styles.openIndicator}>
          {
            isOpen
            && (
              <IconButton onClick={this.handleToggle}>
                <FontAwesomeIcon icon={HomeIcons.angleUp} className={classnames(styles.icon, isActive && styles.active)} />
              </IconButton>
            )
          }
          {
            !isOpen
            && (
              <IconButton onClick={this.handleToggle}>
                <FontAwesomeIcon icon={HomeIcons.angleDown} className={classnames(styles.icon, isActive && styles.active)} />
              </IconButton>
            )
          }
        </div>
      </div>
    )
  }
}

export default DrawerMenuItemHeader
