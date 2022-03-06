import User from '../models/user.js'
import { connectDb, disconnectDb } from './helpers.js'

async function promoteRjk() {
  try {
    await connectDb()
    console.log('🤖 Database Connected')

    const robin = await User.findOne({
      username: 'rjk',
    })
    robin.set({ isAdmin: true })
    robin.set({ password: 'whatever' })
    await robin.save()
    console.log('DONE')
  } catch (err) {
    console.log('🤖 Something went wrong')
    console.log(err)
  }
  disconnectDb()
}

// promoteRjk()
