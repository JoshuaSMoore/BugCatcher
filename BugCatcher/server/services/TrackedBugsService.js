import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
import { bugsService } from './BugsService.js'

class TrackedBugsService {
  async createTrackedBug(trackedBugData, bugId) {
    await bugsService.getBugById(trackedBugData.bugId)

    if (trackedBugData.bugid === 'bug') {
      throw new Forbidden('Bug has already been tracked')
    }
    const trackedbug = await dbContext.TrackedBug.create(trackedBugData)
    await trackedbug.populate('tracker')
    await trackedbug.populate('bug')
    return trackedbug
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedbug = await dbContext.TrackedBug.findByIdAndDelete(trackedBugId)
    if (userId !== trackedbug.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    await trackedbug.remove()
    return trackedbug
  }
}

export const trackedBugsService = new TrackedBugsService()
