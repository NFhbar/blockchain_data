import { validationResult } from 'express-validator'
import Status from 'http-status'

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors
    .array()
    .map(err =>
      extractedErrors.push({ [err.param]: err.msg, location: err.location })
    )

  return res.status(Status.BAD_REQUEST).json({
    error: {
      type: Status['400_NAME'],
      message: 'invalid request parameters',
      errors: extractedErrors
    }
  })
}

export default validate
