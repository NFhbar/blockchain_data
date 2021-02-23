import { checkSchema } from 'express-validator'
import logger from 'config/logger.json'

export const getTokenStatsValidator = () => {
  return checkSchema({
    token: {
      in: ['params'],
      custom: {
        options: (value, { req }) => {
          // silly check for "proper" eth address
          return value.toString().substring(0, 2) === '0x'
        }
      },
      errorMessage: logger.errors.validation.invalidTokenAddress
    },
    type: {
      in: ['query'],
      isIn: { options: [['average', 'median']] },
      errorMessage: logger.errors.validation.invalidTypeForTokenTransfer
    }
  })
}
