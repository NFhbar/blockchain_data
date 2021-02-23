import Status from 'http-status'
const getAccountHighestBalance = (req, res, next) => {
  const {
    getAccountHighestBalance,
    logger,
    config: { logmsg }
  } = req
  const {
    SUCCESS,
    ERROR,
    VALIDATION_ERROR
  } = getAccountHighestBalance.outputs
  getAccountHighestBalance
    .on(SUCCESS, balance => {
      logger.info({
        event: logmsg.event.get,
        info: logmsg.info.account.highestBalance,
        meta: balance
      })
      res.status(Status.OK).json(balance)
    })
    .on(VALIDATION_ERROR, error => {
      logger.error({
        event: logmsg.event.create,
        info: logmsg.errors.account.highestBalanceError,
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
    info: logmsg.info.account.highestBalance,
    meta: req.origin
  })
  getAccountHighestBalance.execute({
    token: req.query.token
  })
}
export default getAccountHighestBalance
