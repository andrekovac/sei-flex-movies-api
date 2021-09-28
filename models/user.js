import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

import mongooseHidden from 'mongoose-hidden'
import uniqueValidator from 'mongoose-unique-validator'

const schema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, required: true },
})

schema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
  next()
})

schema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

schema.plugin(uniqueValidator)
schema.plugin(
  mongooseHidden({ defaultHidden: { password: true, email: true } })
)

const User = mongoose.model('User', schema)

export default User
