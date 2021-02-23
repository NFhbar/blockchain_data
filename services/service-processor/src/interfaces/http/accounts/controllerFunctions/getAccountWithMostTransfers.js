import Status from 'http-status'
const getAccountWithMostTransfers = (req, res, next) => {
  const {
    getAccountWithMostTransfers,
    logger,
    config: { logmsg }
  } = req
  const {
    SUCCESS,
    ERROR,
    VALIDATION_ERROR
  } = getAccountWithMostTransfers.outputs
  getAccountWithMostTransfers
    .on(SUCCESS, balance => {
      logger.info({
        event: logmsg.event.get,
        info: logmsg.info.account.mostTransfers,
        meta: balance
      })
      res.status(Status.OK).json(balance)
    })
    .on(VALIDATION_ERROR, error => {
      logger.error({
        event: logmsg.event.create,
        info: logmsg.errors.account.mostTransfersError,
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
    info: logmsg.info.account.mostTransfers,
    meta: req.origin
  })
  getAccountWithMostTransfers.execute({
    token: req.query.token
  })
}
export default getAccountWithMostTransfers
