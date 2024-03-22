import { Company, CompanyOptions } from '../company'
import { Service } from './service'

export class CompanyService extends Service<Company> {
  readonly createInstance = (data: CompanyOptions) => new Company(data)
}
