import { Request, Response, NextFunction } from 'express'
import HttpException from '../../utils/httpException'
import NoteService from './note.service'

const noteService = new NoteService()

export default class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await noteService.getAllNotes()
      res.send(products)
    } catch (error: any) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await noteService.createNote(req.body)
      res.send(product)
    } catch (error: any) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const project = await noteService.editNote(id, req.body)
      res.send(project)
    } catch (error: any) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await noteService.deleteNote(req.params.id)
      res.send(result)
    } catch (error: any) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }
}
