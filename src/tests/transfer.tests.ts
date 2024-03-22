import { Transfer, TransferOptions } from '../application/transfer'
import * as errors from '../application/errors'

describe('Transfer', () => {
  test('Create a valid transfer', () => {
    const transferOptions: TransferOptions = {
      amount: 100,
      companyId: 1,
      debitAccount: '1234',
      creditAccount: '5678',
      createdAt: new Date()
    }
    const transfer = new Transfer(transferOptions)
    expect(transfer).toBeDefined()
    expect(transfer.amount).toBe(100)
    expect(transfer.companyId).toBe(1)
    expect(transfer.debitAccount).toBe('1234')
    expect(transfer.creditAccount).toBe('5678')
    expect(transfer.createdAt).toBeInstanceOf(Date)
  })

  test('Throws an error when creating a transfer with an invalid debit account', () => {
    const transferOptions: TransferOptions = {
      amount: 100,
      companyId: 1,
      debitAccount: '',
      creditAccount: '5678'
    }
    expect(() => new Transfer(transferOptions)).toThrow(errors.InvalidAccount)
  })

  test('Throws an error when creating a transfer with an invalid credit account', () => {
    const transferOptions: TransferOptions = {
      amount: 100,
      companyId: 1,
      debitAccount: '1234',
      creditAccount: ''
    }
    expect(() => new Transfer(transferOptions)).toThrow(errors.InvalidAccount)
  })

  test('Throws an error when creating a transfer with equal accounts', () => {
    const transferOptions: TransferOptions = {
      amount: 100,
      companyId: 1,
      debitAccount: '1234',
      creditAccount: '1234'
    }
    expect(() => new Transfer(transferOptions)).toThrow(errors.SameAccounts)
  })

  test('Throws an error when creating a transfer with an invalid amount', () => {
    const transferOptions: TransferOptions = {
      amount: 0,
      companyId: 1,
      debitAccount: '1234',
      creditAccount: '5678'
    }
    expect(() => new Transfer(transferOptions)).toThrow(errors.InvalidAmount)
  })
})
