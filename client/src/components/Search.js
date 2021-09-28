import React, { useState, useEffect } from 'react'
import { searchMovies } from '../api/movies'

import reelSrc from '../images/reel.jpg'
import Movie from './Movie'

const Search = () => {
  const [movies, setMovies] = useState([])
  const [q, setQ] = useState('')
  const [availableGenres, setAvailableGenres] = useState([])
  const [visibleGenre, setVisibleGenre] = useState(null)

  const search = function (event) {
    event.preventDefault()
    searchMovies(q).then((movies) => setMovies(movies))
  }

  useEffect(() => {
    const genres = movies.map((m) => m.genre).filter((g) => g !== null)
    setAvailableGenres([...new Set(genres)])
  }, [movies])

  return (
    <>
      <h1>MOVIES</h1>
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="e.g. Interstellar"
          onChange={(e) => setQ(e.target.value)}
          value={q}
        />
        <input type="submit" value="Search" />
      </form>
      <div>
        {availableGenres.map((genre) => (
          <button onClick={() => setVisibleGenre(genre)}>{genre}</button>
        ))}
        <button onClick={() => setVisibleGenre(null)}>Reset</button>
      </div>
      <img src={reelSrc} alt="a movie reel" />
      <section className="tile wrap is-parent is-50">
        <h2>All movies</h2>
        <div>
          {movies
            .filter((m) => !visibleGenre || m.genre === visibleGenre)
            .map((movie) => (
              <Movie key={movie._id} {...movie} />
            ))}
        </div>
      </section>
    </>
  )
}

export default Search
