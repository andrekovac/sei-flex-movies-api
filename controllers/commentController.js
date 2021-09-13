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

// async function removeComment(req, res, next) {
//   const currentUser = req.currentUser
//   const { commentId, pokemonId } = req.params

//   try {
//     // ! 1) Get the pokemon whose comment this is about
//     const pokemon = await Pokemon.findById(pokemonId).populate('comments.user')

//     if (!pokemon) {
//       return res.status(404).send({ message: 'Not found' })
//     }

//     // ! 2) Grab the comment from my comments which I need to update
//     // ? .id is a mongoose method for grabbing a document out of an array of documents.
//     const comment = pokemon.comments.id(commentId)

//     // ! 3) Do my permissions check: Is the comment's ID the SAME as the current users id?
//     if (!comment.user.equals(currentUser._id)) {
//       return res.status(401).send({ message: 'Unauthorized' })
//     }

//     // ! 4) Delete the comment
//     comment.remove()

//     // ! 5) Final step, save pokemon
//     const savedPokemon = await pokemon.save()

//     res.send(savedPokemon)
//   } catch (err) {
//     next(err)
//   }
// }

export default {
  createComment,
  updateComment,
  // removeComment,
}
