import { Company, CompanyOptions } from '../application/company'
import * as errors from '../application/errors'

describe('Company', () => {
  test('Create a valid company', () => {
    const companyOptions: CompanyOptions = {
      name: 'Company Name',
      cuit: '20345678901',
      createdAt: new Date()
    }
    const company = new Company(companyOptions)
    expect(company).toBeDefined()
    expect(company.name).toBe('Company Name')
    expect(company.cuit).toBe('20345678901')
    expect(company.createdAt).toBeInstanceOf(Date)
  })

  test('Create a company with CUIT XX-XXXXXXXX-X', () => {
    const companyOptions: CompanyOptions = {
      name: 'Company Name',
      cuit: '20-12345678-0'
    }
    const company = new Company(companyOptions)
    expect(company.cuit).toBe('20123456780')
  })

  test('Throws an error when creating an unnamed company', () => {
    const companyOptions: CompanyOptions = {
      name: '',
      cuit: '20345678901'
    }
    expect(() => new Company(companyOptions)).toThrow(errors.InvalidCompanyName)
  })

  test('Throws an error when creating a company with invalid CUIT', () => {
    const companyOptions: CompanyOptions = {
      name: 'Company Name',
      cuit: '123'
    }
    expect(() => new Company(companyOptions)).toThrow(errors.InvalidCUIT)
  })
})
