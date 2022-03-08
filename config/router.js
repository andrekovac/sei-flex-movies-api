import express from 'express'
import commentsController from '../controllers/commentsController.js'
import moviesController from '../controllers/moviesController.js'
import actorsController from '../controllers/actorsController.js'
import userController from '../controllers/userController.js'
import secureRoute from '../middleware/secureRoute.js'

/**
 * Router is reponsible for which routes are answered by which controllers
 */
const router = express.Router()

router.route('/search').get(moviesController.searchMovies)

/**
 * The base URL (e.g. `https://ga-movies-app.herokuapp.com/api`) is determined by the API.
 * Here we handle everything that comes after that base, i.e. `https://ga-movies-app.herokuapp.com/api/movies`
 */
router
  // Here the backend will match any requests coming in on the `/movies' route
  .route('/movies')
  // if the request is a 'GET' request it will call the 'getAllMovies' function of the 'moviesController'
  .get(moviesController.getAllMovies)
  // if the request is a 'POST' request it will call the 'getAllMovies' function of the 'createMovie'
  .post(secureRoute, moviesController.createMovie)

router
  // Here the backend will match any requests coming in on the `/movies/:id' route
  // This matches any id, e.g. `/movies/213g2h3g12367231n2g3v0d97`
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
