const express = require("express");
const cookieParser = require("cookie-parser");

// Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());


module.exports = app;
