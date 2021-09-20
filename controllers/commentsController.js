import Movie from '../models/movie.js'

async function createComment(req, res, next) {
  try {
    // We want to find the movie with that id
    // find by id
    const { id } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    req.body.createdBy = req.currentUser
    const newComment = req.body

    movie.comments.push(newComment)
    const savedMovie = await movie.save()

    return res.status(201).json(savedMovie)
  } catch (err) {
    next(err)
  }
}

async function deleteComment(req, res, next) {
  try {
    // need the movie id
    // need the comment id
    const { id, commentId } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    const comment = movie.comments.id(commentId)
    if (!comment) {
      return res.status(404).send({ message: 'Comment does not exist' })
    }

    // permissions check
    if (!comment.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.remove()

    const savedMovie = await movie.save()
    return res.status(200).send(savedMovie)
  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  try {
    // need the movie id
    // need the comment id
    const { id, commentId } = req.params
    const movie = await Movie.findById(id)

    if (!movie) {
      return res.status(404).send({ message: 'Movie does not exist' })
    }

    const comment = movie.comments.id(commentId)
    if (!comment) {
      return res.status(404).send({ message: 'Comment does not exist' })
    }

    // permissions check
    if (!comment.createdBy.equals(req.currentUser._id)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    comment.set(req.body)

    const savedMovie = await movie.save()
    return res.status(200).send(savedMovie)
  } catch (err) {
    next(err)
  }
}

export default {
  createComment,
  deleteComment,
  updateComment,
}
