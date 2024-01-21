const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Configuration
const app = express();
const corsOption = {
    origin: '*',
}
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));

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
