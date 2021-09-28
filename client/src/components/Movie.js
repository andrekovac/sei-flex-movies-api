import React from 'react'

const Movie = (movie) => {
  return (
    <div className="tile is-child is-primary">
      <h2 className="title">
        {movie.title} ({movie.releaseYear})
      </h2>
      <p className="subtitle">
        {movie.description} ({movie.genre})
      </p>
      {movie.comments.map((comment) => (
        <p className="button" key={comment._id}>
          {comment.text}
        </p>
      ))}
    </div>
  )
}

export default Movie
