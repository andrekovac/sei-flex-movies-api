import mongoose from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 300 },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  {
    timestamps: true,
  }
);

const movieSchema = new mongoose.Schema({
  title: String,
  description: String,
  releaseYear: Number,
  comments: [commentSchema],
});

movieSchema.plugin(mongooseUniqueValidator);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;
