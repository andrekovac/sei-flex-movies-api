// How we get the movies (from database or otherwise)
// is the responsibility of the controller
export const getAllMovies = (request, response) => {
  return response.send(['Die Hard', 'Interstellar', 'Nomadland'])
}
