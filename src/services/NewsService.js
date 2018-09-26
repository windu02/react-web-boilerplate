import { ApiService, getConfig } from './ApiService'

export const getLast = ({ token }) => (
  ApiService.get('/news/last', null, getConfig({ token }))
)

export default getLast
