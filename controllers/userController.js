import jwt from 'jsonwebtoken'

import User from '../models/user.js'
import { secret } from '../config/environment.js'

// ! Added a new controller function to create a user
async function registerUser(req, res, next) {
  const body = req.body
  try {
    const user = await User.create({ ...body, isAdmin: false })
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function promoteUser(req, res, next) {
  const body = req.body
  try {
    if (!req.isUserAdmin) {
      return res.status(401).send({ message: 'Only admins can create admins' })
    }

    const user = await User.findOne({ _id: body.userId })
    user.set({ isAdmin: true })
    user.save()
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function getAllUsers(req, res, next) {
  try {
    if (!req.isUserAdmin) {
      return res.status(401).send({ message: 'Only admins can create admins' })
    }

    const users = await User.find()
    res.status(201).send(users)
  } catch (err) {
    next(err)
  }
}

async function demoteUser(req, res, next) {
  const body = req.body
  try {
    if (!req.isUserAdmin) {
      return res.status(401).send({ message: 'Only admins can create admins' })
    }

    const user = await User.findOne({ _id: body.userId })
    user.set({ isAdmin: false })
    user.save()
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  const password = req.body.password
  try {
    // ! 1) See if there's a user whose email matches the one we're asking for
    const user = await User.findOne({ email: req.body.email })

    // ! 2) Hash our login password, compare this to our user password
    if (!user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }

    // ! 3) Create a JWT (json web token) and send this back to the client
    // ? So you can use the token to pass user info, as well
    // ? as have expiry times on your sessions
    const token = jwt.sign(
      { userId: user._id }, // ? PAYLOAD: information we're storing on the token
      secret, // ? A secret string only we know
      { expiresIn: '12h' } // ? The token will expire in 12 hours.
    )
    // ! 202 -> Accepted
    res.status(202).send({ token, message: 'Login successful!' })
  } catch (err) {
    next(err)
  }
}

export default {
  registerUser,
  loginUser,
  promoteUser,
  demoteUser,
  getAllUsers,
}
