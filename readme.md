## SEI FLEX MOVIES API

To run the api, firstly ensure MongoDB is installed and running locally. To see how to do this [follow these instructions]('https://docs.mongodb.com/manual/installation/')

# Mongo DB and Aliases

add an alias to the .zshrc file to be able to create shortcuts for commands

to start mongo: `alias startmongo="brew services start mongodb-community@5.0"`

to stop mongo: `alias killmongo="brew services stop mongodb-community@5.0"`

Once the database is running locally:

1. Install dependencies - `npm install`
2. Seed the database - `npm run seed`
3. Start the server - `npm run start:server`

<em>It may help to have nodemon installed globally on your machine</em>

`npm i -g nodemon`

Once the server is running and successfully connected to the database, you will be able to test making requests to the api using [postman]('https://www.postman.com/downloads/).

Try sending a request to `http://localhost:4000/api/movies` and you should see data returned

## Lesson 5 Instructions:

1. Add a new file, `actor.js`
2. Define in it a new schema, `actorSchema`, and create a mongoose object
3. Reference `Movie` from `Actor` and vice-versa
4. Create an `actorsController`
   1. Allow for creating an actor with movie ids
   2. Add the actor to the movies when creating
   3. Allow for updating an actor, including with movie ids - removedAdded function in helpers
   4. Add the actor to the new movies when updating
   5. Remove the actor from the removed movies when updating
5. Add routes for all `actorsController` methods
6. Add a route to get all movies for an actor with full details
7. Update `moviesController`
   1. Allow for creating a movie with actor ids
   2. Add the movie to the actors when creating
   3. Allow for updating a movie, including with actor ids
   4. Add the movie to the new actors when updating
   5. Remove the movie from the removed actors when updating
8. Add a route to get all actors for a movie with full details
