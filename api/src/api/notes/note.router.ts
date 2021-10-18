import { Router } from 'express'
import NoteController from './note.controller'

const noteRouter = Router()
const noteController = new NoteController()
const baseUrl = '/product'

noteRouter.get(`${baseUrl}`, noteController.index)

noteRouter.post(`${baseUrl}`, noteController.store)

noteRouter.put(`${baseUrl}/:id?`, noteController.edit)

noteRouter.delete(`${baseUrl}/:id?`, noteController.delete)

export default noteRouter
