import validator from 'validator'
import * as err from './errors'

export type CompanyOptions = {
  id?: number
  name: string
  cuit: string
  createdAt?: Date
}

export class Company {
  readonly id?: number
  readonly name: string
  readonly cuit: string
  readonly createdAt: Date

  constructor(options: CompanyOptions) {
    this.id = options.id
    this.name = options.name
    this.cuit = options.cuit.replace(/-/g, '')
    this.createdAt = options.createdAt || new Date()
    Company.validate(this)
  }

  static validate(options: CompanyOptions): void {
    if (validator.isEmpty(options.name || '')) {
      throw new err.InvalidCompanyName()
    }
    if (!validator.matches(options.cuit, /^(20|23|27|30|33)([0-9]{9})$/)) {
      throw new err.InvalidCUIT()
    }
  }
}
