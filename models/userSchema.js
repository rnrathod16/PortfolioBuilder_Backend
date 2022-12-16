const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    university: {
        type: String,
        required: true
    },
    fromdate: {
        type: Date,
        required: true
    },
    todate: {
        type: Date,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    ucity: {
        type: String,
        required: true
    },
    ustate: {
        type: String,
        required: true
    },
    project: {
        type: String,
        required: true
    },
    mentor: {
        type: String,
        required: true
    },
    fromdateproject: {
        type: Date,
        required: true
    },
    todateproject: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Data = mongoose.model("Data", userSchema);

module.exports = Data;