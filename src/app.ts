import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import errorMiddleware from './middleware/error.js';

// Route Imports
import baseRouter from './routes/baseRoutes.js';
import userAuthRouter from './routes/userAuthRoutes.js';
import transactionRouter from './routes/transactionRoute.js';
import familyGroupRouter from './routes/familyGroupRoutes.js';



// Init
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
}


// Middlewares
/*-- General --*/
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))
app.use(cors(corsOptions));
/*-- Personal --*/
app.use(errorMiddleware);


// Routes
app.use('/api/v1', baseRouter);
app.use('/api/v1/users', userAuthRouter);
app.use('/api/v1/transactions', transactionRouter);
app.use('/api/v1/fam', familyGroupRouter);



export default app;