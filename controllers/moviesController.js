import Movie from '../models/movie.js'
import Actor from '../models/actor.js'
import { removedAdded, cors, runMiddleware } from './helpers.js'

async function searchMovies(req, res, next) {
  try {
    const { q } = req.query
    console.log('query', q)
    const regex = new RegExp(q, 'i')

    const query = Movie.find()
    query.where({
      $or: [{ title: regex }, { description: regex }],
    })

    const movies = await query

    await runMiddleware(req, res, cors)

    console.log('found movies', movies)
    return res.status(200).json(movies)
  } catch (err) {
    next(err)
  }
}

/**
 * Retrieve all movies from the database
 */
async function getAllMovies(req, res, next) {
  try {
    // retrieve all movies from the movie database
    const movies = await Movie.find()

    // allow API to be accessible on any client (including your )
    await runMiddleware(req, res, cors)

    const moviesWithExtraWord = movies.map((movie) => ({
      ...movie,
      title: 'HACKER ATTACK ' + movie.title,
    }))

    // "HACKER ATTACK Knives Out 🎬"

    // API response:
    // 1. Add status code 200
    // 2. Return the movies in json data format
    return res.status(200).json(moviesWithExtraWord)
  } catch (err) {
    // catch any error
    next(err)
  }
}

async function getAllActorsForMovie(req, res, next) {
  try {
    const { id } = req.params
    const movie = await Movie.findById(id).populate('actors')

    await runMiddleware(req, res, cors)

    return res.status(200).json(movie.actors)
  } catch (err) {
    next(err)
  }
}

async function createMovie(req, res, next) {
  try {
    const newMovie = await Movie.create({
      // for security, req.currentUser needs to
      // be used after the spread
      ...req.body,
      createdBy: req.currentUser,
    })

    await Actor.updateMany(
      { _id: newMovie.actors },
      { $push: { movies: newMovie._id } }
    )

    await runMiddleware(req, res, cors)

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

    await runMiddleware(req, res, cors)

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
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    // we want to ask mongoose if createdBy and currentUser match
    if (!req.isUserAdmin && !movie.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized action' })
    }

    const actorsToRemove = movie.actors.map((x) => x.toString())

    await Actor.updateMany(
      { _id: actorsToRemove },
      { $pull: { movies: movie._id } }
    )
    await movie.remove()

    await runMiddleware(req, res, cors)

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

    // we want to ask mongoose if createdBy and currentUser match
    if (!req.isUserAdmin && !movie.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized action' })
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

    await runMiddleware(req, res, cors)

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
  searchMovies,
}
