const express = require("express");
const { ApolloServer } = require("apollo-server-express");

// Import resolver / type definitions
const typeDefs = require("./schema/types") 
const resolvers = require("./schema/resover")

const isSuccessfully = require('./connectMongoDB')

if(isSuccessfully) {
  console.log("Succesfully connected")
} else {
  console.log("Failed to connect")
}

// Create an Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers
});

// Create an Express app
async function startServer() {
  // Await server start
  await server.start();

  // Create an Express app
  const app = express();

  // Apply the Apollo Server middleware to the app
  server.applyMiddleware({ app });

  // Start the server
  app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000/graphql");
  });
}

// Start the Apollo Server and Express app
startServer();
