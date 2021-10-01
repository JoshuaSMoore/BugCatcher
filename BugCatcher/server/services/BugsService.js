import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'

class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bug.find(query).sort('-createdAt').populate('creator', 'name picture')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bug.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
    return bug
  }

  async createBug(bugData) {
    const bug = await dbContext.Bug.create(bugData)
    await bug.populate('creator')
    return bug
  }

  async getNotesById(bugId) {
    const bug = await dbContext.Note.findById(bugId).populate('creator', 'name picture')
    if (!bug) {
      throw new BadRequest('Invalid Bug Id')
    }
  }

  async getTrackedBugsById(bugId) {
    const bugs = await dbContext.TrackedBug.find({ bugId }).populate('account', 'name picture')
    return bugs
  }

  async editBug(bugId, userId, bugData) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('Nope, not allowed')
    }
    bug.title = bugData.title || bug.title
    bug.description = bugData.description || bug.description
    bug.priority = bugData.priority || bug.priority
    await bug.save()
    return bug
  }

  async closeBug(bugId, userId) {
    const bug = await this.getBugById(bugId)
    if (userId !== bug.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
