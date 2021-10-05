import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class TrackedBugsService {
  async createTrackedBug(body, oldTracked, accountId) {
    for (let i = 0; i < oldTracked.length; i++) {
      const check = oldTracked[i]
      if (check.accountId.toString() === accountId) {
        throw new BadRequest("can't track bugs more than once")
      }
    }
    const newTracked = await dbContext.TrackedBug.create(body)
    await newTracked.populate('bug')
    await newTracked.populate('tracker')
    return newTracked
  }

  async deleteTrackedBug(trackedBugId, userId) {
    const trackedbug = await dbContext.TrackedBug.findByIdAndDelete(trackedBugId)
    if (userId !== trackedbug.accountId.toString()) {
      throw new Forbidden('Not allowed to do thisssss')
    }
    await trackedbug.remove()
    return trackedbug
  }
}

export const trackedBugsService = new TrackedBugsService()
