import { configDotenv } from "dotenv";
import mongoose from "mongoose";
import apolloserver from "./apollo.js";
import { startStandaloneServer } from "@apollo/server/standalone";
import express from "express";
import cors from "cors";
// import connectToDatabase from "./config/databaseConnect.js";
import DataBaseConnection from "./config/databaseConnect.js";

configDotenv();
const app = express();
app.use(cors());

DataBaseConnection();

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  const { url } = await startStandaloneServer(apolloserver, {
    listen: {
      port: PORT,
    },
  });
  console.log(`🚀 Server ready at ${url}`);
};

startServer();
