class CustomError extends Error {
  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

function createCustomError(name: string, defaultMessage: string) {
  return class extends CustomError {
    constructor(message: string = defaultMessage) {
      super(message)
      this.name = name
    }
  }
}

export const InvalidCompanyName = createCustomError(
  'InvalidCompanyName',
  'Please provide a valid company name'
)

export const InvalidCUIT = createCustomError(
  'InvalidCUIT',
  'Please provide a valid CUIT'
)

export const SameAccounts = createCustomError(
  'SameAccounts',
  'Accounts cannot be the same'
)

export const InvalidAmount = createCustomError(
  'InvalidAmount',
  'Invalid amount value'
)

export const InvalidAccount = createCustomError(
  'InvalidAccount',
  'Invalid account'
)

export const InvalidDate = createCustomError('InvalidDate', 'Invalid date')

export const MultipleRecords = createCustomError(
  'MultipleRecords',
  'Multiple records'
)
