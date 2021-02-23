import Status from 'http-status'

/* istanbul ignore next */
export default (err, req, res, next) => {
  // eslint-disable-line no-unused-vars

  res.status(Status.INTERNAL_SERVER_ERROR).json({
    error: {
      type: err.type,
      message: err.message,
      stack: err.stack
    }
  })
}
