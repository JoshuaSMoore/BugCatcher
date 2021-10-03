import { dbContext } from '../db/DbContext.js'
import { Forbidden } from '../utils/Errors.js'

class NotesService {
  async createNote(noteData) {
    const note = await dbContext.Note.create(noteData)
    await dbContext.Note.findById(note.id)
    await note.populate('creator').populate
    await note.populate('bug').populate

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
