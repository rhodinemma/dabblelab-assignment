import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

async function initServer() {
  const app = express();
  dotenv.config();

  // configuring the graphql apollo server here
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
  app.use((req, res) => {
    res.send("Yey, my GraphQL API is running!");
  });

  // connecting to the database here
  const PORT = process.env.PORT || 4000;
  try {
    await mongoose.connect(process.env.mongodb);
    console.log("Connection to MongoDB Atlas is successful!");
  } catch (error) {
    console.log(error);
  }

  // running the server app here
  app.listen(PORT, () => {
    console.log(`Apollo express server running on port ${PORT}`);
  });
}

initServer();
