import React, { PureComponent } from 'react'
import hoistNonReactStatic from 'hoist-non-react-statics'

import { getDisplayName } from '../helpers/HOCHelper'

import PageComponent from '../components/layout/Page'

export default (WrappedComponent) => {
  class Page extends PureComponent {
    render() {
      return (
        <PageComponent>
          <WrappedComponent {...this.props} />
        </PageComponent>
      )
    }
  }

  Page.displayName = `Page(${getDisplayName(WrappedComponent)})`

  hoistNonReactStatic(Page, WrappedComponent)

  return Page
}
