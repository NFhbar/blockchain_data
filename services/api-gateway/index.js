#!/usr/bin/env node
import fs from 'fs'
import container from 'src/container'

const configPath = process.argv[2]
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'))

const configVars = {
  config
}

const c = container({ configVars })
const app = c.resolve('app')

app.start().catch(error => {
  app.logger.error(error.stack)
  process.exit()
})
