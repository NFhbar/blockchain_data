class Application {
  constructor ({ server, logger }) {
    this.server = server
    this.logger = logger
  }

  async start () {
    await this.server.start()
  }
}

export default Application
