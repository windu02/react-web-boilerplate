import apisauce from 'apisauce'

import { api as apiConfig } from '../config'

export const ApiService = apisauce.create({
  baseURL: apiConfig.BASE_URL,
  timeout: apiConfig.TIMEOUT,
})

export const getConfig = ({ token }) => ({
  headers: { Authorization: `Bearer ${token}` },
})
