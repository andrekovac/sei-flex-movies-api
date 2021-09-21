import Movie from '../models/movie.js'
import User from '../models/user.js'
import { connectDb, disconnectDb } from './helpers.js'

async function cleanupComments() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    const movies = await Movie.find()
    // Get all movies
    const user = await User.findOne({
      email: 'user@community.wiki',
    })

    // Get all comments of each movie
    for (let movie of movies) {
      movie.comments.forEach((comment) => {
        // Set the createdBy to the "community" user
        comment.set({
          createdBy: user._id,
        })
      })
      if (movie.createdBy) {
        const createdByUser = await User.findById(movie.createdBy)
        if (createdByUser) {
          console.log('movie', movie, 'created by', createdByUser)
          // in this case, there is already a valid user
          return
        }
      }
      movie.set({ createdBy: user._id })
      await movie.save()
      console.log(newMovie)
    }
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

cleanupComments()
