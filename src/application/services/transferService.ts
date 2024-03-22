import { Transfer, TransferOptions } from '../transfer'
import { Service } from './service'

export class TransferService extends Service<Transfer> {
  readonly createInstance = (data: TransferOptions) => new Transfer(data)
}
