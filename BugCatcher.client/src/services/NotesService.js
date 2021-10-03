import { AppState } from '../AppState.js'
import { Note } from '../Models/Note.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService.js'

class NotesService {
  async getNotes(bugId) {
    try {
      const res = await api.get(`/api/bugs/${bugId}/notes`)
      AppState.notes = res.data
    } catch (err) {
      logger.log('Notes Fail', err)
    }
  }

  async deleteNote(noteId) {
    try {
      await api.delete(`api/notes/${noteId}`)
      this.getNotes()
    } catch (error) {
      logger.log(error)
    }
  }

  async createNote(noteId, newNote) {
    try {
      // newNote.bugId = noteId
      const res = await api.post('api/notes', newNote)
      AppState.notes = res.data
    } catch (error) {
      logger.log('notes creatior error', error)
    }
  }
}
export const notesService = new NotesService()
