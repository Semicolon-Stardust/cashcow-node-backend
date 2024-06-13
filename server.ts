import dotenv from 'dotenv';
dotenv.config({path: './config/config.env'});

import connectDatabase from './config/database.js';
import app from './app.js';



// Config
const port = process.env.PORT || 5000;

connectDatabase();


const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




// Handle Uncaught Exceptions
process.on("uncaughtException", err => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Uncaught Exception");
    process.exit(1);
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err: Error) => {
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to Unhandled Promise Rejection");
    server.close(() => {
        process.exit(1);
    });
})