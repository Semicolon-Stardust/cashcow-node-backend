const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter a Name"],
        min: [2, "Please provide a longer name"]
    },
    email: {
        type: String,
        required: [true, "Please provide an Email Address"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Provide a Password"],
        min: [8, "Please provide a password of atleast 8 Characters"],
        select: false
    },
    age: {
        type: Number,
        required: [true, "Please provide your age"],
        min: [7, "You must be atleast 7 years old to register"],
        max: [130, "You must be under 130 years old to register"]
    },
    primaryCurrency: {
        type: String,
        required: [true, "Please select your primary currency"],
    },
    occupation: {
        type: String,
        required: [true, "Please enter your occupation"],
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user"
    },

    
    resetPasswordToken: String,
    resetPasswordExpire: Date

});




module.exports = mongoose.model("User", userSchema);
