export type QueryOperator = 'equals' | 'lt' | 'gt' | 'lte' | 'gte' | 'some'

export class QueryFilter {
  constructor(
    public field: string,
    public operator: QueryOperator,
    public value: string,
    public relation?: { model: string; operator: QueryOperator }
  ) {}
}

export interface Repository<T> {
  create(instance: T): Promise<T>
  findMany(filter?: QueryFilter[]): Promise<T[]>
  findUnique(filter?: QueryFilter[]): Promise<T | null>
}
