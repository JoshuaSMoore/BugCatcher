import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService.js'
import { trackedBugsService } from '../services/TrackedBugsService.js'
import BaseController from '../utils/BaseController.js'

export class TrackedBugsController extends BaseController {
  constructor() {
    super('api/trackedbugs')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createTrackedBug)
      .delete('/:trackedBugId', this.deleteTrackedBug)
  }

  async createTrackedBug(req, res, next) {
    try {
      req.body.accountId = req.userInfo.id
      const oldTracked = await bugsService.getTrackedBugsById(req.body.bugId)
      const newTracked = await trackedBugsService.createTrackedBug(req.body, oldTracked, req.userInfo.id)
      res.send(newTracked)
    } catch (error) {
      next(error)
    }
  }

  async deleteTrackedBug(req, res, next) {
    try {
      const trackedbug = await trackedBugsService.deleteTrackedBug(req.params.trackedBugId, req.userInfo.id)
      res.send(trackedbug)
    } catch (error) {
      next(error)
    }
  }
}
