const express = require("express");
const { 
    getAllTransactions, 
    getSingleTransaction, 
    createTransaction, 
    updateTransaction, 
    deleteTransaction 
} = require("../controllers/transactionController");
const {isUserAuthenticated, authorizeRoles} = require("../middleware/auth");


const router = express.Router();


router.route("/transactions").get(getAllTransactions);
router.route("/transaction/new").post(isUserAuthenticated, authorizeRoles("admin"), createTransaction);
router.route("/transaction/:id")
    .put(isUserAuthenticated, authorizeRoles("admin"), updateTransaction)
    .delete(isUserAuthenticated, authorizeRoles("admin"), deleteTransaction)
    .get(getSingleTransaction);


module.exports = router;