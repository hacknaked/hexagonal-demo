import { QueryFilter, Repository } from '../ports/repository'

export class Service<T> {
  constructor(private repository: Repository<T>) {}

  readonly createInstance: (data) => T

  async findMany(filter?: QueryFilter[]): Promise<T[]> {
    return this.repository.findMany(filter)
  }

  async findUnique(filter?: QueryFilter[]): Promise<T> {
    return this.repository.findUnique(filter)
  }

  async create(data): Promise<T> {
    const instance = this.createInstance(data)
    return this.repository.create(instance)
  }
}
