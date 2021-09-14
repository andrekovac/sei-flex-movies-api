import express from 'express'
import commentsController from '../controllers/commentsController.js'
import moviesController from '../controllers/moviesController.js'
import actorsController from '../controllers/actorsController.js'

// Router is reponsible for which routes are answered by which controllers
const router = express.Router()

// base URL of this is determined by api
// here we handle everything that comes after that base
router
  .route('/movies')
  .get(moviesController.getAllMovies)
  .post(moviesController.createMovie)

router
  .route('/movies/:id')
  .get(moviesController.getMovie)
  .delete(moviesController.deleteMovie)
  .put(moviesController.updateMovie)

router.route('/movies/:id/comments').post(commentsController.createComment)

router
  .route('/movies/:id/comments/:commentId')
  .delete(commentsController.deleteComment)
  .put(commentsController.updateComment)

router
  .route('/actors')
  .get(actorsController.getAllActors)
  .post(actorsController.createActor)

router
  .route('/actors/:id')
  .get(actorsController.getActor)
  .delete(actorsController.deleteActor)
  .put(actorsController.updateActor)

router.route('/actors/:id/movies').get(actorsController.getAllMoviesForActor)

export default router
