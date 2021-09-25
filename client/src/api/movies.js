import axios from 'axios'

//const baseUrl = 'http://localhost:3000'

export const getAllMovies = async () => {
  const options = { method: 'GET', url: `/api/movies` }

  const { data } = await axios.request(options)
  return data
}

export const createMovies = async (newMovie) => {
  const options = {
    method: 'POST',
    url: `/api/movies`,
    body: newMovie,
  }

  const { data } = await axios.request(options)
  return data
}

export const getMovie = async (id) => {
  const options = { method: 'GET', url: `/api/movies/${id}` }

  const { data } = await axios.request(options)
  return data
}