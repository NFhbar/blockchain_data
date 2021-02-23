const { Router } = require('express')
const Status = require('http-status')

const HealthController = {
  get router () {
    const router = Router()
    router.get('/', this.getHealth)
    return router
  },

  getHealth (req, res, next) {
    return res.status(Status.OK).json({ status: Status['200_NAME'] })
  }
}

module.exports = HealthController
