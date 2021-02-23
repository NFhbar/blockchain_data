import path from 'path'
import winston from 'winston'
const env = process.env.NODE_ENV
const APP = 'service-processor'
const version = '1.0'

export const web = config => {
  return {
    port: config.SERVERPORT,
    version,
    env
  }
}

export const controllers = () => {
  return {
    currentPage: 1,
    pageSize: 10,
    deleted: false
  }
}

export const logging = () => {
  return {
    level: 'debug',
    format: winston.format.combine(
      winston.format.label({
        label: path.basename(process.mainModule.filename)
      }),
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.metadata({
        fillExcept: ['message', 'level', 'timestamp', 'label', 'layer']
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: `${APP} Service` },
    transports: [
      new winston.transports.File({
        filename: './log/platform.error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: './log/platform.combined.log'
      })
    ]
  }
}
