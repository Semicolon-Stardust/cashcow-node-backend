import express from 'express';

const baseRouter = express.Router();

baseRouter.get('/', (req, res) => {
    res.send('Hello World');
});

export default baseRouter;