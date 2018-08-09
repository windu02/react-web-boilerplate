import 'babel-polyfill'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'

import bugsnag from 'bugsnag-js'
import createPlugin from 'bugsnag-react'

import App from './app/App'
import registerServiceWorker from './registerServiceWorker'
import { bugsnag as bugsnagConfig } from './config'

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
