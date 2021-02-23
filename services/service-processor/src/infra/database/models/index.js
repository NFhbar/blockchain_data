import { ModelsLoader } from 'src/infra/sequelize'
import Sequelize from 'sequelize'
import conf from 'config'

export default function ({ configVars }) {
  const { db: config } = conf(configVars)
  config.logging = false
  const sequelize = new Sequelize(config)

  return ModelsLoader.load({
    sequelize,
    baseFolder: __dirname
  })
}
