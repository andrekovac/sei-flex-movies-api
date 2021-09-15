import Actor from '../models/actor.js'
import Movie from '../models/movie.js'
import { removedAdded } from './helpers.js'

async function getAllActors(_req, res, next) {
  try {
    const actors = await Actor.find()
    return res.status(200).json(actors)
  } catch (err) {
    next(err)
  }
}

async function getAllMoviesForActor(req, res, next) {
  try {
    const { id } = req.params
    const actor = await Actor.findById(id).populate('movies')
    return res.status(200).json(actor.movies)
  } catch (err) {
    next(err)
  }
}

async function createActor(req, res, next) {
  try {
    const newActor = await Actor.create(req.body)

    await Movie.updateMany(
      { _id: newActor.movies },
      { $push: { actors: newActor._id } }
    )

    return res.status(201).json(newActor)
  } catch (err) {
    next(err)
  }
}

async function getActor(req, res, next) {
  const id = req.params.id

  try {
    // We want to find the Actor with that id
    // find by id
    const actor = await Actor.findById(id)

    if (!actor) {
      return res.status(404).send({ message: 'Actor does not exist' })
    }

    return res.status(200).json(actor)
  } catch (err) {
    next(err)
  }
}

async function deleteActor(req, res, next) {
  const id = req.params.id

  try {
    // We want to find the Actor with that id
    // find by id
    const actor = await Actor.findByIdAndDelete(id)

    if (!actor) {
      return res.status(404).send({ message: 'Actor does not exist' })
    }

    const moviesToRemove = actor.movies.map((x) => x.toString())

    await Movie.updateMany(
      { _id: moviesToRemove },
      { $pull: { actors: actor._id } }
    )

    return res.status(200).json(actor)
  } catch (err) {
    next(err)
  }
}

async function updateActor(req, res, next) {
  try {
    // We want to find the Actor with that id
    // find by id
    const id = req.params.id
    //const Actor = await Actor.findByIdAndUpdate(id, req.body, { new: true })
    const actor = await Actor.findById(id)

    if (!actor) {
      return res.status(404).send({ message: 'Actor does not exist' })
    }

    const [removedMovies, addedMovies] = removedAdded(
      actor.movies.map((x) => x.toString()),
      req.body.movies
    )

    actor.set(req.body)
    const savedActor = await actor.save()

    await Movie.updateMany(
      { _id: removedMovies },
      { $pull: { actors: actor._id } }
    )

    await Movie.updateMany(
      { _id: addedMovies },
      { $push: { actors: savedActor._id } }
    )

    return res.status(200).json(actor)
  } catch (err) {
    next(err)
  }
}

export default {
  getAllActors,
  createActor,
  getActor,
  deleteActor,
  updateActor,
  getAllMoviesForActor,
}
