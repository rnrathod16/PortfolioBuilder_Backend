const express = require('express');
const authRoute = require('./routes/authRoute');
const dataRoute = require("./routes/dataRoute");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config({ path: "./config.env" });
const app = express();
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
require('./db/dbconnect');


app.use(express.json());
app.use("/", authRoute);
app.use("/data", dataRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("Server Started");
})