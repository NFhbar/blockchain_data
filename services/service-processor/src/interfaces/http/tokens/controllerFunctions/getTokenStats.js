import Status from 'http-status'
const getTokenStats = (req, res, next) => {
  const {
    getTokenStats,
    logger,
    config: { logmsg }
  } = req
  const {
    SUCCESS,
    ERROR,
    VALIDATION_ERROR
  } = getTokenStats.outputs
  getTokenStats
    .on(SUCCESS, average => {
      logger.info({
        event: logmsg.event.get,
        info: logmsg.info.token.average,
        meta: average
      })
      res.status(Status.OK).json(average)
    })
    .on(VALIDATION_ERROR, error => {
      logger.error({
        event: logmsg.event.get,
        info: logmsg.errors.token.averageError,
        meta: error
      })
      res.status(Status.BAD_REQUEST).json({
        error: {
          type: Status['400_NAME'],
          message: error.details,
          errors: error.errors
        }
      })
    })
    .on(ERROR, next)
  logger.info({
    event: logmsg.event.get,
    info: logmsg.info.token.average,
    meta: req.origin
  })
  getTokenStats.execute({
    token: req.params.token,
    type: req.query.type
  })
}
export default getTokenStats
