import { PrismaClient } from '@prisma/client'
import { CompanyService } from '../application/services/companyService'
import { TransferService } from '../application/services/transferService'
import { QueryFilter } from '../application/ports/repository'
import * as errors from '../application/errors'

import { dbCompanyRepository } from '../infraestructure/dbCompanyRepository'
import { dbTransferRepository } from '../infraestructure/dbTransferRepository'

const companies = [
  {
    id: 1,
    name: 'CompanyA',
    cuit: '20-12345678-9',
    createdAt: new Date('2023-12-21T00:00:00Z')
  },
  {
    id: 2,
    name: 'CompanyB',
    cuit: '20-11111111-1',
    createdAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    id: 3,
    name: 'CompanyC',
    cuit: '20-22222222-2',
    createdAt: new Date('2024-02-01T00:00:00Z')
  },
  {
    id: 4,
    name: 'CompanyD',
    cuit: '20-33333333-3',
    createdAt: new Date('2024-02-20T00:00:00Z')
  },
  {
    id: 5,
    name: 'CompanyE',
    cuit: '20-44444444-4',
    createdAt: new Date('2024-03-01T00:00:00Z')
  },
  {
    id: 6,
    name: 'CompanyF',
    cuit: '20-55555555-5',
    createdAt: new Date('2024-03-21T00:00:00Z')
  },
  {
    id: 7,
    name: 'CompanyG',
    cuit: '20-66666666-6',
    createdAt: new Date('2025-01-31T00:00:00Z')
  }
]

const transfers = [
  {
    id: 1,
    amount: 4500.0,
    companyId: 1,
    debitAccount: '111-012345/6',
    creditAccount: '400-888888/8',
    createdAt: new Date('2023-12-30T14:00:00Z')
  },
  {
    id: 2,
    amount: 11399.99,
    companyId: 1,
    debitAccount: '111-012345/6',
    creditAccount: '400-888888/8',
    createdAt: new Date('2024-01-12T14:05:00Z')
  },
  {
    id: 3,
    amount: 1.04,
    companyId: 4,
    debitAccount: ' 444-012345/6',
    creditAccount: '400-888888/8',
    createdAt: new Date('2024-02-22T13:05:00Z')
  },
  {
    id: 4,
    amount: 1.04,
    companyId: 5,
    debitAccount: ' 555-012345/6',
    creditAccount: '400-888888/8',
    createdAt: new Date('2024-02-29T13:45:00Z')
  }
]

describe('dbService', () => {
  let db: PrismaClient
  let companyRepository: dbCompanyRepository
  let transferRepository: dbTransferRepository
  let companyService: CompanyService
  let transferService: TransferService

  beforeAll(async () => {
    db = new PrismaClient()
    await db.$executeRaw`DELETE FROM "Transfer";`
    await db.$executeRaw`DELETE FROM "Company";`
    companyRepository = new dbCompanyRepository(db)
    transferRepository = new dbTransferRepository(db)
    companyService = new CompanyService(companyRepository)
    transferService = new TransferService(transferRepository)

    for (const data of companies) {
      await companyService.create({ ...data })
    }
    for (const data of transfers) {
      await transferService.create({ ...data })
    }
  })

  afterAll(async () => {
    await db.$disconnect()
  })

  test('findUnique() filters by String field', async () => {
    const filter = new QueryFilter('name', 'equals', 'CompanyD')
    const result = await companyService.findUnique([filter])
    expect(result.name).toBe('CompanyD')
  })

  test('findUnique() filters by Float field', async () => {
    const filter = new QueryFilter('amount', 'equals', '4500.00')
    const result = await transferService.findUnique([filter])
    expect(result.id).toBe(1)
  })

  test('findUnique() filters by Int field', async () => {
    const filter = new QueryFilter('id', 'equals', '1')
    const result = await transferService.findUnique([filter])
    expect(result.id).toBe(1)
  })

  test('findUnique() returns null', async () => {
    const filter = new QueryFilter('id', 'equals', '999')
    const result = await transferService.findUnique([filter])
    expect(result).toBeNull()
  })

  test('findUnique() throws a MultipleRecords exeption', async () => {
    const filter = new QueryFilter('creditAccount', 'equals', '400-888888/8')
    try {
      await transferService.findUnique([filter])
      expect(true).toBeFalsy()
    } catch (error) {
      expect(error).toBeInstanceOf(errors.MultipleRecords)
    }
  })

  test('findMany() returns all records', async () => {
    const result = await companyService.findMany()
    expect(result.length).toBe(companies.length)
    for (let i = 0; i < result.length; i++) {
      expect(result[i].name).toBe(companies[i].name)
      expect(result[i].cuit).toBe(companies[i].cuit.replace(/-/g, ''))
      expect(result[i].createdAt.toISOString()).toBe(
        companies[i].createdAt.toISOString()
      )
    }
  })

  test('findMany() filters by range of dates', async () => {
    const gte = new QueryFilter('createdAt', 'gte', '2024-01-01T00:00:00Z')
    const lte = new QueryFilter('createdAt', 'lte', '2024-12-31T23:59:59Z')
    const result = await companyService.findMany([gte, lte])
    console.log(result)
    expect(result.length).toBe(companies.length - 2)
    const year2024 = new Date('2024-01-01T00:00:00Z')
    for (let i = 0; i < result.length; i++) {
      expect(result[i].createdAt.getFullYear()).toBeGreaterThanOrEqual(
        year2024.getFullYear()
      )
    }
  })

  test('findMany() filters by relation fields', async () => {
    const gte = new QueryFilter('createdAt', 'gte', '2023-01-01Z', {
      model: 'transfer',
      operator: 'some'
    })
    const lte = new QueryFilter('createdAt', 'lte', '2024-01-31Z', {
      model: 'transfer',
      operator: 'some'
    })
    const result = await companyService.findMany([gte, lte])
    expect(result.length).toBe(1)
    expect(result[0].name).toBe('CompanyA')
  })
})
