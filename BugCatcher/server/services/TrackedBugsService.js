import { dbContext } from '../db/DbContext.js'
import { bugsService } from './BugsService.js'

class TrackedBugsService {
  async createTrackedBug(trackedBugData) {
    await bugsService.getBugById(trackedBugData.bugId)

    const trackedbug = await dbContext.TrackedBug.create(trackedBugData)
    await trackedbug.populate('tracker')
    await trackedbug.populate('bug')
    return trackedbug
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedbug = await dbContext.TrackedBug.findByIdAndDelete(trackedBugId)
    await trackedbug.remove()
    return trackedbug
  }
}

export const trackedBugsService = new TrackedBugsService()
