import Movie from './models/movie.js'
import { connectDb } from './db/helpers.js'

await connectDb()
const movies = await Movie.find()

console.log(movies)
