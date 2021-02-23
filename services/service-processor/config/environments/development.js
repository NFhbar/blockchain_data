import {
  web,
  logging,
  controllers
} from 'config/configGenerator'

export default function (config) {
  return {
    web: web(config),
    logging: logging(),
    controllers: controllers()
  }
}
