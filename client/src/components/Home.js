import React, { useState, useEffect } from 'react'
import { getAllMovies } from '../api/movies'

import reelSrc from '../images/reel.jpg'

const Home = () => {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    getAllMovies().then((movies) => setMovies(movies))
  }, [])

  return (
    <>
      <h1>MOVIES</h1>
      <img src={reelSrc} alt="a movie reel" />
      <section className="tile is-parent is-50">
        {movies.map((movie) => (
          <div className="tile is-child is-primary" key={movie._id}>
            <h2 className="title">
              {movie.title} ({movie.releaseYear})
            </h2>
            <p className="subtitle">{movie.description}</p>
            {movie.comments.map((comment) => (
              <p className="button" key={comment._id}>
                {comment.text}
              </p>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}

export default Home
