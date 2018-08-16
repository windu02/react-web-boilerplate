const app = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3333/api',
  TIMEOUT: process.env.REACT_APP_API_TIMEOUT || 10000,
}

export default app
