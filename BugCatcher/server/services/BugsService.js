import { dbContext } from '../db/DbContext.js'
import { BadRequest, Forbidden } from '../utils/Errors.js'

class BugsService {
  async getBugs(query) {
    const bugs = await dbContext.Bug.find(query).sort('-createdAt').populate('creator')
    return bugs
  }

  async getBugById(bugId) {
    const bug = await dbContext.Bug.findById(bugId).populate('creator')
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
    const note = await dbContext.Note.find({ bugId }).populate('creator')
    if (!note) {
      throw new BadRequest('Invalid Bug Id')
    }
    return note
  }

  async getTrackedBugsById(bugId) {
    const bugs = await dbContext.TrackedBug.find({ bugId }).populate('tracker').populate('bug')
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

  async closeBug(bugId, accountId) {
    const bug = await this.getBugById(bugId)
    if (bug.closed === true) { return }
    if (accountId !== bug.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    bug.closed = true
    await bug.save()
    return bug
  }
}

export const bugsService = new BugsService()
