import Movie from '../models/movie.js'
import Actor from '../models/actor.js'
import { removedAdded } from './helpers.js'

async function getAllMovies(_req, res, next) {
  try {
    const movies = await Movie.find()
    return res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
}

async function getAllActorsForMovie(req, res, next) {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id).populate('actors')
    return res.status(200).json(movie.actors)
  } catch (err) {
    next(err)
  }
}

async function createMovie(req, res, next) {
  try {
    const newMovie = await Movie.create(req.body)

    await Actor.updateMany(
      { _id: newMovie.actors },
      { $push: { movies: newMovie._id } }
    )

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

    const actorsToRemove = movie.actors.map((x) => x.toString())

    await Actor.updateMany(
      { _id: actorsToRemove },
      { $pull: { movies: movie._id } }
    )

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

    const [removedActors, addedActors] = removedAdded(
      movie.actors.map((x) => x.toString()),
      req.body.actors
    )

    movie.set(req.body)
    const savedMovie = await movie.save()

    await Actor.updateMany(
      { _id: removedActors },
      { $pull: { movies: savedMovie._id } }
    )

    await Actor.updateMany(
      { _id: addedActors },
      { $push: { movies: savedMovie._id } }
    )

    return res.status(200).json(savedMovie)
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
  getAllActorsForMovie,
}
