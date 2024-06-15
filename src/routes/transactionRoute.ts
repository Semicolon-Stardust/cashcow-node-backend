import express from 'express'
import { 
    getAllTransactions, 
    getSingleTransaction,
    getUserTransactions,
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} from "../controllers/transactionController.js"
import {isUserAuthenticated, authorizeRoles} from "../middleware/auth.js";


const transactionRouter = express.Router();


transactionRouter.route("/all").get(isUserAuthenticated, authorizeRoles("admin"), getAllTransactions);
transactionRouter.route("/new").post(isUserAuthenticated, createTransaction);
transactionRouter.route("/me").post(isUserAuthenticated, getUserTransactions);
transactionRouter.route("/:id")
    .put(isUserAuthenticated, updateTransaction)
    .delete(isUserAuthenticated, deleteTransaction)
    .get(getSingleTransaction);


export default transactionRouter;