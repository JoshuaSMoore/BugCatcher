import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'
import { bugsService } from './BugsService.js'

class NotesService {
  async createNote(noteData) {
    await bugsService.getBugById(noteData.bugId)
    const note = await dbContext.Note.create(noteData)
    await note.populate('creator')
    return note
  }

  async deleteNote(noteId, userId) {
    const note = await dbContext.Note.findByIdAndRemove(noteId)
    if (userId !== note.creatorId.toString()) {
      throw new Forbidden('Not allowed to close')
    }
    await note.remove()
    return note
  }
}

export const notesService = new NotesService()
