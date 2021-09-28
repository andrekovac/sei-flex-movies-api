import express from 'express'
import commentsController from '../controllers/commentsController.js'
import moviesController from '../controllers/moviesController.js'
import actorsController from '../controllers/actorsController.js'
import userController from '../controllers/userController.js'
import secureRoute from '../middleware/secureRoute.js'

// Router is reponsible for which routes are answered by which controllers
const router = express.Router()

router.route('/search').get(moviesController.searchMovies)

// base URL of this is determined by api
// here we handle everything that comes after that base
router
  .route('/movies')
  .get(moviesController.getAllMovies)
  .post(secureRoute, moviesController.createMovie)

router
  .route('/movies/:id')
  .get(moviesController.getMovie)
  .put(secureRoute, moviesController.updateMovie)
  .delete(secureRoute, moviesController.deleteMovie)

router
  .route('/movies/:id/comments')
  .post(secureRoute, commentsController.createComment)

router
  .route('/movies/:id/comments/:commentId')
  .put(secureRoute, commentsController.updateComment)
  .delete(secureRoute, commentsController.deleteComment)

router
  .route('/actors')
  .get(actorsController.getAllActors)
  .post(secureRoute, actorsController.createActor)

router
  .route('/actors/:id')
  .get(actorsController.getActor)
  .put(secureRoute, actorsController.updateActor)
  .delete(secureRoute, actorsController.deleteActor)

router.route('/actors/:id/movies').get(actorsController.getAllMoviesForActor)
router.route('/movies/:id/actors').get(moviesController.getAllActorsForMovie)

router.route('/admin/users').get(secureRoute, userController.getAllUsers)
router.route('/admin/promote').post(secureRoute, userController.promoteUser)
router.route('/admin/demote').post(secureRoute, userController.demoteUser)

router.route('/register').post(userController.registerUser)

router.route('/login').post(userController.loginUser)

export default router
