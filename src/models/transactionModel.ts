import mongoose from "mongoose";
import { ITransaction } from "../interfaces/schemaInterfaces.js";

const transactionSchema = new mongoose.Schema<ITransaction>({
    name: {
        type: String,
        required: [true, "Please enter transaction name"],
    },
    description: {
        type: String,
    },
    amount: {
        type: Number,
        required: [true, "Please enter transaction amount"],
        maxLength: [8, "Amount cannot exceed 8 characters"]
    },
    category: {
        type: String,
        required: [true, "Please select category for this transaction"],
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;