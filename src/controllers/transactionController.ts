import { Request, Response, NextFunction } from 'express';
import Transaction from '../models/transactionModel.js';
import ErrorHandler from '../utils/errorHandler.js';
import catchAsyncErrors from '../middleware/catchAsyncErrors.js';
import ApiFeatures from '../utils/apiFeatures.js';


// Create new transaction => /api/v1/transaction/new 
export const createTransaction = catchAsyncErrors(async (req:any, res:Response, next:NextFunction) => {

    let {title, description, amount, category, family} = req.body;
    const user = req.user.id;

    if (!family || family === undefined) family = null;

    const transaction = await Transaction.create({
        title,
        description,
        amount,
        category,
        user,
        family
    });

    res.status(201).json({
        success: true,
        transaction
    })
})



// Update transaction details => /api/v1/transaction/:id   -- ADMIN ONLY
export const updateTransaction = catchAsyncErrors( async (req: Request, res: Response, next: NextFunction) => {

    let transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
        return next(new ErrorHandler("Transaction not found", 404));
    }

    transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        transaction
    })
})




// Delete transaction => /api/v1/transaction/:id   -- ADMIN ONLY
export const deleteTransaction = catchAsyncErrors(async (req: Request, res: Response, next:NextFunction) => {

    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
        return next(new ErrorHandler("Transaction not found", 404));
    }

    await transaction.remove();

    res.status(200).json({
        success: true,
        message: "Transaction is deleted"
    })
})



// Fetch users transactions
export const getUserTransactions = catchAsyncErrors(async (req: any, res: Response, next: NextFunction) => {
    const user = req.user.id;
    const resultsPerPage = 5;
    const transactions = await Transaction.find({user});

    res.status(200).json({
        success: true,
        transactions
    })    
})



// Fetch single transaction details => /api/v1/transaction/:id
export const getSingleTransaction = catchAsyncErrors(async (req: Request, res: Response, next:NextFunction) => {
    const transaction = await Transaction.findById(req.params.id);

    if(!transaction) {
        return next(new ErrorHandler("Transaction not found", 404));
    }

    res.status(200).json({
        success: true,
        transaction
    })
});




//  Fetch all transaction details => /api/v1/transactions/
export const getAllTransactions = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {

    const resultPerPage = 5;
    
    const apiFeature = new ApiFeatures(Transaction.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
    const transactions = await apiFeature.query;

    res.status(201).json({
        success: true,
        transaction: transactions
    })

});