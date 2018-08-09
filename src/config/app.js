const app = {
  ENV: process.env.REACT_APP_APP_ENV || 'local',
  INITIAL_LOCALE: process.env.REACT_APP_INITIAL_LOCALE || 'fr',
  FAILBACK_LOCALE: process.env.REACT_APP_FAILBACK_LOCALE || 'en',
  LANG_IN_PATH: process.env.REACT_APP_LANG_IN_PATH === 'true',
}

export default app
