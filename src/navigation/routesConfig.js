import HelloPage from '../pages/HelloPage'
import HomePage from '../pages/HomePage'
import ToDoPage from '../pages/ToDoPage'

import routes from './routes'

export default {
  goodbye: {
    pathname: routes.goodbye,
    component: ToDoPage,
  },
  home: {
    pathname: routes.home,
    component: HomePage,
  },
  hello: {
    pathname: routes.hello,
    component: HelloPage,
  },
}
