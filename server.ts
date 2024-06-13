import dotenv from 'dotenv';
dotenv.config({path: './config/config.env'});


import app from './app.js';


const port = process.env.PORT || 5000;


const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});