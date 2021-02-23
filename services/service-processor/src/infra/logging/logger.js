import winston from 'winston'

export default ({ config }) => {
  const logger = winston.createLogger(config.logging)
  return logger
}
