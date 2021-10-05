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

  async removeTrackedBug(trackedBugId) {
    try {
      const res = await api.delete(`api/trackedbugs/${trackedBugId}`)
      AppState.trackedbugs = res.data
    } catch (error) {
      logger.log('tracked bugs creatior error', error)
    }
  }
}

export const trackedBugsService = new TrackedBugsService()
