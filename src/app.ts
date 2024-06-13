import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import errorMiddleware from './middleware/error.js';
import baseRouter from './routes/baseRoutes.js';


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



export default app;