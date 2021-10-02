import { Auth0Provider } from '@bcwdev/auth0provider'
import { dbContext } from '../db/DbContext.js'
import BaseController from '../utils/BaseController.js'

export class NotesController extends BaseController {
  constructor() {
    super('api')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('/notes', this.createNote)
      .delete('/notes/:noteId', this.deleteNote)
  }

  async createNote(req, res, next) {
    try {
      const note = await notesService.createNote(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      const note = await notesService.deleteNote(req.params.bugId, req.params.accountId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}
