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

## Lesson 7 Instructions:

Object level permissions:

1. Update models/movie.js to include the `createdBy` key on each movie (will be the user who added the movie)
2. Add the same line to the comment schema so we have a reference of the user on the comments
3. go to the createMovie function in movieController and add line 25 `req.body.createdBy = req.currentUser`
4. Go to postman, login and use the new token returned from the login endpoint to satisfy the `authorization` header in the create movie request
5. Create a new movie and show students that the newly created movie now has the `createdBy` key with the details of the user who performed the creation. This `createdBy` key on each movie can be used to check if the user deleting/editing/performing a restricted action is the owner of the object.
6. Go to the commentsController / createComment function and add the same line (line 14 before const newComment = req.body) `req.body.createdBy = req.currentUser`
7. Create a new comment on the newly created movie and observe there is now a `createdBy` key on the comment object.
8. Delete movie permissions - go to the movie controller go to deleteMovie and add lines 74-78: checking the ID of the current user vs. the id of the user that created the object.
9. Go to postman, add the login token to the delete movie req headers and test deleting a movie. As long as the user and the creator match, it should work.
10. Use postman to create a new movie which we will use to test the editing functionality.
11. Update movie functionality - Go to the movies controller and add lines 105-110 to the updateMovie function.
12. test in postman using he newly created movie from point 10.
13. Delete comment functionality - go to the commentsController / deleteComment function and add lines 43-45 to check for the permissions
14. test in postman
15. update comment - add the permissions check to the commentsController / updateComment function
16. test in postman
