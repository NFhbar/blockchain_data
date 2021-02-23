import redis from 'redis'
import path from 'path'
import winston from 'winston'
import { RateLimiterRedis } from 'rate-limiter-flexible'
const env = process.env.NODE_ENV
const APP = 'api-gateway'
const version = '1.0'

export const web = config => {
  return {
    port: config.SERVERPORT,
    version,
    env,
    serviceProcessor: config.PROCESSOR,
    secure: false
  }
}

export const redisConf = (config) => {
  if (
    config === undefined ||
    config.REDISHOST === undefined ||
    config.REDISPORT === undefined
  ) {
    throw new Error('Invalid redis configuration')
  }
  const redisConf = {
    host: config.REDISHOST,
    port: config.REDISPORT,
    prefix: `${env}:${APP}:`,
    enable_offline_queue: true,
    retry_strategy: function (options) {
      if (options.error && options.error.code === 'ECONNREFUSED') {
        // End reconnecting on a specific error and flush all commands with
        // a individual error
        return new Error('Redis connection refused')
      }
      if (options.total_retry_time > 1000 * 60 * 60) {
        // End reconnecting after a specific timeout and flush all commands
        // with a individual error
        return new Error('Retrying redis connection')
      }
      if (options.attempt > 10) {
        // End reconnecting with built in error
        return undefined
      }
      // reconnect after
      return Math.min(options.attempt * 100, 3000)
    }
  }
  return redisConf
}

export const rateLimiter = redisConf => {
  const redisClient = redis.createClient(redisConf)
  const rateLimiter = new RateLimiterRedis({
    redis: redisClient,
    keyPrefix: 'middleware',
    points: 10, // total number of requests (points)
    duration: 1 // per second (duration) by IP
  })
  return rateLimiter
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
