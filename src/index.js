import 'babel-polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

/* eslint-disable-next-line */
import reset from './styles/reset.scss'

import App from './app/App'
import registerServiceWorker from './registerServiceWorker'
import { bugsnag as bugsnagConfig } from './config'

// Add all icons to the library. To be more precise see: https://github.com/FortAwesome/react-fontawesome#explicit-import
library.add(fas, far, fab)

let Wrapper = Fragment
const bugsnagKey = bugsnagConfig.API_KEY

if (bugsnagKey !== null && bugsnagKey !== 'false') {
  Wrapper = bugsnag(bugsnagKey)
    .use(createPlugin(React))
}

const WrappedApp = (
  <Wrapper>
    <App />
  </Wrapper>
)

ReactDOM.render(WrappedApp, document.getElementById('root'))
registerServiceWorker()
