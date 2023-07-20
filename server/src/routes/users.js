import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/Users.js"

const router = express.Router();


router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username : username });

    if (user) {
        return res.json({ message : "User already exists!" })
    }

    const hashedPassword = await bcrypt.hash( password , 10 ) //hashing password

    const newUser = new userModel({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "User registered successfully!" });

});



router.post("/login", async (req, res) => {

});




export { router as userRouter }