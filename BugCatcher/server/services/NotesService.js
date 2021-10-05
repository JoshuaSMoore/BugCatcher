import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
import { logger } from '../utils/Logger.js'

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Note.create(noteData)
    await dbContext.Note.findById(note.id)
    await note.populate('creator')

    return note
  }

  async deleteNote(noteId, accountId) {
    const note = await dbContext.Note.findById(noteId)
    if (accountId !== note.creatorId.toString()) {
      logger.log('testing the delete on server side', accountId)
      throw new Forbidden('Not allowed to close')
    }
    await note.remove()
    return note
  }
}

export const notesService = new NotesService()
