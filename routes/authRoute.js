const express = require("express");
const User = require("../models/authSchema");
const route = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

route.post("/", async(req, res) => {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(401).send("Enter all the fields");
        }

        const result = await User.findOne({ email });

        if (result) {
            return res.status(401).send("User Already Exists");
        }

        const newUser = new User({ name, email, password });
        const update = await newUser.save();

        if (update) {
            return res.status(200).send("User Inserted");
        } else {
            return res.status(401).send("User Not Inserted");

        }

    } catch (error) {
        console.log(error);
    }
})

route.post("/signin", async(req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(401).json({ message: "Enter all the fields" });
        }

        const result = await User.findOne({ email });

        if (result) {
            const verifyPass = await bcrypt.compare(password, result.password);

            if (verifyPass) {
                const token = jwt.sign({ _id: result._id }, process.env.SECRET_KEY);
                return res.status(200).json({ message: "User Signed in", token: token, dat: result._id });
            } else {
                return res.status(401).json({ message: "Invalid Credentials" });

            }
        } else {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

    } catch (error) {
        console.log(error);
    }
})

// route.get("/token", async(req, res) => {
//     const token = req.headers['authorization'];
//     // console.log(token);
//     const user = await jwt.verify(token, process.env.SECRET_KEY);
//     // console.log(user);

// })

module.exports = route;