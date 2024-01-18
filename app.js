const express = require("express");
const cookieParser = require("cookie-parser");

// Configuration
const app = express();
app.use(express.json());
app.use(cookieParser());

// Route Imports
const user = require("./routes/userRoute");
const transaction = require("./routes/transactionRoute");

// Middleware Imports
const errorMiddleware = require("./middleware/error");


// Mount Routes
app.use("/api/v1", user);
app.use("/api/v1/transaction", transaction);


// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
