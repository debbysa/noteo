require('dotenv').config()

import app from './app'
import { connectDb } from './utils/database'

const port = process.env.PORT || 3000

connectDb()
  .then(() => {
    console.log('Database connected!')
    app.listen(port, () => {
      console.log(`Noteo App listening on http://localhost:${port}/`)
    })
  })
  .catch((err: string) => {
    console.log(err)
  })
