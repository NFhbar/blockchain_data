import express from 'express'
import http from 'http'

class Server {
  constructor ({ config, router, logger }) {
    this.config = config
    this.logger = logger
    this.express = express()
    this.express.disable('x-powered-by')
    this.express.use(router)
  }

  start () {
    // https will be used for prod
    const server = http.createServer(this.express)

    return new Promise(resolve => {
      const http = server.listen(this.config.web.port, '0.0.0.0', () => {
        const { port } = http.address()
        const { logmsg } = this.config
        this.logger.info({
          event: logmsg.event.start,
          info: `${logmsg.info.serverStart} ${port}`,
          meta: {}
        })

        resolve()
      })
    })
  }
}

export default Server
