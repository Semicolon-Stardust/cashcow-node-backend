const express = require("express");
const cookieParser = require("cookie-parser");

// Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());

// Route Imports
const user = require("./routes/userRoute");

// Mount Routes
app.use("/api/v1", user);


module.exports = app;
