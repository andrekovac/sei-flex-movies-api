import Movie from '../models/movie.js';
import { moviesSeedData } from './moviesSeedData.js';
import { connectDb, disconnectDb, truncateDb } from './helpers.js';

async function seed() {
  try {
    await connectDb();
    console.log('🤖 Database Connected');

    await truncateDb();
    console.log('🤖 Database Dropped');

    const movies = await Movie.create(moviesSeedData);
    console.log(`🤖 ${movies.length} Movies added to the database`);

    console.log('🤖 Goodbye');
  } catch (err) {
    console.log('🤖 Something went wrong');
    console.log(err);
  }
  disconnectDb();
}

seed();
