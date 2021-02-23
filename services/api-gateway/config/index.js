import path from 'path'
const ENV = process.env.NODE_ENV || 'development'

export default function (configVars) {
  const envConfig = require(path.join(__dirname, 'environments', ENV))
  return Object.assign(
    {
      [ENV]: true,
      env: ENV,
      // tls: no tls for now
      logmsg: require('config/logger.json')
    },
    envConfig.default(configVars.config)
  )
}
