import express from 'express'
import { 
    getAllTransactions, 
    getSingleTransaction, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from "../controllers/transactionController.js"
import {isUserAuthenticated, authorizeRoles} from "../middleware/auth.js";


const transactionRouter = express.Router();


transactionRouter.route("/transactions").get(isUserAuthenticated, getAllTransactions);
transactionRouter.route("/new").post(isUserAuthenticated, createTransaction);
transactionRouter.route("/:id")
    .put(isUserAuthenticated, updateTransaction)
    .delete(isUserAuthenticated, deleteTransaction)
    .get(getSingleTransaction);


export default transactionRouter;