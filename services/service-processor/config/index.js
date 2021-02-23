import fs from 'fs'
import path from 'path'
const ENV = process.env.NODE_ENV || 'development'

export default function (configVars) {
  const envConfig = require(path.join(__dirname, 'environments', ENV))
  const dbConfig = loadDbConfig()
  return Object.assign(
    {
      [ENV]: true,
      env: ENV,
      // tls: no tls for now
      db: dbConfig,
      logmsg: require('config/logger.json')
    },
    envConfig.default(configVars.config)
  )
}

function loadDbConfig() {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL
  }

  if (fs.existsSync(path.join(__dirname, './database.js'))) {
    if (process.env.NODE_ENV === 'test') {
      return require('./database.test')[ENV]
    }

    return require('./database')[ENV]
  }
}
