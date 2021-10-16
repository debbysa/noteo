import express, { Request, Response } from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.json({
    isSuccess: true,
    message: 'This is our service',
  })
})

export default app
