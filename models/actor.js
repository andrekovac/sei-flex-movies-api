import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const actorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }],
})

actorSchema.plugin(mongooseUniqueValidator)

const Actor = mongoose.model('Actor', actorSchema)

export default Actor
