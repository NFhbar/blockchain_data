import { checkSchema } from 'express-validator'
import logger from 'config/logger.json'

export const getAccountBalanceValidator = () => {
  return checkSchema({
    account: {
      in: ['params'],
      custom: {
        options: (value, { req }) => {
          // silly check for "proper" eth address
          return value.toString().substring(0, 2) === '0x'
        }
      },
      errorMessage: logger.errors.validation.invalidAccountAddress
    },
    token: {
      in: ['query'],
      custom: {
        options: (value, { req }) => {
          // silly check for "proper" eth address
          return value.toString().substring(0, 2) === '0x'
        }
      },
      errorMessage: logger.errors.validation.invalidTokenAddress
    }
  })
}

export const getAccountHighestBalanceValidator = () => {
  return checkSchema({
    token: {
      in: ['query'],
      custom: {
        options: (value, { req }) => {
          // silly check for "proper" eth address
          return value.toString().substring(0, 2) === '0x'
        }
      },
      errorMessage: logger.errors.validation.invalidTokenAddress
    }
  })
}
