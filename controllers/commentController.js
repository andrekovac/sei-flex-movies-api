import Movie from '../models/movie.js'

// Creating a new comment
async function createComment(req, res, next) {
  // req.body: This is an object with the text inside -> { text: 'Tristans comment' }
  const commentData = req.body
  const { id } = req.params

  try {
    const movie = await Movie.findById(id)
    // .populate('comments.user')

    if (!movie) {
      return res.status(404).send({ message: 'Not found' })
    }

    // ! 2) Add our comment to our pokemon (this push will not update it in mongodb)
    movie.comments.push(commentData)

    // ! 3) Save our updated movie
    const savedMovie = await movie.save()

    res.send(savedMovie)
  } catch (err) {
    next(err)
  }
}

async function updateComment(req, res, next) {
  const { commentId, id } = req.params

  try {
    const movie = await Movie.findById(id)
    // .populate('comments.user')

    if (!movie) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = movie.comments.id(commentId)

    comment.set(req.body)

    const savedMovie = await movie.save()

    res.send(savedMovie)
  } catch (err) {
    next(err)
  }
}

async function deleteComment(req, res, next) {
  const { commentId, id } = req.params

  try {
    const movie = await Movie.findById(id)
    // .populate('comments.user')

    if (!movie) {
      return res.status(404).send({ message: 'Not found' })
    }

    const comment = movie.comments.id(commentId)

    comment.remove()

    const savedMovie = await movie.save()

    res.send(savedMovie)
  } catch (err) {
    next(err)
  }
}

export default {
  createComment,
  updateComment,
  deleteComment,
}
