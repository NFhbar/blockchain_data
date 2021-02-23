const Status = require('http-status')

module.exports = (req, res, next) => {
  const { config } = req.container.cradle
  config.rateLimiter
    .consume(req.ip)
    .then(() => {
      next()
    })
    .catch(() => {
      res.status(Status.TOO_MANY_REQUESTS).json({
        error: {
          type: 'too_many_request_error',
          message: 'Exceed API requests for this endpoint/user'
        }
      })
    })
}
