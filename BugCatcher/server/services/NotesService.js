import { dbContext } from '../db/DbContext.js'
import { bugsService } from './BugsService.js'

class NotesService {
  async createNote(noteData) {
    await bugsService.getNotesById(noteData.bugId)
    const note = await dbContext.Note.create(noteData)
    await note.populate('creator')
    return note
  }

  async deleteNote(noteId) {
    const note = await dbContext.Note.findByIdAndRemove(noteId)
    await note.remove()
    return note
  }
}

export const notesService = new NotesService()
