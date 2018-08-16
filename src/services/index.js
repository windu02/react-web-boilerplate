import { request } from '../redux/WS/sagas'

// import * as NewsService from './NewsService'

/* ***************************** *
 *  /!\  All Services here  /!\  *
 * ***************************** */

const definitions = {
  // news: NewsService,
}

const services = {}

Object.keys(definitions)
  .forEach((serviceKey) => {
    const service = definitions[serviceKey]
    const methods = {}

    Object.keys(service)
      .forEach((actionKey) => {
        const method = service[actionKey]
        const id = `${serviceKey}.${actionKey}`
        const handler = (...args) => request(method, id, ...args)

        methods[actionKey] = handler
      })

    services[serviceKey] = methods
  })

export default services
