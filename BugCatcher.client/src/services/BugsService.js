import { AppState } from '../AppState.js'
import { Bug } from '../Models/Bug.js'
import { router } from '../router.js'
import { logger } from '../utils/Logger.js'
import { api } from './AxiosService.js'

class BugsService {
  async getBugs(query = '') {
    const res = await api.get('api/bugs' + query)
    AppState.bugs = res.data.map(b => new Bug(b))
    AppState.currentBug = new Bug(res.data)
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

  async editBug(bugId, editbug) {
    try {
      editbug.closed = !editbug.closed
      await api.put(`api/bugs/${bugId}`, editbug)
      this.getBugs()
      this.showCurrentBug(bugId)
    } catch (error) {
      logger.log('did edit work?', error)
    }
  }
}
export const bugsService = new BugsService()
