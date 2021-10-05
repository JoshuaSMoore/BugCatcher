import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { api } from './AxiosService.js'
import { AppState } from '../AppState.js'

class TrackedBugsService {
  async createTrackedBug(id) {
    try {
      const res = await api.post('api/trackedbugs', { bugId: id })
      Pop.toast(res.data, 'success')
      AppState.trackedbugs.shift(res.data)
      logger.log('the res for tracked', res)
    } catch (error) {
      Pop.toast(error)
    }
  }

  async deleteTrackedBug(accountId) {
    const trackedbugs = AppState.trackedbugs
    const currenttracked = trackedbugs.find(t => t.accountId === accountId)
    const res = await api.delete(`api/trackedbugs/${currenttracked.id}`)
    logger.log('tracked delete', res)
    AppState.trackedbugs = AppState.trackedbugs.filter(t => t.id !== currenttracked.id)
  }
}

export const trackedBugsService = new TrackedBugsService()
