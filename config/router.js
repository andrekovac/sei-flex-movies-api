import express from 'express'
import moviesController from '../controllers/moviesController.js'
import commentController from '../controllers/commentController.js'

const Router = express.Router()

Router.route('/movies')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie)

Router.route('/movies/:id')
  .get(moviesController.getMovie)
  .put(moviesController.updateMovie)
  .delete(moviesController.deleteMovie)

// Route for creating a comment
Router.route('/movies/:id/comment').post(commentController.createComment)

Router.route('/movies/:id/comment/:commentId').put(
  commentController.updateComment
)
// .delete(commentController.deleteComment)

export default Router
