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
        Pop.toast('Note Deleted', 'success')
        AppState.notes = AppState.notes.filter(n => n.id !== id)
        logger.log('the res', res)
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
      Pop.toast(error)
    }
  }
}

export const notesService = new NotesService()
