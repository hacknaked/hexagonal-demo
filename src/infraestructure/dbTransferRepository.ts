import { Transfer, TransferOptions } from '../application/transfer'
import { dbRepository } from './dbRepository'

export class dbTransferRepository extends dbRepository<Transfer> {
  model = 'transfer'

  readonly createInstance = (data: TransferOptions) => new Transfer(data)
}
