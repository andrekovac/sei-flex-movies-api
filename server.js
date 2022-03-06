import express from 'express'
import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'
import cors from 'cors'
import router from './config/router.js'

const app = express()

app.use(express.json())
app.use('/api', router)
app.use(cors())

async function startServer() {
  try {
    await connectDb()
    console.log('🤖 Mongoose is connected')
    app.listen(port, () => console.log(`🤖 Listening on Port: ${port}`))
  } catch (err) {
    console.log('🤖 Oh no something went wrong')
  }
}

startServer()
