import Movie from '../models/movie.js'

async function getAllMovies(_req, res, next) {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
}

async function createMovie(req, res, next) {
  try {
    const newMovie = await Movie.create(req.body)
    res.status(201).send(newMovie)
  } catch (err) {
    next(err)
  }
}

async function getMovie(req, res, next) {
  const { id } = req.params

  try {
    const movie = await Movie.findById(id)
    res.send(movie)
  } catch (err) {
    next(err)
  }
}

async function deleteMovie(req, res, next) {
  const { id } = req.params

  try {
    const movieToDelete = await Movie.findById(id)
    await movieToDelete.deleteOne()
    res.send(movieToDelete)
  } catch (err) {
    next(err)
  }
}

async function updateMovie(req, res, next) {
  const { id } = req.params
  const { body } = req

  console.log(body)

  try {
    const movieToUpdate = await Movie.findById(id)
    if (!movieToUpdate) {
      return res.send({ message: 'No movie found' })
    }
    // Set new fields
    movieToUpdate.set(body)
    // Save
    movieToUpdate.save()

    res.send(movieToUpdate)
  } catch (err) {
    next()
  }
}

export default {
  getAllMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
}
