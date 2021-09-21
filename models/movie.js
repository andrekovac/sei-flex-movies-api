import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
)

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  releaseYear: Number,
  genre: String,
  comments: [commentSchema],
  actors: [{ type: mongoose.Types.ObjectId, ref: 'Actor' }],
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
})

movieSchema.plugin(mongooseUniqueValidator)

const Movie = mongoose.model('Movie', movieSchema)

export default Movie
