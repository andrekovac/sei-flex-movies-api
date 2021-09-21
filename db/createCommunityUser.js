import User from '../models/user.js'
import { connectDb, disconnectDb } from './helpers.js'

async function createCommunityUser() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    await User.create({
      username: 'community',
      email: 'user@community.wiki',
      password: 'oaijhedawniduanwui', // totally secure
    })
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

createCommunityUser()
