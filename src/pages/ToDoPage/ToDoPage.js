import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

import withI18N from '../../hoc/withI18N'
import page from '../../hoc/page'

import { selectors as NavigationSelectors } from '../../redux/Navigation/redux'

const mapStateToProps = state => ({
  pathname: NavigationSelectors.pathname(state),
})

@page
@withI18N
@connect(mapStateToProps)
class ToDoPage extends PureComponent {
  static propTypes = {
    pathname: PropTypes.string.isRequired,
  }

  render() {
    const { pathname, t } = this.props

    return (
      <div>
        {`${pathname} ${t('to_do.status')}`}
      </div>
    )
  }
}

export default ToDoPage
