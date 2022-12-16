const express = require('express');
const jwt = require('jsonwebtoken');
const route = express.Router();
const Data = require("../models/userSchema");

route.post("/", async(req, res) => {
    const {
        firstname,
        middlename,
        lastname,
        email,
        phone,
        city,
        state,
        university,
        fromdate,
        todate,
        cgpa,
        ucity,
        ustate,
        project,
        mentor,
        fromdateproject,
        todateproject,
        description
    } = req.body.data;
    const { token } = req.body;

    const user = await jwt.verify(token, process.env.SECRET_KEY);

    const result = await Data.findOne({ user });

    if (!result) {
        const insertData = new Data({
            firstname,
            middlename,
            lastname,
            email,
            phone,
            city,
            state,
            university,
            fromdate,
            todate,
            cgpa,
            ucity,
            ustate,
            project,
            mentor,
            fromdateproject,
            todateproject,
            description,
            user
        })
        const resData = await insertData.save();
        res.status(200).json("UserData Inserted");
    } else {

        const insertData = await Data.updateOne({ user }, {
            $set: {
                firstname,
                middlename,
                lastname,
                email,
                phone,
                city,
                state,
                university,
                fromdate,
                todate,
                cgpa,
                ucity,
                ustate,
                project,
                mentor,
                fromdateproject,
                todateproject,
                description
            }
        })
        res.status(200).json("UserData Updated");
    }
})


route.get("/", async(req, res) => {
    const token = req.headers['authorization'];
    if (token === null) {
        return console.log("Token not found");
    }

    try {
        const user = await jwt.verify(token, process.env.SECRET_KEY);
        const result = await Data.findOne({ user });
        res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
    // console.log(user);

})

module.exports = route;