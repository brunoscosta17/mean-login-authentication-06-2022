require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();

// Config JSON response
app.use(express.json());

// Models
const User = require("./models/User");

// Open Route - Public Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

// Register User
app.post("/auth/register", async(req, res) => {
    
    const { name, email, password, confirmPassword } = req.body;

    if(!name) return res.status(422).json({ message: "Name is required!" });

    if(!email) return res.status(422).json({ message: "Email is required!" });

    if(!password) return res.status(422).json({ message: "Password is required!" });
    
    if(password !== confirmPassword) return res.status(422).json({ message: "Passwords don't match!" });

    const userExists = await User.findOne({ email: email });

    if(userExists) return res.status(422).json({ message: "User already exists!" });

    // Create password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const user = new User({
        name,
        email,
        password: passwordHash
    });

    try {
        await user.save();
        res.status(201).json({ message: "User created sucessfully!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error has occurred on the server. Try again later!" });
    }

});

// Credentials
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.rpaebwx.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        // app.listen(3000);
        console.log("Conected to the database!");
    }).catch((error) => console.error(error));

app.listen(3000);