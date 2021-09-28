import React, { useState, useEffect } from 'react'
import { getAllMovies } from '../api/movies'

import reelSrc from '../images/reel.jpg'
import Movie from './Movie'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [availableGenres, setAvailableGenres] = useState([])
  const [visibleGenre, setVisibleGenre] = useState(null)

  useEffect(() => {
    getAllMovies().then((movies) => setMovies(movies))
  }, [])

  useEffect(() => {
    const genres = movies.map((m) => m.genre).filter((g) => g !== null)
    setAvailableGenres([...new Set(genres)])
  }, [movies])

  const moviesByGenre = movies.reduce((dictionary, currentMovie) => {
    if (!dictionary[currentMovie.genre]) {
      dictionary[currentMovie.genre] = []
    }

    dictionary[currentMovie.genre].push(currentMovie)
    return dictionary
  }, {})

  return (
    <>
      <h1>MOVIES</h1>
      <div>
        {availableGenres.map((genre) => (
          <button onClick={() => setVisibleGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setVisibleGenre(null)}>Reset</button>
      </div>
      <img src={reelSrc} alt="a movie reel" />
      {Object.entries(moviesByGenre)
        .filter(([genre]) => !visibleGenre || genre === visibleGenre)
        .map(([genre, movieList]) => (
          <section key={genre} className="tile wrap is-parent is-50">
            <h2>{genre}</h2>
            <div>
              {movieList.map((movie) => (
                <Movie key={movie._id} {...movie} />
              ))}
            </div>
          </section>
        ))}
    </>
  )
}

export default Home
