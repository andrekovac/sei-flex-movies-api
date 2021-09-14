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
    return res.status(201).json(newMovie)
  } catch (err) {
    next(err)
  }
}

async function getMovie(req, res, next) {
  const id = req.params.id

  try {
    // We want to find the movie with that id
    // find by id
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    return res.status(200).json(movie)
  } catch (err) {
    next(err)
  }
}

async function deleteMovie(req, res, next) {
  const id = req.params.id

  try {
    // We want to find the movie with that id
    // find by id
    const movie = await Movie.findByIdAndDelete(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    return res.status(200).json(movie)
  } catch (err) {
    next(err)
  }
}

async function updateMovie(req, res, next) {
  try {
    // We want to find the movie with that id
    // find by id
    const id = req.params.id
    //const movie = await Movie.findByIdAndUpdate(id, req.body, { new: true })
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    movie.set(req.body)
    movie.save()
    return res.status(200).json(movie)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllMovies,
  createMovie,
  getMovie,
  deleteMovie,
  updateMovie,
}
