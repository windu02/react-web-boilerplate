import React, { PureComponent } from 'react'

import PageComponent from '../components/layout/Page'

export default WrappedComponent => (
  class Page extends PureComponent {
    render() {
      return (
        <PageComponent>
          <WrappedComponent {...this.props} />
        </PageComponent>
      )
    }
  }
)
