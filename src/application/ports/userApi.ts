import { CompanyService } from '../services/companyService'
import { TransferService } from '../services/transferService'

export type UserApiServices = CompanyService | TransferService

export interface UserApi {
  setEndpointsCallbacks(service: UserApiServices, route: string): void
}
