import { Company, CompanyOptions } from '../application/company'
import { dbRepository } from './dbRepository'

export class dbCompanyRepository extends dbRepository<Company> {
  readonly model: string = 'company'
  readonly createInstance = (data: CompanyOptions) => new Company(data)
}
