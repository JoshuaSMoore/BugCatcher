import { AppState } from '../AppState.js'
import { logger } from '../utils/Logger'
import Pop from '../utils/Pop.js'
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
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/notes/' + noteId)
        Pop.toast(res.data.message, 'success')
        AppState.note = AppState.notes.filter(n => n.id !== noteId)
      } catch (error) {
        Pop.toast(error)
      }
    }
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)
      AppState.notes.push(res.data)
    } catch (error) {
      logger.log('notes creatior error', error)
    }
  }
}

export const notesService = new NotesService()
