import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import $ from 'jquery/dist/jquery.min'
import { connect } from 'react-redux'

import styles from './sticky-header.scss'
import { actions as AppActions, selectors as AppSelectors } from '../../redux/App/redux'

const mapStateToProps = state => ({
  headerIsSticky: AppSelectors.headerIsSticky(state),
})

const mapDispatchToProps = dispatch => ({
  setHeaderIsSticky: isSticky => dispatch(AppActions.setHeaderIsSticky(isSticky)),
})

@connect(mapStateToProps, mapDispatchToProps)
class StickyHeader extends PureComponent {
  static propTypes = {
    headerIsSticky: PropTypes.bool.isRequired,

    setHeaderIsSticky: PropTypes.func.isRequired,

    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  }

  static defaultProps ={
    className: '',
  }

  componentWillMount() {
    this.onScrollHandler = null
  }

  componentDidMount() {
    this.onScrollHandler = event => this.onScroll(event)
    $(window).scroll(this.onScrollHandler)
  }

  componentWillUnmount() {
    this.offScroll()
  }

  onScroll() {
    const { headerIsSticky, setHeaderIsSticky } = this.props

    const scrollTop = $(window).scrollTop()
    const headerTop = $(this.wrapperNode).offset().top
    const headerHeight = $(this.wrapperNode).height()

    if (!headerIsSticky && scrollTop !== null && headerTop !== null && headerHeight !== null && scrollTop > (headerTop + headerHeight)) {
      setHeaderIsSticky(true)
    } else if (headerIsSticky) {
      setHeaderIsSticky(false)
    }
  }

  offScroll() {
    if (typeof (this.onScrollHandler) !== 'undefined' && this.onScrollHandler !== null) {
      $(window).off('scroll', this.onScrollHandler)
    }
  }

  render() {
    const { className, children, headerIsSticky } = this.props

    const headerHeight = $(this.wrapperNode).height()

    return (
      <div
        ref={(node) => {
          this.wrapperNode = node
        }}
        className={styles.wrapper}
      >
        <div className={classnames(className, headerIsSticky && styles.sticky)}>
          {children}
        </div>
        {
          headerIsSticky
          && (
            <div style={{ height: headerHeight }}>
              &nbsp;
            </div>
          )
        }
      </div>
    )
  }
}

export default StickyHeader
