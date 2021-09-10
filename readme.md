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

1. Add a function to the moviesController to create a new movie
2. Add a post handler to /movies in the router (.post(moviesController.createMovie))
3. Test the POST request in insomnia - at this point they should know how to create environment variables in insomnia and be able to create the new request. Add the body as JSON and you'll be able to create a new movie. Show them that it has created by performing the get all movies request again to show that the new movie has been added to the database

4. Add a function to get a single movie by id to the moviesController
5. add the new route to the router for movies/:id
6. test the request in Insomnia

7. Add a function to delete a movie by id to the moviesController
8. add the delete handler to the /movies/:id route in the router
9. test the delete request in Insomnia
10. Perform the get all movies request to see that the movie should no longer be in the database

11. Add a function to edit a movie by id to the moviesController
12. add the put handler to the /movies/:id route in the router
13. test the put request in Insomnia
14. Perform the get all movies request to see that the movie should be updated in the database

15. (IF you have time) - help students set up postman - they are aware that it is more commonly used in the industry than Insomnia so it would be beneficial to show them how to set up environments and environment variables in postman
