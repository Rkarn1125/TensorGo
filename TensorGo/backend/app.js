import dotenv from "dotenv";

//fetch data
import fetch from "node-fetch";

dotenv.config();
import express from "express";
import cors from "cors";

import connectDB from "./config/connectdb.js";

const app = express();
const port = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

// CORS Policy
app.use(cors());

// Database Connection
connectDB(DATABASE_URL);

// JSON
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening at http://127.0.0.1:${port}`);
});

//fetch data fake json data
import users from "./models/User1.js";

async function getPosts() {
  const myPosts = await fetch("https://gorest.co.in/public/v2/users");
  const response = await myPosts.json();
  console.log(response);
  for (let i = 0; i < response.length; i++) {
    const post = new users({
      userId: response[i]["id"],
      name: response[i]["name"],
      email: response[i]["email"],
      gender: response[i]["gender"],
      status: response[i]["status"],
    });
    post.save();
  }
}
//getPosts();
import mongoose from "mongoose";
mongoose.set('strictQuery', true);
import router from "./routes/userRoutes.js";
app.use("/api/user", router);