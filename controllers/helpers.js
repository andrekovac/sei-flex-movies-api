import Cors from 'cors'

export const removedAdded = (previous = [], current = []) => {
  const removed = previous.filter((a) => !current.includes(a))
  const added = current.filter((a) => !previous.includes(a))
  return [removed, added]
}

// Initializing the cors middleware
export const cors = Cors({
  origin: '*',
  // methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}
