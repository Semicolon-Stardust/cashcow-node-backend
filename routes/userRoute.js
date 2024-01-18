const express = require("express");
const { 
    registerUser, 
    loginUser,
} = require("../controllers/userController");

const router = new express.Router();

// User Authentication Routes
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

module.exports = router;