import Status from 'http-status'
const getAccountBalance = (req, res, next) => {
  const {
    getAccountBalance,
    logger,
    config: { logmsg }
  } = req
  const {
    SUCCESS,
    ERROR,
    VALIDATION_ERROR
  } = getAccountBalance.outputs
  getAccountBalance
    .on(SUCCESS, balance => {
      logger.info({
        event: logmsg.event.get,
        info: logmsg.info.account.balance,
        meta: balance
      })
      res.status(Status.OK).json(balance)
    })
    .on(VALIDATION_ERROR, error => {
      logger.error({
        event: logmsg.event.create,
        info: logmsg.errors.account.balanceError,
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
    info: logmsg.info.account.balance,
    meta: req.origin
  })
  getAccountBalance.execute({
    account: req.params.account,
    token: req.query.token
  })
}
export default getAccountBalance
