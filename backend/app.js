require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();

const cors = require("cors");

const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

// Config JSON response
app.use(express.json());
app.use(cors(corsOptions));

// Models
const User = require("./models/User");

// Open Route - Public Route
app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
});

// Private Route
app.get("/user/:id", checkToken, async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id, '-password');
    if(!user) return res.status(404).json({ error: true, message: "User not found!" });
    res.status(200).json({ user });
});

function checkToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token) return res.status(401).json({ error: true, message: "Access denied!" });
    try {
        const secret = process.env.SECRET;
        jwt.verify(token, secret);
        next();
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Invalid token!" });
    }
}

// Register User
app.post("/auth/register", async(req, res) => {
    
    const { name, email, password, confirmPassword } = req.body;

    if(!name) return res.status(422).json({ message: "Name is required!" });

    if(!email) return res.status(422).json({ message: "Email is required!" });

    if(!password) return res.status(422).json({ message: "Password is required!" });
    
    if(password !== confirmPassword) return res.status(422).json({ message: "Passwords don't match!" });

    // Check if user exists
    const userExists = await User.findOne({ email: email });

    if(userExists) return res.status(422).json({ error: true, message: "User already exists!" });

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

// Login User
app.post("/auth/login", async (req, res) => {

    const { email, password } = req.body;

    if(!email) return res.status(422).json({ error: true, message: "Email is required!" });

    if(!password) return res.status(422).json({ error: true, message: "Password is required!" });

    // Check if user exists
    const user = await User.findOne({ email: email });

    if(!user) return res.status(404).json({ error: true, message: "User not exists!" });

    // Check if password match
    const checkPassword = await bcrypt.compare(password, user.password);

    if(!checkPassword) return res.status(422).json({ error: true, message: "Invalid password!" });

    try {
        const secret = process.env.SECRET;
        const token = jwt.sign({ id: user._id }, secret);
        res.status(200).json({ message: "Authentication sucessfull!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: true, message: "An error has occurred on the server. Try again later!" });
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