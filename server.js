import express from 'express'
import router from './config/router.js'

const app = express()
const port = 3000

// middleware
// in between the request and our routing code (below),
// this middleware is decoding JSON
app.use(express.json())
// using the router for /api/... requests
app.use('/api', router)

// document.addEventListener(eventType, eventHandler)
// app.get(route, routeHandler)
app.get('/', function (req, res) {
  res.send('Hello SEI Flex 21')
})

app.listen(port, () => {
  console.log(`Movies API listening at http://localhost:${port}`)
})
