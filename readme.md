## SEI FLEX MOVIES API

To run the api, firstly ensure MongoDB is installed and running locally. To see how to do this [follow these instructions]('https://docs.mongodb.com/manual/installation/)

Once the database is running locally:

1. Install dependencies - `npm install`
2. Seed the database - `npm run seed`
3. Start the server - `npm run start:server`

<em>It may help to have nodemon installed globally on your machine</em>

`npm i -g nodemon`

Once the server is running and successfully connected to the database, you will be able to test making requests to the api using [postman]('https://www.postman.com/downloads/).

Try sending a request to `http://localhost:4000/api/movies` and you should see data returned

1. Create a new file called commentController under the controllers directory
2. Write a function called `createComment` which will be responsible for finding a movie and adding a comment to it
3. Export the `createComment` function
4. remind students about the `commentSchema` that we created when we wrote the movieSchema - we are now going to create operations to use this scema and add comments to our movies
5. Add a route for creating a comment to the router
6. Test the new route in postman/insomnia (depending if they got postman set up in the previous lesson). When you test the route, show that the mongoose schema handles the validation by first creating a comment that has no rating. You will get an error in insomnia/postman. Add the rating (required field in the model) and the error goes away).
