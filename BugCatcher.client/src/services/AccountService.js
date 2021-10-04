import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = res.data
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }

  async getTrackedBugs(accountId) {
    const res = await api.get('/account/trackedbugs', accountId)
    AppState.trackedbugs = res.data
    logger.log('error', accountId)
  }
}

export const accountService = new AccountService()
