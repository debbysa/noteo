import { Request, Response, NextFunction } from 'express'
import HttpException from '../../utils/httpException'
import NoteService from './note.service'

const productService = new NoteService()

export default class ProductController {
  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await productService.getAllProduct()
      res.send(products)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async store(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await productService.createProduct(req.body)
      res.send(product)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async edit(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const project = await productService.editProduct(id, req.body)
      res.send(project)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await productService.deleteProduct(req.params.id)
      res.send(result)
    } catch (error) {
      next(new HttpException(error.statusCode || 500, error.message))
    }
  }
}
