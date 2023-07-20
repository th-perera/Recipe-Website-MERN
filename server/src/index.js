import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.js"

const app = express();

app.use(express.json());
app.use(cors());

app.use("/auth", userRouter)

mongoose.connect(
    "mongodb+srv://thperera:Jb1Wp0q3pbUZNhKB@recipe-database.vts9o6z.mongodb.net/recipe-database?retryWrites=true&w=majority"
);

app.listen(3001, () => console.log("SERVER STARTED"));
