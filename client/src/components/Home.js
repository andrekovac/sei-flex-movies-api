import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    async function fetchData() {
      // ? Omit the localhost:8000 part, just start with /api
      console.log('fetching data')
      const { data } = await axios.get('/api/movies')
      setMovies(data)
    }
    fetchData()
  }, [])

  return (
    <h1>
      {movies.map((movie) => {
        return <div key={movie._id}>{movie.title}</div>
      })}
    </h1>
  )
}

export default Home
