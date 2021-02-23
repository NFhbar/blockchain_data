const LoggerStreamAdapter = require('src/infra/logging/LoggerStreamAdapter')

module.exports = ({ logger }) => {
  return logger.add(LoggerStreamAdapter)
}
