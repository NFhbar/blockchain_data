import Status from 'http-status'

export default (req, res, next) => {
  res.status(Status.NOT_FOUND).send({
    error: {
      type: Status['404_NAME'],
      message: Status['404_MESSAGE']
    }
  })
}
