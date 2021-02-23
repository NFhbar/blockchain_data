import {
  web,
  redisConf,
  rateLimiter,
  logging
} from 'config/configGenerator'

export default function (config) {
  return {
    web: web(config),
    rateLimiter: rateLimiter(redisConf(config)),
    logging: logging(),
    redis: redisConf(config)
  }
}
