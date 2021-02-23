const standardError = ({
  type = 'Error',
  message = 'undefined error',
  errors = []
}) => {
  const extractedErrors = []
  if (errors !== undefined && Array.isArray(errors)) {
    errors.map(err =>
      extractedErrors.push({ [err.param]: err.msg, location: err.location })
    )
  }
  const error = new Error(type)
  error.details = message
  error.errors = extractedErrors

  return error
}

export default standardError
