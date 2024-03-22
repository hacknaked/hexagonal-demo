import { PrismaClient } from '@prisma/client'
import { Repository, QueryFilter } from '../application/ports/repository'
import * as errors from '../application/errors'

export class dbRepository<T> implements Repository<T> {
  readonly model: string = 'myModel'
  readonly createInstance: (data) => T

  constructor(readonly db?: PrismaClient) {
    this.db = db || new PrismaClient()
  }

  async create(data): Promise<T> {
    const record = await this.db[this.model].create({ data })
    return record
  }

  async findMany(filter?: QueryFilter[]): Promise<T[]> {
    const where = this.prepareFilter(filter)
    const records = await this.db[this.model].findMany({ where })
    return records.map((data) => this.createInstance({ ...data }))
  }

  async findUnique(filter?: QueryFilter[]): Promise<T | null> {
    const records = await this.findMany(filter)
    if (records.length == 0) {
      return null
    } else if (records.length == 1) {
      return records[0]
    } else {
      throw new errors.MultipleRecords()
    }
  }

  private prepareFilter(filter: QueryFilter[]) {
    const modelMap = { company: 'companies', transfer: 'transfers' }
    filter = filter || []
    return {
      AND: filter.map((f) => {
        if (f.relation) {
          const { model, operator } = f.relation
          return {
            [modelMap[model]]: {
              [operator]: {
                [f.field]: { [f.operator]: this.parseValue(f, model) }
              }
            }
          }
        } else {
          return { [f.field]: { [f.operator]: this.parseValue(f) } }
        }
      })
    }
  }

  private parseValue(f: QueryFilter, model?: string) {
    model = model || this.model
    const ftype = this.db[model].fields[f.field].typeName
    switch (ftype) {
      case 'DateTime':
        return new Date(f.value)
      case 'Int':
        return parseInt(f.value)
      case 'Float':
        return parseFloat(f.value)
      default:
        return f.value
    }
  }
}
