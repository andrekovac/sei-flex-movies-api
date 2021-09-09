import express from 'express'
import moviesController from '../controllers/moviesController.js'

// Router is reponsible for which routes are answered by which controllers
const router = express.Router()

// base URL of this is determined by api
// here we handle everything that comes after that base
router.route('/movies').get(moviesController.getAllMovies)

export default router
