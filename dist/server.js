import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
import connectDatabase from './config/database.js';
import app from './app.js';
const port = process.env.PORT || 5000;
connectDatabase();
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
