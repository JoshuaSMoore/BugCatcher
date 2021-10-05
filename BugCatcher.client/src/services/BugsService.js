import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { router } from '../router.js'
import { logger } from '../utils/Logger.js'
import Pop from '../utils/Pop.js'
import { api } from './AxiosService.js'
class BugsService {
  async getBugs(query = '') {
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
    AppState.currentBug = new Bug(res.data)
    AppState.sortedBugs = res.data.map(b => new Bug(b))
  }

  async getBugById(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.currentBug = res.data
    logger.log('the one and only res', res.data)
  }

  async createBug(bug) {
    const res = await api.post('api/bugs', bug)
    AppState.bug.push(new Bug(res.data))
    router.push({ name: 'BugDetails', params: { bugId: res.data.id } })
  }

  async closeBug(bugId, currentBug) {
    try {
      const res = await api.delete('api/bugs/' + bugId, currentBug)
      logger.log(res.data, 'closed logger')
      AppState.currentBug = res.data
    } catch (error) {
      Pop.toast(error)
    }
  }

  async editBug(bug) {
    const res = await api.put('api/bugs/' + bug.id, bug)
    AppState.bug = new Bug(res.data)
    AppState.currentBug = res.data
  }

  async getTrackedBugs(bugId) {
    AppState.trackedbugs = []
    const res = await api.get(`api/bugs/${bugId}/trackedbugs`)
    AppState.trackedbugs = res.data
    logger.log('error', bugId)
  }
}

export const bugsService = new BugsService()
