import React, { useState, useEffect } from 'react'
import { getAllMovies } from '../api/movies'

import reelSrc from '../images/reel.jpg'
import Movie from './Movie'

const Home = () => {
  const [movies, setMovies] = useState([])
  const [moviesByGenre, setMoviesByGenre] = useState([])
  const [availableGenres, setAvailableGenres] = useState([])
  const [visibleGenre, setVisibleGenre] = useState(null)

  useEffect(() => {
    getAllMovies().then((movies) => setMovies(movies))
  }, [])

  useEffect(() => {
    const genres = movies.map((m) => m.genre).filter((g) => g !== null)
    setAvailableGenres([...new Set(genres)])

    const moviesAsDict = movies.reduce((dictionary, currentMovie) => {
      console.log(movies)
      if (!dictionary[currentMovie.genre]) {
        dictionary[currentMovie.genre] = []
      }

      dictionary[currentMovie.genre].push(currentMovie)
      return dictionary
    }, {})
    setMoviesByGenre(moviesAsDict)
  }, [movies])

  return (
    <>
      <h1>MOVIES</h1>
      <div>
        {availableGenres.length > 0 ? (
          availableGenres.map((genre) => (
            <button onClick={() => setVisibleGenre(genre)}>{genre}</button>
          ))
        ) : (
          <p>No genres available</p>
        )}
        <button onClick={() => setVisibleGenre(null)}>Reset</button>
      </div>
      <img src={reelSrc} alt="a movie reel" />
      {movies.map((movie) => (
        <p>{movie.title}</p>
      ))}
      {moviesByGenre.length > 0 ? (
        Object.entries(moviesByGenre)
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
          ))
      ) : (
        <p>No movies available</p>
      )}
    </>
  )
}

export default Home
