import express from 'express'
import { connectDb } from './db/helpers.js'
import { port } from './config/environment.js'
import cors from 'cors'
import router from './config/router.js'

const app = express()

app.use(express.json())

const whitelist = ['http://localhost:8081', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },

  credentials: true,
}
app.use('/api', router)

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
