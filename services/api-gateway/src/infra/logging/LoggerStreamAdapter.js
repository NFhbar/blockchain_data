import winston from 'winston'
const logFormat = winston.format.printf(
  info =>
    `${info.timestamp} ${info.level} [${info.message.event}]: ${info.message.info
    } - ${JSON.stringify(info.message.meta)}`
)

const LoggerStreamAdapter = new winston.transports.Console({
  format: winston.format.combine(winston.format.colorize(), logFormat)
})

module.exports = LoggerStreamAdapter
