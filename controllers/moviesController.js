import Movie from '../models/movie.js';

async function getAllMovies(_req, res, next) {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (err) {
    next(err);
  }
}

export default {
  getAllMovies,
};
