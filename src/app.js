const express = require('express');
//this middleware fun is used to integrate apolo server with express applin and allowing apolo server to handle graphql req routed to /graphql
const { expressMiddleware } = require('@apollo/server/express4');
//createApollodServer is a custom fun to initialize apollo server with specified schema //apollo server is graphQl Server
const createApolloServer = require('./server/apolloServer');
const { db } = require('./config/db');

//crete new instance of express applin
const app = express();
//fun to create instance of apollo server
const apolloServer = createApolloServer();

// Set up JSON middleware
app.use(express.json()); // This middleware parses incoming JSON request

// Start Apollo Server
apolloServer.start().then(() => {
  // Apply Apollo Server middleware
  app.use('/graphql', expressMiddleware(apolloServer));

  // Start the Express server
  app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000/graphql`)
  );
});
