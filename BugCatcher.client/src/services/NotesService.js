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

  async deleteNote(id, notes) {
    if (await Pop.confirm()) {
      try {
        const res = await api.delete('api/notes/' + id, notes)
        Pop.toast(res.data, 'success')
        AppState.notes = AppState.notes.filter(n => n.id !== id)
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
