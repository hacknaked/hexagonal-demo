import validator from 'validator'
import * as err from './errors'

export type TransferOptions = {
  id?: number
  amount: number
  companyId: number
  debitAccount: string
  creditAccount: string
  createdAt?: Date
}

export class Transfer {
  readonly id?: number
  readonly amount: number
  readonly companyId: number
  readonly debitAccount: string
  readonly creditAccount: string
  readonly createdAt: Date

  constructor(options: TransferOptions) {
    this.id = options.id
    this.amount = options.amount
    this.companyId = options.companyId
    this.debitAccount = options.debitAccount
    this.creditAccount = options.creditAccount
    this.createdAt = options.createdAt
    Transfer.validate(this)
  }

  static validate(options: TransferOptions): void {
    if (validator.isEmpty(options.debitAccount || '')) {
      throw new err.InvalidAccount('Invalid debit account')
    }
    if (validator.isEmpty(options.creditAccount || '')) {
      throw new err.InvalidAccount('Invalid credit account')
    }
    if (options.debitAccount == options.creditAccount) {
      throw new err.SameAccounts()
    }
    if (options.amount <= 0) {
      throw new err.InvalidAmount()
    }
  }
}
