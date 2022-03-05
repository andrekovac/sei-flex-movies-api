## SEI FLEX MOVIES API

To run the api, firstly ensure MongoDB is installed and running locally. To see how to do this [follow these instructions]('https://docs.mongodb.com/manual/installation/')

# Mongo DB and Aliases

add an alias to the `.zshrc` file to be able to create shortcuts for commands

- to start mongo: `alias startmongo="brew services start mongodb-community"`
- to stop mongo: `alias killmongo="brew services stop mongodb-community@"`

Once the database is running locally:

1. Install dependencies - `npm install`
2. Seed the database - `npm run seed`
3. Start the server - `npm run start:server`

<em>It may help to have `nodemon` installed globally on your machine</em>

`npm i -g nodemon`

Once the server is running and successfully connected to the database, you will be able to test making requests to the api using [postman]('https://www.postman.com/downloads/).

Try sending a request to `http://localhost:3000/api/movies` and you should see data returned

## Lesson 9 Instructions:

1. Build the home page with them to show them how to fetch data locally
2. Show them wireframing tools - Balsamiq
3. Set up a trello board
4. Put them in groups
5. One person should push their classwork into a git repo and all of them should pull it down
6. Get them to write tickets and work together to start creating a fontend

## Hosting on Heroku (backend) + MongoDB Atlas (database)

Use [this article](https://coding-boot-camp.github.io/full-stack/mongodb/deploy-with-heroku-and-mongodb-atlas)