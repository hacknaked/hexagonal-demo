import { CompanyService } from './application/services/companyService'
import { TransferService } from './application/services/transferService'
import { UserApi } from './application/ports/userApi'

import { dbCompanyRepository } from './infraestructure/dbCompanyRepository'
import { dbTransferRepository } from './infraestructure/dbTransferRepository'
import { WebUserApi } from './infraestructure/webUserApi'

export class App {
  constructor(
    private userApi: UserApi,
    private companyService: CompanyService,
    private transferService: TransferService
  ) {}

  init() {
    this.userApi.setEndpointsCallbacks(this.companyService, '/api/company')
    this.userApi.setEndpointsCallbacks(this.transferService, '/api/transfer')
  }
}

/**
 * The main function where we create concrete entities, services and ports
 * resolving all dependencies between them.
 */
function main(): void {
  const userApi = new WebUserApi()
  const companyRepository = new dbCompanyRepository()
  const transferRepository = new dbTransferRepository()
  const companyService = new CompanyService(companyRepository)
  const transferService = new TransferService(transferRepository)
  const app = new App(userApi, companyService, transferService)
  app.init()
}

// -- entry point --
main()
