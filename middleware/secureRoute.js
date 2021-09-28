import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { secret } from '../config/environment.js'

// ! Make sure the user who is making this request, has a valid token
// ! and they exist. Do they have permission to do this?
export default async function secureRoute(req, res, next) {
  try {
    // ! 1) Get the token from my request.
    const authToken = req.headers.authorization

    // ? guard for the authToken
    if (!authToken || !authToken.startsWith('Bearer')) {
      // ! This will run if the token doesn't exist, or there's no bearer part
      return res.status(401).send({ message: 'Unauthorized' })
    }
    // ? Remove the 'Bearer ' part from the token
    const token = authToken.replace('Bearer ', '')

    console.log('🤖' + ' ' + authToken)
    console.log('🤖' + ' ' + token)

    // ! 2) Verifying my token.
    // ? The async (err, data) is a callback JWT library gives me.
    jwt.verify(token, secret, async (err, data) => {
      // ? err -> any errors that happened
      // ? data -> our payload (data we put inside the token originally)

      // ? guard if not a valid token...
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      // ! 3) Check if the user in the token actually exists
      const user = await User.findById(data.userId)

      // ? guard: does the user exist
      if (!user) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      // ! 4) THIS STEP IS FOR OBJECT LEVEL PERMISSIONS
      // ? Stick the current user on my request, so that in my controllers
      // ? I can use it to do object level permissions later.
      req.currentUser = user
      req.isUserAdmin = user.isAdmin

      // ! 5) Call next to finish
      next()
    })
  } catch (err) {
    res.status(401).send({ message: 'Unauthorized' })
  }
}
